import { useEffect, useState } from 'react';

/** Reveals `text` character by character whenever it changes. */
export function useTypewriter(text: string, speedMs = 14): string {
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text);
      return;
    }
    setOutput('');
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setOutput(text.slice(0, index));
      if (index >= text.length) window.clearInterval(id);
    }, speedMs);
    return () => window.clearInterval(id);
  }, [text, speedMs]);

  return output;
}
