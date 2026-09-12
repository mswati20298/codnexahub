interface FaqPair {
  question: string;
  answer: string;
  questionHtml: string;
  answerHtml: string;
}

export interface FaqResult {
  html: string;
  schema: Record<string, unknown> | null;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(str: string): string {
  return decodeEntities(str.replace(/<[^>]+>/g, '')).trim();
}

// Finds the page's own rendered `<h2>FAQ</h2>` section (assumed to be the final
// section of the body) and turns its `<p><strong>Q</strong> A</p>` pairs into a
// collapsible <details>/<summary> accordion, while deriving matching FAQPage
// JSON-LD from the same pairs so the schema can never drift from what's on the page.
export function buildFaqAccordion(bodyHtml: string): FaqResult {
  const faqSectionMatch = bodyHtml.match(/<h2>([^<]*\bFAQs?\b[^<]*)<\/h2>([\s\S]*)$/i);
  if (!faqSectionMatch || faqSectionMatch.index === undefined) {
    return { html: bodyHtml, schema: null };
  }

  const headingText = faqSectionMatch[1];
  const sectionBody = faqSectionMatch[2];
  const qaRegex = /<p>\s*<strong>([\s\S]+?)<\/strong>\s*([\s\S]*?)<\/p>/g;
  const pairs: FaqPair[] = [];
  let match: RegExpExecArray | null;
  while ((match = qaRegex.exec(sectionBody))) {
    const questionHtml = match[1].trim();
    const answerHtml = match[2].trim();
    const question = stripTags(questionHtml);
    const answer = stripTags(answerHtml);
    if (question && answer) {
      pairs.push({ question, answer, questionHtml, answerHtml });
    }
  }

  if (pairs.length === 0) {
    return { html: bodyHtml, schema: null };
  }

  const accordionHtml = `<h2>${headingText}</h2>
<div class="not-prose divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden my-6">
${pairs
  .map(
    (pair) => `<details class="group">
  <summary class="cursor-pointer list-none flex items-center justify-between gap-4 px-4 py-3.5 font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <span>${pair.questionHtml}</span>
    <svg class="shrink-0 w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 7.5L10 12.5L15 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </summary>
  <div class="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">${pair.answerHtml}</div>
</details>`
  )
  .join('\n')}
</div>`;

  const html = bodyHtml.slice(0, faqSectionMatch.index) + accordionHtml;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((pair) => ({
      '@type': 'Question',
      name: pair.question,
      acceptedAnswer: { '@type': 'Answer', text: pair.answer },
    })),
  };

  return { html, schema };
}
