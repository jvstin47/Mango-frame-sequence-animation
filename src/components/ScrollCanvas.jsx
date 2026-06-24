import React, { useRef, useEffect } from 'react';
import { frameLoader } from '../utils/frameLoader';

const METADATA_DETAILS = {
  'ORIGIN: WHOLE FRUIT': {
    header: 'SERIES: ALPHONSO',
    main: 'WHOLE FRUIT',
    stats: ['BRIX 22.4°', 'SELECT HARVEST']
  },
  'THE CUT': {
    header: 'STAGE: CONTACT',
    main: 'PRECISION SCORED',
    stats: ['ANGLE 45°', 'HAND CRAFTED']
  },
  'FLESH': {
    header: 'STAGE: REVELATION',
    main: 'SENSORY TEXTURE',
    stats: ['BRIX 22.4°', 'PEAK RIPENESS']
  },
  'GEOMETRY': {
    header: 'STAGE: GEOMETRY',
    main: 'ARCHITECTURAL FORM',
    stats: ['DEPTH 8MM', 'METRIC SCORE']
  },
  'PRESENTATION': {
    header: 'STAGE: FINAL PRESENTATION',
    main: 'THE MASTERPIECE',
    stats: ['TEMP 16°C', 'RESERVE CASE']
  }
};

export default function ScrollCanvas({ 
  startFrame, 
  endFrame, 
  containerRef, 
  scrollMode = 'sticky', 
  className = '', 
  overlay = null,
  watermarkMetadata = 'VARIETY: ALPHONSO'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastProgress = -1;

    const resizeCanvas = () => {
      if (!canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect();
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      if (lastProgress !== -1) {
        drawFrame(lastProgress);
      }
    };

    const drawFrame = (progress) => {
      const totalFrames = endFrame - startFrame + 1;
      let frameIndex = Math.floor(progress * totalFrames) + startFrame;
      frameIndex = Math.min(endFrame, Math.max(startFrame, frameIndex));

      const img = frameLoader.getFrame(frameIndex);
      if (!img) return;

      const rect = canvas.parentNode.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, x, y;

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        x = (canvasWidth - drawWidth) / 2;
        y = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        x = 0;
        y = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = 0;

      if (scrollMode === 'sticky') {
        const scrolled = -rect.top;
        const totalHeight = rect.height - windowHeight;
        progress = totalHeight > 0 ? scrolled / totalHeight : 0;
      } else {
        const entryPoint = rect.top - windowHeight;
        const totalRange = windowHeight + rect.height;
        progress = -entryPoint / totalRange;
      }

      progress = Math.min(1, Math.max(0, progress));
      lastProgress = progress;
      requestAnimationFrame(() => drawFrame(progress));
    };

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(canvas.parentNode);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial draw
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startFrame, endFrame, containerRef, scrollMode]);

  const details = METADATA_DETAILS[watermarkMetadata] || {
    header: 'SERIES: ANALYSIS',
    main: watermarkMetadata,
    stats: ['BRIX 22.4°', 'PRODUCT DETAIL']
  };

  return (
    <div className={`canvas-container ${className}`} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      {overlay}
      
      {/* Editorial metadata covering the Gemini watermark in bottom right */}
      <div className="metadata-badge">
        <div className="metadata-badge__header">
          <div className="metadata-badge__dot" />
          <span className="metadata-badge__title">{details.header}</span>
        </div>
        <div className="metadata-badge__main">
          {details.main}
        </div>
        <div className="metadata-badge__stats">
          <span className="metadata-badge__stat">{details.stats[0]}</span>
          <span className="metadata-badge__separator">•</span>
          <span className="metadata-badge__stat">{details.stats[1]}</span>
        </div>
      </div>
    </div>
  );
}
