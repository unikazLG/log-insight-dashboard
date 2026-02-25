export type LogLevel = "ERROR" | "WARNING" | "INFO" | "DEBUG";

export interface ClassifiedLog {
  line: number;
  level: LogLevel;
  timestamp: string;
  message: string;
  raw: string;
}

export interface AnalysisResult {
  fileName: string;
  totalLines: number;
  classifiedLogs: ClassifiedLog[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
    debug: number;
  };
  analyzedAt: Date;
}
