import { Link } from "react-router-dom";
import { Terminal, Upload, BarChart3, Filter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">LogScope</h1>
          </div>
          <Link
            to="/analyze"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open Analyzer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Intelligent Log Analysis
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            Classify & analyze your logs{" "}
            <span className="text-primary">in seconds</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Upload any log file and get instant classification by severity — errors, warnings, info, and debug messages — with powerful filtering and search.
          </p>

          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 w-full"
        >
          {[
            { icon: Upload, title: "Drag & Drop", desc: "Upload .log, .txt, .csv or .json files instantly" },
            { icon: BarChart3, title: "Smart Classification", desc: "Auto-detect severity levels with pattern matching" },
            { icon: Filter, title: "Filter & Search", desc: "Quickly find specific entries across thousands of lines" },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-6 space-y-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        LogScope — Log Classification System
      </footer>
    </div>
  );
};

export default Landing;
