import { AnalysisResult } from "@/types/log";
import { motion } from "framer-motion";
import { AlertTriangle, XCircle, Info, Bug } from "lucide-react";

interface StatCardsProps {
  result: AnalysisResult;
}

const cards = [
  { key: "errors" as const, label: "Errors", icon: XCircle, colorClass: "text-destructive", bgClass: "bg-destructive/10", borderClass: "border-destructive/20" },
  { key: "warnings" as const, label: "Warnings", icon: AlertTriangle, colorClass: "text-warning", bgClass: "bg-warning/10", borderClass: "border-warning/20" },
  { key: "info" as const, label: "Info", icon: Info, colorClass: "text-info", bgClass: "bg-info/10", borderClass: "border-info/20" },
  { key: "debug" as const, label: "Debug", icon: Bug, colorClass: "text-debug", bgClass: "bg-debug/10", borderClass: "border-debug/20" },
];

const StatCards = ({ result }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const count = result.summary[card.key];
        const pct = result.totalLines > 0 ? ((count / result.totalLines) * 100).toFixed(1) : "0";
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`rounded-lg border ${card.borderClass} ${card.bgClass} p-5`}
          >
            <div className="flex items-center justify-between">
              <Icon className={`h-5 w-5 ${card.colorClass}`} />
              <span className="text-xs text-muted-foreground">{pct}%</span>
            </div>
            <p className={`mt-3 text-3xl font-bold font-mono ${card.colorClass}`}>{count}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatCards;
