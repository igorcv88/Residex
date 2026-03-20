import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const sections = [
  {
    id: "conceitos",
    name: "Conceitos",
    color: "#EC4899",
    content: {
      title: "Conceitos Fundamentais",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Definição de Choque",
          text: "Choque = DO₂ < VO₂ → entrega de oxigênio menor que a necessidade tecidual → hipoperfusão celular. NÃO é sinônimo de hipotensão. 45% dos choques em trauma têm origem abdominal."
        },
        {
          type: "grid",
          title: "Conceitos Essenciais",
          items: [
            { label: "Choque", value: "DO₂ < VO₂ — Entrega menor que a Necessidade. Resultado: hipoperfusão tecidual, disfunção celular, falência de órgãos.", highlight: true },
            { label: "Instabilidade Hemodinâmica", value: "PAS < 90 mmHg — fase avançada do choque. Instabilidade é sinal tardio: quando aparece, o choque já dura tempo suficiente para causar dano tecidual.", highlight: true },
            { label: "Tríade Letal", value: "ACIDOSE + HIPOTERMIA + COAGULOPATIA. Cada elemento agrava os outros — ciclo vicioso que culmina em coagulopatia de consumo e morte.", highlight: false },
            { label: "45% Abdominal", value: "Quase metade dos choques hemorrágicos no trauma têm fonte abdominal. FAST é obrigatório em todo choque de origem indeterminada.", highlight: false }
          ]
        },
        {
          type: "grid",
          title: "Exame Físico do Choque",
          items: [
            { label: "Pele Fria / Pegajosa", value: "Vasoconstricção periférica compensatória. Redistribuição de fluxo para órgãos nobres. Sinal precoce e sensível.", highlight: false },
            { label: "TEC > 3 segundos", value: "Tempo de enchimento capilar prolongado. Reflete baixo débito periférico. Avaliado no leito ungueal após compressão de 5s.", highlight: false },
            { label: "Rebaixamento", value: "Hipoperfusão cerebral. Agitação psicomotora pode preceder o rebaixamento — não atribuir à intoxicação sem excluir choque.", highlight: true },
            { label: "Oligúria", value: "Diurese < 0,5 ml/kg/h em adultos. Rim como espelho da perfusão sistêmica. Monitor de resposta à ressuscitação.", highlight: false }
          ]
        },
        {
          type: "obs",
          title: "Pérola — Choque sem Hipotensão",
          text: "Choque pode existir com PA normal. Jovens e atletas compensam por horas com taquicardia e vasoconstricção antes de hipotensão franca. O Shock Index (FC/PAS) é mais precoce que a PA isolada. Taquicardia + pele fria + TEC > 3s em paciente com PAS 100 = choque em compensação. Tratar sem esperar hipotensão."
        }
      ]
    }
  },
  {
    id: "classes",
    name: "Classes do Choque",
    color: "#F97316",
    content: {
      title: "Classes do Choque Hemorrágico (ATLS)",
      blocks: [
        {
          type: "alert",
          color: "#F97316",
          title: "Base Excess como marcador de gravidade",
          text: "O Base Excess (BE) no gasométrico arterial é o melhor marcador laboratorial pontual de profundidade do choque. Reflete o débito de oxigênio acumulado. Guia a decisão de transfusão mais objetivamente que a PA isolada."
        },
        {
          type: "grades",
          title: "Classificação em 4 Classes",
          organ: "choque",
          grades: [
            {
              grade: "1",
              color: "#10B981",
              items: ["SSVV NORMAIS", "BE 0 a -2", "Perda < 15% volemia", "Conduta: CRISTALOIDE"]
            },
            {
              grade: "2",
              color: "#EAB308",
              items: ["PA NORMAL", "Diurese diminuída", "BE -2 a -6", "Taquicardia leve", "Conduta: CRISTALOIDE (avaliar transfusão)"]
            },
            {
              grade: "3",
              color: "#F97316",
              items: ["HIPOTENSÃO", "TAQUICARDIA", "BE -6 a -10", "Perda 30-40% volemia", "Conduta: TRANSFUSÃO"]
            },
            {
              grade: "4",
              color: "#EF4444",
              items: ["HIPOTENSÃO GRAVE", "TAQUICARDIA IMPORTANTE (FC > 120)", "BE < -10", "Perda > 40% volemia", "Conduta: TRANSFUSÃO MACIÇA (PTM)"]
            }
          ]
        },
        {
          type: "grid",
          title: "Shock Index (FC/PAS) — Triagem Rápida",
          items: [
            { label: "Normal (0,5 – 0,7)", value: "Choque improvável. Sem indicação de transfusão urgente.", highlight: false },
            { label: "Baixo Risco (0,7 – 0,9)", value: "Zona cinza — monitorar de perto, repetir avaliação. Considerar gasométrico.", highlight: false },
            { label: "Alto Risco (0,9 – 1,1)", value: "GATILHO PARA TRANSFUSÃO MACIÇA. Ativação do protocolo de transfusão maciça (PTM) deve ser considerada.", highlight: true },
            { label: "⚠ FC > PAS", value: "Ponto de atenção absoluto — FC superando PAS em valor absoluto indica choque grave descompensado. Transfusão imediata.", highlight: true }
          ]
        },
        {
          type: "grid",
          title: "ABC Score — Gatilho para PTM",
          items: [
            { label: "PAS < 90", value: "1 ponto", highlight: false },
            { label: "FC > 120", value: "1 ponto", highlight: false },
            { label: "FAST positivo", value: "1 ponto", highlight: false },
            { label: "Trauma penetrante no tórax", value: "1 ponto", highlight: false },
            { label: "Pontuação ≥ 2", value: "SANGRAMENTO MACIÇO — Ativar Protocolo de Transfusão Maciça imediatamente.", highlight: true }
          ]
        },
        {
          type: "obs",
          title: "Limitações da Classificação ATLS",
          text: "A classificação em 4 classes foi originalmente baseada em voluntários jovens saudáveis — subestima a gravidade em idosos (que não taquicardizam adequadamente por betabloqueadores ou disfunção autonômica), em atletas (volume maior, compensam mais), e em pacientes com anticoagulação (coagulopatia mascara resposta compensatória). O BE e o lactato são mais confiáveis que a PA e FC isoladas na avaliação da profundidade do choque."
        }
      ]
    }
  },
  {
    id: "atendimento",
    name: "Atendimento Inicial",
    color: "#0EA5E9",
    content: {
      title: "Atendimento Inicial ao Choque",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Sequência de Condutas",
          text: "2 AVPs calibrosos → Acesso intraósseo (Plano B) → AVC/Subclávia (Plano C). Volume inicial RL 250-500ml → Avaliar resposta → Decisão de transfusão. Avaliar Transamin. Labs: gasométrico arterial + Hb + Ht + TS + COAG + fibrinogênio."
        },
        {
          type: "flow",
          title: "Avaliação da Resposta ao Volume",
          steps: [
            { text: "Infundir RL 250-500ml IV rápido", color: "#0EA5E9" },
            { text: "RESPOSTA RÁPIDA → SSVV normalizados → Sangramento mínimo (<5%) → Baixa necessidade de transfusão (tipo específico com prova cruzada)", color: "#10B981" },
            { text: "RESPOSTA TRANSITÓRIA → SSVV voltam a piorar → Sangramento moderado (5-40%) → Necessita transfusão (tipo específico)", color: "#F59E0B" },
            { text: "RESPOSTA AUSENTE → SSVV persistem alterados → Sangramento severo (>40%) → TRANSFUSÃO IMEDIATA (liberado universal — O negativo)", color: "#EF4444" }
          ]
        },
        {
          type: "grid",
          title: "Acessos Vasculares — Hierarquia",
          items: [
            { label: "Plano A — 2 AVPs Calibrosos", value: "14-16G em veias antecubitais. Fluxo é função do calibre e comprimento do cateter (Poiseuille) — AVP curto e grosso > CVC longo e fino.", highlight: true },
            { label: "Plano B — Intraósseo", value: "Tíbia proximal, úmero proximal ou esterno. Fluxo comparável ao acesso venoso periférico. Todos os fármacos e hemocomponentes podem ser infundidos.", highlight: false },
            { label: "Plano C — AVC / Subclávia", value: "Jugular interna ou subclávia. Maior risco de complicações (pneumotórax, hemotórax). Última opção no trauma agudo.", highlight: false },
            { label: "Labs Essenciais", value: "Gasométrico arterial (BE, lactato, pH) + Hb/Ht + TS + TP/TTPA + Fibrinogênio. Fibrinogênio < 150 = coagulopatia grave = Crioprecipitado.", highlight: false }
          ]
        },
        {
          type: "obs",
          title: "Cristaloide no Choque — Paradigma Atual",
          text: "O ATLS 10ª edição reduziu a recomendação de cristaloide de 2L para 1L (ou menos) antes de transfusão. Grandes volumes de RL causam acidose hiperclorêmica, dilúem fatores de coagulação e pioram a tríade letal. Evidência atual: ressuscitação hemostática (hemocomponentes) é superior ao cristaloide no choque hemorrágico grave. Cristaloide serve para ganhar tempo até o sangue chegar, não como tratamento definitivo."
        }
      ]
    }
  },
  {
    id: "hipotensao",
    name: "Hipotensão Permissiva",
    color: "#8B5CF6",
    content: {
      title: "Hipotensão Permissiva",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Conceito Central",
          text: "Hipotensão permissiva = manutenção deliberada de PA abaixo do normal até o controle cirúrgico do sangramento. É terapia-ponte — NÃO é meta definitiva. Termina no momento do controle cirúrgico."
        },
        {
          type: "grid",
          title: "Parâmetros Alvo",
          items: [
            { label: "PAM alvo", value: "PAM ≥ 60 mmHg — suficiente para perfundir órgãos nobres sem recrudescer sangramento.", highlight: true },
            { label: "PAS alvo", value: "PAS ≥ 80 mmHg — parâmetro clínico mais fácil de monitorar à beira leito.", highlight: true },
            { label: "Exceção: TCE associado", value: "Com TCE, manter PAM ≥ 80 mmHg. Hipotensão no TCE → lesão secundária → piora neurológica. Prioridade muda.", highlight: false },
            { label: "NUNCA medicações hipotensivas", value: "Proibido usar anti-hipertensivos no contexto de hipotensão permissiva. Parece óbvio — mas é pegadinha clássica de prova.", highlight: false }
          ]
        },
        {
          type: "grid",
          title: "Indicações",
          items: [
            { label: "Paciente Instável", value: "Principal indicação. Hemodinâmica não responsiva ou transitoriamente responsiva ao volume.", highlight: true },
            { label: "Sangramento Não Controlado", value: "Sítios não compressíveis (abdome, tórax, retroperitônio). Enquanto o controle cirúrgico não é feito.", highlight: true },
            { label: "Somente até o controle cirúrgico", value: "Após hemostasia: retornar para alvos normais de PA imediatamente. Hipotensão permissiva prolongada causa dano isquêmico.", highlight: false }
          ]
        },
        {
          type: "obs",
          title: "Base Científica — Bickell 1994 e CRASH-2",
          text: "Bickell et al. (NEJM 1994): ressuscitação volêmica agressiva pré-hospitalar em trauma penetrante aumentou mortalidade vs. ressuscitação diferida. Mecanismo: volume aumenta PA → recrudesce sangramento → dilui fatores → piora coagulopatia → mais sangramento. Hipotensão permissiva interrompe esse ciclo. CRACK-2 (Lancet 2010): ácido tranexâmico 1g IV em 10min + 1g em 8h em até 3h do trauma reduz mortalidade por sangramento (RR 0,85) — funciona junto com hipotensão permissiva como parte da ressuscitação hemostática."
        }
      ]
    }
  },
  {
    id: "transamin",
    name: "Transamin",
    color: "#10B981",
    content: {
      title: "Ácido Tranexâmico (Transamin)",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Mecanismo",
          text: "Antifibrinolítico — inibe a ligação do plasminogênio à fibrina, impedindo a lise do coágulo formado. Não é hemostático direto. Age preservando o coágulo já formado, não induzindo sua formação."
        },
        {
          type: "grid",
          title: "Indicações (CRASH-2)",
          items: [
            { label: "< 3 horas do trauma", value: "Janela terapêutica obrigatória. Após 3h: sem benefício e possível aumento de mortalidade por trombose.", highlight: true },
            { label: "Idealmente na 1ª hora", value: "NNT menor quanto mais precoce a administração. Na 1ª hora: maior benefício de sobrevida.", highlight: true },
            { label: "FC > 110", value: "Taquicardia como sinal de choque hemorrágico em curso.", highlight: false },
            { label: "PAS < 90", value: "Hipotensão como critério adicional de gravidade.", highlight: false },
            { label: "Sangramento não controlado", value: "Qualquer sangramento ativo de sítio não compressível.", highlight: false }
          ]
        },
        {
          type: "flow",
          title: "Protocolo de Administração",
          steps: [
            { text: "1g IV em 10 minutos (dose de ataque)", color: "#10B981" },
            { text: "+ 1g IV nas próximas 8 horas (dose de manutenção)", color: "#10B981" },
            { text: "REDUÇÃO DE MORTALIDADE GERAL (CRASH-2: RR 0,91)", color: "#10B981" },
            { text: "NUNCA iniciar após 3h do trauma — risco de dano", color: "#EF4444" }
          ]
        },
        {
          type: "obs",
          title: "CRASH-2 — Dados do Trial",
          text: "20.211 pacientes em 40 países. Mortalidade por sangramento: 4,9% (tranexâmico) vs. 5,7% (placebo) — RR 0,85. Mortalidade geral: RR 0,91. Sem aumento de eventos tromboembólicos no grupo tratado. Subgrupo < 1h do trauma: RR 0,68 para mortalidade por sangramento (benefício máximo). Subgrupo 1-3h: RR 0,79. Subgrupo > 3h: RR 1,44 (DANO). A curva de benefício é decrescente com o tempo — cada hora conta."
        }
      ]
    }
  },
  {
    id: "hemocomp",
    name: "Hemocomponentes",
    color: "#F59E0B",
    content: {
      title: "Hemocomponentes e Transfusão",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Quando Indicar Transfusão?",
          text: "Resposta transitória ou ausente ao volume. Classe 3 ou 4 do choque hemorrágico. Shock Index > 0,9-1,1. ABC Score ≥ 2. Sangramento ativo sem controle. NÃO esperar Hb < 7 no trauma agudo hemorrágico — esse critério é para paciente estável."
        },
        {
          type: "grid",
          title: "Componentes Prescritos — Protocolo de Transfusão Maciça",
          items: [
            { label: "Proporção 1:1:1", value: "Hemácias : PFC (plasma fresco) : Plaquetas em proporção 1:1:1. Mimetiza sangue total. Evidência: PROPPR trial (JAMA 2015) — redução de mortalidade em 24h.", highlight: true },
            { label: "Gluconato de Cálcio 10%", value: "2 ampolas a cada 2 bolsas de hemocomponentes. Citrato do plasma quelata cálcio → hipocalcemia → disfunção miocárdica. Reposição obrigatória no PTM.", highlight: true },
            { label: "Crioprecipitado", value: "Rico em fibrinogênio, Fator VIII, vWF, Fator XIII. Indicado quando fibrinogênio < 150mg/dL. Dose: 1 pool (5 unidades) por vez.", highlight: false },
            { label: "Concentrado de Plaquetas", value: "Meta: plaquetas > 50.000 no trauma ativo (> 100.000 se TCE associado). Disfunção plaquetária é componente central da coagulopatia do trauma.", highlight: false }
          ]
        },
        {
          type: "grid",
          title: "Protocolo de Transfusão Maciça (PTM) — Gatilhos",
          items: [
            { label: "Classe 4 do Choque", value: "BE < -10, FC > 120, hipotensão grave, perda > 40% da volemia estimada.", highlight: true },
            { label: "Sem Resposta ao Volume", value: "SSVV persistem alterados após cristaloide inicial — transfusão maciça independente da classe.", highlight: true },
            { label: "Shock Index > 1", value: "FC/PAS > 1 = gatilho para PTM em paciente com sangramento ativo.", highlight: false },
            { label: "ABC Score ≥ 2", value: "PAS<90 + FC>120 + FAST+ + trauma penetrante tórax: ≥2 pontos = PTM.", highlight: false },
            { label: "10 CH em 24h", value: "Definição convencional de transfusão maciça: 10 concentrados de hemácias em 24h.", highlight: false },
            { label: "4 CH em 1 hora", value: "Definição alternativa mais precoce — mais relevante na prática aguda do trauma.", highlight: false }
          ]
        },
        {
          type: "obs",
          title: "PROPPR Trial e Plasma como Tratamento Primário",
          text: "PROPPR trial (JAMA 2015, 680 pacientes): proporção 1:1:1 vs. 1:1:2 (mais hemácias) — grupo 1:1:1 teve maior hemostasia em 24h e tendência a menor mortalidade em 24h. Plasma não é só volume — é reposição ativa de fatores de coagulação. Cada unidade de PFC contém ~200-250mL com concentração fisiológica de todos os fatores. O paradigma atual é 'ressuscitação hemostática': tratar a coagulopatia ativamente desde o início, não esperar ela se instalar para depois corrigir."
        }
      ]
    }
  },
  {
    id: "sangramento",
    name: "Parar o Sangramento",
    color: "#EF4444",
    content: {
      title: "Controle do Sangramento",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Princípio: Fonte Determina Conduta",
          text: "A localização do sangramento determina a intervenção. Tórax → Dreno de tórax. Abdome instável → Laparotomia. Abdome estável → Laparoscopia. Sangramento arterial identificado → Arteriografia + Embolização."
        },
        {
          type: "decision",
          title: "Algoritmo por Localização",
          decisions: [
            {
              condition: "Tórax",
              color: "#0EA5E9",
              actions: [
                "Dreno de tórax (5º EIC, linha axilar média)",
                "Se > 1500ml imediato ou > 200ml/h por 4h → toracotomia",
                "Hemotórax retido: VATS em 72h se drenagem incompleta"
              ]
            },
            {
              condition: "Abdome — Paciente Instável",
              color: "#EF4444",
              actions: [
                "LAPAROTOMIA EXPLORADORA IMEDIATA",
                "Sem TC, sem arteriografia, sem perda de tempo",
                "Damage control se tríade letal presente"
              ]
            },
            {
              condition: "Abdome — Paciente Estável",
              color: "#F59E0B",
              actions: [
                "LAPAROSCOPIA diagnóstica e/ou terapêutica",
                "TC com contraste para graduar lesão antes",
                "Padrão ouro no trauma penetrante estável"
              ]
            },
            {
              condition: "Paciente Estável + Sangramento Arterial",
              color: "#10B981",
              actions: [
                "ARTERIOGRAFIA + EMBOLIZAÇÃO",
                "Após TC demonstrar blush arterial",
                "TNO em órgãos sólidos (fígado, baço, rim)",
                "Taxa de sucesso > 85%"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Sítios Não Compressíveis — Abordagem",
          items: [
            { label: "Abdome / Retroperitônio", value: "Laparotomia (instável) ou arteriografia (estável com blush). Packing retroperitoneal em pelve instável.", highlight: true },
            { label: "Tórax", value: "Dreno primeiro. Toracotomia se critérios de drenagem maciça. Toracotomia de reanimação em PCR traumática.", highlight: false },
            { label: "Pelve", value: "Fixação externa pélvica + preenchimento pré-peritoneal (PPP) ou arteriografia + embolização de ilíacas internas. Cinta pélvica como ponte.", highlight: true },
            { label: "Junção Cérvico-Torácica", value: "Zona I do pescoço: angiografia. Zona II: exploração cirúrgica direta. Zona III: angiografia.", highlight: false }
          ]
        },
        {
          type: "obs",
          title: "Toracotomia de Reanimação — Quando e Para Quem",
          text: "Toracotomia de reanimação (TR) na sala de emergência: indicada em PCR traumática com sinais de vida nos últimos 15 min (trauma penetrante) ou 10 min (trauma contuso). Objetivo: liberar tamponamento pericárdico, controlar hemorragia cardíaca, clampeamento de aorta descendente (redistribuição de fluxo para coronárias e cérebro). Sobrevida geral: 7,8% no penetrante vs. 1,6% no contuso. TR em contuso com PCR prolongada sem sinais de vida: sobrevida < 1% — não indicada."
        }
      ]
    }
  }
];

export default function Choque() {
  const [active, setActive] = useState("conceitos");
  const navigate = useNavigate();
  const sec = sections.find(s => s.id === active);
  const color = sec.color;

  const renderBlock = (block, idx) => {
    if (block.type === "alert") return (
      <div key={idx} style={{
        background: `${block.color}12`,
        border: `1px solid ${block.color}44`,
        borderLeft: `3px solid ${block.color}`,
        borderRadius: "0 8px 8px 0",
        padding: "14px 18px",
        marginBottom: 20
      }}>
        <div style={{ fontSize: 10, color: block.color, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{block.title}</div>
        <div style={{ fontSize: 13, color: "#c7d2e8", lineHeight: 1.7 }}>{block.text}</div>
      </div>
    );

    if (block.type === "obs") return (
      <div key={idx} style={{
        background: "#06080f",
        border: "1px solid #1e2a3a",
        borderRadius: 8,
        padding: "14px 18px",
        marginBottom: 20
      }}>
        <div style={{ fontSize: 10, color: "#374151", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>◆ {block.title}</div>
        <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.8, fontStyle: "italic" }}>{block.text}</div>
      </div>
    );

    if (block.type === "grid") return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
          {block.title}
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {block.items.map((item, i) => (
            <div key={i} style={{
              background: item.highlight ? `${color}0d` : "#0a0d17",
              border: `1px solid ${item.highlight ? color + "33" : "#111827"}`,
              borderRadius: 6,
              padding: "12px 14px"
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: item.highlight ? color : "#8892a4", fontFamily: "monospace", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "#8892a4", lineHeight: 1.65 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );

    if (block.type === "flow") return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
          {block.title}
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {block.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              {i > 0 && <div style={{ width: 1, height: 14, background: "#1f2937", marginLeft: 11, marginBottom: 2 }} />}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: step.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 6px ${step.color}88` }} />
                <div style={{ fontSize: 13, color: "#b0bad0", lineHeight: 1.5 }}>{step.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (block.type === "grades") return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
          {block.title}
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {block.grades.map((g, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "10px 14px",
              background: `${g.color}0a`,
              border: `1px solid ${g.color}22`,
              borderLeft: `3px solid ${g.color}`,
              borderRadius: "0 6px 6px 0"
            }}>
              <div style={{ minWidth: 64, fontSize: 12, fontWeight: 900, color: g.color, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                CLASSE {g.grade}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map((item, j) => (
                  <span key={j} style={{
                    fontSize: 12, color: "#9ca3af",
                    background: "#0a0d17", border: "1px solid #1f2937",
                    padding: "2px 10px", borderRadius: 4
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (block.type === "decision") return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
          {block.title}
          <div style={{ flex: 1, height: 1, background: `${color}22` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {block.decisions.map((d, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, padding: "12px 16px",
              background: `${d.color}08`, border: `1px solid ${d.color}33`,
              borderLeft: `3px solid ${d.color}`, borderRadius: "0 8px 8px 0"
            }}>
              <div style={{ minWidth: 200, fontSize: 12, fontWeight: 700, color: d.color, fontFamily: "monospace" }}>{d.condition}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {d.actions.map((a, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#8892a4", display: "flex", gap: 8 }}>
                    <span style={{ color: d.color, fontSize: 8, marginTop: 5 }}>▸</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return null;
  };

  return (
    <div style={{
      background: "#06080f",
      minHeight: "100vh",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      color: "#dde3f0",
      display: "flex",
      flexDirection: "column"
    }}>
      <button
        onClick={() => navigate('/')}
        style={{
          background: "transparent",
          border: "1px solid #1e2a3a",
          color: "#64748b",
          padding: "6px 14px",
          borderRadius: 6,
          cursor: "pointer",
          fontFamily: "monospace",
          fontSize: 12,
          width: "fit-content",
          margin: "16px 0 0 28px",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        ← MedPanel
      </button>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #111827", padding: "16px 28px 16px", background: "#080b14" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#374151", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 4 }}>
          Cirurgia do Trauma · Referência para Residência
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#f1f5f9", letterSpacing: "0.01em" }}>
          Choque Hemorrágico — Guia Completo
        </h1>
        <div style={{ fontSize: 11, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>
          Conceitos · Classes · Atendimento Inicial · Hipotensão Permissiva · Transamin · Hemocomponentes · Controle do Sangramento
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Nav */}
        <div style={{
          width: 170, borderRight: "1px solid #0f1623", background: "#080b14",
          padding: "12px 0", flexShrink: 0, overflowY: "auto"
        }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              width: "100%",
              background: active === s.id ? `${s.color}12` : "transparent",
              border: "none",
              borderLeft: `2px solid ${active === s.id ? s.color : "transparent"}`,
              color: active === s.id ? "#f1f5f9" : "#4b5563",
              padding: "10px 16px", cursor: "pointer", textAlign: "left",
              fontSize: 12, fontFamily: "monospace", letterSpacing: "0.02em", transition: "all 0.15s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: active === s.id ? s.color : "#1f2937", flexShrink: 0 }} />
                {s.name}
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${color}22`
          }}>
            <div style={{
              background: `${color}18`, border: `1px solid ${color}44`, color,
              padding: "4px 16px", borderRadius: 4, fontSize: 10,
              fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase"
            }}>
              {sec.name}
            </div>
            <div style={{ fontSize: 17, fontWeight: 400, color: "#e2e8f0" }}>{sec.content.title}</div>
          </div>

          {sec.content.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      </div>

      {/* Bottom dots */}
      <div style={{
        borderTop: "1px solid #0f1623", padding: "10px 28px",
        background: "#080b14", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 10, color: "#1f2937", fontFamily: "monospace" }}>
          {sections.findIndex(s => s.id === active) + 1}/{sections.length} · {sec.name}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map(s => (
            <div key={s.id} onClick={() => setActive(s.id)} style={{
              width: active === s.id ? 20 : 6, height: 6, borderRadius: 3,
              background: active === s.id ? s.color : "#1f2937",
              cursor: "pointer", transition: "all 0.2s"
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
