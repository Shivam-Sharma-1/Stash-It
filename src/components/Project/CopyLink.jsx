"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CopyLink({ text, inputClassName = "" }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex w-full md:min-w-96 max-w-md items-center space-x-2">
      <Input
        type="text"
        value={text ?? "Loading..."}
        readOnly
        className={`flex-grow ${inputClassName}`}
      />
      <Button
        type="button"
        disabled={!text}
        size="icon"
        variant="secondary"
        onClick={copyToClipboard}
        className="flex-shrink-0"
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">
          {isCopied ? "Copied" : "Copy to clipboard"}
        </span>
      </Button>
    </div>
  );
}
