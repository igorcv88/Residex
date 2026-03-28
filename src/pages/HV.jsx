import MedPanelPage from "./medpanel-layout";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { T, S } from "./medpanel-tokens";

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

// ── Componente principal ───────────────────────────────────────────────────
export default function HidratacaoPediatrica() {
  const navigate = useNavigate();
  const [peso, setPeso] = useState("");
  const [kclType, setKclType] = useState("10");
  const [ataqueMlKg, setAtaqueMlKg] = useState("20");
  const [naAlvo, setNaAlvo] = useState("13.6");
  const [kAlvo, setKAlvo] = useState("2.5");
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

  // Estilo base para inputs (igual ao do PedCalc)
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
    width: "100%",
  };

  const colorMain = activeTab === "manutencao" ? "#0EA5E9" : "#10B981"; // Azul p/ Manutenção, Verde p/ Ataque

  return (
    <div
      style={{
        width: "100%",
        background: T.bgPage,
        minHeight: "100vh",
        fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif",
        color: T.textBody,
        display: "flex",
        flexDirection: "column",
        fontSize: 13,
      }}
    >
      {/* ── ESTILOS RESPONSIVOS PARA MOBILE ── */}
      <style>{`
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
          .main-header { flex-direction: column !important; align-items: flex-start !important; }
          .main-header-tabs { width: 100%; display: flex; margin-top: 12px; }
          .main-header-tabs button { flex: 1; justify-content: center; }
          .calc-panel { padding: 16px 14px !important; }
        }
      `}</style>

      {/* ── Voltar ─────────────────────────── */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          border: `1px solid ${T.borderCard}`,
          color: "#64748b",
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

      {/* ── Header e Abas ─────────────────────────── */}
      <div
        className="main-header"
        style={{
          background: T.bgSurface,
          borderBottom: `1px solid ${T.borderSection}`,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: T.textMuted,
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Pediatria 👶🏼
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: T.textPrimary,
              marginTop: 2,
            }}
          >
            Hidratação Venosa
          </div>
        </div>

        <div className="main-header-tabs" style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setActiveTab("manutencao")}
            style={{
              background:
                activeTab === "manutencao" ? "#0EA5E918" : "transparent",
              border: `1px solid ${activeTab === "manutencao" ? "#0EA5E944" : T.borderCard}`,
              color: activeTab === "manutencao" ? "#0EA5E9" : "#4b5563",
              padding: "7px 18px",
              borderRadius: 5,
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            💧 Manutenção
          </button>
          <button
            onClick={() => setActiveTab("ataque")}
            style={{
              background: activeTab === "ataque" ? "#10B98118" : "transparent",
              border: `1px solid ${activeTab === "ataque" ? "#10B98144" : T.borderCard}`,
              color: activeTab === "ataque" ? "#10B981" : "#4b5563",
              padding: "7px 18px",
              borderRadius: 5,
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            ⚡ Ataque
          </button>
        </div>
      </div>

      {/* ── Painel Principal ─────────────────────────── */}
      <div
        className="calc-panel"
        style={{
          flex: 1,
          padding: "22px 24px",
          overflowY: "auto",
          maxWidth: 800,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Box de Dados do Paciente (Igual à "Apresentação" das Meds) */}
        <div
          className="info-grid"
          style={{
            background: T.bgCard,
            border: `1px solid ${T.borderCard}`,
            borderRadius: 6,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: T.textMuted,
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Peso da Criança (kg)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                style={{ ...inp, maxWidth: 120 }}
                type="number"
                min="0.5"
                max="150"
                step="0.1"
                placeholder="Ex: 12,5"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
              <span
                style={{
                  fontSize: 13,
                  color: "#4b5563",
                  fontFamily: "monospace",
                }}
              >
                kg
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                color: T.textMuted,
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Solução de KCl
            </div>
            <select
              style={{ ...inp }}
              value={kclType}
              onChange={(e) => setKclType(e.target.value)}
            >
              <option value="10">KCl 10% (1,34 mEq/mL)</option>
              <option value="191">KCl 19,1% (2,57 mEq/mL)</option>
            </select>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            CONTEÚDO: MANUTENÇÃO
        ═══════════════════════════════════════════ */}
        {activeTab === "manutencao" && (
          <>
            {/* Input de Eletrólitos (Holliday) */}
            <div style={{ 
              background: T.bgCard, 
              border: `1px solid ${T.borderCard}`, 
              borderRadius: 6, 
              padding: "12px 16px", 
              marginBottom: 20 
            }}>
              <div
                style={{
                  fontSize: 10,
                  color: T.textMuted,
                  fontFamily: "monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Eletrólitos-Alvo (mEq / 100mL)
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontFamily: "monospace", color: T.textPrimary }}>
                    Na⁺:
                  </span>
                  <input
                    style={{ ...inp, width: 80 }}
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={naAlvo}
                    onChange={(e) => setNaAlvo(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontFamily: "monospace", color: T.textPrimary }}>
                    K⁺:
                  </span>
                  <input
                    style={{ ...inp, width: 80 }}
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

            {/* Resultados Manutenção */}
            {!isValid ? (
              <div
                style={{
                  color: T.textSubtle,
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginTop: 20,
                }}
              >
                ↑ Informe o peso para gerar o soro de manutenção
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 10,
                    color: T.textMuted,
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    marginTop: 20,
                  }}
                >
                  Prescrição — Holliday-Segar
                </div>

                {/* Bloco 1: Volume Diário */}
                <div
                  style={{
                    background: `${colorMain}0e`,
                    border: `1px solid ${colorMain}33`,
                    borderLeft: `3px solid ${colorMain}`,
                    borderRadius: 6,
                    padding: "14px 16px",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: colorMain,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Volume Diário (24h)
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      color: T.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    {r0(volTotal)}{" "}
                    <span style={{ fontSize: 14, color: "#64748b" }}>
                      mL/dia
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    Regra: {pesoClass}
                  </div>
                </div>

                {/* Bloco 2: Composição do Soro */}
                <div
                  style={{
                    background: `${colorMain}0e`,
                    border: `1px solid ${colorMain}33`,
                    borderLeft: `3px solid ${colorMain}`,
                    borderRadius: 6,
                    padding: "14px 16px",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: colorMain,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Composição Final
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${T.borderSection}`,
                      paddingBottom: 6,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 13, color: T.textPrimary }}>
                      SGI 5% (Soro Glicosado)
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      {volSGI} mL
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${T.borderSection}`,
                      paddingBottom: 6,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 13, color: T.textPrimary }}>
                      NaCl 20%
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      {volNaCl} mL
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 13, color: T.textPrimary }}>
                      KCl {kclType === "191" ? "19,1%" : "10%"}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      {volKCl} mL
                    </span>
                  </div>
                </div>

                {/* Bloco 3: Infusão */}
                <div
                  style={{
                    background: T.bgCard,
                    border: `1px solid ${T.borderCard}`,
                    borderLeft: `3px solid ${T.textMuted}`,
                    borderRadius: 6,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "#64748b",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Bomba de Infusão Contínua (BIC)
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      color: T.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    {velInfusao}{" "}
                    <span style={{ fontSize: 14, color: "#64748b" }}>mL/h</span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    Taxa: {velMlKgH} mL/kg/h
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ═══════════════════════════════════════════
            CONTEÚDO: ATAQUE
        ═══════════════════════════════════════════ */}
        {activeTab === "ataque" && (
          <>
            <div style={{ 
              background: T.bgCard, 
              border: `1px solid ${T.borderCard}`, 
              borderRadius: 6, 
              padding: "12px 16px", 
              marginBottom: 20 
            }}>
              <div
                style={{
                  fontSize: 10,
                  color: T.textMuted,
                  fontFamily: "monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Volume do Ataque
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  style={{ ...inp, width: 100 }}
                  type="number"
                  min="5"
                  max="60"
                  step="5"
                  value={ataqueMlKg}
                  onChange={(e) => setAtaqueMlKg(e.target.value)}
                />
                <span style={{ fontSize: 13, fontFamily: "monospace", color: T.textPrimary }}>
                  mL/kg
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 6, fontFamily: "monospace" }}>
                Padrão: 20 mL/kg (SF 0,9% ou Ringer Lactato)
              </div>
            </div>

            {!isValid ? (
              <div
                style={{
                  color: T.textSubtle,
                  fontSize: 12,
                  fontFamily: "monospace",
                  marginTop: 20,
                }}
              >
                ↑ Informe o peso para calcular o volume de ataque
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 10,
                    color: T.textMuted,
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    marginTop: 20,
                  }}
                >
                  Prescrição — Fase Rápida
                </div>

                <div
                  style={{
                    background: `${colorMain}0e`,
                    border: `1px solid ${colorMain}33`,
                    borderLeft: `3px solid ${colorMain}`,
                    borderRadius: 6,
                    padding: "14px 16px",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: colorMain,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Volume a Infundir
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: T.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    {volAtaque}{" "}
                    <span style={{ fontSize: 14, color: "#64748b" }}>mL</span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      fontFamily: "monospace",
                    }}
                  >
                    Dose: {mlKgAtaque} mL/kg
                  </div>
                </div>

                <div
                  style={{
                    background: T.bgCard,
                    border: `1px solid ${T.borderCard}`,
                    borderLeft: `3px solid ${T.textMuted}`,
                    borderRadius: 6,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "#64748b",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Velocidade na Bomba
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${T.borderSection}`,
                      paddingBottom: 6,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 13, color: T.textPrimary }}>
                      Correr em 30 min
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      {velAtaque30} mL/h
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 13, color: T.textPrimary }}>
                      Correr em 60 min
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "monospace",
                        fontWeight: 500,
                      }}
                    >
                      {velAtaque60} mL/h
                    </span>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Footer ─────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderSection}`,
          padding: "8px 20px",
          background: T.bgSurface,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: T.textSubtle,
            fontFamily: "monospace",
          }}
        >
          MedPanel 2026 • Igor Vieira
        </div>
        <div
          style={{
            fontSize: 9,
            color: T.textMuted,
            fontFamily: "monospace",
          }}
        >
          ⚠ NaCl 20% (3,4 mEq/mL) · KCl 10% (1,34 mEq/mL) · Uso educacional.
        </div>
      </div>
    </div>
  );
}
