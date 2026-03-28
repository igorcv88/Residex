import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { T, S } from "./medpanel-tokens";

// ─────────────────────────────────────────────
// STYLE HELPERS
// ─────────────────────────────────────────────
const inp = {
  background: T.bgCard,
  border: `1px solid ${T.borderCard}`,
  color: T.textPrimary,
  padding: "7px 12px",
  borderRadius: 5,
  fontSize: 14,
  fontFamily: "monospace",
  outline: "none",
  boxSizing: "border-box",
};

// ─────────────────────────────────────────────
// LAYOUT COMPONENT
// Props: drugCategories, drugs, emergencies
// ─────────────────────────────────────────────
export default function PedCalcLayout({ drugCategories, drugs, emergencies }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("drugs");
  const [category, setCat] = useState("todos");
  const [selDrug, setSelDrug] = useState(null);
  const [weight, setWeight] = useState("");
  const [ageYrs, setAgeYrs] = useState("");
  const [selEm, setSelEm] = useState(null);
  const [emW, setEmW] = useState("");
  const [search, setSearch] = useState("");

  const visibleDrugs = useMemo(
    () =>
      drugs.filter(
        (d) =>
          (category === "todos" || d.category === category) &&
          d.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [drugs, category, search],
  );

  const drugResults = useMemo(() => {
    if (!selDrug) return null;
    const v = parseFloat(selDrug.inputType === "weight" ? weight : ageYrs);
    if (!v || v <= 0) return null;
    return selDrug.calc(v);
  }, [selDrug, weight, ageYrs]);

  const emResults = useMemo(() => {
    if (!selEm) return null;
    const w = parseFloat(emW);
    if (!w || w <= 0) return null;
    return selEm.drugs(w);
  }, [selEm, emW]);

  const catColor =
    drugCategories.find((c) => c.id === (selDrug?.category || "todos"))
      ?.color || "#64748b";

  return (
    <div
      style={{
        background: T.bgPage,
        height: "100vh",
        fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif",
        color: T.textBody,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontSize: 13,
      }}
    >
      {/* ── ESTILOS RESPONSIVOS PARA MOBILE ── */}
      <style>{`
        .info-grid { grid-template-columns: 1fr 1fr; }
        .mobile-only { display: none !important; }
        
        @media (max-width: 768px) {
          .layout-container { flex-direction: column !important; }
          
          .sidebar { 
            width: 100% !important; 
            border-right: none !important; 
            border-bottom: 1px solid ${T.borderSection} !important; 
            display: flex !important; 
            flex-direction: row !important;
            overflow-x: auto !important; 
            overflow-y: hidden !important;
            flex-shrink: 0 !important;
          }
          .sidebar-title { display: none !important; }
          .cat-btn { 
            width: auto !important; 
            white-space: nowrap !important; 
            border-left: none !important; 
            border-bottom: 2px solid var(--cat-color) !important;
            padding: 12px 16px !important;
          }
          
          .list-container { 
            width: 100% !important; 
            border-right: none !important; 
            border-bottom: 1px solid ${T.borderSection} !important;
            flex: 1 !important;
          }
          
          .hide-on-selection { display: none !important; }
          .hide-when-empty { display: none !important; }
          .mobile-only { display: inline-flex !important; }
          
          .calc-panel { padding: 16px 14px !important; overflow-y: auto !important; }
          .info-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
          
          .main-header { flex-direction: column !important; align-items: flex-start !important; }
          .main-header-tabs { width: 100%; display: flex; margin-top: 12px; }
          .main-header-tabs button { flex: 1; justify-content: center; }
        }
      `}</style>

      {/* ── Voltar ─────────────────────────── */}
      <div style={{ background: T.bgHeader }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: `1px solid ${T.borderSection}`,
            color: T.textMuted,
            padding: "6px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: 12,
            width: "fit-content",
            margin: "14px 0 0 20px",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          ← MedPanel
        </button>
      </div>

      {/* ── Header ──────────────────────────── */}
      <div
        className="main-header"
        style={{
          ...S.header,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div style={S.headerEyebrow}>Pediatria</div>
          <div style={S.headerTitle}>Calculadora de Doses Pediátricas</div>
        </div>
        <div className="main-header-tabs" style={{ display: "flex", gap: 8 }}>
          {[
            ["drugs", "💊 Medicações", "#0EA5E9"],
            ["emergency", "🚨 Emergências", "#EF4444"],
          ].map(([t, label, c]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? `${c}22` : "rgba(255,255,255,0.05)",
                border: `1px solid ${tab === t ? c + "66" : "rgba(255,255,255,0.1)"}`,
                color: tab === t ? c : "#94a3b8",
                padding: "7px 18px",
                borderRadius: 5,
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TAB: MEDICAÇÕES
      ═══════════════════════════════════════════ */}
      {tab === "drugs" && (
        <div
          className="layout-container"
          style={{ display: "flex", flex: 1, overflow: "hidden" }}
        >
          {/* ─ Sidebar categorias ─ */}
          <div
            className={`sidebar ${selDrug ? "hide-on-selection" : ""}`}
            style={{
              width: 190,
              background: T.bgSurface,
              borderRight: `1px solid ${T.borderSection}`,
              padding: "8px 0",
              flexShrink: 0,
              overflowY: "auto",
            }}
          >
            <div
              className="sidebar-title"
              style={{
                padding: "8px 14px",
                fontSize: 9,
                color: T.textMuted,
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Categoria
            </div>
            {drugCategories.map((cat) => (
              <button
                key={cat.id}
                className="cat-btn"
                onClick={() => {
                  setCat(cat.id);
                  setSelDrug(null);
                }}
                style={{
                  "--cat-color":
                    category === cat.id ? cat.color : "transparent",
                  width: "100%",
                  background:
                    category === cat.id ? `${cat.color}15` : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${category === cat.id ? cat.color : "transparent"}`,
                  color: category === cat.id ? T.textPrimary : "#4b5563",
                  padding: "8px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 11,
                  fontFamily: "monospace",
                  transition: "all 0.12s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background:
                        category === cat.id ? cat.color : T.textSubtle,
                      flexShrink: 0,
                    }}
                  />
                  {cat.name}
                </div>
              </button>
            ))}
          </div>

          {/* ─ Lista de medicamentos ─ */}
          <div
            className={`list-container ${selDrug ? "hide-on-selection" : ""}`}
            style={{
              width: 210,
              borderRight: `1px solid ${T.borderSection}`,
              background: T.bgSurface,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                padding: "10px 12px",
                borderBottom: `1px solid ${T.borderSection}`,
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: T.bgSurface,
              }}
            >
              <input
                style={{ ...inp, width: "100%", fontSize: 12 }}
                placeholder="Buscar medicação..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {visibleDrugs.length === 0 && (
              <div
                style={{
                  padding: "16px 14px",
                  color: T.textMuted,
                  fontFamily: "monospace",
                  fontSize: 11,
                }}
              >
                Nenhum resultado
              </div>
            )}
            {visibleDrugs.map((drug) => (
              <button
                key={drug.id}
                onClick={() => {
                  setSelDrug(drug);
                  setWeight("");
                  setAgeYrs("");
                }}
                style={{
                  width: "100%",
                  background:
                    selDrug?.id === drug.id ? `${drug.color}12` : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${selDrug?.id === drug.id ? drug.color : "transparent"}`,
                  color: selDrug?.id === drug.id ? T.textPrimary : T.textBody,
                  padding: "10px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 12,
                  fontFamily: "monospace",
                  transition: "all 0.12s",
                  borderBottom: `1px solid ${T.borderSection}`,
                }}
              >
                <div
                  style={{
                    color: selDrug?.id === drug.id ? T.textPrimary : "#333333",
                    marginBottom: 2,
                  }}
                >
                  {drug.name}
                </div>
                <div style={{ fontSize: 10, color: T.textMuted }}>
                  {drug.infusion}
                </div>
              </button>
            ))}
          </div>

          {/* ─ Painel calculadora ─ */}
          <div
            className={`calc-panel ${!selDrug ? "hide-when-empty" : ""}`}
            style={{ flex: 1, overflowY: "auto", padding: selDrug ? "22px 24px" : 0 }}
          >
            {/* BOTÃO VOLTAR (EXCLUSIVO MOBILE) */}
            {selDrug && (
              <button
                className="mobile-only"
                onClick={() => setSelDrug(null)}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.borderCard}`,
                  color: "#64748b",
                  padding: "6px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: 12,
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 16,
                }}
              >
                ← Voltar para medicações
              </button>
            )}

            {!selDrug ? null : (
              <>
                {/* cabeçalho */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 20,
                    paddingBottom: 14,
                    borderBottom: `1px solid ${catColor}22`,
                  }}
                >
                  <div
                    style={{
                      background: `${catColor}18`,
                      border: `1px solid ${catColor}44`,
                      color: catColor,
                      padding: "3px 12px",
                      borderRadius: 4,
                      fontSize: 9,
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {drugCategories.find((c) => c.id === selDrug.category)?.name}
                  </div>
                  <div style={{ fontSize: 16, color: T.textPrimary }}>
                    {selDrug.name}
                  </div>
                </div>

                {/* info farmacológica */}
                <div
                  className="info-grid"
                  style={{
                    display: "grid",
                    background: T.bgCard,
                    border: `1px solid ${T.borderCard}`,
                    borderRadius: 6,
                    padding: "12px 16px",
                    marginBottom: 16,
                  }}
                >
                  {[
                    ["Apresentação", selDrug.presentation],
                    [
                      "Diluição / Via / Tempo",
                      `${selDrug.dilution} ${selDrug.infusion ? "· " + selDrug.infusion : ""}`,
                    ],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div
                        style={{
                          fontSize: 9,
                          color: T.textMuted,
                          fontFamily: "monospace",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        {l}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: T.textBody,
                          lineHeight: 1.6,
                        }}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                {/* input peso / idade */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#4b5563",
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {selDrug.inputType === "weight"
                      ? "Peso da Criança (kg)"
                      : "Idade da Criança (anos)"}
                  </div>
                  {selDrug.inputType === "weight" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {[3, 5, 8, 10, 15, 20, 25, 30, 40, 50].map((v) => (
                        <button
                          key={v}
                          onClick={() => setWeight(String(v))}
                          style={{
                            background:
                              parseFloat(weight) === v
                                ? `${catColor}20`
                                : T.bgCard,
                            border: `1px solid ${parseFloat(weight) === v ? catColor + "44" : T.borderCard}`,
                            color:
                              parseFloat(weight) === v ? catColor : "#4b5563",
                            padding: "4px 10px",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 11,
                            fontFamily: "monospace",
                          }}
                        >
                          {v}kg
                        </button>
                      ))}
                      <input
                        style={{ ...inp, width: 90 }}
                        type="number"
                        placeholder="outro"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        min="0.5"
                        max="100"
                        step="0.1"
                      />
                      <span style={{ fontSize: 12, color: "#4b5563" }}>kg</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {[0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18].map((v) => (
                        <button
                          key={v}
                          onClick={() => setAgeYrs(String(v))}
                          style={{
                            background:
                              parseFloat(ageYrs) === v
                                ? `${catColor}20`
                                : T.bgCard,
                            border: `1px solid ${parseFloat(ageYrs) === v ? catColor + "44" : T.borderCard}`,
                            color:
                              parseFloat(ageYrs) === v ? catColor : "#4b5563",
                            padding: "4px 10px",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 11,
                            fontFamily: "monospace",
                          }}
                        >
                          {v < 1 ? `${v * 12}m` : `${v}a`}
                        </button>
                      ))}
                      <input
                        style={{ ...inp, width: 90 }}
                        type="number"
                        placeholder="outro"
                        value={ageYrs}
                        onChange={(e) => setAgeYrs(e.target.value)}
                        min="0"
                        max="18"
                        step="0.25"
                      />
                    </div>
                  )}
                </div>

                {/* resultados */}
                {drugResults ? (
                  <>
                    <div
                      style={{
                        fontSize: 10,
                        color: T.textMuted,
                        fontFamily: "monospace",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}
                    >
                      Dose Calculada
                    </div>
                    {drugResults.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          background: r.highlight ? `${catColor}0e` : T.bgCard,
                          border: `1px solid ${r.highlight ? catColor + "33" : T.borderSection}`,
                          borderLeft: `3px solid ${r.highlight ? catColor : T.textSubtle}`,
                          borderRadius: 6,
                          padding: "12px 16px",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontFamily: "monospace",
                            color: r.highlight ? catColor : "#4b5563",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 6,
                          }}
                        >
                          {r.label}
                        </div>
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 500,
                            color: T.textPrimary,
                            marginBottom: r.freq ? 4 : 0,
                          }}
                        >
                          {r.value}
                        </div>
                        {r.freq && (
                          <div
                            style={{
                              fontSize: 11,
                              color: catColor,
                              fontFamily: "monospace",
                              marginBottom: r.sub ? 4 : 0,
                            }}
                          >
                            ⏱ {r.freq}
                          </div>
                        )}
                        {r.sub && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#64748b",
                              lineHeight: 1.7,
                              marginTop: 4,
                            }}
                          >
                            {r.sub}
                          </div>
                        )}
                      </div>
                    ))}
                    {selDrug.notes && (
                      <div
                        style={{
                          background: T.bgObs,
                          border: `1px solid ${T.borderCard}`,
                          borderLeft: `3px solid ${catColor}`,
                          borderRadius: 6,
                          padding: "10px 14px",
                          marginTop: 6,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 9,
                            color: catColor,
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 5,
                          }}
                        >
                          🔬 Observações
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: T.textBody,
                            lineHeight: 1.75,
                          }}
                        >
                          {selDrug.notes}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      color: T.textSubtle,
                      fontSize: 12,
                      fontFamily: "monospace",
                      marginTop: 8,
                    }}
                  >
                    {selDrug.inputType === "weight" &&
                    weight &&
                    parseFloat(weight) <= 0
                      ? "⚠ Peso inválido"
                      : `↑ Informe o ${selDrug.inputType === "weight" ? "peso" : "idade"} para calcular a dose`}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB: EMERGÊNCIAS
      ═══════════════════════════════════════════ */}
      {tab === "emergency" && (
        <div
          className="layout-container"
          style={{ display: "flex", flex: 1, overflow: "hidden" }}
        >
          {/* ─ Lista emergências ─ */}
          <div
            className={`list-container ${selEm ? "hide-on-selection" : ""}`}
            style={{
              width: 210,
              background: T.bgSurface,
              borderRight: `1px solid ${T.borderSection}`,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                fontSize: 9,
                color: T.textMuted,
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Protocolos
            </div>
            {emergencies.map((em) => (
              <button
                key={em.id}
                onClick={() => {
                  setSelEm(em);
                  setEmW("");
                }}
                style={{
                  width: "100%",
                  background:
                    selEm?.id === em.id ? `${em.color}15` : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${selEm?.id === em.id ? em.color : "transparent"}`,
                  color: selEm?.id === em.id ? T.textPrimary : T.textBody,
                  padding: "10px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "monospace",
                  transition: "all 0.12s",
                  borderBottom: `1px solid ${T.borderSection}`,
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 3 }}>{em.emoji}</div>
                <div
                  style={{
                    fontSize: 12,
                    color: selEm?.id === em.id ? T.textPrimary : "#333333",
                  }}
                >
                  {em.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.textMuted,
                    marginTop: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {em.description}
                </div>
              </button>
            ))}
          </div>

          {/* ─ Painel emergência ─ */}
          <div
            className={`calc-panel ${!selEm ? "hide-when-empty" : ""}`}
            style={{ flex: 1, overflowY: "auto", padding: selEm ? "22px 24px" : 0 }}
          >
            {/* BOTÃO VOLTAR (EXCLUSIVO MOBILE) */}
            {selEm && (
              <button
                className="mobile-only"
                onClick={() => setSelEm(null)}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.borderCard}`,
                  color: "#64748b",
                  padding: "6px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: 12,
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 16,
                }}
              >
                ← Voltar para protocolos
              </button>
            )}

            {!selEm ? null : (
              <>
                {/* cabeçalho */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                    paddingBottom: 14,
                    borderBottom: `1px solid ${selEm.color}22`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{selEm.emoji}</span>
                  <div>
                    <div
                      style={{
                        background: `${selEm.color}18`,
                        border: `1px solid ${selEm.color}44`,
                        color: selEm.color,
                        padding: "2px 10px",
                        borderRadius: 4,
                        fontSize: 9,
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        display: "inline-block",
                        marginBottom: 4,
                      }}
                    >
                      EMERGÊNCIA
                    </div>
                    <div style={{ fontSize: 17, color: T.textPrimary }}>
                      {selEm.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>
                      {selEm.description}
                    </div>
                  </div>
                </div>

                {/* peso input */}
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#4b5563",
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Peso da Criança (kg)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {[3, 5, 8, 10, 15, 20, 25, 30, 40, 50, 60].map((v) => (
                      <button
                        key={v}
                        onClick={() => setEmW(String(v))}
                        style={{
                          background:
                            parseFloat(emW) === v
                              ? `${selEm.color}20`
                              : T.bgCard,
                          border: `1px solid ${parseFloat(emW) === v ? selEm.color + "44" : T.borderCard}`,
                          color:
                            parseFloat(emW) === v ? selEm.color : "#4b5563",
                          padding: "4px 10px",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {v}kg
                      </button>
                    ))}
                    <input
                      style={{ ...inp, width: 90 }}
                      type="number"
                      placeholder="outro"
                      value={emW}
                      onChange={(e) => setEmW(e.target.value)}
                      min="0.5"
                      max="100"
                      step="0.5"
                    />
                    <span style={{ fontSize: 12, color: "#4b5563" }}>kg</span>
                  </div>
                </div>

                {/* conduta geral */}
                <div
                  style={{
                    background: `${selEm.color}07`,
                    border: `1px solid ${selEm.color}22`,
                    borderLeft: `3px solid ${selEm.color}`,
                    borderRadius: 6,
                    padding: "10px 14px",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: selEm.color,
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    ⚡ Conduta Geral
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: T.textBody,
                      lineHeight: 1.8,
                    }}
                  >
                    {selEm.notes}
                  </div>
                </div>

                {/* prescrições */}
                {emResults ? (
                  <>
                    <div
                      style={{
                        fontSize: 10,
                        color: T.textMuted,
                        fontFamily: "monospace",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}
                    >
                      Prescrição Completa — {parseFloat(emW)}kg
                    </div>
                    {emResults.map((d, i) => (
                      <div
                        key={i}
                        style={{
                          background: d.highlight
                            ? `${selEm.color}0d`
                            : T.bgCard,
                          border: `1px solid ${d.highlight ? selEm.color + "33" : T.borderCard}`,
                          borderLeft: `3px solid ${d.highlight ? selEm.color : T.borderCard}`,
                          borderRadius: 6,
                          padding: "14px 16px",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 8,
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <span
                              style={{
                                background: d.highlight
                                  ? `${selEm.color}25`
                                  : T.bgCard,
                                border: `1px solid ${d.highlight ? selEm.color + "44" : T.borderCard}`,
                                color: d.highlight ? selEm.color : T.textMuted,
                                padding: "1px 8px",
                                borderRadius: 3,
                                fontSize: 9,
                                fontFamily: "monospace",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                flexShrink: 0,
                              }}
                            >
                              {d.order}°
                            </span>
                            <span
                              style={{ fontSize: 13, color: T.textPrimary }}
                            >
                              {d.name}
                            </span>
                          </div>
                          {d.urgency && (
                            <span
                              style={{
                                fontSize: 9,
                                color: d.highlight ? selEm.color : T.textMuted,
                                fontFamily: "monospace",
                                letterSpacing: "0.04em",
                                textAlign: "right",
                                flexShrink: 0,
                                maxWidth: 220,
                                lineHeight: 1.5,
                              }}
                            >
                              {d.urgency}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: 21,
                            fontWeight: 500,
                            color: d.highlight ? T.textPrimary : T.textBody,
                            marginBottom: 6,
                          }}
                        >
                          {d.dose}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#64748b",
                            lineHeight: 1.7,
                            marginBottom: d.freq ? 5 : 0,
                          }}
                        >
                          {d.prep}
                        </div>
                        {d.freq && (
                          <div
                            style={{
                              fontSize: 11,
                              color: d.highlight ? selEm.color : "#4b5563",
                              fontFamily: "monospace",
                            }}
                          >
                            ⏱ {d.freq}
                          </div>
                        )}
                        {d.max && (
                          <div
                            style={{
                              fontSize: 10,
                              color: T.textMuted,
                              marginTop: 5,
                              fontFamily: "monospace",
                              borderTop: `1px solid ${T.borderSection}`,
                              paddingTop: 5,
                            }}
                          >
                            ⚠ {d.max}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div
                    style={{
                      color: T.textSubtle,
                      fontSize: 12,
                      fontFamily: "monospace",
                    }}
                  >
                    ↑ Informe o peso para gerar a prescrição completa
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderSection}`,
          padding: "8px 20px",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
          background: T.bgSurface,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ fontSize: 9, color: T.textSubtle, fontFamily: "monospace" }}>
           MedPanel 2026 — Igor Vieira.
        </div>
        <div style={{ fontSize: 9, color: T.textMuted, fontFamily: "monospace" }}>
          ⚠ Verificar dose antes de prescrever — apenas para uso por profissionais habilitados.
        </div>
      </div>
    </div>
  );
}
