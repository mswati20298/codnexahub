import { useState } from "react";

const TEMPLATES = {
  "Node.js": `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`,
  Python: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]`,
  "Next.js": `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]`,
  Go: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]`,
};

export default function DockerfileGenerator() {
  const [stack, setStack] = useState("Node.js");
  const output = TEMPLATES[stack];
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(TEMPLATES).map((key) => (
          <button key={key} onClick={() => setStack(key)} className={`text-sm px-3 py-1.5 rounded-lg border ${stack === key ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
