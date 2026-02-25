import { AnalysisResult } from "@/types/log";
import { motion } from "framer-motion";

interface SeverityBarProps {
  result: AnalysisResult;
}

const segments = [
  { key: "errors" as const, color: "bg-destructive" },
  { key: "warnings" as const, color: "bg-warning" },
  { key: "info" as const, color: "bg-info" },
  { key: "debug" as const, color: "bg-debug" },
];

const SeverityBar = ({ result }: SeverityBarProps) => {
  const total = result.totalLines || 1;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="origin-left"
    >
      <div className="flex h-3 overflow-hidden rounded-full bg-secondary">
        {segments.map((seg) => {
          const pct = (result.summary[seg.key] / total) * 100;
          return (
            <div
              key={seg.key}
              className={`${seg.color} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default SeverityBar;
