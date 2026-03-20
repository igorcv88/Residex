import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const data = [
  {
    name: "Ketorolac",
    dose: "30mg IM",
    nnt: 1.8,
    class: "non-selective",
    route: "IM/IV",
    nuances: [
      "Maior potência analgésica entre NSAIDs disponíveis",
      "Único NSAID com eficácia opioide-equivalente em dor aguda intensa",
      "Uso limitado a 5 dias (nefrotoxicidade cumulativa)",
      "Inibição COX-1 intensa → risco GI e antiagregação significativos",
      "Não indicado para dor crônica"
    ],
    highlight: "MAIS POTENTE"
  },
  {
    name: "Etoricoxib",
    dose: "120mg VO",
    nnt: 1.9,
    class: "coxib",
    route: "VO",
    nuances: [
      "Maior potência analgésica entre coxibs em dose máxima",
      "NNT comparável ao ketorolac IM — dado clínico surpreendente",
      "Seletividade COX-2 ~106x → risco trombótico elevado",
      "Dose 120mg aprovada apenas para gota aguda e dor pós-operatória",
      "Uso crônico restrito a 60-90mg pela FDA/EMA"
    ],
    highlight: "COXIB MAIS POTENTE"
  },
  {
    name: "Diclofenaco",
    dose: "50mg VO",
    nnt: 2.1,
    class: "non-selective",
    route: "VO/IM",
    nuances: [
      "Referência histórica da classe — dados extensos em dor aguda",
      "Seletividade COX-2 levemente preferencial (~5x) vs. maioria dos não seletivos",
      "Acil-glucuronídeos reativos → hepatotoxicidade idiossincrática real (similar ao lumiracoxib)",
      "Potência elevada + biodisponibilidade rápida = onset eficaz",
      "Pior perfil CV entre NSAIDs tradicionais (PRECISION, CNT meta-analysis)"
    ]
  },
  {
    name: "Parecoxib",
    dose: "40mg IV/IM",
    nnt: 2.2,
    class: "coxib",
    route: "IV/IM",
    nuances: [
      "Pró-fármaco do valdecoxib — único coxib parenteral disponível",
      "Nicho exclusivo: dor pós-operatória intensa sem via oral",
      "Convertido a valdecoxib por esterases plasmáticas",
      "Onset mais rápido que celecoxib oral em contexto hospitalar",
      "Valdecoxib retirado do mercado — parecoxib mantido por nicho parenteral"
    ],
    highlight: "ÚNICO COXIB PARENTERAL"
  },
  {
    name: "Ketoprofeno",
    dose: "25mg VO",
    nnt: 2.3,
    class: "non-selective",
    route: "VO/IM/tópico",
    nuances: [
      "Alta potência em dose baixa — NNT 2.3 com apenas 25mg",
      "Penetração no SNC superior a ibuprofeno → componente analgésico central",
      "Inibição COX-1 intensa → risco GI elevado",
      "Excelente formulação tópica (gel) para dor musculoesquelética localizada",
      "Metabolismo hepático via glucuronidação — menos interações CYP"
    ]
  },
  {
    name: "Naproxeno",
    dose: "500-550mg VO",
    nnt: 2.3,
    class: "non-selective",
    route: "VO",
    nuances: [
      "Melhor perfil cardiovascular entre NSAIDs não seletivos (PRECISION, Bhala 2013)",
      "Meia-vida longa (12-17h) — inibição COX-1 plaquetária sustentada, efeito AAS-like",
      "Potência analgésica equivalente ao ketoprofeno com melhor tolerabilidade CV",
      "Primeira escolha em pacientes com risco cardiovascular elevado",
      "Maior risco GI que coxibs, menor que ibuprofeno em uso crônico"
    ],
    highlight: "MELHOR PERFIL CV"
  },
  {
    name: "Ibuprofeno",
    dose: "400mg VO",
    nnt: 2.5,
    class: "non-selective",
    route: "VO",
    nuances: [
      "NSAID mais prescrito globalmente — padrão de comparação em ensaios",
      "NNT 2.5 amplamente replicado em dor dental, pós-operatória, dismenorreia",
      "Inibição COX reversível e meia-vida curta (2h) → janelas de risco CV entre doses",
      "Interfere com efeito antiagregante do AAS (inibição competitiva COX-1)",
      "Risco CV intermediário — pior que naproxeno, melhor que diclofenaco"
    ]
  },
  {
    name: "Flurbiprofeno",
    dose: "100mg VO",
    nnt: 2.5,
    class: "non-selective",
    route: "VO/colírio/pastilha",
    nuances: [
      "Potência equivalente ao ibuprofeno sistêmico",
      "Maior seletividade COX-1 do gráfico → antiagregação mais intensa",
      "Nicho real: colírio 0.03% (midríase cirúrgica) e pastilha 8.75mg (faringite)",
      "Formulações tópicas exploram COX-1 seletividade sem custo sistêmico",
      "Uso oral sistêmico obsoleto — sem vantagem sobre ibuprofeno"
    ]
  },
  {
    name: "Loxoprofeno",
    dose: "60mg VO",
    nnt: 2.5,
    class: "non-selective",
    route: "VO",
    nuances: [
      "Pró-fármaco (propionato) → menor irritação gástrica direta vs. ibuprofeno",
      "Perfil sistêmico similar ao ibuprofeno após conversão ao metabólito ativo",
      "Amplamente usado no Japão e Brasil para dor musculoesquelética aguda",
      "Posicionamento gráfico: entre naproxeno e ibuprofeno (levemente COX-1 preferencial)",
      "Não confundir menor irritação gástrica local com menor risco GI sistêmico"
    ]
  },
  {
    name: "Indometacina",
    dose: "25-50mg VO",
    nnt: 2.5,
    class: "non-selective",
    route: "VO/IV/supositório",
    nuances: [
      "Primeira escolha absoluta em gota aguda e febre de causa desconhecida",
      "Alta penetração SNC → efeitos adversos neurológicos frequentes (cefaleia, tontura)",
      "Inibição COX-1 muito intensa → maior risco GI da classe",
      "Uso IV: fechamento do canal arterial em neonatos prematuros",
      "Potência similar ao ibuprofeno mas perfil adverso muito pior — nicho específico"
    ],
    highlight: "1ª LINHA NA GOTA"
  },
  {
    name: "Piroxicam",
    dose: "20mg VO",
    nnt: 2.7,
    class: "non-selective",
    route: "VO",
    nuances: [
      "Meia-vida extremamente longa (~50h) → 1 dose/dia, ótima adesão",
      "Risco GI elevado — FDA black box warning para úlcera hemorrágica",
      "Potência modesta para onset prolongado (Tmax 3-5h)",
      "Uso limitado na Europa (EMA restringiu em 2007 para AR/OA refratária)",
      "Gel tópico (Feldene gel) tem uso estabelecido para dor localizada"
    ]
  },
  {
    name: "Nimesulida",
    dose: "100mg VO",
    nnt: 2.9,
    class: "partial-selective",
    route: "VO",
    nuances: [
      "Seletividade COX-2 preferencial (~10x) — entre não seletivos e coxibs",
      "Hepatotoxicidade idiossincrática real → retirada em vários países europeus",
      "Mantida no Brasil, Índia, Itália — posição regulatória controversa",
      "Bom perfil analgésico com menor risco GI que ibuprofeno em uso agudo",
      "Preferida empiricamente para dismenorreia no Brasil — eficácia similar ao ibuprofeno"
    ]
  },
  {
    name: "Meloxicam",
    dose: "15mg VO",
    nnt: 3.4,
    class: "partial-selective",
    route: "VO/IM",
    nuances: [
      "Seletividade COX-2 preferencial (~10x em doses terapêuticas)",
      "NNT menor que celecoxib — posição intermediária confirmada clinicamente",
      "Meia-vida longa (15-20h) → dose única diária com boa adesão",
      "Aprovado para OA, AR, espondilite — não para dor aguda intensa",
      "Formulação IM com onset mais rápido que VO — útil em ambiente hospitalar"
    ]
  },
  {
    name: "Celecoxib",
    dose: "400mg VO",
    nnt: 3.5,
    class: "coxib",
    route: "VO",
    nuances: [
      "NNT 3.5 apenas com dose de ataque de 400mg — 200mg: NNT ~4.2",
      "PRECISION trial: não inferior CV ao naproxeno e ibuprofeno (24.000 pacientes)",
      "Perda de componente COX-1 central explica inferioridade analgésica vs. ibuprofeno",
      "Melhor escolha em alto risco GI + risco CV baixo-moderado + uso crônico",
      "Única indicação oncoprotetora aprovada: polipose adenomatosa familiar"
    ],
    highlight: "ÚNICO COXIB NO MERCADO AMPLO"
  },
  {
    name: "Mefenâmico",
    dose: "500mg VO",
    nnt: 3.5,
    class: "non-selective",
    route: "VO",
    nuances: [
      "Fenamato — mecanismo adicional de antagonismo direto de receptores de PG",
      "Indicação clássica: dismenorreia primária (duplo mecanismo)",
      "Potência analgésica modesta vs. perfil adverso GI relevante",
      "Uso limitado a ciclos curtos (< 7 dias) pelas diretrizes",
      "Raro entre NSAIDs: evidência de efeito em dor mediada por PG pré-formada"
    ]
  },
  {
    name: "Etodolac",
    dose: "200-400mg VO",
    nnt: 3.6,
    class: "partial-selective",
    route: "VO",
    nuances: [
      "Seletividade COX-2 preferencial (~10x) — classe dos 'velhos coxibs'",
      "Menor risco GI que ibuprofeno em uso crônico",
      "Potência analgésica inferior — limitado a dor leve-moderada",
      "Perfil CV intermediário — menos estudado que celecoxib",
      "Uso marginal hoje — sem vantagem clara vs. meloxicam ou celecoxib"
    ]
  },
  {
    name: "Nabumetona",
    dose: "1000mg VO",
    nnt: 4.1,
    class: "partial-selective",
    route: "VO",
    nuances: [
      "Pró-fármaco não ácido → menor irritação gástrica direta",
      "Conversão hepática a 6-MNA (metabólito ativo COX-2 preferencial)",
      "Potência analgésica modesta — limitado a dor crônica leve",
      "Meia-vida longa do metabólito (24h) → dose única diária",
      "Posicionamento incerto — pouca evidência em dor aguda comparativa"
    ]
  },
  {
    name: "Sulindac",
    dose: "150-200mg VO",
    nnt: 4.5,
    class: "non-selective",
    route: "VO",
    nuances: [
      "Pró-fármaco → menor nefrotoxicidade direta (metabólito sulfona inativo renalmente)",
      "Potência analgésica baixa — uso predominante em contexto reumatológico crônico",
      "Evidência sugestiva de efeito antiproliferativo colônico (similar ao celecoxib)",
      "Interação relevante com DMSO (dimetilsulfóxido) — raro na prática",
      "Uso em doença de Bartter (inibição de prostaglandinas renais) — nicho específico"
    ]
  },
];

const classConfig = {
  "non-selective": { label: "Não Seletivo", color: "#3B82F6", bg: "#1E3A5F" },
  "partial-selective": { label: "COX-2 Preferencial", color: "#F59E0B", bg: "#3D2B00" },
  "coxib": { label: "Coxib (COX-2 Seletivo)", color: "#EF4444", bg: "#3D0A0A" },
};

function EfficacyBar({ nnt, classKey }) {
  const pct = ((1 / nnt) / (1 / 1.5)) * 100;
  const color = classConfig[classKey].color;
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 20, background: "#1a1a2e", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${Math.min(pct, 100)}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 4, boxShadow: `0 0 8px ${color}66`
        }} />
      </div>
      <div style={{ minWidth: 52, textAlign: "right", fontFamily: "monospace", fontSize: 11, color, fontWeight: 700 }}>
        NNT {nnt}
      </div>
    </div>
  );
}

export default function NSAIDChart() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? data : data.filter(d => d.class === filter);

  return (
    <div style={{ background: "#0a0a16", minHeight: "100vh", padding: "32px 24px", fontFamily: "Georgia, serif", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Botão voltar */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: "transparent", border: "1px solid #1e2a3a",
            color: "#64748b", padding: "6px 14px", borderRadius: 6,
            cursor: "pointer", fontFamily: "monospace", fontSize: 12,
            marginBottom: 24
          }}
        >
          ← MedPanel
        </button>

        {/* Header */}
        <div style={{ borderLeft: "4px solid #3B82F6", paddingLeft: 20, marginBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#64748b", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>
            Referência Farmacológica
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#f1f5f9" }}>
            AINEs — Potência Analgésica Comparada
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#94a3b8", fontFamily: "monospace" }}>
            Ordenado por NNT · Oxford Pain Database + Cochrane
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
          {[["all", "Todos", "#94a3b8"], ...Object.entries(classConfig).map(([k, v]) => [k, v.label, v.color])].map(([key, label, color]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              background: filter === key ? `${color}22` : "transparent",
              border: `1px solid ${filter === key ? color : "#2d3748"}`,
              color: filter === key ? color : "#64748b",
              borderRadius: 20, padding: "4px 14px", fontSize: 11, cursor: "pointer", fontFamily: "monospace"
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Eixo */}
        <div style={{ display: "flex", padding: "6px 0", borderBottom: "1px solid #1e2a3a", marginBottom: 4 }}>
          <div style={{ width: 200, fontSize: 10, color: "#475569", fontFamily: "monospace", textTransform: "uppercase" }}>Fármaco / Dose</div>
          <div style={{ flex: 1, fontSize: 10, color: "#475569", fontFamily: "monospace", textTransform: "uppercase", paddingLeft: 8 }}>← Menor NNT = Maior Potência</div>
        </div>

        {/* Linhas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filtered.map((drug, i) => {
            const cfg = classConfig[drug.class];
            const isSelected = selected === drug.name;
            return (
              <div key={drug.name}>
                <div
                  onClick={() => setSelected(isSelected ? null : drug.name)}
                  style={{
                    display: "flex", alignItems: "center", padding: "10px 12px",
                    borderRadius: 6, cursor: "pointer", gap: 12,
                    background: isSelected ? `${cfg.color}12` : "transparent",
                    border: `1px solid ${isSelected ? cfg.color + "44" : "transparent"}`
                  }}
                >
                  <div style={{ width: 24, fontSize: 11, color: "#374151", fontFamily: "monospace", textAlign: "right", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ width: 170, flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, boxShadow: `0 0 4px ${cfg.color}` }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{drug.name}</span>
                      <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace" }}>{drug.dose}</span>
                    </div>
                    {drug.highlight && (
                      <div style={{ fontSize: 9, color: cfg.color, fontFamily: "monospace", marginTop: 2, marginLeft: 12 }}>▸ {drug.highlight}</div>
                    )}
                  </div>
                  <EfficacyBar nnt={drug.nnt} classKey={drug.class} />
                  <div style={{ fontSize: 9, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}44`, borderRadius: 3, padding: "2px 6px", fontFamily: "monospace", minWidth: 42, textAlign: "center" }}>
                    {drug.route}
                  </div>
                  <div style={{ color: "#374151", fontSize: 12, transform: isSelected ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</div>
                </div>

                {isSelected && (
                  <div style={{ margin: "0 36px 8px", padding: "14px 16px", background: `${cfg.color}0a`, borderLeft: `2px solid ${cfg.color}66`, borderRadius: "0 6px 6px 0" }}>
                    <div style={{ fontSize: 10, color: cfg.color, fontFamily: "monospace", textTransform: "uppercase", marginBottom: 10, display: "flex", gap: 8 }}>
                      <span style={{ background: cfg.bg, border: `1px solid ${cfg.color}44`, padding: "2px 8px", borderRadius: 3 }}>{cfg.label}</span>
                      <span style={{ color: "#475569" }}>NNT {drug.nnt} · {drug.dose} · {drug.route}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {drug.nuances.map((n, idx) => (
                        <div key={idx} style={{ display: "flex", gap: 10 }}>
                          <span style={{ color: cfg.color, fontSize: 12, flexShrink: 0 }}>◆</span>
                          <span style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Notas */}
        <div style={{ marginTop: 32, padding: "16px 20px", background: "#0f1729", borderRadius: 8, border: "1px solid #1e2a3a" }}>
          <div style={{ fontSize: 10, color: "#475569", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 10 }}>Notas Metodológicas</div>
          {[
            "NNT derivado de Oxford Pain Research, Cochrane Acute Pain Group e meta-análises de dor pós-operatória/dental. Dados em dose única, dor moderada-intensa.",
            "Fármacos retirados do mercado (rofecoxib, valdecoxib, lumiracoxib) omitidos da comparação clínica principal.",
            "NNT varia por contexto: dor dental < pós-operatória < dismenorreia < musculoesquelética crônica. Valores representam médias de referência.",
            "Potência analgésica ≠ seletividade COX-2/COX-1. São eixos independentes."
          ].map((note, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
              <span style={{ color: "#334155", fontSize: 11, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ fontSize: 11, color: "#475569", lineHeight: 1.6 }}>{note}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}