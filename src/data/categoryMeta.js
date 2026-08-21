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
  },
  "JSON / API": {
    icon: Braces,
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "border-emerald-200 dark:border-emerald-900",
  },
  Developer: {
    icon: Terminal,
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    ring: "border-blue-200 dark:border-blue-900",
  },
  "SQL / Database": {
    icon: Database,
    bg: "bg-orange-100 dark:bg-orange-950/40",
    text: "text-orange-600 dark:text-orange-400",
    ring: "border-orange-200 dark:border-orange-900",
  },
  "Cloud / DevOps": {
    icon: Cloud,
    bg: "bg-sky-100 dark:bg-sky-950/40",
    text: "text-sky-600 dark:text-sky-400",
    ring: "border-sky-200 dark:border-sky-900",
  },
  "Web / Frontend": {
    icon: Globe,
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "border-indigo-200 dark:border-indigo-900",
  },
  Security: {
    icon: Shield,
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-400",
    ring: "border-red-200 dark:border-red-900",
  },
  Git: {
    icon: GitBranch,
    bg: "bg-slate-200 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-300",
    ring: "border-slate-300 dark:border-slate-700",
  },
  "Business Calculators": {
    icon: Calculator,
    bg: "bg-rose-100 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-400",
    ring: "border-rose-200 dark:border-rose-900",
  },
};

export function getCategoryMeta(category) {
  return categoryMeta[category] || categoryMeta["Developer"];
}
