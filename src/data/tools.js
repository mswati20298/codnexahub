export const categories = [
  "AI / LLM",
  "JSON / API",
  "Developer",
  "Git",
  "SQL / Database",
  "Cloud / DevOps",
  "Web / Frontend",
  "Security",
  "Business Calculators",
];

export const tools = [
  // ---------- AI / LLM ----------
  { href: '/tools/api-pricing-calculator', name: 'API Pricing Calculator', description: 'Compare Claude, GPT-4o, Gemini, and Llama API costs by real usage.', category: 'AI / LLM', byok: false },
  { href: '/tools/context-window-calculator', name: 'Context Window Calculator', description: "Check if your text fits inside a model's context window before you hit an error.", category: 'AI / LLM', byok: false },
  { href: '/tools/model-comparison', name: 'Model Comparison Tool', description: 'Sortable side-by-side comparison of price and context window across models.', category: 'AI / LLM', byok: false },
  { href: '/tools/embedding-cost-calculator', name: 'Embedding Cost Calculator', description: 'Estimate the cost of embedding your documents for RAG or vector search.', category: 'AI / LLM', byok: false },
  { href: '/tools/fine-tune-cost-estimator', name: 'Fine-Tuning Cost Estimator', description: 'Estimate training and inference cost for fine-tuning AI models.', category: 'AI / LLM', byok: false },
  { href: '/tools/rate-limit-calculator', name: 'API Rate Limit Calculator', description: 'Calculate required concurrency and batch job completion time under a rate limit.', category: 'AI / LLM', byok: false },
  { href: '/tools/gpu-cost-calculator', name: 'GPU Cost Calculator', description: 'Estimate cloud GPU cost for self-hosting an open-source LLM.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/vector-db-comparator', name: 'Vector Database Cost Comparator', description: 'Compare monthly cost across Pinecone, Weaviate, Qdrant, and more.', category: 'AI / LLM', byok: false },
  { href: '/tools/token-counter', name: 'Token Counter', description: 'Estimate token usage across GPT, Claude, Gemini, and Llama instantly.', category: 'AI / LLM', byok: false },
  { href: '/tools/prompt-template-library', name: 'AI Prompt Template Library', description: 'Ready-to-use prompt templates for summarization, extraction, code review, and more.', category: 'AI / LLM', byok: false },
  { href: '/tools/limit-checker', name: 'Character & Word Limit Checker', description: 'Check text against tweet, SMS, meta description, and other common limits at once.', category: 'AI / LLM', byok: false },
  { href: '/tools/cot-formatter', name: 'Chain-of-Thought Prompt Formatter', description: 'Wrap a task in a proven reasoning-prompt structure.', category: 'AI / LLM', byok: false },
  { href: '/tools/markdown-formatter', name: 'Markdown to AI-Prompt Formatter', description: 'Strip or restructure Markdown into clean prompt-ready text.', category: 'AI / LLM', byok: false },
  { href: '/tools/code-to-prompt', name: 'Code Snippet to Prompt Converter', description: 'Turn a code snippet into a ready-to-send explain/debug/optimize prompt.', category: 'AI / LLM', byok: false },
  { href: '/tools/model-status-tracker', name: 'AI Model Status Tracker', description: 'Live status check for OpenAI, Anthropic, and Google Cloud AI.', category: 'AI / LLM', byok: false },
  { href: '/tools/latency-comparison', name: 'AI Provider Latency Comparison', description: 'Check current response latency across major AI provider endpoints.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API ----------
  { href: '/tools/curl-converter', name: 'cURL to Code Converter', description: 'Convert curl commands into JavaScript fetch or Python requests code.', category: 'JSON / API', byok: false },
  { href: '/tools/json-schema-generator', name: 'JSON Schema Generator', description: 'Generate a JSON Schema instantly from a sample JSON object.', category: 'JSON / API', byok: false },
  { href: '/tools/webhook-generator', name: 'Webhook Payload Generator', description: 'Generate sample webhook JSON payloads for testing your handler locally.', category: 'JSON / API', byok: false },
  { href: '/tools/mock-response-generator', name: 'API Mock Response Generator', description: 'Generate fake JSON data from a simple schema for testing.', category: 'JSON / API', byok: false },
  { href: '/tools/http-status-lookup', name: 'HTTP Status Code Lookup', description: 'Search HTTP status codes by number or keyword with plain-English explanations.', category: 'JSON / API', byok: false },
  { href: '/tools/api-doc-generator', name: 'API Endpoint Documentation Generator', description: 'Generate clean Markdown API docs from a method, path, params, and example response.', category: 'JSON / API', byok: false },

  // ---------- Developer ----------
  { href: '/tools/env-validator', name: '.env File Validator', description: 'Catch duplicate keys, empty values, and syntax mistakes in your .env file.', category: 'Developer', byok: false },
  { href: '/tools/env-checker', name: 'Environment Variable Checker', description: "Compare required env variables against what you've actually set before deploying.", category: 'Developer', byok: false },
  { href: '/tools/uuid-generator', name: 'UUID Generator', description: 'Generate random UUID v4 identifiers instantly, one or in bulk.', category: 'Developer', byok: false },

  // ---------- Git ----------
  { href: '/tools/commit-message-generator', name: 'AI Commit Message Generator', description: 'Paste a git diff, get a clear commit message. Bring your own API key.', category: 'Git', byok: true },
  { href: '/tools/readme-generator', name: 'AI README Generator', description: 'Describe your project, get a structured README.md. Bring your own API key.', category: 'Git', byok: true },
  { href: '/tools/changelog-generator', name: 'AI Changelog Generator', description: 'Turn commit messages into a user-facing changelog. Bring your own API key.', category: 'Git', byok: true },

  // ---------- Web / Frontend ----------
  { href: '/tools/slug-generator', name: 'Slug Generator', description: 'Convert text into a clean, URL-friendly slug.', category: 'Web / Frontend', byok: false },

  // ---------- Security ----------
  { href: '/tools/hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.', category: 'Security', byok: false },

  // ---------- New batch: JSON / API ----------
  { href: '/tools/json-formatter', name: 'JSON Formatter', description: 'Pretty-print and indent messy JSON instantly.', category: 'JSON / API', byok: false },
  { href: '/tools/json-minifier', name: 'JSON Minifier', description: 'Strip whitespace from JSON to make it as compact as possible.', category: 'JSON / API', byok: false },
  { href: '/tools/json-diff', name: 'JSON Diff Checker', description: 'Compare two JSON objects and see exactly what changed.', category: 'JSON / API', byok: false },
  { href: '/tools/json-to-csv', name: 'JSON to CSV Converter', description: 'Convert a JSON array of objects into a downloadable CSV.', category: 'JSON / API', byok: false },
  { href: '/tools/csv-to-json', name: 'CSV to JSON Converter', description: 'Convert CSV data into a clean JSON array.', category: 'JSON / API', byok: false },

  // ---------- New batch: Security / Encoding ----------
  { href: '/tools/base64-tool', name: 'Base64 Encoder / Decoder', description: 'Encode text to Base64 or decode Base64 back to text.', category: 'Security', byok: false },
  { href: '/tools/url-encoder', name: 'URL Encoder / Decoder', description: 'Encode special characters for URLs, or decode a URL-encoded string.', category: 'Security', byok: false },
  { href: '/tools/html-entity-tool', name: 'HTML Entity Encoder / Decoder', description: 'Convert special characters to HTML entities and back.', category: 'Security', byok: false },
  { href: '/tools/jwt-decoder', name: 'JWT Decoder', description: 'Decode a JWT to see its header, payload, and expiry — no signature verification needed.', category: 'Security', byok: false },
  { href: '/tools/password-generator', name: 'Password Generator', description: 'Generate strong random passwords with custom length and character rules.', category: 'Security', byok: false },
  { href: '/tools/random-string-generator', name: 'Random String Generator', description: 'Generate random strings for tokens, test data, or IDs.', category: 'Security', byok: false },

  // ---------- New batch: Programming / Code (Developer) ----------
  { href: '/tools/timestamp-converter', name: 'Unix Timestamp Converter', description: 'Convert between Unix timestamps and human-readable dates.', category: 'Developer', byok: false },
  { href: '/tools/cron-tool', name: 'Cron Expression Builder & Explainer', description: 'Build a cron expression or paste one to see what it means and when it next runs.', category: 'Developer', byok: false },
  { href: '/tools/semver-tool', name: 'Semantic Version Validator', description: 'Check if a version string follows SemVer, and compare two versions.', category: 'Developer', byok: false },

  // ---------- New batch: Web / Frontend ----------
  { href: '/tools/color-converter', name: 'Color Converter (HEX / RGB / HSL)', description: 'Convert colors instantly between HEX, RGB, and HSL formats.', category: 'Web / Frontend', byok: false },
  { href: '/tools/contrast-checker', name: 'WCAG Color Contrast Checker', description: 'Check if a text/background color pair meets WCAG AA/AAA accessibility standards.', category: 'Web / Frontend', byok: false },
  { href: '/tools/css-unit-converter', name: 'CSS Unit Converter (PX / REM / EM)', description: 'Convert between px, rem, and em based on your root font size.', category: 'Web / Frontend', byok: false },

  // ---------- New batch: Git ----------
  { href: '/tools/gitignore-generator', name: 'Gitignore Generator', description: 'Generate a .gitignore file for your language or framework.', category: 'Git', byok: false },
  { href: '/tools/branch-name-generator', name: 'Git Branch Name Generator', description: 'Turn a task description into a clean, conventional branch name.', category: 'Git', byok: false },

  // ---------- SQL / Database ----------
  { href: '/tools/sql-formatter', name: 'SQL Formatter', description: 'Format a messy or single-line SQL query into readable, keyword-aligned SQL.', category: 'SQL / Database', byok: false },
  { href: '/tools/create-table-generator', name: 'SQL CREATE TABLE Generator', description: 'Define columns in plain text and generate a CREATE TABLE statement.', category: 'SQL / Database', byok: false },
  { href: '/tools/connection-string-builder', name: 'Database Connection String Builder', description: 'Build a connection string for Postgres, MySQL, MongoDB, or Redis.', category: 'SQL / Database', byok: false },
  { href: '/tools/connection-string-parser', name: 'Connection String Parser', description: 'Paste a connection string and see its components broken out.', category: 'SQL / Database', byok: false },
  { href: '/tools/db-size-calculator', name: 'Database Size & Growth Calculator', description: 'Estimate current database size and project growth over time.', category: 'SQL / Database', byok: false },
  { href: '/tools/dummy-data-generator', name: 'SQL Dummy Data Generator', description: 'Generate INSERT statements with realistic fake data for testing.', category: 'SQL / Database', byok: false },
  { href: '/tools/csv-to-sql', name: 'CSV to SQL INSERT Converter', description: 'Paste CSV data and generate ready-to-run SQL INSERT statements.', category: 'SQL / Database', byok: false },

  // ---------- Business Calculators ----------
  { href: '/tools/saas-metrics-calculator', name: 'SaaS MRR / ARR / Churn Calculator', description: 'Calculate MRR, ARR, and churn rate from customer count and pricing.', category: 'Business Calculators', byok: false },
  { href: '/tools/ltv-cac-calculator', name: 'LTV:CAC Calculator', description: 'Calculate customer lifetime value, CAC, and the ratio investors look at.', category: 'Business Calculators', byok: false },
  { href: '/tools/break-even-calculator', name: 'Break-Even Calculator', description: 'Calculate how many units you need to sell to cover fixed costs.', category: 'Business Calculators', byok: false },
  { href: '/tools/margin-markup-calculator', name: 'Profit Margin vs Markup Calculator', description: 'See both margin and markup percentage from cost and selling price.', category: 'Business Calculators', byok: false },
  { href: '/tools/hourly-rate-calculator', name: 'Freelancer Hourly Rate Calculator', description: 'Work backward from desired annual income to your hourly rate.', category: 'Business Calculators', byok: false },
  { href: '/tools/discount-calculator', name: 'Discount Calculator', description: 'Calculate final price and savings from an original price and discount %.', category: 'Business Calculators', byok: false },
  { href: '/tools/gst-calculator', name: 'GST Calculator', description: 'Add or extract GST from an amount, all standard Indian GST slabs.', category: 'Business Calculators', byok: false },

  // ---------- Cloud / DevOps (Cost) ----------
  { href: '/tools/vm-cost-comparator', name: 'Cloud VM Cost Comparator', description: 'Compare monthly cost across similar-spec VMs on AWS, Azure, and GCP.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/storage-cost-calculator', name: 'Cloud Storage Cost Calculator', description: 'Compare storage cost across S3, GCS, Azure Blob, and Backblaze B2.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/bandwidth-cost-calculator', name: 'Bandwidth / Egress Cost Calculator', description: 'Estimate monthly outbound data transfer cost across major providers.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/serverless-cost-calculator', name: 'Serverless Function Cost Calculator', description: 'Estimate monthly serverless cost from requests, duration, and memory.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/uptime-calculator', name: 'Uptime / SLA Calculator', description: 'See how much downtime each SLA percentage actually allows.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/rps-calculator', name: 'RPS to Monthly Requests Calculator', description: 'Convert requests-per-second into monthly request totals.', category: 'Cloud / DevOps', byok: false },

  // ---------- Cloud / DevOps (Docker & Kubernetes) ----------
  { href: '/tools/dockerfile-generator', name: 'Dockerfile Generator', description: 'Generate a production-ready starter Dockerfile for common stacks.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/docker-compose-generator', name: 'Docker Compose Generator', description: 'Generate a docker-compose.yml with an app and optional database service.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/env-generator', name: '.env File Generator', description: 'Turn a simple list of variables into a properly formatted .env file.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/k8s-resource-calculator', name: 'Kubernetes Resource Calculator', description: 'Estimate total CPU/memory requested and nodes needed for your pods.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/k8s-deployment-generator', name: 'Kubernetes Deployment & Service Generator', description: 'Generate a basic Deployment + Service YAML pair.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/nginx-config-generator', name: 'Nginx Reverse Proxy Config Generator', description: 'Generate an Nginx server block with optional SSL and redirect.', category: 'Cloud / DevOps', byok: false },

  // ---------- JSON / API (batch 2) ----------
  { href: '/tools/json-path-tester', name: 'JSON Path Tester', description: 'Test a dot-notation path against a JSON object to extract nested values.', category: 'JSON / API', byok: false },
  { href: '/tools/json-flatten-tool', name: 'JSON Flatten / Unflatten', description: 'Convert nested JSON to flat dot-notation keys, or rebuild nested JSON.', category: 'JSON / API', byok: false },
  { href: '/tools/json-to-typescript', name: 'JSON to TypeScript Interface', description: 'Generate TypeScript interfaces from a sample JSON object, including nested types.', category: 'JSON / API', byok: false },
  { href: '/tools/yaml-json-converter', name: 'YAML ↔ JSON Converter', description: 'Convert between YAML and JSON in both directions.', category: 'JSON / API', byok: false },
  { href: '/tools/xml-json-converter', name: 'XML ↔ JSON Converter', description: 'Convert between XML and JSON in both directions.', category: 'JSON / API', byok: false },
  { href: '/tools/header-analyzer', name: 'HTTP Header Analyzer', description: 'Paste response headers and get a plain-English explanation of each.', category: 'JSON / API', byok: false },

  // ---------- Web / Frontend (batch 2) ----------
  { href: '/tools/gradient-generator', name: 'CSS Gradient Generator', description: 'Visually build a linear or radial CSS gradient.', category: 'Web / Frontend', byok: false },
  { href: '/tools/box-shadow-generator', name: 'CSS Box Shadow Generator', description: 'Visually build a CSS box-shadow with live preview.', category: 'Web / Frontend', byok: false },
  { href: '/tools/border-radius-generator', name: 'CSS Border Radius Generator', description: 'Adjust each corner radius independently or linked, with live preview.', category: 'Web / Frontend', byok: false },
  { href: '/tools/meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate title, description, and viewport meta tags.', category: 'Web / Frontend', byok: false },
  { href: '/tools/open-graph-generator', name: 'Open Graph Tag Generator', description: 'Generate Open Graph and Twitter Card tags for social sharing previews.', category: 'Web / Frontend', byok: false },
  { href: '/tools/robots-txt-generator', name: 'Robots.txt Generator', description: 'Generate a robots.txt file with optional sitemap reference.', category: 'Web / Frontend', byok: false },

  // ---------- Developer (batch 2) ----------
  { href: '/tools/code-counter', name: 'Code Line & Character Counter', description: 'Count lines, non-empty lines, comment lines, and characters in code.', category: 'Developer', byok: false },
  { href: '/tools/diff-viewer', name: 'Code / Text Diff Viewer', description: 'Compare two blocks of text or code line-by-line.', category: 'Developer', byok: false },
  { href: '/tools/regex-escape-tool', name: 'Regex Escape Tool', description: 'Escape special regex characters so text can be used as a literal pattern.', category: 'Developer', byok: false },
  { href: '/tools/ulid-generator', name: 'ULID Generator', description: 'Generate sortable, timestamp-prefixed unique identifiers.', category: 'Developer', byok: false },
  { href: '/tools/iso8601-validator', name: 'ISO 8601 Date Validator', description: 'Check if a string is valid ISO 8601 and see it in UTC, local, and Unix formats.', category: 'Developer', byok: false },

  // ---------- Security (batch 2) ----------
  { href: '/tools/hmac-generator', name: 'HMAC Generator', description: 'Generate an HMAC signature from a message and secret key.', category: 'Security', byok: false },
  { href: '/tools/api-key-generator', name: 'API Key Generator', description: 'Generate a random API key with custom prefix and length.', category: 'Security', byok: false },
  { href: '/tools/security-headers-generator', name: 'Security Headers Generator', description: 'Generate a bundle of common security headers — CORS, CSP, HSTS, and more.', category: 'Security', byok: false },
  { href: '/tools/sql-escape-tool', name: 'SQL String Escape Tool', description: 'Escape quotes for SQL string literals — reference only, not a substitute for parameterized queries.', category: 'Security', byok: false },

  // ---------- Git (batch 2) ----------
  { href: '/tools/conventional-commit-builder', name: 'Conventional Commit Builder', description: 'Build a properly formatted Conventional Commits message.', category: 'Git', byok: false },
  { href: '/tools/issue-template-generator', name: 'GitHub Issue Template Generator', description: 'Generate a bug report or feature request Markdown template.', category: 'Git', byok: false },
  { href: '/tools/pr-template-generator', name: 'GitHub PR Template Generator', description: 'A ready-to-use pull request template with a review checklist.', category: 'Git', byok: false },

  // ---------- JSON / API (batch 3) ----------
  { href: '/tools/pagination-calculator', name: 'API Pagination Calculator', description: 'Calculate total pages, SQL OFFSET, and item range for any page size.', category: 'JSON / API', byok: false },
  { href: '/tools/payload-size-calculator', name: 'API Payload Size Calculator', description: 'See JSON payload size as-typed, minified, and estimated gzipped.', category: 'JSON / API', byok: false },
  { href: '/tools/timeout-calculator', name: 'API Timeout Calculator', description: 'Calculate a sensible request timeout from p99 latency and retry count.', category: 'JSON / API', byok: false },
  { href: '/tools/graphql-formatter', name: 'GraphQL Query Formatter', description: 'Format a single-line GraphQL query into readable, indented syntax.', category: 'JSON / API', byok: false },
  { href: '/tools/openapi-validator', name: 'OpenAPI Spec Validator', description: 'Check an OpenAPI/Swagger spec for common structural issues.', category: 'JSON / API', byok: false },

  // ---------- SQL / Database (batch 2) ----------
  { href: '/tools/where-builder', name: 'SQL WHERE Clause Builder', description: 'Build a multi-condition WHERE clause visually with AND/OR logic.', category: 'SQL / Database', byok: false },
  { href: '/tools/join-builder', name: 'SQL JOIN Builder', description: 'Build a JOIN query visually — tables, join type, and matching keys.', category: 'SQL / Database', byok: false },
  { href: '/tools/update-generator', name: 'SQL UPDATE Statement Generator', description: 'Generate a properly formatted UPDATE statement.', category: 'SQL / Database', byok: false },
  { href: '/tools/delete-generator', name: 'SQL DELETE Statement Generator', description: 'Generate a DELETE statement with a WHERE-clause safety reminder.', category: 'SQL / Database', byok: false },
  { href: '/tools/index-generator', name: 'SQL Index Generator', description: 'Generate a CREATE INDEX statement, single or composite.', category: 'SQL / Database', byok: false },

  // ---------- AI / LLM (batch 2) ----------
  { href: '/tools/chunk-size-calculator', name: 'RAG Chunk Size Calculator', description: 'Estimate chunk count and total tokens to embed for a RAG pipeline.', category: 'AI / LLM', byok: false },
  { href: '/tools/chat-history-calculator', name: 'Chat History Token Calculator', description: 'Estimate conversation token usage and turns left before hitting context limits.', category: 'AI / LLM', byok: false },

  // ---------- Web / Frontend (batch 3) ----------
  { href: '/tools/html-formatter', name: 'HTML Formatter', description: 'Indent and format minified or messy HTML into readable markup.', category: 'Web / Frontend', byok: false },
  { href: '/tools/html-minifier', name: 'HTML Minifier', description: 'Strip whitespace and comments from HTML.', category: 'Web / Frontend', byok: false },
  { href: '/tools/css-formatter', name: 'CSS Formatter', description: 'Indent and format minified CSS into readable syntax.', category: 'Web / Frontend', byok: false },
  { href: '/tools/css-minifier', name: 'CSS Minifier', description: 'Strip whitespace and comments from CSS.', category: 'Web / Frontend', byok: false },
  { href: '/tools/markdown-table-generator', name: 'Markdown Table Generator', description: 'Build a Markdown table visually with an editable grid.', category: 'Web / Frontend', byok: false },

  // ---------- Business Calculators (batch 2) ----------
  { href: '/tools/invoice-calculator', name: 'Invoice Calculator', description: 'Add line items with quantity and rate, apply tax, get instant totals.', category: 'Business Calculators', byok: false },
  { href: '/tools/dev-time-estimator', name: 'Development Time Estimator', description: 'Pick common features to build a rough project time estimate.', category: 'Business Calculators', byok: false },
  { href: '/tools/roi-calculator', name: 'Business ROI Calculator', description: 'Calculate net profit, ROI, and annualized ROI from an investment.', category: 'Business Calculators', byok: false },
  { href: '/tools/subscription-projector', name: 'Subscription Revenue Projector', description: 'Project MRR and customer count month-by-month with churn.', category: 'Business Calculators', byok: false },

  // ---------- Cloud / DevOps (batch 3) ----------
  { href: '/tools/configmap-generator', name: 'Kubernetes ConfigMap Generator', description: 'Generate a ConfigMap YAML from key-value pairs.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/secret-generator', name: 'Kubernetes Secret Template Generator', description: 'Generate a Secret YAML with base64-encoded values for local dev.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/ingress-generator', name: 'Kubernetes Ingress Generator', description: 'Generate an Ingress resource with host routing and optional TLS.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/ci-pipeline-generator', name: 'GitHub Actions CI/CD Pipeline Generator', description: 'Generate a starter workflow for Node, Python, or Docker.', category: 'Cloud / DevOps', byok: false },

  // ---------- AI / LLM (batch 3) ----------
  { href: '/tools/token-budget-planner', name: 'Token Budget Planner', description: 'Work backward from a monthly budget to how many tokens/requests you can afford.', category: 'AI / LLM', byok: false },
  { href: '/tools/model-roi-calculator', name: 'AI Model ROI Calculator', description: 'Estimate time saved and net benefit of using AI for a repetitive task.', category: 'AI / LLM', byok: false },
  { href: '/tools/structured-output-validator', name: 'AI Structured Output Validator', description: "Check whether a model's JSON output matches your expected schema.", category: 'AI / LLM', byok: false },
  { href: '/tools/function-schema-generator', name: 'Function Calling Schema Generator', description: 'Generate a tool/function definition for Claude or OpenAI function calling.', category: 'AI / LLM', byok: false },
  { href: '/tools/injection-checklist', name: 'Prompt Injection Test Checklist', description: "An interactive checklist for reviewing your app's injection resistance.", category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 4) ----------
  { href: '/tools/curl-builder', name: 'cURL Command Builder', description: 'Build a curl command visually from method, URL, headers, and body.', category: 'JSON / API', byok: false },
  { href: '/tools/request-builder', name: 'REST API Request Builder', description: 'Build an API request visually and get fetch, axios, or Python code.', category: 'JSON / API', byok: false },

  // ---------- SQL / Database (batch 3) ----------
  { href: '/tools/alter-table-generator', name: 'SQL ALTER TABLE Generator', description: 'Generate ALTER TABLE statements to add, drop, rename, or modify columns.', category: 'SQL / Database', byok: false },
  { href: '/tools/foreign-key-generator', name: 'SQL Foreign Key Generator', description: 'Generate a foreign key constraint with ON DELETE behavior.', category: 'SQL / Database', byok: false },
  { href: '/tools/case-builder', name: 'SQL CASE Statement Builder', description: 'Build a CASE WHEN expression visually with multiple conditions.', category: 'SQL / Database', byok: false },
  { href: '/tools/group-order-builder', name: 'SQL GROUP BY / ORDER BY Builder', description: 'Build an aggregation query with GROUP BY, ORDER BY, and LIMIT.', category: 'SQL / Database', byok: false },

  // ---------- Developer (batch 3) ----------
  { href: '/tools/date-format-converter', name: 'Date Format Converter', description: 'Convert any date into ISO 8601, RFC 2822, Unix timestamp, and more.', category: 'Developer', byok: false },
  { href: '/tools/regex-explainer', name: 'Regex Pattern Explainer', description: 'Break down a regex pattern into plain-English explanations and test it live.', category: 'Developer', byok: false },
  { href: '/tools/cron-next-runs', name: 'Cron Next-Runs Calculator', description: "See the next 5 run times for a cron expression's minute/hour fields.", category: 'Developer', byok: false },
  { href: '/tools/language-detector', name: 'Code Language Detector', description: 'Paste code and get a heuristic guess at the programming language.', category: 'Developer', byok: false },

  // ---------- Security (batch 3) ----------
  { href: '/tools/cors-generator', name: 'CORS Header Generator', description: 'Generate CORS response headers — origin, methods, headers, credentials.', category: 'Security', byok: false },
  { href: '/tools/csp-generator', name: 'Content Security Policy (CSP) Generator', description: 'Build a CSP header directive by directive.', category: 'Security', byok: false },
  { href: '/tools/password-strength-checker', name: 'Password Strength Checker', description: 'Check a password against common strength criteria.', category: 'Security', byok: false },

  // ---------- Git (batch 3) ----------
  { href: '/tools/git-command-builder', name: 'Git Command Cheat Sheet', description: 'Click-to-copy reference for common git commands.', category: 'Git', byok: false },
  { href: '/tools/diff-stats', name: 'Git Diff Statistics', description: 'Paste a diff and get files changed, additions, and deletions.', category: 'Git', byok: false },

  // ---------- Business Calculators (batch 3) ----------
  { href: '/tools/cac-calculator', name: 'Customer Acquisition Cost (CAC) Calculator', description: 'Calculate CAC from marketing/sales spend and new customers acquired.', category: 'Business Calculators', byok: false },
  { href: '/tools/ltv-calculator', name: 'Customer Lifetime Value (LTV) Calculator', description: 'Calculate LTV from order value, purchase frequency, and lifespan.', category: 'Business Calculators', byok: false },

  // ---------- JSON / API (batch 5) ----------
  { href: '/tools/postman-viewer', name: 'Postman Collection Viewer', description: 'Paste a Postman collection export and see all requests listed.', category: 'JSON / API', byok: false },
  { href: '/tools/webhook-signature-tester', name: 'Webhook Signature Tester', description: "Verify a webhook's HMAC-SHA256 signature against your secret.", category: 'JSON / API', byok: false },
  { href: '/tools/endpoint-naming-checker', name: 'API Endpoint Naming Checker', description: 'Check a REST path against common naming conventions.', category: 'JSON / API', byok: false },

  // ---------- AI / LLM (batch 4) ----------
  { href: '/tools/embedding-dimension-calculator', name: 'Embedding Dimension & Storage Calculator', description: 'Compare embedding dimensions and storage cost across providers.', category: 'AI / LLM', byok: false },
  { href: '/tools/prompt-comparison', name: 'Prompt A/B Structural Comparison', description: 'Compare two prompt drafts on length, specificity, and structure.', category: 'AI / LLM', byok: false },
  { href: '/tools/response-diff-checker', name: 'AI Response Diff Checker', description: 'Compare two AI responses word-by-word to see what changed.', category: 'AI / LLM', byok: false },

  // ---------- Cloud / DevOps (batch 4) ----------
  { href: '/tools/port-mapper', name: 'Docker Port Mapper', description: 'Build docker run -p flags or compose ports section from mappings.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/ssl-checklist', name: 'SSL Configuration Checklist', description: "An interactive checklist for reviewing your server's SSL/TLS setup.", category: 'Cloud / DevOps', byok: false },

  // ---------- Web / Frontend (batch 4) ----------
  { href: '/tools/clamp-generator', name: 'CSS clamp() Generator', description: 'Generate fluid, responsive font-size using CSS clamp().', category: 'Web / Frontend', byok: false },
  { href: '/tools/flexbox-generator', name: 'CSS Flexbox Generator', description: 'Visually configure flexbox properties with a live preview.', category: 'Web / Frontend', byok: false },

  // ---------- JSON / API (batch 6) ----------
  { href: '/tools/response-formatter', name: 'HTTP Response Formatter', description: 'Paste a raw HTTP response and see status, headers, and body separated.', category: 'JSON / API', byok: false },
  { href: '/tools/rest-graphql-helper', name: 'REST vs GraphQL Decision Helper', description: 'Answer a few questions to get a directional API style recommendation.', category: 'JSON / API', byok: false },

  // ---------- SQL / Database (batch 4) ----------
  { href: '/tools/primary-key-generator', name: 'SQL Primary Key Generator', description: 'Generate primary key syntax for MySQL, PostgreSQL, or SQL Server.', category: 'SQL / Database', byok: false },
  { href: '/tools/backup-calculator', name: 'Database Backup Size & Time Calculator', description: 'Estimate backup size, upload time, and retention storage needs.', category: 'SQL / Database', byok: false },
  { href: '/tools/query-checklist', name: 'SQL Query Performance Checklist', description: 'An interactive checklist for reviewing query performance.', category: 'SQL / Database', byok: false },

  // ---------- Developer (batch 4) ----------
  { href: '/tools/complexity-estimator', name: 'Code Complexity Estimator', description: 'Get a rough cyclomatic complexity estimate for a code snippet.', category: 'Developer', byok: false },
  { href: '/tools/env-name-validator', name: 'Environment Variable Naming Validator', description: 'Check env variable names against SCREAMING_SNAKE_CASE conventions.', category: 'Developer', byok: false },

  // ---------- Git (batch 4) ----------
  { href: '/tools/tag-generator', name: 'Git Tag Generator', description: 'Generate git tag and push commands for a semantic version release.', category: 'Git', byok: false },
  { href: '/tools/commit-validator', name: 'Semantic Commit Validator', description: 'Check a commit message against Conventional Commits format rules.', category: 'Git', byok: false },

  // ---------- Business Calculators (batch 4) ----------
  { href: '/tools/project-cost-calculator', name: 'Project Cost & Quote Calculator', description: 'Calculate a client-ready quote from hours, rate, and profit margin.', category: 'Business Calculators', byok: false },

  // ---------- AI / LLM (batch 5) ----------
  { href: '/tools/api-break-even-calculator', name: 'AI API Break-Even Calculator', description: 'Find the request volume where self-hosting becomes cheaper than API pricing.', category: 'AI / LLM', byok: false },
  { href: '/tools/batch-cost-calculator', name: 'LLM Batch Processing Cost Calculator', description: 'See savings from async batch API discounts vs standard pricing.', category: 'AI / LLM', byok: false },
  { href: '/tools/dataset-size-calculator', name: 'Fine-Tuning Dataset Size Calculator', description: 'Get a guideline for training examples needed based on task type.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 7) ----------
  { href: '/tools/json-escape-tool', name: 'JSON String Escape / Unescape Tool', description: 'Escape or unescape text for embedding inside a JSON string.', category: 'JSON / API', byok: false },
  { href: '/tools/schema-formatter', name: 'GraphQL Schema Formatter', description: 'Format a single-line GraphQL type definition into readable syntax.', category: 'JSON / API', byok: false },

  // ---------- SQL / Database (batch 5) ----------
  { href: '/tools/query-diff', name: 'SQL Query Diff Checker', description: 'Compare two SQL queries line-by-line to see what changed.', category: 'SQL / Database', byok: false },
  { href: '/tools/growth-calculator', name: 'Database Table Growth Calculator', description: 'Project row count and storage size at 3, 6, 12, 24 months.', category: 'SQL / Database', byok: false },

  // ---------- Developer (batch 5) ----------
  { href: '/tools/timestamp-diff', name: 'Timestamp Difference Calculator', description: 'Calculate the exact difference between two dates/times.', category: 'Developer', byok: false },
  { href: '/tools/version-bumper', name: 'Semantic Version Bump Calculator', description: 'See next major, minor, and patch versions from your current version.', category: 'Developer', byok: false },

  // ---------- Web / Frontend (batch 5) ----------
  { href: '/tools/transform-generator', name: 'CSS Transform Generator', description: 'Visually build translate, rotate, scale, and skew transforms.', category: 'Web / Frontend', byok: false },
  { href: '/tools/animation-generator', name: 'CSS Animation Generator', description: 'Generate @keyframes animations from common presets.', category: 'Web / Frontend', byok: false },

  // ---------- Security (batch 4) ----------
  { href: '/tools/oauth-url-builder', name: 'OAuth Authorization URL Builder', description: 'Build an OAuth 2.0 authorization URL from client ID, redirect URI, and scope.', category: 'Security', byok: false },

  // ---------- Git (batch 5) ----------
  { href: '/tools/rebase-helper', name: 'Git Rebase Helper', description: 'Click-to-copy reference for common git rebase commands.', category: 'Git', byok: false },

  // ---------- Business Calculators (batch 5) ----------
  { href: '/tools/markup-calculator', name: 'Markup Calculator', description: 'Calculate selling price and profit from cost and markup percentage.', category: 'Business Calculators', byok: false },

  // ---------- Business Calculators (batch 6) ----------
  { href: '/tools/pricing-tier-builder', name: 'SaaS Pricing Tier Builder', description: 'Design and preview pricing tiers side by side.', category: 'Business Calculators', byok: false },
  { href: '/tools/runway-calculator', name: 'Startup Runway Calculator', description: 'Calculate monthly burn rate and months of runway remaining.', category: 'Business Calculators', byok: false },

  // ---------- Git (batch 6) ----------
  { href: '/tools/merge-conflict-helper', name: 'Git Merge Conflict Helper', description: 'A step-by-step walkthrough for resolving merge conflicts.', category: 'Git', byok: false },
  { href: '/tools/reset-helper', name: 'Git Reset Helper', description: 'Reference for git reset variants, with destructive-command warnings.', category: 'Git', byok: false },

  // ---------- Security (batch 5) ----------
  { href: '/tools/jwt-expiry-checker', name: 'JWT Expiry Checker', description: 'Paste a JWT and instantly see if/when it expires.', category: 'Security', byok: false },
  { href: '/tools/token-generator', name: 'Secure Random Token Generator', description: 'Generate cryptographically secure tokens in hex or Base64URL.', category: 'Security', byok: false },

  // ---------- Developer (batch 6) ----------
  { href: '/tools/base-converter', name: 'Number Base Converter', description: 'Convert numbers between binary, octal, decimal, and hex.', category: 'Developer', byok: false },
  { href: '/tools/ascii-table', name: 'ASCII Table Reference', description: 'Searchable printable ASCII table by character, decimal, or hex.', category: 'Developer', byok: false },
  { href: '/tools/case-converter', name: 'Text Case Converter', description: 'Convert text to camelCase, snake_case, kebab-case, and more at once.', category: 'Developer', byok: false },

  // ---------- Web / Frontend (batch 6) ----------
  { href: '/tools/grid-generator', name: 'CSS Grid Generator', description: 'Visually configure a CSS Grid layout with live preview.', category: 'Web / Frontend', byok: false },
  { href: '/tools/md-to-html', name: 'Markdown to HTML Converter', description: 'Convert Markdown into clean HTML.', category: 'Web / Frontend', byok: false },

  // ---------- SQL / Database (batch 6) ----------
  { href: '/tools/sql-pagination-generator', name: 'SQL Pagination Query Generator', description: 'Generate LIMIT/OFFSET pagination SQL for a page size and number.', category: 'SQL / Database', byok: false },
  { href: '/tools/connection-pool-calculator', name: 'Database Connection Pool Calculator', description: 'Calculate a safe pool size per app instance for your DB connection limit.', category: 'SQL / Database', byok: false },

  // ---------- Cloud / DevOps (batch 5) ----------
  { href: '/tools/docker-env-generator', name: 'Docker Environment File Generator', description: 'Generate a .env file and compose environment reference.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/apache-config-generator', name: 'Apache Reverse Proxy Config Generator', description: 'Generate an Apache VirtualHost config with optional SSL.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/ci-yaml-validator', name: 'CI/CD YAML Validator', description: 'Check a GitHub Actions workflow for common structural issues.', category: 'Cloud / DevOps', byok: false },

  // ---------- AI / LLM (batch 6) ----------
  { href: '/tools/prompt-optimizer', name: 'Prompt Length Optimizer', description: 'Scan a prompt for filler phrases and get length/token stats.', category: 'AI / LLM', byok: false },
  { href: '/tools/latency-estimator', name: 'AI Request Latency Estimator', description: 'Estimate total response time from output length and generation speed.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 8) ----------
  { href: '/tools/webhook-validator', name: 'Webhook Payload Validator', description: 'Check an incoming webhook payload against your expected fields and types.', category: 'JSON / API', byok: false },

  // ---------- Business Calculators (batch 7 — complete) ----------
  { href: '/tools/sales-tax-calculator', name: 'US Sales Tax Calculator', description: 'Calculate sales tax and total price for common US state rates.', category: 'Business Calculators', byok: false },
  { href: '/tools/employee-cost-calculator', name: 'Fully-Loaded Employee Cost Calculator', description: 'Calculate true employee cost beyond base salary.', category: 'Business Calculators', byok: false },
  { href: '/tools/api-pricing-break-even', name: 'API Pricing Break-Even Calculator', description: 'Find requests/month needed to cover fixed costs for your own API.', category: 'Business Calculators', byok: false },

  // ---------- Git (batch 7) ----------
  { href: '/tools/cherry-pick-helper', name: 'Git Cherry-Pick Helper', description: 'Reference for git cherry-pick commands and conflict handling.', category: 'Git', byok: false },
  { href: '/tools/stash-helper', name: 'Git Stash Helper', description: 'Reference for git stash — save, list, apply, manage multiple stashes.', category: 'Git', byok: false },

  // ---------- Security (batch 6) ----------
  { href: '/tools/html-escape-tool', name: 'HTML Escape / Unescape Tool', description: 'Escape special characters before rendering user input as HTML.', category: 'Security', byok: false },
  { href: '/tools/jwt-secret-checker', name: 'JWT Secret Strength Checker', description: 'Check if your JWT signing secret has enough entropy.', category: 'Security', byok: false },

  // ---------- AI / LLM (batch 7) ----------
  { href: '/tools/sampling-explainer', name: 'Temperature & Top-p Explainer', description: 'Interactively explore what temperature does to model output.', category: 'AI / LLM', byok: false },
  { href: '/tools/system-prompt-builder', name: 'System Prompt Template Builder', description: 'Fill in role, tone, and guidelines to generate a structured system prompt.', category: 'AI / LLM', byok: false },
  { href: '/tools/quick-request-cost', name: 'AI Request Cost Quick Calculator', description: 'Get the exact cost of a single AI request from token counts.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 9) ----------
  { href: '/tools/openapi-to-ts', name: 'OpenAPI to TypeScript Interface Generator', description: 'Generate TypeScript interfaces from OpenAPI components.schemas.', category: 'JSON / API', byok: false },
  { href: '/tools/versioning-checklist', name: 'API Versioning Strategy Checklist', description: 'An interactive checklist for planning API versioning and deprecation.', category: 'JSON / API', byok: false },

  // ---------- SQL / Database (batch 7) ----------
  { href: '/tools/view-generator', name: 'SQL VIEW Generator', description: 'Generate a CREATE VIEW statement from a name and SELECT query.', category: 'SQL / Database', byok: false },
  { href: '/tools/trigger-generator', name: 'SQL Trigger Template Generator', description: 'Generate a CREATE TRIGGER statement template.', category: 'SQL / Database', byok: false },

  // ---------- Developer (batch 7) ----------
  { href: '/tools/regex-cheat-sheet', name: 'Regex Cheat Sheet', description: 'Quick reference for common regex tokens.', category: 'Developer', byok: false },
  { href: '/tools/shortcut-reference', name: 'Developer Keyboard Shortcut Reference', description: 'Quick reference for VS Code, DevTools, and terminal shortcuts.', category: 'Developer', byok: false },

  // ---------- Web / Frontend (batch 7) ----------
  { href: '/tools/svg-optimizer', name: 'SVG Optimizer (Basic)', description: 'Strip comments, whitespace, and unnecessary IDs from an SVG.', category: 'Web / Frontend', byok: false },
  { href: '/tools/viewport-generator', name: 'Viewport Meta Tag Generator', description: 'Generate a mobile viewport meta tag with custom scale settings.', category: 'Web / Frontend', byok: false },

  // ---------- Cloud / DevOps (batch 6) ----------
  { href: '/tools/k8s-yaml-validator', name: 'Kubernetes YAML Validator', description: 'Check a Deployment manifest for common structural issues.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/image-size-estimator', name: 'Docker Image Size Estimator', description: 'Estimate final image size from base image, code, and dependencies.', category: 'Cloud / DevOps', byok: false },

  // ---------- Git (batch 8 — complete) ----------
  { href: '/tools/log-format-reference', name: 'Git Log Formatting Reference', description: 'Reference for useful git log formats — graph view, custom formats, filters.', category: 'Git', byok: false },
  { href: '/tools/commit-types-reference', name: 'Conventional Commit Types Reference', description: 'Reference for all standard Conventional Commits types and semver impact.', category: 'Git', byok: false },
  { href: '/tools/alias-generator', name: 'Git Alias Generator', description: 'Pick common git aliases and get the config commands to set them up.', category: 'Git', byok: false },

  // ---------- Security (batch 7 — complete) ----------
  { href: '/tools/jwt-structure-explainer', name: 'JWT Structure Explainer', description: 'A visual breakdown of the three parts of a JWT.', category: 'Security', byok: false },
  { href: '/tools/claims-reference', name: 'Standard JWT Claims Reference', description: 'Reference for standard registered JWT claims — iss, sub, aud, exp.', category: 'Security', byok: false },
  { href: '/tools/key-rotation-checklist', name: 'API Key Rotation Checklist', description: 'An interactive checklist for safely rotating API keys.', category: 'Security', byok: false },

  // ---------- Developer (batch 8 — complete) ----------
  { href: '/tools/http-methods-reference', name: 'HTTP Methods Reference', description: 'Reference for HTTP methods — purpose, safety, idempotency.', category: 'Developer', byok: false },
  { href: '/tools/semver-ranges-explainer', name: 'Semver Ranges Explainer', description: 'Understand what ^, ~, and other version range operators mean.', category: 'Developer', byok: false },
  { href: '/tools/text-stats', name: 'Text Statistics Analyzer', description: 'Get word/sentence count, averages, and estimated reading time.', category: 'Developer', byok: false },

  // ---------- Web / Frontend (batch 8) ----------
  { href: '/tools/specificity-calculator', name: 'CSS Specificity Calculator', description: 'Compare two CSS selectors to see which one wins.', category: 'Web / Frontend', byok: false },
  { href: '/tools/breakpoints-reference', name: 'Responsive Breakpoints Reference', description: 'Reference for breakpoints in Tailwind, Bootstrap, and common devices.', category: 'Web / Frontend', byok: false },
  { href: '/tools/filter-generator', name: 'CSS Filter Generator', description: 'Visually build a CSS filter with live preview.', category: 'Web / Frontend', byok: false },
  { href: '/tools/aspect-ratio-calculator', name: 'Aspect Ratio Calculator', description: 'Find aspect ratio and calculate proportional dimensions.', category: 'Web / Frontend', byok: false },
  { href: '/tools/entity-reference', name: 'HTML Character Entity Reference', description: 'Searchable reference for common HTML character entities.', category: 'Web / Frontend', byok: false },

  // ---------- Cloud / DevOps (batch 7 — complete) ----------
  { href: '/tools/terraform-var-generator', name: 'Terraform Variable Block Generator', description: 'Generate a Terraform variable block with type and default.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/promotion-checklist', name: 'Environment Promotion Checklist', description: 'An interactive checklist for safely promoting deployments.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/load-balancer-reference', name: 'Load Balancer Algorithms Reference', description: 'Compare common load balancing algorithms.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/health-check-generator', name: 'Health Check Endpoint Generator', description: 'Get a starter health check snippet for Node, Python, or Go.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/namespace-generator', name: 'Kubernetes Namespace Generator', description: 'Generate a Namespace YAML with custom labels.', category: 'Cloud / DevOps', byok: false },

  // ---------- SQL / Database (batch 8 — complete) ----------
  { href: '/tools/data-type-reference', name: 'SQL Data Type Reference', description: 'Compare data types across PostgreSQL, MySQL, and SQL Server.', category: 'SQL / Database', byok: false },
  { href: '/tools/normalization-reference', name: 'Database Normalization Forms Reference', description: 'A plain-English guide to 1NF, 2NF, 3NF, and BCNF.', category: 'SQL / Database', byok: false },
  { href: '/tools/sql-injection-checklist', name: 'SQL Injection Test Checklist', description: 'An interactive checklist for SQL injection prevention.', category: 'SQL / Database', byok: false },
  { href: '/tools/migration-name-generator', name: 'Database Migration Naming Generator', description: 'Generate a migration filename — timestamp, sequential, or Unix style.', category: 'SQL / Database', byok: false },
  { href: '/tools/isolation-levels-reference', name: 'Transaction Isolation Levels Reference', description: 'Compare SQL isolation levels and read anomalies prevented.', category: 'SQL / Database', byok: false },

  // ---------- AI / LLM (batch 8 — complete) ----------
  { href: '/tools/error-codes-reference', name: 'AI API Error Codes Reference', description: 'Reference for common AI API HTTP error codes.', category: 'AI / LLM', byok: false },
  { href: '/tools/techniques-reference', name: 'Prompt Engineering Techniques Reference', description: 'Guide to zero-shot, few-shot, chain-of-thought, and more.', category: 'AI / LLM', byok: false },
  { href: '/tools/rag-checklist', name: 'RAG Architecture Checklist', description: 'An interactive checklist for reviewing your RAG pipeline.', category: 'AI / LLM', byok: false },
  { href: '/tools/caching-savings-calculator', name: 'Context Caching Savings Calculator', description: 'See savings from prompt/context caching across requests.', category: 'AI / LLM', byok: false },
  { href: '/tools/retry-strategy-calculator', name: 'Rate Limit Retry Strategy Calculator', description: 'Calculate exponential backoff delays for rate-limited requests.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 10 — complete) ----------
  { href: '/tools/auth-methods-reference', name: 'API Authentication Methods Reference', description: 'Compare API keys, OAuth, JWT, HMAC, and mTLS.', category: 'JSON / API', byok: false },
  { href: '/tools/idempotency-key-generator', name: 'Idempotency Key Generator', description: 'Generate a random idempotency key for safe request retries.', category: 'JSON / API', byok: false },
  { href: '/tools/webhook-retry-calculator', name: 'Webhook Retry Strategy Calculator', description: 'Calculate a backoff retry schedule for webhook delivery.', category: 'JSON / API', byok: false },
  { href: '/tools/content-type-reference', name: 'HTTP Content-Type Reference', description: 'Searchable reference for common MIME types.', category: 'JSON / API', byok: false },
  { href: '/tools/api-design-checklist', name: 'REST API Design Checklist', description: 'An interactive checklist for REST API design best practices.', category: 'JSON / API', byok: false },
  { href: '/tools/caching-headers-reference', name: 'HTTP Caching Headers Reference', description: 'Reference for Cache-Control, ETag, Last-Modified, and Vary.', category: 'JSON / API', byok: false },
  { href: '/tools/realtime-patterns', name: 'Real-Time Communication Patterns Reference', description: 'Compare long polling, WebSocket, SSE, and short polling.', category: 'JSON / API', byok: false },
  { href: '/tools/error-format-generator', name: 'API Error Response Format Generator', description: 'Build a consistent, structured error response JSON shape.', category: 'JSON / API', byok: false },

  // ---------- Final tool — 300/300 ----------
  { href: '/tools/rate-limit-headers-reference', name: 'API Rate Limit Headers Reference', description: 'Reference for X-RateLimit-* and Retry-After headers.', category: 'JSON / API', byok: false },

  // ---------- Developer (batch 9) ----------
  { href: '/tools/exit-codes-reference', name: 'Common Exit Codes Reference', description: 'Reference for shell/process exit codes including signal-based codes.', category: 'Developer', byok: false },
  { href: '/tools/package-manager-reference', name: 'npm vs Yarn vs pnpm Command Reference', description: 'Side-by-side comparison of equivalent commands across package managers.', category: 'Developer', byok: false },
  { href: '/tools/code-review-checklist', name: 'Code Review Checklist', description: 'An interactive checklist for reviewing pull requests.', category: 'Developer', byok: false },
  { href: '/tools/debugging-checklist', name: 'Systematic Debugging Checklist', description: 'A structured checklist for debugging — reproduce, isolate, fix, verify.', category: 'Developer', byok: false },
  { href: '/tools/onboarding-checklist', name: 'Developer Onboarding Checklist', description: 'An interactive checklist for setting up a new developer.', category: 'Developer', byok: false },
  { href: '/tools/request-headers-reference', name: 'HTTP Request Headers Reference', description: 'Reference for common HTTP request headers.', category: 'Developer', byok: false },

  // ---------- SQL / Database (batch 9) ----------
  { href: '/tools/aggregate-functions-reference', name: 'SQL Aggregate Functions Reference', description: 'Reference for COUNT, SUM, AVG, MIN, MAX, and more.', category: 'SQL / Database', byok: false },
  { href: '/tools/window-functions-reference', name: 'SQL Window Functions Reference', description: 'Reference for ROW_NUMBER, RANK, LAG, LEAD, with an example.', category: 'SQL / Database', byok: false },
  { href: '/tools/sql-nosql-helper', name: 'SQL vs NoSQL Decision Helper', description: 'Answer questions about your data to get a directional recommendation.', category: 'SQL / Database', byok: false },
  { href: '/tools/sharding-reference', name: 'Database Sharding Strategies Reference', description: 'Compare range-based, hash-based, geographic, and directory sharding.', category: 'SQL / Database', byok: false },
  { href: '/tools/composite-key-generator', name: 'SQL Composite Primary Key Generator', description: 'Generate an ALTER TABLE statement for a multi-column primary key.', category: 'SQL / Database', byok: false },

  // ---------- Security (batch 8) ----------
  { href: '/tools/vulnerabilities-checklist', name: 'Common Web Vulnerabilities Checklist', description: 'Checklist covering injection, access control, config, and data protection.', category: 'Security', byok: false },
  { href: '/tools/encryption-explainer', name: 'Encryption at Rest vs In Transit Explainer', description: 'Understand the difference and why you need both.', category: 'Security', byok: false },

  // ---------- Web / Frontend (batch 9) ----------
  { href: '/tools/custom-properties-generator', name: 'CSS Custom Properties (Variables) Generator', description: 'Build a :root block of CSS custom properties.', category: 'Web / Frontend', byok: false },
  { href: '/tools/print-stylesheet-generator', name: 'Print Stylesheet Generator', description: 'Generate a @media print stylesheet.', category: 'Web / Frontend', byok: false },

  // ---------- AI / LLM (batch 9) ----------
  { href: '/tools/agent-tool-checklist', name: 'AI Agent Tool-Use Checklist', description: 'A checklist for designing safe, reliable tool-calling for AI agents.', category: 'AI / LLM', byok: false },
  { href: '/tools/vision-token-calculator', name: 'Vision Model Image Token Calculator', description: 'Roughly estimate image token cost for vision-capable models.', category: 'AI / LLM', byok: false },

  // ---------- JSON / API (batch 11) ----------
  { href: '/tools/rate-limit-tier-comparison', name: 'API Rate Limit Tier Comparison', description: 'Compare per-minute and per-day limits to find effective sustained rate.', category: 'JSON / API', byok: false },
  { href: '/tools/deprecation-header-generator', name: 'API Deprecation Header Generator', description: 'Generate Deprecation and Sunset HTTP headers.', category: 'JSON / API', byok: false },
  { href: '/tools/gateway-patterns-reference', name: 'API Gateway Patterns Reference', description: 'Common patterns — aggregation, routing, offloading, BFF, circuit breaking.', category: 'JSON / API', byok: false },

  // ---------- Cloud / DevOps (batch 8) ----------
  { href: '/tools/deployment-strategies-reference', name: 'Deployment Strategies Reference', description: 'Compare blue-green, canary, rolling, and feature-flag deployments.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/iac-checklist', name: 'Infrastructure as Code Readiness Checklist', description: 'A checklist for Terraform/IaC state management and safety.', category: 'Cloud / DevOps', byok: false },

  // ---------- Final batch — completing to 300 ----------
  { href: '/tools/hashing-algorithms-comparison', name: 'Password Hashing Algorithms Comparison', description: 'Compare bcrypt, argon2, scrypt, PBKDF2, and why plain hashes are unsafe for passwords.', category: 'Security', byok: false },
  { href: '/tools/cookie-flags-reference', name: 'Secure Cookie Flags Reference', description: 'Reference for Secure, HttpOnly, SameSite, and other cookie attributes.', category: 'Security', byok: false },
  { href: '/tools/two-factor-reference', name: 'Two-Factor Authentication Methods Reference', description: 'Compare TOTP, SMS, push notifications, and hardware keys.', category: 'Security', byok: false },
  { href: '/tools/worktree-helper', name: 'Git Worktree Helper', description: 'Reference for git worktree — work on multiple branches simultaneously.', category: 'Git', byok: false },
  { href: '/tools/gitattributes-generator', name: '.gitattributes Generator', description: 'Generate a .gitattributes file for line endings and binary handling.', category: 'Git', byok: false },
  { href: '/tools/blame-helper', name: 'Git Blame Helper', description: 'Reference for git blame, including ignoring whitespace and reformats.', category: 'Git', byok: false },
  { href: '/tools/dilution-calculator', name: 'Equity Dilution Calculator', description: 'See how ownership changes after a new funding round.', category: 'Business Calculators', byok: false },
  { href: '/tools/percentage-change-calculator', name: 'Percentage Change Calculator', description: 'Calculate absolute and percentage change between two values.', category: 'Business Calculators', byok: false },
  { href: '/tools/currency-margin-calculator', name: 'Currency Conversion Hidden Margin Calculator', description: 'See the real cost hidden in a currency exchange rate spread.', category: 'Business Calculators', byok: false },
  { href: '/tools/font-loading-reference', name: 'Web Font Loading Strategy Reference', description: 'Compare font-display values and preloading strategies.', category: 'Web / Frontend', byok: false },
  { href: '/tools/container-queries-reference', name: 'CSS Container Queries Reference', description: "Syntax reference for styling based on a container's size.", category: 'Web / Frontend', byok: false },
  { href: '/tools/cte-reference', name: 'SQL Common Table Expression (CTE) Reference', description: 'Syntax reference for basic and recursive CTEs.', category: 'SQL / Database', byok: false },
  { href: '/tools/replica-lag-calculator', name: 'Database Read Replica Lag Impact Calculator', description: 'Estimate stale writes on a read replica given lag and write rate.', category: 'SQL / Database', byok: false },
  { href: '/tools/design-patterns-reference', name: 'Common Software Design Patterns Reference', description: 'Reference for Singleton, Factory, Observer, Strategy, and more.', category: 'Developer', byok: false },
  { href: '/tools/multi-agent-reference', name: 'Multi-Agent Architecture Patterns Reference', description: 'Compare orchestrator-worker, pipeline, debate, and router patterns.', category: 'AI / LLM', byok: false },

  // ---------- Completing to 300 ----------
  { href: '/tools/mock-server-generator', name: 'Mock API Server Config Generator (db.json)', description: 'Generate a db.json file for json-server-style tools.', category: 'JSON / API', byok: false },
  { href: '/tools/rollout-calculator', name: 'Feature Flag Rollout Schedule Calculator', description: 'Plan a gradual feature flag rollout percentage schedule.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/caching-strategies-reference', name: 'Caching Strategy Patterns Reference', description: 'Compare cache-aside, write-through, write-behind, and read-through.', category: 'Developer', byok: false },
  { href: '/tools/queue-patterns-reference', name: 'Message Queue Patterns Reference', description: 'Compare point-to-point, pub-sub, dead letter queue, and priority queue.', category: 'Cloud / DevOps', byok: false },
  { href: '/tools/feature-toggle-types-reference', name: 'Feature Toggle Types Reference', description: 'Compare release, experiment, ops, and permission toggles.', category: 'Developer', byok: false },

  // ---------- Tool #300 ----------
  { href: '/tools/idempotency-reference', name: 'Idempotent vs Non-Idempotent Operations Reference', description: 'Concrete examples of idempotent operations and why it matters for retry safety.', category: 'JSON / API', byok: false },
];
