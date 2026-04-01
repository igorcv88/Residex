import MedPanelPage from "./medpanel-layout";

const sections = [
  { id: "introducao", name: "Introdução", color: "#EF4444" },
  { id: "fisiopatologia", name: "Fisiopatologia", color: "#F97316" },
  { id: "avaliacao", name: "Avaliação", color: "#F59E0B" },
  { id: "sindrome", name: "Sd. Metabólica", color: "#10B981" },
  { id: "mev", name: "MEV", color: "#6366F1" },
  { id: "farmaco", name: "Farmacologia", color: "#0EA5E9" },
  { id: "comparativo", name: "Comparativo", color: "#EC4899" },
];

const content = {
  introducao: {
    title: "Introdução — Conceito, Epidemiologia e Impacto",
    blocks: [
      {
        type: "alert",
        color: "#EF4444",
        title: "Obesidade — Definição Atual (Lancet 2025)",
        text: "Doença crônica recidivante caracterizada pelo acúmulo anormal de gordura com risco para a saúde. Desequilíbrio energético positivo com maior ganho que gasto — influenciado por fatores genéticos e ambientais. O Lancet 2025 diferencia obesidade pré-clínica (sem disfunção orgânica substancial) de obesidade clínica (com disfunção de órgãos, que pode ser metabólica OU não metabólica). Pré-clínica ≠ pré-doença.",
      },
      {
        type: "grid",
        title: "Epidemiologia e Fatores de Risco",
        items: [
          {
            label: "Prevalência Brasil",
            value:
              "Aumento de 72% nos últimos 15 anos. Classes sociais mais baixas desproporcionalmente afetadas.",
            highlight: true,
          },
          {
            label: "Sedentarismo",
            value:
              "Principal fator ambiental modificável. Urbanização e tecnologia reduzem gasto energético basal.",
            highlight: false,
          },
          {
            label: "Consumo de ultraprocessados",
            value:
              "Ambiente obesogênico: alimentos baratos, palatáveis, calóricos e de fácil acesso.",
            highlight: true,
          },
          {
            label: "Histórico familiar (HF)",
            value:
              "Herança poligênica em 40–70%. Risco aumenta 2–3× com parente de 1º grau com obesidade.",
            highlight: false,
          },
          {
            label: "Sexo feminino",
            value:
              "Maior prevalência de obesidade grau III. Efeitos hormonais (estrogênio → adipogênese).",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Impacto Clínico — Comorbidades Associadas",
        items: [
          {
            label: "DM2",
            value:
              "IMC > 35 associa risco >50× para DM2. Resistência insulínica como elo central.",
            highlight: true,
          },
          {
            label: "Dislipidemia (DLP)",
            value:
              "TG↑ + HDL↓ + LDL pequenas e densas = dislipidemia aterogênica.",
            highlight: false,
          },
          {
            label: "Mortalidade cardiovascular",
            value:
              "HAS, DAC, ICC, AVC, fibrilação atrial. Risco aumenta progressivamente com o IMC.",
            highlight: true,
          },
          {
            label: "Câncer",
            value:
              "Mama, endométrio, próstata, TGI, renal, melanoma múltiplo, LMA. Mecanismo: hiperinsulinismo + inflamação crônica + hiperestrogenismo.",
            highlight: true,
          },
          {
            label: "Apneia obstrutiva do sono (SAOS)",
            value:
              "Obesidade = principal fator de risco para SAOS. Gordura cervical estreita as vias aéreas superiores.",
            highlight: false,
          },
          {
            label: "HAS/DCEM/DENC",
            value:
              "Hiperatividade simpática + SRAA + hiperleptinemia. Resistência à leptina perpetua HAS.",
            highlight: false,
          },
          {
            label: "Doenças psiquiátricas",
            value:
              "Depressão, ansiedade, compulsão alimentar — causa E consequência da obesidade.",
            highlight: false,
          },
          {
            label: "DHEM / Esteatose hepática",
            value:
              "Presente em ~80% dos obesos. Risco de progressão para MASH, cirrose e CHC.",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "NÃO é Fator de Risco para Obesidade",
        text: "Melanoma, Ca de pulmão, Ca de esôfago escamoso, Ca testicular — NÃO têm associação com obesidade. Osteoporose é fator PROTETOR (hiperestrogenismo e carga mecânica do peso aumentam densidade mineral óssea). Questão clássica de eliminação em prova.",
      },
    ],
  },

  fisiopatologia: {
    title: "Fisiopatologia — Genética, Hormonal e Ambiental",
    blocks: [
      {
        type: "alert",
        color: "#F97316",
        title: "Núcleo Arqueado do Hipotálamo — Central Reguladora",
        text: "O núcleo arqueado integra sinais periféricos (grelina, leptina, insulina, GLP-1, PYY) com vias centrais orexigênicas (NPY/AgRP) e anorexigênicas (POMC/CART). A obesidade é, em essência, uma falha nessa regulação — seja por resistência à leptina/insulina, hipersecreção de grelina ou ambiente obesogênico que supera a homeostase.",
      },
      {
        type: "phases",
        title: "Hormônios-Chave na Regulação do Apetite",
        phases: [
          {
            number: "↑",
            name: "GRELINA — orexigênica",
            color: "#EF4444",
            items: [
              "Produzida pelas células do FUNDO GÁSTRICO",
              "Único hormônio gastrointestinal ESTIMULADOR do apetite",
              "↑ antes das refeições (jejum prolongado)",
              "↓ após alimentação (suprimida pela distensão gástrica)",
              "Aumentada em obesos em jejum prolongado",
              "Age no NTSe no núcleo arqueado → ativa NPY/AgRP → fome",
              "Estimula dopamina mesolímbica → desejo por alimentos palatáveis",
            ],
          },
          {
            number: "↓",
            name: "LEPTINA — anorexigênica",
            color: "#10B981",
            items: [
              "Produzida pelos ADIPÓCITOS (proporcional à gordura corporal)",
              "Sinaliza ao hipotálamo: reserva energética suficiente",
              "Ativa POMC/CART (saciedade) + inibe NPY/AgRP (fome)",
              "Na obesidade: LEPTINA ELEVADA + RESISTÊNCIA CENTRAL ao hormônio",
              "Paradoxo leptinico: obesos têm muita leptina mas não respondem",
              "Também modula eixo gonadal e imunomodulação",
            ],
          },
          {
            number: "↓",
            name: "GLP-1 — anorexigênico",
            color: "#0EA5E9",
            items: [
              "Secretado pelas células L do intestino após refeição",
              "Retarda o esvaziamento gástrico → saciedade prolongada",
              "Ativa neurônios POMC/CART no hipotálamo",
              "Base dos medicamentos análogos de GLP-1 (liraglutida, semaglutida)",
              "Dual: saciedade + controle glicêmico (estimula insulina glicose-dependente)",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Genética — Poligênica vs Monogênica",
        items: [
          {
            label: "Poligênica (mais prevalente)",
            value:
              "Centenas de variantes comuns (GWAS). Gene FTO mais estudado. Predisposição amplificada pelo ambiente. Sem hiperfagia grave ou síndrome associada.",
            highlight: true,
          },
          {
            label: "Monogênica (rara, grave)",
            value:
              "Mutações em LEP, LEPR, MC4R (mais comum — 5–6% das obesidades graves infantis), POMC, PCSK1. Início PRECOCE + hiperfagia INTENSA + resistente ao tratamento convencional.",
            highlight: true,
          },
          {
            label: "Quando suspeitar de monogênica?",
            value:
              "Obesidade grave de início precoce (infância) + hiperfagia intensa + síndrome clínica associada + refratária ao manejo padrão → indicação de teste genético.",
            highlight: true,
          },
          {
            label: "Tratamento específico — Setmelanotida",
            value:
              "Agonista do receptor MC4R. Indicado em obesidade monogênica por deficiência de leptina/receptor ou mutações POMC/MC4R. TTO direcionado pelo diagnóstico genético.",
            highlight: false,
          },
          {
            label: "Gene MC4R",
            value:
              "Receptor de melanocortina 4 — via leptina-melanocortina hipotalâmica. Mutação = causa mais comum de obesidade monogênica.",
            highlight: false,
          },
          {
            label: "Síndromes genéticas clássicas",
            value:
              "Prader-Willi (hiperfagia + hipotonia + baixa estatura), Bardet-Biedl (retinite pigmentosa + polidactilia + DRC), Alström (cegueira + surdez + DM2).",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "Fisiopatologia da Obesidade Secundária — Excluir Sempre",
        text: "Uso de medicamentos: mirtazapina, insulina, sulfonilureias, betabloqueadores, antipsicóticos. Síndromes endócrinas: Síndrome de Cushing (cortisol↑ → adipogênese central), hipotireoidismo (redução do metabolismo basal), insulinoma (hipoglicemia recorrente → hiperfagia). Devem ser excluídas antes de classificar a obesidade como primária.",
      },
    ],
  },

  avaliacao: {
    title: "Avaliação Clínica — Diagnóstico e Medidas Antropométricas",
    blocks: [
      {
        type: "alert",
        color: "#F59E0B",
        title: "Diagnóstico Obrigatório: IMC + Medida Corporal",
        text: "OBRIGATÓRIO: IMC + pelo menos 1 medida corporal adicional (CA, RCQ, panturrilha, cervical). Exceção: IMC > 40 kg/m² fecha diagnóstico isoladamente. Novo consenso Lancet 2025: IMC > 25 + 1 medida alterada OU 2 medidas alteradas sem IMC = diagnóstico de obesidade.",
      },
      {
        type: "grades",
        title: "Classificação IMC — OMS",
        organ: "IMC",
        grades: [
          {
            grade: "SP",
            color: "#F59E0B",
            items: [
              "Sobrepeso",
              "IMC 25–29,9 kg/m²",
              "Farmacoterapia: IMC ≥ 27 + comorbidade",
            ],
          },
          {
            grade: "I",
            color: "#F97316",
            items: [
              "Obesidade Grau I",
              "IMC 30–34,9 kg/m²",
              "Farmacoterapia indicada (sem comorbidade)",
            ],
          },
          {
            grade: "II",
            color: "#EF4444",
            items: [
              "Obesidade Grau II",
              "IMC 35–39,9 kg/m²",
              "Cirurgia bariátrica: ≥ 35 + comorbidade",
            ],
          },
          {
            grade: "III",
            color: "#8B5CF6",
            items: [
              "Obesidade Grau III",
              "IMC ≥ 40 kg/m²",
              "Cirurgia bariátrica: ≥ 40 sem comorbidade",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Medidas Antropométricas — Valores de Referência",
        items: [
          {
            label: "Circunferência Abdominal (CA)",
            value:
              "Risco aumentado: H ≥ 94 cm / M ≥ 80 cm. Risco muito aumentado: H ≥ 102 cm / M ≥ 88 cm. Critério síndrome metabólica.",
            highlight: true,
          },
          {
            label: "Relação Cintura-Quadril (RCQ)",
            value:
              "H > 0,90 / M > 0,85 = risco cardiovascular aumentado. Melhor que CA isolada em alguns grupos.",
            highlight: false,
          },
          {
            label: "Circunferência Cervical",
            value:
              "H ≥ 39 cm / M ≥ 35 cm = risco cardiometabólico aumentado. Correlaciona com gordura visceral e SAOS.",
            highlight: false,
          },
          {
            label: "Circunferência da Panturrilha",
            value:
              "< 31 cm = massa muscular reduzida → risco de obesidade SARCOPÊNICA. Idosos e pacientes em uso de análogos GLP-1.",
            highlight: true,
          },
          {
            label: "Obesidade sarcopênica",
            value:
              "IMC aumentado + panturrilha < 31 cm + força reduzida. Atenção especial com análogos GLP-1 (reduzem massa magra também).",
            highlight: true,
          },
          {
            label: "BIA / DEXA",
            value:
              "Bioimpedância (BIA): rápida, acessível; influenciada pela hidratação. DEXA: padrão para composição corporal em pesquisa.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Avaliação Laboratorial Obrigatória",
        steps: [
          {
            text: "Glicemia em jejum + HbA1c — rastreio DM mesmo < 35 anos se sobrepeso/obesidade",
            color: "#F59E0B",
          },
          {
            text: "Perfil lipídico — TG, CT, LDL, HDL. Dislipidemia aterogênica (TG↑ + HDL↓) em 60–70%",
            color: "#EF4444",
          },
          {
            text: "TGO/TGP/GGT + FIB-4 — rastreio DHEM. FIB-4 > 1,3 + síndrome metabólica = elastografia",
            color: "#F97316",
          },
          {
            text: "TSH — excluir hipotireoidismo como causa de ganho de peso",
            color: "#10B981",
          },
          {
            text: "Cortisol urinário/salivar — se suspeita de Cushing (adiposidade central + HAS + estrias)",
            color: "#8B5CF6",
          },
          {
            text: "Creatinina + microalbuminúria — nefropatia hipertensiva/diabética precoce",
            color: "#6366F1",
          },
        ],
      },
      {
        type: "obs",
        title: "Diretriz Brasileira 2025 — Risco Cardiovascular na Obesidade",
        text: "Diretriz Brasileira 2025 (5 sociedades): obesidade como doença crônica com alto risco CV. Escore PREVENT para estimar risco de IAM/AVC/IC em 10 anos. Alto risco para IC: IMC > 40 mesmo assintomático, obesidade + DM + HAS, SAOS grave, FA, DRC grau ≥ 3b, PREVENT ≥ 20%. NT-proBNP/BNP elevados em obeso = sinal precoce de disfunção ventricular.",
      },
    ],
  },

  sindrome: {
    title: "Síndrome Metabólica — Critérios e Diagnóstico",
    blocks: [
      {
        type: "alert",
        color: "#10B981",
        title: "Síndrome Metabólica — Mínimo 3 de 5 Critérios",
        text: "Centro fisiopatológico: RESISTÊNCIA INSULÍNICA. Critérios ATP III / IDF (3 de 5): (1) CA ≥ 102H / ≥ 88M, (2) TG ≥ 150 ou em TTO, (3) HDL < 40H / < 50M ou em TTO, (4) PA ≥ 130/85 ou em TTO, (5) Glicemia ≥ 100 ou em TTO. Diagnóstico obrigatório: IMC + medida corporal.",
      },
      {
        type: "grid",
        title: "5 Critérios Diagnósticos — ATP III / NCEP",
        items: [
          {
            label: "1. Circunferência Abdominal",
            value:
              "H ≥ 102 cm / M ≥ 88 cm. Critério obrigatório pela IDF (central para diagnóstico).",
            highlight: true,
          },
          {
            label: "2. Glicemia em jejum",
            value:
              "≥ 100 mg/dL OU em tratamento para hiperglicemia (metformina, insulina, etc).",
            highlight: true,
          },
          {
            label: "3. Pressão Arterial",
            value: "≥ 130/85 mmHg OU em uso de anti-hipertensivo.",
            highlight: true,
          },
          {
            label: "4. HDL reduzido",
            value: "H < 40 mg/dL / M < 50 mg/dL OU em TTO para dislipidemia.",
            highlight: true,
          },
          {
            label: "5. Triglicerídeos elevados",
            value: "≥ 150 mg/dL OU em TTO específico.",
            highlight: true,
          },
        ],
      },
      {
        type: "grid",
        title: "Complicações da Síndrome Metabólica",
        items: [
          {
            label: "Doença aterosclerótica",
            value:
              "IAM, AVC. Risco CV aumentado 2–3× em relação à população geral.",
            highlight: true,
          },
          {
            label: "DM2",
            value:
              "Progressão de pré-diabetes para DM2 acelerada. Resistência insulínica crescente.",
            highlight: true,
          },
          {
            label: "Esteatose hepática (DHEM/MASH)",
            value:
              "FIB-4 obrigatório quando síndrome metabólica + transaminases alteradas.",
            highlight: false,
          },
          {
            label: "Doença renal crônica",
            value:
              "Nefropatia hipertensiva e/ou diabética. Hiperfiltração glomerular inicial.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Tratamento da Síndrome Metabólica",
        steps: [
          {
            text: "Mudança de estilo de vida: redução de 10–15% do peso corporal + abandono do tabagismo",
            color: "#10B981",
          },
          {
            text: "Atividade física ≥ 150 min/sem aeróbica + resistência (melhora sensibilidade à insulina)",
            color: "#10B981",
          },
          {
            text: "Dieta: redução de gordura saturada e trans + aumento de fibras, frutas e vegetais",
            color: "#F59E0B",
          },
          {
            text: "Farmacológico: GLP-1 (perda de peso) + Metformina (resistência insulínica) + IECA/BRA (PA) + estatina (risco CV) + fibrato (TG > 500)",
            color: "#0EA5E9",
          },
        ],
      },
      {
        type: "obs",
        title: "FIB-4 na Síndrome Metabólica — Número Mágico",
        text: "Qualquer critério de síndrome metabólica + esteatose hepática → calcular FIB-4. FIB-4 = (Idade × TGO) ÷ (Plaquetas × √TGP). FIB-4 > 1,3 = indicação de elastografia hepática para estadiamento de fibrose. Transição síndrome metabólica → DHEM → MASH → cirrose → CHC.",
      },
    ],
  },

  mev: {
    title: "Mudança de Estilo de Vida — Pilar do Tratamento",
    blocks: [
      {
        type: "alert",
        color: "#6366F1",
        title: "MEV — Todo Paciente com Sobrepeso ou Obesidade",
        text: "MEV é a base para TODOS os pacientes. Farmacoterapia e cirurgia são adjuvantes, nunca substitutos. Meta de perda de peso: ≥ 5% em 12 semanas (dose plena) para continuar o fármaco. Obesidade controlada: ≥ 10% (IMC 30–39,9) ou ≥ 15% (IMC ≥ 40). Tratamento a longo prazo — muitos pacientes precisarão de tratamento pelo resto da vida.",
      },
      {
        type: "grid",
        title: "Atividade Física — Recomendações",
        items: [
          {
            label: "Mínimo para saúde geral",
            value: "≥ 150 min/semana de aeróbico de intensidade moderada.",
            highlight: false,
          },
          {
            label: "Para perda de peso",
            value:
              "≥ 300 min/semana de aeróbico + exercício de resistência 2×/semana.",
            highlight: true,
          },
          {
            label: "Resistência (musculação)",
            value:
              "Preserva massa magra durante a perda de peso. Fundamental com análogos de GLP-1 (reduzem massa magra).",
            highlight: true,
          },
          {
            label: "Limitações",
            value:
              "Considerar restrições ortopédicas e cardiovasculares. Iniciar com baixa intensidade e progredir.",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Dieta — Evidências",
        items: [
          {
            label: "Déficit calórico",
            value:
              "500–1.000 kcal/dia abaixo do gasto energético total. Não indicado déficit restritivo extremo (< 800 kcal/dia) sem supervisão.",
            highlight: true,
          },
          {
            label: "Tipo de dieta",
            value:
              "Sem diferença significativa entre dietas para perda de peso. Mediterrânea e low carb têm benefício na mortalidade CV e controle glicêmico.",
            highlight: false,
          },
          {
            label: "Proteínas adequadas",
            value:
              "≥ 1,2–1,5 g/kg/dia durante perda de peso com análogos GLP-1 para minimizar perda de massa magra.",
            highlight: true,
          },
          {
            label: "Ultraprocessados",
            value:
              "Redução é mais importante que o tipo de dieta. Alto volume calórico, baixa saciedade, grande palatabilidade.",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Benefícios por Percentual de Perda de Peso",
        items: [
          {
            label: "2,5% de perda",
            value:
              "Redução de glicemia, triglicerídeos e melhora da fertilidade.",
            highlight: false,
          },
          {
            label: "5–10% de perda",
            value:
              "Aumento de HDL, controle de dor articular, melhora de depressão, qualidade de vida e função sexual.",
            highlight: true,
          },
          {
            label: "10–16% de perda",
            value:
              "Melhora de esteato-hepatite (MASH) e redução de eventos cardiovasculares.",
            highlight: true,
          },
          {
            label: "> 16% de perda",
            value: "Redução de mortalidade por todas as causas.",
            highlight: true,
          },
          {
            label: "Meta ideal de tratamento",
            value: "≥ 10% de perda com pelo menos 5% nos primeiros 3 meses.",
            highlight: true,
          },
        ],
      },
      {
        type: "obs",
        title: "Indicações de Farmacoterapia",
        text: "IMC ≥ 30 kg/m² (sem comorbidade) OU IMC ≥ 27 kg/m² + pelo menos 1 comorbidade (HAS, DM2, DLP, SAOS). Reavaliação obrigatória após 12 semanas em dose plena — mínimo 5% de perda para continuar. Farmacoterapia NUNCA deve ser prescrita isoladamente sem MEV associada.",
      },
    ],
  },

  farmaco: {
    title: "Farmacologia — Medicamentos Aprovados para Obesidade",
    blocks: [
      {
        type: "alert",
        color: "#0EA5E9",
        title: "Medicações Aprovadas para Obesidade no Brasil (2025)",
        text: "APROVADOS: Sibutramina · Orlistate · Liraglutida (Saxenda®) · Semaglutida (Wegovy®) · Bupropiona + Naltrexona · Tirzepatida (aprovada DM2, em expansão para obesidade). OFF-LABEL: Topiramato. INVESTIGACIONAL: Setmelanotida (monogênica). Meta de avaliação: ≥ 5% de perda em 12 semanas na dose plena.",
      },
      {
        type: "phases",
        title: "Sibutramina — ISRNS",
        phases: [
          {
            number: "Rx",
            name: "SIBUTRAMINA",
            color: "#6366F1",
            items: [
              "Mecanismo: Inibe recaptação de Serotonina + Noradrenalina (ISRNS) → aumenta saciedade",
              "Antidepressivo dual (NÃO é psicofármaco aprovado para depressão)",
              "Perda de peso: 5–8%",
              "Principal indicação: baixo custo, acessível, boa eficácia",
              "CONTRAINDICAÇÃO: alto risco CV (IAM, AVC, DAC, IC, arritmias)",
              "Estudo SCOUT: aumento de eventos CV em alto risco → retirada de vários países",
              "Efeitos adversos: ↑PA, ↑FC, insônia, boca seca, constipação",
              "Não usar com IMAO. Monitorar PA e FC mensal",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "Orlistate — Inibidor de Lipase",
        phases: [
          {
            number: "Rx",
            name: "ORLISTATE",
            color: "#10B981",
            items: [
              "Mecanismo: Inibidor de lipase pancreática e gástrica → bloqueia absorção de 30% das gorduras",
              "Ação LOCAL no TGI (não sistêmica)",
              "Dose: 120 mg 3×/dia com as refeições",
              "Perda de peso: 3–5%",
              "Redução de 5% do peso corporal consistente",
              "Principal indicação: baixo custo + sem ação central",
              "Pode ser usado associado a análogos GLP-1 para constipação",
              "Efeitos adversos: Esteatorreia, flatulência com perda fecal, urgência evacuatória — minimizados com dieta hipogordurosa",
              "CONTRAINDICAÇÕES: colestase, má absorção crônica, gravidez",
              "Atenção: reduz absorção de vitaminas lipossolúveis (A, D, E, K)",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "Análogos de GLP-1",
        phases: [
          {
            number: "SC",
            name: "LIRAGLUTIDA (Saxenda®)",
            color: "#0EA5E9",
            items: [
              "Agonista receptor GLP-1. SC diária",
              "Dose: 0,6 mg/dia → progressão semanal +0,6 mg → máx 3,0 mg/dia",
              "Dose DM2: máx 1,8 mg/dia",
              "Perda de peso: 5–8%",
              "Indicações: obesidade com/sem DM2, resistência insulínica, hiperfagia",
              "Efeitos adversos: principalmente TGI (náuseas, vômitos, constipação)",
              "CONTRAINDICAÇÕES: carcinoma medular da tireoide / MEN-2, pancreatite prévia, gravidez",
            ],
          },
          {
            number: "SC",
            name: "SEMAGLUTIDA (Wegovy®/Ozempic®)",
            color: "#6366F1",
            items: [
              "Agonista GLP-1 de longa duração. SC semanal",
              "Dose DM2: 0,25 mg/sem → progressão a cada 4s → máx 1 mg/sem",
              "Dose obesidade: até 2,4 mg/sem (Wegovy®)",
              "Perda de peso: 10–15% (Trial STEP-1)",
              "PROTEÇÃO cardiovascular documentada (Trial SELECT 2023)",
              "Limitada por CUSTO ELEVADO",
              "Contraindicações: idênticas à liraglutida",
              "Efeitos adversos: principalmente TGI (mais comuns no início da titulação)",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "Outros Aprovados",
        phases: [
          {
            number: "VO",
            name: "BUPROPIONA + NALTREXONA",
            color: "#EC4899",
            items: [
              "Mecanismo: ISND (noradrenalina + dopamina) + bloqueio opioide → ação dual no centro do apetite",
              "Bupropiona: estimula POMC → saciedade. Naltrexona: bloqueia feedback opioide que reduziria POMC",
              "Dose plena: Naltrexona 32 mg + Bupropiona 360 mg/dia (titulação gradual)",
              "Perda de peso: 5–9%",
              "Indicação principal: padrão alimentar EMOCIONAL / compulsão alimentar",
              "CONTRAINDICAÇÃO: epilepsia, convulsões, HAS descompensada, uso de opioides, alcoolismo ativo",
              "Efeitos adversos: constipação, náuseas, insônia",
            ],
          },
          {
            number: "VO",
            name: "TOPIRAMATO (off-label)",
            color: "#F59E0B",
            items: [
              "Mecanismo: canais de Na+ + ↑GABA + antagonismo glutamato → ↓apetite + ↓compulsão",
              "Dose: 25–100 mg/dia (até 300 mg). Início com dose baixa",
              "Perda de peso: 5–10% em 6 meses",
              "Indicação principal: compulsão alimentar + obesidade + insônia (bonus: enxaqueca)",
              "CONTRAINDICAÇÕES: nefrolitíase, glaucoma, gravidez (teratogênico), distúrbios cognitivos",
              "Efeitos adversos: parestesias, dificuldade de concentração, gosto metálico, alterações de humor",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "Novos Aprovados / Emergentes",
        phases: [
          {
            number: "SC",
            name: "TIRZEPATIDA (Mounjaro®/Zepbound®)",
            color: "#8B5CF6",
            items: [
              "Agonista DUAL GIP + GLP-1 (duplo agonista incretínico)",
              "SC semanal. Dose inicial 2,5 mg/sem → progressão a cada 4 sem em +2,5 mg",
              "Perda de peso: 15–22% (SURMOUNT-1 e SURMOUNT-4)",
              "Estudo 2025: Tirzepatida SUPERIOR à Semaglutida com menos efeitos colaterais",
              "Efeitos adversos: principalmente TGI",
              "Proteção cardiovascular: ainda em estudo (SURPASS-CVOT)",
              "Aprovada para DM2 no Brasil; para obesidade em expansão",
            ],
          },
          {
            number: "SC",
            name: "SETMELANOTIDA",
            color: "#84CC16",
            items: [
              "Agonista do receptor MC4R (melanocortina 4)",
              "Indicação RESTRITA: obesidade MONOGÊNICA (def. leptina, receptor leptina, POMC, MC4R)",
              "Tratamento direcionado por diagnóstico genético",
              "Aprovado para formas específicas rara",
            ],
          },
        ],
      },
    ],
  },

  comparativo: {
    title: "Comparativo e Contexto Clínico — Escolha do Fármaco",
    blocks: [
      {
        type: "alert",
        color: "#EC4899",
        title: "Regra Geral — Qual Medicação Escolher?",
        text: "Análogos GLP-1 (semaglutida/tirzepatida) = maior eficácia + proteção CV documentada. Sibutramina = contraindicada em alto risco CV. Orlistate = menor custo, sem ação central, EV gastrointestinais. BUP+NAL = padrão alimentar emocional/compulsão. Topiramato off-label = compulsão + insônia. Combinar MEVcom QUALQUER fármaco — nunca usar isolado.",
      },
      {
        type: "grid",
        title: "Comparativo Rápido — 6 Medicações",
        items: [
          {
            label: "Sibutramina",
            value:
              "Mec: ISRNS | Perda: 5–8% | CI: Alto risco CV | EA: ↑PA, ↑FC | Custo: baixo",
            highlight: false,
          },
          {
            label: "Orlistate",
            value:
              "Mec: Inibidor lipase | Perda: 3–5% | CI: colestase | EA: esteatorreia | Custo: baixo",
            highlight: false,
          },
          {
            label: "Liraglutida",
            value:
              "Mec: aGLP-1 SC diário | Perda: 5–8% | CI: CMT/MEN-2 | EA: TGI | Custo: alto",
            highlight: false,
          },
          {
            label: "Semaglutida",
            value:
              "Mec: aGLP-1 SC semanal | Perda: 10–15% | CI: CMT/MEN-2 | EA: TGI | CV: SELECT 2023 | Custo: muito alto",
            highlight: true,
          },
          {
            label: "Tirzepatida",
            value:
              "Mec: dual GIP+GLP-1 SC semanal | Perda: 15–22% | EA: TGI | Superior à sema 2025 | Custo: muito alto",
            highlight: true,
          },
          {
            label: "BUP+Naltrexona",
            value:
              "Mec: ISND + anti-opioide | Perda: 5–9% | CI: epilepsia, opioides | Indicado: compulsão alimentar",
            highlight: false,
          },
          {
            label: "Topiramato",
            value:
              "Mec: GABA/Glu modulation | Perda: 5–10% | CI: gravidez, nefrolitíase | Indicado: compulsão + insônia | Off-label",
            highlight: false,
          },
          {
            label: "Setmelanotida",
            value:
              "Mec: agonista MC4R | Indicado: obesidade monogênica genética | Raríssimo",
            highlight: false,
          },
        ],
      },
      {
        type: "decision",
        title: "Seleção por Perfil Clínico",
        decisions: [
          {
            condition: "Obesidade + Alto Risco CV",
            color: "#6366F1",
            actions: [
              "Semaglutida (Wegovy®) — 1ª escolha (Trial SELECT: -20% eventos CV)",
              "Tirzepatida — alternativa com maior eficácia",
              "CONTRAINDICADO: Sibutramina",
              "Meta: ≥ 10% perda de peso",
            ],
          },
          {
            condition: "Obesidade + DM2",
            color: "#0EA5E9",
            actions: [
              "Semaglutida ou Tirzepatida — duplo benefício (peso + glicemia)",
              "Liraglutida — alternativa (Ozempic® off-label)",
              "Tirzepatida superior 2025",
              "iSGLT2 como complemento",
            ],
          },
          {
            condition: "Compulsão Alimentar / Comer Emocional",
            color: "#EC4899",
            actions: [
              "Bupropiona + Naltrexona — mecanismo central + sistema de recompensa",
              "Topiramato off-label — reduz compulsão",
              "TCC obrigatória como complemento",
            ],
          },
          {
            condition: "Custo como Fator Limitante",
            color: "#F59E0B",
            actions: [
              "Orlistate — mais barato, sem ação central",
              "Sibutramina — baixo custo se sem CI cardiovascular",
              "Topiramato off-label — custo intermediário",
            ],
          },
          {
            condition: "Obesidade Monogênica Confirmada",
            color: "#84CC16",
            actions: [
              "Setmelanotida — único aprovado para MC4R / deficiência de leptina",
              "Diagnóstico genético obrigatório primeiro",
            ],
          },
          {
            condition: "Idoso / Obesidade Sarcopênica",
            color: "#8B5CF6",
            actions: [
              "CUIDADO com análogos GLP-1 e Tirzepatida — reduzem massa magra também",
              "Panturrilha < 31 cm = risco de sarcopenia",
              "Obrigatório: proteína ≥ 1,5 g/kg/dia + resistência muscular",
            ],
          },
        ],
      },
      {
        type: "obs",
        title: "Trial SELECT 2023 — Semaglutida e Proteção Cardiovascular",
        text: "SELECT (2023): semaglutida 2,4 mg/sem em pacientes com obesidade/sobrepeso SEM DM2 mas COM doença cardiovascular estabelecida → redução de 20% em MACE (IAM não fatal, AVC, morte CV). Primeiro trial a demonstrar proteção CV de análogo GLP-1 especificamente em obesos não diabéticos. Resultado: mudança de paradigma para uso em alto risco CV sem DM.",
      },
      {
        type: "obs",
        title: "SURMOUNT-4 — Manutenção com Tirzepatida",
        text: "SURMOUNT-4: após perda de peso com tirzepatida, pacientes que continuaram o fármaco mantiveram o peso, enquanto quem descontinuou recuperou ~14% do peso em 52 semanas. Reforça o conceito de obesidade como doença crônica recidivante que requer tratamento contínuo — análogo à HAS ou DM2.",
      },
      {
        type: "obs",
        title: "Fenótipos de Obesidade — Acosta (Para Seleção do Fármaco)",
        text: "Fenótipos de Acosta: (1) Fome anormal/hiperfagia → GLP-1 (liraglutida/semaglutida). (2) Saciedade precoce/distensão → GLP-1. (3) Comer emocional/hedônico → Bupropiona+Naltrexona, Topiramato. (4) Gasto energético reduzido/metabólico → MEV intensiva, GLP-1. Tratamento fisiologicamente direcionado ao mecanismo predominante.",
      },
    ],
  },
};

export default function Obesidade() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Clinica"
      title="Obesidade — Guia Completo"
    />
  );
}
