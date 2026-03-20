import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "anatomia", name: "Anatomia", color: "#EF4444" },
  { id: "fisiologia", name: "Fisiologia", color: "#F97316" },
  { id: "laboratorial", name: "Avaliação Lab.", color: "#F59E0B" },
  { id: "metabolismo", name: "Metabolismo BI", color: "#10B981" },
  { id: "bi", name: "Bili. Indireta", color: "#6366F1" },
  { id: "bd", name: "Bili. Direta", color: "#0EA5E9" },
  { id: "sindromes", name: "Síndromes Herd.", color: "#EC4899" },
];

const content = {
  anatomia: {
    title: "Anatomia Hepática — Vascularização, Segmentos e Histologia",
    blocks: [
      {
        type: "alert",
        color: "#EF4444",
        title: "Dupla Vascularização — Exclusividade do Fígado",
        text: "O fígado é o único órgão com DOIS vasos aferentes: Veia Porta (80% do fluxo, rica em nutrientes) + Artéria Hepática Comum (20%, ramo do tronco celíaco, rica em O₂ e lipídeos). Saída: Veias Hepáticas → Veia Cava Inferior. Apesar de sangue venoso, a veia porta fornece 50–70% da oxigenação hepática pelo seu volume.",
      },
      {
        type: "grid",
        title: "Vascularização Aferente",
        items: [
          { label: "Veia Porta (80%)", value: "Junção da Veia Mesentérica Superior + Veia Esplênica. Sistema porta = venoso entre 2 redes capilares sem passar pelo coração. Rica em nutrientes absorvidos.", highlight: true },
          { label: "Artéria Hepática Comum (20%)", value: "Ramo do Tronco Celíaco → artéria hepática própria → ramos D e E. Rica em O₂ e lipídeos.", highlight: false },
          { label: "Trajeto venoso portal", value: "V. Porta → Vênulas portais → Vênulas distribuidoras → Capilares sinusoides → V. Centrolobular → V. Sublobular → V. Hepáticas → VCI", highlight: true },
        ],
      },
      {
        type: "grid",
        title: "Segmentação Cirúrgica — 8 Segmentos (Couinaud)",
        items: [
          { label: "Seg. I — Caudado (Spigel)", value: "Posterior, entre a VCI e o ligamento venoso. Único com drenagem direta para a VCI.", highlight: false },
          { label: "Seg. II — Posterior lateral esq.", value: "Lobo esquerdo", highlight: false },
          { label: "Seg. III — Anterior lateral esq.", value: "Lobo esquerdo", highlight: false },
          { label: "Seg. IV — Medial esq.", value: "Lobo esquerdo (inclui lobo quadrado)", highlight: false },
          { label: "Seg. V — Anterior medial dir.", value: "Lobo direito", highlight: false },
          { label: "Seg. VI — Anterior lateral dir.", value: "Lobo direito", highlight: false },
          { label: "Seg. VII — Posterior lateral dir.", value: "Lobo direito", highlight: false },
          { label: "Seg. VIII — Posterior medial dir.", value: "Lobo direito", highlight: false },
        ],
      },
      {
        type: "alert",
        color: "#F59E0B",
        title: "Regra Mnemônica — Hepatectomias",
        text: "LADO DIREITO = segmentos que começam com V (V, VI, VII, VIII). LADO ESQUERDO = segmentos que começam com I (II, III, IV), EXCETO o I (caudado). Hepatectomia direita: V, VI, VII, VIII. Hepatectomia esquerda: II, III, IV. Hepatectomia esquerda ESTENDIDA: II, III, IV, V, VIII.",
      },
      {
        type: "grid",
        title: "Histologia Funcional",
        items: [
          { label: "Lóbulo hepático", value: "Unidade funcional hexagonal. Centro: veia centrolobular. Vértices: espaços porta (vênula portal + arteríola + ducto biliar + vasos linfáticos).", highlight: true },
          { label: "Sinusoides", value: "Capilares fenestrados que percorrem a massa de hepatócitos do espaço porta à veia centrolobular. Permitem contato direto hepatócito-sangue.", highlight: false },
          { label: "Células de Kupffer", value: "Macrófagos residentes nos sinusoides. Fazem hemocaterese (destruição de hemácias senescentes → liberam bilirrubina).", highlight: true },
          { label: "Espaço de Disse", value: "Entre sinusoides e hepatócitos. Contém células estreladas (Ito). Na lesão crônica, células Ito são ativadas → fibrose e depósito de colágeno.", highlight: true },
          { label: "Células estreladas (Ito)", value: "Quiescentes em fígado normal. Na agressão crônica → ativadas → produzem colágeno → fibrose → cirrose.", highlight: true },
          { label: "Ducto biliar", value: "Recebe bile produzida pelos hepatócitos nos canalículos biliares. Fluxo oposto ao do sangue (contracorrente).", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Pérola Cirúrgica — Hepatectomia Estendida (UFRJ 2024)",
        text: "Na hepatectomia esquerda ESTENDIDA, ressecam-se os segmentos II, III, IV (padrão esquerda) + V e VIII (extensão para o lado direito). A divisão é CIRÚRGICA (baseada em vasos), não anatômica por lobos. O segmento I (caudado) raramente é incluído isoladamente e é o único com drenagem venosa direta para a VCI.",
      },
    ],
  },

  fisiologia: {
    title: "Fisiologia Hepática — Metabolismo de Carboidratos e Proteínas",
    blocks: [
      {
        type: "alert",
        color: "#F97316",
        title: "O Fígado como Central Metabólica",
        text: "O fígado integra e regula o metabolismo intermediário de carboidratos, lipídeos e proteínas. É o único órgão capaz de realizar gliconeogênese a partir de lactato, alanina e glicerol. Além disso, sintetiza todas as proteínas plasmáticas (exceto imunoglobulinas) e elimina toxinas nitrogenadas através do ciclo da ureia.",
      },
      {
        type: "phases",
        title: "Metabolismo de Carboidratos — 3 Vias Hepáticas",
        phases: [
          {
            number: "↑",
            name: "Glicogênese",
            color: "#10B981",
            items: [
              "Síntese de glicogênio a partir de glicose",
              "Ocorre no estado pós-prandial (insulina estimula)",
              "Armazena até ~100g de glicogênio",
              "Permite homeostase glicêmica no jejum curto",
            ],
          },
          {
            number: "↓",
            name: "Glicogenólise",
            color: "#F59E0B",
            items: [
              "Quebra do glicogênio para liberar glicose",
              "Estimulada pelo glucagon e adrenalina",
              "Resposta ao jejum e ao estresse",
              "Glicose-6-fosfatase hepática libera glicose livre para o sangue",
            ],
          },
          {
            number: "⟳",
            name: "Gliconeogênese",
            color: "#EF4444",
            items: [
              "Síntese de glicose a partir de substratos não glicídicos",
              "Substratos: Lactato (Ciclo de Cori), Alanina (Ciclo Glicose-Alanina), Glicerol, Oxaloacetato",
              "Jejum prolongado, exercício intenso, diabetes descompensado",
              "EXCLUSIVA do fígado e córtex renal",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Metabolismo de Proteínas — Funções Essenciais",
        items: [
          { label: "Síntese de proteínas plasmáticas", value: "Albumina (principal), fibrinogênio, fatores da coagulação (II, VII, IX, X — vit K dep.), proteínas de fase aguda (PCR, ferritina). EXCETO: imunoglobulinas (linfócitos B).", highlight: true },
          { label: "Ciclo da ureia (desaminação)", value: "Amônia (NH₃) proveniente do catabolismo proteico é convertida em ureia → excretada pelos rins. Falência hepática → hiperamonemia → encefalopatia.", highlight: true },
          { label: "Síntese e degradação de AA", value: "Transaminação e desaminação oxidativa de aminoácidos. Síntese de AA não essenciais.", highlight: false },
          { label: "Processamento de compostos nitrogenados", value: "Metabolização de substâncias nitrogenadas endógenas (amônia) e exógenas (drogas, toxinas) — função de detoxificação.", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Albumina como Marcador de Função Sintética",
        text: "A albumina é produzida exclusivamente pelo fígado a uma taxa de 12–15 g/dia. Meia-vida plasmática: ~20 dias. Por isso, queda de albumina indica doença CRÔNICA — não aguda. Em lesão aguda (hepatite), albumina pode ser normal por dias/semanas enquanto o INR e as transaminases já estão alterados. Albumina < 3,5 g/dL = disfunção sintética significativa.",
      },
      {
        type: "grid",
        title: "Outras Funções Hepáticas Essenciais",
        items: [
          { label: "Síntese de fatores da coagulação", value: "Fatores II, VII, IX, X (vitamina K dependentes) + I (fibrinogênio), V. INR reflete função sintética de forma rápida (meia-vida F.VII = 4–6h).", highlight: true },
          { label: "Metabolismo lipídico", value: "Síntese de colesterol, VLDL, LDL, HDL. Cetogênese (jejum prolongado). Conjugação e excreção de ácidos biliares.", highlight: false },
          { label: "Armazenamento de vitaminas", value: "Vitaminas lipossolúveis (A, D, E, K) e B12. Armazenamento de ferro (ferritina) e cobre.", highlight: false },
          { label: "Regulação hormonal", value: "Catabolismo de estrogênios, testosterona, aldosterona, insulina. Falência hepática → hiperestrogenismo → ginecomastia, telangiectasias, eritema palmar.", highlight: true },
          { label: "Síntese de bile", value: "600–1.000 mL/dia. Ácidos biliares primários (cólico, quenodesoxicólico) conjugados com glicina ou taurina. Essenciais para absorção de lipídeos e vitaminas lipossolúveis.", highlight: false },
        ],
      },
    ],
  },

  laboratorial: {
    title: "Avaliação Laboratorial Hepática — Função × Lesão",
    blocks: [
      {
        type: "alert",
        color: "#F59E0B",
        title: "Distinção Fundamental: Enzimas de Lesão × Provas de Função",
        text: "Transaminases (TGO/TGP) e FA/GGT refletem LESÃO (hepatócitos rompidos liberando conteúdo). Albumina, INR e Bilirrubinas refletem FUNÇÃO (capacidade de síntese e metabolização). Fígado pode ter lesão intensa com função preservada (fase inicial) ou função comprometida com transaminases normais (cirrose avançada — hepatócitos já perdidos).",
      },
      {
        type: "grid",
        title: "Provas de FUNÇÃO Hepática",
        items: [
          { label: "Albumina", value: "Síntese exclusivamente hepática. Meia-vida: ~20 dias. Indicador de função CRÔNICA. Normal: 3,5–5,0 g/dL. < 3,5 = disfunção sintética.", highlight: true },
          { label: "INR / Tempo de Protrombina", value: "Reflete síntese dos fatores II, VII, IX, X. Indicador AGUDO (F.VII meia-vida 4–6h). Melhor marcador precoce de falência aguda. INR > 1,5 + encefalopatia = critério de falência hepática.", highlight: true },
          { label: "Bilirrubinas", value: "BT < 1,0 mg/dL normal. BD < 0,2 mg/dL. Hiperbilirrubinemia direta = falha na excreção biliar. Indireta = superprodução ou falha na conjugação.", highlight: true },
          { label: "Amônia (NH₃)", value: "Elevada quando o ciclo da ureia está comprometido. Correlaciona-se com encefalopatia hepática. Valor normal: < 80 µg/dL (variável por método).", highlight: false },
        ],
      },
      {
        type: "grid",
        title: "Enzimas de LESÃO Hepática",
        items: [
          { label: "TGO (AST) — aspartato aminotransferase", value: "Presente em fígado, miocárdio, músculo esquelético, rim, cérebro. MENOS específica para fígado. Na hepatite alcoólica: TGO > TGP (razão ≥ 2:1).", highlight: false },
          { label: "TGP (ALT) — alanina aminotransferase", value: "Mais específica para fígado. Elevação > 5× LSN = padrão hepatocelular. Em lesão aguda pode chegar a 50–100× LSN (hepatite viral, isquêmica).", highlight: true },
          { label: "FA (Fosfatase Alcalina)", value: "Enzima canalicular. Elevada em colestase (intra ou extra-hepática). Outras fontes: osso, placenta, intestino. FA > 3× + GGT elevada = colestase hepática.", highlight: true },
          { label: "GGT (Gama-GT)", value: "Muito sensível para hepatopatia alcoólica e colestase. Pouco específica (álcool, obesos, drogas também elevam). FA elevada + GGT elevada = confirma origem hepática da FA.", highlight: false },
          { label: "LDH", value: "Inespecífica. Elevada em hemólise, isquemia, neoplasias. Na hemólise: LDH alto + haptoglobina baixa + reticulocitose.", highlight: false },
        ],
      },
      {
        type: "flow",
        title: "Raciocínio no Paciente Ictérico — Padrão Laboratorial",
        steps: [
          { text: "Bilirrubina Total elevada → fracionar em direta e indireta", color: "#F59E0B" },
          { text: "BI predominante → superprodução (hemólise) ou problema na conjugação (Gilbert, Crigler-Najjar)", color: "#6366F1" },
          { text: "BD predominante → problema na excreção (Dubin-Johnson, Rotor) ou colestase (hepatites, obstrução biliar)", color: "#0EA5E9" },
          { text: "BD + TGO/TGP > 5× LSN → padrão HEPATOCELULAR (hepatites, isquemia)", color: "#EF4444" },
          { text: "BD + FA/GGT >> TGO/TGP (Rel.FA > 2, Rel.ALT < 5) → padrão CANALICULAR/COLESTÁTICO (coledocolitíase, CBP, colangiocarcinoma)", color: "#F97316" },
        ],
      },
      {
        type: "obs",
        title: "R-Score — Diferenciação Hepatocelular × Colestático",
        text: "R = (ALT/LSN ALT) ÷ (FA/LSN FA). R ≥ 5 = padrão hepatocelular. R ≤ 2 = padrão colestático. 2 < R < 5 = padrão misto. Exemplo cobrado em prova: hepatite aguda viral → TGO/TGP 20–50× LSN, FA 1–2× LSN, R >> 5. Coledocolitíase → FA 3–10× LSN, TGO/TGP 2–3× LSN, R << 2.",
      },
      {
        type: "grid",
        title: "Valores de Referência Essenciais",
        items: [
          { label: "Bilirrubina Total", value: "0,3–1,0 mg/dL", highlight: false },
          { label: "Bilirrubina Direta", value: "0–0,2 mg/dL", highlight: false },
          { label: "Bilirrubina Indireta", value: "0,2–0,8 mg/dL", highlight: false },
          { label: "TGO/AST", value: "< 40 UI/L (varia por laboratório)", highlight: false },
          { label: "TGP/ALT", value: "< 35–40 UI/L", highlight: false },
          { label: "Fosfatase Alcalina", value: "< 120 UI/L", highlight: false },
          { label: "GGT", value: "< 50 UI/L", highlight: false },
          { label: "Albumina", value: "3,5–5,0 g/dL", highlight: false },
          { label: "INR", value: "0,8–1,2 (equivalente TP 11–13s)", highlight: false },
        ],
      },
    ],
  },

  metabolismo: {
    title: "Metabolismo da Bilirrubina — Da Hemólise à Excreção",
    blocks: [
      {
        type: "alert",
        color: "#10B981",
        title: "Via Completa — Hemoglobina → Bilirrubina → Estercobilina/Urobilina",
        text: "Hemácias senescentes → macrófagos (Kupffer + baço) → Heme → Biliverdina (heme-oxigenase) → Bilirrubina Indireta (BI, lipossolúvel) → ligada à albumina → hepatócito → captação (OATP1) → conjugação (UGT1A1) → Bilirrubina Direta (BD, hidrossolúvel) → excreção para bile (MRP2) → intestino → urobilinogênio → fezes (estercobilina) ou urina (urobilina).",
      },
      {
        type: "phases",
        title: "Três Fases do Metabolismo Hepático da Bilirrubina",
        phases: [
          {
            number: "1",
            name: "CAPTAÇÃO",
            color: "#10B981",
            items: [
              "BI (ligada à albumina) entra no hepatócito",
              "Transportador: OATP1 (orgânico aniônico)",
              "SD. ROTOR: defeito nesta etapa (captação/armazenamento)",
              "Também reduzida em: jejum, infecção, hepatopatia",
              "Bilirrubina indireta entra SOMENTE ligada à albumina",
            ],
          },
          {
            number: "2",
            name: "CONJUGAÇÃO",
            color: "#F59E0B",
            items: [
              "Enzima: UGT1A1 (UDP-glicuronosiltransferase)",
              "BI (lipossolúvel) → BD (hidrossolúvel) com glicuronídeo",
              "Ocorre no citoplasma do hepatócito",
              "Defeito: SD. Gilbert (parcial) e SD. Crigler-Najjar I/II (total ou parcial)",
              "BI não conjugada atravessa a BHE → risco de kernicterus",
            ],
          },
          {
            number: "3",
            name: "EXCREÇÃO",
            color: "#EF4444",
            items: [
              "BD → canalículos biliares (processo ATIVO dependente de ATP)",
              "Transportador: MRP2 (multidrug resistance protein 2)",
              "Defeito no MRP2: SD. DUBIN-JOHNSON (BD acumula → retorna ao plasma)",
              "Etapa mais vulnerável à lesão hepatocelular",
              "BD no plasma → excretada pelos rins → COLÚRIA (urina Coca-Cola)",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Destino Intestinal da Bilirrubina",
        steps: [
          { text: "BD chega ao intestino pelo ducto biliar → 2ª porção do duodeno (papila de Vater)", color: "#10B981" },
          { text: "Bactérias do cólon convertem ~50% da BD em Urobilinogênio (hidrossolúvel)", color: "#F59E0B" },
          { text: "Maioria das fezes: oxidação → Estercobilina → cor marrom das fezes", color: "#F97316" },
          { text: "Pequena fração reabsorvida → circulação entero-hepática → rim → Urobilinogênio na urina", color: "#0EA5E9" },
          { text: "Exposta ao ar: Urobilinogênio → Urobilina (pigmento urinário amarelo)", color: "#6366F1" },
        ],
      },
      {
        type: "grid",
        title: "Achados Urinários e Fecais nas Síndromes Ictéricas",
        items: [
          { label: "Hemólise", value: "Urobilinogênio na urina ↑↑ (superprodução de BD → mais substrato). Fezes normais ou escuras. SEM bilirrubinúria (BI não é filtrada).", highlight: true },
          { label: "Colestase", value: "Colúria (bilirrubinúria) ↑↑ + Acolia fecal (sem bile → fezes brancas). Urobilinogênio urinário ↓ (bile não chega ao intestino).", highlight: true },
          { label: "Hepatite (lesão hepatocelular)", value: "Colúria + redução do urobilinogênio fecal. Urina pode ter urobilinogênio se houver circulação entero-hepática preservada parcialmente.", highlight: false },
          { label: "Gilbert / Crigler-Najjar", value: "SEM colúria (BI não filtrada pelos rins). Urobilinogênio normal ou levemente reduzido. Fezes com coloração normal.", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Kernicterus — Por que a BI é mais perigosa que a BD?",
        text: "A Bilirrubina INDIRETA (não conjugada) é LIPOSSOLÚVEL → atravessa facilmente a Barreira Hematoencefálica → deposita-se nos núcleos da base (especialmente globo pálido e núcleo subtalâmico) → toxicidade neuronal. A BD é hidrossolúvel e NÃO atravessa a BHE em condições normais. Kernicterus clássico: recém-nascidos com icterícia neonatal grave (hiperbilirrubinemia indireta > 20–25 mg/dL) → paralisia cerebral, surdez neurossensorial.",
      },
    ],
  },

  bi: {
    title: "Bilirrubina Indireta — Hemólise, Gilbert e Crigler-Najjar",
    blocks: [
      {
        type: "alert",
        color: "#6366F1",
        title: "Algoritmo da BI Elevada",
        text: "BI ↑ isolada = problema ANTES ou DURANTE a conjugação. Sequência diagnóstica: (1) Hemólise? → LABS (LDH alto, haptoglobina baixa, reticulocitose, anemia). Se hemólise excluída → (2) Síndrome de Gilbert (diagnóstico de exclusão, benigna). Se BI > 20 mg/dL em neonato → (3) Crigler-Najjar.",
      },
      {
        type: "grid",
        title: "Hemólise — Tétrade Diagnóstica",
        items: [
          { label: "Anemia", value: "Queda de Hb por destruição excessiva de hemácias. Pode estar ausente na hemólise compensada.", highlight: true },
          { label: "LDH elevado", value: "LDH é intracelular — liberado quando as hemácias se rompem. Muito sensível para hemólise.", highlight: true },
          { label: "Reticulocitose", value: "Medula compensa com liberação de reticulócitos. Reticulócitos > 2% = produção aumentada.", highlight: true },
          { label: "Haptoglobina baixa", value: "Proteína que captura hemoglobina livre — consumida na hemólise intravascular. Mais específica.", highlight: true },
          { label: "BI elevada", value: "Por superprodução de bilirrubina a partir da hemólise de hemácias. Raramente > 5 mg/dL na hemólise isolada.", highlight: false },
          { label: "Coombs direto", value: "Positivo na hemólise imune (AHAI). Negativo na hemólise mecânica, hereditária ou por enzimopatiass.", highlight: false },
        ],
      },
      {
        type: "grades",
        title: "Síndromes de BI Elevada — Comparação",
        organ: "Bilirrubina Indireta",
        grades: [
          {
            grade: "G",
            color: "#6366F1",
            items: [
              "SD. GILBERT",
              "Deficiência PARCIAL de UGT1A1",
              "BI leve: raramente > 5 mg/dL",
              "Benigna, sem tto",
              "Piora com jejum, estresse, infecções",
              "Diagnóstico de exclusão",
              "Fenobarbital pode reduzir icterícia (estética)",
            ],
          },
          {
            grade: "CN1",
            color: "#EF4444",
            items: [
              "CRIGLER-NAJJAR TIPO I",
              "Ausência COMPLETA de UGT1A1",
              "BI > 20–40 mg/dL",
              "Kernicterus fatal no 1º ano sem tto",
              "Fenobarbital INEFICAZ (sem enzima para induzir)",
              "TTO: fototerapia 12–16h/dia",
              "Único curatIVO: Transplante hepático",
            ],
          },
          {
            grade: "CN2",
            color: "#F59E0B",
            items: [
              "CRIGLER-NAJJAR TIPO II",
              "Deficiência PARCIAL de UGT1A1 (mais grave que Gilbert)",
              "BI < 20 mg/dL (mais baixa que CN1)",
              "Icterícia tardia (pode aparecer na adolescência)",
              "Neurológico raro (diferente do CN1)",
              "TTO: Fenobarbital EFICAZ (induz enzima residual)",
              "Fenobarbital diferencia CN1 de CN2",
            ],
          },
        ],
      },
      {
        type: "obs",
        title: "Gilbert × Crigler-Najjar II — Diferencial de Banca",
        text: "Ambos têm deficiência PARCIAL de UGT1A1 e respondem ao fenobarbital. Diferença quantitativa: CN II tem BI mais elevada e pode ter apresentação na adolescência. Gilbert tem BI raramente > 5 mg/dL e se manifesta habitualmente aos 20 anos em situação de estresse/jejum. Pérola: na Gilbert, o Teste de Restrição Calórica (jejum 48h) eleva a BI, confirmando o diagnóstico.",
      },
      {
        type: "obs",
        title: "Crigler-Najjar I — O Que Cai em Prova",
        text: "Fenobarbital NÃO funciona no CN I (não há enzima para ser induzida). Fototerapia = paliativo (12–16h/dia por toda a infância). Transplante hepático = único curativo. Aggravantes da BI: jejum, exercício intenso, álcool, ácido nicotínico. Complicação farmacológica: irinotecan (quimioterápico) — metabolizado pela UGT1A1 → acúmulo → diarreia e mielotoxicidade.",
      },
    ],
  },

  bd: {
    title: "Bilirrubina Direta — Colestase, Dubin-Johnson e Rotor",
    blocks: [
      {
        type: "alert",
        color: "#0EA5E9",
        title: "BD Elevada = Problema na EXCREÇÃO",
        text: "BD ↑ ocorre quando a bilirrubina já foi conjugada mas não consegue ser excretada para a bile, retornando ao plasma. Causas: (1) Defeito no transportador MRP2 (Dubin-Johnson), (2) Defeito no armazenamento (Rotor), (3) Colestase intra-hepática (hepatites, CBP, CEP, medicamentos), (4) Obstrução extra-hepática (coledocolitíase, neoplasias periampulares).",
      },
      {
        type: "grid",
        title: "Padrões Enzimáticos na BD Elevada",
        items: [
          { label: "Padrão HEPATOCELULAR (R ≥ 5)", value: "TGO/TGP > 5× LSN com FA pouco elevada. Hepatites virais, isquêmica, tóxica. TGO pode chegar a 50–100× LSN nas hepatites agudas.", highlight: true },
          { label: "Padrão CANALICULAR (R ≤ 2)", value: "FA e GGT > 3× LSN com transaminases pouco elevadas. Coledocolitíase, CBP, CEP, colangiocarcinoma, neoplasia periampular.", highlight: true },
          { label: "Padrão MISTO (2 < R < 5)", value: "Hepatites com componente colestático, DILI misto, CBP com inflamação ativa, sepse.", highlight: false },
          { label: "Confirmação da origem hepática da FA", value: "FA elevada + GGT elevada = origem hepática confirmada. FA elevada + GGT normal = origem óssea (Paget, tumores, puberdade).", highlight: false },
        ],
      },
      {
        type: "grades",
        title: "Síndromes de BD Elevada — Hereditárias",
        organ: "Bilirrubina Direta",
        grades: [
          {
            grade: "DJ",
            color: "#0EA5E9",
            items: [
              "SD. DUBIN-JOHNSON",
              "Defeito no gene MRP2 (transportador canalicular)",
              "BD não excretada para a bile → retorna ao plasma",
              "BD até 25 mg/dL, com BI também elevada",
              "FA e enzimas hepáticas NORMAIS",
              "Pigmento negro centrolobular (biopsia opcional)",
              "Coproporfirina I ↑ na urina (>80% da total)",
              "ACO pode precipitar ou agravar icterícia",
              "Benigna, sem tto específico",
            ],
          },
          {
            grade: "R",
            color: "#84CC16",
            items: [
              "SD. ROTOR",
              "Defeito no ARMAZENAMENTO da BD (OATP1B1/B3)",
              "BD conjugada não armazenada → retorna ao plasma",
              "BD elevada (mais leve que Dubin-Johnson)",
              "FA e enzimas hepáticas NORMAIS",
              "SEM pigmentação hepática (biopsia normal)",
              "Coproporfirina total ↑ 3–5× (diferente de DJ)",
              "Benigna, sem tto específico",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Diagnóstico Diferencial BD Elevada — Algoritmo",
        steps: [
          { text: "BD isoladamente elevada + FA/GGT normais + sem sintomas de colestase", color: "#0EA5E9" },
          { text: "Sem pigmento hepático + coproporfirina urinária ↑↑ total → SD. ROTOR", color: "#84CC16" },
          { text: "Com pigmento negro centrolobular + coproporfirina I ↑ (>80%) → SD. DUBIN-JOHNSON", color: "#0EA5E9" },
          { text: "BD elevada + FA/GGT ↑↑ + sem obstrução → Colestase intra-hepática (hepatites, CBP, medicamentos)", color: "#F97316" },
          { text: "BD elevada + FA/GGT ↑↑ + dilatação de vias biliares no USG → Colestase extra-hepática → CPRE diagnóstica/terapêutica", color: "#EF4444" },
        ],
      },
      {
        type: "obs",
        title: "Sinal de Courvoisier — Pérola de Exame Físico",
        text: "Vesícula biliar palpável + indolor + icterícia = Sinal de Courvoisier-Terrier → neoplasia periampular (cabeça de pâncreas, colangiocarcinoma distal, ampuloma) até prova em contrário. Litíase biliar NÃO causa vesícula palpável — a fibrose da parede impede a dilatação. 'Se a vesícula palpável e indolor dá icterícia, a pedra não é a causa.'",
      },
      {
        type: "obs",
        title: "Tríade de Charcot e Pêntade de Reynolds — Colangite",
        text: "Tríade de Charcot: Febre + Icterícia + Dor em HDD = Colangite aguda (litíase ou estenose biliar com infecção). Pêntade de Reynolds: Tríade + Hipotensão + Alteração do nível de consciência = Colangite GRAVE (sepse biliar) → ATB + drenagem urgente (CPRE). Mortalidade de 30–50% sem tratamento adequado.",
      },
    ],
  },

  sindromes: {
    title: "Síndromes Hereditárias do Metabolismo da Bilirrubina — Revisão Completa",
    blocks: [
      {
        type: "alert",
        color: "#EC4899",
        title: "Regra Geral — BI × BD nas Síndromes Hereditárias",
        text: "BI isolada (sem colúria, sem acolia): Gilbert, Crigler-Najjar I e II. BD isolada (com colúria, FA normal, benignas): Dubin-Johnson, Rotor. Todas têm PROVAS DE FUNÇÃO HEPÁTICA NORMAIS (albumina, INR, transaminases, FA normais) — diferencial importante de hepatite e colestase adquirida.",
      },
      {
        type: "decision",
        title: "Diferencial Entre as 4 Síndromes",
        decisions: [
          {
            condition: "Gilbert",
            color: "#6366F1",
            actions: [
              "Etapa afetada: Conjugação (UGT1A1 parcial)",
              "Bilirrubina: BI leve (< 5 mg/dL)",
              "Gatilhos: Jejum, estresse, doença intercorrente",
              "Fenobarbital: Funciona (indutor de UGT1A1)",
              "Coproporfirina: Normal",
              "Histologia hepática: Normal",
              "Tratamento: Nenhum (benigna)",
              "Prevalência: 3–10% da população (mais comum)",
            ],
          },
          {
            condition: "Crigler-Najjar I",
            color: "#EF4444",
            actions: [
              "Etapa afetada: Conjugação (UGT1A1 AUSENTE)",
              "Bilirrubina: BI grave (> 20–40 mg/dL)",
              "Apresentação: Neonatal, grave",
              "Fenobarbital: NÃO funciona",
              "Risco: Kernicterus fatal no 1º ano de vida",
              "Fototerapia: 12–16h/dia (paliativo)",
              "Tratamento definitivo: Transplante hepático",
              "Prevalência: Rara, AR",
            ],
          },
          {
            condition: "Crigler-Najjar II",
            color: "#F59E0B",
            actions: [
              "Etapa afetada: Conjugação (UGT1A1 parcial, mais grave que Gilbert)",
              "Bilirrubina: BI moderada (< 20 mg/dL)",
              "Apresentação: Tardia (adolescência)",
              "Fenobarbital: FUNCIONA (induz enzima residual)",
              "Risco neurológico: Raro (diferente do CN I)",
              "Tratamento: Fenobarbital (razões estéticas ou preventivas)",
              "Prevalência: Rara, AR",
            ],
          },
          {
            condition: "Dubin-Johnson",
            color: "#0EA5E9",
            actions: [
              "Etapa afetada: Excreção (MRP2 defeituoso)",
              "Bilirrubina: BD (até 25 mg/dL, mista)",
              "FA e transaminases: NORMAIS",
              "Pigmento negro centrolobular no fígado (biópsia não obrigatória)",
              "Coproporfirina I > 80% do total urinário",
              "ACO pode precipitar icterícia",
              "Tratamento: Nenhum (benigna)",
            ],
          },
          {
            condition: "Rotor",
            color: "#84CC16",
            actions: [
              "Etapa afetada: Armazenamento (OATP1B1/B3 defeituoso)",
              "Bilirrubina: BD (mais leve que Dubin-Johnson)",
              "FA e transaminases: NORMAIS",
              "SEM pigmento hepático (biópsia normal)",
              "Coproporfirina urinária TOTAL ↑ 3–5×",
              "Tratamento: Nenhum (benigna)",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Tabela Comparativa — 5 Síndromes em Um Olhar",
        items: [
          { label: "BI × BD", value: "Gilbert → BI | CN I → BI | CN II → BI | Dubin-Johnson → BD | Rotor → BD", highlight: true },
          { label: "Fenobarbital", value: "Funciona em: Gilbert, CN II. NÃO funciona em: CN I (sem enzima), Dubin-Johnson, Rotor", highlight: true },
          { label: "Transplante curativo", value: "CN I (único curativo efetivo). Nos demais: não indicado", highlight: false },
          { label: "Pigmento hepático", value: "APENAS Dubin-Johnson (fígado negro macroscopicamente). Rotor = fígado NORMAL na biópsia", highlight: true },
          { label: "Coproporfirina urinária", value: "DJ: coproporfirina I > 80% (fração alterada). Rotor: total ↑↑ (todas as frações). Gilbert/CN: normal", highlight: true },
          { label: "Kernicterus", value: "Risco REAL apenas no CN I (BI > 20–40 mg/dL). Gilbert e CN II raramente causam kernicterus", highlight: true },
          { label: "ACO e icterícia", value: "Dubin-Johnson: ACO pode precipitar/agravar icterícia. Mecanismo: estrogênio inibe MRP2", highlight: false },
          { label: "Prevalência", value: "Gilbert: mais comum (3–10%). Demais: raras, todas AR exceto Gilbert (padrão poligênico)", highlight: false },
        ],
      },
      {
        type: "obs",
        title: "Pérola Final — Síndromes Hereditárias em Contexto Clínico",
        text: "Jovem de 20 anos com icterícia recorrente leve após jejum prolongado ou doença intercorrente, exames hepáticos normais → Gilbert. RN com BI > 20 mg/dL, histologia e função normais, sem resposta ao fenobarbital → CN I. Criança com BI moderada que responde ao fenobarbital → CN II. Adulto jovem com BD elevada isolada, FA normal, histórico de uso de ACO → Dubin-Johnson. Adulto jovem com BD elevada isolada, FA normal, biópsia hepática NORMAL → Rotor.",
      },
    ],
  },
};

export default function Hepato101() {
  const [active, setActive] = useState(sections[0].id);
  const navigate = useNavigate();
  const sec = sections.find((s) => s.id === active);
  const color = sec.color;
  const curr = content[active];

  const renderBlock = (block, idx) => {
    if (block.type === "alert") {
      return (
        <div key={idx} style={{
          background: `${block.color}10`,
          border: `1px solid ${block.color}40`,
          borderLeft: `3px solid ${block.color}`,
          borderRadius: 6,
          padding: "14px 18px",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: block.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            ⬥ {block.title}
          </div>
          <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.65 }}>{block.text}</div>
        </div>
      );
    }

    if (block.type === "obs") {
      return (
        <div key={idx} style={{
          background: "#0d1117",
          border: "1px solid #1e2a3a",
          borderLeft: "3px solid #374151",
          borderRadius: 6,
          padding: "14px 18px",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            📋 {block.title}
          </div>
          <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.65 }}>{block.text}</div>
        </div>
      );
    }

    if (block.type === "grid") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {block.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
            {block.items.map((item, i) => (
              <div key={i} style={{
                background: item.highlight ? `${color}0e` : "#0a0d14",
                border: `1px solid ${item.highlight ? color + "30" : "#111827"}`,
                borderRadius: 5,
                padding: "10px 14px",
              }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: item.highlight ? color : "#4b5563", marginBottom: 4, fontWeight: 600 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: item.highlight ? "#d1d5db" : "#6b7280", lineHeight: 1.55 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "flow") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {block.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {block.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: `${step.color}22`,
                    border: `1px solid ${step.color}60`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: step.color, fontFamily: "monospace", fontWeight: 700,
                  }}>
                    {i + 1}
                  </div>
                  {i < block.steps.length - 1 && (
                    <div style={{ width: 1, height: 12, background: "#1f2937" }} />
                  )}
                </div>
                <div style={{
                  background: `${step.color}08`,
                  border: `1px solid ${step.color}25`,
                  borderRadius: 5, padding: "8px 12px", flex: 1,
                  fontSize: 12, color: "#c9cdd6", lineHeight: 1.5,
                }}>
                  {step.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "grades") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {block.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
            {block.grades.map((g, i) => (
              <div key={i} style={{ background: `${g.color}0a`, border: `1px solid ${g.color}30`, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ background: `${g.color}20`, padding: "8px 12px", borderBottom: `1px solid ${g.color}30`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: g.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700, fontFamily: "monospace", flexShrink: 0 }}>
                    {g.grade}
                  </div>
                  <span style={{ fontSize: 11, color: g.color, fontFamily: "monospace", letterSpacing: "0.06em" }}>{g.items[0]}</span>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  {g.items.slice(1).map((item, j) => (
                    <div key={j} style={{
                      fontSize: 12, color: "#9ca3af", lineHeight: 1.55,
                      paddingBottom: 3,
                      borderBottom: j < g.items.length - 2 ? "1px solid #111827" : "none",
                      marginBottom: 3,
                    }}>
                      {item}
                    </div>
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
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {block.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.phases.map((phase, i) => (
              <div key={i} style={{
                background: `${phase.color}08`, border: `1px solid ${phase.color}30`,
                borderRadius: 6, overflow: "hidden", display: "flex",
              }}>
                <div style={{
                  width: 48, background: `${phase.color}18`, borderRight: `1px solid ${phase.color}30`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "12px 0", flexShrink: 0, gap: 4,
                }}>
                  <span style={{ fontSize: 16 }}>{phase.number}</span>
                  <span style={{
                    fontSize: 9, color: phase.color, fontFamily: "monospace",
                    writingMode: "vertical-rl", transform: "rotate(180deg)",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    {phase.name.slice(0, 10)}
                  </span>
                </div>
                <div style={{ padding: "12px 14px", flex: 1 }}>
                  <div style={{ fontSize: 11, color: phase.color, fontFamily: "monospace", marginBottom: 8, fontWeight: 700 }}>
                    {phase.name}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {phase.items.map((item, j) => (
                      <div key={j} style={{
                        fontSize: 12, color: "#9ca3af", background: "#0a0d14",
                        border: "1px solid #1f2937", borderRadius: 4, padding: "4px 8px", lineHeight: 1.4,
                      }}>
                        {item}
                      </div>
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
          <div style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            {block.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.decisions.map((d, i) => (
              <div key={i} style={{
                background: `${d.color}08`, border: `1px solid ${d.color}30`,
                borderRadius: 6, overflow: "hidden",
              }}>
                <div style={{
                  background: `${d.color}18`, padding: "8px 16px",
                  borderBottom: `1px solid ${d.color}30`,
                }}>
                  <span style={{ fontSize: 12, color: d.color, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
                    {d.condition}
                  </span>
                </div>
                <div style={{ padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {d.actions.map((a, j) => (
                    <div key={j} style={{
                      fontSize: 12, color: "#9ca3af", background: "#0a0d14",
                      border: "1px solid #1f2937", borderRadius: 4, padding: "3px 8px",
                    }}>
                      {a}
                    </div>
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
    <div style={{
      background: "#06080f",
      minHeight: "100vh",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      color: "#dde3f0",
      display: "flex",
      flexDirection: "column",
    }}>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent", border: "1px solid #1e2a3a", color: "#64748b",
          padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace",
          fontSize: 12, width: "fit-content", margin: "16px 0 0 28px",
          display: "inline-flex", alignItems: "center", gap: 5,
        }}
      >
        ← MedPanel
      </button>

      <div style={{ borderBottom: "1px solid #111827", padding: "16px 28px", background: "#080b14" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#374151", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 4 }}>
          Clínica Médica · Hepatologia · Referência para Residência
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#f1f5f9", letterSpacing: "0.01em" }}>
          Hepato 101 — Anatomia, Fisiologia e Síndrome Ictérica
        </h1>
        <div style={{ fontSize: 11, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>
          Anatomia · Fisiologia · Lab. · Metabolismo Bilirrubina · BI · BD · Síndromes Hereditárias
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{
          width: 170, borderRight: "1px solid #0f1623", background: "#080b14",
          padding: "12px 0", flexShrink: 0, overflowY: "auto",
        }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                width: "100%",
                background: active === s.id ? `${s.color}12` : "transparent",
                border: "none",
                borderLeft: `2px solid ${active === s.id ? s.color : "transparent"}`,
                color: active === s.id ? "#f1f5f9" : "#4b5563",
                padding: "10px 16px", cursor: "pointer", textAlign: "left",
                fontSize: 12, fontFamily: "monospace", transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: active === s.id ? s.color : "#1f2937", flexShrink: 0,
                }} />
                {s.name}
              </div>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${color}22`,
          }}>
            <div style={{
              background: `${color}18`, border: `1px solid ${color}44`, color,
              padding: "4px 16px", borderRadius: 4, fontSize: 10, fontFamily: "monospace",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {sec.name}
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, color: "#e2e8f0" }}>
              {curr.title}
            </div>
          </div>
          {curr.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #0f1623", padding: "10px 28px", background: "#080b14",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: 10, color: "#1f2937", fontFamily: "monospace" }}>
          {sections.findIndex((s) => s.id === active) + 1}/{sections.length} · {sec.name}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                width: active === s.id ? 20 : 6, height: 6, borderRadius: 3,
                background: active === s.id ? s.color : "#1f2937",
                cursor: "pointer", transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
