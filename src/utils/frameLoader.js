class FrameLoader {
  constructor() {
    this.frames = [];
    this.totalFrames = 300;
    this.loadedCount = 0;
    this.onProgress = null;
    this.onComplete = null;
    this.started = false;
  }

  start(onProgress, onComplete) {
    if (this.started) {
      if (this.loadedCount === this.totalFrames) {
        if (onComplete) onComplete();
      } else {
        this.onProgress = onProgress;
        this.onComplete = onComplete;
      }
      return;
    }
    this.started = true;
    this.onProgress = onProgress;
    this.onComplete = onComplete;

    // Phase 1: Preload skeleton frames (every 10th frame)
    const phase1 = [];
    for (let i = 1; i <= this.totalFrames; i += 10) {
      phase1.push(i);
    }

    // Phase 2: Preload mid-density (every 5th frame)
    const phase2 = [];
    for (let i = 1; i <= this.totalFrames; i += 5) {
      if (!phase1.includes(i)) phase2.push(i);
    }

    // Phase 3: Preload all remaining
    const phase3 = [];
    for (let i = 1; i <= this.totalFrames; i++) {
      if (!phase1.includes(i) && !phase2.includes(i)) phase3.push(i);
    }

    const loadQueue = [...phase1, ...phase2, ...phase3];
    const totalToLoad = loadQueue.length;

    const loadNext = () => {
      if (loadQueue.length === 0) return;
      const frameIndex = loadQueue.shift();
      const img = new Image();
      const padIndex = String(frameIndex).padStart(3, '0');
      img.src = `/images/ezgif-frame-${padIndex}.png`;
      img.onload = () => {
        this.frames[frameIndex] = img;
        this.loadedCount++;
        if (this.onProgress) {
          this.onProgress(Math.round((this.loadedCount / this.totalFrames) * 100));
        }
        if (this.loadedCount === this.totalFrames && this.onComplete) {
          this.onComplete();
        }
        loadNext();
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${frameIndex}`);
        this.loadedCount++;
        loadNext();
      };
    };

    // Parallel load workers
    const workers = 8;
    for (let w = 0; w < workers; w++) {
      loadNext();
    }
  }

  getFrame(index) {
    if (this.frames[index]) return this.frames[index];
    
    let left = index;
    let right = index;
    while (left > 1 || right < this.totalFrames) {
      if (left > 1) {
        left--;
        if (this.frames[left]) return this.frames[left];
      }
      if (right < this.totalFrames) {
        right++;
        if (this.frames[right]) return this.frames[right];
      }
    }
    return null;
  }
}

export const frameLoader = new FrameLoader();
