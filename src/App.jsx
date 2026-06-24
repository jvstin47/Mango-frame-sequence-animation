import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Droplets, Compass, Award, ArrowRight, ShoppingBag, Eye, Heart } from 'lucide-react';
import { frameLoader } from './utils/frameLoader';
import ScrollCanvas from './components/ScrollCanvas';
import FadeIn from './components/FadeIn';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  const [heroProgress, setHeroProgress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section5Progress, setSection5Progress] = useState(0);

  useEffect(() => {
    frameLoader.start(
      (progress) => {
        setLoadProgress(progress);
      },
      () => {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      setScrolledPastHero(scrollY > windowHeight * 0.8);

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - windowHeight;
        const prog = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setHeroProgress(prog);
      }

      if (section3Ref.current) {
        const rect = section3Ref.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - windowHeight;
        const prog = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setSection3Progress(prog);
      }

      if (section5Ref.current) {
        const rect = section5Ref.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - windowHeight;
        const prog = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setSection5Progress(prog);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <h1 className="loader-title">MANGO</h1>
        <p className="loader-subtitle">A Cinematic Sensory Experience</p>
        <div className="loader-bar-track">
          <div 
            className="loader-bar-fill"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="loader-percentage">{loadProgress}%</span>
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* Ambient background glows */}
      <div className="ambient-glow" style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }} />
      <div className="ambient-glow" style={{ bottom: '25%', right: '25%', transform: 'translate(50%, 50%)' }} />

      {/* Navigation */}
      <nav className={scrolledPastHero ? 'nav-bar nav-bar--scrolled' : 'nav-bar'}>
        <a href="#" className="nav-logo">MANGO</a>
        <div className="nav-links">
          <a href="#origin" className="nav-link">The Origin</a>
          <a href="#cut" className="nav-link">The Cut</a>
          <a href="#sensory" className="nav-link">The Sensory</a>
          <a href="#art" className="nav-link">The Art</a>
        </div>
        <a href="#acquire" className="btn btn--ghost" style={{ padding: '0.5rem 1.5rem', fontSize: '0.7rem' }}>
          Acquire
        </a>
      </nav>

      {/* --- SECTION 1: HERO (Frames 1-80) --- */}
      <div ref={heroRef} id="origin" className="hero-scroll-container">
        <div className="sticky-viewport">
          <ScrollCanvas 
            containerRef={heroRef} 
            startFrame={1} 
            endFrame={80} 
            scrollMode="sticky"
            watermarkMetadata="ORIGIN: WHOLE FRUIT"
          />
          
          <div 
            className="hero-overlay"
            style={{ opacity: Math.max(0, 1 - heroProgress * 2.5) }}
          >
            <span className="hero-tag">Nature's Golden Masterpiece</span>
            <h1 className="hero-title">
              The Art of <span className="text-gold-gradient" style={{ fontStyle: 'italic', fontWeight: '600', textShadow: '0 0 15px rgba(255, 165, 44, 0.25)' }}>Ripeness</span>
            </h1>
            <p className="hero-desc">
              A cinematic journey through the pristine lifecycle of the world's most coveted fruit. Scroll to reveal the sequence.
            </p>
            <div className="hero-cta-container">
              <a href="#cut" className="btn btn--gold">
                Reveal Slices <ArrowRight className="ml-2 w-4 h-4" style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} />
              </a>
            </div>

            <div className="scroll-cue">
              <span className="scroll-cue-text">Scroll to cut</span>
              <div className="scroll-cue-line" />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: THE CUT BEGINS (Frames 81-140) --- */}
      <div ref={section2Ref} id="cut" className="hero-scroll-container" style={{ height: '220vh', backgroundColor: 'var(--color-cocoa)' }}>
        <div className="sticky-grid">
          {/* Left Column: Scrolling content */}
          <div className="grid-side-text">
            <div>
              <span className="section-tag">Phase 02 / The Contact</span>
              <h2 className="section-title">
                Precision <br /><span style={{ fontStyle: 'italic' }}>Craftsmanship</span>
              </h2>
            </div>

            <div className="text-cards-container">
              <div className="text-card">
                <h4 className="text-card-title">First Touch</h4>
                <p className="text-card-desc">
                  A high-carbon steel blade makes first contact with the smooth, sun-blushed skin, breaking the tension to release a rich, citrus-tinged tropical aroma.
                </p>
              </div>
              <div className="text-card">
                <h4 className="text-card-title">Dividing the Flesh</h4>
                <p className="text-card-desc">
                  Guided by touch and decades of tradition, the blade curves gently around the flat central pit, isolating the purest half of the golden flesh.
                </p>
              </div>
            </div>

            <div className="section-footer-text">
              Alphonso Collection / 2026
            </div>
          </div>

          {/* Right Column: Sticky Canvas */}
          <div className="grid-side-canvas">
            <ScrollCanvas 
              containerRef={section2Ref} 
              startFrame={81} 
              endFrame={140} 
              scrollMode="sticky"
              watermarkMetadata="THE CUT"
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 3: GOLDEN FLESH & JUICE (Frames 141-200) --- */}
      <div ref={section3Ref} id="sensory" className="hero-scroll-container" style={{ height: '200vh' }}>
        <div className="sticky-viewport">
          <ScrollCanvas 
            containerRef={section3Ref} 
            startFrame={141} 
            endFrame={200} 
            scrollMode="sticky"
            watermarkMetadata="FLESH"
          />

          <div 
            className="section-3-overlay"
            style={{ 
              opacity: section3Progress < 0.2 
                ? section3Progress * 5 
                : section3Progress > 0.8 
                  ? (1 - section3Progress) * 5 
                  : 1 
            }}
          >
            <div className="quote-box">
              <span className="quote-tag">Sensory Revelation</span>
              <h2 className="quote-title">
                “A rich, golden landscape dripping with <span className="text-gold-gradient" style={{ fontStyle: 'italic', fontWeight: '600', textShadow: '0 0 15px rgba(255, 165, 44, 0.25)' }}>pure tropical nectar</span>.”
              </h2>
              <div className="quote-divider" />
              <p className="quote-desc">
                Inside lies a dense, fiberless pulp measured at 22 degrees Brix—the absolute peak of natural fruit sweetness. Saturated, vibrant, and incredibly lush.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory Details Grid Section (Static, Editorial) */}
      <div className="sensory-section">
        <div className="container">
          <div className="sticky-grid" style={{ position: 'relative', height: 'auto', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            <div className="sensory-title-col">
              <span className="section-tag">The Anatomy of Perfection</span>
              <h3 className="section-title" style={{ fontSize: '3.5rem' }}>
                A Feast for <br />the <span style={{ fontStyle: 'italic' }}>Sensory Connoisseur</span>
              </h3>
              <p className="text-card-desc" style={{ fontSize: '1rem', maxWidth: '500px' }}>
                Every mango selected for the collection is evaluated across five proprietary benchmarks of flavor, texture, and fragrance. Only one in a hundred qualifies.
              </p>
            </div>

            <div className="sensory-cards-grid">
              <FadeIn className="sensory-card">
                <Sparkles className="sensory-icon text-gold-gradient" style={{ width: '24px', height: '24px' }} />
                <h4 className="sensory-card-title">22° Brix Sweetness</h4>
                <p className="sensory-card-desc">
                  A high sugar-to-acid ratio creates a deep, lingering sweetness that balances perfectly on the palate without being cloying.
                </p>
              </FadeIn>

              <FadeIn className="sensory-card" delay={150}>
                <Droplets className="sensory-icon" style={{ width: '24px', height: '24px', color: 'var(--color-mango-flesh)' }} />
                <h4 className="sensory-card-title">Fiberless Texture</h4>
                <p className="sensory-card-desc">
                  The flesh is incredibly smooth and velvety, melting immediately on the tongue like a fine gourmet custard.
                </p>
              </FadeIn>

              <FadeIn className="sensory-card" delay={300}>
                <Compass className="sensory-icon" style={{ width: '24px', height: '24px', color: 'var(--color-papaya-coral)' }} />
                <h4 className="sensory-card-title">Geometric Scoring</h4>
                <p className="sensory-card-desc">
                  Cut into precise cubic grids that expand outward to aeration-cool the pulp, intensifying the perception of aroma.
                </p>
              </FadeIn>

              <FadeIn className="sensory-card" delay={450}>
                <Award className="sensory-icon" style={{ width: '24px', height: '24px', color: 'var(--color-leaf-green)' }} />
                <h4 className="sensory-card-title">Saffron Aftertaste</h4>
                <p className="sensory-card-desc">
                  Leaves a distinct, warm saffron and floral finish on the back of the palate that defines authentic premium varieties.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 4: SCULPTED GEOMETRY (Frames 201-260) --- */}
      <div ref={section4Ref} id="art" className="hero-scroll-container" style={{ height: '220vh', backgroundColor: 'var(--color-burnt-umber)' }}>
        <div className="sticky-grid">
          {/* Left Column: Sticky Canvas */}
          <div className="grid-side-canvas grid-side-canvas--left">
            <ScrollCanvas 
              containerRef={section4Ref} 
              startFrame={201} 
              endFrame={260} 
              scrollMode="sticky"
              watermarkMetadata="GEOMETRY"
            />
          </div>

          {/* Right Column: Scrolling text */}
          <div className="grid-side-text grid-side-text--right">
            <div>
              <span className="section-tag">Phase 04 / The Grid</span>
              <h2 className="section-title">
                Architectural <br /><span style={{ fontStyle: 'italic' }}>Sculpture</span>
              </h2>
            </div>

            <div className="text-cards-container">
              <div className="text-card text-card--right">
                <h4 className="text-card-title text-card-title--flesh">The Grid Score</h4>
                <p className="text-card-desc">
                  Scored in a precise, alternating grid. These geometric cuts separate the flesh down to the inner peel without puncturing it.
                </p>
              </div>
              <div className="text-card text-card--right">
                <h4 className="text-card-title">The Golden Hedgehog</h4>
                <p className="text-card-desc">
                  A gentle press from the skin side pushes the cubed cubes outward, creating the iconic crowned presentation ready for elegant serving.
                </p>
              </div>
            </div>

            <div className="section-footer-text" style={{ textAlign: 'right' }}>
              Hand-Selected Selection
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 5: FINAL PAYOFF / ACQUIRE (Frames 261-300) --- */}
      <div ref={section5Ref} id="acquire" className="hero-scroll-container" style={{ height: '200vh' }}>
        <div className="sticky-viewport" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ScrollCanvas 
            containerRef={section5Ref} 
            startFrame={261} 
            endFrame={300} 
            scrollMode="sticky"
            watermarkMetadata="PRESENTATION"
          />

          {/* Luxury Purchase Overlay Card */}
          <div 
            className="section-5-overlay"
            style={{ 
              opacity: Math.min(1, Math.max(0, (section5Progress - 0.4) * 2.5)),
              pointerEvents: section5Progress > 0.5 ? 'auto' : 'none',
              transform: `translateY(${Math.max(0, (1 - section5Progress) * 40)}px)`
            }}
          >
            <div className="purchase-card">
              <div className="purchase-card-accent-line" />
              
              <div className="purchase-grid">
                <div className="purchase-text-side">
                  <span className="purchase-tag">Reserve Collection</span>
                  <h3 className="purchase-title">
                    Acquire <br />the <span style={{ fontStyle: 'italic' }}>Harvest</span>
                  </h3>
                  <p className="purchase-desc">
                    Sourced from our private solar orchards. Hand-picked at peak ripeness, sliced with culinary precision, and delivered in pristine insulated boxes.
                  </p>
                  
                  <div className="purchase-certifications">
                    <span className="cert-item"><Eye style={{ width: '12px', height: '12px', color: 'var(--color-pulp-gold)' }} /> Inspected</span>
                    <span>•</span>
                    <span className="cert-item"><Heart style={{ width: '12px', height: '12px', color: 'var(--color-papaya-coral)' }} /> Certified</span>
                  </div>
                </div>

                <div className="purchase-options-side">
                  <div className="option-card">
                    <div>
                      <div className="option-header">
                        <h5 className="option-title">The Tasting Case</h5>
                        <span className="option-price">$48</span>
                      </div>
                      <p className="option-desc">
                        Four immaculate, hand-selected Alphonso mangoes. Perfect for discovering the sensory profile.
                      </p>
                    </div>
                    <button className="btn btn--gold">
                      <ShoppingBag style={{ width: '14px', height: '14px', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Add Case
                    </button>
                  </div>

                  <div className="option-card">
                    <div className="option-badge">Featured</div>
                    <div>
                      <div className="option-header">
                        <h5 className="option-title" style={{ color: 'var(--color-mango-flesh)' }}>The Connoisseur</h5>
                        <span className="option-price" style={{ color: 'var(--color-mango-flesh)' }}>$92</span>
                      </div>
                      <p className="option-desc">
                        Eight reserve-grade mangoes, artisan slicing guide, and a polished mahogany presentation board.
                      </p>
                    </div>
                    <button className="btn btn--gold" style={{ background: 'linear-gradient(135deg, var(--color-mango-flesh), var(--color-saffron-amber))' }}>
                      <ShoppingBag style={{ width: '14px', height: '14px', marginRight: '0.5rem', verticalAlign: 'middle' }} /> Add Case
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h4 className="footer-logo">MANGO</h4>
            <p className="footer-tagline">The Art of Tropical Craftsmanship</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <div className="footer-copy">
            © 2026 MANGO. All rights reserved. Crafted with reverence.
          </div>
        </div>
      </footer>
    </div>
  );
}
