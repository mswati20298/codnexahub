import {
  Brain,
  Braces,
  Terminal,
  Database,
  Cloud,
  Globe,
  Shield,
  GitBranch,
  Calculator,
} from "lucide-react";

// Each category gets a consistent icon + color pairing used across the
// homepage grid, category pills, and tool detail page headers.
export const categoryMeta = {
  "AI / LLM": {
    icon: Brain,
    bg: "bg-purple-100 dark:bg-purple-950/40",
    text: "text-purple-600 dark:text-purple-400",
    ring: "border-purple-200 dark:border-purple-900",
    slug: "ai-llm",
    intro:
      "Tools for working with AI APIs — cost calculators, token counters, prompt utilities, and model comparison tools for Claude, GPT-4o, Gemini, and other large language models.",
  },
  "JSON / API": {
    icon: Braces,
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "border-emerald-200 dark:border-emerald-900",
    slug: "json-api",
    intro:
      "Format, validate, convert, and debug JSON, REST, GraphQL, and webhook payloads — everything you need for day-to-day API work.",
  },
  Developer: {
    icon: Terminal,
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    ring: "border-blue-200 dark:border-blue-900",
    slug: "developer",
    intro:
      "General-purpose developer utilities — encoders, converters, generators, and quick references for everyday coding tasks.",
  },
  "SQL / Database": {
    icon: Database,
    bg: "bg-orange-100 dark:bg-orange-950/40",
    text: "text-orange-600 dark:text-orange-400",
    ring: "border-orange-200 dark:border-orange-900",
    slug: "sql-database",
    intro:
      "Build and format SQL queries, generate schema statements, and reference database design concepts across PostgreSQL, MySQL, and more.",
  },
  "Cloud / DevOps": {
    icon: Cloud,
    bg: "bg-sky-100 dark:bg-sky-950/40",
    text: "text-sky-600 dark:text-sky-400",
    ring: "border-sky-200 dark:border-sky-900",
    slug: "cloud-devops",
    intro:
      "Docker, Kubernetes, Terraform, and cloud cost tools for deploying and operating infrastructure.",
  },
  "Web / Frontend": {
    icon: Globe,
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "border-indigo-200 dark:border-indigo-900",
    slug: "web-frontend",
    intro:
      "CSS generators, HTML utilities, and frontend reference tools for building and styling web interfaces.",
  },
  Security: {
    icon: Shield,
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-400",
    ring: "border-red-200 dark:border-red-900",
    slug: "security",
    intro:
      "Password, hashing, JWT, and encoding tools for building and reviewing secure applications.",
  },
  Git: {
    icon: GitBranch,
    bg: "bg-slate-200 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-300",
    ring: "border-slate-300 dark:border-slate-700",
    slug: "git",
    intro:
      "Git command references and generators for commits, branches, tags, and everyday version control workflows.",
  },
  "Business Calculators": {
    icon: Calculator,
    bg: "bg-rose-100 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-400",
    ring: "border-rose-200 dark:border-rose-900",
    slug: "business-calculators",
    intro:
      "Pricing, revenue, and cost calculators for freelancers, SaaS founders, and engineering teams making business decisions.",
  },
};

export function getCategoryMeta(category) {
  return categoryMeta[category] || categoryMeta["Developer"];
}

export function getCategoryBySlug(slug) {
  const entry = Object.entries(categoryMeta).find(([, meta]) => meta.slug === slug);
  return entry ? { name: entry[0], ...entry[1] } : null;
}
