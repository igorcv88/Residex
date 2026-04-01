import MedPanelPage from "./medpanel-layout";

const sections = [
  { id: "cirrose", name: "Cirrose", color: "#6366F1" },
  { id: "fulminante", name: "Hep. Fulminante", color: "#EF4444" },
  { id: "dhem", name: "DHEM", color: "#F59E0B" },
  { id: "alcoolica", name: "D. Alcoólica", color: "#F97316" },
  { id: "cbp", name: "CBP", color: "#0EA5E9" },
  { id: "cep", name: "CEP", color: "#10B981" },
  { id: "medicamentosa", name: "Medicamentosa", color: "#EC4899" },
  { id: "hemocromatose", name: "Hemocromatose", color: "#8B5CF6" },
  { id: "wilson", name: "D. de Wilson", color: "#84CC16" },
];

const content = {
  cirrose: {
    title: "Cirrose Hepática — Fisiopatologia, Classificação e Complicações",
    blocks: [
      {
        type: "alert",
        color: "#6366F1",
        title: "Definição Funcional",
        text: "Cirrose = fibrose hepática difusa com formação de nódulos regenerativos → distorção da arquitetura normal → hipertensão portal + insuficiência hepatocelular. Transaminases frequentemente NORMAIS ou discretamente elevadas (hepatócitos já perdidos).",
      },
      {
        type: "grid",
        title: "Manifestações da Hipertensão Portal",
        items: [
          {
            label: "Varizes esofagogástricas",
            value:
              "Fluxo retrógrado pelas v. gástricas → v. ázigos → varicosidades submucosas. Gradiente > 12 mmHg = risco de ruptura.",
            highlight: true,
          },
          {
            label: "Ascite",
            value:
              "Hipertensão portal + hipoalbuminemia + hipertensão sinusoidal → extravasamento para 3º espaço.",
            highlight: true,
          },
          {
            label: "Esplenomegalia",
            value:
              "Congestão da v. esplênica → plaquetopenia por hiperesplenismo.",
            highlight: false,
          },
          {
            label: "Circulação colateral",
            value:
              "Cabeça de Medusa. Sopro/frêmito = Sinal de Cruveilhier-Baumgarten.",
            highlight: false,
          },
          {
            label: "Encefalopatia portossistêmica",
            value:
              "Shunts portossistêmicos → amônia e outras toxinas atingem o SNC sem metabolização hepática.",
            highlight: true,
          },
        ],
      },
      {
        type: "grid",
        title: "Manifestações da Insuficiência Hepatocelular",
        items: [
          {
            label: "Icterícia",
            value:
              "Acúmulo de BD por falha no metabolismo. Sinal de doença avançada.",
            highlight: false,
          },
          {
            label: "Coagulopatia",
            value:
              "Redução de síntese de fatores II, VII, IX, X (vit. K dependentes) + I, V, VIII. INR aumentado.",
            highlight: true,
          },
          {
            label: "Hipoalbuminemia",
            value:
              "Redução de síntese → edema, ascite. Albumina < 2,8 g/dL = Child 3.",
            highlight: false,
          },
          {
            label: "Ginecomastia / telangiectasias",
            value:
              "Hiperestrogenismo por falha no catabolismo hepático de estrogênios.",
            highlight: false,
          },
          {
            label: "Sarcopenia",
            value:
              "Redução de síntese proteica muscular. Fator de mau prognóstico independente.",
            highlight: false,
          },
          {
            label: "Hiponatremia dilucional",
            value: "Hiperaldosteronismo secundário → retenção de água livre.",
            highlight: false,
          },
        ],
      },
      {
        type: "grades",
        title: "Classificação de Child-Pugh",
        organ: "Cirrose",
        grades: [
          {
            grade: "A",
            color: "#10B981",
            items: [
              "5–6 pontos",
              "Sobrevida 1 ano: ~100%",
              "Sobrevida 2 anos: ~85%",
              "Cirurgia com baixo risco",
            ],
          },
          {
            grade: "B",
            color: "#F59E0B",
            items: [
              "7–9 pontos",
              "Sobrevida 1 ano: ~80%",
              "Sobrevida 2 anos: ~60%",
              "Cirurgia com risco intermediário",
            ],
          },
          {
            grade: "C",
            color: "#EF4444",
            items: [
              "10–15 pontos",
              "Sobrevida 1 ano: ~45%",
              "Sobrevida 2 anos: ~35%",
              "Cirurgia com alto risco / contraindicada",
            ],
          },
        ],
      },
      {
        type: "grid",
        title: "Parâmetros do Child-Pugh (1→3 pontos cada)",
        items: [
          {
            label: "Bilirrubina",
            value: "< 2 / 2–3 / > 3 mg/dL",
            highlight: false,
          },
          {
            label: "Albumina",
            value: "> 3,5 / 2,8–3,5 / < 2,8 g/dL",
            highlight: false,
          },
          {
            label: "INR (TP)",
            value: "< 1,7 / 1,7–2,3 / > 2,3",
            highlight: true,
          },
          {
            label: "Encefalopatia",
            value: "Ausente / Grau I–II / Grau III–IV",
            highlight: false,
          },
          {
            label: "Ascite",
            value: "Ausente / Leve-moderada / Grave",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "MELD — Fila de Transplante",
        text: "MELD = 3,78×ln(BT) + 11,2×ln(INR) + 9,57×ln(Cr) + 6,43. Variáveis: Bilirrubina, INR e Creatinina. MELD ≥ 11 para entrada na fila de transplante no Brasil. Superior ao Child-Pugh para predizer mortalidade em 90 dias. NÃO é cobrado para calcular em prova — saiba os parâmetros.",
      },
      {
        type: "flow",
        title: "Profilaxia de Varizes — Algoritmo",
        steps: [
          {
            text: "EDA de rastreamento em todo cirrótico ao diagnóstico",
            color: "#6366F1",
          },
          {
            text: "Varizes de médio/grosso calibre OU Cherry-Red Spots OU Child B/C → ALTO RISCO",
            color: "#F59E0B",
          },
          {
            text: "Profilaxia primária: β-bloqueador não seletivo (propranolol/carvedilol) OU ligadura elástica (EDA)",
            color: "#10B981",
          },
          {
            text: "Sangramento agudo: Terlipressina EV + Ceftriaxona + EDA nas primeiras 12h",
            color: "#EF4444",
          },
          {
            text: "Profilaxia secundária (pós-1º sangramento): β-bloqueador + ligadura elástica (combinação)",
            color: "#6366F1",
          },
          {
            text: "Refratário: TIPS (derivação portossistêmica transjugular intra-hepática)",
            color: "#8B5CF6",
          },
        ],
      },
      {
        type: "grid",
        title: "Causas de Cirrose (por Frequência)",
        items: [
          {
            label: "Hepatite C crônica",
            value: "Principal causa de transplante em adultos no mundo.",
            highlight: true,
          },
          {
            label: "Doença hepática alcoólica",
            value: "Principal causa de cirrose no Brasil.",
            highlight: true,
          },
          {
            label: "DHEM (DHGNA)",
            value: "Causa crescente mundialmente ligada à síndrome metabólica.",
            highlight: false,
          },
          {
            label: "Hepatite B crônica",
            value: "Importante especialmente em regiões endêmicas.",
            highlight: false,
          },
          {
            label: "Atresia de vias biliares",
            value:
              "Principal causa de transplante em CRIANÇAS. Colestase neonatal progressiva.",
            highlight: true,
          },
          {
            label: "Wilson / Hemocromatose / CBP / CEP",
            value:
              "Causas metabólicas e autoimunes — sempre pesquisar em cirrose criptogênica.",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "Síndrome Hepatopulmonar — Pérola de Prova",
        text: "Tríade: doença hepática crônica + hipoxemia + dilatações vasculares intrapulmonares (shunts). Mecanismo: óxido nítrico → vasodilatação pulmonar → shunt D→E. Ortodeoxia (hipoxemia piora em ortostase). Diagnóstico: ecocardiograma com microbolhas + gasometria. TTO: transplante hepático (curativo).",
      },
      {
        type: "obs",
        title: "Peritonite Bacteriana Espontânea (PBE)",
        text: "Diagnóstico: PMN > 250/mm³ no líquido ascítico. Germe mais comum: E. coli (monobacteriana). TTO: Ceftriaxona 2g/dia IV × 5–7 dias + Albumina 1,5 g/kg D1 e 1 g/kg D3 (previne SHR). Profilaxia primária: Norfloxacino 400 mg/dia se PT < 1,5 g/dL E Child ≥ B. Profilaxia secundária: Norfloxacino após 1º episódio indefinidamente.",
      },
    ],
  },

  fulminante: {
    title: "Hepatite Fulminante — Definição, Critérios e Manejo",
    blocks: [
      {
        type: "alert",
        color: "#EF4444",
        title: "Definição Canônica",
        text: "Insuficiência hepática AGUDA (< 8 semanas de sintomas em fígado previamente saudável) com ENCEFALOPATIA HEPÁTICA + INR ≥ 1,5. Subclassificação: hiperaguda (< 7 dias), aguda (7–28 dias), subaguda (4–8 semanas) — impacta prognóstico.",
      },
      {
        type: "grid",
        title: "Principais Causas",
        items: [
          {
            label: "Hepatite B (viral)",
            value:
              "Causa viral mais comum no mundo. Hepatite D em superinfecção piora dramaticamente.",
            highlight: true,
          },
          {
            label: "Paracetamol",
            value:
              "Principal causa em países desenvolvidos (EUA/UK). Dose-dependente. Antídoto: N-acetilcisteína.",
            highlight: true,
          },
          {
            label: "Hepatite E em gestantes",
            value:
              "Mortalidade de até 20% em grávidas — causa fulminante em contexto de endemia.",
            highlight: true,
          },
          {
            label: "Drogas idiossincrásicas",
            value:
              "Isoniazida, halotano, sulfonamidas, anticonvulsivantes. Imprevisível.",
            highlight: false,
          },
          {
            label: "Budd-Chiari agudo",
            value:
              "Trombose de veias hepáticas. Investigar trombofilia (neoplasias mieloproliferativas).",
            highlight: false,
          },
          {
            label: "Hepatite autoimune",
            value:
              "Pode debutar como falência fulminante — imunossupressor insuficiente → transplante.",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Apresentação Clínica",
        items: [
          {
            label: "Encefalopatia",
            value:
              "Do Grau I (sono/confusão leve) ao Grau IV (coma). Flapping + hálito hepático.",
            highlight: true,
          },
          {
            label: "Icterícia",
            value: "Hiperbilirrubinemia direta progressiva.",
            highlight: false,
          },
          {
            label: "Coagulopatia grave",
            value:
              "INR ≥ 1,5 é critério diagnóstico. Sangramento mucoso, equimoses.",
            highlight: true,
          },
          {
            label: "Ascite aguda",
            value: "Incomum na fase hiperaguda; mais presente na subaguda.",
            highlight: false,
          },
          {
            label: "Náuseas / vômitos",
            value: "Sintomas prodrômicos inespecíficos.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Critérios de King's College para Transplante (Paracetamol)",
        steps: [
          {
            text: "pH arterial < 7,30 APÓS ressuscitação volêmica  →  INDICAÇÃO ISOLADA",
            color: "#EF4444",
          },
          { text: "OU: Todos os 3 simultâneos:", color: "#F59E0B" },
          { text: "INR > 6,5", color: "#EF4444" },
          { text: "Creatinina > 3,4 mg/dL", color: "#EF4444" },
          { text: "Encefalopatia Grau III ou IV", color: "#EF4444" },
        ],
      },
      {
        type: "flow",
        title: "Critérios de King's College — NÃO Paracetamol",
        steps: [
          { text: "INR > 6,5  →  INDICAÇÃO ISOLADA", color: "#EF4444" },
          { text: "OU: 3 dos 5 critérios abaixo:", color: "#F59E0B" },
          {
            text: "Etiologia: Wilson, Halotano, Idiossincrásica",
            color: "#F97316",
          },
          { text: "Idade < 10 ou > 40 anos", color: "#F97316" },
          { text: "Icterícia → encefalopatia > 7 dias", color: "#F97316" },
          { text: "Bilirrubina Total > 17,5 mg/dL", color: "#F97316" },
          { text: "INR > 3,5", color: "#F97316" },
        ],
      },
      {
        type: "grid",
        title: "Tratamento Específico por Etiologia",
        items: [
          {
            label: "Paracetamol",
            value:
              "N-acetilcisteína IV (primeiras 8–16h = máxima eficácia). Carvão ativado se < 4h da ingestão.",
            highlight: true,
          },
          {
            label: "Hepatite B aguda grave",
            value:
              "Antiviral (Tenofovir ou Entecavir) — indicado mesmo sem critérios de tratamento crônico.",
            highlight: true,
          },
          {
            label: "Budd-Chiari",
            value:
              "Anticoagulação + TIPS. Investigar JAK2 V617F, fator V Leiden.",
            highlight: false,
          },
          {
            label: "Hepatite autoimune",
            value:
              "Corticoterapia (prednisolona). Se sem resposta em 48–72h → transplante.",
            highlight: false,
          },
          {
            label: "Wilson fulminante",
            value:
              "Trientina/penicilamina INEFICAZ na fase aguda → transplante de urgência.",
            highlight: true,
          },
        ],
      },
      {
        type: "alert",
        color: "#F97316",
        title: "Edema Cerebral — Principal Causa de Morte",
        text: "Ocorre em 25–35% das hepatites fulminantes com encefalopatia Grau IV. Monitorização: PIC em encefalopatia Grau III/IV. Conduta: cabeceira 30°, manitol 0,5–1 g/kg IV em bolus, hiperventilação temporária (PaCO₂ 30–35 mmHg). Evitar benzodiazepínicos. Meta PPC > 50 mmHg.",
      },
      {
        type: "obs",
        title: "Hemorragia Digestiva na Fulminante",
        text: "Ocorre em ~30–35% dos casos. Causa: úlcera de estresse (Cushing hepático) + coagulopatia. Profilaxia: IBP + reposição de fatores (FFP, vitamina K IV). Não usar heparina profilática na coagulopatia grave.",
      },
    ],
  },

  dhem: {
    title: "Doença Hepática Esteatótica Metabólica (DHEM / DHGNA)",
    blocks: [
      {
        type: "alert",
        color: "#F59E0B",
        title: "Mudança de Nomenclatura — 2023",
        text: "DHGNA (Doença Hepática Gordurosa Não Alcoólica) foi renomeada para DHEM (Doença Hepática Esteatótica Metabólica) pela Delphi 2023. Critério diagnóstico: esteatose hepática + pelo menos 1 critério cardiometabólico. Afeta ~25% da população mundial.",
      },
      {
        type: "grid",
        title: "Fatores de Risco / Critérios Cardiometabólicos",
        items: [
          {
            label: "Obesidade / Sobrepeso",
            value:
              "IMC ≥ 25 kg/m². Especialmente obesidade central (CA > 90 cm H / > 80 cm M).",
            highlight: true,
          },
          {
            label: "Diabetes Mellitus tipo 2",
            value:
              "Resistência insulínica como mecanismo central da esteatose.",
            highlight: true,
          },
          {
            label: "Dislipidemia",
            value: "Triglicerídeos elevados e/ou HDL reduzido.",
            highlight: false,
          },
          {
            label: "Hipertensão arterial",
            value: "Componente da síndrome metabólica.",
            highlight: false,
          },
          {
            label: "SOP (mulheres)",
            value:
              "Síndrome dos ovários policísticos — associação forte com DHEM.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Diagnóstico — Passo a Passo",
        steps: [
          {
            text: "Esteatose hepática confirmada (USG, TC, RM ou histologia > 5% de gordura)",
            color: "#F59E0B",
          },
          {
            text: "Excluir consumo significativo de álcool (H > 30 g/dia / M > 20 g/dia)",
            color: "#F97316",
          },
          {
            text: "Excluir outras causas: medicamentosa, viral, metabólica específica",
            color: "#F97316",
          },
          {
            text: "Pelo menos 1 critério cardiometabólico presente → DHEM confirmada",
            color: "#10B981",
          },
          {
            text: "Estadiar fibrose: FIB-4 (Idade × AST / [Plaquetas × √ALT])",
            color: "#6366F1",
          },
          {
            text: "FIB-4 ≥ 1,3 → Elastografia hepática (fibrose avançada possível)",
            color: "#EF4444",
          },
        ],
      },
      {
        type: "grid",
        title: "Estadiamento Não Invasivo da Fibrose",
        items: [
          {
            label: "FIB-4 < 1,30",
            value:
              "Fibrose avançada pouco provável. Manejo na atenção primária.",
            highlight: false,
          },
          {
            label: "FIB-4 1,30–2,67",
            value: "Zona cinzenta — complementar com elastografia hepática.",
            highlight: true,
          },
          {
            label: "FIB-4 > 2,67",
            value:
              "Alta probabilidade de fibrose F3-F4. Encaminhar para hepatologista.",
            highlight: true,
          },
          {
            label: "Elastografia > 8 kPa",
            value: "Fibrose significativa (F2-F3).",
            highlight: false,
          },
          {
            label: "Elastografia > 12–15 kPa",
            value: "Cirrose provável.",
            highlight: true,
          },
        ],
      },
      {
        type: "grid",
        title: "Tratamento — Por Perfil Metabólico",
        items: [
          {
            label: "Base: perda de peso",
            value:
              "5–10% do peso corporal reduz esteatose. > 10% reduz fibrose.",
            highlight: true,
          },
          {
            label: "DM2 associado: Pioglitazona",
            value:
              "Melhora histologia (esteatose + inflamação). Dose: 30–45 mg/dia.",
            highlight: true,
          },
          {
            label: "DM2 associado: Semaglutida/Liraglutida",
            value:
              "Análogos GLP-1 — melhoram esteatose, inflamação e reduzem eventos CV.",
            highlight: true,
          },
          {
            label: "Sem DM2: Vitamina E",
            value:
              "800 UI/dia — melhora histologia em não diabéticos. Risco de AVCh em longo prazo.",
            highlight: false,
          },
          {
            label: "iSGLT2 (empagliflozina/dapagliflozina)",
            value:
              "Dados emergentes promissores, especialmente com DM2 e obesidade.",
            highlight: false,
          },
          {
            label: "Resmetirom",
            value:
              "Agonista seletivo do receptor β de hormônio tireoidiano — 1ª droga aprovada FDA 2024 para MASH com fibrose F2-F3.",
            highlight: true,
          },
        ],
      },
      {
        type: "obs",
        title: "MASH (Esteato-Hepatite Metabólica) — Risco de Progressão",
        text: "DHEM + inflamação lobular + balonamento hepatocitário = MASH. 20–30% evoluem para fibrose avançada. Rastreamento de CHC em cirróticos por DHEM: US a cada 6 meses (mesmo sem cirrose se MASH com fibrose avançada, risco de CHC existe mas é menor que no VHC).",
      },
    ],
  },

  alcoolica: {
    title: "Doença Hepática Alcoólica — Do Abuso à Cirrose",
    blocks: [
      {
        type: "alert",
        color: "#F97316",
        title: "Limites Seguros de Consumo (OMS)",
        text: "Homens: até 21 unidades/semana (1 UN = 10g álcool puro). Mulheres: até 14 unidades/semana. Atenção: mulheres desenvolvem lesão hepática com menor dose e menor tempo (susceptibilidade aumentada). Consumo > 40–80 g/dia por > 10–20 anos → risco de cirrose.",
      },
      {
        type: "grid",
        title: "Triagem — Questionário CAGE (≥ 2 positivos = abuso)",
        items: [
          {
            label: "C — Cut down",
            value: "Já sentiu necessidade de diminuir ou parar de beber?",
            highlight: false,
          },
          {
            label: "A — Annoyed",
            value: "As pessoas o aborrecem por criticar seu modo de beber?",
            highlight: false,
          },
          {
            label: "G — Guilty",
            value: "Sente-se culpado pela maneira que costuma beber?",
            highlight: false,
          },
          {
            label: "E — Eye opener",
            value:
              "Costuma beber pela manhã para diminuir o nervosismo/ressaca?",
            highlight: true,
          },
        ],
      },
      {
        type: "phases",
        title: "Espectro da Doença Hepática Alcoólica",
        phases: [
          {
            number: "1",
            name: "Esteatose Alcoólica",
            color: "#F59E0B",
            items: [
              "Qualquer nível de libação pode causar",
              "Reversível em 2–4 semanas de abstinência",
              "Assintomática ou hepatomegalia leve",
              "TGO e TGP apenas discretamente elevadas",
            ],
          },
          {
            number: "2",
            name: "Hepatite Alcoólica",
            color: "#F97316",
            items: [
              "Libação aguda sobre consumo crônico",
              "Febre + icterícia + dor em HDD",
              "TGO > TGP (razão ≥ 2:1), mas ambas < 300–400 UI/L",
              "Leucocitose (quimiotaxia por acetaldeído)",
              "GGT muito elevada (sensível para alcoolismo)",
            ],
          },
          {
            number: "3",
            name: "Cirrose Alcoólica",
            color: "#EF4444",
            items: [
              "Agressão hepática crônica e recorrente",
              "Irreversível — fibrose e nódulos regenerativos",
              "Manifestações de HTP + IH",
              "Principal causa de cirrose no Brasil",
            ],
          },
        ],
      },
      {
        type: "obs",
        title: "Índice de Maddrey (Discriminant Function)",
        text: "DF = 4,6 × (TP paciente − TP controle em segundos) + Bilirrubina total (mg/dL). DF ≥ 32 = hepatite alcoólica GRAVE → indicação de corticosteroide (Prednisolona 40 mg/dia × 4 semanas). Contraindicações: infecção ativa, sangramento GI ativo, Cr > 2,5. Meta-análise (Cochrane 2019): redução de mortalidade em 30 dias com corticoide no DF ≥ 32.",
      },
      {
        type: "grid",
        title: "Diagnóstico Laboratorial da D. Alcoólica",
        items: [
          {
            label: "TGO > TGP (razão ≥ 2:1)",
            value: "Clássico da hepatite alcoólica. TGO raramente > 400 UI/L.",
            highlight: true,
          },
          {
            label: "GGT elevada",
            value:
              "Mais sensível para hepatopatia alcoólica. Indução enzimática pelo álcool.",
            highlight: true,
          },
          {
            label: "VCM aumentado",
            value:
              "Macrocitose por efeito tóxico do álcool na eritropoiese + deficiência de B12/folato.",
            highlight: false,
          },
          {
            label: "FA elevada (discreta)",
            value:
              "Diferente da colestase pura — menos elevada que em doenças biliares.",
            highlight: false,
          },
          {
            label: "FIB-4 / APRI",
            value:
              "FIB-4 > 1,3 indica fibrose significativa. APRI > 1 sugere fibrose avançada.",
            highlight: true,
          },
          {
            label: "Biópsia hepática",
            value:
              "Corpo de Mallory-Denk (hepatócitos balonizados com inclusões). Padrão-ouro para estadiar fibrose.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Conduta na Hepatite Alcoólica",
        steps: [
          {
            text: "Abstinência alcoólica — pilar fundamental em todos os casos",
            color: "#10B981",
          },
          {
            text: "Suporte nutricional agressivo (≥ 1,5 g/kg/dia de proteína)",
            color: "#10B981",
          },
          { text: "Calcular Índice de Maddrey (DF)", color: "#F59E0B" },
          {
            text: "DF ≥ 32: Prednisolona 40 mg/dia VO × 28 dias",
            color: "#F97316",
          },
          {
            text: "Avaliar resposta com Critério de Lille no D7 (Lille > 0,45 = não respondedor → suspender)",
            color: "#EF4444",
          },
          {
            text: "Refratário / cirrose avançada: avaliar transplante hepático",
            color: "#8B5CF6",
          },
        ],
      },
      {
        type: "obs",
        title: "Pérola — TGO/TGP na Hepatite Alcoólica",
        text: "A banca cobra: na hepatite alcoólica, as transaminases são ELEVADAS mas raramente excedem 400 UI/L. Se TGO > 400, pensar em outra etiologia (viral, isquêmica, tóxica). A razão TGO:TGP ≥ 2:1 é característica mas não patognomônica — também ocorre em outras causas de cirrose avançada.",
      },
    ],
  },

  cbp: {
    title: "Colangite Biliar Primária (CBP) — Doença Autoimune dos Ductos",
    blocks: [
      {
        type: "alert",
        color: "#0EA5E9",
        title: "Perfil Clínico Clássico",
        text: "Mulher de meia-idade (4ª–6ª décadas) + prurido crônico + fadiga + colestase bioquímica (FA e GGT elevadas) + AMA positivo ≥ 1:40. Associação com Sjögren, Hashimoto, AR, esclerodermia limitada. NUNCA esqueça: imunoglobulina IgM elevada (padrão).",
      },
      {
        type: "grid",
        title: "Fisiopatologia",
        items: [
          {
            label: "Alvo autoimune",
            value:
              "Epitelio dos ductos biliares intra-hepáticos PEQUENOS. Linfócitos T contra antígenos mitocondriais.",
            highlight: true,
          },
          {
            label: "Anticorpo-chave: AMA",
            value:
              "Anti-mitocôndria, esp. anti-M2 (contra complexo piruvato-desidrogenase E2). Título ≥ 1:40 = significativo.",
            highlight: true,
          },
          {
            label: "IgM elevada",
            value:
              "Padrão característico de imunoglobulinas. ANA também pode estar positivo (variante AMA-negativa).",
            highlight: false,
          },
          {
            label: "Progressão",
            value:
              "Retenção de ácidos biliares → hepatotoxicidade por sal biliar → fibrose → cirrose biliar.",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Apresentação Clínica por Estágio",
        items: [
          {
            label: "Fase inicial (assintomática)",
            value:
              "FA e GGT elevadas incidentalmente. Prurido pode preceder icterícia em anos.",
            highlight: false,
          },
          {
            label: "Sintomática precoce",
            value:
              "Prurido intenso (noturno, palmo-plantar), fadiga. FA > 2–3× LSN. GGT elevada.",
            highlight: true,
          },
          {
            label: "Sintomática tardia",
            value:
              "Icterícia, xantomas, xantelasma, hiperpigmentação, osteoporose (colestase → má absorção de vit. D).",
            highlight: false,
          },
          {
            label: "Avançada",
            value:
              "Cirrose biliar → HTP + IH. Risco de CHC aumentado (especialmente homens).",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Critérios Diagnósticos (2 de 3 = diagnóstico sem biópsia)",
        steps: [
          {
            text: "1. Colestase bioquímica persistente (FA ≥ 2× LSN por > 6 meses)",
            color: "#0EA5E9",
          },
          {
            text: "2. AMA positivo ≥ 1:40 (ou AMA-M2 positivo)",
            color: "#0EA5E9",
          },
          {
            text: "3. Biópsia: lesão ductal florida (infiltrado linfoplasmocitário + destruição ductal)",
            color: "#0EA5E9",
          },
          {
            text: "Se AMA negativo → investigar ANA / anti-gp210 / anti-sp100 (variante AMA-negativa)",
            color: "#F59E0B",
          },
        ],
      },
      {
        type: "grid",
        title: "Tratamento",
        items: [
          {
            label: "UDCA (1ª linha)",
            value:
              "Ácido ursodesoxicólico 13–15 mg/kg/dia. Indicado em TODOS os estágios. Melhora colestase, retarda fibrose, melhora sobrevida livre de transplante.",
            highlight: true,
          },
          {
            label: "Ácido obeticólico (2ª linha)",
            value:
              "Agonista FXR. Indicado em respondedores inadequados ao UDCA (FA > 1,67× LSN após 1 ano). Piora prurido.",
            highlight: true,
          },
          {
            label: "Bezafibrato / Fenofibrato",
            value:
              "Dados emergentes. Associado ao UDCA em não respondedores. Bezafibrato 400 mg/dia.",
            highlight: false,
          },
          {
            label: "Prurido: colestiramina",
            value:
              "1ª opção para prurido. Tomar 4h após UDCA (não interfere na absorção). Rifampicina, antagonistas opioides (naltrexona) e sertralina como alternativas.",
            highlight: false,
          },
          {
            label: "Transplante hepático",
            value:
              "Cirrose descompensada, prurido intratável, MELD ≥ 15. Excelente prognóstico pós-transplante.",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "Diferencial CBP × CEP × HAI",
        text: "CBP: Mulher + AMA + ductos pequenos intra-hepáticos + IgM. CEP: Homem + p-ANCA + RCU + ductos grandes intra/extra-hepáticos + colangiografia em 'contas de rosário'. HAI: Mulher + FAN/ASMA + IgG + transaminases >> FA. Síndrome de sobreposição: CBP + HAI (critérios de Paris) → UDCA + imunossupressor.",
      },
    ],
  },

  cep: {
    title: "Colangite Esclerosante Primária (CEP) — Fibrose dos Ductos Grandes",
    blocks: [
      {
        type: "alert",
        color: "#10B981",
        title: "Perfil Clínico Clássico",
        text: "Homem jovem (20–40 anos) + doença inflamatória intestinal (principalmente RCU em 70%) + colestase bioquímica + p-ANCA positivo (inespecífico) + dilatações e estenoses multifocais em colangiografia. SEM terapia farmacológica modificadora de doença aprovada.",
      },
      {
        type: "grid",
        title: "Fisiopatologia e Associações",
        items: [
          {
            label: "Alvo anatômico",
            value:
              "Ductos biliares INTRA e EXTRA-hepáticos (grandes ductos). Aspecto em 'contas de rosário' na colangiografia.",
            highlight: true,
          },
          {
            label: "Mecanismo",
            value:
              "Inflamação + fibrose periductal concêntrica ('pele de cebola') → estenoses multifocais progressivas.",
            highlight: false,
          },
          {
            label: "RCU associada",
            value:
              "70% dos casos. Caracteristicamente: pancolite, pouco sintomática, backwash ileíte. CEP piora após colectomia em alguns casos.",
            highlight: true,
          },
          {
            label: "p-ANCA",
            value:
              "Presente em ~65–80% dos casos. Inespecífico — não é diagnóstico.",
            highlight: false,
          },
          {
            label: "Colangiocarcinoma",
            value:
              "Risco de 10–15% ao longo da vida. Difícil diagnóstico — rastreamento semestral obrigatório.",
            highlight: true,
          },
          {
            label: "Ca colorretal",
            value:
              "Risco aumentado em CEP + RCU. Colonoscopia anual com biópsias.",
            highlight: true,
          },
        ],
      },
      {
        type: "flow",
        title: "Diagnóstico — Exame de Escolha",
        steps: [
          {
            text: "Suspeita: homem jovem + RCU + colestase (FA e GGT elevadas)",
            color: "#10B981",
          },
          {
            text: "Colangiorressonância magnética (CPRM) — exame de ESCOLHA para diagnóstico",
            color: "#10B981",
          },
          {
            text: "Estenoses e dilatações alternadas dos ductos = 'contas de rosário'",
            color: "#F59E0B",
          },
          {
            text: "CPRE reservada para fins TERAPÊUTICOS (dilatação de estenose dominante)",
            color: "#F97316",
          },
          {
            text: "Biópsia: não obrigatória. Fibrose periductal concêntrica ('pele de cebola') em CEP de pequenos ductos",
            color: "#6366F1",
          },
        ],
      },
      {
        type: "grid",
        title: "Tratamento",
        items: [
          {
            label: "Farmacológico",
            value:
              "NÃO HÁ tratamento modificador de doença aprovado. UDCA em doses altas (> 20 mg/kg/dia) foi PREJUDICIAL em estudo (MAYO 2009). Doses padrão sem benefício comprovado.",
            highlight: true,
          },
          {
            label: "Estenose dominante",
            value:
              "Dilatação endoscópica via CPRE ± stent biliar temporário. Risco de colangite bacteriana.",
            highlight: true,
          },
          {
            label: "Colangite bacteriana",
            value:
              "ATB: ciprofloxacino ou cefalosporina de 3ª geração. Frequente nas fases avançadas.",
            highlight: false,
          },
          {
            label: "Prurido",
            value: "Colestiramina, rifampicina, naltrexona, sertralina.",
            highlight: false,
          },
          {
            label: "Transplante hepático",
            value:
              "Única terapia definitiva. Cirrose descompensada, colangite recorrente ou prurido intratável. Recorrência em 20–30% dos enxertos.",
            highlight: true,
          },
          {
            label: "Vigilância",
            value:
              "CPRM + CA 19-9 semestral. Colonoscopia anual. Densitometria óssea.",
            highlight: false,
          },
        ],
      },
      {
        type: "obs",
        title: "CEP de Pequenos Ductos — Variante",
        text: "Colangiografia NORMAL + histologia compatível (fibrose periductal) + colestase bioquímica + DII. Prognóstico MELHOR que a CEP clássica. Risco de colangiocarcinoma menor. Pode progredir para CEP clássica. Diagnóstico exclusivamente pela biópsia hepática.",
      },
      {
        type: "obs",
        title: "Pérola — UDCA na CEP é CONTRAINDICADO em Altas Doses",
        text: "Trial de Mayo (2009): UDCA 28–30 mg/kg/dia na CEP aumentou risco de eventos graves (cirrose, transplante, morte). Resultado oposto ao da CBP. Questão clássica de prova: 'qual a diferença no tratamento de CBP e CEP?' → CBP = UDCA benefício comprovado; CEP = UDCA NÃO recomendado em altas doses.",
      },
    ],
  },

  medicamentosa: {
    title: "Hepatopatia Medicamentosa — DILI (Drug-Induced Liver Injury)",
    blocks: [
      {
        type: "alert",
        color: "#EC4899",
        title: "Mecanismo-Chave: Linha do Tempo",
        text: "O diagnóstico de DILI é de EXCLUSÃO. Base diagnóstica: relação temporal (início da droga → lesão hepática: geralmente 5–90 dias). Pérola: a lesão pode se manifestar até 3 meses APÓS a suspensão da droga (especialmente na colestase induzida).",
      },
      {
        type: "grid",
        title: "Classificação Bioquímica (R-score)",
        items: [
          {
            label: "Hepatocelular",
            value:
              "TGO/TGP > 5× LSN. FA normal ou pouco elevada. R = (ALT/LSN) / (FA/LSN) ≥ 5.",
            highlight: true,
          },
          {
            label: "Colestática",
            value:
              "FA > 2× LSN. Transaminases normais ou pouco elevadas. R ≤ 2.",
            highlight: true,
          },
          {
            label: "Mista",
            value: "Ambas elevadas. 2 < R < 5.",
            highlight: false,
          },
        ],
      },
      {
        type: "grid",
        title: "Classificação Mecanística",
        items: [
          {
            label: "Dose-dependente (intrínseca)",
            value:
              "Previsível, reprodutível, relacionada à dose. Exemplo CLÁSSICO: Paracetamol. Antídoto: N-acetilcisteína.",
            highlight: true,
          },
          {
            label: "Idiossincrásica metabólica",
            value:
              "Imprevisível, rara, latência variável. Isoniazida, halotano, ácido valpróico.",
            highlight: false,
          },
          {
            label: "Idiossincrásica imunológica",
            value:
              "Febre, rash, eosinofilia. Hipersensibilidade. Fenitoína, sulfonamidas, amoxicilina-clavulanato.",
            highlight: false,
          },
        ],
      },
      {
        type: "phases",
        title: "Drogas Clássicas e Padrão de Lesão",
        phases: [
          {
            number: "↑",
            name: "Paracetamol",
            color: "#EF4444",
            items: [
              "Hepatocelular dose-dependente",
              "Dose tóxica adultos: > 7,5–10g (dose única)",
              "Metabólito tóxico: NAPQI → depleta glutationa",
              "Antídoto: N-acetilcisteína IV (máx. eficácia < 8–10h)",
              "Carvão ativado se < 4h da ingestão",
            ],
          },
          {
            number: "↑",
            name: "Isoniazida (RIPE)",
            color: "#F97316",
            items: [
              "Hepatocelular idiossincrásica metabólica",
              "Metabólito: acetil-hidrazina (hepatotóxico)",
              "Acetiladores lentos têm maior risco",
              "Rifampicina potencializa toxicidade",
              "1% desenvolvem hepatite grave",
              "Monitorar TGO/TGP mensalmente",
            ],
          },
          {
            number: "↑",
            name: "Amiodarona",
            color: "#8B5CF6",
            items: [
              "1–3% desenvolvem lesão hepática grave",
              "Padrão: similar à hepatite alcoólica (esteatose + corpo de Mallory)",
              "Fosfolipidose hepática (acúmulo lisossomal)",
              "Elevação discreta de transaminases: comum e benigna",
              "Decisão de suspender é complexa (antiarrítmico insubstituível em alguns casos)",
            ],
          },
          {
            number: "↑",
            name: "Ácido Valpróico",
            color: "#EC4899",
            items: [
              "Crianças < 10 anos: maior risco (defic. mitocondrial subjacente)",
              "Esteatose microvesicular + necrose centrolobular",
              "Mecanismo: inibição β-oxidação mitocondrial",
              "L-carnitina pode reduzir morbimortalidade",
              "Suspender imediatamente se icterícia/encefalopatia",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Conduta Geral na DILI",
        steps: [
          {
            text: "Identificar e SUSPENDER o fármaco suspeito imediatamente",
            color: "#EC4899",
          },
          {
            text: "Paracetamol: N-acetilcisteína IV o mais precoce possível (< 8h = máxima eficácia)",
            color: "#EF4444",
          },
          {
            text: "Descontaminação: carvão ativado se ingestão < 4h (paracetamol/drogas orais)",
            color: "#F97316",
          },
          {
            text: "Monitorizar: TGO, TGP, BT, INR diariamente nas primeiras 48–72h se grave",
            color: "#F59E0B",
          },
          {
            text: "Critérios de Hy's Law (TGO > 3× + BT > 2×): alto risco de falência → UTI/transplante",
            color: "#EF4444",
          },
          {
            text: "Corticosteroides: apenas em DILI com padrão imunológico (eosinofilia, rash)",
            color: "#10B981",
          },
        ],
      },
      {
        type: "obs",
        title: "ACO (Anticoncepcionais Orais) — Efeitos Hepáticos",
        text: "Componente estrogênico → distúrbio da função excretora hepática → colestase intra-hepática. Além disso: adenoma hepático (raro, risco proporcional à duração), trombose de veia hepática (Budd-Chiari), predisposição a litíase biliar. Suspensão geralmente resolve a colestase em 2–3 meses.",
      },
      {
        type: "obs",
        title: "Ley's Law — Critério de Hepatotoxicidade Grave",
        text: "TGO ou TGP > 3× LSN MAIS BT > 2× LSN = combinação de alto risco (mortalidade ~10%). Base do FDA para retirada de drogas do mercado. A elevação isolada de transaminases, sem hiperbilirrubinemia, raramente é fatal (Pérola: elevação adaptativa de transaminases nos primeiros dias de UDCA/estatinas).",
      },
    ],
  },

  hemocromatose: {
    title: "Hemocromatose Hereditária — Sobrecarga de Ferro",
    blocks: [
      {
        type: "alert",
        color: "#8B5CF6",
        title: "Perfil Clínico — Os 6 H's",
        text: "Hiperpigmentação + Hipogonadismo + Hiperglicemia (DM bronzeado) + Hepatomegalia + Hinsuficiência cardíaca + Hartrite. Homem 40–60 anos (mulheres: proteção por perdas menstruais). Gene HFE, mutação C282Y homozigota (mais comum). Tríade clássica: cirrose + DM + hiperpigmentação = 'diabetes bronzeado'.",
      },
      {
        type: "grid",
        title: "Fisiopatologia",
        items: [
          {
            label: "Gene HFE (Cr 6)",
            value:
              "Mutações C282Y (mais penetrante) e H63D. Autossômica recessiva.",
            highlight: true,
          },
          {
            label: "Hepcidina reduzida",
            value:
              "HFE mutado → redução da produção de hepcidina → absorção intestinal excessiva de ferro.",
            highlight: true,
          },
          {
            label: "Acúmulo progressivo",
            value:
              "Ferro depositado como hemosiderina em: fígado (primeiro) → pâncreas → coração → hipófise → articulações.",
            highlight: false,
          },
          {
            label: "Estresse oxidativo",
            value:
              "Ferro livre via reação de Fenton → radicais hidroxila → dano oxidativo tecidual → fibrose.",
            highlight: false,
          },
        ],
      },
      {
        type: "flow",
        title: "Diagnóstico — Sequência",
        steps: [
          {
            text: "Suspeita: Os 6 H's ou investigação de hepatopatia/DM inexplicados",
            color: "#8B5CF6",
          },
          {
            text: "Ferritina sérica e Saturação de Transferrina (IST)",
            color: "#F59E0B",
          },
          {
            text: "IST > 45% (H) / > 40% (M) + Ferritina > 300 ng/mL (H) / > 200 (M) → prosseguir",
            color: "#F97316",
          },
          {
            text: "Teste genético HFE: C282Y homozigoto = diagnóstico confirmado",
            color: "#8B5CF6",
          },
          {
            text: "RM hepática (T2*): quantifica ferro hepático sem biópsia",
            color: "#6366F1",
          },
          {
            text: "Biópsia hepática: reservada para avaliar grau de fibrose se ferritina > 1.000 ng/mL ou transaminases elevadas",
            color: "#EC4899",
          },
        ],
      },
      {
        type: "grid",
        title: "Diagnóstico Laboratorial",
        items: [
          {
            label: "Ferritina > 1,5× LSN",
            value:
              "Triagem. Ferritina > 1.000 ng/mL sugere cirrose estabelecida.",
            highlight: true,
          },
          {
            label: "IST (Saturação de Transferrina)",
            value:
              "Melhor exame de triagem: IST > 45–55% altamente sugestivo. Mais específico que ferritina.",
            highlight: true,
          },
          {
            label: "Ferritina como resposta ao TTO",
            value:
              "Meta do tratamento: ferritina entre 50–100 ng/mL (fase de depleção).",
            highlight: false,
          },
          {
            label: "Teste genético HFE",
            value:
              "Confirma diagnóstico. C282Y/C282Y = maior penetrância. Rastreamento de 1º grau.",
            highlight: true,
          },
        ],
      },
      {
        type: "alert",
        color: "#F97316",
        title: "Tratamento — Flebotomia",
        text: "FLEBOTOMIA TERAPÊUTICA é o tratamento de escolha. Fase de indução: 400–500 mL/semana (remove ~200–250 mg de ferro/sessão). Meta: ferritina 50–100 ng/mL + IST < 30%. Fase de manutenção: 3–4 flebotomias/ano conforme reacúmulo. Atenção: no CHC — flebotomia não reduz risco após cirrose estabelecida.",
      },
      {
        type: "obs",
        title: "Pérola — Transplante NÃO Cura a Hemocromatose",
        text: "Ao contrário da Doença de Wilson (onde o transplante corrige o defeito), na hemocromatose o defeito está na ABSORÇÃO INTESTINAL (HFE expresso no duodeno). O transplante corrige a lesão hepática, mas a absorção excessiva de ferro persiste. Recorrência da sobrecarga no enxerto. Flebotomia deve ser continuada pós-transplante.",
      },
      {
        type: "obs",
        title: "CHC na Hemocromatose — Risco Elevado",
        text: "Cirróticos por hemocromatose têm risco de CHC de ~200× vs. população geral. Rastreamento: US abdominal + AFP a cada 6 meses. ATENÇÃO: flebotomia adequada não elimina o risco de CHC em cirróticos estabelecidos.",
      },
    ],
  },

  wilson: {
    title: "Doença de Wilson — Acúmulo de Cobre",
    blocks: [
      {
        type: "alert",
        color: "#84CC16",
        title: "Perfil Clínico — Jovem com Hepatopatia + Neuropsiquiatria",
        text: "Herança autossômica recessiva. Gene ATP7B (Cr 13). Manifestação antes dos 40 anos — hepatopatia predomina em crianças e adolescentes; neuropsiquiatria em adultos jovens. Achado patognomônico: Anel de Kayser-Fleischer (biomicroscopia de lâmpada de fenda) — presente em quase 100% dos casos neurológicos, mas pode estar ausente nas formas hepáticas puras.",
      },
      {
        type: "grid",
        title: "Fisiopatologia",
        items: [
          {
            label: "Gene ATP7B",
            value:
              "Codifica ATPase transportadora de cobre nos hepatócitos. Mutação → falha na excreção biliar do cobre.",
            highlight: true,
          },
          {
            label: "Ceruloplasmina reduzida",
            value:
              "ATP7B mutado → falha na incorporação de cobre à ceruloplasmina → ↓ ceruloplasmina sérica (< 20 mg/dL).",
            highlight: true,
          },
          {
            label: "Cobre livre elevado",
            value:
              "Cobre não ligado à ceruloplasmina → toxicidade oxidativa → deposita em fígado, SNC, córnea, rins, ossos.",
            highlight: false,
          },
          {
            label: "Cobre urinário elevado",
            value:
              "Cobre em excesso → excreção renal aumentada (> 100 µg/24h).",
            highlight: true,
          },
        ],
      },
      {
        type: "phases",
        title: "Manifestações por Sistema",
        phases: [
          {
            number: "🫀",
            name: "Hepático",
            color: "#84CC16",
            items: [
              "Elevação assintomática de transaminases",
              "Hepatite crônica / cirrose silenciosa",
              "Insuficiência hepática aguda + anemia hemolítica Coombs-negativa (achado CLÁSSICO — liberação maciça de cobre)",
              "BT/FA: razão invertida (FA baixa + BT alta) = pista diagnóstica",
            ],
          },
          {
            number: "🧠",
            name: "Neuropsiquiátrico",
            color: "#F97316",
            items: [
              "Tremor em 'bater de asas' (wing-beating)",
              "Disartria, disfagia, distonia",
              "Rigidez, bradicinesia, ataxia",
              "Personalidade, irritabilidade, depressão, psicose",
              "RM: hipersinal T2 em putâmen bilateral ('face de panda')",
            ],
          },
          {
            number: "👁",
            name: "Ocular",
            color: "#0EA5E9",
            items: [
              "Anel de Kayser-Fleischer: depósito de cobre na membrana de Descemet",
              "Visível à biomicroscopia de lâmpada de fenda (não a olho nu na maioria)",
              "Catarata em 'girassol': rara, assintomática",
              "Presente em ~95% dos casos neurológicos",
            ],
          },
        ],
      },
      {
        type: "flow",
        title: "Diagnóstico — Score de Leipzig",
        steps: [
          {
            text: "Ceruloplasmina sérica < 20 mg/dL (+ 2 pontos)",
            color: "#84CC16",
          },
          {
            text: "Cobre urinário 24h > 100 µg (+ 2 pontos; 40–100 µg = + 1 ponto)",
            color: "#84CC16",
          },
          {
            text: "Anel de Kayser-Fleischer à lâmpada de fenda (+2 pontos)",
            color: "#84CC16",
          },
          {
            text: "Sintomas neurológicos compatíveis (+2 pontos)",
            color: "#F59E0B",
          },
          { text: "Mutação ATP7B (2 alelos): + 4 pontos", color: "#10B981" },
          {
            text: "Score ≥ 4: diagnóstico provável. Score ≥ 4 + biópsia: confirmatório",
            color: "#10B981",
          },
        ],
      },
      {
        type: "grid",
        title: "Tratamento",
        items: [
          {
            label: "Trientina (1ª linha atual)",
            value:
              "Quelante de cobre. Melhor perfil de tolerância que penicilamina. Aumenta excreção urinária de cobre.",
            highlight: true,
          },
          {
            label: "D-Penicilamina",
            value:
              "Quelante eficaz. Risco de piora neurológica transitória no início (paradoxo de Wilson). Efeitos adversos: nefrotoxicidade, citopenias, rash.",
            highlight: false,
          },
          {
            label: "Zinco",
            value:
              "Induz metalotioneína intestinal → reduz absorção de cobre. Usado em manutenção, casos leves ou assintomáticos.",
            highlight: true,
          },
          {
            label: "Restrição dietética",
            value:
              "Evitar: fígado bovino, frutos do mar, nozes, chocolate, cogumelos (ricos em cobre). Papel adjuvante.",
            highlight: false,
          },
          {
            label: "Transplante hepático",
            value:
              "Insuficiência hepática fulminante (cura o defeito metabólico!). Cirrose descompensada refratária.",
            highlight: true,
          },
        ],
      },
      {
        type: "alert",
        color: "#84CC16",
        title: "Wilson Fulminante — Pérola Diagnóstica",
        text: "Insuficiência hepática aguda + anemia hemolítica Coombs-NEGATIVA (mecanismo: hemólise oxidativa por cobre livre) + FA paradoxalmente BAIXA (FA < 40 UI/L em contexto de IH aguda grave) + razão BT/FA > 2 = Wilson fulminante até prova em contrário. Tratamento: transplante de urgência (quelação é insuficiente na fase aguda).",
      },
      {
        type: "obs",
        title: "Wilson × Hemocromatose — Comparação de Banca",
        text: "Wilson: COBRE ↑ (urinário), Ceruloplasmina ↓, gene ATP7B, AR, tto = trientina/penicilamina/zinco, transplante CURA. Hemocromatose: FERRO ↑ (ferritina + IST), gene HFE, AR, tto = flebotomia, transplante NÃO CURA (defeito intestinal persiste). Wilson em jovem + neurop/psiq; Hemocromatose em meia-idade + DM bronzeado.",
      },
    ],
  },
};

export default function InsuficienciaHepatica() {
  const sectionsWithContent = sections.map(s => ({ ...s, content: content[s.id] }));
  return (
    <MedPanelPage
      sections={sectionsWithContent}
      specialty="Clinica"
      title="Insuficiencia Hepatica — Guia Completo"
    />
  );
}
