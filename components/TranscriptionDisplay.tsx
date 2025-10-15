
import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon';

interface TranscriptionDisplayProps {
  text: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative p-6 bg-base-200 rounded-lg shadow-inner">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-base-300 hover:bg-brand-light rounded-md transition-colors"
        aria-label="Copy transcription"
      >
        <CopyIcon className="w-5 h-5 text-content-200" />
      </button>
      {copied && (
        <span className="absolute top-3 right-12 text-xs bg-brand-dark text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
      <p className="text-base text-content-100 whitespace-pre-wrap leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default TranscriptionDisplay;
