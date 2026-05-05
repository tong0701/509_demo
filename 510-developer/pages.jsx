// Origins — page mockups (5 screens, all desktop web)

// ─── Shared chrome ────────────────────────────────────────────
const TopNav = ({ active = 'Dashboard', subtitle }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 32px', borderBottom: '1px solid var(--paper-edge)',
    background: 'var(--paper)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <div className="display" style={{ fontSize: 22, letterSpacing: '-0.01em' }}>
        Origins<span style={{ color: 'var(--ember)' }}>.</span>
      </div>
      {subtitle && <div className="muted" style={{ fontSize: 13 }}>{subtitle}</div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button className="btn btn-ghost" style={{ fontSize: 13 }}>Help</button>
      <div style={{
        width: 32, height: 32, borderRadius: 16, background: 'var(--ember-soft)',
        color: 'var(--ember-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 600,
      }}>WC</div>
    </div>
  </div>
);

// ─── 1. AUTH ──────────────────────────────────────────────────
const AuthPage = () => (
  <div className="origins-scope" data-album="1" style={{ height: '100%' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
      {/* Left — quiet brand panel */}
      <div style={{
        background: 'var(--paper-deep)', padding: 56,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="display" style={{ fontSize: 26, letterSpacing: '-0.01em' }}>
          Origins<span style={{ color: 'var(--ember)' }}>.</span>
        </div>
        <div style={{ position: 'relative' }}>
          <div className="photo photo-rotate-1" style={{ position: 'absolute', top: -40, left: 30, transform: 'rotate(-3deg)' }}>
            <div className="photo-inner" style={{ width: 130, height: 96 }} />
          </div>
          <div className="photo photo-rotate-2" style={{ position: 'absolute', top: 10, left: 130, transform: 'rotate(2deg)' }}>
            <div className="photo-inner" style={{ width: 110, height: 140 }} />
          </div>
          <div style={{ height: 220 }} />
          <div className="display" style={{ fontSize: 36, marginBottom: 14, lineHeight: 1.15, maxWidth: 380 }}>
            The stories your family hasn't told yet.
          </div>
          <div className="serif" style={{ fontSize: 17, fontStyle: 'italic', color: 'var(--ink-soft)', maxWidth: 340 }}>
            A gentle interviewer for the people you love.
          </div>
        </div>
        <div className="ai-question" style={{ fontSize: 11 }}>est. 2026 · for grandparents, parents, and the unhurried</div>
      </div>

      {/* Right — form */}
      <div style={{ padding: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 320 }}>
          <div className="display" style={{ fontSize: 28, marginBottom: 6 }}>Welcome back</div>
          <div className="muted" style={{ fontSize: 14, marginBottom: 28 }}>Sign in to continue capturing.</div>

          <label className="label">Email</label>
          <input className="field" defaultValue="will@uw.edu" />
          <div style={{ height: 14 }} />
          <label className="label">Password</label>
          <input className="field" type="password" defaultValue="••••••••••" />

          <button className="btn btn-primary" style={{ width: '100%', marginTop: 20, padding: '0.8em 1.2em' }}>
            Sign in
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <hr className="rule" style={{ flex: 1 }} />
            <span className="muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>or</span>
            <hr className="rule" style={{ flex: 1 }} />
          </div>

          <button className="btn btn-secondary" style={{ width: '100%' }}>
            Continue with Google
          </button>

          <div style={{ marginTop: 28, fontSize: 13, color: 'var(--ink-soft)', textAlign: 'center' }}>
            New here? <span style={{ color: 'var(--ember-deep)', fontWeight: 500, cursor: 'pointer' }}>Create an account</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── 2. DASHBOARD ─────────────────────────────────────────────
const PersonCard = ({ name, rel, years, stories, photoH, rotate }) => (
  <div style={{ cursor: 'pointer' }}>
    <div className={`photo photo-rotate-${rotate}`} style={{ display: 'block', marginBottom: 14 }}>
      <div className="photo-inner" style={{ width: '100%', height: photoH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>portrait</span>
      </div>
    </div>
    <div className="display" style={{ fontSize: 20, marginBottom: 2 }}>{name}</div>
    <div className="serif" style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 8 }}>
      {rel} · b. {years}
    </div>
    <div className="muted" style={{ fontSize: 12 }}>{stories} stories captured</div>
  </div>
);

const DashboardPage = () => (
  <div className="origins-scope" data-album="1" style={{ height: '100%', overflow: 'auto' }}>
    <TopNav />
    <div style={{ padding: '40px 32px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <div className="ai-question" style={{ marginBottom: 8 }}>Your people</div>
          <div className="display" style={{ fontSize: 32 }}>Whose stories will you keep?</div>
        </div>
        <button className="btn btn-primary">+ Add someone</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, marginBottom: 48 }}>
        <PersonCard name="Mei-Lin Chen" rel="Grandmother" years={1938} stories={24} photoH={220} rotate={1} />
        <PersonCard name="Robert Whitfield" rel="Grandfather" years={1934} stories={18} photoH={220} rotate={2} />
        <PersonCard name="Linda Whitfield" rel="Mother" years={1962} stories={11} photoH={220} rotate={3} />
      </div>

      <hr className="rule" style={{ marginBottom: 24 }} />

      <div className="soft" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
        Recent activity
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Mei-Lin Chen', 'New story captured', '“The mango tree behind the house”', '2h ago'],
          ['Robert Whitfield', 'Photo added', 'Wedding day, 1958', 'Yesterday'],
          ['Linda Whitfield', 'Interview resumed', '4 questions answered', '3 days ago'],
        ].map(([who, what, detail, when], i) => (
          <div key={i} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18, background: 'var(--ember-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: 'var(--ember-deep)',
            }}>{who.split(' ').map(n => n[0]).join('')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{who} · <span className="soft" style={{ fontWeight: 400 }}>{what}</span></div>
              <div className="serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--ink-soft)' }}>{detail}</div>
            </div>
            <div className="muted" style={{ fontSize: 12 }}>{when}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── 3. INTERVIEW SESSION ─────────────────────────────────────
const InterviewPage = () => (
  <div className="origins-scope" data-album="1" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <TopNav subtitle="Interviewing Mei-Lin Chen · Question 7 of ∞" />

    <div style={{ flex: 1, overflow: 'auto', padding: '60px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <div className="ai-question" style={{ marginBottom: 24, textAlign: 'center' }}>
          Question 07 · Childhood
        </div>

        <div className="display" style={{ fontSize: 36, lineHeight: 1.25, textAlign: 'center', marginBottom: 12 }}>
          Was there a place you used to escape to when you were small?
        </div>

        <div className="serif" style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 48 }}>
          A garden, a corner, a tree — somewhere that felt like yours.
        </div>

        {/* Response area — recording state */}
        <div style={{ background: 'var(--paper-deep)', borderRadius: 10, padding: 28, border: '1px solid var(--paper-edge)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 24,
                background: 'var(--rose)', opacity: 0.2,
              }} />
              <div style={{
                position: 'absolute', inset: 6, borderRadius: 18,
                background: 'var(--rose)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#fff' }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Recording…</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>00:42</div>
            </div>
            {/* waveform */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28 }}>
              {[6, 14, 9, 22, 18, 11, 24, 16, 8, 19, 13, 6, 20, 12].map((h, i) => (
                <div key={i} style={{ width: 2, height: h, background: 'var(--ember)', borderRadius: 1, opacity: 0.4 + (i % 5) * 0.12 }} />
              ))}
            </div>
          </div>

          <div className="rule" style={{ marginBottom: 14 }} />

          <div className="soft" style={{ fontSize: 12, marginBottom: 6 }}>Or type your answer:</div>
          <textarea
            className="field"
            rows={4}
            placeholder="There was an old mango tree behind our house in Taipei…"
            style={{ resize: 'none', fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.55 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <button className="btn btn-ghost">← Skip this one</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary">Save & pause</button>
            <button className="btn btn-primary">Save & continue →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── 4. TIMELINE ──────────────────────────────────────────────
const TimelineEntry = ({ year, age, theme, title, snippet, photos = 0, hasAudio, rotate, side = 'right' }) => (
  <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, marginBottom: 48 }}>
    <div style={{ textAlign: 'right', paddingTop: 4 }}>
      <div className="display" style={{ fontSize: 26, color: 'var(--ember-deep)' }}>{year}</div>
      <div className="muted" style={{ fontSize: 12 }}>age {age}</div>
    </div>
    <div style={{ position: 'relative', paddingLeft: 32, borderLeft: '1px solid var(--paper-edge)' }}>
      <div style={{
        position: 'absolute', left: -5, top: 8, width: 9, height: 9, borderRadius: 5,
        background: 'var(--ember)', border: '2px solid var(--paper)',
      }} />
      <div className="ai-question" style={{ marginBottom: 8 }}>{theme}</div>
      <div className="display" style={{ fontSize: 22, marginBottom: 6 }}>{title}</div>
      <div className="serif" style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 14, maxWidth: 480 }}>
        {snippet}
      </div>
      {photos > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-end' }}>
          {Array.from({ length: photos }).map((_, i) => (
            <div key={i} className={`photo photo-rotate-${(i % 3) + 1}`} style={{ transform: `rotate(${(i - 1) * 1.5}deg)` }}>
              <div className="photo-inner" style={{ width: i === 0 ? 120 : 90, height: 88 }} />
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 12, color: 'var(--ink-mute)' }}>
        {hasAudio && <span>♪ 2:14 audio</span>}
        {photos > 0 && <span>{photos} photo{photos > 1 ? 's' : ''}</span>}
        <span style={{ color: 'var(--ember-deep)', fontWeight: 500, cursor: 'pointer' }}>Read full story →</span>
      </div>
    </div>
  </div>
);

const TimelinePage = () => (
  <div className="origins-scope" data-album="1" style={{ height: '100%', overflow: 'auto' }}>
    <TopNav />
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 32px 60px' }}>
      {/* Header — person card */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', marginBottom: 12 }}>
        <div className="photo photo-rotate-1" style={{ flexShrink: 0, transform: 'rotate(-2deg)' }}>
          <div className="photo-inner" style={{ width: 140, height: 170 }} />
        </div>
        <div style={{ flex: 1, paddingBottom: 12 }}>
          <div className="ai-question" style={{ marginBottom: 8 }}>Timeline</div>
          <div className="display" style={{ fontSize: 40, marginBottom: 4 }}>Mei-Lin Chen</div>
          <div className="serif" style={{ fontSize: 17, fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 14 }}>
            Grandmother · 1938 — present · Taipei, then San Francisco
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" style={{ fontSize: 13 }}>Continue interview</button>
            <button className="btn btn-secondary" style={{ fontSize: 13 }}>+ Add a photo</button>
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>Share</button>
          </div>
        </div>
      </div>

      {/* Era filter */}
      <div style={{ display: 'flex', gap: 6, margin: '36px 0 32px', borderBottom: '1px solid var(--paper-edge)', paddingBottom: 12 }}>
        {['All', 'Childhood', 'Youth', 'Marriage', 'Career', 'Family', 'Now'].map((e, i) => (
          <button key={e} className={i === 0 ? 'btn btn-secondary' : 'btn btn-ghost'} style={{ fontSize: 13, padding: '0.5em 0.9em' }}>{e}</button>
        ))}
      </div>

      <TimelineEntry year={1944} age={6} theme="Childhood · Taipei"
        title="The mango tree behind the house"
        snippet="There was an old mango tree behind our house. In summer the fruit would fall, and my brother and I would run out before the ants could find them. The cicadas were so loud you could hardly hear yourself think…"
        photos={2} hasAudio rotate={1} />

      <TimelineEntry year={1956} age={18} theme="Youth · First job"
        title="Sewing factory on Minquan Road"
        snippet="My mother said I should learn to sew before I learned to read. She wasn't wrong. The factory paid forty dollars a month and I gave thirty to her, every Friday."
        photos={1} hasAudio rotate={2} />

      <TimelineEntry year={1962} age={24} theme="Marriage · Taipei"
        title="The day I met your grandfather"
        snippet="He was the only one at the noodle shop wearing a tie. I thought he was showing off. He told me later he wore it because he was nervous about meeting me."
        photos={3} hasAudio rotate={3} />

      <TimelineEntry year={1971} age={33} theme="Family · San Francisco"
        title="The first winter we couldn't afford heat"
        snippet="We wore three sweaters indoors and your mother thought it was a game…"
        photos={0} hasAudio rotate={1} />
    </div>
  </div>
);

// ─── 5. STORY DETAIL ──────────────────────────────────────────
const StoryDetailPage = () => (
  <div className="origins-scope" data-album="1" style={{ height: '100%', overflow: 'auto' }}>
    <TopNav />
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 32px 60px' }}>
      <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--ink-soft)' }}>
        <span style={{ cursor: 'pointer' }}>← Mei-Lin Chen's timeline</span>
      </div>

      <div className="ai-question" style={{ marginBottom: 14 }}>Childhood · Taipei · 1944</div>
      <div className="display" style={{ fontSize: 38, lineHeight: 1.15, marginBottom: 14 }}>
        The mango tree behind the house
      </div>
      <div className="serif" style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 28 }}>
        In response to: "Was there a place you used to escape to when you were small?"
      </div>

      {/* Audio player */}
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button style={{
          width: 44, height: 44, borderRadius: 22, background: 'var(--ember)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <div style={{ width: 0, height: 0, borderLeft: '10px solid #fff', borderTop: '7px solid transparent', borderBottom: '7px solid transparent', marginLeft: 3 }} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: 'var(--paper-edge)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '34%', background: 'var(--ember)', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--ink-mute)' }} className="mono">
            <span>0:46</span><span>2:14</span>
          </div>
        </div>
        <div className="muted" style={{ fontSize: 12 }}>Mei-Lin's voice</div>
      </div>

      {/* Photos */}
      <div style={{ display: 'flex', gap: 18, marginBottom: 36, flexWrap: 'wrap' }}>
        <div className="photo photo-rotate-1" style={{ transform: 'rotate(-2deg)' }}>
          <div className="photo-inner" style={{ width: 200, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>house, 1947</span>
          </div>
        </div>
        <div className="photo photo-rotate-2" style={{ transform: 'rotate(1.5deg)' }}>
          <div className="photo-inner" style={{ width: 160, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>mei-lin & brother</span>
          </div>
        </div>
      </div>

      {/* Body — transcript */}
      <div className="serif" style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32 }}>
        <p style={{ margin: '0 0 1em' }}>
          There was an old mango tree behind our house. In summer the fruit would fall, and my brother and I would run out before the ants could find them. The cicadas were so loud you could hardly hear yourself think.
        </p>
        <p style={{ margin: '0 0 1em' }}>
          My mother kept a basket by the back door — for the mangoes, but also for whatever else we found. Once we brought back a whole nest of fallen sparrows. She didn't scold us. She put them in a box with a cloth and we fed them with a chopstick dipped in rice water.
        </p>
        <p style={{ margin: 0 }}>
          That tree is gone now. They built apartments on top of it sometime in the eighties. But I still dream about it. The smell, mostly.
        </p>
      </div>

      <hr className="rule" style={{ marginBottom: 20 }} />

      {/* Meta footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--ink-mute)' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Captured March 12, 2026</span>
          <span>Theme: Childhood</span>
          <span className="mono">est. date: 1944</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Edit</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Share</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { AuthPage, DashboardPage, InterviewPage, TimelinePage, StoryDetailPage });
