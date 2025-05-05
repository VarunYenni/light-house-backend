const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    url: String,
    summary: {
        performance: Number,
        accessibility: Number,
        seo: Number,
        bestPractices: Number,
        webVitals: {
            lcp: String,
            fid: String,
            cls: String
        }
    },
    jsonPath: String,
    htmlPath: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);