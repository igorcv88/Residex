import { useState, useMemo } from "react";

const data = [
  { ipr: 91, tier: "critical", spec: "CM", code: "CM1-CARDIO", name: "Hipertensão arterial sistêmica", inst: "ENARE+USP+UNIFESP", sem: 11, freq: "5-6 questões/prova", trend: "estável" },
  { ipr: 90, tier: "critical", spec: "CM", code: "CM1-CARDIO", name: "Insuficiência cardíaca, cardiomiopatias e pericardiopatias", inst: "ENARE+USP+UNIFESP", sem: 8, freq: "3-5 questões/prova", trend: "crescente" },
  { ipr: 89, tier: "critical", spec: "PREV", code: "PREV2", name: "Estudos epidemiológicos — bioestatística e delineamento", inst: "ENARE+USP+UNIFESP", sem: 7, freq: "3-5 questões/prova", trend: "estável" },
  { ipr: 88, tier: "critical", spec: "OBS", code: "OBS4", name: "DHG e DMG — pré-eclâmpsia, HELLP, diabetes gestacional", inst: "ENARE+USP+UNIFESP", sem: 10, freq: "3-4 questões/prova", trend: "crescente" },
  { ipr: 84, tier: "critical", spec: "CM", code: "CM6-INFECTO", name: "Grandes síndromes bacterianas, ITU e antibioticoterapia", inst: "ENARE+USP+UNIFESP", sem: 10, freq: "2-4 questões/prova", trend: "crescente" },
  { ipr: 81, tier: "critical", spec: "CM", code: "CM4-CARDIO", name: "DAC — síndromes coronarianas agudas e crônicas", inst: "ENARE+USP+UNIFESP", sem: 18, freq: "2-3 questões/prova", trend: "crescente" },
  { ipr: 79, tier: "high", spec: "CG", code: "CM3/CG-GASTRO", name: "Pancreatite aguda, crônica e neoplasias pancreáticas", inst: "ENARE+USP+UNIFESP", sem: 8, freq: "2-3 questões/prova", trend: "crescente" },
  { ipr: 77, tier: "high", spec: "CG", code: "CG1/CG4", name: "Doenças das vias biliares — colecistite, coledocolitíase, malignidades", inst: "USP+ENARE", sem: 15, freq: "2-4 questões USP", trend: "crescente" },
  { ipr: 76, tier: "high", spec: "OBS", code: "OBS3", name: "Sangramentos gestacionais — DPP, placenta prévia, atonia", inst: "ENARE+USP+UNIFESP", sem: 9, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 75, tier: "high", spec: "CM", code: "CM1-CARDIO", name: "Arritmias cardíacas e PCR — FA, flutter, TV, cardioversão", inst: "ENARE+USP+UNIFESP", sem: 5, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 72, tier: "high", spec: "CM", code: "CM1-CARDIO", name: "Valvopatias e semiologia cardíaca", inst: "ENARE+USP+UNIFESP", sem: 14, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 71, tier: "high", spec: "OBS", code: "OBS1+2", name: "Avaliação inicial da gestação e assistência ao pré-natal", inst: "ENARE+USP+UNIFESP", sem: 6, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 69, tier: "high", spec: "CG", code: "CG2-GASTRO", name: "Doenças do estômago — úlcera péptica, câncer gástrico", inst: "USP+ENARE", sem: 13, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 67, tier: "high", spec: "CG", code: "CG4", name: "Abdome agudo obstrutivo, vascular e perfurativo", inst: "USP+ENARE+UNIFESP", sem: 14, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 65, tier: "high", spec: "PREV", code: "PREV4", name: "Vigilância epidemiológica — sistemas, notificação, controle", inst: "ENARE+USP+UNIFESP", sem: 15, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 65, tier: "high", spec: "PED", code: "PED1", name: "Neonato II — infecções congênitas (TORCH) e distúrbios metabólicos", inst: "ENARE+USP+UNIFESP", sem: 5, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 64, tier: "high", spec: "CM", code: "CM6-INFECTO", name: "Síndromes febris — meningite, dengue, chikungunya, febre tifoide", inst: "ENARE+USP+UNIFESP", sem: 11, freq: "2-3 questões/prova", trend: "estável" },
  { ipr: 62, tier: "high", spec: "GIN", code: "GIN3+4", name: "Amenorreia e síndrome dos ovários policísticos", inst: "ENARE+USP+UNIFESP", sem: 6, freq: "1-2 questões/prova", trend: "crescente" },
  { ipr: 61, tier: "high", spec: "CG", code: "CG2", name: "Doenças do esôfago — DRGE, Barrett, esofagite, CA", inst: "USP+UNIFESP+ENARE", sem: 12, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 58, tier: "mid", spec: "CM", code: "CM2-ENDOCRINO", name: "Suprarrenal, hipófise e hipotálamo — Cushing, Addison, acromegalia", inst: "USP+ENARE+UNIFESP", sem: 5, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 55, tier: "mid", spec: "CM", code: "CM4-HEPATO", name: "Tumores hepáticos — CHC, metástases, abscesso", inst: "USP+ENARE", sem: 5, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 55, tier: "mid", spec: "CM", code: "CM4-CARDIO", name: "Síndrome metabólica e dislipidemia", inst: "USP+ENARE+UNIFESP", sem: 19, freq: "1-2 questões/prova", trend: "crescente" },
  { ipr: 52, tier: "mid", spec: "CG", code: "CG4", name: "Abdome agudo inflamatório — apendicite, diverticulite, colecistite", inst: "USP+ENARE+UNIFESP", sem: 17, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 50, tier: "mid", spec: "CG", code: "CG3", name: "Hérnias — inguinal, femoral, umbilical, hiatal", inst: "ENARE+USP", sem: 9, freq: "1 questão/prova", trend: "estável" },
  { ipr: 50, tier: "mid", spec: "CM", code: "CM3-GASTRO", name: "Diarreias, parasitoses intestinais e DGE", inst: "ENARE+USP+UNIFESP", sem: 12, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 50, tier: "mid", spec: "GIN", code: "GIN6/GIT1", name: "Vulvovaginites, cervicites e DSTs", inst: "ENARE+USP+UNIFESP", sem: 13, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 49, tier: "mid", spec: "OBS", code: "OBS4-EXTRA", name: "Doenças na gestação — tocose, isoimunização, DMG avançado", inst: "ENARE+USP+UNIFESP", sem: 13, freq: "1-2 questões/prova", trend: "estável" },
  { ipr: 48, tier: "mid", spec: "CM", code: "CM6-INFECTO", name: "HIV/AIDS — TARV, profilaxia, infecções oportunistas", inst: "USP+ENARE+UNIFESP", sem: 19, freq: "1-2 questões/prova", trend: "crescente" },
  { ipr: 45, tier: "mid", spec: "PED", code: "PED4", name: "Distúrbios nutricionais pediátricos — desnutrição, obesidade, carências", inst: "ENARE+USP+UNIFESP", sem: 11, freq: "1 questão/prova", trend: "estável" },
  { ipr: 44, tier: "mid", spec: "CG", code: "CG11", name: "Anestesiologia — bloqueios, fármacos, complicações", inst: "UNIFESP+USP", sem: 6, freq: "1 questão/prova", trend: "estável" },
  { ipr: 43, tier: "mid", spec: "PED", code: "PED3", name: "Síndromes puberais — puberdade precoce, atraso puberal", inst: "ENARE+USP", sem: 10, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 42, tier: "mid", spec: "CM", code: "CM6-INFECTO", name: "Toxicologia clínica — intoxicações e antídotos", inst: "USP+ENARE", sem: 18, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 42, tier: "mid", spec: "CG", code: "CG2", name: "Cirurgia de cabeça e pescoço — tireoide, paratireoide", inst: "USP+ENARE", sem: 16, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 40, tier: "mid", spec: "GIN", code: "GIN4/SET4", name: "Violência sexual e abordagem na APS", inst: "ENARE+UNIFESP", sem: 16, freq: "0-1 questão/prova", trend: "crescente" },
  { ipr: 38, tier: "low", spec: "CM", code: "CM3-GASTRO", name: "DGE, SII e constipação", inst: "USP+UNIFESP", sem: 14, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 38, tier: "low", spec: "CG", code: "CG1", name: "Hemorragia digestiva — alta e baixa, varicosa e não varicosa", inst: "USP+ENARE", sem: 20, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 38, tier: "low", spec: "PED", code: "PED1", name: "Neonato III — miscelânea neonatal", inst: "ENARE+USP+UNIFESP", sem: 6, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 36, tier: "low", spec: "CG", code: "CG1", name: "Queimaduras e trauma de extremidades", inst: "UNIFESP+ENARE", sem: 5, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 35, tier: "low", spec: "GIN", code: "GIN5", name: "SUA e dismenorreia", inst: "USP+ENARE", sem: 7, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 35, tier: "low", spec: "CG", code: "CG9", name: "Ortopedia geral e fraturas", inst: "UNIFESP+ENARE", sem: 7, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 33, tier: "low", spec: "CG", code: "CG13", name: "Oftalmologia — retinopatia, glaucoma, catarata", inst: "ENARE+USP", sem: 7, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 32, tier: "low", spec: "CG", code: "CG6", name: "Técnica cirúrgica e pós-operatório", inst: "ENARE+USP", sem: 12, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 30, tier: "low", spec: "CG", code: "CG9", name: "Ortopedia pediátrica e tumores ósseos", inst: "UNIFESP+ENARE", sem: 8, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 30, tier: "low", spec: "PED", code: "PED2", name: "Alimentação infantil — aleitamento, introdução alimentar", inst: "ENARE+USP", sem: 6, freq: "0-1 questão/prova", trend: "estável" },
  { ipr: 28, tier: "low", spec: "CG", code: "CG5", name: "Pré-operatório e nutrição do paciente cirúrgico", inst: "USP+ENARE", sem: 15, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 25, tier: "low", spec: "PED", code: "PED3", name: "Síndromes pondero-estaturais — nanismo, baixa estatura", inst: "ENARE+USP", sem: 7, freq: "0-1 questão/prova", trend: "decrescente" },
  { ipr: 22, tier: "low", spec: "PREV", code: "PREV1", name: "Saúde do trabalhador — NR, doenças ocupacionais", inst: "ENARE+UNIFESP", sem: 20, freq: "0-1 questão/prova", trend: "decrescente" },
];

const TIER_CONFIG = {
  critical: { label: "Crítico — IPR 80-100 · Estude em profundidade", dot: "#E24B4A", bg: "#FCEBEB", border: "#F09595", text: "#A32D2D", btnBorder: "#F09595", btnText: "#A32D2D" },
  high:     { label: "Alta prioridade — IPR 60-79 · Solidez obrigatória", dot: "#EF9F27", bg: "#FAEEDA", border: "#FAC775", text: "#854F0B", btnBorder: "#FAC775", btnText: "#854F0B" },
  mid:      { label: "Média prioridade — IPR 40-59 · Visão geral com pontos-chave", dot: "#639922", bg: "#EAF3DE", border: "#C0DD97", text: "#3B6D11", btnBorder: "#C0DD97", btnText: "#3B6D11" },
  low:      { label: "Baixa prioridade — IPR <40 · Só se sobrar tempo", dot: "#378ADD", bg: "#E6F1FB", border: "#B5D4F4", text: "#185FA5", btnBorder: "#B5D4F4", btnText: "#185FA5" },
};

const SPEC_CONFIG = {
  CM:   { bg: "#E6F1FB", text: "#185FA5", border: "#B5D4F4" },
  CG:   { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
  OBS:  { bg: "#FBEAF0", text: "#993556", border: "#F4C0D1" },
  PED:  { bg: "#EAF3DE", text: "#3B6D11", border: "#C0DD97" },
  PREV: { bg: "#EEEDFE", text: "#3C3489", border: "#CECBF6" },
  GIN:  { bg: "#FAECE7", text: "#993C1D", border: "#F5C4B3" },
};

const SPECS = ["CM", "CG", "OBS", "PED", "PREV", "GIN"];
const SPEC_LABELS = { CM: "Clínica Médica", CG: "Cirurgia", OBS: "Obstetrícia", PED: "Pediatria", PREV: "Preventiva", GIN: "Ginecologia" };
const TIER_ORDER = ["critical", "high", "mid", "low"];

export default function ResidexCronograma() {
  const [tierFilter, setTierFilter] = useState("all");
  const [specFilter, setSpecFilter] = useState(null);

  const filtered = useMemo(() => {
    return data
      .filter(d => tierFilter === "all" || d.tier === tierFilter)
      .filter(d => !specFilter || d.spec === specFilter)
      .sort((a, b) => b.ipr - a.ipr);
  }, [tierFilter, specFilter]);

  const grouped = useMemo(() => {
    const g = {};
    TIER_ORDER.forEach(t => { g[t] = filtered.filter(d => d.tier === t); });
    return g;
  }, [filtered]);

  const trendIcon = (t) => t === "crescente" ? "↑" : t === "decrescente" ? "↓" : "→";
  const trendColor = (t) => t === "crescente" ? "#639922" : t === "decrescente" ? "#A32D2D" : "#888780";

  const handleSpecFilter = (s) => {
    setSpecFilter(prev => prev === s ? null : s);
    setTierFilter("all");
  };
  const handleTierFilter = (t) => {
    setTierFilter(t);
    setSpecFilter(null);
  };

  const criticalCount = data.filter(d => d.tier === "critical").length;
  const highCount = data.filter(d => d.tier === "high").length;
  const lowCount = data.filter(d => d.tier === "low" || d.tier === "mid").length;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem 1rem", maxWidth: 860, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>RESIDEX — Cronograma por IPR</h1>
        <p style={{ fontSize: 13, color: "#888780" }}>
          48 temas · Base: 18 provas — ENARE 2021–2026 · USP 2020–2026 · UNIFESP 2020–2026
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 10, marginBottom: "1.5rem" }}>
        {[
          { label: "Temas analisados", val: data.length, color: undefined },
          { label: "IPR Crítico (80+)", val: criticalCount, color: "#A32D2D" },
          { label: "Alta prioridade", val: highCount, color: "#854F0B" },
          { label: "Baixa / Ignorar", val: lowCount, color: "#3B6D11" },
        ].map(s => (
          <div key={s.label} style={{ background: "#F1EFE8", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#888780", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {TIER_ORDER.map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5F5E5A" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: TIER_CONFIG[t].dot, flexShrink: 0 }} />
            {t === "critical" ? "Crítico 80–100" : t === "high" ? "Alta 60–79" : t === "mid" ? "Média 40–59" : "Baixa <40"}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {[
          { key: "all", label: "Todos", border: undefined, color: undefined },
          { key: "critical", label: "Crítico 80+", border: TIER_CONFIG.critical.btnBorder, color: TIER_CONFIG.critical.btnText },
          { key: "high", label: "Alta 60–79", border: TIER_CONFIG.high.btnBorder, color: TIER_CONFIG.high.btnText },
          { key: "mid", label: "Média 40–59", border: TIER_CONFIG.mid.btnBorder, color: TIER_CONFIG.mid.btnText },
          { key: "low", label: "Baixa <40", border: TIER_CONFIG.low.btnBorder, color: TIER_CONFIG.low.btnText },
        ].map(b => (
          <button
            key={b.key}
            onClick={() => handleTierFilter(b.key)}
            style={{
              fontSize: 12, padding: "5px 12px",
              border: `0.5px solid ${b.border || (tierFilter === b.key ? "#888780" : "#D3D1C7")}`,
              borderRadius: 8, cursor: "pointer",
              background: tierFilter === b.key && !specFilter ? "#F1EFE8" : "#fff",
              color: b.color || "#2C2C2A",
              fontWeight: tierFilter === b.key && !specFilter ? 500 : 400,
            }}
          >
            {b.label}
          </button>
        ))}
        {SPECS.map(s => (
          <button
            key={s}
            onClick={() => handleSpecFilter(s)}
            style={{
              fontSize: 12, padding: "5px 12px",
              border: `0.5px solid ${specFilter === s ? "#888780" : "#D3D1C7"}`,
              borderRadius: 8, cursor: "pointer",
              background: specFilter === s ? "#F1EFE8" : "#fff",
              color: "#2C2C2A",
              fontWeight: specFilter === s ? 500 : 400,
            }}
          >
            {SPEC_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 12, color: "#B4B2A9", marginBottom: "1rem" }}>
        {filtered.length} tema{filtered.length !== 1 ? "s" : ""} exibido{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Topic list by tier */}
      {TIER_ORDER.map(tier => {
        const items = grouped[tier];
        if (!items || items.length === 0) return null;
        const tc = TIER_CONFIG[tier];
        return (
          <div key={tier}>
            <div style={{
              fontSize: 11, fontWeight: 500, color: "#888780",
              margin: "1.25rem 0 0.5rem", paddingBottom: 6,
              borderBottom: "0.5px solid #D3D1C7",
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {tc.label}
            </div>
            {items.map((d, i) => {
              const sc = SPEC_CONFIG[d.spec] || SPEC_CONFIG.CM;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "10px 14px",
                  border: "0.5px solid #D3D1C7", borderRadius: 10,
                  background: "#fff", marginBottom: 8,
                }}>
                  {/* IPR Badge */}
                  <div style={{
                    flexShrink: 0, width: 46, height: 46, borderRadius: 8,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: tc.bg, border: `0.5px solid ${tc.border}`, color: tc.text,
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>{d.ipr}</span>
                    <span style={{ fontSize: 9, opacity: 0.85 }}>
                      {tier === "critical" ? "CRÍTICO" : tier === "high" ? "ALTA" : tier === "mid" ? "MÉDIA" : "BAIXA"}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A18", marginBottom: 3 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: "#888780", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                      <span style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 6,
                        background: sc.bg, color: sc.text, border: `0.5px solid ${sc.border}`,
                      }}>
                        {d.code}
                      </span>
                      <span>{d.inst}</span>
                      <span>{d.freq}</span>
                      <span style={{ color: trendColor(d.trend) }}>{trendIcon(d.trend)} {d.trend}</span>
                    </div>
                  </div>

                  {/* Week */}
                  <div style={{ fontSize: 11, fontWeight: 500, minWidth: 55, textAlign: "right", color: "#B4B2A9", flexShrink: 0 }}>
                    Sem. {d.sem}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#B4B2A9", fontSize: 14 }}>
          Nenhum tema encontrado para esse filtro.
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "0.5px solid #D3D1C7", fontSize: 11, color: "#B4B2A9" }}>
        RESIDEX · IPR calculado com base em frequência histórica (40%), recorrência multi-institucional (30%), tendência recente (20%) e complexidade/custo-benefício (10%)
      </div>
    </div>
  );
}
