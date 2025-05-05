# Lighthouse Audit Backend

This Node.js backend allows users to audit websites using Google's Lighthouse tool. It analyzes performance, accessibility, SEO, and best practices. The app stores reports locally and saves metadata in MongoDB.

## How to Use

1. Clone this repo and run `npm install`.
2. Create a `.env` file with:
   PORT and mongoURI.
3. Start the server using `npm run dev`.

## API

### Endpoint

`POST /generate`

### Request Body

```json
{
"url": "https://example.com"
}
```

### Response (on success)
```json
{
  "summary": {
    "performance": 55.00000000000001,
    "accessibility": 100,
    "seo": 99,
    "bestPractices": 100,
    "webVitals": {
      "lcp": "18.2 s",
      "fid": "140 ms",
      "cls": "0"
    }
  },
  "reportId": "6818e73200fc858e43af2e53"
}
```

### Output

Two report files will be saved in the reports/ folder:
•	report-<timestamp>.html – full Lighthouse HTML report
•	report-<timestamp>.json – raw JSON data