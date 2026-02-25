import { useState, useCallback } from "react";
import { Terminal, FileText } from "lucide-react";
import { motion } from "framer-motion";
import FileUpload from "@/components/FileUpload";
import StatCards from "@/components/StatCards";
import LogTable from "@/components/LogTable";
import SeverityBar from "@/components/SeverityBar";
import { analyzeLogFile } from "@/lib/logAnalyzer";
import { AnalysisResult } from "@/types/log";

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFile = useCallback((content: string, fileName: string) => {
    setIsAnalyzing(true);
    // Simulate brief processing time for UX
    setTimeout(() => {
      const analysis = analyzeLogFile(content, fileName);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">LogScope</h1>
              <p className="text-xs text-muted-foreground">Log Classification System</p>
            </div>
          </div>
          {result && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <FileText className="h-3.5 w-3.5" />
              {result.fileName}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Upload */}
        <FileUpload onFileLoaded={handleFile} isAnalyzing={isAnalyzing} />

        {/* Results */}
        {result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="font-mono">{result.totalLines.toLocaleString()} lines parsed</span>
              <span className="text-border">•</span>
              <span className="font-mono">
                Analyzed {result.analyzedAt.toLocaleTimeString()}
              </span>
            </div>

            <SeverityBar result={result} />
            <StatCards result={result} />
            <LogTable result={result} />
          </motion.div>
        )}

        {/* Empty state */}
        {!result && !isAnalyzing && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">
              Upload a log file to get started with classification analysis.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
