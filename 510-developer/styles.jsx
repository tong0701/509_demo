// Origins design tokens — single source of truth.
// Mirrored in tailwind.config block on the style guide artboard.

window.OriginsTokens = {
  colors: {
    // Backgrounds
    paper: '#FBF6EC',        // primary bg — aged paper
    paperDeep: '#F5EBDA',    // card bg, secondary surfaces
    paperEdge: '#EADFC9',    // borders, dividers
    // Ink (text)
    ink: '#3A2A1F',          // primary text — espresso
    inkSoft: '#6B4A35',      // secondary text — walnut
    inkMute: '#9C8270',      // muted text, captions
    // Accent
    ember: '#C97B4F',        // primary accent — terracotta
    emberDeep: '#A85F35',    // hover/pressed
    emberSoft: '#E8C4A8',    // tinted bg
    // Functional
    sage: '#7A8B6F',         // success / saved
    rose: '#B85C5C',         // error / record
    gold: '#D4A574',         // highlight / pinned
  },
  fonts: {
    serif: '"Lora", "Source Serif Pro", Georgia, serif',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Courier Prime", monospace',
  },
};

// Inject Google Fonts once.
if (typeof document !== 'undefined' && !document.getElementById('origins-fonts')) {
  const l = document.createElement('link');
  l.id = 'origins-fonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(l);
}

// Origins-scoped CSS — only applies within .origins-scope so it doesn't
// leak into the design canvas chrome. The scope is set on each artboard.
if (typeof document !== 'undefined' && !document.getElementById('origins-scope-css')) {
  const s = document.createElement('style');
  s.id = 'origins-scope-css';
  s.textContent = `
.origins-scope {
  --paper: #FBF6EC;
  --paper-deep: #F5EBDA;
  --paper-edge: #EADFC9;
  --ink: #3A2A1F;
  --ink-soft: #6B4A35;
  --ink-mute: #9C8270;
  --ember: #C97B4F;
  --ember-deep: #A85F35;
  --ember-soft: #E8C4A8;
  --sage: #7A8B6F;
  --rose: #B85C5C;
  --gold: #D4A574;
  --font-serif: "Lora", "Source Serif Pro", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", "Courier Prime", monospace;
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--paper);
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.origins-scope * { box-sizing: border-box; }
.origins-scope ::selection { background: var(--ember-soft); }

/* Type pairing variants applied via [data-pair] on the scope */
.origins-scope[data-pair="editorial"] {
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "DM Sans", -apple-system, sans-serif;
}
.origins-scope[data-pair="warm"] {
  --font-serif: "Fraunces", "Source Serif Pro", Georgia, serif;
  --font-sans: "Inter", -apple-system, sans-serif;
}

/* Density */
.origins-scope[data-density="compact"] { font-size: 14px; }
.origins-scope[data-density="cozy"] { font-size: 15px; }
.origins-scope[data-density="roomy"] { font-size: 16px; }

/* Buttons */
.origins-scope .btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: 500; font-size: 0.9375em;
  padding: 0.6em 1.2em; border-radius: 6px; border: 1px solid transparent;
  cursor: pointer; transition: all .15s ease; line-height: 1;
  letter-spacing: -0.005em;
}
.origins-scope .btn-primary {
  background: var(--ember); color: var(--paper); border-color: var(--ember);
  box-shadow: 0 1px 2px rgba(58,42,31,.08);
}
.origins-scope .btn-primary:hover { background: var(--ember-deep); border-color: var(--ember-deep); }
.origins-scope .btn-secondary {
  background: var(--paper); color: var(--ink); border-color: var(--paper-edge);
}
.origins-scope .btn-secondary:hover { background: var(--paper-deep); border-color: var(--ink-mute); }
.origins-scope .btn-ghost {
  background: transparent; color: var(--ink-soft); border-color: transparent;
}
.origins-scope .btn-ghost:hover { background: var(--paper-deep); color: var(--ink); }

/* Cards */
.origins-scope .card {
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(58,42,31,.04);
}

/* Photo print — bordered frame */
.origins-scope .photo {
  background: #fff; padding: 8px 8px 12px;
  box-shadow: 0 2px 4px rgba(58,42,31,.08), 0 8px 24px rgba(58,42,31,.06);
  display: inline-block; border-radius: 1px;
}
.origins-scope .photo-inner {
  background: var(--paper-deep); display: block;
  background-image: repeating-linear-gradient(45deg, transparent 0 6px, rgba(58,42,31,.04) 6px 7px);
}

/* Forms */
.origins-scope .field {
  display: block; width: 100%;
  font-family: var(--font-sans); font-size: 0.9375em;
  padding: 0.7em 0.85em; border-radius: 6px;
  border: 1px solid var(--paper-edge); background: var(--paper);
  color: var(--ink); transition: border-color .15s, box-shadow .15s;
  outline: none;
}
.origins-scope .field:focus {
  border-color: var(--ember);
  box-shadow: 0 0 0 3px rgba(201,123,79,.15);
}
.origins-scope .label {
  display: block; font-size: 0.8125em; font-weight: 500;
  color: var(--ink-soft); margin-bottom: 6px;
  letter-spacing: 0.01em;
}

/* Type utilities */
.origins-scope .serif { font-family: var(--font-serif); }
.origins-scope .mono { font-family: var(--font-mono); }
.origins-scope .display { font-family: var(--font-serif); font-weight: 500; letter-spacing: -0.015em; line-height: 1.1; }
.origins-scope .muted { color: var(--ink-mute); }
.origins-scope .soft { color: var(--ink-soft); }

/* AI question — typewriter feel */
.origins-scope .ai-question {
  font-family: var(--font-mono);
  color: var(--ink-soft);
  font-size: 0.8125em;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* Divider — subtle hairline */
.origins-scope .rule {
  height: 1px; background: var(--paper-edge); border: 0; margin: 0;
}

/* Scrollbar */
.origins-scope ::-webkit-scrollbar { width: 6px; height: 6px; }
.origins-scope ::-webkit-scrollbar-thumb { background: var(--paper-edge); border-radius: 3px; }

/* Album metaphor intensity:
   0 = clean modern, 1 = subtle (default), 2 = heavy */
.origins-scope[data-album="0"] .photo { padding: 0; box-shadow: 0 1px 3px rgba(58,42,31,.1); border-radius: 6px; }
.origins-scope[data-album="0"] .photo-rotate { transform: none !important; }
.origins-scope[data-album="2"] .photo { padding: 14px 14px 32px; }
.origins-scope[data-album="2"] .photo-rotate-1 { transform: rotate(-1.5deg); }
.origins-scope[data-album="2"] .photo-rotate-2 { transform: rotate(1.2deg); }
.origins-scope[data-album="2"] .photo-rotate-3 { transform: rotate(-0.8deg); }
`;
  document.head.appendChild(s);
}
