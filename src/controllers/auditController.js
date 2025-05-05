const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const validUrl = require('valid-url');
const fs = require('fs');
const path = require('path');
const Report = require('../models/Report');

exports.generateAudit = async (req, res) => {
    console.log("Received body:", req.body);

    const { url } = req.body;

    if (!url) {
        console.log("No URL provided in request body");
        return res.status(400).json({ error: 'Missing URL in request body' });
    }

    if (!validUrl.isWebUri(url)) {
        console.log("Invalid URL format:", url);
        return res.status(400).json({ error: 'Invalid URL' });
    }


    try {
        const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
        const options = { port: chrome.port };
        const runnerResult = await lighthouse(url, options);

        const reportJson = runnerResult.lhr;
        const htmlReport = runnerResult.report;

        const summary = {
            performance: reportJson.categories.performance.score * 100,
            accessibility: reportJson.categories.accessibility.score * 100,
            seo: reportJson.categories.seo.score * 100,
            bestPractices: reportJson.categories['best-practices'].score * 100,
        };

        const timestamp = Date.now();
        const jsonPath = `reports/report-${timestamp}.json`;
        const htmlPath = `reports/report-${timestamp}.html`;

        fs.writeFileSync(jsonPath, JSON.stringify(reportJson, null, 2));
        fs.writeFileSync(htmlPath, htmlReport);

        const newReport = new Report({
            url,
            summary,
            jsonPath,
            htmlPath
        });

        await newReport.save();
        await chrome.kill();

        res.json({ summary, reportId: newReport._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};