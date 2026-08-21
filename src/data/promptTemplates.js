export const promptTemplates = [
  {
    id: "summarize",
    category: "Writing",
    title: "Summarize text",
    template:
      "Summarize the following text in {word_count} words or fewer, preserving the key facts and any numbers mentioned:\n\n{text}",
  },
  {
    id: "extract-json",
    category: "Extraction",
    title: "Extract structured data as JSON",
    template:
      "Extract the following fields from the text below and return valid JSON only, no explanation: {field_list}\n\nText:\n{text}",
  },
  {
    id: "rewrite-tone",
    category: "Writing",
    title: "Rewrite in a different tone",
    template:
      "Rewrite the following message in a {tone} tone. Keep the meaning identical, only change the phrasing:\n\n{text}",
  },
  {
    id: "code-review",
    category: "Coding",
    title: "Code review",
    template:
      "Review the following {language} code for bugs, security issues, and readability. List issues by severity (critical/major/minor):\n\n{code}",
  },
  {
    id: "explain-code",
    category: "Coding",
    title: "Explain code in plain English",
    template:
      "Explain what the following {language} code does, in plain English, for someone who doesn't code:\n\n{code}",
  },
  {
    id: "classify",
    category: "Classification",
    title: "Classify into categories",
    template:
      "Classify the following text into exactly one of these categories: {categories}. Respond with only the category name.\n\nText:\n{text}",
  },
  {
    id: "generate-tests",
    category: "Coding",
    title: "Generate unit tests",
    template:
      "Write unit tests for the following {language} function using {test_framework}. Cover edge cases:\n\n{code}",
  },
  {
    id: "meeting-notes",
    category: "Writing",
    title: "Turn transcript into meeting notes",
    template:
      "Turn the following meeting transcript into structured notes with sections for Decisions, Action Items (with owner if mentioned), and Open Questions:\n\n{transcript}",
  },
  {
    id: "sql-from-text",
    category: "Coding",
    title: "Generate SQL from a question",
    template:
      "Given this table schema:\n{schema}\n\nWrite a SQL query that answers: {question}",
  },
  {
    id: "compare-options",
    category: "Analysis",
    title: "Compare options",
    template:
      "Compare the following options across these criteria: {criteria}. Present as a table, then give a one-sentence recommendation.\n\nOptions:\n{options}",
  },
];

export const categories = [...new Set(promptTemplates.map((t) => t.category))];
