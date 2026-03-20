import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "fisiologia", name: "Fisiologia", color: "#6366F1" },
  { id: "diagnostico", name: "Diagnóstico", color: "#F59E0B" },
  { id: "classificacao", name: "Classificação", color: "#0EA5E9" },
  { id: "clinica", name: "Clínica", color: "#10B981" },
  { id: "insulina", name: "Insulinoterapia", color: "#EF4444" },
  { id: "antidiabeticos", name: "Antidiabéticos", color: "#F97316" },
  { id: "algoritmo", name: "Algoritmo SBD", color: "#EC4899" },
];

const content = {
  fisiologia: {
    title: "Fisiologia da Glicose — Transportadores, Regulação e Insulina",
    blocks: [
      {
        type: "alert",
        color: "#6366F1",
        title: "GLUT — Transportadores de Glicose",
        text: "Captação celular de glicose ocorre por difusão facilitada via transportadores GLUT. GLUT-1: hemácias e SNC (captação basal). GLUT-2: fígado, pâncreas, rim, intestino (alta capacidade, bidirecional — sensor de glicose das células beta). GLUT-3: neurônios (alta afinidade). GLUT-4: músculo esquelético e adiposo — INSULINO-DEPENDENTE. Pérola: GLUT-4 é o único que requer insulina para translocação à membrana.",
      },
      {
        type: "grid",
        title: "Destinos da Glicose Intracelular",
        items: [
          { label: "Glicólise / Oxidação mitocondrial", value: "Utilização imediata para produção de ATP.", highlight: false },
          { label: "Glicogênese", value: "Síntese de glicogênio (glicogênio sintase). Fígado: ~100g. Músculo: ~400g.", highlight: false },
          { label: "Glicogenólise", value: "Quebra do glicogênio (glicogênio fosforilase) → glicose livre. Fígado e músculo.", highlight: false },
          { label: "Gliconeogênese", value: "Síntese de glicose a partir de lactato, glicerol, aminoácidos (alanina). EXCLUSIVA do fígado e córtex renal.", highlight: true },
          { label: "Armazenamento como TG", value: "Excesso de glicose → acetil-CoA → lipogênese → triglicerídeos (adiposo).", highlight: false },
        ],
      },
      {
        type: "phases",
        title: "Insulina vs Hormônios Contra-Insulínicos",
        phases: [
          {
            number: "↓",
            name: "INSULINA (anabólica)",
            color: "#10B981",
            items: [
              "Produzida pelas células BETA pancreáticas",
              "↓ glicemia: estimula GLUT-4 (músculo/adiposo)",
              "Estimula glicogênese + inibe glicogenólise",
              "Inibe gliconeogênese e lipólise",
              "Estimula síntese proteica",
              "Feedback negativo: inibe secreção de glucagon",
            ],
          },
          {
            number: "↑",
            name: "GLUCAGON (catabólico)",
            color: "#EF4444",
            items: [
              "Células ALFA pancreáticas",
              "↑ glicemia: estimula glicogenólise hepática",
              "Estimula gliconeogênese",
              "Estimula cetogênese (na ausência de insulina)",
            ],
          },
          {
            number: "↑",
            name: "Adrenalina / Cortisol / GH",
            color: "#F59E0B",
            items: [
              "Adrenalina: glicogenólise + inibe secreção de insulina",
              "Cortisol: gliconeogênese + proteólise (precursores); ação PERMISSIVA à adrenalina",
              "GH: reduz sensibilidade à insulina → efeito diabetogênico",
              "Todos são contra-insulínicos → aumentam glicemia",
            ],
          },
        ],
      },
      {
        type: "obs",
        title: "Contrarregulação Hipoglicêmica — Ordem de Ativação",
        text: "Glicemia < 80 mg/dL → (1) Redução da insulina. (2) Aumento do glucagon (principal). (3) Adrenalina (sintomas adrenérgicos: sudorese, palpitação, tremor). (4) Cortisol e GH (ação mais lenta). Em DM1 de longa data, a resposta do glucagon e da adrenalina pode estar abolida → hipoglicemia dessensibilização adrenérgica (highs unawareness).",
      },
    ],
  },

  diagnostico: {
    title: "Diagnóstico — Critérios, TOTG e Rastreamento",
    blocks: [
      {
        type: "alert",
        color: "#F59E0B",
        title: "Regra Geral — 2 Exames Alterados (ou 1 se sintomático)",
        text: "Confirmação requer 2 resultados anormais em exames diferentes (GJ, HbA1c ou TOTG). Exceção: hiperglicemia inequívoca + sintomas (poliúria, polidipsia, polifagia, perda de peso) → confirma diagnóstico com 1 exame. Glicemia ao acaso ≥ 200 + sintomas = DM confirmado.",
      },
      {
        type: "grades",
        title: "Critérios Diagnósticos — SBD 2024",
        organ: "Diagnóstico DM",
        grades: [
          {
            grade: "GJ",
            color: "#10B981",
            items: ["Glicemia Jejum", "Normal: < 100", "Pré-DM: 100–125", "DM: ≥ 126 mg/dL"],
          },
          {
            grade: "T1h",
            color: "#F59E0B",
            items: ["TOTG 1h (NOVO SBD)", "Normal: < 155", "Pré-DM: 155–208", "DM: ≥ 209 mg/dL"],
          },
          {
            grade: "T2h",
            color: "#F97316",
            items: ["TOTG 2h", "Normal: < 140", "Pré-DM: 140–199", "DM: ≥ 200 mg/dL"],
          },
          {
            grade: "A1c",
            color: "#EF4444",
            items: ["HbA1c", "Normal: < 5,7%", "Pré-DM: 5,7–6,4%", "DM: ≥ 6,5%"],
          },
        ],
      },
      {
        type: "obs",
        title: "Novo Critério TOTG 1h — SBD 2024 (ADA NÃO aderiu)",
        text: "TOTG 1h ≥ 209 mg/dL equivale ao TOTG 2h ≥ 200 mg/dL para diagnóstico de DM. Vantagem: diagnóstico mais precoce + exame mais curto (o paciente não precisa esperar 2h). Indicação: pré-DM confirmado, ≥ 3 fatores de risco para DM, ou confirmação de GJ ≥ 126 / HbA1c ≥ 6,5%. Se TOTG 1h ≥ 209 → repetir → se mantiver → DM confirmado.",
      },
      {
        type: "flow",
        title: "Rastreamento — Quem Investigar?",
        steps: [
          { text: "Adultos ≥ 45 anos — rastreio universal", color: "#F59E0B" },
          { text: "< 45 anos com: IMC ≥ 25 + 1 fator de risco (HF, HAS, DLP, DG prévia, SOP, pré-DM, SM)", color: "#F97316" },
          { text: "Sobrepeso/obesidade em qualquer idade → rastreio conforme SBD", color: "#EF4444" },
          { text: "FINDRISC ≥ 12 pontos → alto risco → rastreio obrigatório", color: "#6366F1" },
          { text: "Pré-DM confirmado → repetir anualmente + avaliar progressão", color: "#10B981" },
        ],
      },
      {
        type: "grid",
        title: "Outros Exames Diagnósticos",
        items: [
          { label: "Frutosamina", value: "Reflete glicemia dos últimos 7–14 dias. Útil em hemoglobinopatias (falso HbA1c) ou na gestação.", highlight: false },
          { label: "Glicosúria", value: "Glicemia > 180 mg/dL → ultrapassa limiar renal → glicose na urina. Pode ocorrer em TFG reduzida (falso positivo).", highlight: false },
          { label: "Peptídeo C", value: "Marcador de secreção endógena de insulina. DM1/LADA: baixo. DM2: normal/alto. Útil na diferenciação.", highlight: true },
          { label: "Anti-GAD65 / IA-2 / IAA / anti-Znt8", value: "Autoanticorpos DM1. Anti-GAD: mais comum no adulto. IAA: mais comum na infância. Presentes em ~90% no diagnóstico.", highlight: true },
          { label: "HbA1c falsa", value: "Falso alto: hemoglobinopatias (HbS, HbC), anemia ferropriva, uremia. Falso baixo: hemólise, transfusão recente, gravidez.", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Tratamento do Pré-DM — Quando Indicar Metformina?",
        text: "Indicação de tratamento (além de MEV): < 60 anos OU IMC > 35 OU história de DM gestacional OU síndrome metabólica OU HAS OU GJ > 110 mg/dL. Única medicação com evidência de redução de progressão para DM2: METFORMINA. MEV (perda de 7% do peso + 150 min/sem de exercício) reduz progressão em ~58% — superior à metformina isolada.",
      },
    ],
  },

  classificacao: {
    title: "Classificação — DM1, DM2, LADA, MODY e Outros",
    blocks: [
      {
        type: "decision",
        title: "5 Tipos Principais de Diabetes",
        decisions: [
          {
            condition: "DM TIPO 1 (5–10%)",
            color: "#EF4444",
            actions: [
              "Destruição autoimune de células beta → deficiência ABSOLUTA de insulina",
              "Pico na infância/adolescência",
              "Sintomas clássicos de insulinopenia: poliúria, polidipsia, polifagia, perda de peso",
              "Autoanticorpos: ICA, IAA, anti-GAD, IA-2, IA-2β, anti-ZnT8",
              "HLA-DR3 e HLA-DR4 na susceptibilidade genética",
              "DM1A (autoimune) ≠ DM1B (idiopático, autoanticorpos negativos)",
              "TTO: INSULINOTERAPIA obrigatória",
            ],
          },
          {
            condition: "DM TIPO 2 (90–95%)",
            color: "#6366F1",
            actions: [
              "Resistência periférica à insulina + falência relativa das células beta",
              "Geralmente > 35–40 anos, sobrepeso/obesidade (80% com excesso de peso)",
              "Evolução silenciosa, assintomático na maioria",
              "Octeto de DeFronzo: 8 mecanismos de hiperglicemia",
              "Sem autoanticorpos, peptídeo C normal/elevado",
              "TTO: Antidiabéticos orais +/- insulinoterapia",
            ],
          },
          {
            condition: "LADA (DM1 lento do adulto)",
            color: "#0EA5E9",
            actions: [
              "Autoimune latente: anti-GAD positivo + início entre 25–65 anos",
              "Destruição das células beta mais LENTA que DM1 clássico",
              "Comparado ao DM2: mais jovem, IMC < 23, menos componentes SM",
              "Necessita insulina em 6–12 meses após diagnóstico",
              "TTO: Igual ao DM1 — insulinoterapia",
              "NUNCA sulfonilureia (acelera destruição de células beta)",
            ],
          },
          {
            condition: "MODY (Maturity-Onset Diabetes of the Young)",
            color: "#F59E0B",
            actions: [
              "Monogênico, autossômica DOMINANTE",
              "Diagnóstico < 25 anos em pelo menos 1 familiar",
              "Histórico familiar 2–3 gerações consecutivas",
              "SEM autoanticorpos, SEM resistência insulínica",
              "Peptídeo C detectable > 0,6 após 5 anos de diagnóstico",
              "MODY 2, MODY 3 e MODY 1 = 85% dos casos",
              "TTO: Sulfonilureia (MODY 1 e 3) — NÃO precisa de insulina inicialmente",
            ],
          },
          {
            condition: "DM NEONATAL",
            color: "#EC4899",
            actions: [
              "Diagnóstico antes dos 6 meses de vida",
              "Autoanticorpos NEGATIVOS (diferencia de DM1 neonatal raro)",
              "Secreção endócrina prejudicada por causa genética",
              "Forma permanente e forma transitória",
              "Associado a síndromes específicas",
              "TTO: Sulfonilureias — resposta SURPREENDENTEMENTE boa",
            ],
          },
          {
            condition: "DM LIPOATRÓFICO",
            color: "#8B5CF6",
            actions: [
              "Perda de tecido adiposo + resistência insulínica extrema",
              "Pode ser genético (congênito) ou adquirido",
              "Resistência à ação insulínica por defeito nos receptores",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Diferencial DM1 × DM2 × LADA × MODY",
        items: [
          { label: "Autoanticorpos", value: "DM1: positivos (anti-GAD, IA-2, IAA). LADA: positivos (anti-GAD). DM2: negativos. MODY: negativos.", highlight: true },
          { label: "Peptídeo C", value: "DM1/LADA: baixo/indetectável. DM2/MODY: normal ou elevado.", highlight: true },
          { label: "Idade de início", value: "DM1: infância. LADA: 25–65 anos. DM2: > 35 anos. MODY: < 25 anos.", highlight: false },
          { label: "Peso corporal", value: "DM2: obesidade (80%). MODY/DM1: peso normal.", highlight: false },
          { label: "HF", value: "MODY: 2–3 gerações (AD). DM2: risco aumentado mas sem padrão AD.", highlight: false },
          { label: "TTO de escolha", value: "DM1/LADA: insulina. DM2: antidiabéticos/insulina. MODY 1 e 3: sulfonilureia. Neonatal: sulfonilureia.", highlight: true },
        ],
      },
      {
        type: "obs",
        title: "DM1 — Autoanticorpos: Qual Cai Mais em Prova?",
        text: "Anti-INsulina (IAA) = mais comum na INfância. Anti-GAD = mais comum no ADulto (e no LADA). Anti-IA-2 = associado à progressão mais rápida para DM1. Anti-ZnT8 = mais específico para DM1. Destruição de 70–90% da massa de células beta é necessária para aparecer hiperglicemia — período pré-clínico pode durar anos.",
      },
    ],
  },

  clinica: {
    title: "Clínica — Sintomas, Hipoglicemia e Hiperglicemia de Estresse",
    blocks: [
      {
        type: "grid",
        title: "Manifestações Clínicas por Tipo",
        items: [
          { label: "DM1 — insulinopenia clássica", value: "Poliúria + polidipsia + polifagia + perda de peso. Início agudo, às vezes debuta como CAD.", highlight: true },
          { label: "DM2 — assintomático", value: "80% assintomáticos. Diagnóstico incidental em exame de rotina. Pode ter tonturas, fadiga, visão turva, cãibras.", highlight: false },
          { label: "Sintomas tardios DM2", value: "Vulvovaginite recorrente, disfunção erétil, neuropatia periférica, acantose nigricans (resistência insulínica).", highlight: false },
          { label: "Infecções recorrentes", value: "Furunculose, candidíase recorrente, ITU. Glicemia elevada favorece crescimento bacteriano/fúngico.", highlight: true },
          { label: "Perda de peso paradoxal", value: "No DM1 descompensado: catabolismo por ausência de insulina. No DM2 avançado: falência das células beta.", highlight: false },
        ],
      },
      {
        type: "flow",
        title: "Hipoglicemia — Classificação e Manejo (Regra dos 15)",
        steps: [
          { text: "Nível 1: Glicemia < 70 mg/dL + assintomático ou sintomas leves → 15g de carboidrato rápido VO", color: "#F59E0B" },
          { text: "Nível 2: Glicemia < 54 mg/dL → 15g de carboidrato rápido; se inconsciente → glucagon IM ou dextrose IV", color: "#F97316" },
          { text: "Nível 3: Hipoglicemia grave com alteração de consciência → glucagon 1 mg IM + dextrose 50% EV + internação", color: "#EF4444" },
          { text: "Reavaliação em 15 minutos após tratamento → se glicemia ainda < 70 → repetir ciclo", color: "#10B981" },
          { text: "Meta de TIR (Time in Range): hipoglicemia < 4% do tempo (nível 1) e < 1% (nível 2)", color: "#6366F1" },
        ],
      },
      {
        type: "alert",
        color: "#F59E0B",
        title: "Hiperglicemia de Estresse — Diagnóstico Diferencial",
        text: "Situações de estresse (IAM, AVC, cirurgia, sepse, trauma) ativam contra-insulínicos → elevação transitória da glicemia. NÃO é DM. Critério: glicemia ≥ 140 mg/dL em internação, sem DM prévio → medir HbA1c. Se HbA1c < 5,7% = estresse puro. Se HbA1c ≥ 6,5% = DM confirmado. Se 5,7–6,4% = pré-DM ou DM recente. Prevenir complicações: meta glicêmica hospitalar 140–180 mg/dL (UTI).",
      },
      {
        type: "grid",
        title: "Complicações Crônicas — MICRO e MACRO",
        items: [
          { label: "Retinopatia diabética", value: "Causa mais comum de cegueira em adultos em idade produtiva. Rastreio: fundoscopia anual a partir do diagnóstico (DM2) ou após 5 anos (DM1).", highlight: true },
          { label: "Nefropatia diabética (DRD)", value: "Principal causa de DRC terminal no Brasil. Rastreio: microalbuminúria/creatinina anual. TTO: iSGLT2 obrigatório se TFG > 20.", highlight: true },
          { label: "Neuropatia periférica", value: "Mais comum: polineuropatia sensitivo-motora distal simétrica ('meia e luva'). Neuropatia autonômica: gastroparesia, hipotensão ortostática, bexiga neurogênica.", highlight: false },
          { label: "DAC / IAM", value: "Principal causa de morte em DM2. Risco 2–4× maior. iSGLT2 e GLP-1 com proteção cardiovascular documentada.", highlight: true },
          { label: "Pé diabético", value: "Tríade: neuropatia + vasculopatia + infecção. Causa principal de amputação não traumática no Brasil.", highlight: false },
        ],
      },
    ],
  },

  insulina: {
    title: "Insulinoterapia — Tipos, Perfis e Esquema Basal-Bolus",
    blocks: [
      {
        type: "alert",
        color: "#EF4444",
        title: "Esquema Basal-Bolus — Padrão Ouro no DM1",
        text: "Objetiva mimetizar a secreção fisiológica de insulina: (1) Insulina BASAL: controla glicemia de jejum e entre refeições (30–50% da dose diária total). (2) Insulina BOLUS (prandial): cobre picos pós-prandiais (50–70% dividido em 3 doses pré-refeição). Evidência: DCCT demonstrou redução de 50–76% nas complicações microvasculares com controle intensivo.",
      },
      {
        type: "phases",
        title: "Perfis de Ação das Insulinas — Tabela Completa",
        phases: [
          {
            number: "⚡",
            name: "ULTRARRÁPIDAS (análogos)",
            color: "#EF4444",
            items: [
              "Aspart (Novorapid), Lispro (Humalog), Glulisina (Apidra)",
              "Início: 10–15 min | Pico: 1–2h | Duração: 3–5h",
              "Vantagem: pode ser aplicada NA hora da refeição (ou após)",
              "Maior flexibilidade vs Regular",
              "PRIMEIRA escolha como bolus prandial no DM1",
            ],
          },
          {
            number: "⏱",
            name: "RÁPIDA (Regular)",
            color: "#F97316",
            items: [
              "Início: 30–60 min | Pico: 1–3h | Duração: 5–8h",
              "Deve ser aplicada 20–30 min ANTES da refeição",
              "Pode ser IV (emergências: CAD, cirurgia)",
              "Disponível no SUS (baixo custo)",
            ],
          },
          {
            number: "🕐",
            name: "INTERMEDIÁRIA (NPH)",
            color: "#F59E0B",
            items: [
              "Início: 1–2h | Pico: 4–8h | Duração: 12–18h",
              "Pode ser usada até 4×/dia",
              "Pico pronunciado → risco de hipoglicemia noturna",
              "Disponível no SUS",
              "Usar como basal em 2–3 aplicações/dia",
            ],
          },
          {
            number: "🌙",
            name: "LONGAS — Análogos Basais",
            color: "#6366F1",
            items: [
              "Glargina U100/U300: 1×/dia, perfil plano, mínimo pico",
              "Detemir: duração 20–23h, pode ser 1–2×/dia",
              "Degludeca: ultralonga, até 42h, 1×/dia, máxima flexibilidade no horário",
              "Vantagem sobre NPH: menor variabilidade + menor hipoglicemia noturna",
              "Glargina U300 > Glargina U100: perfil ainda mais plano",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Prescrição da Insulinoterapia no DM1",
        items: [
          { label: "Dose total inicial", value: "0,5–1,0 U/kg/dia (pode ser maior no início). Fase de lua de mel: 0,2–0,5 U/kg/dia.", highlight: false },
          { label: "Divisão basal/bolus", value: "Basal: 30–50% da DDT. Bolus (prandial): 50–70% dividido em 3 refeições.", highlight: true },
          { label: "Fator de sensibilidade (FS)", value: "FS = 1800 ÷ Dose Diária Total de insulina = quanto 1U de insulina reduz a glicemia (mg/dL).", highlight: true },
          { label: "Relação insulina/carboidrato (I:C)", value: "I:C = 500 ÷ Dose Diária Total = gramas de carboidrato que 1U de insulina cobre.", highlight: true },
          { label: "Locais de aplicação", value: "Abdome: absorção mais RÁPIDA. Coxa: mais LENTA (ideal para basais). Nádegas. Braço lateral.", highlight: false },
          { label: "Bomba de insulina (SICI)", value: "Indicação: hipoglicemia assintomática, DM1 descontrolado, gestação. Infunde basal contínua + bolus sob demanda.", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Quando Iniciar Insulina no DM2?",
        text: "Insulina como terapia INICIAL no DM2: sintomas marcantes de hiperglicemia + glicemia ≥ 300 mg/dL e/ou HbA1c > 10%, ou estresse metabólico agudo (IAM, AVC, sepse). Insulinização gradual no DM2 não controlado: após falha de terapia quádrupla (HbA1c > 7% em 3 meses) → adicionar NPH 10 UI ao deitar (bedtime). Fenômeno do alvorecer: pico hiperglicêmico matinal por liberação de GH noturno → NPH bedtime mitiga.",
      },
      {
        type: "grid",
        title: "Ajustes Especiais",
        items: [
          { label: "Fenômeno do alvorecer", value: "Hiperglicemia matinal por ↑ GH noturno → NPH ao deitar OU análogo GLP-1 corrigem.", highlight: true },
          { label: "Efeito Somogyi", value: "Hipoglicemia noturna → rebote hiperglicêmico matinal (↑ glucagon + adrenalina). TTO: reduzir dose noturna.", highlight: true },
          { label: "Atividade física no DM1", value: "Reduzir basal 20–30% ou suspender na SICI durante o exercício. Aumentar carboidrato antes. Risco de hipoglicemia até 24h após.", highlight: false },
          { label: "Metas de HbA1c", value: "Adultos saudáveis: < 7%. Idosos frágeis: < 8–8,5%. Gestantes: < 6–6,5%. Crianças: < 7–7,5%.", highlight: true },
        ],
      },
    ],
  },

  antidiabeticos: {
    title: "Antidiabéticos Orais e Injetáveis — Classes e Mecanismos",
    blocks: [
      {
        type: "alert",
        color: "#F97316",
        title: "Metformina — Não é Mais Sempre a 1ª Linha (SBD 2025)",
        text: "Metformina é 1ª linha APENAS em adultos DM2 com risco CV baixo/intermediário, sem doença cardiorrenal, sem obesidade significativa e HbA1c < 7,5%. Em alto risco CV, DM + IC, DM + DRC, ou obesidade → iSGLT2 ou análogo GLP-1 são a 1ª linha INDEPENDENTE da HbA1c.",
      },
      {
        type: "phases",
        title: "Metformina (Biguanida)",
        phases: [
          {
            number: "M",
            name: "METFORMINA",
            color: "#6366F1",
            items: [
              "Mec: Inibe gliconeogênese hepática + melhora sensibilidade insulínica (GLUT4)",
              "Redução HbA1c: 1–2%. Peso: neutro/leve redução",
              "Dose: iniciar 500 mg/dia → máx 2.550 mg/dia (1g 2×/dia usual)",
              "Monitorar Vitamina B12 após 4 anos de uso (risco deficiência)",
              "CI: TFGe < 30 ml/min. Reduzir 50% se TFGe 30–45",
              "EA: sintomas GI (transitórios), acidose lática (rara)",
              "Suspender antes de contraste radiológico / cirurgia de grande porte",
              "Indicação extra: pré-DM, DM gestacional (cautela), SOP",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "iSGLT2 (Gliflozinas) — Proteção Cardiorrenal Obrigatória",
        phases: [
          {
            number: "S",
            name: "iSGLT2 — Empagliflozina, Dapagliflozina, Canagliflozina",
            color: "#EF4444",
            items: [
              "Mec: Inibe SGLT2 no TCP → ↓ reabsorção renal de glicose → glicosúria",
              "Efeito glicosúrico + diurético osmótico + efeito natriurético",
              "Redução HbA1c: 0,7–1%. Peso: -2–4 kg. PA: -2–5 mmHg",
              "OBRIGATÓRIO: DM2 + IC e/ou DM2 + DRC (TFG > 20)",
              "Benefício CV documentado em múltiplos trials (EMPA-REG, DECLARE, CREDENCE, DAPA-HF)",
              "EA: infecções fúngicas genitais/urinárias, poliúria",
              "CI: TFG < 20 (iniciar). Risco de cetoacidose euglicêmica (DM1 off-label)",
              "Canagliflozina: maior risco de amputações e fraturas",
              "NUNCA suspender em alto risco CV — manter independente de HbA1c",
            ],
          },
        ],
      },
      {
        type: "phases",
        title: "Análogos GLP-1 — Proteção Cardiovascular e Perda de Peso",
        phases: [
          {
            number: "G",
            name: "GLP-1 — Liraglutida, Semaglutida, Dulaglutida",
            color: "#10B981",
            items: [
              "Mec: Agonista receptor GLP-1 → ↑ insulina glicose-dependente + ↓ glucagon + retardo esvaziamento gástrico",
              "Redução HbA1c: 0,5–1,5%. Perda de peso: 2–5 kg",
              "Proteção CV: liraglutida (LEADER), semaglutida (SUSTAIN-6), dulaglutida (REWIND)",
              "Liraglutida: SC diária. Dose: 0,6–1,8 mg/dia (DM2) | até 3 mg/dia (obesidade)",
              "Semaglutida: SC semanal. DM2: até 1 mg/sem | Obesidade: 2,4 mg/sem",
              "Semaglutida oral: aprovada FDA 2019 para DM2",
              "EA: TGI (náuseas, vômitos, diarreia) — transitórios com titulação lenta",
              "CI: carcinoma medular da tireoide, MEN-2, pancreatite prévia",
              "NÃO causa hipoglicemia em normoglicêmicos (ação glicose-dependente)",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Sulfonilureias, DPP-4, Glitazonas e Outros",
        items: [
          { label: "Sulfonilureias (SU)", value: "Mec: Agonista canal SUR1 → ↑ secreção insulina independente de glicose. HbA1c: -1–2%. EA: hipoglicemia (principal), ganho de peso. CI: IR grave, hepatopatia grave, gravidez. Gliclazida MR: menor risco de hipoglicemia (preferida no idoso). Glibenclamida: MAIOR risco de hipoglicemia grave.", highlight: false },
          { label: "iDPP-4 (Gliptinas)", value: "Mec: Inibe DPP-4 → ↑ GLP-1 e GIP endógenos. HbA1c: -0,5–0,8%. Neutro em peso. Baixo risco de hipoglicemia. Excelente em idosos frágeis e DRC. Linagliptina: excreção BILIAR — sem ajuste em DRC. Saxagliptina: ↑ risco de IC (SAVOR-TIMI).", highlight: true },
          { label: "Pioglitazona (Glitazona)", value: "Mec: Agonista PPAR-γ → ↑ sensibilidade insulínica. HbA1c: -0,5–1,4%. EA: ganho de peso, retenção hídrica, ↑ risco IC e fraturas. CI: IC, osteoporose, hepatopatia ativa. Única classe que melhora MASH histologicamente.", highlight: false },
          { label: "Inibidores α-Glicosidase (Acarbose)", value: "Mec: ↓ absorção intestinal de carboidratos. HbA1c: -0,5–0,8%. EA: flatulência, diarreia (limitam adesão). Neutro em peso e hipoglicemia. Útil no controle pós-prandial.", highlight: false },
          { label: "Glinidas (Repaglinida, Nateglinida)", value: "Mec: Semelhante às SU mas mais curta duração → ↓ hipoglicemia. Tomadas antes de cada refeição. Menor risco de hipoglicemia que SU.", highlight: false },
        ],
      },
    ],
  },

  algoritmo: {
    title: "Algoritmo Terapêutico SBD 2025 — Qual Medicação Escolher?",
    blocks: [
      {
        type: "alert",
        color: "#EC4899",
        title: "Paradigma SBD 2025 — Tratamento Centrado em Desfechos, Não em Glicemia",
        text: "O DM2 evoluiu para uma abordagem de PROTEÇÃO CARDIORRENAL. iSGLT2 e análogos GLP-1 são obrigatórios quando há alto risco CV, IC ou DRC — independente do nível de HbA1c. Inércia terapêutica é cada vez mais combatida. A metformina perdeu o posto de primeira linha universal.",
      },
      {
        type: "flow",
        title: "Fluxograma de Escolha Terapêutica — SBD 2025",
        steps: [
          { text: "Passo 1: HbA1c ≥ 7,5%? → SIM → Iniciar terapia DUPLA (2 fármacos)", color: "#EC4899" },
          { text: "Passo 2: Alto risco CV (DAC, AVC, DAP)? → SIM → iSGLT2 OU análogo GLP-1 como 1ª linha", color: "#EF4444" },
          { text: "Passo 3: IC ou DRC (TFG > 20)? → SIM → iSGLT2 OBRIGATÓRIO", color: "#EF4444" },
          { text: "Passo 4: Obesidade (IMC ≥ 25–30)? → SIM → Análogo GLP-1 ou duplo agonista (GIP+GLP-1)", color: "#F97316" },
          { text: "Passo 5: Risco CV baixo/intermediário + HbA1c < 7,5% + sem obesidade/doença cardiorrenal → METFORMINA 1ª linha", color: "#6366F1" },
          { text: "Passo 6: HbA1c > 7% após 3 meses de terapia quádrupla → adicionar NPH 10 UI bedtime", color: "#8B5CF6" },
          { text: "Passo 7: HbA1c > 10% ou glicemia ≥ 300 ou sintomas intensos → insulinoterapia de início", color: "#EC4899" },
        ],
      },
      {
        type: "decision",
        title: "Escolha por Situação Clínica",
        decisions: [
          {
            condition: "DM2 + Alto Risco CV (DAC / AVC / DAP)",
            color: "#EF4444",
            actions: [
              "1ª linha: iSGLT2 (empagliflozina/dapagliflozina) ou análogo GLP-1",
              "Associar metformina se HbA1c elevada",
              "Trials: EMPA-REG (empagliflozina ↓20% MACE), LEADER (liraglutida ↓13% MACE)",
            ],
          },
          {
            condition: "DM2 + Insuficiência Cardíaca",
            color: "#6366F1",
            actions: [
              "iSGLT2 OBRIGATÓRIO (TFG > 20) — independente de HbA1c",
              "DAPA-HF e EMPEROR-Reduced: benefício em DM e não-DM",
              "Evitar: pioglitazona (retém fluido), saxagliptina (↑hospitalização IC)",
            ],
          },
          {
            condition: "DM2 + DRC (TFG 20–60 ml/min)",
            color: "#0EA5E9",
            actions: [
              "iSGLT2 obrigatório (TFG > 20)",
              "Finerenona: DM2 + albuminúria > 30 + IECA/BRA + TFG > 25 + K < 5",
              "Análogo GLP-1: TFG > 25 + albuminúria > 100",
              "Linagliptina: sem ajuste de dose na DRC (excreção biliar)",
              "Metformina: reduzir se TFG 30–45; suspender se < 30",
            ],
          },
          {
            condition: "DM2 + Obesidade",
            color: "#F97316",
            actions: [
              "Análogo GLP-1 (semaglutida, liraglutida) ou Tirzepatida",
              "Tirzepatida 2025: superior à semaglutida em perda de peso E controle glicêmico",
              "Meta: perda de peso ≥ 10% para impacto em desfechos",
            ],
          },
          {
            condition: "DM2 + Idoso Frágil",
            color: "#10B981",
            actions: [
              "iDPP-4 (baixo risco de hipoglicemia, boa tolerabilidade)",
              "Gliclazida MR (sulfonilureia de menor risco)",
              "Meta HbA1c: < 8–8,5% (menos rigorosa)",
              "EVITAR: glibenclamida (alto risco hipoglicemia grave)",
            ],
          },
          {
            condition: "DM2 + Gravidez ou Planejamento",
            color: "#8B5CF6",
            actions: [
              "Insulinoterapia: 1ª escolha (mais segura)",
              "Metformina e glibenclamida: utilizadas com cautela",
              "Suspender: iSGLT2, GLP-1, gliptinas (sem dados de segurança)",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Resumo — Escolha por Desfecho",
        items: [
          { label: "Redução máxima de HbA1c", value: "Insulina > SU/Metformina > GLP-1 > iSGLT2 > iDPP-4 > Acarbose", highlight: false },
          { label: "Maior perda de peso", value: "Tirzepatida > Semaglutida > Liraglutida > iSGLT2 > Metformina > iDPP-4 (neutro) > SU (ganho)", highlight: true },
          { label: "Proteção CV (MACE)", value: "GLP-1: liraglutida, semaglutida, dulaglutida. iSGLT2: empagliflozina, dapagliflozina.", highlight: true },
          { label: "Proteção renal", value: "iSGLT2 (CREDENCE, DAPA-CKD): retardam DRC. Finerenona: reduz albuminúria.", highlight: true },
          { label: "Menor risco de hipoglicemia", value: "iDPP-4 ≈ GLP-1 ≈ iSGLT2 ≈ metformina (todos baixo risco). SU e insulina = maior risco.", highlight: false },
          { label: "Único antidiabético para pré-DM", value: "METFORMINA (única com evidência de redução de progressão para DM2).", highlight: true },
        ],
      },
      {
        type: "obs",
        title: "Metas de HbA1c por Perfil — SBD",
        text: "Adultos saudáveis sem hipoglicemia: < 7%. Com risco de hipoglicemia: < 7,5%. Idosos funcionais: < 7,5–8%. Idosos frágeis / expectativa de vida reduzida: < 8–8,5%. Gestantes DM1: < 6–6,5% (pré-prandial < 95, pós-prandial 1h < 140). TIR (Time in Range, CGM): meta > 70% do tempo entre 70–180 mg/dL. Hipoglicemia < 4% do tempo.",
      },
    ],
  },
};

export default function DiabetesMellitus() {
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
            {block.grades.map((g, i) => (
              <div key={i} style={{ background: `${g.color}0a`, border: `1px solid ${g.color}30`, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ background: `${g.color}20`, padding: "8px 12px", borderBottom: `1px solid ${g.color}30`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: g.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700, fontFamily: "monospace", flexShrink: 0 }}>{g.grade}</div>
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
                <div style={{ width: 48, background: `${phase.color}18`, borderRight: `1px solid ${phase.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 0", flexShrink: 0, gap: 4 }}>
                  <span style={{ fontSize: 15 }}>{phase.number}</span>
                  <span style={{ fontSize: 8, color: phase.color, fontFamily: "monospace", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{phase.name.slice(0, 8)}</span>
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
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#f1f5f9", letterSpacing: "0.01em" }}>Diabetes Mellitus — Guia Completo</h1>
        <div style={{ fontSize: 11, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>Fisiologia · Diagnóstico · Classificação · Clínica · Insulinoterapia · Antidiabéticos · Algoritmo SBD 2025</div>
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
