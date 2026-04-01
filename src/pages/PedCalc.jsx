import PedCalcLayout from "./pedcalc-layout";

// ─────────────────────────────────────────────
// DRUG CATEGORIES
// ─────────────────────────────────────────────
const DRUG_CATEGORIES = [
  { id: "todos", name: "Todos", color: "#64748b" },
  { id: "antibioticos", name: "Antibióticos", color: "#10B981" },
  { id: "analgesicos", name: "Analgésicos / Antitérmicos", color: "#F59E0B" },
  { id: "corticoides", name: "Corticoides", color: "#EF4444" },
  { id: "antihistaminicos", name: "Anti-histamínicos", color: "#8B5CF6" },
  { id: "tgi", name: "Drogas TGI", color: "#0EA5E9" },
  { id: "broncodilatadores", name: "Broncodilatadores", color: "#6366F1" },
  { id: "anticonvulsivantes", name: "Anticonvulsivantes", color: "#EC4899" },
  { id: "sedativos", name: "Sedação / Analgesia", color: "#F97316" },
  { id: "antiparasitarios", name: "Antiparasitários", color: "#84CC16" },
  { id: "antivirais", name: "Antivirais", color: "#06B6D4" },
  { id: "antihipertensivos", name: "Anti-hipertensivos", color: "#F43F5E" },
  { id: "puericultura", name: "Puericultura / Vitaminas", color: "#A78BFA" },
  { id: "hematologia", name: "Hematologia / Coagulação", color: "#FB923C" },
];

// ─────────────────────────────────────────────
// DRUG DATABASE
// calc(input) → [{label, value, freq, sub, highlight}]
// ─────────────────────────────────────────────
const DRUGS = [
  // ══ ANTIBIÓTICOS ══════════════════════════
  // ══════════════════════════════════════════════════
  //  ANTIBIÓTICOS  — complemento
  // ══════════════════════════════════════════════════
  {
    id: "amicacina_ev",
    name: "Amicacina EV/IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 50mg/mL (2mL) | FA 250mg/mL",
    dilution: "Max 10mg/mL em SF0,9% ou SG5%",
    infusion: "30-60 min (lactentes: 1-2h)",
    calc: (w) => [
      {
        label: "Convencional (15-22,5mg/kg/dia ÷ 3×)",
        value: `${Math.min(w * 7.5, 500).toFixed(0)}–${Math.min(w * 11, 500).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: `Acima de 1 mes: 15-22,5mg/kg/dia | Maximo 1,5g/dia e 15g a dose total do tratamento.`,
        highlight: true,
      },
      {
        label: "Dose estendida (dose única diária) - Acima de 1 mes",
        value: `${Math.min(w * 15, 1500).toFixed(0)} mg/dia`,
        freq: "24/24h",
        sub: "Alternativa — monitorizar nível sérico",
        highlight: false,
      },
    ],
    notes:
      "Aminoglicosídeo. Ajuste para ClCr <50. Ototoxicidade e nefrotoxicidade. Não misturar com penicilinas.",
  },
  {
    id: "ampicilina_sulbactam_ev",
    name: "Ampicilina-Sulbactam EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1,5g (1g+0,5g) | FA 3g (2g+1g)",
    dilution: "Max 45mg/mL em SF0,9%",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "Habitual (100-200mg/kg/dia ÷ 4×)",
        value: `${Math.min(w * 25, 2000).toFixed(0)}-${Math.min(w * 50, 2000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Calculado como ampicilina | Max 2g/dose (8g/dia)",
        highlight: true,
      },
      {
        label: "Apendicite / Grave",
        value: `${Math.min(w * 50, 2000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 2g/dose | 1ª escolha pós-op apendicite",
        highlight: false,
      },
    ],
    notes:
      "1ª escolha pós-op apendicite. Apendicite G1-G2: dose única pré/intra-op. ClCr 15-29: 12/12h. ClCr 5-14: 24/24h.",
  },
  {
    id: "cefaclor_vo",
    name: "Cefaclor VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 250mg/5mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "20-40mg/kg/dia ÷ 3×",
        value: `${Math.min((w * 30) / 3, 250).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: `Regra: ${(w * 0.3).toFixed(1)} mL/dose (250mg/5mL) | Max 1g/dia`,
        highlight: true,
      },
    ],
    notes: "Cefalosporina 2ª geração VO. ClCr < 10: metade da dose.",
  },
  {
    id: "cefadroxila_vo",
    name: "Cefadroxila VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 250mg/5mL | Susp 500mg/5mL | CP 500mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "30mg/kg/dia ÷ 2×",
        value: `${Math.min(w * 15, 500).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 2g/dia",
        highlight: true,
      },
    ],
    notes: "Cefalosporina 1ª geração VO. Boa opção impetigo, infecções pele.",
  },
  {
    id: "cefalotina_ev",
    name: "Cefalotina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1g + 10mL AD (100mg/mL)",
    dilution: "Max 10mg/mL em SF0,9% ou SG5%",
    infusion: "30-60 min",
    calc: (w) => [
      {
        label: "80-160mg/kg/dia ÷ 6×",
        value: `${Math.min((w * 120) / 6, 2000).toFixed(0)} mg/dose`,
        freq: "4-6h",
        sub: "Max 12g/dia",
        highlight: true,
      },
    ],
    notes:
      "Cefalosporina 1ª geração EV. ClCr 50-80: até 2g/6h | ClCr < 2: 500mg/8h.",
  },
  {
    id: "cefazolina_ev",
    name: "Cefazolina EV (Profilaxia / Tratamento)",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1g + 10mL AD (100mg/mL) | IM: FA 1g + 2,5mL AD",
    dilution: "Max 138mg/mL em SF0,9% ou SG5%",
    infusion: "30-60 min",
    calc: (w) => [
      {
        label: "Profilaxia cirúrgica",
        value: `${Math.min(w * 25, 2000).toFixed(0)} mg`,
        freq: "dose única pré-op",
        sub: "Max 2g — dar 30min antes da incisão",
        highlight: false,
      },
      {
        label: "Tratamento (25-100mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 50) / 3, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 2g/dose | 4-6g/dia",
        highlight: true,
      },
    ],
    notes:
      "Profilaxia Nissen/gastrostomia. ClCr 10-29: 24/24h. ClCr < 10: 48/48h.",
  },
  {
    id: "cefepime_ev",
    name: "Cefepime EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1g + 10mL AD (90mg/mL) | FA 2g + 10mL AD",
    dilution: "Max 40mg/mL em SF0,9% ou SG5%",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "50mg/kg/dose (habitual)",
        value: `${Math.min(w * 50, 2000).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 2g/dose",
        highlight: false,
      },
      {
        label: "Pseudomonas / Grave (50mg/kg/dose)",
        value: `${Math.min(w * 50, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 2g/dose | Max 6g/dia",
        highlight: true,
      },
    ],
    notes:
      "Cefalosporina 4ª geração. Cobre Pseudomonas. Ajuste renal obrigatório.",
  },
  {
    id: "cefotaxima_ev",
    name: "Cefotaxima EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg | FA 1g + 4mL AD (200mg/mL)",
    dilution: "Rediluir para 40mg/mL em SF0,9% ou SG5%",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "Habitual (50-180mg/kg/dia ÷ 4-6×)",
        value: `${Math.min((w * 100) / 4, 3000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 12g/dia",
        highlight: false,
      },
      {
        label: "Meningite / SNC (200mg/kg/dia ÷ 6×)",
        value: `${Math.min((w * 200) / 6, 3000).toFixed(0)} mg/dose`,
        freq: "4/4h",
        sub: "Neonatos com meningite: cobre SNC | Max 12g/dia",
        highlight: true,
      },
    ],
    notes:
      "ESCOLHA nos neonatos (substitui ceftriaxona por não deslocar bilirrubina). Doses SNC baseadas em idade gestacional.",
  },
  {
    id: "cefoxitina_ev",
    name: "Cefoxitina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1g + 10mL AD (100mg/mL)",
    dilution: "Max 40mg/mL em SF0,9%",
    infusion: "1 hora",
    calc: (w) => [
      {
        label: "80mg/kg/dia ÷ 3-4×",
        value: `${Math.min((w * 80) / 4, 2000).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: "Max 2g/dose | 6-12g/dia",
        highlight: true,
      },
    ],
    notes:
      "Cefalosporina 2ª geração. Cobre anaeróbios. Alternativa apendicite.",
  },
  {
    id: "ceftazidima_ev",
    name: "Ceftazidima EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 1g + 10mL AD (100mg/mL)",
    dilution: "Max 40mg/mL",
    infusion: "15-30 min",
    calc: (w) => [
      {
        label: "90-150mg/kg/dia ÷ 3×",
        value: `${Math.min((w * 120) / 3, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 6g/dia",
        highlight: true,
      },
      {
        label: "Infecções graves (200-300mg/kg/dia)",
        value: `${Math.min((w * 250) / 3, 4000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 12g/dia",
        highlight: false,
      },
    ],
    notes: "Excelente cobertura de Pseudomonas. ClCr < 50: ajuste necessário.",
  },
  {
    id: "ceftazavib_ev",
    name: "Ceftazidima+Avibactam EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 2,5g + 10mL AD (166,6mg/mL)",
    dilution: "Max 40mg/mL em SF0,9%",
    infusion: "15-60 min",
    calc: (w) => [
      {
        label: "90-150mg/kg/dia ÷ 3× (ceftazidima)",
        value: `${Math.min((w * 120) / 3, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Para KPC e enterobactérias MDR | Max 6g/dia",
        highlight: true,
      },
    ],
    notes:
      "Reservado para CRKP/MDR. Mesmo esquema de ceftazidima. Ajuste renal igual.",
  },
  {
    id: "cefuroxima_evvo",
    name: "Cefuroxima EV/VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "VO: Sol 250mg/5mL (Zinnat) | EV: FA 750mg + 6mL AD",
    dilution: "EV: Max 30mg/mL em SF0,9%",
    infusion: "15-30 min",
    calc: (w) => [
      {
        label: "VO (20-30mg/kg/dia ÷ 2×)",
        value: `${Math.min((w * 25) / 2, 500).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 1g/dia",
        highlight: false,
      },
      {
        label: "EV/IM (100-150mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 125) / 3, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 6g/dia",
        highlight: true,
      },
    ],
    notes:
      "Cefalosporina 2ª geração. IM: não aplicar > 750mg no mesmo sítio muscular.",
  },
  {
    id: "ciprofloxacino_evvo",
    name: "Ciprofloxacino VO/EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "VO: CP 250-750mg | EV: bolsa 2mg/mL",
    dilution: "EV: não diluir (bolsa pronta)",
    infusion: "EV: mínimo 60 min",
    calc: (w) => [
      {
        label: "VO (15mg/kg/dose)",
        value: `${Math.min(w * 15, 500).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 500mg/dose",
        highlight: false,
      },
      {
        label: "EV (10mg/kg/dose)",
        value: `${Math.min(w * 10, 400).toFixed(0)} mg/dose`,
        freq: "8-12h",
        sub: "Max 400mg/dose | bolsa 2mg/mL — infundir em 60 min",
        highlight: true,
      },
    ],
    notes:
      "Fluoroquinolona. Usar com critério em pediatria (risco artropatia). ClCr < 30: 18-24h.",
  },
  {
    id: "claritromicina_ev",
    name: "Claritromicina EV (> 12 anos)",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg — diluir em 250mL SG5%",
    dilution: "Max 2mg/mL em SG5%",
    infusion: "1 hora",
    calc: (_w) => [
      {
        label: "Adulto / > 12 anos: 500mg/dose",
        value: "500 mg/dose",
        freq: "12/12h",
        sub: "Max 1g/dia — usar via VO quando possível",
        highlight: true,
      },
    ],
    notes:
      "EV restrito a > 12 anos. Preferir azitromicina VO. Interações medicamentosas importantes.",
  },
  {
    id: "clindamicina_evvo",
    name: "Clindamicina EV/VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "EV/IM: FA 150mg/mL | VO: CP 300mg",
    dilution: "Max 18mg/mL em SF0,9%, SG5% ou SRL",
    infusion: "10-60 min",
    calc: (w) => [
      {
        label: "EV (20-40mg/kg/dia ÷ 3-4×)",
        value: `${Math.min((w * 30) / 3, 900).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 2,7g/dia | Risco hipotensão se infusão rápida",
        highlight: true,
      },
      {
        label: "VO (10-25mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 20) / 3, 450).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Grave: até 40mg/kg/dia | Max 1800mg/dia",
        highlight: false,
      },
    ],
    notes:
      "Sem ajuste renal. Cobre Gram+ e anaeróbios. Risco de hipotensão se EV rápido.",
  },
  {
    id: "fluconazol_evvo",
    name: "Fluconazol VO/EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Caps 100mg e 150mg | EV: bolsa 2mg/mL",
    dilution: "EV: bolsa pronta — não diluir",
    infusion: "1-2h (se ≥6mg/kg: infundir em 2h, máx 200mg/h)",
    calc: (w) => [
      {
        label: "Ataque — 1º dia (6-12mg/kg)",
        value: `${Math.min(w * 12, 800).toFixed(0)} mg`,
        freq: "dose única de ataque",
        sub: "Max 800mg/dose em infecções graves",
        highlight: true,
      },
      {
        label: "Manutenção (3-12mg/kg/dia)",
        value: `${Math.min(w * 6, 400).toFixed(0)} mg/dia`,
        freq: "24/24h",
        sub: "Max 400mg/dia habitual | ClCr < 50: dose a cada 48h",
        highlight: false,
      },
    ],
    notes:
      "ClCr < 50: dose habitual a cada 48h. Candidíase invasiva: 6-12mg/kg/dia.",
  },
  {
    id: "gentamicina_ev",
    name: "Gentamicina EV/IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 20mg/mL, 40mg/mL ou 80mg/mL",
    dilution: "Max 10mg/mL em SF0,9% ou SG5%",
    infusion: "30-120 min",
    calc: (w) => [
      {
        label: "Convencional (5-7,5mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 6) / 3, 167).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 500mg/dia total",
        highlight: false,
      },
      {
        label: "Dose única diária (DUD) — ≥ 1 mês",
        value: `${Math.min(w * 5, 500).toFixed(0)}-${Math.min(w * 7.5, 500).toFixed(0)} mg/dia`,
        freq: "24/24h",
        sub: "Estratégia dose-dependente | monitorar nível sérico",
        highlight: true,
      },
    ],
    notes:
      "Aminoglicosídeo. Sinérgico com ampicilina (sepse neonatal). NÃO misturar com penicilinas na mesma solução. Ototóxico/nefrotóxico.",
  },
  {
    id: "imipenem_ev",
    name: "Imipenem-Cilastatina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg + 500mg",
    dilution: "Max 5-7mg/mL em SF0,9% ou SG5%",
    infusion: "1 hora",
    calc: (w) => [
      {
        label: "60-100mg/kg/dia ÷ 4×",
        value: `${Math.min((w * 80) / 4, 1000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 4g/dia (infecção grave: até 4g/dia)",
        highlight: true,
      },
    ],
    notes:
      "Carbapenêmico. Reservar para MDR. Não usar em meningite (convulsões). Ajuste renal obrigatório.",
  },
  {
    id: "levofloxacino_ev",
    name: "Levofloxacino EV/VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "EV: bolsa 5mg/mL | CP 250mg, 500mg, 750mg",
    dilution: "EV: bolsa pronta — não diluir",
    infusion: "1-1,5h",
    calc: (w) => [
      {
        label: "< 5 anos: 16-20mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 18) / 2, 375).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 750mg/dia",
        highlight: false,
      },
      {
        label: "≥ 5 anos: 10mg/kg/dose 1×/dia",
        value: `${Math.min(w * 10, 750).toFixed(0)} mg/dia`,
        freq: "24/24h",
        sub: "Max 750mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Fluoroquinolona. Boa para pneumonia resistente, IVU complexa. Ajuste para ClCr.",
  },
  {
    id: "linezolida_ev",
    name: "Linezolida EV/VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "EV: bolsa 2mg/mL | VO — disponível mesma dose",
    dilution: "EV: bolsa pronta — não diluir",
    infusion: "30-120 min",
    calc: (w) => [
      {
        label: "< 12 anos: 10mg/kg/dose ÷ 3×",
        value: `${Math.min(w * 10, 600).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 600mg/dose | 1,2g/dia",
        highlight: true,
      },
      {
        label: "≥ 12 anos: 600mg/dose ÷ 2×",
        value: "600 mg/dose",
        freq: "12/12h",
        sub: "Max 1,2g/dia",
        highlight: false,
      },
    ],
    notes:
      "MRSA, VRSA, MRSE. Sem ajuste renal. Monitorar plaquetas (trombocitopenia).",
  },
  {
    id: "meropenem_ev",
    name: "Meropenem EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg | FA 1000mg + 20mL AD (50mg/mL)",
    dilution: "Max 20mg/mL em SF0,9% ou SG5%",
    infusion: "30 min a 3h (tempo-dependente)",
    calc: (w) => [
      {
        label: "20mg/kg/dose",
        value: `${Math.min(w * 20, 1000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 1g/dose",
        highlight: false,
      },
      {
        label: "MENINGITE — dose dobrada (40mg/kg/dose)",
        value: `${Math.min(w * 40, 2000).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 2g/dose — indicação principal da dose dobrada",
        highlight: true,
      },
    ],
    notes:
      "Carbapenêmico de escolha para SNC (sem risco de convulsão). ClCr 26-50: 12/12h; ClCr 10-25: 50% dose 12/12h; ClCr < 10: 50% dose 24/24h.",
  },
  {
    id: "metronidazol_ev",
    name: "Metronidazol EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Bolsa 5mg/mL (500mL)",
    dilution: "Bolsa pronta — não diluir",
    infusion: "5mL/min (risco flebite)",
    calc: (w) => [
      {
        label: "22,5-40mg/kg/dia ÷ 3-4×",
        value: `${Math.min((w * 30) / 3, 750).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 4g/dia",
        highlight: true,
      },
    ],
    notes: "Cobre anaeróbios (Bacteroides, C. difficile). Bolsa pronta.",
  },
  {
    id: "micafungina_ev",
    name: "Micafungina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 50mg | FA 100mg — dissolver em SF0,9%",
    dilution: "Max 4mg/mL em SF0,9% ou SG5%",
    infusion: "1 hora",
    calc: (w) => {
      const d = w <= 40 ? Math.min(w * 2.5, 150) : 100;
      return [
        {
          label: w <= 40 ? "≤ 40kg: 2-3mg/kg/dose" : "> 40kg: dose fixa 100mg",
          value: `${d.toFixed(0)} mg/dia`,
          freq: "24/24h",
          sub:
            w <= 40
              ? `Max 150mg/dia | pode usar até 3mg/kg`
              : "Pode usar 150mg se necessário",
          highlight: true,
        },
      ];
    },
    notes:
      "Equinocandina. 1ª linha candida invasiva neonatos/imunossuprimidos. Sem ajuste renal.",
  },
  {
    id: "oxacilina_ev",
    name: "Oxacilina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg + 5mL SF0,9% (100mg/mL)",
    dilution: "Max 10mg/mL em SF0,9% ou SG5%",
    infusion: "15-30 min",
    calc: (w) => [
      {
        label: "100-200mg/kg/dia ÷ 4-6×",
        value: `${Math.min((w * 150) / 4, 2000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 12g/dia",
        highlight: true,
      },
    ],
    notes:
      "Anti-MSSA de escolha. Sem ajuste renal. Celulite, osteomielite, artrite séptica.",
  },
  {
    id: "penicilinag_benzatina_im",
    name: "Penicilina G Benzatina IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 600.000 UI | FA 1.200.000 UI",
    dilution: "—",
    infusion: "IM exclusivo",
    calc: (w) => [
      {
        label:
          w <= 27
            ? "≤ 27kg — Faringite / Impetigo"
            : "> 27kg — Faringite / Impetigo",
        value: w <= 27 ? "600.000 UI" : "1.200.000 UI",
        freq: "dose única IM",
        sub:
          w <= 27
            ? "FA 600.000 UI — dose única"
            : "FA 1.200.000 UI — dose única",
        highlight: true,
      },
      {
        label:
          w <= 27
            ? "≤ 27kg — Febre reumática (profilaxia secundária)"
            : "> 27kg — Febre reumática (profilaxia secundária)",
        value: w <= 27 ? "600.000 UI" : "1.200.000 UI",
        freq: "a cada 3 semanas IM",
        sub: "Profilaxia secundária febre reumática",
        highlight: false,
      },
    ],
    notes:
      "NUNCA EV. Sífilis congênita: 50.000 UI/kg IM dose única. Sem ajuste renal.",
  },
  {
    id: "penicilinag_cristalina_ev",
    name: "Penicilina G Cristalina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 5.000.000 UI + 8mL AD (500.000 UI/mL)",
    dilution: "> 1 ano: max 100.000 UI/mL | < 1 ano: 25.000 UI/mL",
    infusion: "15-60 min",
    calc: (w) => [
      {
        label: "Infecções gerais (100-300.000 UI/kg/dia ÷ 4-6×)",
        value: `${Math.min((w * 150000) / 4, 4000000).toFixed(0)} UI/dose`,
        freq: "6/6h",
        sub: "Max 24.000.000 UI/dia",
        highlight: false,
      },
      {
        label: "SNC / Meningite (300-400.000 UI/kg/dia ÷ 4-6×)",
        value: `${Math.min((w * 350000) / 6, 4000000).toFixed(0)} UI/dose`,
        freq: "4/4h",
        sub: "Max 4.000.000 UI/dose | 24.000.000 UI/dia",
        highlight: true,
      },
    ],
    notes:
      "GBS, Streptococcus pneumoniae sensível, Treponema pallidum. Sífilis congênita EV: 50.000 UI/kg/dose.",
  },
  {
    id: "penicilina_v_vo",
    name: "Penicilina V (Pen-Ve-Oral) VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 400.000 UI/5mL | CP 500.000 UI",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "25-50mg/kg/dia ÷ 4× (400.000 UI = 250mg)",
        value: `${Math.min((w * 37) / 4, 500).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 2g/dia | equivale a 640.000 UI/dose máx",
        highlight: true,
      },
    ],
    notes:
      "Faringite estreptocócica, profilaxia febre reumática VO. 400.000 UI = 250mg.",
  },
  {
    id: "pip_tazo_ev",
    name: "Piperacilina-Tazobactam EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 2,5g | FA 4,5g",
    dilution: "Max 200mg/mL em SF0,9%",
    infusion: "30 min a 2h",
    calc: (w) => [
      {
        label: "240-300mg/kg/dia ÷ 3-4× (piperacilina)",
        value: `${Math.min((w * 300) / 4, 4000).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: "Max 16g/dia habitual | Fibrose cística: 240-400mg/kg/dia",
        highlight: true,
      },
    ],
    notes:
      "Amplo espectro incluindo Pseudomonas. ClCr > 39: sem ajuste. ClCr 20-39: 8/8h. ClCr < 20: 12/12h.",
  },
  {
    id: "polimixina_b_ev",
    name: "Polimixina B EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500.000 UI (50mg) + 10mL SF0,9% (50.000 UI/mL)",
    dilution: "Max 1663 UI/mL em SG5%",
    infusion: "60-90 min",
    calc: (w) => [
      {
        label: "25.000-30.000 UI/kg/dia ÷ 2×",
        value: `${Math.min((w * 27500) / 2, 1000000).toFixed(0)} UI/dose`,
        freq: "12/12h",
        sub: `≈ ${((Math.min((w * 27500) / 2, 1000000) / 50000) * 1).toFixed(2)}mg/dose | Max 2.000.000 UI/dia`,
        highlight: true,
      },
    ],
    notes:
      "Reservado Gram- XDR (KPC). Nefrotóxico. Monitorar função renal diariamente.",
  },
  {
    id: "teicoplanina_evim",
    name: "Teicoplanina EV/IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 200mg | FA 400mg + 3mL diluente próprio (133mg/mL)",
    dilution: "Max 10mg/mL em SF0,9%, SG5% ou SG10%",
    infusion: "30 min",
    calc: (w) => {
      const age_group = "2m-12a"; // padrão
      return [
        {
          label: "Ataque: 2m-12a — 10mg/kg/dose × 3 doses",
          value: `${Math.min(w * 10, 400).toFixed(0)} mg/dose`,
          freq: "12/12h (3 doses de ataque)",
          sub: "Max 400mg/dose",
          highlight: true,
        },
        {
          label: "Manutenção: 6-10mg/kg/dia (a partir 4ª dose)",
          value: `${Math.min(w * 8, 400).toFixed(0)} mg/dia`,
          freq: "24/24h",
          sub: "ClCr 40-60: 1 dose a cada 48h | ClCr < 40: 1 dose a cada 72h",
          highlight: false,
        },
        {
          label: "< 2 meses: 16mg/kg/dia (1º dia)",
          value: `${Math.min(w * 16, 400).toFixed(0)} mg`,
          freq: "dose única no D1, depois 8mg/kg/dia",
          sub: "Max 400mg/dia",
          highlight: false,
        },
      ];
    },
    notes:
      "Glicopeptídeo. Alternativa à vancomicina (menos nefrotóxica). Reduzir dose a partir do 4º dia se ClCr alterado.",
  },
  {
    id: "vancomicina_ev",
    name: "Vancomicina EV",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg | FA 1g — diluir em AD",
    dilution: "Max 5mg/mL em SF0,9% ou SG5%",
    infusion: "Mínimo 1h | Máx 10mg/min",
    calc: (w) => [
      {
        label: "40-60mg/kg/dia ÷ 3-4×",
        value: `${Math.min((w * 50) / 4, 1000).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: "Max 4g/dia | Correr LENTO (risco síndrome do homem vermelho)",
        highlight: true,
      },
    ],
    notes:
      "MRSA, enterococo. ClCr 30-50: 12/12h | ClCr 10-29: 18-24h | ClCr < 10: monitorar nível sérico. Meta: nível vale 10-20mg/L (MRSA: 15-20).",
  },

  // ══════════════════════════════════════════════════
  //  ANTIVIRAIS
  // ══════════════════════════════════════════════════
  {
    id: "aciclovir_ev",
    name: "Aciclovir EV",
    category: "antivirais",
    color: "#06B6D4",
    inputType: "weight",
    presentation: "FA 250mg + 10mL AD (25mg/mL)",
    dilution: "Max 7mg/mL em SF0,9% ou SG5%",
    infusion: "1 hora",
    calc: (w) => [
      {
        label: "HSV — 3 meses a 12 anos (10-15mg/kg/dose)",
        value: `${Math.min(w * 12, 500).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Pele/mucosa: 14 dias | Disseminado/SNC: 21 dias",
        highlight: true,
      },
      {
        label: "HSV — > 12 anos / Herpes Zóster",
        value: `${Math.min(w * 10, 500).toFixed(0)} mg/dose`,
        freq: "8/8h por 7-14 dias",
        sub: "Imunocompetente: 7-10 dias | Imunocomprometido: até resolução",
        highlight: false,
      },
      {
        label: "Varicela-Zóster — pediátrico",
        value: `${Math.min(w * 10, 500).toFixed(0)} mg/dose`,
        freq: "8/8h por 10-14 dias",
        sub: "",
        highlight: false,
      },
    ],
    notes:
      "Ajuste renal obrigatório (ClCr < 50). Hidratação adequada para evitar cristalização renal.",
  },
  {
    id: "ganciclovir_ev",
    name: "Ganciclovir EV",
    category: "antivirais",
    color: "#06B6D4",
    inputType: "weight",
    presentation: "Bolsa 1mg/mL (250mL)",
    dilution: "Pronto para uso",
    infusion: "1 hora",
    calc: (w) => [
      {
        label: "CMV congênito — neonato: 6mg/kg/dose",
        value: `${Math.min(w * 6, 300).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Duração: 6 semanas | Monitorar hemograma",
        highlight: true,
      },
      {
        label: "CMV sintomático — indução: 5mg/kg/dose",
        value: `${Math.min(w * 5, 250).toFixed(0)} mg/dose`,
        freq: "12/12h por 2-3 semanas",
        sub: "Pode aumentar para 7,5mg/kg/dose",
        highlight: false,
      },
      {
        label: "Manutenção (profilaxia secundária)",
        value: `${Math.min(w * 5, 250).toFixed(0)} mg/dia`,
        freq: "5-7 dias/semana",
        sub: "Duração indeterminada em HIV/AIDS até CD4 adequado",
        highlight: false,
      },
    ],
    notes:
      "CMV congênito, CMV em imunossuprimido. Mielotóxico. Monitorar Hb e neutrófilos.",
  },
  {
    id: "oseltamivir_vo",
    name: "Oseltamivir VO (Tamiflu)",
    category: "antivirais",
    color: "#06B6D4",
    inputType: "weight",
    presentation: "Caps 30mg, 45mg, 75mg | Sol 15mg/mL (reconstituição)",
    dilution: "Sol: diluir cápsula em água (30mg/2mL, 45mg/3mL, 75mg/5mL)",
    infusion: "VO",
    calc: (w) => {
      let dose_tto, dose_prof;
      if (w <= 15) {
        dose_tto = "30mg";
        dose_prof = "30mg";
      } else if (w <= 23) {
        dose_tto = "45mg";
        dose_prof = "45mg";
      } else if (w <= 40) {
        dose_tto = "60mg";
        dose_prof = "60mg";
      } else {
        dose_tto = "75mg";
        dose_prof = "75mg";
      }
      return [
        {
          label: `Tratamento (${dose_tto}/dose) — 5 dias`,
          value: `${dose_tto}/dose`,
          freq: "12/12h por 5 dias",
          sub: `Peso ${w}kg — ${w <= 15 ? "≤15kg" : w <= 23 ? "15-23kg" : w <= 40 ? "23-40kg" : ">40kg"}`,
          highlight: true,
        },
        {
          label: `Profilaxia (${dose_prof}/dose) — 10 dias`,
          value: `${dose_prof}/dia`,
          freq: "1× ao dia por 10 dias",
          sub: "Iniciar dentro de 48h da exposição",
          highlight: false,
        },
      ];
    },
    notes:
      "Influenza A e B. Eficaz se iniciado até 48h dos sintomas. Lactentes < 1 ano: 3mg/kg/dose. Profilaxia não recomendada rotineiramente < 3 meses.",
  },

  // ══════════════════════════════════════════════════
  //  ANTIPARASITÁRIOS
  // ══════════════════════════════════════════════════
  {
    id: "albendazol_vo",
    name: "Albendazol VO",
    category: "antiparasitarios",
    color: "#84CC16",
    inputType: "weight",
    presentation: "Susp 400mg/10mL | CP 400mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: w >= 2 ? "> 2 anos: 400mg/dia" : "1-2 anos: 200mg/dia",
        value: w >= 2 ? "400 mg/dia" : "200 mg/dia",
        freq: "1× ao dia por 3-5 dias",
        sub:
          w >= 2
            ? "10mL ou 1 comprimido | Giardíase: 5 dias"
            : "5mL | Avaliar risco-benefício < 2 anos",
        highlight: true,
      },
    ],
    notes:
      "Geo-helmintos (Áscaris, Tricúris, Ancilostomídeos, Enterobíase). Larva migrans visceral: 5 dias. Teratogênico — evitar < 1 ano.",
  },
  {
    id: "ivermectina_vo",
    name: "Ivermectina VO (> 5 anos / > 15kg)",
    category: "antiparasitarios",
    color: "#84CC16",
    inputType: "weight",
    presentation: "CP 6mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => {
      const dose_estro = Math.round((w * 0.2) / 6) * 6;
      const dose_onco = Math.round((w * 0.15) / 6) * 6;
      return [
        {
          label: "Estrongiloidíase / Escabiose (200mcg/kg)",
          value: `${Math.min(dose_estro, 24)} mg`,
          freq: "dose única (escabiose: repetir em 1-2 sem)",
          sub: `${(Math.min(dose_estro, 24) / 6).toFixed(1)} comprimidos de 6mg`,
          highlight: true,
        },
        {
          label: "Oncocercose (150mcg/kg)",
          value: `${Math.min(dose_onco, 18)} mg`,
          freq: "dose única",
          sub: `${(Math.min(dose_onco, 18) / 6).toFixed(1)} comprimidos de 6mg`,
          highlight: false,
        },
      ];
    },
    notes:
      "≥ 5 anos e > 15kg (off-label < 15kg com EAs < 15%). Tomar em jejum. Ascaridíase, filariose também.",
  },
  {
    id: "mebendazol_vo",
    name: "Mebendazol VO (> 2 anos)",
    category: "antiparasitarios",
    color: "#84CC16",
    inputType: "weight",
    presentation: "Susp 100mg/5mL | CP 100mg",
    dilution: "—",
    infusion: "VO",
    calc: (_w) => [
      {
        label: "Geo-helmintos (dose fixa)",
        value: "100 mg/dose",
        freq: "12/12h por 3 dias",
        sub: "5mL susp ou 1 comprimido 12/12h por 3 dias | Larva migrans: 5 dias",
        highlight: true,
      },
    ],
    notes:
      "Dose fixa (não por peso). < 1 ano: contraindicado. 1-2 anos: avaliar. Enterobíase: dose única 100mg.",
  },
  {
    id: "nitazoxanida_vo",
    name: "Nitazoxanida VO (Annita) (≥ 1 ano)",
    category: "antiparasitarios",
    color: "#84CC16",
    inputType: "weight",
    presentation: "Susp 20mg/mL (fco 45mL e 100mL) | CP 500mg (≥ 12 anos)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => {
      const vol = Math.min(w * 0.375, 15).toFixed(1);
      return [
        {
          label: "7,5mg/kg/dose (≥ 1 ano)",
          value: `${Math.min(w * 7.5, 500).toFixed(0)} mg/dose`,
          freq: "12/12h por 3 dias",
          sub: `Sol 20mg/mL: ${vol}mL/dose | Regra: Peso × 0,375 mL | Max 15mL/dose`,
          highlight: true,
        },
        {
          label: "≥ 12 anos: dose fixa",
          value: "500 mg/dose",
          freq: "12/12h por 3 dias",
          sub: "1 comprimido 12/12h",
          highlight: false,
        },
      ];
    },
    notes:
      "Giardíase, criptosporidiose, amebíase. Criptosporidiose em imunocomprometido com CD4 < 50: 8 semanas.",
  },
  {
    id: "secnidazol_vo",
    name: "Secnidazol VO",
    category: "antiparasitarios",
    color: "#84CC16",
    inputType: "weight",
    presentation:
      "Susp pó 450mg/15mL ou 900mg/30mL (30mg/mL) | CP 500mg e 1000mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Amebíase / Giardíase (30mg/kg — dose única)",
        value: `${Math.min(w * 30, 2000).toFixed(0)} mg`,
        freq: "dose única",
        sub: `Regra: ${Math.min(w, 67).toFixed(0)} mL da susp 30mg/mL | Max 2g/dia`,
        highlight: true,
      },
      {
        label: "Amebíase hepática",
        value: `${Math.min(w * 30, 2000).toFixed(0)} mg/dia`,
        freq: "1× ao dia por 5-7 dias",
        sub: "Max 2g/dia",
        highlight: false,
      },
    ],
    notes:
      "Dose única na giardíase. Amebíase hepática: 5-7 dias. Vaginose bacteriana adolescentes: 2g dose única.",
  },

  // ══════════════════════════════════════════════════
  //  ANALGÉSICOS — complemento
  // ══════════════════════════════════════════════════
  {
    id: "cetoprofeno_evvo",
    name: "Cetoprofeno VO/EV",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation: "Gotas 20mg/mL (1mg/gota) | EV: FA 50mg/mL",
    dilution: "EV: 50-100mL SF0,9%",
    infusion: "EV: 30 min",
    calc: (w) => [
      {
        label: "VO 1-6 anos (1mg/kg/dose)",
        value: `${Math.min(w * 1, 25).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: `Regra: 1 gota/kg/dose | Max 300mg/dia`,
        highlight: false,
      },
      {
        label: "VO 7-11 anos",
        value: "25 mg/dose",
        freq: "6-8h",
        sub: "25 gotas/dose | Max 300mg/dia",
        highlight: false,
      },
      {
        label: "VO > 11 anos",
        value: "50 mg/dose",
        freq: "6-8h",
        sub: "50 gotas/dose | Max 300mg/dia",
        highlight: false,
      },
      {
        label: "EV (1mg/kg/dose — max 2mL/dose)",
        value: `${Math.min(w * 1, 100).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: `EV: ${Math.min((w * 1) / 50, 2).toFixed(2)}mL do FA 50mg/mL | Diluir em 50-100mL SF0,9%`,
        highlight: true,
      },
    ],
    notes:
      "AINE. Não usar < 1 ano. Max 10 dias. Evitar em asma aspirina-sensível.",
  },
  {
    id: "cetorolaco_evim",
    name: "Cetorolaco EV/IM",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation: "FA 30mg/mL | CP sublingual 10mg",
    dilution: "Bolus sem diluição (ou SF0,9%)",
    infusion: "Mínimo 15 segundos (bolus)",
    calc: (w) => [
      {
        label: "≥ 2 anos: 0,5-1mg/kg/dose EV/IM",
        value: `${Math.min(w * 0.75, 30).toFixed(1)} mg/dose`,
        freq: "6-8h",
        sub: `Max 60mg/dia | Uso máx 5 dias`,
        highlight: true,
      },
    ],
    notes:
      "AINE parenteral potente. Máximo 5 dias. Boa analgesia pós-operatória. Não usar < 2 anos.",
  },

  // ══════════════════════════════════════════════════
  //  ANTI-HISTAMÍNICOS — complemento
  // ══════════════════════════════════════════════════
  {
    id: "fexofenadina_vo",
    name: "Fexofenadina (Allegra) VO",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Sol 6mg/mL | CP 60mg, 120mg, 180mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      const m = a * 12;
      if (m < 6)
        return [
          {
            label: "< 6 meses: dose personalizada",
            value: "Consultar especialista",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (m < 12)
        return [
          {
            label: "6-11m < 10,5kg: 15mg 12/12h",
            value: "15 mg/dose",
            freq: "12/12h",
            sub: "2,5mL sol 6mg/mL",
            highlight: true,
          },
          {
            label: "6-11m ≥ 10,5kg: 30mg 12/12h",
            value: "30 mg/dose",
            freq: "12/12h",
            sub: "5mL sol 6mg/mL",
            highlight: false,
          },
        ];
      if (a < 12)
        return [
          {
            label: "2-11 anos: 30mg/dose",
            value: "30 mg/dose",
            freq: "12/12h",
            sub: "5mL sol 6mg/mL",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 12 anos: 60mg 12/12h ou 120mg 1×",
          value: "60-120 mg/dose",
          freq: "12/12h ou 1×/dia",
          sub: "Max 180mg/dia",
          highlight: true,
        },
      ];
    },
    notes:
      "Não sedante. 2ª geração. Sem ajuste renal significativo (exceto extremos).",
  },
  {
    id: "ebastina_vo",
    name: "Ebastina (Ebastel) VO",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Sol 1mg/mL | CP 10mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      if (a < 2)
        return [
          {
            label: "< 2 anos",
            value: "Não recomendado",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (a < 6)
        return [
          {
            label: "2-5 anos: 2,5mg 1×/dia",
            value: "2,5 mg/dia",
            freq: "1×/dia",
            sub: "2,5mL sol 1mg/mL",
            highlight: true,
          },
        ];
      if (a < 12)
        return [
          {
            label: "6-11 anos: 5mg 1×/dia",
            value: "5 mg/dia",
            freq: "1×/dia",
            sub: "5mL sol 1mg/mL ou ½ cp",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 12 anos: 10mg 1×/dia",
          value: "10 mg/dia",
          freq: "1×/dia",
          sub: "10mL sol ou 1 cp",
          highlight: true,
        },
      ];
    },
    notes: "Não sedante. 1× ao dia. Boa tolerabilidade.",
  },
  {
    id: "bilastina_vo",
    name: "Bilastina (Alektos Ped) VO",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Sol 2,5mg/mL (AlektosPed) | CP 10mg e 20mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      if (a < 4)
        return [
          {
            label: "< 4 anos",
            value: "Sem dados de segurança",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (a < 12)
        return [
          {
            label: "4-11 anos ≥ 16kg: 10mg 1×/dia",
            value: "10 mg/dia",
            freq: "1×/dia",
            sub: "4mL sol 2,5mg/mL | Tomar em jejum (30min antes da refeição)",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 12 anos: 20mg 1×/dia",
          value: "20 mg/dia",
          freq: "1×/dia",
          sub: "1 cp 20mg | tomar em jejum",
          highlight: true,
        },
      ];
    },
    notes:
      "Não sedante. Tomar em jejum (30min antes ou 2h após refeição). Sem ajuste renal.",
  },
  {
    id: "adrenalina_anafilaxia",
    name: "Adrenalina IM — Anafilaxia",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "weight",
    presentation: "FA 1mg/mL (1:1000)",
    dilution: "Usar puro IM",
    infusion: "IM — músculo vasto lateral",
    calc: (w) => {
      const dose = Math.min(w * 0.01, 0.5);
      const dose_fixa =
        w < 0.5 * 12
          ? "0,15mg"
          : w < 0.5 * 20
            ? "0,15mg"
            : w < 0.5 * 30
              ? "0,3mg"
              : "0,5mg";
      return [
        {
          label: "0,01mg/kg IM — dose calculada",
          value: `${dose.toFixed(3)} mg`,
          freq: "Pode repetir a cada 5-15 min — máx 3×",
          sub: `${dose.toFixed(3)}mL da FA 1mg/mL | Max 0,5mg`,
          highlight: true,
        },
        {
          label: "Dose fixa por faixa etária",
          value: dose_fixa,
          freq: "Repetir se necessário",
          sub: "< 6m: 0,1-0,15mg | 6m-6a: 0,15mg | 6-12a: 0,3mg | > 12a: 0,5mg",
          highlight: false,
        },
      ];
    },
    notes:
      "1ª LINHA anafilaxia. SEMPRE IM vasto lateral externo. NUNCA atrasar. Posicionar em DDH. Corticoide e anti-H1 são adjuvantes, não substituem adrenalina.",
  },

  // ══════════════════════════════════════════════════
  //  DROGAS TGI — complemento
  // ══════════════════════════════════════════════════
  {
    id: "bromoprida_evvo",
    name: "Bromoprida VO/EV",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Gotas 4mg/mL (1gt ≈ 0,17mg) | FA 5mg/mL",
    dilution: "EV: + 20mL AD ou SF0,9%",
    infusion: "EV lento",
    calc: (w) => [
      {
        label: "0,5-1mg/kg/dia ÷ 3×",
        value: `${Math.min((w * 0.75) / 3, 20).toFixed(1)} mg/dose`,
        freq: "8/8h",
        sub: `Max 60mg/dia | VO: 1 gota/kg/dose (4mg/mL)`,
        highlight: true,
      },
      {
        label: "EV: 0,03 × Peso por dose",
        value: `${(w * 0.03).toFixed(2)} mL/dose (5mg/mL)`,
        freq: "8/8h",
        sub: "Diluir em 20mL AD ou SF0,9% | Fazer lento",
        highlight: false,
      },
    ],
    notes: "Pró-cinético. Max 60mg/dia. Risco extrapiramidal (distonia).",
  },
  {
    id: "dimenidrinato",
    name: "Dimenidrinato (Dramin) VO/EV",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "FA 50mg/mL | CP 100mg | Gotas 25mg/mL (1mg/gota)",
    dilution: "EV: diluir em SF0,9%",
    infusion: "EV lento",
    calc: (w) => [
      {
        label: "VO: 1-1,5mg/kg/dose (2-12 anos)",
        value: `${Math.min(w * 1.25, 25).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: `Max 25mg/dose | Gotas: 1 gota/kg/dose (1mg/gt) | Max 150mg/dia`,
        highlight: false,
      },
      {
        label: "EV: 0,5mg/kg/dose",
        value: `${Math.min(w * 0.5, 25).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: `Max 25mg/dose EV | ${(Math.min(w * 0.5, 25) / 50).toFixed(2)}mL do FA 50mg/mL`,
        highlight: true,
      },
    ],
    notes: "Antiemético/antivertiginoso. Sedante. 2-12 anos.",
  },
  {
    id: "escopolamina_evvo",
    name: "Escopolamina (Buscopan Simples) VO/EV",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Gotas 10mg/mL (0,5mg/gt) | CP 10mg | FA 20mg/mL",
    dilution: "EV: diluir em SF0,9% ou SG5%",
    infusion: "EV: 5 min",
    calc: (w) => [
      {
        label: "VO 1-6 anos (evitar — evitar lactentes)",
        value: "5-10 gotas/dose",
        freq: "8/8h",
        sub: "0,5-1mg/dose | Evitar em lactentes",
        highlight: false,
      },
      {
        label: "VO 7-14 anos",
        value: "10-20 gotas/dose",
        freq: "8/8h",
        sub: "1-2mg/dose",
        highlight: false,
      },
      {
        label: "EV/IM: 0,3-0,6mg/kg/dose",
        value: `${Math.min(w * 0.45, 15).toFixed(1)} mg/dose`,
        freq: "8-24h",
        sub: `Max 1,5mg/kg/dia | ${(Math.min(w * 0.45, 15) / 20).toFixed(2)}mL do FA 20mg/mL`,
        highlight: true,
      },
    ],
    notes:
      "Anticolinérgico. Espasmo intestinal/renal/biliar. Evitar lactentes. EV lento em 5 min.",
  },
  {
    id: "escopolamina_dipirona_evvo",
    name: "Escopolamina + Dipirona (Buscopan Composto)",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Gotas 6,67+333,4mg/mL | FA 4mg/mL + 500mg/mL",
    dilution: "EV: fazer lento (5 min)",
    infusion: "EV lento (5 min) — max 5mL/dose",
    calc: (w) => [
      {
        label: "VO 1-3 anos (evitar): 5-7 gotas/dose",
        value: "5-7 gotas",
        freq: "6/6h",
        sub: "Evitar em lactentes",
        highlight: false,
      },
      {
        label: "VO 3-6 anos (evitar): 7-12 gotas/dose",
        value: "7-12 gotas",
        freq: "6/6h",
        sub: "",
        highlight: false,
      },
      {
        label: "VO > 6 anos: 13-20 gotas/dose",
        value: "13-20 gotas",
        freq: "6/6h",
        sub: "",
        highlight: false,
      },
      {
        label: "EV: 0,03 × Peso mL/dose",
        value: `${Math.min(w * 0.03, 5).toFixed(2)} mL/dose`,
        freq: "6/6h",
        sub: "Max 5mL/dose | Fazer LENTO em 5 min",
        highlight: true,
      },
    ],
    notes:
      "Combinação anticolinérgico + analgésico. EV SEMPRE lento (5 min) — hipotensão se rápido.",
  },
  {
    id: "esomeprazol_vo",
    name: "Esomeprazol VO",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "CP 20mg e 40mg | Ésio (único IBP diluível)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "< 20kg: 10mg/dia",
        value: "10 mg/dia",
        freq: "1× ao dia",
        sub: "Ésio: único esomeprazol que pode ser diluído",
        highlight: w < 20,
      },
      {
        label: "> 20kg: 20mg/dia",
        value: "20 mg/dia",
        freq: "1× ao dia",
        sub: "Max 40mg/dia",
        highlight: w >= 20,
      },
    ],
    notes:
      "IBP. 0,7-3,3mg/kg/dia. Ésio: única apresentação diluível (pode usar via sonda).",
  },
  {
    id: "simeticona_vo",
    name: "Simeticona (Luftal) VO",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "age",
    presentation: "Gotas 75mg/mL (Luftal 3mg/gota)",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      if (a < 2)
        return [
          {
            label: "< 2 anos: 5 gotas/dose",
            value: "5 gotas",
            freq: "até 6/6h",
            sub: "Max 80 gotas/dia (Luftal)",
            highlight: true,
          },
        ];
      if (a < 12)
        return [
          {
            label: "2-12 anos: 10 gotas/dose",
            value: "10 gotas",
            freq: "até 6/6h",
            sub: "Max 160 gotas/dia (Luftal)",
            highlight: true,
          },
        ];
      return [
        {
          label: "> 12 anos: 10-30 gotas/dose",
          value: "10-30 gotas",
          freq: "até 6/6h",
          sub: "Max 167 gotas/dia",
          highlight: true,
        },
      ];
    },
    notes:
      "Antiflatulento. Dose por faixa etária. Prático: 1mg/kg/dose (Luftal 3mg/gota).",
  },
  {
    id: "racecadotrila_vo",
    name: "Racecadotrila (Tiorfan) VO",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Sachê 10mg e 30mg | CP 100mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "1,5mg/kg/dose (≥ 3 meses)",
        value: `${Math.min(w * 1.5, 100).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Suspender assim que cessar diarreia | Max adulto 400mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Inibidor encefalinase. Adjuvante diarreia aguda. Não usar < 3 meses. Suspender com cessação da diarreia.",
  },
  {
    id: "peg_vo",
    name: "Polietilenoglicol — PEG (Muvinlax/Peglax)",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Sachê 17g (Muvinlax/Peglax) | Sachê 8,5g (Peglax mini)",
    dilution: "Dissolver em 120-240mL de água",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Desimpactação (1-1,5g/kg/dia — 3-6 dias)",
        value: `${Math.min(w * 1.2, 100).toFixed(0)} g/dia`,
        freq: "1× ao dia por 3-6 dias",
        sub: `≈ ${(Math.min(w * 1.2, 100) / 17).toFixed(1)} sachês de 17g | Max 100g/dia`,
        highlight: true,
      },
      {
        label: "Manutenção constipação (0,4-1g/kg/dia)",
        value: `${Math.min(w * 0.7, 17).toFixed(0)} g/dia`,
        freq: "1× ao dia",
        sub: "Max 17g/dia | Manter ≥ 2 meses pós-desimpactação",
        highlight: false,
      },
    ],
    notes:
      "Laxativo osmótico. 1ª escolha constipação crônica funcional pediátrica (SBP). Desimpactação: 1-1,5g/kg/dia por 3-6 dias.",
  },
  {
    id: "ursacol_vo",
    name: "Ácido Ursodesoxicólico (Ursacol) VO",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "CP 50mg, 150mg e 300mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Atresia biliar pós-Kasai (10-20mg/kg/dia ÷ 2×)",
        value: `${Math.min(w * 15, 600).toFixed(0)} mg/dia`,
        freq: "12/12h",
        sub: "Max 600mg/dia | Pode usar via SNE",
        highlight: false,
      },
      {
        label: "Fibrose cística (20mg/kg/dia)",
        value: `${Math.min(w * 20, 600).toFixed(0)} mg/dia`,
        freq: "12/12h",
        sub: "Inicial — Max 600mg/dia",
        highlight: false,
      },
      {
        label: "Colestase por NPT (30mg/kg/dia ÷ 3×)",
        value: `${Math.min(w * 10, 200).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 600mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Ácido biliar. Hepatoprotetor. Max 600mg/dia. Pode ser dado via sonda.",
  },

  // ══════════════════════════════════════════════════
  //  BRONCODILATADORES — complemento
  // ══════════════════════════════════════════════════
  {
    id: "salbutamol_nbz",
    name: "Salbutamol NBZ",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "Sol 5mg/mL (prod descontinuada) | Aerolin spray",
    dilution: "Diluir em 2mL SF0,9%",
    infusion: "Nebulização",
    calc: (w) => [
      {
        label: "< 12 anos: 2,5-5mg/dose",
        value: `${w < 20 ? "2,5" : "5"} mg/dose`,
        freq: "20/20min (resgate agudo)",
        sub: `${w < 20 ? "0,5mL" : "1mL"} + 2mL SF0,9% | Max 10mg/dose`,
        highlight: true,
      },
      {
        label: "> 12 anos: 5mg/dose",
        value: "5 mg/dose",
        freq: "20/20min (resgate)",
        sub: "1mL + 2mL SF0,9% | Max 10mg/dose",
        highlight: false,
      },
    ],
    notes:
      "β2 agonista de curta ação. Pós-melhora: nebulizar 2/2h. Solução descontinuada — usar spray com espaçador.",
  },
  {
    id: "terbutalina_scim",
    name: "Terbutalina SC/IM",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "Amp 0,5mg/mL",
    dilution: "Diluir para 1mg/mL",
    infusion: "SC ou IM",
    calc: (w) => [
      {
        label: "0,01mg/kg/dose SC/IM",
        value: `${Math.min(w * 0.01, 0.4).toFixed(3)} mg/dose`,
        freq: "a cada 20 min — máx 3 doses",
        sub: `${(Math.min(w * 0.01, 0.4) / 0.5).toFixed(3)}mL da amp 0,5mg/mL | Max 0,4mg/dose`,
        highlight: true,
      },
    ],
    notes:
      "β2-agonista sistêmico. Broncoespasmo grave sem acesso EV. EA: hipertensão, náusea, vômito.",
  },
  {
    id: "adrenalina_nbz",
    name: "Adrenalina NBZ — Crupe",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "FA 1mg/mL (1:1000 — puro)",
    dilution: "Pode ou não diluir com igual vol SF0,9%",
    infusion: "Nebulização",
    calc: (w) => [
      {
        label: "0,5mL/kg/dose — crupe grave",
        value: `${Math.min(w * 0.5, 5).toFixed(1)} mL`,
        freq: "dose única (pode repetir com monitorização)",
        sub: `Max 5mL | Regra: Peso/2 em mL | Usar puro ou + SF0,9%`,
        highlight: true,
      },
    ],
    notes:
      "Crupe grave com estridor em repouso. SEMPRE combinar com dexametasona. Efeito transitório (2h) — monitorizar rebound.",
  },

  // ══════════════════════════════════════════════════
  //  SEDAÇÃO / ISR — complemento
  // ══════════════════════════════════════════════════
  {
    id: "atropina_isrpre",
    name: "Atropina EV (Pré-ISR)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 0,25mg/mL | FA 0,5mg/mL",
    dilution: "Pode ser feito puro",
    infusion: "EV bolus",
    calc: (w) => [
      {
        label: "0,01-0,02mg/kg EV — pré-ISR",
        value: `${Math.max(Math.min(w * 0.02, 1), 0.1).toFixed(2)} mg`,
        freq: "dose única pré-ISR",
        sub: `Regra: 0,04mL/kg | Min 0,1mg — Max 1mg | ${(Math.max(Math.min(w * 0.02, 1), 0.1) / 0.5).toFixed(3)}mL do FA 0,5mg/mL`,
        highlight: true,
      },
    ],
    notes:
      "INDICAÇÕES: < 1 ano (sempre com succinilcolina). 1-5 anos em uso de succinilcolina. > 5 anos com 2ª dose de succinilcolina. Previne bradicardia vagal.",
  },
  {
    id: "lidocaina_isrpre",
    name: "Lidocaína EV (Pré-ISR)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 10mg/mL (1%) | FA 20mg/mL (2%)",
    dilution: "Pode ser feito puro",
    infusion: "EV bolus",
    calc: (w) => [
      {
        label: "1-2mg/kg EV — pré-ISR",
        value: `${Math.min(w * 1.5, 150).toFixed(0)} mg`,
        freq: "dose única",
        sub: `${(Math.min(w * 1.5, 150) / 10).toFixed(1)}mL do FA 1% (10mg/mL)`,
        highlight: true,
      },
    ],
    notes:
      "INDICAÇÃO: HIC (reduz PIC), hipertensão reativa, TCE. Dose alta causa depressão miocárdica.",
  },
  {
    id: "etomidato_ev",
    name: "Etomidato EV (ISR)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 2mg/mL",
    dilution: "Pode ser feito puro",
    infusion: "EV bolus",
    calc: (w) => [
      {
        label: "0,2-0,4mg/kg EV — ISR",
        value: `${Math.min(w * 0.3, 20).toFixed(1)} mg`,
        freq: "dose única bolus ISR",
        sub: `${(Math.min(w * 0.3, 20) / 2).toFixed(1)}mL do FA 2mg/mL`,
        highlight: true,
      },
    ],
    notes:
      "ISR: TCE (neuroprotetor), hipotensão (mínima depressão cardiovascular). EVITAR em sepse/choque séptico (suprime cortisol). Risco vômitos.",
  },
  {
    id: "propofol_ev",
    name: "Propofol EV (ISR / Status)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 10mg/mL ou 20mg/mL",
    dilution: "Pode ser feito puro",
    infusion: "EV bolus ou BIC",
    calc: (w) => [
      {
        label: "Indução ISR (1-2mg/kg)",
        value: `${Math.min(w * 1.5, 150).toFixed(0)} mg`,
        freq: "dose única bolus",
        sub: `${(Math.min(w * 1.5, 150) / 10).toFixed(1)}mL do FA 10mg/mL | Hipotensor`,
        highlight: true,
      },
      {
        label: "Status epilepticus (BIC)",
        value: `${(w * 1).toFixed(0)}-${(w * 3).toFixed(0)} mcg/kg/min`,
        freq: "BIC contínua",
        sub: "Início rápido | PRIS: síndrome infusão propofol > 48h",
        highlight: false,
      },
    ],
    notes:
      "Efeito hipotensor importante. PRIS raro mas letal (evitar > 48h ou > 5mg/kg/h). Início de ação ultrarrápido.",
  },
  {
    id: "succinilcolina_ev",
    name: "Succinilcolina EV (Bloqueador NM)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 50mg/mL — diluir 1mL + 9mL AD",
    dilution: "1mL + 9mL AD → 5mg/mL",
    infusion: "EV bolus",
    calc: (w) => [
      {
        label: "RN / < 6 meses: 2-3mg/kg",
        value: `${Math.min(w * 2.5, 150).toFixed(0)} mg`,
        freq: "dose única ISR",
        sub: `${(Math.min(w * 2.5, 150) / 5).toFixed(1)}mL da sol 5mg/mL`,
        highlight: false,
      },
      {
        label: "Lactentes / crianças: 2mg/kg",
        value: `${Math.min(w * 2, 150).toFixed(0)} mg`,
        freq: "dose única ISR",
        sub: `${(Math.min(w * 2, 150) / 5).toFixed(1)}mL da sol 5mg/mL`,
        highlight: true,
      },
      {
        label: "Crianças maiores / adolescentes: 1-1,5mg/kg",
        value: `${Math.min(w * 1.25, 150).toFixed(0)} mg`,
        freq: "dose única ISR",
        sub: `${(Math.min(w * 1.25, 150) / 5).toFixed(1)}mL da sol 5mg/mL`,
        highlight: false,
      },
    ],
    notes:
      "Despolarizante. CONTRAINDICAÇÕES: doença neuromuscular, grande queimado, rabdomiólise, politrauma, hipercalemia, hipertermia maligna. Fazer ATROPINA se < 5 anos.",
  },
  {
    id: "rocuronio_ev",
    name: "Rocurônio EV (Bloqueador NM)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 10mg/mL",
    dilution: "SF, SG ou SRL — diluir para 5mg/mL (ou puro)",
    infusion: "EV bolus",
    calc: (w) => [
      {
        label: "ISR: 1-1,2mg/kg (alta dose)",
        value: `${Math.min(w * 1, 120).toFixed(0)} mg`,
        freq: "dose única ISR",
        sub: `${(Math.min(w * 1, 120) / 10).toFixed(1)}mL puro | Efeito 30-60min`,
        highlight: true,
      },
      {
        label: "Intubação facilitada: 0,6mg/kg",
        value: `${Math.min(w * 0.6, 60).toFixed(0)} mg`,
        freq: "dose única",
        sub: `${(Math.min(w * 0.6, 60) / 10).toFixed(1)}mL puro`,
        highlight: false,
      },
    ],
    notes:
      "NÃO despolarizante. Reversão: sugammadex 16mg/kg. Se não intubado após uso: VPP obrigatória por 30-60 min.",
  },
  {
    id: "cisatracurio_ev",
    name: "Cisatracúrio EV",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 2mg/mL",
    dilution: "Diluir conforme necessidade",
    infusion: "EV bolus ou BIC",
    calc: (w) => [
      {
        label: "0,1-0,15mg/kg EV bolus",
        value: `${Math.min(w * 0.12, 10).toFixed(2)} mg`,
        freq: "dose única ou repetir conforme BNM",
        sub: `${(Math.min(w * 0.12, 10) / 2).toFixed(2)}mL do FA 2mg/mL | Duração moderada`,
        highlight: true,
      },
    ],
    notes:
      "EA: broncoespasmo, hipotensão, bradicardia. Eliminação Hofmann — independe de função renal/hepática.",
  },
  {
    id: "dexmedetomidina_ev",
    name: "Dexmedetomidina EV (Precedex)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 200mcg/2mL (100mcg/mL) — diluir em SF0,9%",
    dilution: "Diluir para 4mcg/mL",
    infusion: "BIC contínua",
    calc: (w) => [
      {
        label: "0,2-1,0mcg/kg/h — UTI",
        value: `${(w * 0.5).toFixed(1)}-${(w * 1).toFixed(1)} mcg/h`,
        freq: "BIC contínua — titular",
        sub: `Iniciar: ${(w * 0.2).toFixed(1)}mcg/h | Titulação gradual | Não necessita VPP`,
        highlight: true,
      },
    ],
    notes:
      "α2-agonista. Sedação com manutenção do drive respiratório. Sem depressão cardiorrespiratória. Boa opção desmame de ventilação.",
  },
  {
  id: "biperideno", name: "Biperideno VO/EV/IM",
  category: "sedativos", color: "#F97316", inputType: "weight",
  presentation: "CP 2mg (triturar + 10mL água filtrada para VO)",
  dilution: "EV/IM: puro | VO: administrar durante ou após refeição",
  infusion: "EV bolus lento | IM direto",
  calc: (w) => [
    { label: "IM — Reação extrapiramidal (0,04mg/kg/dose)",
      value: `${Math.min(w * 0.04, 2).toFixed(2)} mg/dose`,
      freq: "Repetir a cada 30 min se necessário — máx 4 doses/dia",
      sub: `Max 2mg/dose | pode repetir até 4× | ${(Math.min(w * 0.04, 2) / 2).toFixed(3)} cp de 2mg triturado`,
      highlight: true },
    { label: "EV — Reversão rápida de distonia aguda",
      value: "1–2 mg IV",
      freq: "Dose única em bolus lento",
      sub: "Dose fixa independente do peso | Efeito em minutos",
      highlight: false },
    { label: "VO — 1 a 5 anos: 0,5–1mg/dose",
      value: w <= 20 ? "0,5–1 mg/dose" : "—",
      freq: "8/8h",
      sub: "Triturar ½ cp (2mg) em 10mL água | Não usar CP retard em pediatria",
      highlight: false },
    { label: "VO — 5 a 12 anos: 1–2mg/dose",
      value: w > 20 && w <= 45 ? "1–2 mg/dose" : "—",
      freq: "até 6× ao dia",
      sub: "½ a 1 cp de 2mg | Triturar e diluir em 10mL de água filtrada",
      highlight: false },
    { label: "VO — 12 a 16 anos: 2mg/dose",
      value: w > 45 ? "2 mg/dose" : "—",
      freq: "até 6× ao dia",
      sub: "1 cp de 2mg | Triturar e diluir em 10mL de água filtrada",
      highlight: false },
  ],
  notes: "Anticolinérgico — 1ª linha distonia aguda medicamento-induzida (metoclopramida, haloperidol, bromoprida). EV tem efeito em minutos. CP retard contraindicado < 16 anos. EA: boca seca, retenção urinária, visão turva, taquicardia.",
},

  // ══════════════════════════════════════════════════
  //  ANTICONVULSIVANTES VO — complemento
  // ══════════════════════════════════════════════════
  {
    id: "valproato_vo",
    name: "Ácido Valproico (Depakene) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation:
      "Xarope 250mg/5mL | CP 300mg, 500mg | CP ER 250mg, 500mg | Sprinkle 125mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Dose terapêutica (10-60mg/kg/dia ÷ 2-3×)",
        value: `${Math.min((w * 30) / 2, 1500).toFixed(0)} mg/dose`,
        freq: "12/12h ou 8/8h",
        sub: `Regra: ${(w * 0.6).toFixed(1)} mL/dose (Xarope 250mg/5mL) | Max 60mg/kg/dia ou 3g/dia`,
        highlight: true,
      },
    ],
    notes:
      "ATENÇÃO: plaquetopenia, hepatotoxicidade (< 2 anos — risco fatal), pancreatite. Interações: diminuem VPA (PB, PHT, CBZ). VPA aumenta LTG, PB, CBZ-epóxido.",
  },
  {
    id: "carbamazepina_vo",
    name: "Carbamazepina (Tegretol) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "Susp oral 20mg/mL | CP 200mg e 400mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início (5-10mg/kg/dia ÷ 2×)",
        value: `${Math.min((w * 5) / 2, 400).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: `Regra: ${(w * 0.5).toFixed(1)} mL/dose (20mg/mL) × 2/dia`,
        highlight: false,
      },
      {
        label: "Manutenção (10-20mg/kg/dia ÷ 2×)",
        value: `${Math.min((w * 15) / 2, 800).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 35mg/kg/dia ou 2000mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Indicação: epilepsias focais. ATENÇÃO: hiponatremia. Monitorar nível sérico 4-12mcg/mL. Muitas interações.",
  },
  {
    id: "clobazam_vo",
    name: "Clobazam (Frisium) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 10mg e 20mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "0,5-1mg/kg/dia ÷ 2-3×",
        value: `${Math.min((w * 0.75) / 2, 30).toFixed(1)} mg/dose`,
        freq: "12/12h",
        sub: "Max 60mg/dia | Terapia adjuvante",
        highlight: true,
      },
    ],
    notes:
      "Benzodiazepínico VO. Adjuvante. Tolerância pode ocorrer. Diminuem CBZ: CBZ, PB, PHT.",
  },
  {
    id: "clonazepam_vo",
    name: "Clonazepam (Rivotril) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 0,25mg, 0,5mg, 1mg, 2mg | Gotas 2,5mg/mL (0,1mg/gota)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início (0,01-0,03mg/kg/dia)",
        value: `${Math.min(w * 0.02, 0.5).toFixed(3)} mg/dia`,
        freq: "Titular gradualmente",
        sub: "Não exceder 0,05mg/kg/dia na fase inicial",
        highlight: false,
      },
      {
        label: "Manutenção (0,1-0,2mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 0.15) / 3, 6).toFixed(2)} mg/dose`,
        freq: "8/8h",
        sub: "Max 0,2mg/kg/dia ou 20mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Mioclonias, ausência, Lennox-Gastaut. Hipersecreção brônquica (EA). Reduzem CNZ: CBZ, PB, PHT.",
  },
  {
    id: "etossuximida_vo",
    name: "Etossuximida (Zarontin) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "Sol oral 50mg/mL",
    dilution: "—",
    infusion: "VO (≥ 3 anos)",
    calc: (w) => [
      {
        label: "Início: 5mg/kg/dia ÷ 2-3×",
        value: `${Math.min((w * 5) / 2, 250).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Aumentar 5-10mg/kg/dia a cada semana",
        highlight: false,
      },
      {
        label: "Manutenção (20-30mg/kg/dia ÷ 2-3×)",
        value: `${Math.min((w * 25) / 2, 1000).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 40mg/kg/dia ou 2000mg/dia | ≥ 3 anos",
        highlight: true,
      },
    ],
    notes:
      "1ª escolha ausência típica infantil (junto com VPA e LTG). NÃO usar < 3 anos.",
  },
  {
    id: "fenobarbital_vo",
    name: "Fenobarbital VO (Manutenção)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 50mg e 100mg | Sol oral 40mg/mL (1mg/gota)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "1-3 anos: 3-7mg/kg/dia",
        value: `${Math.min((w * 5) / 2, 150).toFixed(0)} mg/dose`,
        freq: "12/12h ou dose única noturna",
        sub: "Preferir dose única noturna (24/24h) | Max 300mg/dia",
        highlight: true,
      },
      {
        label: "3-6 anos: 2-5mg/kg/dia",
        value: `${Math.min((w * 3.5) / 2, 125).toFixed(0)} mg/dose`,
        freq: "12/12h ou 1× noturno",
        sub: "Max 300mg/dia ou 8mg/kg/dia",
        highlight: false,
      },
    ],
    notes:
      "Manutenção VO após ataque EV. Iniciar 12h após dose de ataque. Sedação, comportamento, déficit cognitivo.",
  },
  {
    id: "fenitoina_vo",
    name: "Fenitoína VO (Manutenção)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 100mg | Sol oral 20mg/mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "5mg/kg/dia ÷ 2-3×",
        value: `${Math.min((w * 5) / 3, 100).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 300-500mg/dia | Manutenção pós-ataque EV",
        highlight: true,
      },
    ],
    notes:
      "Manutenção após ataque. Janela terapêutica estreita. Monitorar nível: 10-20mcg/mL. EA: hiperplasia gengival, hirsutismo, Steven-Johnson.",
  },
  {
    id: "lamotrigina_vo",
    name: "Lamotrigina (Lamictal) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 25mg, 50mg, 100mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "COM valproato (VPA) — início 0,5mg/kg/dia",
        value: `${Math.min((w * 0.5) / 2, 5).toFixed(1)} mg/dose`,
        freq: "12/12h (início — titular lentamente)",
        sub: "Meta: 1-5mg/kg/dia (Max 5mg/kg/dia ou 200mg/dia)",
        highlight: false,
      },
      {
        label: "SEM valproato — início 2mg/kg/dia",
        value: `${Math.min((w * 2) / 2, 50).toFixed(0)} mg/dose`,
        freq: "12/12h (início — titular)",
        sub: "Meta: 5-15mg/kg/dia (Max 700mg/dia) | Ajuste 0,5mg/kg a cada 15 dias",
        highlight: true,
      },
    ],
    notes:
      "⚠ TITULAÇÃO LENTA OBRIGATÓRIA — risco de rash cutâneo/SJ grave se introdução rápida. VPA aumenta LTG (reduzir dose pela metade). Piora mioclonias.",
  },
  {
    id: "oxcarbazepina_vo",
    name: "Oxcarbazepina (Trileptal) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "Susp 60mg/mL | CP 300mg e 600mg",
    dilution: "—",
    infusion: "VO (≥ 2 anos)",
    calc: (w) => [
      {
        label: "Início: 8-10mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 9) / 2, 300).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Max 600mg/dia início | Aumentar 2,5-5mg/kg/dia a cada semana",
        highlight: false,
      },
      {
        label: "Manutenção: 8-50mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 30) / 2, 1200).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 50mg/kg/dia ou 2400mg/dia (ILAE: até 3000mg/dia)",
        highlight: true,
      },
    ],
    notes:
      "Análogo CBZ, menos interações. Hiponatremia (monitorar Na). ≥ 2 anos. Epilepsias focais.",
  },
  {
    id: "topiramato_vo",
    name: "Topiramato (Topamax) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 25mg, 50mg, 100mg | Caps sprinkle 15mg e 25mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início: 1-3mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 2) / 2, 50).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Aumentar 1-2mg/kg/dia a cada 1-2 semanas",
        highlight: false,
      },
      {
        label: "Manutenção: 5-9mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 7) / 2, 300).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 15mg/kg/dia ou 600mg/dia",
        highlight: true,
      },
    ],
    notes:
      "Amplo espectro. Perda de peso, parestesias, nefrolitíase, hipertermia (oligoidrose — grave em crianças). Cognitivo: 'Dopamax'.",
  },
  {
    id: "vigabatrina_vo",
    name: "Vigabatrina (Sabril) VO",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "CP 500mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início: 50mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 50) / 2, 2000).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Aumentar conforme resposta | Meta: até 150mg/kg/dia",
        highlight: true,
      },
      {
        label: "Espasmos infantis (Sínd. West)",
        value: `${Math.min(w * 100, 3000).toFixed(0)} mg/dia`,
        freq: "12/12h",
        sub: "100-150mg/kg/dia — Max 200mg/kg/dia | 1ª linha Sínd. West com esclerose tuberosa",
        highlight: false,
      },
    ],
    notes:
      "⚠ Constrição concêntrica do campo visual irreversível — monitorar perimetria regularmente. Não interagem com outros FAEs.",
  },

  // ══════════════════════════════════════════════════
  //  ANTI-HIPERTENSIVOS
  // ══════════════════════════════════════════════════
  {
    id: "nifedipina_emergencia",
    name: "Nifedipina VO — Emergência Hipertensiva",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 10mg (CURTA ação — uso emergência)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "0,04-0,25mg/kg/dose (urgência)",
        value: `${Math.min(w * 0.1, 10).toFixed(2)} mg/dose`,
        freq: "Repetir a cada 4-6h se necessário",
        sub: "Max 10mg/dose | Max 3mg/kg/dia",
        highlight: true,
      },
    ],
    notes:
      "EA: taquicardia, cefaleia, vertigem. Para uso AGUDO — não usar retard na emergência.",
  },
  {
    id: "hidralazina_evvo",
    name: "Hidralazina EV/IM/VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "VO: CP 25mg e 50mg | EV/IM: Amp 20mg/mL (1mL)",
    dilution: "EV: diluir em SF0,9%",
    infusion: "EV: lento",
    calc: (w) => [
      {
        label: "EV/IM — crise grave (0,1-0,6mg/kg/dose)",
        value: `${Math.min(w * 0.3, 25).toFixed(1)} mg/dose`,
        freq: "a cada 4-6h se necessário",
        sub: `Max 25mg/dose | ${(Math.min(w * 0.3, 25) / 20).toFixed(2)}mL do Amp 20mg/mL EV lento`,
        highlight: true,
      },
      {
        label: "VO — leve/moderada (0,25mg/kg/dose)",
        value: `${Math.min(w * 0.25, 25).toFixed(1)} mg/dose`,
        freq: "6-8h",
        sub: "Max 25mg/dose habitual",
        highlight: false,
      },
    ],
    notes:
      "Vasodilatador. EA: taquicardia reflexa (associar βB), cefaleia, síndrome lúpus-like (rara).",
  },
  {
    id: "nitroprussiato_ev",
    name: "Nitroprussiato EV",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "Amp 25mg/mL (2mL) — fotossensível",
    dilution: "Diluir em SG5% — PROTEGER LUZ",
    infusion: "BIC contínua",
    calc: (w) => [
      {
        label: "0,3-10mcg/kg/min — crise grave",
        value: `${(w * 0.3).toFixed(1)}-${(w * 10).toFixed(0)} mcg/min`,
        freq: "BIC — titular conforme PA",
        sub: "Início imediato de ação | Max 10mcg/kg/min | Proteger da luz",
        highlight: true,
      },
    ],
    notes:
      "⚠ Vasodilatador de início/fim de ação imediato. Risco intoxicação por cianeto (uso prolongado > 72h). Usar apenas em UTI com monitorização contínua.",
  },
  {
    id: "labetalol_evvo",
    name: "Labetalol EV/VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "EV: Amp 5mg/mL | VO: CP 100-200-300mg",
    dilution: "EV: pode ser feito puro (lento) ou BIC",
    infusion: "EV: lento",
    calc: (w) => [
      {
        label: "EV bolus (0,25-1mg/kg/dose)",
        value: `${Math.min(w * 0.5, 40).toFixed(1)} mg/dose`,
        freq: "pode repetir",
        sub: `Max 40mg/dose | ${(Math.min(w * 0.5, 40) / 5).toFixed(1)}mL do Amp 5mg/mL`,
        highlight: true,
      },
      {
        label: "EV BIC (0,25-3mg/kg/h)",
        value: `${(w * 1).toFixed(1)}-${(w * 3).toFixed(0)} mg/h`,
        freq: "BIC",
        sub: "Iniciar dose mais baixa",
        highlight: false,
      },
    ],
    notes:
      "α+β bloqueador. Excelente para emergência hipertensiva. Evitar em asma e ICC.",
  },
  {
    id: "esmolol_ev",
    name: "Esmolol EV",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "Amp 250mg/mL | FR-Amp 10mg/mL",
    dilution: "Diluir para infusão BIC",
    infusion: "Bolus + BIC",
    calc: (w) => [
      {
        label: "Bolus: 100-500mcg/kg em 1 min",
        value: `${Math.min(w * 300, 25000).toFixed(0)} mcg`,
        freq: "bolus em 1 min",
        sub: `Seguido de BIC | TSV: ${(Math.min(w * 300, 25000) / 1000).toFixed(1)}mg em 1min`,
        highlight: true,
      },
      {
        label: "BIC manutenção: 50-300mcg/kg/min",
        value: `${(w * 50).toFixed(0)}-${(w * 200).toFixed(0)} mcg/min`,
        freq: "BIC — ação curta",
        sub: "Titular a cada 4 min | Bradicardia grave — reduzir/pausar",
        highlight: false,
      },
    ],
    notes:
      "β-bloqueador ultracurto (t½ ~9 min). Feocromocitoma, TSV, HAS pós-operatória. Risco bradicardia.",
  },
  {
    id: "anlodipina_vo",
    name: "Anlodipina (BCC) VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 5mg e 10mg | Sol 1mg/mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: w < 6 ? "< 6 anos: 0,2-0,6mg/kg/dia" : "≥ 6 anos: 2,5-10mg/dia",
        value:
          w < 6
            ? `${Math.min(w * 0.3, 5).toFixed(1)} mg/dia`
            : `${Math.max(2.5, Math.min(w * 0.1, 10)).toFixed(1)} mg/dia`,
        freq: "1-2× ao dia",
        sub: w < 6 ? `Max 5mg/dia` : "Max 10mg/dia",
        highlight: true,
      },
    ],
    notes: "BCC — boa opção DRC. Edema periférico (EA). Titulação gradual.",
  },
  {
    id: "captopril_vo",
    name: "Captopril (IECA) VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 12,5mg, 25mg, 50mg | Sol 1mg/mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Lactentes — ICC/HAS (0,1-0,5mg/kg/dose)",
        value: `${Math.min(w * 0.3, 6).toFixed(2)} mg/dose`,
        freq: "6-8h",
        sub: "Iniciar 0,1mg/kg/dose | Max 6mg/kg/dia",
        highlight: false,
      },
      {
        label: "Crianças — HAS (0,3-6mg/kg/dia ÷ 3×)",
        value: `${Math.min((w * 3) / 3, 200).toFixed(1)} mg/dose`,
        freq: "8/8h",
        sub: "Max 6mg/kg/dia total",
        highlight: true,
      },
    ],
    notes:
      "IECA. Hipercalemia, tosse seca (EAs). Evitar estenose artéria renal bilateral. Monitorar TFG e K⁺.",
  },
  {
    id: "enalapril_vo",
    name: "Enalapril (IECA) VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 5mg, 10mg, 20mg | Sol 1mg/mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "0,08mg/kg/dia — início (1× ao dia)",
        value: `${Math.min(w * 0.08, 5).toFixed(2)} mg/dia`,
        freq: "1× ao dia (início)",
        sub: "Ajustar semanalmente conforme PA | Max 0,58mg/kg/dia ou 40mg/dia",
        highlight: true,
      },
    ],
    notes:
      "IECA de 1× ao dia. Hipercalemia, leucopenia, TFG⬇. Não estudado > 0,58mg/kg.",
  },
  {
    id: "furosemida_evvo",
    name: "Furosemida VO/EV",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "VO: CP 40mg | EV: Amp 10mg/mL",
    dilution: "EV: pode ser puro lento",
    infusion: "EV lento",
    calc: (w) => [
      {
        label: "VO: 1-12mg/kg/dia ÷ 2-3× (HAS/edema)",
        value: `${Math.min(w * 2, 40).toFixed(0)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Max 6mg/kg/dia ou 600mg/dia",
        highlight: false,
      },
      {
        label: "EV: 1mg/kg/dose",
        value: `${Math.min(w * 1, 40).toFixed(0)} mg/dose`,
        freq: "conforme necessidade",
        sub: `${(Math.min(w * 1, 40) / 10).toFixed(1)}mL do Amp 10mg/mL | Max 40mg/dose (função renal normal)`,
        highlight: true,
      },
    ],
    notes:
      "Diurético de alça. Hipocalemia, hiperglicemia, hiperuricemia, hipercalciúria. Monitorar K⁺.",
  },
  {
    id: "espironolactona_vo",
    name: "Espironolactona VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 25mg, 50mg, 100mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "1-2mg/kg/dia ÷ 2×",
        value: `${Math.min((w * 1.5) / 2, 50).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: "Max 100mg/dia | 2ª linha",
        highlight: true,
      },
    ],
    notes:
      "Diurético poupador de K⁺. Hipercalemia (monitorar). Útil em ICC, cirrose.",
  },
  {
    id: "losartana_vo",
    name: "Losartana (BRA) VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 12,5mg, 25mg, 50mg, 100mg | Sol 2,5mg/mL",
    dilution: "—",
    infusion: "VO (≥ 6 anos)",
    calc: (w) => [
      {
        label: "≥ 6 anos: 0,7mg/kg/dia (1× ao dia)",
        value: `${Math.min(w * 0.7, 50).toFixed(0)} mg/dia`,
        freq: "1× ao dia",
        sub: "Max 1,4mg/kg/dia ou 100mg/dia",
        highlight: true,
      },
    ],
    notes:
      "BRA — alternativa IECA (sem tosse). ≥ 6 anos. Hipercalemia. Nefroprotector em proteinúria.",
  },
  {
    id: "atenolol_vo",
    name: "Atenolol VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 25mg, 50mg, 100mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "HAS / Taquicardia: 0,5-1mg/kg/dia",
        value: `${Math.min(w * 0.75, 50).toFixed(0)} mg/dia`,
        freq: "1-2× ao dia",
        sub: "Max 100mg/dia",
        highlight: true,
      },
    ],
    notes:
      "β1-bloqueador seletivo. Bradicardia, broncoespasmo (EA). Não usar em asma.",
  },
  {
    id: "propranolol_vo",
    name: "Propranolol VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 10mg, 40mg, 80mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início: 1-2mg/kg/dia ÷ 2-3×",
        value: `${Math.min((w * 1.5) / 3, 80).toFixed(0)} mg/dose`,
        freq: "8/8h (início)",
        sub: "Max 8mg/kg/dia ou 640mg/dia",
        highlight: true,
      },
    ],
    notes:
      "β-bloqueador não seletivo. Asma (CI), hiperglicemia, ICC. Hemangioma infantil: 1-3mg/kg/dia.",
  },
  {
    id: "carvedilol_vo",
    name: "Carvedilol VO",
    category: "antihipertensivos",
    color: "#F43F5E",
    inputType: "weight",
    presentation: "CP 3,125mg, 6,25mg, 12,5mg, 25mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Início: 0,04-0,075mg/kg/dose",
        value: `${Math.min(w * 0.05, 3.125).toFixed(3)} mg/dose`,
        freq: "12/12h (início)",
        sub: "Aumentar 50-100% a cada 2 semanas | Meta: 1mg/kg/dia | Max 50mg/dia",
        highlight: true,
      },
    ],
    notes: "α+β bloqueador. ICC, HAS. Iniciar baixo e titular devagar.",
  },

  // ══════════════════════════════════════════════════
  //  PUERICULTURA / VITAMINAS
  // ══════════════════════════════════════════════════
  {
    id: "ferro_suplementacao",
    name: "Ferro Elementar VO — Suplementação / Tratamento",
    category: "puericultura",
    color: "#A78BFA",
    inputType: "weight",
    presentation:
      "Neutrofer 250mg/mL (2,5mg Fe/gt) | Sulfato Ferroso 25mg/mL (posto saúde)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Profilaxia — RNT sem risco (a partir 6 meses)",
        value: `${Math.min(w * 1, 40).toFixed(0)} mg Fe/dia`,
        freq: "1× ao dia até 24 meses",
        sub: "1mg Fe elementar/kg/dia | Iniciar 180 dias de vida",
        highlight: false,
      },
      {
        label: "Profilaxia — RNT com risco / RNPT 1001-1500g",
        value: `${Math.min(w * 2, 40).toFixed(0)} mg Fe/dia`,
        freq: "1× ao dia a partir 30 dias",
        sub: "2mg Fe/kg/dia | Iniciar 30 dias de vida por 1 ano, depois 1mg/kg/dia",
        highlight: false,
      },
      {
        label: "RNPT < 1000g: 4mg Fe/kg/dia",
        value: `${Math.min(w * 4, 40).toFixed(0)} mg Fe/dia`,
        freq: "1× ao dia a partir 30 dias",
        sub: "4mg Fe/kg/dia por 1 ano | depois 1mg/kg/dia",
        highlight: false,
      },
      {
        label: "⚕ Tratamento — Anemia Ferropriva (3-6mg/kg/dia)",
        value: `${Math.min(w * 5, 200).toFixed(0)} mg Fe/dia`,
        freq: "1× ao dia (ou fracionado)",
        sub: "Tratar por 6 meses ou até normalização Hb, ferritina, VCM | Em jejum + suco cítrico",
        highlight: true,
      },
    ],
    notes:
      "Neutrofer 250mg/mL: 2,5mg Fe/gota. Sulfato ferroso 25mg/mL: 1mg Fe/mL. Controle com hemograma + reticulócitos em 30-45 dias (↑Hb ≥ 1g/dL confirma diagnóstico).",
  },
  {
    id: "vitamina_d_vo",
    name: "Vitamina D VO (Colecalciferol D3)",
    category: "puericultura",
    color: "#A78BFA",
    inputType: "age",
    presentation: "Gotas 200 UI/gota (DPrev, Maxxifel) | Caps 1000-50.000 UI",
    dilution: "—",
    infusion: "VO",
    calc: (a) => [
      {
        label:
          a < 1
            ? "< 1 ano — profilaxia"
            : a < 18
              ? "1-18 anos — profilaxia"
              : "> 18 anos",
        value:
          a < 1
            ? "400 UI/dia"
            : a < 18
              ? "600-1200 UI/dia"
              : "1500-2000 UI/dia",
        freq: "1× ao dia",
        sub:
          a < 1
            ? "2 gotas/dia (200 UI/gt)"
            : a < 18
              ? "3-6 gotas/dia (200 UI/gt) | Grupo risco: 1200-1800 UI/dia"
              : "Adultos",
        highlight: true,
      },
      {
        label: "⚕ Tratamento deficiência (< 20ng/mL) — 1 mês-1 ano",
        value: "2000 UI/dia por 12 semanas",
        freq: "diária por 12 semanas",
        sub: "Pós: manutenção 400 UI/dia | Monitorar 25-OH-D a cada 3 meses",
        highlight: false,
      },
      {
        label: "Tratamento deficiência — 1-18 anos",
        value: "3000-6000 UI/dia por 12 semanas",
        freq: "diária por 12 semanas",
        sub: "Pós: manutenção 600 UI/dia | Global Consensus 2016",
        highlight: false,
      },
    ],
    notes:
      "Suficiência: > 20ng/mL. Deficiência: < 12ng/mL. Transicionar para manutenção quando nível > 20. Grupos de risco: vegetariano, obesidade, má absorção, hepatopatia, anticonvulsivantes.",
  },
  {
    id: "zinco_vo",
    name: "Zinco VO (Biozinc/Unizinco)",
    category: "puericultura",
    color: "#A78BFA",
    inputType: "age",
    presentation:
      "Biozinc 2mg/0,5mL (4mg Zn/mL) | Unizinco 17,60mg/mL (4mg Zn/mL)",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      const m = a * 12;
      return [
        {
          label: m < 6 ? "< 6 meses: 2,5mL/dia" : "≥ 6 meses: 5mL/dia",
          value: m < 6 ? "2,5 mL/dia (10mg Zn)" : "5 mL/dia (20mg Zn)",
          freq: "1× ao dia",
          sub: m < 6 ? "Suplemento padrão" : "Suplemento padrão",
          highlight: true,
        },
        {
          label: "Diarreia aguda — terapêutico",
          value: m < 6 ? "2,5 mL/dia" : "5 mL/dia",
          freq: "1× ao dia por 10-14 dias",
          sub: "Reduz duração e gravidade da diarreia (OMS)",
          highlight: false,
        },
      ];
    },
    notes:
      "OMS recomenda zinco adjuvante na diarreia aguda infantil por 10-14 dias. Biozinc/Unizinco: 4mg Zn/mL.",
  },

  // ══════════════════════════════════════════════════
  //  HEMATOLOGIA / COAGULAÇÃO
  // ══════════════════════════════════════════════════
  {
    id: "enoxaparina_sc",
    name: "Enoxaparina SC",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "FA 20mg e 40mg — uso SC",
    dilution: "—",
    infusion: "SC",
    calc: (w) => [
      {
        label: "Terapêutico (> 2 meses): 1mg/kg/dose",
        value: `${Math.min(w * 1, 100).toFixed(0)} mg/dose`,
        freq: "12/12h SC",
        sub: "Meta: antifator Xa 0,5-1 U/mL (colet. 4h após dose)",
        highlight: true,
      },
      {
        label: "Terapêutico (< 2 meses): 1,5mg/kg/dose",
        value: `${Math.min(w * 1.5, 100).toFixed(0)} mg/dose`,
        freq: "12/12h SC",
        sub: "Lactentes < 2 meses: dose maior",
        highlight: false,
      },
      {
        label: "Profilático (> 2 meses): 0,5mg/kg/dose",
        value: `${Math.min(w * 0.5, 40).toFixed(0)} mg/dose`,
        freq: "12/12h SC",
        sub: "Meta: antifator Xa 0,1-0,3 U/mL",
        highlight: false,
      },
    ],
    notes:
      "Se IR: usar 24/24h mesma dose. Suspender se plaquetas < 100.000. Controle antifator Xa no D1 (4h após dose manhã), depois semanal, depois mensal.",
  },
  {
    id: "vitamina_k_ev",
    name: "Vitamina K EV/IM",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "FA 10mg/mL",
    dilution: "EV: diluir em SF0,9% ou SG5%",
    infusion: "EV lento | IM (contraindicado se plaquetopenia grave)",
    calc: (w) => [
      {
        label: "1mg/kg EV ou IM",
        value: `${Math.min(w * 1, 10).toFixed(0)} mg`,
        freq: "dose única (pode repetir)",
        sub: `Max 10mg | ${(Math.min(w * 1, 10) / 10).toFixed(2)}mL do FA 10mg/mL`,
        highlight: true,
      },
    ],
    notes:
      "Doença hemorrágica RN: 1mg IM após nascimento. Anticoagulação oral excessiva: 1mg/kg. IM contraindicado em plaquetopenia grave.",
  },
  {
    id: "filgrastim_sc",
    name: "Filgrastim / G-CSF SC (Granulokine)",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "FA 300mcg/mL",
    dilution: "SC: puro | EV: diluir em SG5% para 15mcg/mL",
    infusion: "SC puro ou EV diluído",
    calc: (w) => [
      {
        label: "5-10mcg/kg/dia",
        value: `${Math.min(w * 7.5, 300).toFixed(0)} mcg/dia`,
        freq: "1× ao dia SC",
        sub: `Max 300mcg/dia | ${(Math.min(w * 7.5, 300) / 300).toFixed(2)}mL do FA 300mcg/mL`,
        highlight: true,
      },
    ],
    notes:
      "Neutropenia febril pós-QT. SC puro ou EV diluído em SG5% (15mcg/mL). Dor óssea (EA). Monitorar leucograma.",
  },
  {
    id: "bicarbonato_ev",
    name: "Bicarbonato de Sódio EV",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "BicNa 8,4% (1mEq/mL) | BicNa 4,2% (0,5mEq/mL)",
    dilution: "Pode ser feito puro (ataque) ou diluído",
    infusion: "30-60 min",
    calc: (w) => [
      {
        label: "Fase rápida — acidose grave pH < 7,1 / PCR (1mEq/kg)",
        value: `${Math.min(w * 1, 50).toFixed(0)} mEq`,
        freq: "correr em 30-60 min",
        sub: `BicNa 8,4%: ${Math.min(w * 1, 50).toFixed(0)}mL puro | 4,2% (< 6m): ${(Math.min(w * 1, 50) * 2).toFixed(0)}mL`,
        highlight: true,
      },
      {
        label: "Fórmula: BE × Peso × 0,3",
        value: "BE × Peso × 0,3 mEq",
        freq: "correr em 30-60 min",
        sub: "Correção metabólica calculada | Max 50mEq por vez",
        highlight: false,
      },
    ],
    notes:
      "Indicações: acidose metabólica grave pH < 7,1, hipercalemia grave (membrana), CAD com pH < 6,9, PCR com acidose. BicNa 4,2% preferido em < 6 meses.",
  },
  {
    id: "gluconato_calcio_ev",
    name: "Gluconato de Cálcio 10% EV",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "Amp 10% (1mL = 9,8mg Ca elementar)",
    dilution: "Diluir em SF0,9% ou SG5%",
    infusion: "EV lento (não rápido — risco arritmia)",
    calc: (w) => [
      {
        label: "Hipocalcemia sintomática — ataque (0,5-1mL/kg)",
        value: `${Math.min(w * 0.75, 20).toFixed(1)} mL`,
        freq: "em 10 min EV lento",
        sub: `Max 20mL | ≈ ${(Math.min(w * 0.75, 20) * 9.8).toFixed(0)}mg Ca elementar`,
        highlight: true,
      },
      {
        label: "Hipercalemia grave — estabilização (0,5mL/kg)",
        value: `${Math.min(w * 0.5, 20).toFixed(1)} mL`,
        freq: "em 5 min (máx 0,5mL/kg/min)",
        sub: "Estabilizador de membrana em hipercalemia com ECG alterado",
        highlight: false,
      },
      {
        label: "Intox MgSO4 / antídoto (0,5-1mL/kg)",
        value: `${Math.min(w * 0.5, 20).toFixed(1)} mL`,
        freq: "velocidade máx 0,5mL/kg/min",
        sub: "Max 20mL",
        highlight: false,
      },
    ],
    notes:
      "Infundir LENTAMENTE (risco bradicardia/assistolia). Não misturar com bicarbonato (precipita). Monitorar ECG durante infusão.",
  },
  {
    id: "metadona_desmame",
    name: "Metadona VO — Desmame Fentanil",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "CP 10mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Dose = equivalente mg de Fentanil/dia (média 3 dias)",
        value: "Ver cálculo abaixo",
        freq: "÷ 2 doses (12/12h)",
        sub: "Dose metadona (mg) = dose fentanil (mg/dia média 3 dias) | Dividir em 2× VO",
        highlight: true,
      },
    ],
    notes:
      "PROTOCOLO: 1) Separar bombas fentanil e midazolam. 2) Metadona = média fentanil 3 dias (mg/dia), ÷2 doses VO. 3) Na 2ª dose metadona: ↓ bomba fentanil 50%. 4) ↓50% bomba a cada dose subsequente. 5) Suspender fentanil na 5ª-6ª dose. 6) Após suspensão: ↓metadona 20% a cada 48h. Monitorar WAT-1 ≥ 3 = abstinência.",
  },
  {
    id: "lorazepam_desmame",
    name: "Lorazepam VO — Desmame Midazolam",
    category: "hematologia",
    color: "#FB923C",
    inputType: "weight",
    presentation: "CP 1mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Dose lorazepam = 1/12 da dose midazolam/dia",
        value: "Ver cálculo abaixo",
        freq: "÷ 4 doses (6/6h)",
        sub: "Dose lorazepam (mg) = dose midazolam (mg/dia média 3 dias) ÷ 12 | Dividir em 4× VO (6/6h)",
        highlight: true,
      },
    ],
    notes:
      "PROTOCOLO: 1) Lorazepam = média midazolam 3 dias ÷ 12, ÷4 doses VO. 2) Na 2ª dose: ↓bomba midazolam 50%. 3) ↓50% a cada dose. 4) Suspender na 5ª-6ª dose. 5) Após: ↓lorazepam 20% a cada 48h. Alternativa sem lorazepam: Diazepam = dose midazolam/dia ÷ 3.",
  },

  // ══ ANTIBIÓTICOS (originais) ══════════════════
  {
    id: "ampicilina_ev",
    name: "Ampicilina EV/IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 500mg e 1g",
    dilution: "100mg/mL padrão | Max EV: 30mg/mL em SF0,9%",
    infusion: "30 min",
    calc: (w) => {
      const low = Math.min(w * 25, 2000);
      const high = Math.min(w * 50, 3000);
      return [
        {
          label: "Geral (100mg/kg/dia ÷ 4x)",
          value: `${low.toFixed(0)} mg/dose`,
          freq: "6/6h",
          sub: `Regra: ${(w / 4).toFixed(1)} mL/dose (200mg/mL) | Max 8g/dia`,
          highlight: false,
        },
        {
          label: "Grave / Apendicite (200mg/kg/dia ÷ 4x)",
          value: `${high.toFixed(0)} mg/dose`,
          freq: "6/6h",
          sub: "Max 3g/dose — Max 12g/dia",
          highlight: true,
        },
      ];
    },
    notes:
      "Cobre GBS, E. coli e Listeria. 1ª linha sepse neonatal (+ gentamicina). Regra: Peso/4 em mL/dose (200mg/mL).",
  },
  {
    id: "amoxicilina_vo",
    name: "Amoxicilina VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 250mg/5mL (azul) | Susp 400mg/5mL (BD)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Habitual (50mg/kg/dia ÷ 3x) — Susp 250mg/5mL",
        value: `${Math.min((w * 50) / 3, 500).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: `Regra: ${(w / 3).toFixed(1)} mL/dose | Max 500mg 8/8h`,
        highlight: false,
      },
      {
        label: "Dose alta (80-90mg/kg/dia ÷ 2x) — Susp 400mg/5mL",
        value: `${Math.min((w * 85) / 2, 875).toFixed(0)} mg/dose`,
        freq: "12/12h",
        sub: `Regra: ${(w / 4).toFixed(1)} mL/dose | Max 875mg 12/12h | Max 4g/dia`,
        highlight: true,
      },
    ],
    notes:
      "Dose alta: otite resistente, pneumonia. Peso/3 (250mg/5mL) ou Peso/4 (400mg/5mL).",
  },
  {
    id: "amoxiclav_vo",
    name: "Amoxicilina-Clavulanato VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 250+62,5mg/5mL | Susp 400+57mg/5mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Susp 250+62,5/5mL — 8/8h",
        value: `${(w / 3).toFixed(1)} mL/dose`,
        freq: "8/8h",
        sub: `≈ ${Math.min((w * 50) / 3, 500).toFixed(0)} mg amoxicilina | Regra: Peso/3`,
        highlight: false,
      },
      {
        label: "Susp 400+57/5mL — 12/12h",
        value: `${(w / 4).toFixed(1)} mL/dose`,
        freq: "12/12h",
        sub: `≈ ${Math.min((w * 50) / 2, 875).toFixed(0)} mg amoxicilina | Regra: Peso/4`,
        highlight: true,
      },
    ],
    notes:
      "Cálculo sempre pela amoxicilina. Max 500+125mg 8/8h ou 875+125mg 12/12h.",
  },
  {
    id: "azitromicina_vo",
    name: "Azitromicina VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 200mg/5mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "10mg/kg/dia — 1× ao dia",
        value: `${Math.min(w * 10, 500).toFixed(0)} mg/dia`,
        freq: "1× ao dia",
        sub: `Regra: ${(w / 4).toFixed(1)} mL/dose (200mg/5mL) | Max 500mg/dia`,
        highlight: true,
      },
    ],
    notes:
      "3-5 dias (coqueluche: 5 dias, pneumonia: 3 dias). Regra: Peso/4 em mL/dose.",
  },
  {
    id: "cefalexina_vo",
    name: "Cefalexina VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 250mg/5mL | CP 500mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "25-50mg/kg/dia ÷ 4x",
        value: `${Math.min((w * 50) / 4, 500).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: `Regra: ${(w / 4).toFixed(1)} mL/dose (250mg/5mL) | Max 2g/dia`,
        highlight: true,
      },
    ],
    notes: "Infecções de pele, IVU não complicada. Regra: Peso/4 em mL/dose.",
  },
  {
    id: "ceftriaxona_ev",
    name: "Ceftriaxona EV/IM",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "FA 250mg, 500mg, 1g",
    dilution: "100mg/mL → max 40mg/mL em SF0,9% ou SG5%",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "Habitual (50-75mg/kg/dia 1-2×)",
        value: `${Math.min(w * 75, 2000).toFixed(0)} mg`,
        freq: "24/24h ou 12/12h",
        sub: "Max 2g/dia. Se >2g/dia: dividir em 2×",
        highlight: false,
      },
      {
        label: "Grave / SNC (80-100mg/kg/dia)",
        value: `${Math.min(w * 100, 4000).toFixed(0)} mg/dia`,
        freq: "12/12h",
        sub: "Max 4g/dia — sempre dividir em 2×",
        highlight: true,
      },
      {
        label: "⚠ CONTRAINDICADO em neonatos",
        value: "< 28 dias de vida",
        freq: "",
        sub: "Usar CEFOTAXIMA — desloca bilirrubina e precipita com cálcio",
        highlight: false,
      },
    ],
    notes:
      "Sem ajuste renal. NÃO usar em neonatos (<28 dias). Não infundir junto com Ca²⁺.",
  },
  {
    id: "metronidazol_vo",
    name: "Metronidazol VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 40mg/mL | CP 250mg, 400mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "40mg/kg/dia ÷ 3x (habitual)",
        value: `${Math.min((w * 40) / 3, 750).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: `Regra: ${(w / 3).toFixed(1)} mL/dose (40mg/mL) | Max 750mg/dose`,
        highlight: true,
      },
    ],
    notes:
      "Giardia, amebíase, anaeróbios. Regra prática: Peso/3 em mL/dose (40mg/mL).",
  },
  {
    id: "smxtmp_vo",
    name: "SMX-TMP (Cotrimoxazol) VO",
    category: "antibioticos",
    color: "#10B981",
    inputType: "weight",
    presentation: "Susp 200+40mg/5mL (40mg TMP/5mL)",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "8-12mg/kg TMP/dia ÷ 2x (≥ 2 meses)",
        value: `${Math.min((w * 8) / 2, 160).toFixed(0)}-${Math.min((w * 12) / 2, 160).toFixed(0)} mg TMP/dose`,
        freq: "12/12h",
        sub: `Regra: ${(w / 2).toFixed(1)} mL/dose | Max 160mg TMP/dose`,
        highlight: true,
      },
    ],
    notes:
      "CONTRAINDICADO < 2 meses. Regra: Peso/2 em mL/dose. IVU, P. jirovecii, toxoplasma.",
  },

  // ══ ANALGÉSICOS / ANTITÉRMICOS ══════════
  {
    id: "dipirona",
    name: "Dipirona",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation: "Gotas 500mg/mL (25mg/gt) | Sol 50mg/mL | Amp 500mg/mL",
    dilution: "EV: diluir em 10mL AD",
    infusion: "EV lento (≥ 5 min)",
    calc: (w) => [
      {
        label: "Dose em mg (15-25mg/kg/dose)",
        value: `${Math.min(w * 20, 1000).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: "Max 4g/dia — a partir de 3 meses",
        highlight: false,
      },
      {
        label: "Gotas 500mg/mL (25mg/gota)",
        value: `${Math.min(Math.ceil(w * 0.9), 40)} gotas/dose`,
        freq: "6/6h",
        sub: `Regra: ~1 gota/kg — Max 40 gotas`,
        highlight: false,
      },
      {
        label: "Solução oral 50mg/mL (Novalgina)",
        value: `${(w * 0.4).toFixed(1)} mL/dose`,
        freq: "6/6h",
        sub: "Regra: 0,3-0,5 mL × Peso",
        highlight: false,
      },
      {
        label: "EV / IM (500mg/mL)",
        value: `${Math.min(w * 0.04, 2).toFixed(2)} mL/dose`,
        freq: "6/6h",
        sub: `Regra: 0,04 mL × Peso — Max 2mL/dose — diluir em 10mL AD`,
        highlight: true,
      },
    ],
    notes: "A partir de 3 meses. Max 4g/dia. Regra EV: 0,04 mL × Peso.",
  },
{
  id: "paracetamol",
  name: "Paracetamol (Tylenol / Halexminofeno)",
  category: "analgesicos",
  color: "#F59E0B",
  inputType: "weight",
  presentation:
    "Gotas 200mg/mL (10mg/gt) | Gotas 100mg/mL (5mg/gt) | Tylenol Bebê 100mg/mL | Halexinam EV 10mg/mL (bolsa 100mL = 1000mg)",
  dilution: "EV: pronto uso — bolsa 100mL a 10mg/mL. Não diluir.",
  infusion: "VO / EV",
  calc: (w) => {
    const doseEV = w >= 50 ? 1000 : Math.min(w * 15, 1000);
    const volEV = doseEV / 10;
    const isAdult = w >= 50;

    return [
      {
        label: "EV Halexminofeno 10 mg/mL",
        value: `${volEV.toFixed(0)} mL`,
        freq: "Infundir em 15 min",
        sub:
          volEV >= 100
            ? "Bolsa inteira (100 mL) — não diluir"
            : `Retirar ${(100 - volEV).toFixed(0)} mL da bolsa antes de infundir`,
        highlight: true,
      },
      {
        label: "Gotas 200 mg/mL (10 mg/gota)",
        value: `${Math.min(Math.ceil(w), 40)} gotas/dose`,
        freq: "6/6h VO",
        sub: "Regra: 1 gota/kg — Max 40 gotas",
        highlight: false,
      },
      {
        label: "Gotas 100 mg/mL (5 mg/gota)",
        value: `${Math.min(Math.ceil(w * 2), 80)} gotas/dose`,
        freq: "6/6h VO",
        sub: "Regra: 2 gotas/kg — Max 80 gotas",
        highlight: false,
      },
      {
        label: "Tylenol Bebê 100 mg/mL",
        value: `${(w / 10).toFixed(1)} mL/dose`,
        freq: "6/6h VO",
        sub: "Regra: Peso ÷ 10 em mL",
        highlight: false,
      },
      {
        label: "Dose VO (10-15 mg/kg/dose)",
        value: `${Math.min(w * 12, 750).toFixed(0)} mg/dose`,
        freq: "6/6h VO",
        sub: "Max 4 g/dia",
        highlight: false,
      },
    ];
  },
  notes:
    "VO: intervalo mín 4h, max 5 doses/dia ou 4 g/dia. " +
    "EV: 15 mg/kg/dose (max 1 g) 6/6h — max 60 mg/kg/dia ou 4 g/dia. " +
    "Reduzir max para 3 g/dia se hepatopatia, desnutrição grave ou uso crônico de álcool. " +
    "Halexminofeno 10 mg/mL: bolsa de 100 mL (1000 mg) — pronto uso, não diluir, infundir em 15 min.",
},
  {
    id: "ibuprofeno",
    name: "Ibuprofeno (Alivium)",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation:
      "Gotas 50mg/mL (5mg/gt) | Gotas 100mg/mL (10mg/gt) | Susp 100mg/5mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Antitérmico / Analgésico (4-10mg/kg/dose)",
        value: `${Math.min(w * 7, 600).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: "Max 600mg/dose",
        highlight: false,
      },
      {
        label: "Gotas 50mg/mL (5mg/gota)",
        value: `${Math.min(Math.ceil(w * 2), 40)} gotas/dose`,
        freq: "6-8h",
        sub: "Regra: 2 gotas/kg — Max 40 gotas",
        highlight: false,
      },
      {
        label: "Gotas 100mg/mL (10mg/gota)",
        value: `${Math.min(Math.ceil(w), 40)} gotas/dose`,
        freq: "6-8h",
        sub: "Regra: 1 gota/kg — Max 40 gotas",
        highlight: true,
      },
      {
        label: "Anti-inflamatório (40mg/kg/dia ÷ 3x)",
        value: `${Math.min((w * 40) / 3, 800).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Max 2,4g/dia — Max 10 dias",
        highlight: false,
      },
    ],
    notes:
      "A partir de 3 meses. Não usar >10 dias. Intervalo mínimo 6h. Evitar em asma.",
  },
  {
    id: "tramadol",
    name: "Tramadol",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation: "Gotas 100mg/mL (2,5mg/gt) | Caps 50mg | Amp 50mg/mL",
    dilution: "EV: 50-100mL SF0,9%",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "1-2mg/kg/dose",
        value: `${Math.min(w * 1, 100).toFixed(0)}–${Math.min(w * 2, 100).toFixed(0)} mg/dose`,
        freq: "4-6h",
        sub: "Max 100mg/dose | Max 400mg/dia | Associar antiemético",
        highlight: true,
      },
      {
        label: "Gotas 100mg/mL (2,5mg/gota)",
        value: `${Math.min(Math.ceil((w * 1.5) / 2.5), 40)} gotas/dose`,
        freq: "4-6h",
        sub: "≈ 1,5mg/kg",
        highlight: false,
      },
    ],
    notes: "Opioide fraco. Sempre associar antiemético. EV em 30 min.",
  },
  {
    id: "morfina",
    name: "Morfina",
    category: "analgesicos",
    color: "#F59E0B",
    inputType: "weight",
    presentation: "FA 1mg/mL ou 10mg/mL",
    dilution: "10mg/mL: diluir 1mL + 9mL AD → 1mg/mL",
    infusion: "EV lento 2-5 min",
    calc: (w) => [
      {
        label: "> 6 meses: 0,05-0,1mg/kg/dose",
        value: `${Math.min(w * 0.075, 4).toFixed(2)} mg/dose`,
        freq: "2-4h se necessário",
        sub: "Iniciar na menor dose. Max 5mg/dose. Desmame gradual",
        highlight: true,
      },
      {
        label: "< 6 meses: 0,025-0,05mg/kg/dose",
        value: `${Math.min(w * 0.03, 2).toFixed(3)} mg/dose`,
        freq: "4-6h",
        sub: "Maior sensibilidade a opioides",
        highlight: false,
      },
    ],
    notes: "Não suspender abruptamente. Desmame com escala WAT-1.",
  },

  // ══ CORTICOIDES ══════════════════════════
  {
    id: "prednisolona_vo",
    name: "Prednisolona VO",
    category: "corticoides",
    color: "#EF4444",
    inputType: "weight",
    presentation: "Sol 3mg/mL (Prelone, Predsim) | CP 5-40mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => {
      const gina = w <= 2 ? 20 : w <= 5 ? 30 : w <= 11 ? 40 : 50;
      return [
        {
          label: "Asma (1-2mg/kg/dia)",
          value: `${Math.min(w * 1, 60).toFixed(0)}–${Math.min(w * 2, 60).toFixed(0)} mg/dia`,
          freq: "1-2× ao dia × 3-5 dias",
          sub: `Regra: ${(Math.min(w, 60) / 3).toFixed(1)} mL/dia (3mg/mL) | GINA max: ${gina}mg/dia`,
          highlight: true,
        },
        {
          label: "Anti-inflamatório geral (0,5-2mg/kg/dia)",
          value: `${Math.min(w * 0.5, 60).toFixed(0)}–${Math.min(w * 2, 60).toFixed(0)} mg/dia`,
          freq: "1-2× ao dia",
          sub: "Max 60mg/dia",
          highlight: false,
        },
      ];
    },
    notes:
      "Regra: Peso/3 em mL/dia (3mg/mL). Para asma: 3-5 dias. GINA 2024 limita dose por faixa etária.",
  },
  {
    id: "hidrocortisona_ev",
    name: "Hidrocortisona EV",
    category: "corticoides",
    color: "#EF4444",
    inputType: "weight",
    presentation: "FA 500mg + 5mL AD (100mg/mL)",
    dilution: "Max 5mg/mL em SF0,9% ou SG5%",
    infusion: "1 hora",
    calc: (w) => [
      {
        label: "Ataque — Asma / Anafilaxia (10mg/kg)",
        value: `${Math.min(w * 10, 200).toFixed(0)} mg`,
        freq: "dose única de ataque",
        sub: "Max 200mg — correr em 1h",
        highlight: true,
      },
      {
        label: "Manutenção (4-6mg/kg/dose)",
        value: `${Math.min(w * 4, 200).toFixed(0)}–${Math.min(w * 6, 200).toFixed(0)} mg/dose`,
        freq: "4-6h",
        sub: "Max 200mg/dose",
        highlight: false,
      },
    ],
    notes: "Sem ajuste para função renal. Alternativa à metilprednisolona.",
  },
  {
    id: "dexametasona_ev",
    name: "Dexametasona EV/IM/VO",
    category: "corticoides",
    color: "#EF4444",
    inputType: "weight",
    presentation: "EV/IM: 4mg/mL ou 8mg/mL | VO: CP 4mg | Elixir 0,1mg/mL",
    dilution: "Não necessita diluição",
    infusion: "30 min",
    calc: (w) => [
      {
        label: "Crupe (0,15-0,6mg/kg — dose única)",
        value: `${Math.min(w * 0.15, 10).toFixed(2)} - ${Math.min(w * 0.6, 10).toFixed(2)} mg`,
        freq: "dose única",
        sub: "Max 10mg — preferir VO",
        highlight: true,
      },
      {
        label: "Asma exacerbação (0,6mg/kg)",
        value: `${Math.min(w * 0.6, 16).toFixed(2)} mg`,
        freq: "dose única",
        sub: "Max 16mg — equivale a 5 dias de prednisolona",
        highlight: false,
      },
      {
        label: "Anti-inflamatório",
        value: `${Math.min(w * 0.005, 8).toFixed(2)} - ${Math.min(w * 0.075, 8).toFixed(2)} mg/dose`,
        freq: "6/6h",
        sub: `0,02-0,3mg/kg/dia. Ampola 4mg/mL = ${Math.min(w * 0.00125, 2).toFixed(2)} - ${Math.min(w * 0.01875, 2).toFixed(2)} mL`,
        highlight: true,
      },
    ],
    notes:
      "Crupe: dose única. Não necessita diluição. Eficácia semelhante independente da via.",
  },
  {
    id: "metilpred_ev",
    name: "Metilprednisolona EV",
    category: "corticoides",
    color: "#EF4444",
    inputType: "weight",
    presentation: "FA 500mg (62,5mg/mL)",
    dilution: "Max 1mg/mL em SF0,9% ou SG5%",
    infusion: "30-120 min",
    calc: (w) => [
      {
        label: "Asma grave — ataque (2mg/kg)",
        value: `${Math.min(w * 2, 60).toFixed(0)} mg`,
        freq: "dose inicial",
        sub: "Max 60mg",
        highlight: true,
      },
      {
        label: "Asma — manutenção (1-2mg/kg/dia ÷ 4x)",
        value: `${Math.min(w * 0.5, 15).toFixed(0)} mg/dose`,
        freq: "6/6h",
        sub: `Max 60mg/dia`,
        highlight: false,
      },
      {
        label: "Pulsoterapia (30mg/kg/dia × 3-5 dias)",
        value: `${Math.min(w * 30, 1000).toFixed(0)} mg/dia`,
        freq: "1× ao dia",
        sub: "Max 1g/dia — infundir em 1-4h — monitorizar sinais vitais 30/30min",
        highlight: false,
      },
    ],
    notes:
      "Pulsoterapia: após → prednisolona 1-2mg/kg/dia. Apenas succinato pode ser EV.",
  },

  // ══ ANTI-HISTAMÍNICOS ════════════════════
  {
    id: "loratadina",
    name: "Loratadina (Claritin)",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Xarope 5mg/5mL (1mg/mL) | CP 10mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      if (a < 2)
        return [
          {
            label: "< 2 anos",
            value: "Não recomendado rotineiramente",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (a < 6)
        return [
          {
            label: "2-5 anos: 5mg 1×/dia",
            value: "5 mg (5mL xarope)",
            freq: "1× ao dia",
            sub: "Xarope 1mg/mL — 5mL/dia",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 6 anos: 10mg 1×/dia",
          value: "10 mg (10mL ou 1 cp)",
          freq: "1× ao dia",
          sub: "10mL xarope ou 1 comprimido",
          highlight: true,
        },
      ];
    },
    notes: "Não sedante. 1 tomada ao dia. Sem ajuste renal.",
  },
  {
    id: "desloratadina",
    name: "Desloratadina (Desalex)",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Xarope 0,5mg/mL | Gotas 1,25mg/mL (0,0625mg/gt) | CP 5mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      const m = a * 12;
      if (m < 6)
        return [
          {
            label: "< 6 meses",
            value: "Consultar especialista",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (m < 12)
        return [
          {
            label: "6-11 meses: 1mg",
            value: "1 mg/dia",
            freq: "1×/dia",
            sub: "2mL xarope 0,5mg/mL ou 16 gotas",
            highlight: true,
          },
        ];
      if (a < 6)
        return [
          {
            label: "1-5 anos: 1,25mg",
            value: "1,25 mg/dia",
            freq: "1×/dia",
            sub: "2,5mL xarope ou 20 gotas",
            highlight: true,
          },
        ];
      if (a < 12)
        return [
          {
            label: "6-11 anos: 2,5mg",
            value: "2,5 mg/dia",
            freq: "1×/dia",
            sub: "5mL xarope ou 40 gotas",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 12 anos: 5mg",
          value: "5 mg/dia (1 cp)",
          freq: "1×/dia",
          sub: "10mL xarope ou 80 gotas ou 1 comprimido",
          highlight: true,
        },
      ];
    },
    notes: "Não sedante. Dose por faixa etária.",
  },
  {
    id: "dexclorfeniramina",
    name: "Dexclorfeniramina (Polaramine)",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "age",
    presentation: "Sol 0,4mg/mL | Gotas 2,8mg/mL (0,14mg/gt) | CP 2mg",
    dilution: "—",
    infusion: "VO",
    calc: (a) => {
      if (a < 2)
        return [
          {
            label: "< 2 anos",
            value: "Não recomendado (sedação)",
            freq: "",
            sub: "",
            highlight: false,
          },
        ];
      if (a < 6)
        return [
          {
            label: "2-5 anos: 0,5mg/dose",
            value: "0,5 mg/dose",
            freq: "4-6h",
            sub: "1,25mL sol ou 5 gotas",
            highlight: true,
          },
        ];
      if (a < 12)
        return [
          {
            label: "6-11 anos: 1mg/dose",
            value: "1 mg/dose",
            freq: "4-6h",
            sub: "2,5mL sol ou 10 gotas ou ½ cp",
            highlight: true,
          },
        ];
      return [
        {
          label: "≥ 12 anos: 2mg/dose",
          value: "2 mg/dose",
          freq: "4-6h",
          sub: "5mL sol ou 20 gotas ou 1 cp",
          highlight: true,
        },
      ];
    },
    notes: "1ª geração — sedante. Dose por faixa etária.",
  },
  {
    id: "hidroxizine",
    name: "Hidroxizine (Hixizine)",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "weight",
    presentation: "Xarope 10mg/5mL (2mg/mL) | CP 25mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) => {
      if (w > 40)
        return [
          {
            label: "> 40kg: dose fixa",
            value: "25-50 mg",
            freq: "1-2×/dia",
            sub: "CP 25mg",
            highlight: true,
          },
        ];
      return [
        {
          label: "2mg/kg/dia ÷ 4x (≤ 40kg)",
          value: `${Math.min(w * 0.5, 25).toFixed(0)} mg/dose`,
          freq: "6/6h",
          sub: `Max 25mg/dose`,
          highlight: false,
        },
        {
          label: "Xarope 2mg/mL",
          value: `${(w / 4).toFixed(1)} mL/dose`,
          freq: "6/6h",
          sub: "Regra: Peso/4 em mL/dose",
          highlight: true,
        },
      ];
    },
    notes:
      "Sedante. Útil em prurido intenso e urticária. Regra: Peso/4 em mL/dose.",
  },
  {
    id: "difenidramina_ev",
    name: "Difenidramina EV/IM",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "Max 25mg/mL em SF0,9% ou SG5%",
    infusion: "10-15 min",
    calc: (w) => [
      {
        label: "1mg/kg/dose",
        value: `${Math.min(w * 1, 50).toFixed(0)} mg/dose`,
        freq: "6-8h",
        sub: "Max 50mg/dose",
        highlight: true,
      },
    ],
    notes:
      "Anafilaxia, reações alérgicas graves EV. Correr diluído em 10-15min.",
  },
  {
    id: "prometazina",
    name: "Prometazina (Fenergan)",
    category: "antihistaminicos",
    color: "#8B5CF6",
    inputType: "weight",
    presentation: "FA 25mg/mL | CP 25mg",
    dilution: "Evitar via EV (necrose tecidual)",
    infusion: "IM preferencial",
    calc: (w) => [
      {
        label: "0,25-1mg/kg/dose (habitual 0,5mg/kg) — ≥ 2 anos",
        value: `${Math.min(w * 0.5, 25).toFixed(1)} mg/dose`,
        freq: "4-6h",
        sub: `Max 25mg/dose | ${(Math.min(w * 0.5, 25) / 25).toFixed(2)}mL da amp (25mg/mL) IM`,
        highlight: true,
      },
    ],
    notes: "≥ 2 anos. EVITAR via EV. Preferir IM ou VO. Sedante.",
  },

  // ══ TGI ═══════════════════════════════════
  {
    id: "ondansetrona",
    name: "Ondansetrona",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "FA 2mg/mL | CP 4mg, 8mg | Sol Ondset 0,8mg/mL",
    dilution: "EV: push puro em 2-5 min",
    infusion: "2-5 min (push)",
    calc: (w) => {
      const oral = w < 15 ? Math.min(w * 0.2, 4) : w < 30 ? 4 : 8;
      const ev = Math.min(w * 0.15, 8);
      return [
        {
          label: "VO (por peso)",
          value: `${oral.toFixed(1)} mg/dose`,
          freq: "8/8h",
          sub:
            w < 15
              ? `0,2mg/kg (<15kg)`
              : w < 30
                ? "4mg fixo (15-30kg)"
                : "8mg fixo (>30kg)",
          highlight: false,
        },
        {
          label: "EV (0,15-0,3mg/kg)",
          value: `${ev.toFixed(1)} mg/dose`,
          freq: "8/8h",
          sub: `Regra EV: 0,075 × ${w.toFixed(1)} = ${(0.075 * w).toFixed(2)}mL da amp 2mg/mL — push puro 2-5min`,
          highlight: true,
        },
      ];
    },
    notes: "≥ 3 meses. Pode repetir VO se vomitar em 15min. Max 16mg/dose EV.",
  },
  {
    id: "domperidona",
    name: "Domperidona (Motilium)",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Susp 1mg/mL | CP 10mg",
    dilution: "—",
    infusion: "VO",
    calc: (w) =>
      w > 35
        ? [
            {
              label: "> 35kg: dose fixa 10mg",
              value: "10 mg/dose",
              freq: "8/8h",
              sub: "1 comprimido",
              highlight: true,
            },
          ]
        : [
            {
              label: "0,25mg/kg/dose (≤ 35kg)",
              value: `${Math.min(w * 0.25, 10).toFixed(2)} mg/dose`,
              freq: "8/8h",
              sub: `Max 1mg/kg/dia`,
              highlight: true,
            },
          ],
    notes:
      "Para refluxo e gastroparesia. Max 1mg/kg/dia. Não ultrapassar 30mg/dia.",
  },
  {
    id: "omeprazol",
    name: "Omeprazol VO/EV",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Caps 10-40mg | Losec Mups (diluível) | FA 40mg EV",
    dilution: "EV: SF0,9%",
    infusion: "20-30 min",
    calc: (w) => [
      {
        label: "1-2mg/kg/dia",
        value: `${w < 20 ? 10 : 20} mg/dia`,
        freq: "1-2×/dia",
        sub: `<20kg: 10mg/dia | >20kg: 20mg/dia | Max 40mg/dia`,
        highlight: true,
      },
    ],
    notes:
      "<20kg: 10mg | >20kg: 20mg. Losec Mups pode ser diluído e dado via sonda.",
  },
  {
    id: "lactulose",
    name: "Lactulose (Lactulona)",
    category: "tgi",
    color: "#0EA5E9",
    inputType: "weight",
    presentation: "Xarope 667mg/mL | Sachê 10g/15mL",
    dilution: "—",
    infusion: "VO",
    calc: (w) => [
      {
        label: "Constipação (1-3mL/kg/dia)",
        value: `${Math.min(w * 2, 90).toFixed(0)} mL/dia`,
        freq: "1× ao dia (dividir se >30mL)",
        sub: "Ajustar para 1-2 evacuações/dia | Max 90mL/dia",
        highlight: true,
      },
    ],
    notes:
      "A partir de 6 meses. 1× ao dia preferencial. Dividir dose se volume alto.",
  },

  // ══ BRONCODILATADORES ════════════════════
  {
    id: "salbutamol_spray",
    name: "Salbutamol Spray (Aerolin)",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "100mcg/jato",
    dilution: "Usar com espaçador",
    infusion: "Inalatório",
    calc: (w) => [
      {
        label: "Resgate agudo — Peso/3 jatos",
        value: `${Math.min(Math.ceil(w / 3), 10)} jatos/dose`,
        freq: "20/20min (resgate agudo)",
        sub: "Min 2 — Max 10 jatos — SEMPRE com espaçador",
        highlight: true,
      },
      {
        label: "Manutenção (pós-alta)",
        value: `${Math.max(2, Math.min(Math.ceil(w / 3), 10) - 2)}-${Math.min(Math.ceil(w / 3), 10)} jatos/dose`,
        freq: "4-6h por 5 dias",
        sub: "Reduzir frequência após melhora clínica",
        highlight: false,
      },
    ],
    notes:
      "Regra: Peso/3 jatos/dose (min 2, max 10). SEMPRE com espaçador para < 6-8 anos.",
  },
  {
    id: "ipratropio",
    name: "Ipratrópio NBZ (Atrovent)",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "Sol inalatória 0,25mg/mL",
    dilution: "—",
    infusion: "Nebulização",
    calc: (w) => {
      const dose = w < 10 ? "10 gotas" : w < 20 ? "20 gotas" : "40 gotas";
      const sub = w < 10 ? "< 10kg" : w < 20 ? "10-20kg" : "> 20kg";
      return [
        {
          label: `Dose por peso (${sub})`,
          value: dose,
          freq: "20/20min (emergência)",
          sub: "Intercalar com salbutamol | Mais indicado em crise grave",
          highlight: true,
        },
      ];
    },
    notes:
      "Spray: 4-8 jatos/dose. Indicado em emergência para evitar hospitalização.",
  },
  {
    id: "sulfato_magnesio",
    name: "Sulfato de Magnésio (Asma)",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "MgSO4 50% (500mg/mL) | 10% (100mg/mL)",
    dilution: "Diluir em SF0,9%",
    infusion: "Sulfatinho 20 min | Sulfatão 4h",
    calc: (w) => [
      {
        label: "Sulfatinho — 50mg/kg (25-75) em 20 min",
        value: `${Math.min(w * 50, 2000).toFixed(0)} mg`,
        freq: "dose única",
        sub: `${(Math.min(w * 50, 2000) / 500).toFixed(1)}mL da sol 50% | Max 2g`,
        highlight: true,
      },
      {
        label: "Sulfatão — 200mg/kg em 4 horas (50mg/kg/h)",
        value: `${Math.min(w * 200, 8000).toFixed(0)} mg`,
        freq: "dose única em BIC",
        sub: "Diluir para 60mg/mL em SF0,9% | Max 8g",
        highlight: false,
      },
      {
        label: "Antídoto se intoxicação",
        value: `Gluconato de Cálcio 10% ${Math.min(w * 0.5, 30).toFixed(0)} mL`,
        freq: "",
        sub: "Velocidade máx 0,5mL/kg/min",
        highlight: false,
      },
    ],
    notes:
      "Crise muito grave após ≥ 2h de β2 sem resposta. Monitorizar: PA, FR, diurese.",
  },
  {
    id: "budesonida_nbz",
    name: "Budesonida NBZ (Pulmicort)",
    category: "broncodilatadores",
    color: "#6366F1",
    inputType: "weight",
    presentation: "0,25mg/mL e 0,5mg/mL",
    dilution: "Diluir em igual volume de SF0,9%",
    infusion: "Nebulização",
    calc: (_w) => [
      {
        label: "Crupe leve-moderado (2-4mg/dose)",
        value: "2-4 mg/dose",
        freq: "12/12h por 5 dias",
        sub: "Eficácia semelhante à dexametasona em casos leves-moderados",
        highlight: true,
      },
    ],
    notes:
      "Alternativa à dexametasona no crupe. Dilui-se em igual volume de SF0,9%.",
  },

  // ══ ANTICONVULSIVANTES ════════════════════
  {
    id: "midazolam_crise",
    name: "Midazolam (Crise Convulsiva)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "FA 5mg/mL",
    dilution: "EV: diluir 1mL em 4mL AD → 1mg/mL",
    infusion: "EV push",
    calc: (w) => {
      const maxEV = w < 40 ? 5 : 10;
      const ev = Math.min(w * 0.2, maxEV);
      const in_total = Math.min(w * 0.25, 7.5);
      return [
        {
          label: `EV (0,1-0,3mg/kg — habitual 0,2mg/kg) — Max ${maxEV}mg`,
          value: `${ev.toFixed(1)} mg`,
          freq: "Cada 5 min — máx 3 doses",
          sub: `Diluição 1:4 → ${ev.toFixed(1)}mL EV | Puro: ${(ev / 5).toFixed(2)}mL`,
          highlight: true,
        },
        {
          label: "Intranasal (0,2-0,3mg/kg) — sem acesso EV",
          value: `${in_total.toFixed(1)} mg total`,
          freq: "dose única",
          sub: `Puro (5mg/mL): ${(in_total / 5 / 2).toFixed(2)}mL em CADA narina | Max 7,5mg`,
          highlight: false,
        },
        {
          label: "IM (0,2-0,4mg/kg) — alternativa",
          value: `${Math.min(w * 0.3, 10).toFixed(1)} mg`,
          freq: "dose única",
          sub: `${(Math.min(w * 0.3, 10) / 5).toFixed(2)}mL puro — preferir IN`,
          highlight: false,
        },
      ];
    },
    notes:
      "1ª escolha > 3 meses. Max 3 doses EV. A partir da 2ª dose: preparar para IOT.",
  },
  {
    id: "fenobarbital_ataque",
    name: "Fenobarbital EV (Ataque)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "FA 100mg/mL",
    dilution: "1mL em 9mL AD → 10mg/mL",
    infusion: "10 min (100mg/min)",
    calc: (w) => [
      {
        label: "Ataque EV/IM (15-20mg/kg)",
        value: `${Math.min(w * 20, 1000).toFixed(0)} mg`,
        freq: "dose inicial",
        sub: `${Math.min(w * 2, 100).toFixed(0)}mL da sol 10mg/mL | Max 1000mg`,
        highlight: true,
      },
      {
        label: "Dose adicional (5-20mg/kg) — se falha após 5min",
        value: `${Math.min(w * 5).toFixed(0)}–${Math.min(w * 20, 1000).toFixed(0)} mg`,
        freq: "após 5 min",
        sub: "Max acumulado: 30mg/kg",
        highlight: false,
      },
      {
        label: "Manutenção (3-5mg/kg/dia)",
        value: `${Math.min(w * 4, 300).toFixed(0)} mg/dia`,
        freq: "24/24h",
        sub: "Iniciar 12h após ataque | Max 300mg/dia",
        highlight: false,
      },
    ],
    notes: "1ª escolha < 3 meses. Início ação: 15-20min. Leva tempo para agir.",
  },
  {
    id: "fenitoina_ev",
    name: "Fenitoína EV (Ataque)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "1:4 → 10mg/mL — NUNCA em SG",
    infusion: "20-30 min (máx 50mg/min)",
    calc: (w) => [
      {
        label: "Ataque EV (20mg/kg)",
        value: `${Math.min(w * 20, 1000).toFixed(0)} mg`,
        freq: "dose inicial",
        sub: `${Math.min(w * 2, 100).toFixed(0)}mL (10mg/mL) em 20-30min | Max 1000mg`,
        highlight: true,
      },
      {
        label: "Adicional (5mg/kg) — se não controlou",
        value: `${Math.min(w * 5, 250).toFixed(0)} mg`,
        freq: "pode repetir × 2",
        sub: "Max acumulado: 30mg/kg",
        highlight: false,
      },
      {
        label: "Manutenção (5-10mg/kg/dia ÷ 3x)",
        value: `${Math.min((w * 7) / 3, 150).toFixed(0)} mg/dose`,
        freq: "8/8h",
        sub: "Iniciar 12h após ataque",
        highlight: false,
      },
    ],
    notes:
      "Preferir para: convulsão focal, tumor SNC, TCE. NÃO diluir em SG. NÃO misturar com KCl.",
  },
  {
    id: "levetiracetam",
    name: "Levetiracetam (Keppra)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation:
      "Sol oral 100mg/mL | CP 250/500/750/1000mg | CP XR 500mg | Sol EV 100mg/mL",
    dilution: "EV: diluir dose em 100mL SF0,9% ou SG5%",
    infusion: "EV em 15 min",
    calc: (w) => {
      if (w <= 50) {
        const ini = Math.min(w * 10, 500);
        const max_d = Math.min(w * 30, 1500);
        const ini_ml = (ini / 100).toFixed(2);
        const max_ml = (max_d / 100).toFixed(2);
        return [
          {
            label: "VO — Dose inicial (10mg/kg/dose) — < 50kg",
            value: `${ini.toFixed(0)} mg/dose`,
            freq: "12/12h",
            sub: `Sol 100mg/mL: ${ini_ml}mL/dose | Regra: 0,1mL/kg/dose\n⚠ ≤ 25kg: preferir solução oral (não partir comprimido)`,
            highlight: true,
          },
          {
            label: "VO — Dose máxima (30mg/kg/dose) — < 50kg",
            value: `${max_d.toFixed(0)} mg/dose`,
            freq: "12/12h",
            sub: `Sol 100mg/mL: ${max_ml}mL/dose | Aumentar 10mg/kg/dose a cada 2 semanas`,
            highlight: false,
          },
          {
            label: "EV — Dose inicial (10mg/kg/dose) — < 50kg",
            value: `${ini.toFixed(0)} mg/dose EV`,
            freq: "12/12h",
            sub: `Diluir em 100mL SF0,9% — infundir em 15 min | Max 30mg/kg/dose`,
            highlight: false,
          },
          {
            label: "1-6 meses — dose inicial (7mg/kg/dose)",
            value: `${Math.min(w * 7, 210).toFixed(0)} mg/dose`,
            freq: "12/12h",
            sub: `Sol 100mg/mL: ${(Math.min(w * 7, 210) / 100).toFixed(2)}mL/dose (0,07mL/kg) | Max: 21mg/kg/dose`,
            highlight: false,
          },
        ];
      } else {
        return [
          {
            label: "VO — Dose inicial (> 50kg / adolescente)",
            value: "500 mg/dose",
            freq: "12/12h",
            sub: "Progredir para 1.500mg/dose após 2 semanas | Incrementos de 500mg/dose a cada 2-4 sem | Max 1.500mg/dose",
            highlight: true,
          },
          {
            label: "VO XR (liberação prolongada) — > 50kg",
            value: "1.000 mg/dia",
            freq: "1× ao dia",
            sub: "Iniciar 500mg/dia por 2 sem → 1.000mg/dia | Incrementos de 500mg/dia a cada 2 sem | Max 3.000mg/dia",
            highlight: false,
          },
          {
            label: "EV — Dose adjuvante (> 50kg)",
            value: "500 mg/dose EV",
            freq: "12/12h",
            sub: "Diluir em 100mL SF0,9% — infundir em 15 min | Pode progredir até 1.500mg/dose | Incrementos 500mg a cada 2-4 sem",
            highlight: false,
          },
        ];
      }
    },
    notes:
      "Monoterapia: ≥ 16 anos. Adjuvante: a partir de 1 mês. Ajuste para ClCr (ver Rfofos). Efeitos: irritabilidade, sintomas depressivos — especialmente em pediatria. Não partir comprimido XR. ≤ 25kg: solução oral preferencial.",
  },
  {
    id: "diazepam_retal",
    name: "Diazepam (Retal / EV)",
    category: "anticonvulsivantes",
    color: "#EC4899",
    inputType: "weight",
    presentation: "FA 10mg/2mL (5mg/mL)",
    dilution: "EV: puro e lento",
    infusion: "EV lento",
    calc: (w) => [
      {
        label: "EV (0,2-0,4mg/kg)",
        value: `${Math.min(w * 0.3, 10).toFixed(1)} mg`,
        freq: "repetir em 5 min se necessário",
        sub: `${(Math.min(w * 0.3, 10) / 5).toFixed(2)}mL puro EV lento | Max 10mg`,
        highlight: false,
      },
      {
        label: "VIA RETAL (0,5-1mg/kg)",
        value: `${Math.min(w * 0.75, 20).toFixed(1)} mg`,
        freq: "repetir em 5 min se necessário",
        sub: "Max 20mg — alternativa sem acesso EV",
        highlight: true,
      },
    ],
    notes:
      "NÃO usar IM (absorção errática). Via retal: alternativa sem acesso venoso.",
  },

  // ══ SEDAÇÃO / ANALGESIA ════════════════
  {
    id: "quetamina",
    name: "Quetamina (Sedação/ISR)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "1mL + 4mL AD → 10mg/mL",
    infusion: "EV lento",
    calc: (w) => [
      {
        label: "Sedação procedimento (1-4mg/kg)",
        value: `${Math.min(w * 2, 100).toFixed(0)} mg`,
        freq: "dose única",
        sub: `${(Math.min(w * 2, 100) / 10).toFixed(1)}mL (10mg/mL) EV lento | Max 100mg`,
        highlight: true,
      },
      {
        label: "ISR — indução (1-2mg/kg)",
        value: `${Math.min(w * 1.5, 100).toFixed(0)} mg`,
        freq: "dose única bolus ISR",
        sub: "Preferir em asma, hipotenso, TCE",
        highlight: false,
      },
    ],
    notes:
      "Analgesia + sedação sem depressão cardiorrespiratória. Atenção: laringoespasmo, alucinações, hipersecreção.",
  },
  {
    id: "midazolam_sed",
    name: "Midazolam (Sedação / ISR)",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 5mg/mL",
    dilution: "1mL + 4mL AD → 1mg/mL",
    infusion: "EV",
    calc: (w) => [
      {
        label: "Sedação procedimento (0,1-0,2mg/kg)",
        value: `${Math.min(w * 0.15, 5).toFixed(1)} mg`,
        freq: "dose única",
        sub: `${(Math.min(w * 0.15, 5) / 1).toFixed(1)}mL (1mg/mL) | Max 5mg`,
        highlight: true,
      },
      {
        label: "ISR — indução (0,2mg/kg)",
        value: `${Math.min(w * 0.2, 5).toFixed(1)} mg`,
        freq: "dose única",
        sub: "Preferir em paciente hemodinamicamente estável",
        highlight: false,
      },
      {
        label: "Infusão contínua UTI",
        value: "0,1-0,6 mg/kg/h",
        freq: "BIC",
        sub: `Iniciar: ${(w * 0.1).toFixed(1)}mg/h | Titular conforme sedação (RASS/SAS)`,
        highlight: false,
      },
    ],
    notes:
      "Depressão respiratória e hipotensão. Sem efeito analgésico. 1ª escolha sedação UTI.",
  },
  {
    id: "fentanil_ev",
    name: "Fentanil EV",
    category: "sedativos",
    color: "#F97316",
    inputType: "weight",
    presentation: "FA 50mcg/mL",
    dilution: "Diluir 1mL + 4mL AD",
    infusion: "EV lento 3-5 min",
    calc: (w) => [
      {
        label: "Procedimento / ISR (1-5mcg/kg)",
        value: `${Math.min(w * 2, 100).toFixed(0)} mcg`,
        freq: "dose única",
        sub: `Regra: ${(w / 5).toFixed(1)}mL EV lento | Max 100mcg — infundir em 3-5min (rigidez torácica)`,
        highlight: true,
      },
      {
        label: "Infusão contínua UTI",
        value: "1-10 mcg/kg/h",
        freq: "BIC",
        sub: `Iniciar: ${(w * 1).toFixed(0)}mcg/h`,
        highlight: false,
      },
    ],
    notes:
      "Infundir LENTAMENTE (risco rigidez torácica em RN/lactentes). Antagonista: Naloxona.",
  },
];

// ─────────────────────────────────────────────
// EMERGENCY PROTOCOLS
// ─────────────────────────────────────────────
const EMERGENCIES = [
  {
    id: "cad",
    name: "Cetoacidose Diabética",
    emoji: "🩸",
    color: "#F59E0B",
    description: "CAD — Hiperglicemia + Acidose + Cetose",
    notes:
      "CRITÉRIOS: Glicemia >200 + pH <7,3 e/ou Bic <15 + Cetose. CLASSIFICAÇÃO: Leve pH 7,2-7,3 | Moderada pH 7,1-7,2 | Grave pH <7,1. MONITORAR: Dx 1/1h · SV + diurese + neurológico 1/1h · Gasometria + eletrólitos 2-4h · Cetonemia 2/2h. SUSPENDER BOMBA: pH >7,3 + HCO3 >18 + Glicemia <200 → 1h antes: insulina IM regular 0,05-0,1U/kg → pausar bomba → dieta.",
    drugs: (w) => [
      {
        order: 1,
        name: "SF 0,9% — Expansão 1ª fase (1ª hora)",
        urgency: "IMEDIATO — antes de tudo",
        dose: `${Math.min(w * 20, 500).toFixed(0)}–${Math.min(w * 20, 1000).toFixed(0)} mL bolus`,
        prep: "SF 0,9% ou Ringer Lactato — 10-20mL/kg em 20-30 min. Reavaliar; repetir se necessário",
        freq: "1-2 bolus na 1ª hora",
        max: "",
        highlight: true,
      },
      {
        order: 2,
        name: "HV 2ª fase — repor perdas em 24-48h",
        urgency: "Após expansão",
        dose: (() => {
          const ch =
            w <= 10
              ? w * 100
              : w <= 20
                ? 1000 + (w - 10) * 50
                : 1500 + (w - 20) * 20;
          const perda_mod = Math.round(w * 70); // 7% moderada (referência)
          const total = Math.round(ch + perda_mod);
          return `~${total} mL/dia (Holliday + 7% perda)`;
        })(),
        prep: "CAD leve: +5% peso · Moderada: +7% peso · Grave: +10% peso. Dividir reposição em 24-48h. Se Dx>250: SF0,9% puro. Se Dx<250: SGF 1:1. Se Dx<150: SG10%+NaCl",
        freq: "BIC contínua — ajustar conforme Dx seriado",
        max: "",
        highlight: false,
      },
      {
        order: 3,
        name: "Potássio — reposição na HV",
        urgency: "ANTES da insulina",
        dose: "40 mEq/L na solução",
        prep: "K ≥3,5 e <5,5: acrescentar 40mEq/L. K <3,5: corrigir primeiro (0,5mEq/kg/h) + ATRASAR insulina 1h. K ≥5,5: não repor — checar diurese",
        freq: "Reavaliar K + gasometria a cada 2-4h",
        max: "Usar K corrigido pelo pH: cada 0,1 de pH abaixo de 7,3 reduz K em 0,6mEq/L",
        highlight: false,
      },
      {
        order: 4,
        name: "Insulina Regular — Bomba EV contínua",
        urgency: "Iniciar 1-2h após expansão + K corrigido",
        dose: `0,1 UI/kg/h = ${(w * 0.1).toFixed(1)} mL/h`,
        prep: `Preparar: Insulina Regular 50UI + SF0,9% 500mL → 0,1UI/mL. Fazer ${(w * 0.1).toFixed(1)}mL/h (= 0,1UI/kg/h = peso em mL/h)`,
        freq: `Dx >250 → ${w.toFixed(0)}mL/h | Dx <250 ou queda >100mg/dL/h → ${(w / 2).toFixed(1)}mL/h (metade)`,
        max: "Trocar solução + equipo a cada 6h. NÃO suspender até resolução bioquímica",
        highlight: true,
      },
      {
        order: 5,
        name: "Insulina IM — transição para SC",
        urgency: "Ao resolver CAD",
        dose: `${Math.min(w * 0.05, 5).toFixed(2)}–${Math.min(w * 0.1, 10).toFixed(2)} UI Regular SC`,
        prep: "Fazer 1h ANTES de pausar a bomba. Após: iniciar dieta + NPH+Regular conforme esquema de manutenção",
        freq: "Dose única de transição",
        max: "Manutenção: Lactente 0,3-0,5 | Criança 0,5-0,7 | Púbere 0,8-2 UI/kg/dia",
        highlight: false,
      },
    ],
  },
  {
    id: "anafilaxia",
    name: "Anafilaxia",
    emoji: "⚡",
    color: "#EF4444",
    description: "Reação alérgica grave sistêmica",
    notes:
      "1. Adrenalina IM IMEDIATA — decúbito c/ MMII elevados — 2. O₂ alto fluxo — 3. Acesso venoso — 4. SF 0,9% 20mL/kg se hipotensão — 5. Monitorizar SpO₂, PA, FC — 6. Observação mínima 4-6h (risco de resposta bifásica)",
    drugs: (w) => [
      {
        order: 1,
        name: "Adrenalina 1:1000 IM — vasto lateral",
        urgency: "PRIMEIRA LINHA — IMEDIATO",
        dose: `${Math.min(w * 0.01, 0.5).toFixed(2)} mg (${Math.min(w * 0.01, 0.5).toFixed(2)} mL)`,
        prep: "Solução pura 1mg/mL (1:1000) — IM no músculo vasto lateral",
        freq: "Repetir a cada 5-15 min — máx 3×",
        max: "Max 0,5mg (0,5mL)",
        highlight: true,
      },
      {
        order: 2,
        name: "Hidrocortisona EV",
        urgency: "2ª linha — após adrenalina",
        dose: `${Math.min(w * 10, 200).toFixed(0)} mg`,
        prep: "FA 100mg/mL — diluir max 5mg/mL — infundir em 1h",
        freq: "Dose única de ataque",
        max: "Max 200mg",
        highlight: false,
      },
      {
        order: 3,
        name: "Difenidramina EV",
        urgency: "Adjuvante",
        dose: `${Math.min(w * 1, 50).toFixed(0)} mg`,
        prep: "FA 50mg/mL — diluir em SF0,9% — correr em 10-15min",
        freq: "6-8h conforme necessidade",
        max: "Max 50mg/dose",
        highlight: false,
      },
      {
        order: 4,
        name: "Prednisolona VO (alta hospitalar)",
        urgency: "Continuação",
        dose: `${Math.min(w * 1, 60).toFixed(0)} mg/dia`,
        prep: `Sol 3mg/mL — ${(Math.min(w, 60) / 3).toFixed(1)}mL/dia`,
        freq: "1-2× ao dia por 3-5 dias",
        max: "Max 60mg/dia",
        highlight: false,
      },
    ],
  },
  {
    id: "asma",
    name: "Asma / Broncoespasmo",
    emoji: "🫁",
    color: "#6366F1",
    description: "Crise asmática aguda",
    notes:
      "O₂ se SpO₂ < 95% — Preferir corticoide VO (mesma eficácia que EV) — Sulfato de Magnésio se má resposta após 2h de β2 — Não há indicação de adrenalina nebulizada na asma (apenas no crupe) — Terbutalina SC/IM como resgate adicional em crise grave",
    drugs: (w) => [
      {
        order: 1,
        name: "Salbutamol Spray (Aerolin) c/ espaçador",
        urgency: "PRIMEIRA LINHA",
        dose: `${Math.min(Math.ceil(w / 3), 10)} jatos`,
        prep: "100mcg/jato — SEMPRE com espaçador — Regra: Peso/3 jatos (min 2, max 10)",
        freq: "A cada 20min nas 1ª 2h",
        max: "Max 10 jatos/dose",
        highlight: true,
      },
      {
        order: 2,
        name: "Ipratrópio NBZ — emergência (grave)",
        urgency: "Intercalar com salbutamol",
        dose: w < 10 ? "10 gotas" : w < 20 ? "20 gotas" : "40 gotas",
        prep: "Atrovent 0,25mg/mL — nebulizar",
        freq: "20/20min — máx 3 doses",
        max: "",
        highlight: false,
      },
      {
        order: 3,
        name: "Prednisolona VO (preferencial)",
        urgency: "Corticoide",
        dose: `${Math.min(w * 1, 40).toFixed(0)} mg/dia`,
        prep: `Sol 3mg/mL — ${(Math.min(w, 40) / 3).toFixed(1)}mL/dia`,
        freq: "1× ao dia × 3-5 dias",
        max:
          w <= 2
            ? "Max 20mg"
            : w <= 5
              ? "Max 30mg"
              : w <= 11
                ? "Max 40mg"
                : "Max 50mg (GINA)",
        highlight: false,
      },
      {
        order: 4,
        name: "Sulfato de Magnésio EV — crise grave",
        urgency: "Má resposta após 2h de β2",
        dose: `${Math.min(w * 50, 2000).toFixed(0)} mg em 20 min`,
        prep: `MgSO4 50% → ${(Math.min(w * 50, 2000) / 500).toFixed(1)}mL + SF0,9% para 60mg/mL`,
        freq: "Dose única",
        max: "Max 2g",
        highlight: false,
      },
    ],
  },
  {
    id: "convulsao",
    name: "Crise Convulsiva (> 3m)",
    emoji: "🧠",
    color: "#EC4899",
    description: "Estado de mal convulsivo",
    notes:
      "Sequência >3m: BZD (até 3× com 5min) → Fenitoína → Fenobarbital → Infusão contínua (Midazolam/Propofol/Quetamina) — Checar: glicemia, eletrólitos, temperatura, acesso venoso — 2ª dose BZD: preparar para IOT",
    drugs: (w) => [
      {
        order: 1,
        name: "Midazolam EV (1ª escolha > 3m)",
        urgency: "PRIMEIRA LINHA — dose 1",
        dose: `${Math.min(w * 0.2, w < 40 ? 5 : 10).toFixed(1)} mg EV`,
        prep: `Diluição 1:4 → 1mg/mL. Fazer ${Math.min(w * 0.2, w < 40 ? 5 : 10).toFixed(1)}mL EV push`,
        freq: "Cada 5 min — máx 3 doses",
        max: "<40kg: 5mg | >40kg: 10mg",
        highlight: true,
      },
      {
        order: 2,
        name: "Midazolam IN — sem acesso EV",
        urgency: "Alternativa — sem acesso venoso",
        dose: `${Math.min(w * 0.25, 7.5).toFixed(1)} mg total IN`,
        prep: `FA puro (5mg/mL): ${(Math.min(w * 0.25, 7.5) / 5 / 2).toFixed(3)}mL em CADA narina`,
        freq: "Dose única",
        max: "Max 7,5mg total",
        highlight: false,
      },
      {
        order: 3,
        name: "Fenitoína EV (2ª linha)",
        urgency: "Após BZD falhar",
        dose: `${Math.min(w * 20, 1000).toFixed(0)} mg EV`,
        prep: `Diluir 1:4 → 10mg/mL. ${Math.min(w * 2, 100).toFixed(0)}mL em 20-30min. NÃO em SG`,
        freq: "Dose única — repetir 5mg/kg se necessário",
        max: "Max 1000mg / acumulado 30mg/kg",
        highlight: false,
      },
      {
        order: 4,
        name: "Fenobarbital EV (1ª linha < 3m)",
        urgency: "< 3 meses OU 3ª linha",
        dose: `${Math.min(w * 20, 400).toFixed(0)} mg EV`,
        prep: `Diluir 1:9 → 10mg/mL. ${Math.min(w * 2, 40).toFixed(0)}mL em 10min`,
        freq: "Pode repetir 5-20mg/kg — Max 30mg/kg",
        max: "Max 30mg/kg total",
        highlight: false,
      },
    ],
  },
  {
    id: "hipoglicemia",
    name: "Hipoglicemia Grave",
    emoji: "🍬",
    color: "#F59E0B",
    description: "DX < 70 (criança) ou < 60 (RN) com sintomas",
    notes:
      "Consciente: 15g carboidratos VO (3 sachês mel — NÃO <1 ano, 150mL suco, 3-4 balas). Inconsciente/sem acesso: Glucagon IM. Repetir DX em 15-20 min após correção. Manter VIG de manutenção pós-correção.",
    drugs: (w) => [
      {
        order: 1,
        name: "Glicose 10% IV Bolus — criança",
        urgency: "PRIMEIRA LINHA — acesso venoso",
        dose: `${(w * 7.5).toFixed(0)} mL de SG10% (0,5-1g/kg)`,
        prep: "SG 10% — 5-10mL/kg EV bolus. Alternativa: SG25% 2-4mL/kg (= SG50%+AD 1:1)",
        freq: "Repetir DX em 15-20 min",
        max: "",
        highlight: true,
      },
      {
        order: 2,
        name: "Glicose 10% IV Bolus — RN",
        urgency: "RN — ACESSO venoso",
        dose: `${(w * 2).toFixed(0)} mL de SG10%`,
        prep: "2mL/kg SG10% | ou 4mL/kg SG5% EV bolus",
        freq: "Repetir DX em 15-20 min",
        max: "",
        highlight: false,
      },
      {
        order: 3,
        name: "Glucagon IM — sem acesso venoso",
        urgency: "Sem acesso venoso",
        dose: w < 25 ? "0,5 mg IM" : "1 mg IM",
        prep: "<25kg: 0,5mg | ≥25kg: 1mg — efeito transitório",
        freq: "Repetir DX 15 min após (efeito dura 15-20min)",
        max: "Max 1mg",
        highlight: false,
      },
      {
        order: 4,
        name: "VIG de manutenção após correção",
        urgency: "Manutenção pós-crise",
        dose: "VIG 4-6 mg/kg/min",
        prep: `GG = VIG × ${w} × 1,44 = ${(4 * w * 1.44).toFixed(1)}g/dia (VIG 4)`,
        freq: "BIC contínua — ajustar conforme DX seriado",
        max: "",
        highlight: false,
      },
    ],
  },
  {
    id: "crupe",
    name: "Crupe (Estridor)",
    emoji: "🗣️",
    color: "#F97316",
    description: "Laringotraqueobronquite viral — Westley",
    notes:
      "O₂ umedecido — Manter calma (agitação piora o estridor) — NÃO examinar orofaringe se suspeita de epiglotite — Dexametasona é pilar do tratamento — Adrenalina nebulizada tem efeito transitório (max 2h): observar por 2-4h antes de alta",
    drugs: (w) => [
      {
        order: 1,
        name: "Dexametasona VO/IM/EV — dose única",
        urgency: "PRIMEIRA LINHA",
        dose: `${Math.min(w * 0.6, 10).toFixed(2)} mg`,
        prep: "0,15-0,6mg/kg — PREFERIR VO (elixir 0,1mg/mL ou cp 4mg) — Max 10mg",
        freq: "Dose única",
        max: "Max 10mg",
        highlight: true,
      },
      {
        order: 2,
        name: "Adrenalina Nebulizada 1:1000 — grave",
        urgency: "Crupe grave / estridor em repouso",
        dose: `${Math.min(w / 2, 5).toFixed(1)} mL de adrenalina 1:1000`,
        prep: `1:1000 (1mg/mL) puro OU + igual volume SF — nebulizar`,
        freq: "Observar por 2-4h (efeito rebote possível)",
        max: "Max 5mL",
        highlight: false,
      },
      {
        order: 3,
        name: "Budesonida NBZ — alternativa leve-mod",
        urgency: "Alternativa",
        dose: "2-4 mg/dose",
        prep: "Pulmicort 0,25 ou 0,5mg/mL + igual vol SF — nebulizar",
        freq: "12/12h por 5 dias",
        max: "Eficácia similar à dexametasona leve-mod",
        highlight: false,
      },
    ],
  },
  {
    id: "pcr",
    name: "PCR — PALS",
    emoji: "💓",
    color: "#EF4444",
    description: "Parada Cardiorrespiratória — Protocolo PALS",
    notes:
      "Compressões de qualidade (1/3 diâmetro AP) — 100-120/min — Mínima interrupção — Desfibrilação 2-4J/kg (FV/TV) — Acesso IO se sem EV em 90s — 9Hs e Ts: Hipóxia, Hipovolemia, Hipotermia, H⁺ (acidose), Hiper/Hipocalemia, Hipoglicemia — Tensão pneumotórax, Tamponamento, TEP, Tóxicos",
    drugs: (w) => [
      {
        order: 1,
        name: "Adrenalina EV/IO (sol 1:10.000)",
        urgency: "A cada 3-5 min",
        dose: `${Math.min(w * 0.01, 1).toFixed(2)} mg (${Math.min(w * 0.1, 10).toFixed(1)} mL)`,
        prep: "1:10.000 = 0,1mg/mL. Fazer 0,1mL/kg EV/IO. Se só 1:1000: diluir 1mL + 9mL SF",
        freq: "A cada 3-5 minutos",
        max: "Max 1mg/dose",
        highlight: true,
      },
      {
        order: 2,
        name: "Adrenalina ET — se sem EV/IO",
        urgency: "Endotraqueal — menos eficaz",
        dose: `${Math.min(w * 0.1, 2.5).toFixed(2)} mg ET`,
        prep: "Dose 10× maior. Usar sol 1:1000 pura — seguir com 5 ventilações",
        freq: "A cada 3-5 minutos",
        max: "Trocar para EV/IO assim que possível",
        highlight: false,
      },
      {
        order: 3,
        name: "Amiodarona (FV/TV refratária — 3ª DC)",
        urgency: "Choque refratário",
        dose: `${Math.min(w * 5, 300).toFixed(0)} mg EV/IO`,
        prep: "5mg/kg em bolus — pode repetir × 2 (após 5ª desfibrilação)",
        freq: "",
        max: "Max 300mg/dose | Max 15mg/kg total",
        highlight: false,
      },
      {
        order: 4,
        name: "Bicarbonato 8,4% — acidose grave",
        urgency: "PCR prolongada / acidose documentada",
        dose: `${Math.min(w, 50).toFixed(0)} mEq (${Math.min(w, 50).toFixed(0)} mL sol 8,4%)`,
        prep: "BicNa 8,4% = 1mEq/mL — Não na mesma via que Ca²⁺",
        freq: "Dose única — reavaliar gasometria",
        max: "Max 50mEq",
        highlight: false,
      },
    ],
  },
  {
    id: "hipercalemia",
    name: "Hipercalemia Grave",
    emoji: "⚗️",
    color: "#8B5CF6",
    description: "K ≥ 6,5 mEq/L OU alteração no ECG",
    notes:
      "ECG OBRIGATÓRIO. Progressão: Onda T em tenda → alargamento QRS → perda onda P → sine waves → FV. Combinar medidas. Se hipercalemia leve/moderada (K<6,5): Salbutamol + resina de troca + furosemida. Diálise se refratário.",
    drugs: (w) => [
      {
        order: 1,
        name: "Gluconato de Cálcio 10% EV — se ECG alterado",
        urgency: "IMEDIATO se alteração ECG",
        dose: `${Math.min(w * 0.5, 20).toFixed(1)} mL (${Math.min(w * 0.5, 20).toFixed(1)} mEq)`,
        prep: "GluCa 10% (9,8mg Ca/mL) — EV lento. Velocidade máx 0,5mL/kg/min",
        freq: "Pode repetir se ECG não normalizar",
        max: "Max 20mL — monitorizar FC durante infusão",
        highlight: true,
      },
      {
        order: 2,
        name: "Bicarbonato 8,4% EV — desloca K intracelular",
        urgency: "Em 10-15 min",
        dose: `${Math.min(w, 50).toFixed(0)} mL (${Math.min(w, 50).toFixed(0)} mEq)`,
        prep: "BicNa 8,4% (1mEq/mL) — 1mEq/kg em 10-15min. Não usar em SF",
        freq: "Dose única",
        max: "Max 50mEq",
        highlight: false,
      },
      {
        order: 3,
        name: "Glicoinsulina EV — desloca K intracelular",
        urgency: "Se K persiste > 6",
        dose: `Insulina Regular ${Math.min(w * 0.1, 10).toFixed(1)} UI + Glicose ${(w * 0.5).toFixed(0)}g`,
        prep:
          w < 5
            ? `SG10% ${(w * 5).toFixed(0)}mL`
            : `SG25% ${Math.min(w * 2, 50).toFixed(0)}mL (max 25g)`,
        freq: "1h após estabilizador membrana",
        max: "Insulina max 10UI — Monitorizar glicemia 30/30min",
        highlight: false,
      },
      {
        order: 4,
        name: "Salbutamol Spray — adjuvante rápido",
        urgency: "Medida adjuvante",
        dose: "6-10 puffs",
        prep: "100mcg/jato com espaçador — efeito em 15-30min",
        freq: "Dose única",
        max: "",
        highlight: false,
      },
    ],
  },
  {
    id: "isr",
    name: "Intubação — ISR",
    emoji: "😴",
    color: "#0EA5E9",
    description: "Intubação Orotraqueal em Sequência Rápida",
    notes:
      "9 PASSOS: (1) Prep material — (2) Pré-O₂ 2-5min — (3) Pré-medicação — (4) Analgesia — (5) Sedação — (6) Posicionamento — (7) BNM — (8) Intubação — (9) Checar + Rx. TUBO: (Idade/4)+4 sem cuff | (Idade/4)+3,5 com cuff. Fixação: Idade+4cm ou tubo×3. Coxim escapular (<1a) ou occipital (>1a).",
    drugs: (w) => [
      {
        order: 1,
        name: "Atropina (pré-med) — < 1 ano, succinilcolina < 5a",
        urgency: "Opcional — 3min antes",
        dose: `${Math.max(0.1, Math.min(w * 0.02, 1)).toFixed(2)} mg EV`,
        prep: "FA 0,25 ou 0,5mg/mL | Min 0,1mg | Max 1mg",
        freq: "Dose única",
        max: "Max 1mg",
        highlight: false,
      },
      {
        order: 2,
        name: "Fentanil — analgesia (3min antes)",
        urgency: "Analgesia pré-IOT",
        dose: `${Math.min(w * 2, 100).toFixed(0)} mcg EV LENTO`,
        prep: `FA 50mcg/mL. Diluir 1+4mL AD. Regra: Peso/5 = ${(w / 5).toFixed(1)}mL. Infundir 3-5min`,
        freq: "Dose única",
        max: "Max 100mcg — infundir LENTO (rigidez torácica)",
        highlight: false,
      },
      {
        order: 3,
        name: "Quetamina (sedação) — asma, hipotenso, TCE",
        urgency: "Sedação de escolha",
        dose: `${Math.min(w * 2, 100).toFixed(0)} mg EV`,
        prep: `FA 50mg/mL. Diluir 1+4mL → 10mg/mL. Fazer ${(Math.min(w * 2, 100) / 10).toFixed(1)}mL`,
        freq: "Dose única — bolus rápido",
        max: "Max 100mg. Alt: Midazolam 0,2mg/kg se estável",
        highlight: true,
      },
      {
        order: 4,
        name: "Succinilcolina — BNM 1ª linha",
        urgency: "BNM despolarizante",
        dose: `${Math.min(w < 0.5 ? w * 2.5 * 1000 : w * 1.5, 150).toFixed(0)} mg EV`,
        prep: `FA 50mg/mL. Diluir 1+9mL → 5mg/mL. Fazer ${(Math.min(w * 1.5, 150) / 5).toFixed(1)}mL`,
        freq: "Bolus rápido — intubar após fasciculações",
        max: "⚠ CONTRAINDICADA: distrofias, queimaduras, politrauma, hipercalemia, HIC relativa",
        highlight: false,
      },
      {
        order: 5,
        name: "Rocurônio — alternativa se succinilcolina CI",
        urgency: "BNM não despolarizante",
        dose: `${Math.min(w * 1, 100).toFixed(0)} mg EV`,
        prep: "FA 10mg/mL — pode ser feito puro — 1mg/kg",
        freq: "Efeito em 60-90s — duração 30-60min",
        max: "Max 100mg. Necessita VPP se IOT falha",
        highlight: false,
      },
    ],
  },
  {
  id: "impregnacao_neuroleptica",
  name: "Impregnação Neuroléptica",
  emoji: "🤯",
  color: "#8B5CF6",
  description: "Distúrbio do movimento medicamento-induzido",
  notes: "CAUSAS: Metoclopramida, Bromoprida, Haloperidol, neurolépticos em geral — geralmente em dose terapêutica. CRITÉRIO DE ALTA: 12h assintomático após Biperideno. DIETA ZERO até melhora da contratura — liberar VO só após avaliar deglutição se rigidez importante. RABDOMIÓLISE: hidratar para débito urinário ≥ 2mL/kg/h (SF0,9% ou RL). Corrigir distúrbios hidroeletrolíticos. NÃO fazer medidas de descontaminação (não é superdosagem). CONTRAINDICADOS: Metoclopramida e Bromoprida (agravam o quadro).",
  drugs: (w) => [
    {
      order: 1,
      name: "Biperideno EV lento — Antídoto 1ª escolha",
      urgency: "IMEDIATO — antídoto específico",
      dose: `${Math.min(w * 0.04, 2).toFixed(2)} mg EV lento`,
      prep: `Diluir em 9mL de água bidestilada. Infundir LENTAMENTE (bólus rápido causa agitação, alucinações, hipo/hipertensão, taquicardia, rubor facial). Pode repetir na mesma dose a cada 6/6h se contraturas recorrerem.`,
      freq: `0,04mg/kg/dose — pode repetir 6/6h | Máx 4 doses/dia`,
      max: `Max 2mg/dose — ⚠ NUNCA em bólus rápido`,
      highlight: true,
    },
    {
      order: 2,
      name: "Difenidramina EV/IM — Antídoto alternativo",
      urgency: "Se Biperideno indisponível",
      dose: `${Math.min(w * 0.75, 50).toFixed(0)} mg EV ou IM`,
      prep: `0,5–1mg/kg/dose. Se sem resposta em 30–60 min, repetir até máx 100mg. MANUTENÇÃO VO (prevenir recorrência por 2–3 dias): ${Math.min(w * 0.5, 25).toFixed(0)}mg (12,5mg/dose crianças) a cada 4–6h.`,
      freq: `Dose inicial EV/IM | Repetir em 30-60 min se sem resposta`,
      max: `Max 100mg/dose EV | Max 300mg/dia em crianças`,
      highlight: false,
    },
    {
      order: 3,
      name: "Diazepam EV lento — Adjuvante",
      urgency: "Se contratura intensa com dor refratária aos antídotos",
      dose: `${Math.min(w * 0.15, 10).toFixed(1)} mg EV lento`,
      prep: `0,1–0,2mg/kg EV lento. Prescrever apenas se contratura muscular intensa causando dor e desconforto apesar dos antídotos. Fazer puro e lento.`,
      freq: `Dose única — repetir somente se necessário`,
      max: `Max 10mg/dose | Monitorar depressão respiratória`,
      highlight: false,
    },
    {
      order: 4,
      name: "Hidratação EV — Suporte",
      urgency: "Enquanto dieta zero",
      dose: (() => {
        const ch = w <= 10 ? w * 100 : w <= 20 ? 1000 + (w - 10) * 50 : 1500 + (w - 20) * 20;
        return `SF0,9% + SG50% — ${Math.round(ch)}mL/dia`;
      })(),
      prep: `Manter aporte de glicose e hidratação EV contínua enquanto dieta zero. Se rabdomiólise: escalar volume para débito urinário ≥ 2mL/kg/h — usar SF0,9% ou Ringer Lactato. Corrigir eletrólitos.`,
      freq: `BIC contínua — ajustar conforme débito urinário`,
      max: `Monitorar sinais de sobrecarga hídrica`,
      highlight: false,
    },
  ],
},
  {
    id: "expansao",
    name: "Choque / Expansão Volêmica",
    emoji: "💧",
    color: "#10B981",
    description: "Choque circulatório — Sepse — PALS",
    notes:
      "Reconhecer: taquicardia + TEC >3s + pulsos finos + hipotensão (sinal tardio). POCUS orienta tipo de choque. Antibiótico APÓS hemoculturas (2 sítios). Adrenalina IV periférico ou IO se choque refratário a fluido. Considerar hidrocortisona 50mg/m² se choque refratário a catecolaminas.",
    drugs: (w) => [
      {
        order: 1,
        name: "SF 0,9% ou Ringer Lactato — expansão",
        urgency: "PRIMEIRA LINHA",
        dose: `${(w * 20).toFixed(0)} mL bolus em 20-30 min`,
        prep: "SF 0,9% ou Ringer Lactato — bolus 20mL/kg",
        freq: "Reavaliar após cada bolus — repetir se necessário",
        max: "Sem UTI: máx 40mL/kg | Com UTI: máx 60mL/kg",
        highlight: true,
      },
      {
        order: 2,
        name: "Adrenalina IV periférico — choque refratário",
        urgency: "Se sem resposta à expansão",
        dose: `Iniciar: ${(w * 0.05).toFixed(3)} mcg/kg/min`,
        prep: "Preparar BIC. Escalar até 0,3mcg/kg/min. Preferir via central >0,3mcg/kg/min",
        freq: "BIC contínua — titular por resposta",
        max: "",
        highlight: false,
      },
      {
        order: 3,
        name: "ATB empírico — Sepse",
        urgency: "Choque séptico < 1h | Sepse < 3h",
        dose: `Amp ${Math.min(w * 50, 2000).toFixed(0)}mg + Genta ${Math.min(w * 5, 500).toFixed(0)}mg`,
        prep: "2 hemoculturas de sítios diferentes ANTES dos ATBs. AMP 100-200mg/kg/dia ÷4x | GENTA 5mg/kg 1× EV",
        freq: "Iniciar imediatamente após culturas",
        max: "Ajustar conforme foco e epidemiologia local",
        highlight: false,
      },
    ],
  },
];

export default function PedCalc() {
  return (
    <PedCalcLayout
      drugCategories={DRUG_CATEGORIES}
      drugs={DRUGS}
      emergencies={EMERGENCIES}
    />
  );
}