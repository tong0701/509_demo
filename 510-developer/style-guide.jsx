// Style guide artboards — colors, type, components, Tailwind config

const Swatch = ({ name, hex, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{
      width: '100%', height: 64, background: hex,
      border: '1px solid rgba(58,42,31,.08)', borderRadius: 4,
    }} />
    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-mute)' }}>{name}</div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-mute)' }}>{hex}</div>
  </div>
);

const ColorsArtboard = () => (
  <div className="origins-scope" data-album="1" style={{ padding: 36, height: '100%', overflow: 'auto' }}>
    <div style={{ marginBottom: 24 }}>
      <div className="display" style={{ fontSize: 28 }}>Color</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Aged paper, espresso ink, terracotta accent. Warm without being twee.</div>
    </div>

    <div style={{ marginBottom: 24 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Paper · Backgrounds</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <Swatch name="--paper" hex="#FBF6EC" label="Paper" />
        <Swatch name="--paper-deep" hex="#F5EBDA" label="Paper deep" />
        <Swatch name="--paper-edge" hex="#EADFC9" label="Paper edge" />
      </div>
    </div>

    <div style={{ marginBottom: 24 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Ink · Text</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <Swatch name="--ink" hex="#3A2A1F" label="Ink" />
        <Swatch name="--ink-soft" hex="#6B4A35" label="Ink soft" />
        <Swatch name="--ink-mute" hex="#9C8270" label="Ink mute" />
      </div>
    </div>

    <div style={{ marginBottom: 24 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Accent</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <Swatch name="--ember" hex="#C97B4F" label="Ember (primary)" />
        <Swatch name="--ember-deep" hex="#A85F35" label="Ember deep" />
        <Swatch name="--ember-soft" hex="#E8C4A8" label="Ember soft" />
      </div>
    </div>

    <div>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Functional</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <Swatch name="--sage" hex="#7A8B6F" label="Sage · saved" />
        <Swatch name="--rose" hex="#B85C5C" label="Rose · record" />
        <Swatch name="--gold" hex="#D4A574" label="Gold · pinned" />
      </div>
    </div>
  </div>
);

const TypeArtboard = () => (
  <div className="origins-scope" data-album="1" style={{ padding: 36, height: '100%', overflow: 'auto' }}>
    <div style={{ marginBottom: 24 }}>
      <div className="display" style={{ fontSize: 28 }}>Typography</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Lora for warmth, Inter for clarity, JetBrains Mono for the AI voice.</div>
    </div>

    <div style={{ marginBottom: 28 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Lora · Display & long-form</div>
      <div className="display" style={{ fontSize: 44 }}>Stories worth keeping.</div>
      <div className="serif" style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--ink-soft)', marginTop: 6 }}>Display 44 / Italic body 16</div>
    </div>

    <hr className="rule" style={{ margin: '20px 0' }} />

    <div style={{ marginBottom: 24 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Inter · UI</div>
      <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Heading · 24/600</div>
      <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Subhead · 18/500</div>
      <div style={{ fontSize: 15, marginBottom: 4 }}>Body · 15/400 — your grandmother's first job, in her own voice.</div>
      <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 4 }}>Caption · 13/400</div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Eyebrow · 11/600</div>
    </div>

    <hr className="rule" style={{ margin: '20px 0' }} />

    <div>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>JetBrains Mono · AI voice</div>
      <div className="ai-question" style={{ fontSize: 13 }}>Question 03 · Childhood</div>
      <div className="mono" style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 8 }}>{'> est. 1952  · theme: family'}</div>
    </div>
  </div>
);

const ComponentsArtboard = () => (
  <div className="origins-scope" data-album="1" style={{ padding: 36, height: '100%', overflow: 'auto' }}>
    <div style={{ marginBottom: 24 }}>
      <div className="display" style={{ fontSize: 28 }}>Components</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Buttons, cards, forms — the working parts.</div>
    </div>

    <div style={{ marginBottom: 28 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Buttons</div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary">Begin interview</button>
        <button className="btn btn-secondary">Save draft</button>
        <button className="btn btn-ghost">Cancel</button>
      </div>
    </div>

    <div style={{ marginBottom: 28 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Form</div>
      <div style={{ maxWidth: 360 }}>
        <label className="label">Their name</label>
        <input className="field" defaultValue="Mei-Lin Chen" />
        <div style={{ height: 12 }} />
        <label className="label">Relationship</label>
        <input className="field" placeholder="e.g. grandmother" />
      </div>
    </div>

    <div style={{ marginBottom: 28 }}>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Card</div>
      <div className="card" style={{ padding: 20, maxWidth: 320 }}>
        <div className="ai-question" style={{ marginBottom: 8 }}>Childhood · 1952</div>
        <div className="display" style={{ fontSize: 18, marginBottom: 6 }}>The mango tree behind the house</div>
        <div className="muted" style={{ fontSize: 13 }}>3 photos · 2 min audio</div>
      </div>
    </div>

    <div>
      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Photo print</div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <div className="photo">
          <div className="photo-inner" style={{ width: 100, height: 100 }} />
        </div>
        <div className="photo">
          <div className="photo-inner" style={{ width: 140, height: 100 }} />
        </div>
      </div>
    </div>
  </div>
);

const TailwindArtboard = () => {
  const config = `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF6EC',
          deep:    '#F5EBDA',
          edge:    '#EADFC9',
        },
        ink: {
          DEFAULT: '#3A2A1F',
          soft:    '#6B4A35',
          mute:    '#9C8270',
        },
        ember: {
          DEFAULT: '#C97B4F',
          deep:    '#A85F35',
          soft:    '#E8C4A8',
        },
        sage: '#7A8B6F',
        rose: '#B85C5C',
        gold: '#D4A574',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        photo: '0 2px 4px rgba(58,42,31,.08), 0 8px 24px rgba(58,42,31,.06)',
        card:  '0 1px 2px rgba(58,42,31,.04)',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
};

// app/layout.tsx — load fonts via next/font
import { Lora, Inter, JetBrains_Mono } from 'next/font/google';
const lora      = Lora({       subsets: ['latin'], variable: '--font-lora' });
const inter     = Inter({      subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });`;

  return (
    <div className="origins-scope" data-album="1" style={{ padding: 36, height: '100%', overflow: 'auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div className="display" style={{ fontSize: 28 }}>Tailwind config</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Drop into your Next.js project. Tokens map 1:1 to the CSS variables in this design.</div>
      </div>
      <pre className="mono" style={{
        fontSize: 11, lineHeight: 1.55, background: 'var(--paper-deep)',
        padding: 18, borderRadius: 6, border: '1px solid var(--paper-edge)',
        color: 'var(--ink)', overflow: 'auto', whiteSpace: 'pre',
        margin: 0,
      }}>{config}</pre>
    </div>
  );
};

Object.assign(window, { ColorsArtboard, TypeArtboard, ComponentsArtboard, TailwindArtboard });
