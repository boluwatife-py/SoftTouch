import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface CodeSnippetProps {
  language?: string;
  code: string;
  title?: string;
}

export default function CodeSnippet({ language = 'javascript', code, title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-[#1A2332] border border-[#2A3342] group">
      {title && (
        <div className="px-4 py-2 bg-[#0D1525] border-b border-[#2A3342] text-sm font-semibold flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xs text-gray-400">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-3 p-2 rounded-md bg-[#0D1525]/80 hover:bg-[#0D1525] text-[#00B2FF] transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00B2FF] focus:ring-opacity-50"
          aria-label="Copy code"
        >
          {copied ? (
            <div className="flex items-center">
              <CheckIcon className="h-4 w-4 mr-1 text-green-400" />
              <span className="text-xs">Copied!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <CopyIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">Copy</span>
            </div>
          )}
        </button>
        <pre className={`language-${language} p-4 overflow-auto custom-scrollbar max-h-[300px]`}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}