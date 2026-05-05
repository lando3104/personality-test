import { useState, useEffect, useRef } from "react";
import { questions, sections } from "./questions";

// ─── THEME / GLOBAL STYLES ───────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #16161f;
    --border: #1e1e2e;
    --accent: #c8a96e;
    --accent2: #8b6fd6;
    --text: #e8e4d9;
    --text-muted: #7a7890;
    --text-dim: #4a4860;
    --selected-bg: rgba(200,169,110,0.12);
    --selected-border: #c8a96e;
    --radius: 12px;
    --radius-lg: 20px;
    --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  #root { min-height: 100vh; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-dim); }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes barFill {
    from { width: 0%; }
    to { width: var(--target-width); }
  }
`;

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onStart }) {
  return (
    <div style={styles.landing.wrap}>
      <div style={styles.landing.bg} />
      <div style={styles.landing.content} className="fade-in">
        <div style={styles.landing.badge}>AI-Powered Personality Analysis</div>
        <h1 style={styles.landing.headline}>
          Know Yourself.<br />
          <span style={styles.landing.headlineAccent}>Deeply.</span>
        </h1>
        <p style={styles.landing.sub}>
          79 questions. No fluff. No generic results.<br />
          An AI reads your answers and delivers a real breakdown of who you are — your emotional patterns, relationship style, strengths, and the version of you that's still becoming.
        </p>
        <div style={styles.landing.stats}>
          {[["79", "Questions"], ["10", "Sections"], ["AI", "Powered"]].map(([n, l]) => (
            <div key={l} style={styles.landing.stat}>
              <span style={styles.landing.statNum}>{n}</span>
              <span style={styles.landing.statLabel}>{l}</span>
            </div>
          ))}
        </div>
        <button style={styles.btn.primary} onClick={onStart}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Start Your Test →
        </button>
        <p style={styles.landing.note}>Free · Takes ~15 minutes · No account needed</p>
      </div>
    </div>
  );
}

// ─── INTAKE ───────────────────────────────────────────────────────────────────
function IntakePage({ onContinue }) {
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");

  const canContinue = gender && goal.trim().length > 10;

  return (
    <div style={styles.page.wrap} className="fade-in">
      <div style={styles.page.inner}>
        <div style={styles.intake.header}>
          <div style={styles.intake.step}>Before we begin</div>
          <h2 style={styles.intake.title}>Two quick questions</h2>
          <p style={styles.intake.sub}>Your answers shape the entire experience. Be honest — this is for you.</p>
        </div>

        <div style={styles.card}>
          <label style={styles.intake.label}>How do you identify?</label>
          <div style={styles.intake.genderRow}>
            {["Male", "Female", "Other"].map(g => (
              <button key={g}
                style={{ ...styles.intake.genderBtn, ...(gender === g ? styles.intake.genderSelected : {}) }}
                onClick={() => setGender(g)}
                onMouseEnter={e => { if (gender !== g) e.currentTarget.style.borderColor = "var(--text-muted)"; }}
                onMouseLeave={e => { if (gender !== g) e.currentTarget.style.borderColor = "var(--border)"; }}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <label style={styles.intake.label}>What do you hope to gain from this test?</label>
          <p style={styles.intake.hint}>Be specific — the more honest you are, the better your results.</p>
          <textarea
            style={styles.intake.textarea}
            placeholder="e.g. I want to understand why I overthink in relationships and what kind of partner I actually am..."
            value={goal}
            onChange={e => setGoal(e.target.value)}
            rows={4}
            onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
          />
          <div style={styles.intake.charCount}>{goal.length} characters</div>
        </div>

        <button
          style={{ ...styles.btn.primary, opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}
          onClick={() => canContinue && onContinue({ gender, goal })}
          onMouseEnter={e => { if (canContinue) e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Begin Test →
        </button>
      </div>
    </div>
  );
}

// ─── TEST ─────────────────────────────────────────────────────────────────────
function TestPage({ intake, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const answered = Object.keys(answers).length;

  useEffect(() => {
    setSelected(answers[q.id] || null);
    if (containerRef.current) {
      containerRef.current.style.animation = "none";
      containerRef.current.offsetHeight;
      containerRef.current.style.animation = "slideUp 0.35s ease forwards";
    }
  }, [current]);

  const handleSelect = (val) => {
    if (animating) return;
    setSelected(val);
  };

  const handleNext = () => {
    if (!selected || animating) return;
    setAnimating(true);
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent(c => c + 1);
        setAnimating(false);
      }, 200);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (current === 0 || animating) return;
    setCurrent(c => c - 1);
  };

  const currentSection = q.section;
  const sectionIndex = sections.indexOf(currentSection);

  return (
    <div style={styles.page.wrap}>
      {/* Header */}
      <div style={styles.test.header}>
        <div style={styles.test.headerInner}>
          <div style={styles.test.headerLeft}>
            <span style={styles.test.sectionTag}>Section {sectionIndex + 1} of {sections.length}</span>
            <span style={styles.test.sectionName}>{currentSection}</span>
          </div>
          <div style={styles.test.counter}>
            <span style={styles.test.counterNum}>{current + 1}</span>
            <span style={styles.test.counterOf}> / {questions.length}</span>
          </div>
        </div>
        <div style={styles.test.progressTrack}>
          <div style={{ ...styles.test.progressBar, width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div style={styles.page.inner}>
        <div ref={containerRef} style={{ animation: "slideUp 0.35s ease forwards" }}>
          <div style={styles.test.qNum}>Q{current + 1}</div>
          <h2 style={styles.test.question}>{q.text}</h2>

          <div style={styles.test.options}>
            {q.options.map(opt => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  style={{ ...styles.test.option, ...(isSelected ? styles.test.optionSelected : {}) }}
                  onClick={() => handleSelect(opt.value)}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--text-muted)"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--border)"; }}>
                  <span style={{ ...styles.test.optionLetter, ...(isSelected ? styles.test.optionLetterSelected : {}) }}>
                    {opt.value}
                  </span>
                  <span style={styles.test.optionText}>{opt.label}</span>
                  {isSelected && <span style={styles.test.check}>✓</span>}
                </button>
              );
            })}
          </div>

          <div style={styles.test.nav}>
            <button
              style={{ ...styles.btn.ghost, visibility: current === 0 ? "hidden" : "visible" }}
              onClick={handleBack}>
              ← Back
            </button>
            <button
              style={{ ...styles.btn.primary, opacity: selected ? 1 : 0.35, cursor: selected ? "pointer" : "not-allowed" }}
              onClick={handleNext}
              onMouseEnter={e => { if (selected) e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {current === questions.length - 1 ? "See My Results →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROCESSING ───────────────────────────────────────────────────────────────
function ProcessingPage({ intake, answers, onResults }) {
  const [status, setStatus] = useState("Analyzing your responses...");
  const [dot, setDot] = useState(0);
  const called = useRef(false);

  const statusSteps = [
    "Analyzing your responses...",
    "Mapping emotional patterns...",
    "Building your personality profile...",
    "Generating your personalized report...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDot(d => (d + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let step = 0;
    const stepInterval = setInterval(() => {
      step++;
      if (step < statusSteps.length) setStatus(statusSteps[step]);
    }, 3500);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    generateReport();
  }, []);

  const generateReport = async () => {
    const formattedAnswers = questions.map(q => {
      const ans = answers[q.id];
      const opt = q.options.find(o => o.value === ans);
      return `Q${q.id} (${q.section}): ${q.text}\nAnswer: ${ans} — ${opt?.label || ""}`;
    }).join("\n\n");

    const prompt = `You are an expert personality analyst. Analyze the following personality test responses and generate a detailed, insightful personality report.

USER PROFILE:
- Gender: ${intake.gender}
- What they hope to gain: "${intake.goal}"

ALL 79 RESPONSES:
${formattedAnswers}

Generate a comprehensive personality report in JSON format. The report should be deeply personalized, insightful, human-like, and directly address their stated goal: "${intake.goal}".

Adjust tone slightly based on gender without stereotyping. Be specific, not generic. Reference patterns you actually see in their answers.

Return ONLY valid JSON with this exact structure:
{
  "personalityType": "Short evocative name (e.g. The Loyal Deep-Feeler)",
  "tagline": "One powerful sentence that captures them",
  "summary": "3-4 paragraph overview of who they are. Be specific and insightful. Reference actual patterns from their answers.",
  "traitScores": [
    {"trait": "Loyalty", "score": 9},
    {"trait": "Emotional Depth", "score": 8},
    {"trait": "Overthinking", "score": 7},
    {"trait": "Affection", "score": 9},
    {"trait": "Communication", "score": 6},
    {"trait": "Confidence", "score": 7},
    {"trait": "Resilience", "score": 8},
    {"trait": "Independence", "score": 6}
  ],
  "sections": [
    {
      "title": "Emotional Blueprint",
      "icon": "🧠",
      "content": "2-3 paragraphs of deep insight into their emotional patterns. Be specific."
    },
    {
      "title": "Attachment Style",
      "icon": "🔗",
      "content": "2-3 paragraphs on how they attach, what they need, what triggers them."
    },
    {
      "title": "Relationship Style",
      "icon": "❤️",
      "content": "2-3 paragraphs on how they love, show up, and what they need from a partner."
    },
    {
      "title": "Communication Patterns",
      "icon": "💬",
      "content": "2-3 paragraphs on how they communicate, especially when hurt or stressed."
    },
    {
      "title": "Strengths",
      "icon": "⚡",
      "content": "2-3 paragraphs on their genuine strengths. Be specific and affirmative."
    },
    {
      "title": "Growth Areas",
      "icon": "🌱",
      "content": "2-3 paragraphs on areas to work on. Be honest but constructive, not critical."
    },
    {
      "title": "Personalized Insight",
      "icon": "🎯",
      "content": "2-3 paragraphs directly addressing their stated goal: '${intake.goal}'. This section must feel 100% personal to them."
    },
    {
      "title": "Actionable Advice",
      "icon": "🛠️",
      "content": "3-4 specific, practical actions they can take based on everything above. Not generic tips."
    }
  ],
  "finalNote": "A closing paragraph that feels personal, warm, and motivating. End on something real."
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(clean);
      onResults(parsed);
    } catch (err) {
      console.error(err);
      onResults({ error: true, message: err.message });
    }
  };

  return (
    <div style={styles.processing.wrap}>
      <div style={styles.processing.inner} className="fade-in">
        <div style={styles.processing.spinner} />
        <h2 style={styles.processing.title}>{status}<span style={{ opacity: [1, 0.7, 0.4, 0.1][dot] }}>...</span></h2>
        <p style={styles.processing.sub}>Our AI is reading your 79 answers and building your profile. This takes about 20–30 seconds.</p>
        <div style={styles.processing.steps}>
          {statusSteps.map((s, i) => (
            <div key={i} style={{ ...styles.processing.step, opacity: status === s ? 1 : statusSteps.indexOf(status) > i ? 0.5 : 0.2 }}>
              <span style={{ color: statusSteps.indexOf(status) >= i ? "var(--accent)" : "var(--text-dim)" }}>
                {statusSteps.indexOf(status) > i ? "✓" : "○"}
              </span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function ResultsPage({ results, intake }) {
  const [activeSection, setActiveSection] = useState(0);

  if (results.error) {
    return (
      <div style={styles.processing.wrap}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: "var(--text-muted)" }}>The AI couldn't generate your report. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.results.wrap} className="fade-in">
      {/* Hero */}
      <div style={styles.results.hero}>
        <div style={styles.results.heroInner}>
          <div style={styles.results.heroTag}>Your Personality Profile</div>
          <h1 style={styles.results.heroTitle}>{results.personalityType}</h1>
          <p style={styles.results.heroTagline}>{results.tagline}</p>
        </div>
      </div>

      <div style={styles.results.body}>
        {/* Summary */}
        <section style={styles.results.section}>
          <h2 style={styles.results.sectionTitle}>Overview</h2>
          {results.summary?.split("\n").filter(Boolean).map((p, i) => (
            <p key={i} style={styles.results.para}>{p}</p>
          ))}
        </section>

        {/* Trait scores */}
        <section style={styles.results.section}>
          <h2 style={styles.results.sectionTitle}>Trait Breakdown</h2>
          <div style={styles.results.traits}>
            {results.traitScores?.map(({ trait, score }) => (
              <div key={trait} style={styles.results.trait}>
                <div style={styles.results.traitRow}>
                  <span style={styles.results.traitName}>{trait}</span>
                  <span style={styles.results.traitScore}>{score}/10</span>
                </div>
                <div style={styles.results.traitTrack}>
                  <div style={{
                    ...styles.results.traitBar,
                    "--target-width": `${score * 10}%`,
                    animation: "barFill 1s ease forwards",
                    width: `${score * 10}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section style={styles.results.section}>
          <h2 style={styles.results.sectionTitle}>Deep Dive</h2>
          <div style={styles.results.tabs}>
            {results.sections?.map((s, i) => (
              <button key={i}
                style={{ ...styles.results.tab, ...(activeSection === i ? styles.results.tabActive : {}) }}
                onClick={() => setActiveSection(i)}>
                {s.icon} {s.title}
              </button>
            ))}
          </div>
          {results.sections?.[activeSection] && (
            <div style={styles.results.tabContent} key={activeSection} className="fade-in">
              <div style={styles.results.tabHeader}>
                <span style={styles.results.tabIcon}>{results.sections[activeSection].icon}</span>
                <h3 style={styles.results.tabTitle}>{results.sections[activeSection].title}</h3>
              </div>
              {results.sections[activeSection].content?.split("\n").filter(Boolean).map((p, i) => (
                <p key={i} style={styles.results.para}>{p}</p>
              ))}
            </div>
          )}
        </section>

        {/* Final note */}
        {results.finalNote && (
          <section style={styles.results.finalNote}>
            <div style={styles.results.finalNoteInner}>
              <p style={styles.results.finalNotePara}>{results.finalNote}</p>
            </div>
          </section>
        )}

        <div style={{ textAlign: "center", paddingBottom: 64 }}>
          <button
            style={styles.btn.ghost}
            onClick={() => window.location.reload()}>
            ↺ Take the test again
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  btn: {
    primary: {
      background: "var(--accent)",
      color: "#0a0a0f",
      border: "none",
      borderRadius: "var(--radius)",
      padding: "14px 32px",
      fontSize: 15,
      fontWeight: 600,
      fontFamily: "Syne, sans-serif",
      cursor: "pointer",
      transition: "transform var(--transition), box-shadow var(--transition)",
      letterSpacing: "0.02em",
      display: "inline-block",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "12px 24px",
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "DM Sans, sans-serif",
      transition: "color var(--transition), border-color var(--transition)",
    },
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "28px 32px",
    marginBottom: 20,
  },
  page: {
    wrap: {
      minHeight: "100vh",
      paddingTop: 80,
      paddingBottom: 80,
    },
    inner: {
      maxWidth: 680,
      margin: "0 auto",
      padding: "0 24px",
    },
  },
  landing: {
    wrap: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    },
    bg: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,111,214,0.08) 0%, transparent 60%)",
      pointerEvents: "none",
    },
    content: {
      maxWidth: 600,
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    },
    badge: {
      display: "inline-block",
      background: "rgba(200,169,110,0.1)",
      border: "1px solid rgba(200,169,110,0.25)",
      color: "var(--accent)",
      padding: "6px 16px",
      borderRadius: 100,
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.05em",
      marginBottom: 32,
      textTransform: "uppercase",
    },
    headline: {
      fontFamily: "Syne, sans-serif",
      fontSize: "clamp(48px, 8vw, 80px)",
      fontWeight: 800,
      lineHeight: 1.05,
      marginBottom: 12,
      letterSpacing: "-0.02em",
    },
    headlineAccent: {
      color: "var(--accent)",
    },
    sub: {
      fontSize: 18,
      color: "var(--text-muted)",
      lineHeight: 1.7,
      marginBottom: 40,
      fontWeight: 300,
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: 40,
      marginBottom: 40,
    },
    stat: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    },
    statNum: {
      fontFamily: "Syne, sans-serif",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--accent)",
    },
    statLabel: {
      fontSize: 12,
      color: "var(--text-dim)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
    note: {
      marginTop: 16,
      fontSize: 13,
      color: "var(--text-dim)",
    },
  },
  intake: {
    header: { marginBottom: 40, textAlign: "center" },
    step: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--accent)",
      marginBottom: 12,
    },
    title: {
      fontFamily: "Syne, sans-serif",
      fontSize: 36,
      fontWeight: 700,
      marginBottom: 12,
    },
    sub: { color: "var(--text-muted)", fontSize: 16 },
    label: {
      display: "block",
      fontFamily: "Syne, sans-serif",
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 16,
    },
    hint: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 14,
      marginTop: -8,
    },
    genderRow: { display: "flex", gap: 12 },
    genderBtn: {
      flex: 1,
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "14px",
      color: "var(--text)",
      fontSize: 15,
      fontFamily: "DM Sans, sans-serif",
      cursor: "pointer",
      transition: "all var(--transition)",
    },
    genderSelected: {
      background: "var(--selected-bg)",
      borderColor: "var(--selected-border)",
      color: "var(--accent)",
    },
    textarea: {
      width: "100%",
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "16px",
      color: "var(--text)",
      fontSize: 15,
      fontFamily: "DM Sans, sans-serif",
      lineHeight: 1.6,
      resize: "vertical",
      transition: "border-color var(--transition)",
      outline: "none",
    },
    charCount: {
      textAlign: "right",
      fontSize: 12,
      color: "var(--text-dim)",
      marginTop: 8,
    },
  },
  test: {
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(10,10,15,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
    },
    headerInner: {
      maxWidth: 680,
      margin: "0 auto",
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: { display: "flex", flexDirection: "column", gap: 2 },
    sectionTag: { fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" },
    sectionName: { fontSize: 13, color: "var(--text-muted)", fontWeight: 500 },
    counter: { fontFamily: "Syne, sans-serif" },
    counterNum: { fontSize: 22, fontWeight: 700, color: "var(--accent)" },
    counterOf: { fontSize: 14, color: "var(--text-dim)" },
    progressTrack: { height: 2, background: "var(--border)" },
    progressBar: {
      height: "100%",
      background: "linear-gradient(90deg, var(--accent2), var(--accent))",
      transition: "width 0.4s ease",
    },
    qNum: {
      fontSize: 12,
      fontFamily: "Syne, sans-serif",
      fontWeight: 700,
      color: "var(--accent)",
      letterSpacing: "0.1em",
      marginBottom: 16,
      textTransform: "uppercase",
    },
    question: {
      fontFamily: "Syne, sans-serif",
      fontSize: "clamp(18px, 3vw, 24px)",
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: 32,
      letterSpacing: "-0.01em",
    },
    options: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 },
    option: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "14px 18px",
      cursor: "pointer",
      transition: "all var(--transition)",
      textAlign: "left",
      color: "var(--text)",
      fontFamily: "DM Sans, sans-serif",
      fontSize: 15,
    },
    optionSelected: {
      background: "var(--selected-bg)",
      borderColor: "var(--selected-border)",
    },
    optionLetter: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontFamily: "Syne, sans-serif",
      fontWeight: 700,
      color: "var(--text-muted)",
      flexShrink: 0,
      lineHeight: 1,
    },
    optionLetterSelected: {
      background: "var(--accent)",
      borderColor: "var(--accent)",
      color: "#0a0a0f",
    },
    optionText: { flex: 1, lineHeight: 1.5 },
    check: { color: "var(--accent)", fontSize: 16, marginLeft: "auto", flexShrink: 0 },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 80 },
  },
  processing: {
    wrap: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },
    inner: {
      maxWidth: 480,
      textAlign: "center",
    },
    spinner: {
      width: 48,
      height: 48,
      border: "3px solid var(--border)",
      borderTopColor: "var(--accent)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      margin: "0 auto 32px",
    },
    title: {
      fontFamily: "Syne, sans-serif",
      fontSize: 22,
      fontWeight: 600,
      marginBottom: 12,
    },
    sub: { color: "var(--text-muted)", fontSize: 15, marginBottom: 40, lineHeight: 1.6 },
    steps: { display: "flex", flexDirection: "column", gap: 12, textAlign: "left" },
    step: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14,
      color: "var(--text-muted)",
      transition: "opacity 0.4s ease",
    },
  },
  results: {
    wrap: { minHeight: "100vh" },
    hero: {
      padding: "100px 24px 80px",
      background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(200,169,110,0.1) 0%, transparent 70%)",
      borderBottom: "1px solid var(--border)",
      textAlign: "center",
    },
    heroInner: { maxWidth: 700, margin: "0 auto" },
    heroTag: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "var(--accent)",
      marginBottom: 20,
    },
    heroTitle: {
      fontFamily: "Syne, sans-serif",
      fontSize: "clamp(36px, 6vw, 60px)",
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: 16,
      letterSpacing: "-0.02em",
    },
    heroTagline: {
      fontSize: 20,
      color: "var(--text-muted)",
      fontStyle: "italic",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    body: { maxWidth: 760, margin: "0 auto", padding: "0 24px" },
    section: { paddingTop: 64, paddingBottom: 16 },
    sectionTitle: {
      fontFamily: "Syne, sans-serif",
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 24,
      color: "var(--text)",
      borderBottom: "1px solid var(--border)",
      paddingBottom: 12,
    },
    para: {
      color: "var(--text-muted)",
      fontSize: 16,
      lineHeight: 1.8,
      marginBottom: 16,
    },
    traits: { display: "flex", flexDirection: "column", gap: 16 },
    trait: {},
    traitRow: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
    traitName: { fontSize: 14, fontWeight: 500 },
    traitScore: { fontSize: 14, color: "var(--accent)", fontFamily: "Syne, sans-serif", fontWeight: 600 },
    traitTrack: { height: 6, background: "var(--surface2)", borderRadius: 3, overflow: "hidden" },
    traitBar: {
      height: "100%",
      background: "linear-gradient(90deg, var(--accent2), var(--accent))",
      borderRadius: 3,
    },
    tabs: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 32,
    },
    tab: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "8px 16px",
      color: "var(--text-muted)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "DM Sans, sans-serif",
      transition: "all var(--transition)",
      whiteSpace: "nowrap",
    },
    tabActive: {
      background: "var(--selected-bg)",
      borderColor: "var(--selected-border)",
      color: "var(--accent)",
    },
    tabContent: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "32px",
    },
    tabHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
    tabIcon: { fontSize: 24 },
    tabTitle: { fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700 },
    finalNote: {
      paddingTop: 48,
      paddingBottom: 32,
    },
    finalNoteInner: {
      background: "linear-gradient(135deg, rgba(200,169,110,0.08), rgba(139,111,214,0.08))",
      border: "1px solid rgba(200,169,110,0.2)",
      borderRadius: "var(--radius-lg)",
      padding: "40px",
    },
    finalNotePara: {
      fontSize: 18,
      lineHeight: 1.8,
      color: "var(--text)",
      fontStyle: "italic",
      fontWeight: 300,
    },
  },
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | intake | test | processing | results
  const [intake, setIntake] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);

  return (
    <>
      <style>{globalStyles}</style>
      {screen === "landing" && <LandingPage onStart={() => setScreen("intake")} />}
      {screen === "intake" && (
        <IntakePage onContinue={(data) => { setIntake(data); setScreen("test"); }} />
      )}
      {screen === "test" && (
        <TestPage intake={intake} onComplete={(ans) => { setAnswers(ans); setScreen("processing"); }} />
      )}
      {screen === "processing" && (
        <ProcessingPage intake={intake} answers={answers}
          onResults={(r) => { setResults(r); setScreen("results"); }} />
      )}
      {screen === "results" && <ResultsPage results={results} intake={intake} />}
    </>
  );
}
