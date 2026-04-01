import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ─── tokens ──────────────────────────────────────────────────────────────────
const BG = "#f1f5f9";
const BG2 = "#e2e8f0";
const BG3 = "#94a3b8";
const BORDER = "#111827";
const BORDER2 = "#1e2a3a";
const T_PRI = "#000000";
const T_SEC = "#0d1220";
const T_MUT = "#0d1220";
const T_DIM = "#64748b";
const FONT = "'Palatino Linotype','Book Antiqua',Palatino,serif";
const MONO = "monospace";

// ─── data ────────────────────────────────────────────────────────────────────
const data = [
  {
    ipr: 91,
    tier: "critical",
    spec: "CM",
    code: "CM1-CARDIO",
    name: "Hipertensão arterial sistêmica",
    inst: "ENARE+USP+UNIFESP",
    sem: 11,
    freq: "5-6 questões/prova",
    trend: "estável",
  },
  {
    ipr: 90,
    tier: "critical",
    spec: "CM",
    code: "CM1-CARDIO",
    name: "Insuficiência cardíaca, cardiomiopatias e pericardiopatias",
    inst: "ENARE+USP+UNIFESP",
    sem: 8,
    freq: "3-5 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 89,
    tier: "critical",
    spec: "PREV",
    code: "PREV2",
    name: "Estudos epidemiológicos — bioestatística e delineamento",
    inst: "ENARE+USP+UNIFESP",
    sem: 7,
    freq: "3-5 questões/prova",
    trend: "estável",
  },
  {
    ipr: 88,
    tier: "critical",
    spec: "OBS",
    code: "OBS4",
    name: "DHG e DMG — pré-eclâmpsia, HELLP, diabetes gestacional",
    inst: "ENARE+USP+UNIFESP",
    sem: 10,
    freq: "3-4 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 84,
    tier: "critical",
    spec: "CM",
    code: "CM6-INFECTO",
    name: "Grandes síndromes bacterianas, ITU e antibioticoterapia",
    inst: "ENARE+USP+UNIFESP",
    sem: 10,
    freq: "2-4 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 81,
    tier: "critical",
    spec: "CM",
    code: "CM4-CARDIO",
    name: "DAC — síndromes coronarianas agudas e crônicas",
    inst: "ENARE+USP+UNIFESP",
    sem: 18,
    freq: "2-3 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 79,
    tier: "high",
    spec: "CG",
    code: "CM3/CG-GASTRO",
    name: "Pancreatite aguda, crônica e neoplasias pancreáticas",
    inst: "ENARE+USP+UNIFESP",
    sem: 8,
    freq: "2-3 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 77,
    tier: "high",
    spec: "CG",
    code: "CG1/CG4",
    name: "Doenças das vias biliares — colecistite, coledocolitíase, malignidades",
    inst: "USP+ENARE",
    sem: 15,
    freq: "2-4 questões USP",
    trend: "crescente",
  },
  {
    ipr: 76,
    tier: "high",
    spec: "OBS",
    code: "OBS3",
    name: "Sangramentos gestacionais — DPP, placenta prévia, atonia",
    inst: "ENARE+USP+UNIFESP",
    sem: 9,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 75,
    tier: "high",
    spec: "CM",
    code: "CM1-CARDIO",
    name: "Arritmias cardíacas e PCR — FA, flutter, TV, cardioversão",
    inst: "ENARE+USP+UNIFESP",
    sem: 5,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 72,
    tier: "high",
    spec: "CM",
    code: "CM1-CARDIO",
    name: "Valvopatias e semiologia cardíaca",
    inst: "ENARE+USP+UNIFESP",
    sem: 14,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 71,
    tier: "high",
    spec: "OBS",
    code: "OBS1+2",
    name: "Avaliação inicial da gestação e assistência ao pré-natal",
    inst: "ENARE+USP+UNIFESP",
    sem: 6,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 69,
    tier: "high",
    spec: "CG",
    code: "CG2-GASTRO",
    name: "Doenças do estômago — úlcera péptica, câncer gástrico",
    inst: "USP+ENARE",
    sem: 13,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 67,
    tier: "high",
    spec: "CG",
    code: "CG4",
    name: "Abdome agudo obstrutivo, vascular e perfurativo",
    inst: "USP+ENARE+UNIFESP",
    sem: 14,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 65,
    tier: "high",
    spec: "PREV",
    code: "PREV4",
    name: "Vigilância epidemiológica — sistemas, notificação, controle",
    inst: "ENARE+USP+UNIFESP",
    sem: 15,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 65,
    tier: "high",
    spec: "PED",
    code: "PED1",
    name: "Neonato II — infecções congênitas (TORCH) e distúrbios metabólicos",
    inst: "ENARE+USP+UNIFESP",
    sem: 5,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 64,
    tier: "high",
    spec: "CM",
    code: "CM6-INFECTO",
    name: "Síndromes febris — meningite, dengue, chikungunya, febre tifoide",
    inst: "ENARE+USP+UNIFESP",
    sem: 11,
    freq: "2-3 questões/prova",
    trend: "estável",
  },
  {
    ipr: 62,
    tier: "high",
    spec: "GIN",
    code: "GIN3+4",
    name: "Amenorreia e síndrome dos ovários policísticos",
    inst: "ENARE+USP+UNIFESP",
    sem: 6,
    freq: "1-2 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 61,
    tier: "high",
    spec: "CG",
    code: "CG2",
    name: "Doenças do esôfago — DRGE, Barrett, esofagite, CA",
    inst: "USP+UNIFESP+ENARE",
    sem: 12,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 58,
    tier: "mid",
    spec: "CM",
    code: "CM2-ENDOCRINO",
    name: "Suprarrenal, hipófise e hipotálamo — Cushing, Addison, acromegalia",
    inst: "USP+ENARE+UNIFESP",
    sem: 5,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 55,
    tier: "mid",
    spec: "CM",
    code: "CM4-HEPATO",
    name: "Tumores hepáticos — CHC, metástases, abscesso",
    inst: "USP+ENARE",
    sem: 5,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 55,
    tier: "mid",
    spec: "CM",
    code: "CM4-CARDIO",
    name: "Síndrome metabólica e dislipidemia",
    inst: "USP+ENARE+UNIFESP",
    sem: 19,
    freq: "1-2 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 52,
    tier: "mid",
    spec: "CG",
    code: "CG4",
    name: "Abdome agudo inflamatório — apendicite, diverticulite, colecistite",
    inst: "USP+ENARE+UNIFESP",
    sem: 17,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 50,
    tier: "mid",
    spec: "CG",
    code: "CG3",
    name: "Hérnias — inguinal, femoral, umbilical, hiatal",
    inst: "ENARE+USP",
    sem: 9,
    freq: "1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 50,
    tier: "mid",
    spec: "CM",
    code: "CM3-GASTRO",
    name: "Diarreias, parasitoses intestinais e DGE",
    inst: "ENARE+USP+UNIFESP",
    sem: 12,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 50,
    tier: "mid",
    spec: "GIN",
    code: "GIN6/GIT1",
    name: "Vulvovaginites, cervicites e DSTs",
    inst: "ENARE+USP+UNIFESP",
    sem: 13,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 49,
    tier: "mid",
    spec: "OBS",
    code: "OBS4-EXTRA",
    name: "Doenças na gestação — tocose, isoimunização, DMG avançado",
    inst: "ENARE+USP+UNIFESP",
    sem: 13,
    freq: "1-2 questões/prova",
    trend: "estável",
  },
  {
    ipr: 48,
    tier: "mid",
    spec: "CM",
    code: "CM6-INFECTO",
    name: "HIV/AIDS — TARV, profilaxia, infecções oportunistas",
    inst: "USP+ENARE+UNIFESP",
    sem: 19,
    freq: "1-2 questões/prova",
    trend: "crescente",
  },
  {
    ipr: 45,
    tier: "mid",
    spec: "PED",
    code: "PED4",
    name: "Distúrbios nutricionais pediátricos — desnutrição, obesidade, carências",
    inst: "ENARE+USP+UNIFESP",
    sem: 11,
    freq: "1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 44,
    tier: "mid",
    spec: "CG",
    code: "CG11",
    name: "Anestesiologia — bloqueios, fármacos, complicações",
    inst: "UNIFESP+USP",
    sem: 6,
    freq: "1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 43,
    tier: "mid",
    spec: "PED",
    code: "PED3",
    name: "Síndromes puberais — puberdade precoce, atraso puberal",
    inst: "ENARE+USP",
    sem: 10,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 42,
    tier: "mid",
    spec: "CM",
    code: "CM6-INFECTO",
    name: "Toxicologia clínica — intoxicações e antídotos",
    inst: "USP+ENARE",
    sem: 18,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 42,
    tier: "mid",
    spec: "CG",
    code: "CG2",
    name: "Cirurgia de cabeça e pescoço — tireoide, paratireoide",
    inst: "USP+ENARE",
    sem: 16,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 40,
    tier: "mid",
    spec: "GIN",
    code: "GIN4/SET4",
    name: "Violência sexual e abordagem na APS",
    inst: "ENARE+UNIFESP",
    sem: 16,
    freq: "0-1 questão/prova",
    trend: "crescente",
  },
  {
    ipr: 38,
    tier: "low",
    spec: "CM",
    code: "CM3-GASTRO",
    name: "DGE, SII e constipação",
    inst: "USP+UNIFESP",
    sem: 14,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 38,
    tier: "low",
    spec: "CG",
    code: "CG1",
    name: "Hemorragia digestiva — alta e baixa, varicosa e não varicosa",
    inst: "USP+ENARE",
    sem: 20,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 38,
    tier: "low",
    spec: "PED",
    code: "PED1",
    name: "Neonato III — miscelânea neonatal",
    inst: "ENARE+USP+UNIFESP",
    sem: 6,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 36,
    tier: "low",
    spec: "CG",
    code: "CG1",
    name: "Queimaduras e trauma de extremidades",
    inst: "UNIFESP+ENARE",
    sem: 5,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 35,
    tier: "low",
    spec: "GIN",
    code: "GIN5",
    name: "SUA e dismenorreia",
    inst: "USP+ENARE",
    sem: 7,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 35,
    tier: "low",
    spec: "CG",
    code: "CG9",
    name: "Ortopedia geral e fraturas",
    inst: "UNIFESP+ENARE",
    sem: 7,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 33,
    tier: "low",
    spec: "CG",
    code: "CG13",
    name: "Oftalmologia — retinopatia, glaucoma, catarata",
    inst: "ENARE+USP",
    sem: 7,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 32,
    tier: "low",
    spec: "CG",
    code: "CG6",
    name: "Técnica cirúrgica e pós-operatório",
    inst: "ENARE+USP",
    sem: 12,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 30,
    tier: "low",
    spec: "CG",
    code: "CG9",
    name: "Ortopedia pediátrica e tumores ósseos",
    inst: "UNIFESP+ENARE",
    sem: 8,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 30,
    tier: "low",
    spec: "PED",
    code: "PED2",
    name: "Alimentação infantil — aleitamento, introdução alimentar",
    inst: "ENARE+USP",
    sem: 6,
    freq: "0-1 questão/prova",
    trend: "estável",
  },
  {
    ipr: 28,
    tier: "low",
    spec: "CG",
    code: "CG5",
    name: "Pré-operatório e nutrição do paciente cirúrgico",
    inst: "USP+ENARE",
    sem: 15,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 25,
    tier: "low",
    spec: "PED",
    code: "PED3",
    name: "Síndromes pondero-estaturais — nanismo, baixa estatura",
    inst: "ENARE+USP",
    sem: 7,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
  {
    ipr: 22,
    tier: "low",
    spec: "PREV",
    code: "PREV1",
    name: "Saúde do trabalhador — NR, doenças ocupacionais",
    inst: "ENARE+UNIFESP",
    sem: 20,
    freq: "0-1 questão/prova",
    trend: "decrescente",
  },
];

// ─── tier config (dark) ───────────────────────────────────────────────────────
const TIER_CONFIG = {
  critical: {
    label: "Crítico — IPR 80–100 · Estude em profundidade",
    dot: "#EF4444",
    bg: "#EF444414",
    border: "#EF444435",
    text: "#fca5a5",
    shortLabel: "CRÍTICO",
  },
  high: {
    label: "Alta prioridade — IPR 60–79 · Solidez obrigatória",
    dot: "#F59E0B",
    bg: "#F59E0B14",
    border: "#F59E0B35",
    text: "#fcd34d",
    shortLabel: "ALTA",
  },
  mid: {
    label: "Média prioridade — IPR 40–59 · Pontos-chave",
    dot: "#10B981",
    bg: "#10B98114",
    border: "#10B98135",
    text: "#6ee7b7",
    shortLabel: "MÉDIA",
  },
  low: {
    label: "Baixa prioridade — IPR <40 · Só se sobrar tempo",
    dot: "#0EA5E9",
    bg: "#0EA5E914",
    border: "#0EA5E935",
    text: "#7dd3fc",
    shortLabel: "BAIXA",
  },
};

// ─── spec config (dark) ───────────────────────────────────────────────────────
const SPEC_CONFIG = {
  CM: { bg: "#0EA5E914", text: "#7dd3fc", border: "#0EA5E935" },
  CG: { bg: "#F59E0B14", text: "#fcd34d", border: "#F59E0B35" },
  OBS: { bg: "#EC489914", text: "#f9a8d4", border: "#EC489935" },
  PED: { bg: "#10B98114", text: "#6ee7b7", border: "#10B98135" },
  PREV: { bg: "#8B5CF614", text: "#c4b5fd", border: "#8B5CF635" },
  GIN: { bg: "#F9731614", text: "#fdba74", border: "#F9731635" },
};

const SPECS = ["CM", "CG", "OBS", "PED", "PREV", "GIN"];
const SPEC_LABELS = {
  CM: "Clínica Médica",
  CG: "Cirurgia",
  OBS: "Obstetrícia",
  PED: "Pediatria",
  PREV: "Preventiva",
  GIN: "Ginecologia",
};
const TIER_ORDER = ["critical", "high", "mid", "low"];

// ─── component ────────────────────────────────────────────────────────────────
export default function CronogramaResidex() {
  const navigate = useNavigate();
  const [tierFilter, setTierFilter] = useState("all");
  const [specFilter, setSpecFilter] = useState(null);

  const filtered = useMemo(
    () =>
      data
        .filter((d) => tierFilter === "all" || d.tier === tierFilter)
        .filter((d) => !specFilter || d.spec === specFilter)
        .sort((a, b) => b.ipr - a.ipr),
    [tierFilter, specFilter],
  );

  const grouped = useMemo(() => {
    const g = {};
    TIER_ORDER.forEach((t) => {
      g[t] = filtered.filter((d) => d.tier === t);
    });
    return g;
  }, [filtered]);

  const trendIcon = (t) =>
    t === "crescente" ? "↑" : t === "decrescente" ? "↓" : "→";
  const trendColor = (t) =>
    t === "crescente" ? "#6ee7b7" : t === "decrescente" ? "#fca5a5" : T_DIM;

  const handleSpecFilter = (s) => {
    setSpecFilter((prev) => (prev === s ? null : s));
    setTierFilter("all");
  };
  const handleTierFilter = (t) => {
    setTierFilter(t);
    setSpecFilter(null);
  };

  const counts = {
    critical: data.filter((d) => d.tier === "critical").length,
    high: data.filter((d) => d.tier === "high").length,
    mid: data.filter((d) => d.tier === "mid").length,
    low: data.filter((d) => d.tier === "low").length,
  };

  // ── shared filter button style ─────────────────────────────────────────────
  const filterBtn = (active, accentColor) => ({
    fontSize: 11,
    padding: "5px 13px",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: MONO,
    border: `1px solid ${active ? accentColor || BORDER2 : BORDER2}`,
    background: active
      ? accentColor
        ? `${accentColor}18`
        : BG3
      : "transparent",
    color: active ? accentColor || T_PRI : T_DIM,
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: T_PRI,
        fontFamily: FONT,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .filters-row { gap: 6px !important; }
          .topic-card { flex-direction: column !important; gap: 8px !important; }
          .sem-badge { text-align: left !important; }
        }
      `}</style>

      {/* ── header ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: BG2,
          borderBottom: `1px solid ${BORDER}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              color: T_DIM,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: MONO,
              padding: 0,
            }}
          >
            ← MedPanel
          </button>
          <span style={{ color: BORDER2 }}>|</span>
          <span
            style={{
              fontSize: 11,
              fontFamily: MONO,
              color: "#6366F1",
              letterSpacing: "0.05em",
            }}
          >
            RESIDEX
          </span>
          <span style={{ fontSize: 14, color: T_SEC, fontFamily: FONT }}>
            Cronograma por IPR
          </span>
        </div>
        <span style={{ fontSize: 11, fontFamily: MONO, color: T_DIM }}>
          {data.length} temas · 18 provas
        </span>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        {/* ── subheader ───────────────────────────────────────────────────── */}
        <p
          style={{
            fontSize: 12,
            fontFamily: MONO,
            color: T_DIM,
            marginBottom: 24,
          }}
        >
          ENARE 2021–2026 · USP 2020–2026 · UNIFESP 2020–2026
        </p>

        {/* ── stats ───────────────────────────────────────────────────────── */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Temas totais",
              val: data.length,
              color: T_MUT,
              accent: null,
            },
            {
              label: "IPR Crítico 80+",
              val: counts.critical,
              color: "#fca5a5",
              accent: "#EF4444",
            },
            {
              label: "Alta prioridade",
              val: counts.high,
              color: "#fcd34d",
              accent: "#F59E0B",
            },
            {
              label: "Baixa / Ignorar",
              val: counts.low + counts.mid,
              color: "#7dd3fc",
              accent: "#0EA5E9",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: BG3,
                border: `1px solid ${s.accent ? `${s.accent}30` : BORDER2}`,
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontFamily: MONO,
                  color: T_DIM,
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: s.color,
                  fontFamily: FONT,
                }}
              >
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {/* ── legend ──────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {TIER_ORDER.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 11,
                fontFamily: MONO,
                color: T_MUT,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: TIER_CONFIG[t].dot,
                  flexShrink: 0,
                }}
              />
              {t === "critical"
                ? "Crítico 80–100"
                : t === "high"
                  ? "Alta 60–79"
                  : t === "mid"
                    ? "Média 40–59"
                    : "Baixa <40"}
            </div>
          ))}
        </div>

        {/* ── filters — tier ──────────────────────────────────────────────── */}
        <div
          className="filters-row"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <button
            onClick={() => handleTierFilter("all")}
            style={filterBtn(tierFilter === "all" && !specFilter, null)}
          >
            Todos
          </button>
          {TIER_ORDER.map((t) => (
            <button
              key={t}
              onClick={() => handleTierFilter(t)}
              style={filterBtn(
                tierFilter === t && !specFilter,
                TIER_CONFIG[t].dot,
              )}
            >
              {TIER_CONFIG[t].shortLabel}
            </button>
          ))}
        </div>

        {/* ── filters — spec ──────────────────────────────────────────────── */}
        <div
          className="filters-row"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {SPECS.map((s) => (
            <button
              key={s}
              onClick={() => handleSpecFilter(s)}
              style={filterBtn(specFilter === s, null)}
            >
              {SPEC_LABELS[s]}
            </button>
          ))}
        </div>

        {/* ── count ───────────────────────────────────────────────────────── */}
        <div
          style={{
            fontSize: 11,
            fontFamily: MONO,
            color: T_DIM,
            marginBottom: 16,
          }}
        >
          {filtered.length} tema{filtered.length !== 1 ? "s" : ""} exibido
          {filtered.length !== 1 ? "s" : ""}
        </div>

        {/* ── topic list ──────────────────────────────────────────────────── */}
        {TIER_ORDER.map((tier) => {
          const items = grouped[tier];
          if (!items || items.length === 0) return null;
          const tc = TIER_CONFIG[tier];
          return (
            <div key={tier}>
              {/* tier divider */}
              <div
                style={{
                  fontSize: 10,
                  fontFamily: MONO,
                  color: tc.text,
                  margin: "20px 0 10px",
                  paddingBottom: 8,
                  borderBottom: `1px solid ${tc.border}`,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {tc.label}
              </div>

              {items.map((d, i) => {
                const sc = SPEC_CONFIG[d.spec] || SPEC_CONFIG.CM;
                return (
                  <div
                    className="topic-card"
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "11px 14px",
                      border: `1px solid ${BORDER2}`,
                      borderLeft: `3px solid ${tc.dot}`,
                      borderRadius: 8,
                      background: BG3,
                      marginBottom: 7,
                    }}
                  >
                    {/* IPR badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: 48,
                        height: 48,
                        borderRadius: 7,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: tc.bg,
                        border: `1px solid ${tc.border}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          color: tc.text,
                          lineHeight: 1.2,
                          fontFamily: FONT,
                        }}
                      >
                        {d.ipr}
                      </span>
                      <span
                        style={{
                          fontSize: 8,
                          fontFamily: MONO,
                          color: tc.text,
                          opacity: 0.75,
                        }}
                      >
                        {tc.shortLabel}
                      </span>
                    </div>

                    {/* body */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          color: T_SEC,
                          marginBottom: 5,
                          fontFamily: FONT,
                        }}
                      >
                        {d.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        {/* spec/code badge */}
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 5,
                            fontFamily: MONO,
                            background: sc.bg,
                            color: sc.text,
                            border: `1px solid ${sc.border}`,
                          }}
                        >
                          {d.code}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: MONO,
                            color: T_DIM,
                          }}
                        >
                          {d.inst}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: MONO,
                            color: T_MUT,
                          }}
                        >
                          {d.freq}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: MONO,
                            color: trendColor(d.trend),
                          }}
                        >
                          {trendIcon(d.trend)} {d.trend}
                        </span>
                      </div>
                    </div>

                    {/* semana */}
                    <div
                      className="sem-badge"
                      style={{
                        fontSize: 11,
                        fontFamily: MONO,
                        color: T_DIM,
                        minWidth: 52,
                        textAlign: "right",
                        flexShrink: 0,
                        paddingTop: 2,
                      }}
                    >
                      Sem. {d.sem}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: T_DIM,
              fontSize: 13,
              fontFamily: MONO,
            }}
          >
            Nenhum tema encontrado para esse filtro.
          </div>
        )}

        {/* ── footer ──────────────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 10,
            fontFamily: MONO,
            color: T_DIM,
            lineHeight: 1.6,
          }}
        >
          RESIDEX · IPR calculado com base em frequência histórica (40%),
          recorrência multi-institucional (30%), tendência recente (20%) e
          complexidade/custo-benefício (10%)
        </div>
      </div>
    </div>
  );
}
