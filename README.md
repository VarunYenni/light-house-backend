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
    "performance": 94,
    "accessibility": 100,
    "seo": 92,
    "bestPractices": 95
  },
  "reportId": "661a83b5c93a0f1e243b89e7"
}
```

### Output

Two report files will be saved in the reports/ folder:
•	report-<timestamp>.html – full Lighthouse HTML report
•	report-<timestamp>.json – raw JSON data