import { ClassifiedLog, LogLevel, AnalysisResult } from "@/types/log";

const LOG_PATTERNS: { level: LogLevel; patterns: RegExp[] }[] = [
  {
    level: "ERROR",
    patterns: [
      /\b(error|err|fatal|critical|exception|fail(ed|ure)?|panic|crash)\b/i,
      /\[ERROR\]/i,
      /\[FATAL\]/i,
      /\[CRITICAL\]/i,
      /HTTP\s+[45]\d{2}/,
      /status[:\s]+[45]\d{2}/i,
    ],
  },
  {
    level: "WARNING",
    patterns: [
      /\b(warn(ing)?|deprecated|caution|alert)\b/i,
      /\[WARN(ING)?\]/i,
      /timeout/i,
      /retry/i,
    ],
  },
  {
    level: "DEBUG",
    patterns: [
      /\b(debug|trace|verbose)\b/i,
      /\[DEBUG\]/i,
      /\[TRACE\]/i,
    ],
  },
  {
    level: "INFO",
    patterns: [
      /\b(info|notice|log|started|completed|success|connected)\b/i,
      /\[INFO\]/i,
      /\[LOG\]/i,
    ],
  },
];

const TIMESTAMP_PATTERN = /(\d{4}[-/]\d{2}[-/]\d{2}[\sT]\d{2}:\d{2}:\d{2}[\d.:Z+-]*|\d{2}[/:]\d{2}[/:]\d{4}\s\d{2}:\d{2}:\d{2}|\w{3}\s+\d{1,2}\s\d{2}:\d{2}:\d{2})/;

function classifyLine(raw: string, lineNum: number): ClassifiedLog {
  let level: LogLevel = "INFO";

  for (const { level: l, patterns } of LOG_PATTERNS) {
    if (patterns.some((p) => p.test(raw))) {
      level = l;
      break;
    }
  }

  const tsMatch = raw.match(TIMESTAMP_PATTERN);
  const timestamp = tsMatch ? tsMatch[1] : "";
  const message = raw.replace(TIMESTAMP_PATTERN, "").replace(/^\s*[\[\]]\s*/, "").trim();

  return { line: lineNum, level, timestamp, message, raw };
}

export function analyzeLogFile(content: string, fileName: string): AnalysisResult {
  const lines = content.split("\n").filter((l) => l.trim().length > 0);
  const classifiedLogs = lines.map((line, i) => classifyLine(line, i + 1));

  const summary = {
    errors: classifiedLogs.filter((l) => l.level === "ERROR").length,
    warnings: classifiedLogs.filter((l) => l.level === "WARNING").length,
    info: classifiedLogs.filter((l) => l.level === "INFO").length,
    debug: classifiedLogs.filter((l) => l.level === "DEBUG").length,
  };

  return { fileName, totalLines: lines.length, classifiedLogs, summary, analyzedAt: new Date() };
}
