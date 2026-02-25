import { useCallback, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface FileUploadProps {
  onFileLoaded: (content: string, fileName: string) => void;
  isAnalyzing: boolean;
}

const FileUpload = ({ onFileLoaded, isAnalyzing }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileLoaded(e.target?.result as string, file.name);
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-secondary/30"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".log,.txt,.csv,.json";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) handleFile(file);
        };
        input.click();
      }}
    >
      {isDragging && (
        <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse-glow" />
      )}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {fileName && !isAnalyzing ? (
          <FileText className="h-12 w-12 text-primary" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
        <div>
          <p className="text-lg font-medium text-foreground">
            {isAnalyzing
              ? "Analyzing..."
              : fileName
              ? fileName
              : "Drop your log file here"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports .log, .txt, .csv, .json files
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUpload;
