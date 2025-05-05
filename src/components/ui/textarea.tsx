
import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showCounter?: boolean;
  resizable?: boolean;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, showCounter = false, resizable = true, label, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      if (props.value && typeof props.value === "string") {
        setCharCount(props.value.length);
      } else {
        setCharCount(0);
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative w-full">
        {label && (
          <label className="text-sm font-medium block mb-2">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !resizable && "resize-none",
            className
          )}
          ref={ref}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {(showCounter || maxLength) && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-1 rounded">
            {charCount}{maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
