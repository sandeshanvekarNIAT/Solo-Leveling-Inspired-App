'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  lines: string[];
  speed?: number; // ms per char
  lineDelay?: number; // ms before next line
  onComplete?: () => void;
  className?: string;
  cursorColor?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  speed = 35,
  lineDelay = 600,
  onComplete,
  className = '',
  cursorColor = '#1EA7FF',
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (lines.length === 0) return;

    if (currentLineIndex < lines.length) {
      const currentTargetLine = lines[currentLineIndex];

      if (currentCharIndex < currentTargetLine.length) {
        const timer = setTimeout(() => {
          setDisplayedLines((prev) => {
            const next = [...prev];
            next[currentLineIndex] = currentTargetLine.slice(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        // Line completed, wait lineDelay before advancing
        const lineTimer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, lineDelay);
        return () => clearTimeout(lineTimer);
      }
    } else if (!isDone) {
      setIsDone(true);
      onComplete?.();
    }
  }, [currentLineIndex, currentCharIndex, lines, speed, lineDelay, isDone, onComplete]);

  return (
    <div className={`space-y-1.5 font-mono text-sm sm:text-base ${className}`}>
      {displayedLines.map((line, idx) => (
        <div key={idx} className="flex items-center">
          <span className="text-[#E8F6FF]">{line}</span>
          {idx === currentLineIndex && !isDone && (
            <span
              className="inline-block w-2.5 h-4 ml-1 animate-pulse"
              style={{ backgroundColor: cursorColor }}
            />
          )}
        </div>
      ))}
      {!isDone && currentLineIndex === 0 && displayedLines.length === 0 && (
        <span
          className="inline-block w-2.5 h-4 animate-pulse"
          style={{ backgroundColor: cursorColor }}
        />
      )}
    </div>
  );
};
