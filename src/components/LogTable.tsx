import { useState } from "react";
import { AnalysisResult, LogLevel } from "@/types/log";
import { motion } from "framer-motion";

interface LogTableProps {
  result: AnalysisResult;
}

const levelStyles: Record<LogLevel, string> = {
  ERROR: "bg-destructive/15 text-destructive border-destructive/30",
  WARNING: "bg-warning/15 text-warning border-warning/30",
  INFO: "bg-info/15 text-info border-info/30",
  DEBUG: "bg-debug/15 text-debug border-debug/30",
};

const LogTable = ({ result }: LogTableProps) => {
  const [filter, setFilter] = useState<LogLevel | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = result.classifiedLogs.filter((log) => {
    if (filter !== "ALL" && log.level !== filter) return false;
    if (search && !log.raw.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filters: (LogLevel | "ALL")[] = ["ALL", "ERROR", "WARNING", "INFO", "DEBUG"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-lg border border-border bg-card"
    >
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium font-mono transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="max-h-[500px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-medium w-14">#</th>
              <th className="px-4 py-2.5 font-medium w-24">Level</th>
              <th className="px-4 py-2.5 font-medium w-48">Timestamp</th>
              <th className="px-4 py-2.5 font-medium">Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((log) => (
              <tr
                key={log.line}
                className="border-b border-border/50 hover:bg-accent/30 transition-colors"
              >
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {log.line}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-xs font-mono font-medium ${levelStyles[log.level]}`}
                  >
                    {log.level}
                  </span>
                </td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {log.timestamp || "—"}
                </td>
                <td className="px-4 py-2 font-mono text-xs text-foreground max-w-xl truncate">
                  {log.message}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No logs match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        Showing {Math.min(filtered.length, 200)} of {filtered.length} entries
      </div>
    </motion.div>
  );
};

export default LogTable;
