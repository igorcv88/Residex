import MedPanelPage from "./medpanel-layout";

// ── Constantes farmacológicas ──────────────────────────────────────────────
const NACL20_MEQ_PER_ML = 3.4; // NaCl 20%: ~3,4 mEq Na⁺/mL
const KCL10_MEQ_PER_ML = 1.34; // KCl 10%:  ~1,34 mEq K⁺/mL
const KCL191_MEQ_PER_ML = 2.565; // KCl 19,1%: ~2,565 mEq K⁺/mL

// ── Holliday-Segar ─────────────────────────────────────────────────────────
function hollidaySegar(kg) {
  if (kg <= 10) return kg * 100;
  if (kg <= 20) return 1000 + (kg - 10) * 50;
  return 1500 + (kg - 20) * 20;
}

function r1(n) {
  return Math.round(n * 10) / 10;
}
function r0(n) {
  return Math.round(n);
}

// ── Estilos ────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    background: "linear-gradient(135deg, #0d1117 0%, #0f1923 100%)",
    color: "#e2e8f0",
    minHeight: "100vh",
    padding: "2rem 1rem",
    boxSizing: "border-box",
  },
  card: {
    maxWidth: 680,
    margin: "0 auto",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
  },
  header: {
    background: "linear-gradient(90deg, #0e4d6b 0%, #0a3a52 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "1.5rem 2rem",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#7dd3fc",
  },
  headerSub: {
    margin: "0.25rem 0 0",
    fontSize: "0.7rem",
    color: "rgba(125,211,252,0.55)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  body: { padding: "1.75rem 2rem" },

  // Seção
  section: {
    marginBottom: "1.75rem",
  },
  sectionLabel: {
    fontSize: "0.62rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#64748b",
    marginBottom: "0.75rem",
    fontWeight: 600,
  },

  // Input row
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    color: "#94a3b8",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    fontFamily: "inherit",
    fontSize: "1.1rem",
    padding: "0.6rem 0.85rem",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    fontFamily: "inherit",
    fontSize: "0.85rem",
    padding: "0.6rem 0.85rem",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },

  // Divisor
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    margin: "1.5rem 0",
  },

  // Blocos de resultado
  resultBlock: {
    background: "rgba(14, 77, 107, 0.18)",
    border: "1px solid rgba(125, 211, 252, 0.12)",
    borderRadius: 12,
    padding: "1.2rem 1.5rem",
    marginBottom: "0.75rem",
  },
  resultBlockAlt: {
    background: "rgba(22, 163, 74, 0.1)",
    border: "1px solid rgba(74, 222, 128, 0.15)",
    borderRadius: 12,
    padding: "1.2rem 1.5rem",
    marginBottom: "0.75rem",
  },
  resultTitle: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    color: "#7dd3fc",
    textTransform: "uppercase",
    marginBottom: "0.9rem",
    fontWeight: 700,
  },
  resultTitleGreen: {
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    color: "#4ade80",
    textTransform: "uppercase",
    marginBottom: "0.9rem",
    fontWeight: 700,
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  resultItem: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  resultKey: {
    fontSize: "0.62rem",
    color: "#64748b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  resultVal: {
    fontSize: "1.45rem",
    fontWeight: 700,
    color: "#f1f5f9",
    lineHeight: 1.15,
  },
  resultUnit: {
    fontSize: "0.7rem",
    color: "#7dd3fc",
    marginLeft: 4,
    fontWeight: 400,
  },
  resultValGreen: {
    fontSize: "1.45rem",
    fontWeight: 700,
    color: "#4ade80",
    lineHeight: 1.15,
  },
  unitGreen: {
    fontSize: "0.7rem",
    color: "#86efac",
    marginLeft: 4,
    fontWeight: 400,
  },

  // Linha de composição
  compRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  compLabel: {
    fontSize: "0.78rem",
    color: "#94a3b8",
  },
  compVal: {
    fontSize: "0.92rem",
    fontWeight: 700,
    color: "#f1f5f9",
  },

  // Badge de velocidade
  velBadge: {
    marginTop: "0.75rem",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(125,211,252,0.08)",
    border: "1px solid rgba(125,211,252,0.2)",
    borderRadius: 20,
    padding: "0.4rem 1rem",
    fontSize: "0.8rem",
    color: "#bae6fd",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#38bdf8",
    display: "inline-block",
  },

  // Empty state
  emptyState: {
    textAlign: "center",
    padding: "2rem 0",
    color: "#334155",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },

  // Toggle tabs
  tabs: {
    display: "flex",
    gap: 6,
    marginBottom: "1.5rem",
  },
  tab: (active) => ({
    flex: 1,
    padding: "0.55rem",
    borderRadius: 8,
    border: active
      ? "1px solid rgba(125,211,252,0.4)"
      : "1px solid rgba(255,255,255,0.07)",
    background: active ? "rgba(14,77,107,0.4)" : "rgba(255,255,255,0.03)",
    color: active ? "#7dd3fc" : "#475569",
    fontSize: "0.68rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: active ? 700 : 400,
  }),
};

// ── Componente principal ───────────────────────────────────────────────────
export default function HidratacaoPediatrica() {
  const navigate = useNavigate(); // ← adiciona aqui
  const [peso, setPeso] = useState("");
  const [kclType, setKclType] = useState("10");
  const [ataqueMlKg, setAtaqueMlKg] = useState("20");
  const [naAlvo, setNaAlvo] = useState("3");
  const [kAlvo, setKAlvo] = useState("2");
  const [activeTab, setActiveTab] = useState("manutencao");

  const p = parseFloat(peso.replace(",", "."));
  const isValid = !isNaN(p) && p > 0 && p <= 150;

  // ── AHV Ataque ──
  const mlKgAtaque = parseFloat(ataqueMlKg.replace(",", ".")) || 20;
  const volAtaque = isValid ? r0(p * mlKgAtaque) : null;
  const velAtaque30 = isValid ? r1(volAtaque / 0.5) : null; // mL/h se 30 min
  const velAtaque60 = isValid ? r1(volAtaque / 1) : null; // mL/h se 60 min

  // ── HV Manutenção ──
  const volTotal = isValid ? hollidaySegar(p) : null;
  const na = parseFloat(naAlvo.replace(",", ".")) || 3;
  const k = parseFloat(kAlvo.replace(",", ".")) || 2;

  let volNaCl, volKCl, volSGI, velInfusao, velMlKgH;
  if (isValid && volTotal) {
    const totalNa = na * (volTotal / 100);
    const totalK = k * (volTotal / 100);
    volNaCl = r1(totalNa / NACL20_MEQ_PER_ML);
    const kConc = kclType === "191" ? KCL191_MEQ_PER_ML : KCL10_MEQ_PER_ML;
    volKCl = r1(totalK / kConc);
    volSGI = r1(volTotal - volNaCl - volKCl);
    velInfusao = r1(volTotal / 24);
    velMlKgH = r1(velInfusao / p);
  }

  // Classificação de peso
  let pesoClass = "";
  if (isValid) {
    if (p <= 10) pesoClass = "≤ 10 kg → 100 mL/kg/dia";
    else if (p <= 20) pesoClass = "10–20 kg → 1000 + 50×(P−10)";
    else pesoClass = "> 20 kg → 1500 + 20×(P−20)";
  }

  return (
    <div style={S.root}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div style={S.card}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "1px solid #1e2a3a",
            color: "#64748b",
            padding: "6px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: 12,
            width: "fit-content", // ← essa linha
            margin: "16px auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          ← MedPanel
        </button>
        {/* ── Header ── */}
        <div style={S.header}>
          <p style={S.headerTitle}>Hidratação Venosa Pediátrica</p>
          <p style={S.headerSub}>
            Holliday-Segar · AHV Ataque · Soro de Manutenção
          </p>
        </div>

        <div style={S.body}>
          {/* ── Input: peso ── */}
          <div style={S.section}>
            <p style={S.sectionLabel}>Dados do Paciente</p>
            <div style={S.inputRow}>
              <div style={S.inputGroup}>
                <label style={S.label}>Peso (kg)</label>
                <input
                  style={S.input}
                  type="number"
                  min="0.5"
                  max="150"
                  step="0.1"
                  placeholder="Ex: 12,5"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </div>
              <div style={S.inputGroup}>
                <label style={S.label}>KCl utilizado</label>
                <select
                  style={S.select}
                  value={kclType}
                  onChange={(e) => setKclType(e.target.value)}
                >
                  <option value="10">KCl 10% (1,34 mEq/mL)</option>
                  <option value="191">KCl 19,1% (2,57 mEq/mL)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── Tabs ── */}
          <div style={S.tabs}>
            <button
              style={S.tab(activeTab === "manutencao")}
              onClick={() => setActiveTab("manutencao")}
            >
              HV Manutenção
            </button>
            <button
              style={S.tab(activeTab === "ataque")}
              onClick={() => setActiveTab("ataque")}
            >
              AHV Ataque
            </button>
          </div>

          {/* ══ TAB: MANUTENÇÃO ══ */}
          {activeTab === "manutencao" && (
            <>
              {/* Parâmetros de eletrólitos */}
              <div style={S.section}>
                <p style={S.sectionLabel}>Concentração-alvo de eletrólitos</p>
                <div style={S.inputRow}>
                  <div style={S.inputGroup}>
                    <label style={S.label}>Na⁺ alvo (mEq/100 mL)</label>
                    <input
                      style={S.input}
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={naAlvo}
                      onChange={(e) => setNaAlvo(e.target.value)}
                    />
                  </div>
                  <div style={S.inputGroup}>
                    <label style={S.label}>K⁺ alvo (mEq/100 mL)</label>
                    <input
                      style={S.input}
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={kAlvo}
                      onChange={(e) => setKAlvo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Resultados manutenção */}
              {isValid && volTotal ? (
                <>
                  {/* Volume total */}
                  <div style={S.resultBlock}>
                    <p style={S.resultTitle}>
                      Volume Total / 24 h — Holliday-Segar
                    </p>
                    <div style={S.resultGrid}>
                      <div style={S.resultItem}>
                        <span style={S.resultKey}>Volume diário</span>
                        <span style={S.resultVal}>
                          {r0(volTotal)}
                          <span style={S.resultUnit}>mL/24h</span>
                        </span>
                      </div>
                      <div style={S.resultItem}>
                        <span style={S.resultKey}>Faixa Holliday-Segar</span>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "#7dd3fc",
                            lineHeight: 1.4,
                          }}
                        >
                          {pesoClass}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Composição */}
                  <div style={S.resultBlock}>
                    <p style={S.resultTitle}>
                      Composição do Soro — {na} mEq Na⁺ · {k} mEq K⁺ por 100 mL
                    </p>
                    <div style={S.compRow}>
                      <span style={S.compLabel}>SGI 5% (soro glicosado)</span>
                      <span style={S.compVal}>{volSGI} mL</span>
                    </div>
                    <div style={S.compRow}>
                      <span style={S.compLabel}>NaCl 20%</span>
                      <span style={S.compVal}>{volNaCl} mL</span>
                    </div>
                    <div style={{ ...S.compRow, borderBottom: "none" }}>
                      <span style={S.compLabel}>
                        KCl {kclType === "191" ? "19,1%" : "10%"}
                      </span>
                      <span style={S.compVal}>{volKCl} mL</span>
                    </div>
                  </div>

                  {/* Velocidade */}
                  <div style={S.resultBlockAlt}>
                    <p style={S.resultTitleGreen}>Velocidade de Infusão</p>
                    <div style={S.resultGrid}>
                      <div style={S.resultItem}>
                        <span style={S.resultKey}>Velocidade</span>
                        <span style={S.resultValGreen}>
                          {velInfusao}
                          <span style={S.unitGreen}> mL/h</span>
                        </span>
                      </div>
                      <div style={S.resultItem}>
                        <span style={S.resultKey}>Por peso</span>
                        <span style={S.resultValGreen}>
                          {velMlKgH}
                          <span style={S.unitGreen}> mL/kg/h</span>
                        </span>
                      </div>
                    </div>
                    <div style={S.velBadge}>
                      <span style={S.dot} />
                      Bomba de infusão: {velInfusao} mL/h · contínuo · 24 h
                    </div>
                  </div>
                </>
              ) : (
                <div style={S.emptyState}>Insira o peso para calcular</div>
              )}
            </>
          )}

          {/* ══ TAB: ATAQUE ══ */}
          {activeTab === "ataque" && (
            <>
              <div style={S.section}>
                <p style={S.sectionLabel}>Parâmetros do ataque</p>
                <div style={S.inputGroup}>
                  <label style={S.label}>Volume (mL/kg)</label>
                  <input
                    style={{ ...S.input, maxWidth: 220 }}
                    type="number"
                    min="5"
                    max="60"
                    step="5"
                    value={ataqueMlKg}
                    onChange={(e) => setAtaqueMlKg(e.target.value)}
                  />
                  <span
                    style={{
                      fontSize: "0.62rem",
                      color: "#475569",
                      marginTop: 4,
                    }}
                  >
                    Padrão: 20 mL/kg · SF 0,9% ou Ringer Lactato
                  </span>
                </div>
              </div>

              {isValid && volAtaque ? (
                <div style={S.resultBlock}>
                  <p style={S.resultTitle}>AHV de Ataque</p>
                  <div style={S.resultGrid}>
                    <div style={S.resultItem}>
                      <span style={S.resultKey}>Volume total</span>
                      <span style={S.resultVal}>
                        {volAtaque}
                        <span style={S.resultUnit}>mL</span>
                      </span>
                    </div>
                    <div style={S.resultItem}>
                      <span style={S.resultKey}>Dose</span>
                      <span style={S.resultVal}>
                        {mlKgAtaque}
                        <span style={S.resultUnit}>mL/kg</span>
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: "1.25rem" }}>
                    <p style={{ ...S.sectionLabel, marginBottom: "0.6rem" }}>
                      Velocidade de infusão
                    </p>
                    <div style={S.compRow}>
                      <span style={S.compLabel}>Em 30 minutos</span>
                      <span style={S.compVal}>{velAtaque30} mL/h</span>
                    </div>
                    <div style={{ ...S.compRow, borderBottom: "none" }}>
                      <span style={S.compLabel}>Em 60 minutos</span>
                      <span style={S.compVal}>{velAtaque60} mL/h</span>
                    </div>
                  </div>

                  <div style={{ ...S.velBadge, marginTop: "1rem" }}>
                    <span style={S.dot} />
                    SF 0,9% · bolus rápido · reavalie após expansão
                  </div>
                </div>
              ) : (
                <div style={S.emptyState}>Insira o peso para calcular</div>
              )}
            </>
          )}

          {/* ── Rodapé ── */}
          <div style={{ ...S.divider, marginTop: "2rem" }} />
          <p
            style={{
              fontSize: "0.58rem",
              color: "#334155",
              letterSpacing: "0.06em",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            HOLLIDAY & SEGAR, 1957 · NaCl 20%: 3,4 mEq Na⁺/mL · KCl 10%: 1,34
            mEq K⁺/mL · KCl 19,1%: 2,57 mEq K⁺/mL
            <br />
            Uso exclusivo para profissionais de saúde. Confirme sempre os
            cálculos clinicamente.
          </p>
        </div>
      </div>
    </div>
  );
}
