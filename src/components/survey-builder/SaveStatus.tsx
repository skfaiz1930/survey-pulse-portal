
import React from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface SaveStatusProps {
  status: "saving" | "saved" | "unsaved";
}

export const SaveStatus = ({ status }: SaveStatusProps) => {
  return (
    <div className="flex items-center text-sm">
      {status === "saving" && (
        <>
          <Loader2 className="h-4 w-4 mr-1 animate-spin text-amber-500" />
          <span className="text-amber-600">Saving...</span>
        </>
      )}
      
      {status === "saved" && (
        <>
          <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-green-600">Saved</span>
        </>
      )}
      
      {status === "unsaved" && (
        <>
          <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
          <span className="text-red-600">Save failed</span>
        </>
      )}
    </div>
  );
};
