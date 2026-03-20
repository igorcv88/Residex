import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "anatomia", name: "Anatomia / Fisio", color: "#F97316" },
  { id: "laboratorio", name: "Laboratório", color: "#F59E0B" },
  { id: "hipertireoidismo", name: "Hipertireoidismo", color: "#EF4444" },
  { id: "crise", name: "Crise Tireotóxica", color: "#EC4899" },
  { id: "hipotireoidismo", name: "Hipotireoidismo", color: "#0EA5E9" },
  { id: "tireoidites", name: "Tireoidites", color: "#10B981" },
  { id: "nodulo", name: "Nódulo / BETHESDA", color: "#8B5CF6" },
  { id: "cancer", name: "Câncer de Tireoide", color: "#6366F1" },
];

const content = {
  anatomia: {
    title: "Anatomia, Histologia e Fisiologia Tireoidiana",
    blocks: [
      {
        type: "alert",
        color: "#F97316",
        title: "Tireoide — Formato de Borboleta, Dupla Função",
        text: "Glândula endócrina anterior ao pescoço, à frente da traqueia, abaixo da cartilagem tireoidea. Dois lobos laterais + istmo (2º–4º anel traqueal) + lobo piramidal (vestígio do ducto tireoglosso). Irrigação: artéria tireoidea superior (carótida externa) + artéria tireoidea inferior (tronco tireocervical). Drenagem: veias tireoidianas superior, média e inferior → jugulares e braquiocefálicas.",
      },
      {
        type: "grid",
        title: "Histologia — Dois Tipos Celulares Fundamentais",
        items: [
          { label: "Células Foliculares", value: "Produzem T3 e T4. Organizam-se em folículos preenchidos por coloide (tireoglobulina). Transportam iodeto via NIS (cotransportador Na/I).", highlight: true },
          { label: "Células Parafoliculares (C)", value: "Produzem CALCITONINA (↓ cálcio sérico). Origem na crista neural. Base para o carcinoma medular.", highlight: true },
          { label: "Coloide", value: "Proteína tireoglobulina iodada. Reservatório de hormônio pré-formado. Aparece como material rosado na histologia.", highlight: false },
          { label: "Nervo laríngeo recorrente", value: "Passa posterior à tireoide → movimentos das pregas vocais. Lesão cirúrgica → disfonia / rouquidão.", highlight: true },
        ],
      },
      {
        type: "phases",
        title: "Síntese dos Hormônios Tireoidianos — 8 Passos",
        phases: [
          {
            number: "1→4",
            name: "CAPTAÇÃO E OXIDAÇÃO",
            color: "#F97316",
            items: [
              "I⁻ entra na célula folicular via NIS (cotransportador Na/I)",
              "Difunde-se até o ápice → Pendrina transporta para o coloide",
              "TPO (tireoperoxidase) oxida I⁻ → I⁰ (iodo orgânico)",
              "TPO incorpora iodo a tirosinas da tireoglobulina → MIT e DIT",
            ],
          },
          {
            number: "5→6",
            name: "ACOPLAMENTO E LIBERAÇÃO",
            color: "#EF4444",
            items: [
              "TPO acopla 2× DIT → T4 (tetraiodotironina) | MIT + DIT → T3",
              "Tireoglobulina endocitada → fusão com lisossoma → proteólise",
              "T3 e T4 liberados na circulação",
              "MIT e DIT deiodinados → reciclagem do iodo (deiodinase iodotirosina)",
            ],
          },
          {
            number: "7→8",
            name: "TRANSPORTE E CONVERSÃO",
            color: "#10B981",
            items: [
              "> 99% de T4 e T3 ligados a TBG, TTR e albumina",
              "Apenas fração LIVRE é metabolicamente ativa",
              "Deiodinase tipo 1 (D1): fígado/rins → converte T4 em T3",
              "Deiodinase tipo 2 (D2): SNC/hipófise → mais eficiente",
              "Deiodinase tipo 3 (D3): converte T4 em T3 reverso (rT3) → inativo",
              "T3 = hormônio ATIVO (10× maior afinidade pelo receptor que T4)",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Eixo Hipotálamo–Hipófise–Tireoide — Controle por Feedback",
        steps: [
          { text: "Hipotálamo → TRH → estimula TSH na hipófise anterior", color: "#F97316" },
          { text: "TSH → estimula TODAS as etapas da síntese e liberação de T3/T4", color: "#F59E0B" },
          { text: "T3/T4 livres → feedback NEGATIVO sobre TRH e TSH", color: "#10B981" },
          { text: "Efeito Wolff-Chaikoff: EXCESSO de iodo → inibição paradoxal da síntese (autoproteção)", color: "#0EA5E9" },
          { text: "Efeito Jod-Basedow: EXCESSO de iodo em tireoide patológica → hipertireoidismo", color: "#EF4444" },
        ],
      },
      {
        type: "obs",
        title: "Funções dos Hormônios Tireoidianos",
        text: "T3/T4 são essenciais para: metabolismo basal (↑consumo O₂), termogênese, desenvolvimento cerebral fetal (crítico no 1º trimestre — feto depende da tiroxina materna), crescimento e maturação óssea, regulação do metabolismo lipídico (↓LDL via receptor hepático), potencialização das catecolaminas (↑receptores β), frequência cardíaca e débito cardíaco, motilidade intestinal.",
      },
    ],
  },

  laboratorio: {
    title: "Laboratório — Interpretação de TSH, T4L, Anticorpos e Cintilografia",
    blocks: [
      {
        type: "alert",
        color: "#F59E0B",
        title: "TSH — Exame de Triagem Universal",
        text: "TSH é o exame de 1ª linha para avaliar função tireoidiana. Lógica do feedback: TSH ↑ = hipotireoidismo primário (falta de HT → hipófise tenta compensar). TSH ↓ = hipertireoidismo (excesso de HT → hipófise suprimida). Em hipotireoidismo CENTRAL (hipofisário): TSH baixo ou inapropriadamente normal + T4L baixo.",
      },
      {
        type: "grades",
        title: "Padrões Laboratoriais Principais",
        organ: "Laboratorio",
        grades: [
          {
            grade: "↑T",
            color: "#EF4444",
            items: ["Hipertireoidismo primário", "TSH ↓↓ (<0,1)", "T4L ↑ e/ou T3 ↑", "Causa: Graves, BNT, adenoma tóxico"],
          },
          {
            grade: "↓T",
            color: "#0EA5E9",
            items: ["Hipotireoidismo primário", "TSH ↑↑ (>10)", "T4L ↓", "Causa: Hashimoto, pós-tireoidectomia"],
          },
          {
            grade: "SC+",
            color: "#F59E0B",
            items: ["Hiper subclínico", "TSH 0,1–0,4 (supresso)", "T4L e T3 normais", "Risco: FA, osteoporose"],
          },
          {
            grade: "SC-",
            color: "#6366F1",
            items: ["Hipo subclínico", "TSH > LSN–10", "T4L normal", "TTO se TSH ≥ 10"],
          },
          {
            grade: "EUD",
            color: "#84CC16",
            items: ["Eutireoidiano doente", "T3 ↓ (mais comum)", "T3 reverso ↑", "TSH normal/discreto ↑", "NÃO tratar — tratar a causa"],
          },
        ],
      },
      {
        type: "grid",
        title: "Anticorpos Tireoidianos — Quando Pedir",
        items: [
          { label: "Anti-TPO (antitireoperoxidase)", value: "Presente em 80–99% da Tireoidite de Hashimoto. Também em Graves (até 90%). Valor prognóstico: anti-TPO + → maior risco de progressão para hipotireoidismo.", highlight: true },
          { label: "Anti-Tg (antitireoglobulina)", value: "Positivo em ~60% da Tireoidite de Hashimoto. Menos específico que anti-TPO. Interfere na dosagem de Tg no seguimento do câncer.", highlight: false },
          { label: "TRAb (anti-receptor de TSH)", value: "Diagnóstico de Doença de Graves (sensibilidade 97%). Inclui anticorpos estimuladores (TSI) e bloqueadores. Atravessa placenta → hipertireoidismo fetal.", highlight: true },
          { label: "Calcitonina", value: "Marcador do carcinoma MEDULAR. Elevada na suspeita. Seguimento pós-cirúrgico junto ao CEA.", highlight: true },
          { label: "Tireoglobulina (Tg)", value: "Marcador de seguimento no câncer DIFERENCIADO (papilífero/folicular) após tireoidectomia. Interferência se anti-Tg positivo.", highlight: true },
        ],
      },
      {
        type: "grid",
        title: "Cintilografia e RAIU-24h — Distinção Fundamental",
        items: [
          { label: "RAIU elevada (35–95%)", value: "Hipertireoidismo real: Doença de Graves (capta difuso), adenoma tóxico (quente), bócio multinodular tóxico.", highlight: true },
          { label: "RAIU baixa (< 5%)", value: "Tireotoxicose SEM hiperfunção: Tireoidite destrutiva (liberação de hormônio pré-formado), tireotoxicose factícia.", highlight: true },
          { label: "Nódulo quente", value: "Hipercaptante → funcionante → raramente maligno (< 1%). Pesquisar se TSH suprimido.", highlight: false },
          { label: "Nódulo frio", value: "Hipocaptante → risco de malignidade 10–15% → indicar PAAF.", highlight: false },
        ],
      },
    ],
  },

  hipertireoidismo: {
    title: "Hipertireoidismo e Tireotoxicose — Graves, BNT e Adenoma Tóxico",
    blocks: [
      {
        type: "alert",
        color: "#EF4444",
        title: "Hipertireoidismo ≠ Tireotoxicose",
        text: "Hipertireoidismo = tireoide HIPERFUNCIONANTE (produz excesso de T3/T4). Tireotoxicose = excesso de HT na circulação, qualquer causa. Toda hipertireoidismo → tireotoxicose. Mas tireotoxicose por tireoidite ou factícia → NÃO há hiperfunção → RAIU baixa → NÃO indicar tionamidas.",
      },
      {
        type: "grid",
        title: "Manifestações Clínicas da Tireotoxicose",
        items: [
          { label: "Adrenérgicas", value: "Taquicardia, palpitações, tremor fino, sudorese, intolerância ao calor, hipertensão sistólica, FA (risco em idosos).", highlight: true },
          { label: "Metabólicas", value: "Perda de peso apesar de polifagia, diarreia, hiperglicemia (↑glicogenólise por catecolaminas), ↓LDL.", highlight: false },
          { label: "Neuropsiquiátricas", value: "Ansiedade, irritabilidade, insônia, labilidade emocional, fraqueza muscular proximal.", highlight: false },
          { label: "Dermatológicas", value: "Pele quente e úmida, queda de cabelo, mixedema pré-tibial (Graves), acropaquia (Graves).", highlight: false },
          { label: "Sinal de Lid-Lag", value: "Retardo do movimento palpebral superior → exposição da esclera ao olhar para baixo. Qualquer tireotoxicose.", highlight: true },
          { label: "Oftalmopatia de Graves", value: "EXCLUSIVA da Doença de Graves (exoftalmia, proptose, diplopia, quemose). Pode surgir mesmo após cura.", highlight: true },
        ],
      },
      {
        type: "phases",
        title: "Causas de Hipertireoidismo",
        phases: [
          {
            number: "80%",
            name: "DOENÇA DE GRAVES",
            color: "#EF4444",
            items: [
              "TRAb estimula receptor TSH → hiperfunção autônoma",
              "Tríade: bócio difuso + oftalmopatia + dermopatia (mixedema pré-tibial)",
              "RAIU: elevada (100% dos casos)",
              "Diagnóstico: TRAb positivo + clínica",
              "Mais comum em mulheres jovens",
              "Tratamento 1ª linha: metimazol (18 meses)",
              "Definitividade: radioiodoterapia ou cirurgia",
              "Gestação: PTU no 1º trimestre → metimazol no 2º/3º",
            ],
          },
          {
            number: "2ª",
            name: "BÓCIO MULTINODULAR TÓXICO (BMNT)",
            color: "#F97316",
            items: [
              "Mutações somáticas no receptor de TSH → autonomia funcional",
              "Mais frequente em idosos e regiões com deficiência de iodo",
              "RAIU: elevada, captação heterogênea",
              "Cintilografia: múltiplos nódulos quentes",
              "TTO definitivo: radioiodoterapia ou tireoidectomia total",
              "Metimazol 5–10 mg/dia apenas para controle",
            ],
          },
          {
            number: "3ª",
            name: "ADENOMA TÓXICO (PLUMMER)",
            color: "#F59E0B",
            items: [
              "Único nódulo hiperfuncionante autônomo",
              "Mutações ativadoras do TSHR ou proteína Gs",
              "Cintilografia: nódulo quente único + supressão do restante",
              "TTO: lobectomia ipsilateral ± istmectomia OU radioiodoterapia",
              "PAAF não indicada (baixo risco maligno)",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Tratamento da Doença de Graves — Sequência",
        steps: [
          { text: "Beta-bloqueador (propranolol 40–80 mg/dia) → controle imediato dos sintomas adrenérgicos", color: "#F59E0B" },
          { text: "Metimazol — 1ª linha (dose conforme T4L). Início de ação: 1–2 semanas", color: "#EF4444" },
          { text: "Monitorar: TGO/TGP (hepatotoxicidade) e leucograma (agranulocitose — suspender se febre/faringite)", color: "#F97316" },
          { text: "Duração: 18 meses → tentar suspensão → verificar TRAb para prognóstico de recidiva", color: "#F59E0B" },
          { text: "50% de recidiva → opção definitiva: iodo radioativo (RAI) ou tireoidectomia total", color: "#6366F1" },
          { text: "Oftalmopatia grave: glicocorticoide IV antes do RAI (RAI agrava oftalmopatia — especialmente em tabagistas)", color: "#EC4899" },
        ],
      },
      {
        type: "obs",
        title: "Hipertireoidismo Subclínico — Quando Tratar?",
        text: "TSH < 0,1 mUI/L: indicar tratamento em > 65 anos, doença cardiovascular, osteoporose, FA, sintomas. TSH 0,1–0,4 mUI/L: conduta expectante em maioria; tratar se > 65 anos com comorbidades. Risco principal: fibrilação atrial (risco 3× maior com TSH < 0,1) + perda de massa óssea. Repetir TSH em 4–6 semanas antes de tratar (excluir supressão transitória por glicocorticoide, amiodarona).",
      },
    ],
  },

  crise: {
    title: "Crise Tireotóxica — Emergência Endocrinológica",
    blocks: [
      {
        type: "alert",
        color: "#EC4899",
        title: "Crise Tireotóxica — Diagnóstico Clínico, Não Esperar Exames",
        text: "Exacerbação aguda potencialmente fatal do hipertireoidismo. Níveis de T3/T4 não diferem do hipertireoidismo grave — o diagnóstico é CLÍNICO. Score de Burch-Wartofsky: ≥ 45 = altamente sugestivo; 25–44 = suspeito; < 25 = improvável. TRATAR SEM AGUARDAR SCORE.",
      },
      {
        type: "grid",
        title: "Manifestações Clínicas da Crise Tireotóxica",
        items: [
          { label: "Hipertermia", value: "Febre > 38–39°C (às vezes > 40°C). Sinal cardinal. NÃO usar salicilatos (↑ T4 livre por deslocamento da TBG).", highlight: true },
          { label: "Taquicardia > 130 bpm", value: "FA de alta resposta, ICC de alto débito, choque cardiogênico.", highlight: true },
          { label: "Alteração neurológica", value: "Agitação, delirium, psicose, convulsões, até coma.", highlight: true },
          { label: "Manifestações GI", value: "Náuseas, vômitos, diarreia, dor abdominal, icterícia (disfunção hepática grave).", highlight: false },
          { label: "Fatores precipitantes", value: "Infecção (mais comum), cirurgia, trauma, parto, AVC, IAM, suspensão abrupta de antitireoidiano, contraste iodado.", highlight: true },
        ],
      },
      {
        type: "flow",
        title: "Manejo da Crise Tireotóxica — Sequência OBRIGATÓRIA",
        steps: [
          { text: "1. BETA-BLOQUEADOR: Propranolol 60–80 mg a cada 4–6h VO ou esmolol IV. Bloqueia sintomas adrenérgicos + inibe conversão periférica T4 → T3", color: "#EC4899" },
          { text: "2. ANTITIREOIDIANO: PTU 200–400 mg a cada 6h (VO/SNG). Bloqueia síntese E conversão periférica. Metimazol se PTU indisponível (NÃO bloqueia conversão periférica)", color: "#EF4444" },
          { text: "3. IODO INORGÂNICO: Após ≥ 1h do antitireoidiano → Lugol 5 gotas 6/6h ou SSKI. Bloqueia liberação de HT pré-formados (efeito de Wolff-Chaikoff). NUNCA antes do antitireoidiano!", color: "#F97316" },
          { text: "4. GLICOCORTICOIDE: Hidrocortisona 100 mg IV 8/8h. ↓ conversão T4→T3 + previne insuficiência adrenal relativa", color: "#F59E0B" },
          { text: "5. SUPORTE: Resfriamento físico (NÃO salicilatos), paracetamol para febre, hidratação, correção eletrolítica, O₂, UTI", color: "#10B981" },
          { text: "6. IDENTIFICAR E TRATAR O FATOR PRECIPITANTE (antibiótico se infecção, mesmo sem febre proeminente)", color: "#6366F1" },
        ],
      },
      {
        type: "obs",
        title: "Pérola — PTU × Metimazol na Crise Tireotóxica",
        text: "Na CRISE: PTU é preferido ao metimazol porque TAMBÉM bloqueia a conversão periférica de T4 em T3 (via inibição da deiodinase tipo 1). Na Doença de Graves crônica e estável: metimazol é preferido (dose única diária, menor hepatotoxicidade). Na GESTAÇÃO (1º trimestre): PTU preferido (menor teratogenicidade). No 2º/3º trimestres: trocar para metimazol (PTU causa hepatotoxicidade materna grave em uso prolongado).",
      },
    ],
  },

  hipotireoidismo: {
    title: "Hipotireoidismo — Hashimoto, Subclínico, Mixedema e Gestação",
    blocks: [
      {
        type: "alert",
        color: "#0EA5E9",
        title: "Hipotireoidismo Primário vs Central",
        text: "Primário (95% dos casos): Defeito na própria tireoide → TSH ↑↑ + T4L ↓. Causa mais comum em países com iodo adequado: Tireoidite de Hashimoto. Central (hipofisário ou hipotalâmico): TSH baixo ou 'inapropriadamente normal' + T4L ↓. Monitorar com T4L (NÃO TSH). Causas: tumor hipofisário, cirurgia, radioterapia, apoplexia hipofisária.",
      },
      {
        type: "grid",
        title: "Manifestações Clínicas — 'Desaceleração Geral'",
        items: [
          { label: "Fadiga, sonolência, bradipsiquia", value: "Déficit cognitivo, memória prejudicada, depressão, loucura mixedematosa (psicose em hipotireoidismo grave).", highlight: false },
          { label: "Intolerância ao frio", value: "Redução do metabolismo basal e termogênese.", highlight: false },
          { label: "Bradicardia", value: "Diminuição da frequência cardíaca e do débito cardíaco. Derrame pericárdico em hipotireoidismo grave.", highlight: true },
          { label: "Obstipação intestinal", value: "Redução da motilidade GI.", highlight: false },
          { label: "Pele seca, edema periorbital", value: "Mucopolissacarídeos acumulam → mixedema (edema não cacifo). Face puffy.", highlight: true },
          { label: "Hiperprolactinemia", value: "TRH elevado estimula prolactina → galactorreia, irregularidade menstrual, disfunção erétil. Diagnóstico diferencial com prolactinoma.", highlight: true },
          { label: "Dislipidemia", value: "↑LDL-colesterol (↓receptores hepáticos de LDL). Risco cardiovascular aumentado.", highlight: false },
          { label: "Reflexo aquileu lentificado", value: "Sinal clássico de hipotireoidismo — fase de relaxamento prolongada.", highlight: true },
        ],
      },
      {
        type: "phases",
        title: "Tireoidite de Hashimoto — Principal Causa de Hipotireoidismo",
        phases: [
          {
            number: "→",
            name: "FISIOPATOLOGIA",
            color: "#0EA5E9",
            items: [
              "Doença autoimune crônica — destruição progressiva do parênquima",
              "Infiltração linfocitária + centros germinativos + fibrose",
              "Células Th2: estimulam B → anticorpos anti-TPO e anti-Tg",
              "Células Th1: linfócitos citotóxicos → destroem células foliculares",
              "Achado patognomônico: células de Hürthle (Askanazy) — grandes, eosinofílicas",
              "Evolução: eutireoidismo → hipo subclínico → hipotireoidismo franco",
            ],
          },
          {
            number: "Dx",
            name: "DIAGNÓSTICO",
            color: "#6366F1",
            items: [
              "Anti-TPO: 80–99% dos casos. Anti-Tg: 60%",
              "TSH + T4L: variam conforme fase",
              "USG: tireoide heterogênea, hipoecogênica, hipervascular, pseudonódulos",
              "RAIU e cintilografia: limitada utilidade diagnóstica",
              "TTO se hipotireoidismo presente ou subclínico significativo",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Tratamento com Levotiroxina",
        items: [
          { label: "Dose adultos jovens", value: "1,6–1,8 µg/kg/dia. Mulheres: 75–100 µg/dia. Homens: 100–150 µg/dia.", highlight: false },
          { label: "Início no idoso / cardiopata", value: "Dose baixa: 12,5–25 µg/dia → ajuste gradual de 12,5–25 µg a cada 6 semanas.", highlight: true },
          { label: "Administração", value: "JEJUM, 30–60 min antes do café OU ao deitar (estômago vazio). Absorção reduzida com cálcio, ferro, antiácidos, IBP.", highlight: true },
          { label: "Monitoramento", value: "Reavaliar TSH após 6 semanas do início/ajuste. Meta: TSH 1,0–2,5 mUI/L (jovens); 4–6 mUI/L (idosos > 70 anos).", highlight: true },
          { label: "Hipo central", value: "Monitorar com T4L (TSH inapropriado — não usar TSH como guia).", highlight: true },
          { label: "Gestação", value: "Aumentar dose 25–30% assim que gestação confirmada. Meta: TSH < 2,5 mUI/L (1º tri) / < 3,0 mUI/L (2º–3º tri).", highlight: false },
        ],
      },
      {
        type: "alert",
        color: "#6366F1",
        title: "Hipotireoidismo Subclínico — Quando Tratar?",
        text: "Definição: TSH > LSN com T4L normal. Tratamento CONSENSUAL quando TSH ≥ 10 mUI/L. Zona cinzenta (TSH LSN–10): tratar se sintomático, anti-TPO positivo, dislipidemia, doença cardiovascular, IC, gestante ou desejo de engravidar. Conduta expectante em pacientes jovens, assintomáticos, anti-TPO negativo.",
      },
      {
        type: "flow",
        title: "Coma Mixedematoso — Emergência",
        steps: [
          { text: "Suspeita: paciente hipotireoidiano + rebaixamento de consciência + hipotermia + instabilidade hemodinâmica", color: "#0EA5E9" },
          { text: "Diagnóstico CLÍNICO — não aguardar resultados para iniciar tratamento", color: "#0EA5E9" },
          { text: "PRIMEIRO: Glicocorticoide (hidrocortisona 100 mg IV 8/8h) → previne crise adrenal ao repor HT", color: "#EF4444" },
          { text: "Levotiroxina IV (T4): 200–500 µg ataque → 50–100 µg/dia manutenção ± Liotironina (T3) IV em casos selecionados", color: "#F59E0B" },
          { text: "Suporte UTI: aquecimento PASSIVO gradual, via aérea, ventilação, correção de hiponatremia e hipoglicemia", color: "#10B981" },
          { text: "Identificar e tratar fator precipitante (infecção = mais comum)", color: "#F97316" },
        ],
      },
    ],
  },

  tireoidites: {
    title: "Tireoidites — Espectro Clínico e Tratamento",
    blocks: [
      {
        type: "alert",
        color: "#10B981",
        title: "Regra Geral — Tireoidites Destrutivas NÃO recebem tionamidas",
        text: "Nas tireoidites, há liberação de hormônio pré-formado (destruição folicular), NÃO hiperfunção. RAIU baixa. Tionamidas NÃO têm papel. Tratamento: propranolol (sintomas), AINEs ou corticoide (dor/inflamação). Se hipotireoidismo permanente → levotiroxina.",
      },
      {
        type: "decision",
        title: "Tipos de Tireoidite por Perfil Clínico",
        decisions: [
          {
            condition: "Tireoidite de Hashimoto (Crônica Autoimune)",
            color: "#0EA5E9",
            actions: [
              "Causa mais comum de hipotireoidismo (iodo adequado)",
              "Anti-TPO ↑ (80–99%), anti-Tg ↑ (60%)",
              "Geralmente bócio indolor + evolução para hipotireoidismo",
              "Rara fase de hashitoxicose (tireotoxicose transitória inicial)",
              "TTO: levotiroxina quando hipotireoidismo presente",
            ],
          },
          {
            condition: "Tireoidite Subaguda Granulomatosa (De Quervain)",
            color: "#EF4444",
            actions: [
              "Causa viral (pós-vírus superior), inflamação granulomatosa",
              "Fase 1: hipertireoidismo + DOR tireoidiana + VHS muito alto",
              "Fase 2: eutireoidismo transitório",
              "Fase 3: hipotireoidismo transitório (6–8 semanas)",
              "Fase 4: resolução espontânea em > 95%",
              "TTO: AINEs / prednisona (dor) + propranolol (tireotoxicose). SEM tionamidas",
            ],
          },
          {
            condition: "Tireoidite Silenciosa (Indolor)",
            color: "#F59E0B",
            actions: [
              "Autoimune, sem dor, RAIU baixa durante tireotoxicose",
              "Curso similar ao De Quervain mas SEM dor, SEM VHS elevado",
              "Pós-parto: 5–10% das mulheres (tireoidite pós-parto)",
              "Anti-TPO frequentemente positivo",
              "TTO: propranolol. Hipotireoidismo em 20–40% — pode ser permanente",
            ],
          },
          {
            condition: "Tireoidite por Amiodarona (AIT)",
            color: "#EC4899",
            actions: [
              "AIT tipo 1: paciente com tireoide patológica (Graves latente, BNT) + excesso de iodo → hiperfunção. TTO: tionamidas ± perclorato",
              "AIT tipo 2: tireoide normal + efeito tóxico direto → destruição. TTO: glicocorticoide (prednisona). SEM tionamidas",
              "Diferenciação AIT1 vs AIT2: RAIU, USG Doppler, T3/T4 ratio",
              "Amiodarona: 37% de iodo em peso. Cada 200 mg → 6.000 µg iodo",
            ],
          },
          {
            condition: "Tireoidite de Riedel (Fibrosa Crônica)",
            color: "#8B5CF6",
            actions: [
              "Fibrose extensa → tireoide 'pétrea' (rochosa, aderida)",
              "Pode causar sintomas compressivos: disfagia, dispneia, rouquidão",
              "Associada a fibrose em outros sítios (retroperitoneal, mediastinal, colangite esclerosante)",
              "PAAF frequentemente não diagnóstica → biópsia a céu aberto",
              "TTO: cirurgia (compressão) + glicocorticoide/tamoxifeno/metotrexato",
            ],
          },
        ],
      },
      {
        type: "obs",
        title: "Síndrome do Eutireoidiano Doente — Não Tratar",
        text: "Alteração adaptativa em doenças sistêmicas graves (sepse, trauma, IAM, IC, IRC). T3 ↓ (mais comum) + T3 reverso ↑ + T4 pode ↓ em quadros graves + TSH baixo/normal/discretamente elevado na recuperação. NÃO confundir com hipotireoidismo. NÃO repor HT (não demonstrou benefício e pode ser prejudicial). TRATAR A CAUSA. Reavaliar função tireoidiana após recuperação clínica.",
      },
    ],
  },

  nodulo: {
    title: "Nódulo Tireoidiano — TIRADS, BETHESDA e Algoritmo",
    blocks: [
      {
        type: "alert",
        color: "#8B5CF6",
        title: "Regra de Ouro — Nódulo com TSH Suprimido",
        text: "Se TSH suprimido + nódulo → cintilografia PRIMEIRO. Nódulo hipercaptante (quente) → raramente maligno → tratar hipertireoidismo, PAAF não indicada. Nódulo hipocaptante (frio) com TSH suprimido → investigar via TIRADS + PAAF. Com TSH normal ou elevado → cintilografia não é prioritária → ir direto para USG + TIRADS.",
      },
      {
        type: "grid",
        title: "Fatores de Risco para Malignidade — Clínica",
        items: [
          { label: "Crescimento rápido", value: "Especialmente se nódulo pré-existente. Suspeita alta de malignidade ou tireoidite aguda.", highlight: true },
          { label: "Consistência endurecida / pétrea", value: "Sugere infiltração tumoral. Nódulo colide é mole; neoplasia é dura.", highlight: true },
          { label: "Fixação a planos profundos", value: "Invasão local — sinal de malignidade avançada.", highlight: true },
          { label: "Disfonia / rouquidão", value: "Paralisia do nervo laríngeo recorrente por invasão tumoral.", highlight: true },
          { label: "Linfonodomegalia cervical", value: "Metástase linfonodal regional → aumenta fortemente suspeita de Ca papilífero.", highlight: true },
          { label: "HF de Ca de tireoide / MEN 2", value: "Especialmente para carcinoma medular (mutação RET). Rastrear calcitonina.", highlight: false },
          { label: "Irradiação cervical prévia", value: "Fator de risco bem estabelecido para carcinoma papilífero.", highlight: false },
        ],
      },
      {
        type: "grades",
        title: "Sistema Bethesda — Categorias Citológicas e Conduta",
        organ: "BETHESDA",
        grades: [
          {
            grade: "I",
            color: "#84CC16",
            items: ["Não diagnóstico", "Repetir PAAF guiada por US", "Se insatisfatório: cirurgia (alto risco) ou US-follow (baixo risco)"],
          },
          {
            grade: "II",
            color: "#10B981",
            items: ["Benigno", "Seguimento com US (anual → intervalos maiores)", "Malignidade < 3%"],
          },
          {
            grade: "III",
            color: "#F59E0B",
            items: ["AUS / FLUS (indeterminado)", "Repetir PAAF; considerar cirurgia ou teste molecular", "Malignidade 5–15%"],
          },
          {
            grade: "IV",
            color: "#F97316",
            items: ["Neoplasia folicular / suspeita (FN/SFN)", "Lobectomia recomendada", "Testes moleculares podem ajudar", "Malignidade 15–30%"],
          },
          {
            grade: "V",
            color: "#EF4444",
            items: ["Suspeito de malignidade", "Cirurgia indicada", "Malignidade 60–75%"],
          },
          {
            grade: "VI",
            color: "#8B5CF6",
            items: ["Maligno", "Tireoidectomia total + ablação com iodo radioativo", "Malignidade 97–99%"],
          },
        ],
      },
      {
        type: "obs",
        title: "TIRADS — Características Ultrassonográficas de Risco",
        text: "ACR-TIRADS 1–5 baseado em: composição (sólido > misto > espongiforme > cístico), ecogenicidade (hipoecoico > isoecoico > hiperecoico), forma (mais alto que largo = suspeito), margens (irregulares/lobuladas/extraparenquimatosas) e calcificações (microcalcificações = alto risco > calcificação periférica > sem calcificação). TIRADS 4–5 → indicar PAAF conforme tamanho.",
      },
    ],
  },

  cancer: {
    title: "Câncer de Tireoide — Tipos, Prognóstico e Tratamento",
    blocks: [
      {
        type: "alert",
        color: "#6366F1",
        title: "4 Tipos Histológicos — Prognóstico Inversamente Proporcional à Diferenciação",
        text: "PAPILÍFERO (mais comum, melhor prognóstico) → FOLICULAR (bom prognóstico) → MEDULAR (prognóstico intermediário; células C, calcitonina) → ANAPLÁSICO (raro, pior prognóstico — sempre estágio IV). Carcinomas papilífero e folicular = CÂNCER DIFERENCIADO DE TIREOIDE (CDT) = células foliculares. Medular = células parafoliculares. Anaplásico = células foliculares indiferenciadas.",
      },
      {
        type: "phases",
        title: "Carcinomas Diferenciados — Papilífero e Folicular",
        phases: [
          {
            number: "1º",
            name: "PAPILÍFERO (80% dos casos)",
            color: "#6366F1",
            items: [
              "Mulheres jovens (20–40 anos). Excelente prognóstico",
              "Disseminação: via LINFÁTICA (linfadenopatia cervical precoce)",
              "Oncogenes: BRAF V600E (mais comum), RAS, rearranjos RET/PTC",
              "Histologia: corpos psamomatosos (calcificações concêntricas)",
              "Núcleos em 'vidro fosco' e inclusões intranucleares",
              "TTO: tireoidectomia total ≥ 1 cm ou < 1 cm com fatores de risco",
              "Seguimento: supressão de TSH com LT4 + US semestral + Tg",
            ],
          },
          {
            number: "2º",
            name: "FOLICULAR (10–15%)",
            color: "#0EA5E9",
            items: [
              "Adultos 40–60 anos. Bom prognóstico",
              "Disseminação: via HEMATOGÊNICA (pulmão, osso, cérebro)",
              "Associado à deficiência de iodo",
              "PAAF: não distingue adenoma de carcinoma (precisa histologia)",
              "TTO: tireoidectomia parcial ≤ 2 cm / total > 2 cm",
              "Inclui NIFTP: neoplasia folicular não invasiva, comportamento indolente — não é ca de fato (OMS 2025)",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Carcinoma Medular e Anaplásico",
        items: [
          { label: "Medular — Células C / Calcitonina", value: "Esporádico (80%) ou hereditário (20% = MEN 2A, MEN 2B, Ca medular familiar). Proto-oncogene RET. Diarreia + flushing em doença avançada. Diagnóstico: calcitonina sérica elevada. TTO: tireoidectomia total + esvaziamento cervical central. SEM iodo radioativo, SEM supressão TSH. Seguimento: calcitonina + CEA.", highlight: true },
          { label: "MEN 2A", value: "Ca medular + feocromocitoma + hiperparatireoidismo primário. Mutação RET (codons 634, 609, 618, 620).", highlight: false },
          { label: "MEN 2B", value: "Ca medular + feocromocitoma + neuromas mucosos + hábito marfanoide. Mutação RET (codon 918). Mais agressivo.", highlight: false },
          { label: "Anaplásico", value: "Idosos. Crescimento ultrarrápido. Tríade: massa cervical volumosa + disfonia + disfagia. p53 mutado. Mutação BRAF V600E em alguns → alvo terapêutico. Sempre estágio IV. SEM iodo radioativo. Prognóstico: meses.", highlight: true },
        ],
      },
      {
        type: "flow",
        title: "Seguimento do Câncer Diferenciado de Tireoide — Pós-Operatório",
        steps: [
          { text: "Tireoidectomia total → estadiar risco de recorrência (ATA 2025: baixo, intermediário, alto)", color: "#6366F1" },
          { text: "Ablação com iodo radioativo (RAI): indicada em risco intermediário/alto, metástases, invasão extratiroidiana", color: "#EF4444" },
          { text: "Supressão de TSH com levotiroxina: alto risco → TSH < 0,1; baixo risco → TSH 0,5–2,0", color: "#F59E0B" },
          { text: "Dosagem de Tireoglobulina (Tg) + anti-Tg: 6–12 semanas pós-cirurgia e periodicamente", color: "#10B981" },
          { text: "US cervical: 6–12 meses após cirurgia nos primeiros 2 anos", color: "#0EA5E9" },
          { text: "Resposta excelente = Tg indetectável + US negativa + sem doença estrutural → reduzir intensidade de seguimento", color: "#84CC16" },
        ],
      },
      {
        type: "obs",
        title: "Pérola — Medular NÃO capta iodo e NÃO suprime TSH",
        text: "Carcinoma medular NÃO deriva das células foliculares → NÃO sintetiza Tg → NÃO capta iodo radioativo → RAI CONTRAINDICADO. TSH não estimula células C → supressão de TSH sem benefício. Carcinoma anaplásico: mesma lógica — NÃO usar RAI nem supressão TSH. Somente CDT (papilífero e folicular) se beneficia de RAI e supressão de TSH.",
      },
    ],
  },
};

export default function DoencasTireoide() {
  const [active, setActive] = useState(sections[0].id);
  const navigate = useNavigate();
  const sec = sections.find((s) => s.id === active);
  const color = sec.color;
  const curr = content[active];

  const renderBlock = (block, idx) => {
    if (block.type === "alert") {
      return (
        <div key={idx} style={{ background: `${block.color}10`, border: `1px solid ${block.color}40`, borderLeft: `3px solid ${block.color}`, borderRadius: 6, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: block.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>⬥ {block.title}</div>
          <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.65 }}>{block.text}</div>
        </div>
      );
    }
    if (block.type === "obs") {
      return (
        <div key={idx} style={{ background: "#0d1117", border: "1px solid #1e2a3a", borderLeft: "3px solid #374151", borderRadius: 6, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>📋 {block.title}</div>
          <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.65 }}>{block.text}</div>
        </div>
      );
    }
    if (block.type === "grid") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 8 }}>
            {block.items.map((item, i) => (
              <div key={i} style={{ background: item.highlight ? `${color}0e` : "#0a0d14", border: `1px solid ${item.highlight ? color + "30" : "#111827"}`, borderRadius: 5, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: item.highlight ? color : "#4b5563", marginBottom: 4, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: item.highlight ? "#d1d5db" : "#6b7280", lineHeight: 1.55 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (block.type === "flow") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {block.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${step.color}22`, border: `1px solid ${step.color}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: step.color, fontFamily: "monospace", fontWeight: 700 }}>{i + 1}</div>
                  {i < block.steps.length - 1 && <div style={{ width: 1, height: 12, background: "#1f2937" }} />}
                </div>
                <div style={{ background: `${step.color}08`, border: `1px solid ${step.color}25`, borderRadius: 5, padding: "8px 12px", flex: 1, fontSize: 12, color: "#c9cdd6", lineHeight: 1.5 }}>{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (block.type === "grades") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8 }}>
            {block.grades.map((g, i) => (
              <div key={i} style={{ background: `${g.color}0a`, border: `1px solid ${g.color}30`, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ background: `${g.color}20`, padding: "8px 12px", borderBottom: `1px solid ${g.color}30`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: g.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700, fontFamily: "monospace", flexShrink: 0 }}>{g.grade}</div>
                  <span style={{ fontSize: 11, color: g.color, fontFamily: "monospace" }}>{g.items[0]}</span>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  {g.items.slice(1).map((item, j) => (
                    <div key={j} style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.55, paddingBottom: 3, borderBottom: j < g.items.length - 2 ? "1px solid #111827" : "none", marginBottom: 3 }}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (block.type === "phases") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.phases.map((phase, i) => (
              <div key={i} style={{ background: `${phase.color}08`, border: `1px solid ${phase.color}30`, borderRadius: 6, overflow: "hidden", display: "flex" }}>
                <div style={{ width: 52, background: `${phase.color}18`, borderRight: `1px solid ${phase.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 0", flexShrink: 0, gap: 4 }}>
                  <span style={{ fontSize: 13 }}>{phase.number}</span>
                  <span style={{ fontSize: 8, color: phase.color, fontFamily: "monospace", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{phase.name.slice(0, 10)}</span>
                </div>
                <div style={{ padding: "12px 14px", flex: 1 }}>
                  <div style={{ fontSize: 11, color: phase.color, fontFamily: "monospace", marginBottom: 8, fontWeight: 700 }}>{phase.name}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {phase.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 12, color: "#9ca3af", background: "#0a0d14", border: "1px solid #1f2937", borderRadius: 4, padding: "4px 8px", lineHeight: 1.4 }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (block.type === "decision") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.decisions.map((d, i) => (
              <div key={i} style={{ background: `${d.color}08`, border: `1px solid ${d.color}30`, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ background: `${d.color}18`, padding: "8px 16px", borderBottom: `1px solid ${d.color}30` }}>
                  <span style={{ fontSize: 12, color: d.color, fontFamily: "monospace", fontWeight: 700 }}>{d.condition}</span>
                </div>
                <div style={{ padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {d.actions.map((a, j) => (
                    <div key={j} style={{ fontSize: 12, color: "#9ca3af", background: "#0a0d14", border: "1px solid #1f2937", borderRadius: 4, padding: "3px 8px" }}>{a}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ background: "#06080f", minHeight: "100vh", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#dde3f0", display: "flex", flexDirection: "column" }}>
      <button onClick={() => navigate("/")} style={{ background: "transparent", border: "1px solid #1e2a3a", color: "#64748b", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 12, width: "fit-content", margin: "16px 0 0 28px", display: "inline-flex", alignItems: "center", gap: 5 }}>← MedPanel</button>

      <div style={{ borderBottom: "1px solid #111827", padding: "16px 28px", background: "#080b14" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#374151", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 4 }}>Endocrinologia · Referência para Residência</div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#f1f5f9", letterSpacing: "0.01em" }}>Doenças da Tireoide — Guia Completo</h1>
        <div style={{ fontSize: 11, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>Anatomia · Laboratório · Hipertireoidismo · Crise Tireotóxica · Hipotireoidismo · Tireoidites · Nódulo · Câncer</div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 170, borderRight: "1px solid #0f1623", background: "#080b14", padding: "12px 0", flexShrink: 0, overflowY: "auto" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ width: "100%", background: active === s.id ? `${s.color}12` : "transparent", border: "none", borderLeft: `2px solid ${active === s.id ? s.color : "transparent"}`, color: active === s.id ? "#f1f5f9" : "#4b5563", padding: "10px 16px", cursor: "pointer", textAlign: "left", fontSize: 12, fontFamily: "monospace", transition: "all 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: active === s.id ? s.color : "#1f2937", flexShrink: 0 }} />
                {s.name}
              </div>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${color}22` }}>
            <div style={{ background: `${color}18`, border: `1px solid ${color}44`, color, padding: "4px 16px", borderRadius: 4, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{sec.name}</div>
            <div style={{ fontSize: 16, fontWeight: 400, color: "#e2e8f0" }}>{curr.title}</div>
          </div>
          {curr.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #0f1623", padding: "10px 28px", background: "#080b14", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#1f2937", fontFamily: "monospace" }}>{sections.findIndex((s) => s.id === active) + 1}/{sections.length} · {sec.name}</div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map((s) => (
            <div key={s.id} onClick={() => setActive(s.id)} style={{ width: active === s.id ? 20 : 6, height: 6, borderRadius: 3, background: active === s.id ? s.color : "#1f2937", cursor: "pointer", transition: "all 0.2s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
