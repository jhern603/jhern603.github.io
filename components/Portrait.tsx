'use client';

import { useEffect, useRef, useState } from 'react';

/** Portrait with a striped placeholder that stays visible until the image loads. */
export function Portrait({ src, alt }: { src: string; alt: string }) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  // The image can fail before hydration attaches onError, so check once on mount too.
  useEffect(() => {
    const el = img.current;
    if (el?.complete && !el.naturalWidth) setMissing(true);
  }, []);

  return (
    <div className="portrait">
      <span className="portrait-ph">Add public{src}</span>
      {!missing && (
        // Plain <img>: the file may not exist yet, and next/image would fail on a missing file.
        <img ref={img} className="portrait-img" src={src} alt={alt} onError={() => setMissing(true)} />
      )}
    </div>
  );
}
