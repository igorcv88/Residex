import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "conceito",
    name: "Conceito",
    color: "#6366F1",
    content: {
      title: "Avaliação Clínica e Laboratorial",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Definição",
          text: "Coloração ictérica da pele e mucosas por depósito de bilirrubina nos tecidos. Clinicamente visível quando BT > 5 mg/dL no RN a termo. Ocorre em ~60% dos RN a termo e ~80% dos prematuros na 1ª semana. A bilirrubina indireta é lipossolúvel e potencialmente neurotóxica; a direta é hidrossolúvel e indica colestase — fisiopatologias e condutas completamente distintas.",
        },
        {
          type: "grades",
          title: "Zonas de Kramer — Progressão Cefalocaudal",
          organ: "Progressão",
          grades: [
            {
              grade: "1",
              color: "#10B981",
              items: ["Cabeça e pescoço", "BT estimada: ~5 mg/dL"],
            },
            {
              grade: "2",
              color: "#84CC16",
              items: ["Tronco até umbigo", "BT estimada: ~9 mg/dL"],
            },
            {
              grade: "3",
              color: "#F59E0B",
              items: ["Abaixo do umbigo até joelhos", "BT estimada: ~11 mg/dL"],
            },
            {
              grade: "4",
              color: "#F97316",
              items: [
                "Joelhos até tornozelos e punhos",
                "BT estimada: ~13 mg/dL — ZONA DE ATENÇÃO",
              ],
            },
            {
              grade: "5",
              color: "#EF4444",
              items: [
                "Palmas das mãos e plantas dos pés",
                "BT estimada: > 15 mg/dL — ZONA DE PERIGO",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Zonas 4–5 = Zona de Perigo — Abaixo do Umbigo",
          text: "Icterícia atingindo mãos e pés indica BT potencialmente > 13–15 mg/dL. Indicação de exame laboratorial imediato e decisão de fototerapia pelo nomograma. Importante: as Zonas de Kramer têm alta variabilidade inter-observador e baixa acurácia quantitativa — o exame visual orienta, mas a BTF sanguínea decide.",
        },
        {
          type: "grid",
          title: "Exames Complementares Essenciais",
          items: [
            {
              label: "BTF — Bilirrubina Total e Frações",
              value:
                "Solicitar direta + indireta. Plotar BT pelo nomograma de Bhutani pela IDADE EM HORAS — padrão-ouro para definir conduta.",
              highlight: true,
            },
            {
              label: "Coombs Direto (RN)",
              value:
                "Detecta anticorpos fixados à hemácia do RN. Fortemente positivo → Rh. Negativo ou fracamente positivo → ABO ou esferocitose.",
              highlight: true,
            },
            {
              label: "Coombs Indireto (Mãe)",
              value:
                "Detecta anticorpos livres no soro materno. Anti-D positivo → sensibilização Rh prévia.",
            },
            {
              label: "Hemograma + Reticulócitos",
              value:
                "Hb e Ht baixos + reticulocitose → hemólise ativa. Policitemia (Ht > 65%) também pode causar icterícia indireta.",
            },
            {
              label: "Haptoglobina + LDH",
              value:
                "Haptoglobina baixa e LDH elevado = marcadores de hemólise intravascular ativa.",
            },
            {
              label: "Esfregaço de Sangue Periférico",
              value:
                "Esferócitos → esferocitose / ABO. Corpúsculos de Heinz + bite cells → G6PD. Eritroblastos → doença hemolítica grave.",
            },
          ],
        },
        {
          type: "obs",
          title: "Nomograma de Bhutani (1999) — Base das Diretrizes AAP 2022",
          text: "Plota BTF (mg/dL) pela idade em horas de vida, estratificando em zonas: baixo risco (< P40), intermediário-baixo (P40–75), intermediário-alto (P75–95) e alto risco (> P95). Todo RN ≥ 35 semanas deve ter BTF plotada antes da alta hospitalar. Bhutani et al., Pediatrics 1999 — um dos estudos mais citados em neonatologia. A AAP 2022 revisou os limiares de fototerapia e EST, incorporando fatores de risco neurotóxicos (hemólise, asfixia, prematuridade, sepse) como modificadores do limiar de intervenção.",
        },
      ],
    },
  },
  {
    id: "tipos",
    name: "Tipos",
    color: "#EC4899",
    content: {
      title: "Fisiológica × Patológica × Kernicterus",
      blocks: [
        {
          type: "decision",
          title: "Fisiológica vs Não Fisiológica — Critérios Diagnósticos",
          decisions: [
            {
              condition: "FISIOLÓGICA",
              color: "#10B981",
              actions: [
                "Aparece SOMENTE APÓS 24h de vida",
                "Pico no 3°–4° dia: máx. 12 mg/dL no termo",
                "Resolve em 5–7 dias no RN a termo",
                "Pode persistir até 14 dias no prematuro",
                "BT indireta isolada — BD sempre normal (< 1 mg/dL)",
                "Sem acolia, sem colúria, sem hepatoesplenomegalia",
              ],
            },
            {
              condition: "NÃO FISIOLÓGICA — INVESTIGAR",
              color: "#EF4444",
              actions: [
                "Início < 24h → SEMPRE patológica → investigar hemólise",
                "Ascensão rápida: > 5 mg/dL/dia",
                "BT > 12 mg/dL no termo ou > 10 mg/dL no prematuro",
                "Persistência > 10 dias (termo) ou > 14 dias (prematuro)",
                "BD > 1 mg/dL ou > 20% da BT → colestase neonatal",
                "Associada a colúria, acolia fecal, hepatomegalia",
                "Níveis elevados no nomograma (≥ P95 para a idade em horas)",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Kernicterus — Encefalopatia Bilirrubínica",
          text: "A BI livre (não ligada à albumina) é lipossolúvel e atravessa a BHE. Deposita-se nos gânglios basais (globo pálido), núcleo subtalâmico, cerebelo e tronco encefálico. Fases clínicas: (1) Aguda precoce — hipotonia, sucção débil, choro agudo de alta frequência; (2) Aguda intermediária — hipertonia, opistótono, febre, convulsões; (3) Crônica — paralisia cerebral coreoatetoide, surdez neurossensorial bilateral, paresia do olhar vertical (síndrome de Parinaud). MORTALIDADE ELEVADA na fase aguda grave — a tríade final encefalopatia + sucção débil + histórico de icterícia intensa é clássica de prova.",
        },
        {
          type: "grid",
          title: "Fatores de Risco para Neurotoxicidade",
          items: [
            {
              label: "Prematuridade (< 35 semanas)",
              value:
                "BHE imatura, albumina sérica reduzida, menor capacidade de ligação bilirrubina–albumina.",
              highlight: true,
            },
            {
              label: "Hemólise ativa (Coombs +, G6PD)",
              value:
                "Elevação rápida da BI supera a capacidade de tamponamento da albumina.",
              highlight: true,
            },
            {
              label: "Asfixia perinatal / acidose",
              value:
                "pH baixo → protonação da bilirrubina → maior lipossolubilidade → maior penetração na BHE.",
            },
            {
              label: "Sepse neonatal",
              value:
                "Inflamação sistêmica altera permeabilidade da barreira hematoencefálica.",
            },
            {
              label: "Hipoalbuminemia",
              value:
                "Menos proteína disponível para ligar a bilirrubina livre circulante.",
            },
            {
              label: "Drogas deslocadoras",
              value:
                "Ceftriaxona (contraindicada no neonato), sulfas, furosemida — competem com bilirrubina pela albumina.",
            },
          ],
        },
        {
          type: "obs",
          title:
            "Relação Bilirrubina/Albumina (B/A) — Critério Auxiliar AAP 2022",
          text: "A relação B/A reflete a saturação da albumina e a fração livre de bilirrubina circulante — marcador direto de risco de neurotoxicidade. Valores de corte para indicação de EST: RN ≥ 38 semanas sem hemólise → B/A ≥ 8,0 mg/g; RN ≥ 38 semanas com hemólise ou 35–37 semanas com fatores de risco → B/A ≥ 7,2 mg/g; RN 35–37 semanas sem fatores de risco → B/A ≥ 6,8 mg/g. Utilizar quando a BT está na zona de decisão borderline.",
        },
      ],
    },
  },
  {
    id: "ind-nao-hem",
    name: "Ind. Não Hemol.",
    color: "#0EA5E9",
    content: {
      title: "Icterícia Indireta Não Hemolítica",
      blocks: [
        {
          type: "phases",
          title: "Aleitamento Materno × Leite Materno — Diferenciação Crítica",
          phases: [
            {
              number: "1",
              name: "Icterícia do Aleitamento Materno",
              color: "#0EA5E9",
              items: [
                "Surge nos PRIMEIROS dias (2°–4° dia de vida)",
                "Causa: oferta insuficiente de colostro → privação calórica → ↑ circulação entero-hepática",
                "Perda de peso > 7% na 1ª semana = sinal de alerta de amamentação ineficaz",
                "Mecanismo: menos calorias → menor motilidade intestinal → mais reabsorção de BI",
                "CONDUTA: incentivar amamentação (8–12x/dia), corrigir pega, avaliar suplementação",
              ],
            },
            {
              number: "2",
              name: "Icterícia do Leite Materno",
              color: "#8B5CF6",
              items: [
                "Surge TARDIAMENTE — a partir da 7ª semana de vida",
                "Persiste por semanas a meses (até 3 meses) — icterícia tardia prolongada",
                "Causa: β-glucuronidase e metabólitos do leite inibem UGT1A1 hepática",
                "Mecanismo: β-glucuronidase ↑ desconjugação intestinal → ↑ circulação entero-hepática",
                "Diagnóstico de exclusão: BTF SEMPRE na zona segura do nomograma",
                "CONDUTA: MANTER aleitamento. Interrupção 24–48h confirma (BT cai 2–3 mg/dL)",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#F59E0B",
          title: "Armadilha de Prova — Aleitamento vs Leite Materno",
          text: "Icterícia do ALEITAMENTO: precoce (dias 2–4), causa = falta de leite, tratar com MAIS amamentação. Icterícia do LEITE MATERNO: tardia (após 7 dias), causa = componentes do leite, MANTER amamentação (benefício supera o risco). Ambas são INDIRETAS e NÃO HEMOLÍTICAS. Pérola de prova: banca apresenta RN de 15 dias com icterícia leve, BT indireta na zona de baixo risco, amamentando bem → resposta: icterícia do leite materno, conduta = manter aleitamento.",
        },
        {
          type: "grid",
          title: "Síndrome de Gilbert — Mecanismo e Pérolas",
          items: [
            {
              label: "Base Genética",
              value:
                "Mutação no promotor UGT1A1*28 (repetição TA extra: TA7 em vez de TA6) → deficiência parcial da glucuroniltransferase UGT1A1.",
              highlight: true,
            },
            {
              label: "Resultado Bioquímico — NUNCA BD elevada",
              value:
                "Acúmulo de bilirrubina INDIRETA exclusivamente. O defeito é na CONJUGAÇÃO hepática — a via de excreção da BD está intacta. NUNCA causa hiperbilirubinemia direta.",
              highlight: true,
            },
            {
              label: "Clínica",
              value:
                "Icterícia leve, recorrente e intermitente. Desencadeada por: estresse, jejum, exercício físico intenso, infecções, menstruação.",
            },
            {
              label: "Excreção da BI",
              value:
                "No intestino, BI não conjugada → urobilinogênio (solúvel em água) → excretado na urina. Urobilinogênio urinário positivo.",
            },
            {
              label: "Diagnóstico",
              value:
                "Clínico. BT < 5 mg/dL, fração indireta predominante. Demais exames (TGO, TGP, FA, GGT, hemograma) normais. Exclusão ativa de hemólise.",
            },
            {
              label: "Nomograma",
              value:
                "Sempre plota ABAIXO da curva de baixo risco para a idade. Prognóstico benigno. Sem tratamento necessário.",
            },
          ],
        },
        {
          type: "obs",
          title:
            "Fotoisomerização — Mecanismo da Fototerapia e Relevância no Gilbert",
          text: "A fototerapia converte a bilirrubina IXα (4Z,15Z) em isômeros configuracionais (4Z,15E; 4E,15Z) e estruturais (lumirrubina) que são HIDROSSOLÚVEIS e excretados pela bile e urina SEM conjugação hepática. Por isso, a fototerapia é eficaz mesmo em RN com imaturidade da UGT1A1 (prematuros) e na Síndrome de Gilbert. A fotoisomerização NUNCA produz hiperbilirubinemia direta — essa é uma pegadinha clássica em provas.",
        },
      ],
    },
  },
  {
    id: "ind-hem",
    name: "Ind. Hemolítica",
    color: "#EF4444",
    content: {
      title: "Icterícia Indireta Hemolítica",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Regra Fundamental — Icterícia < 24h de Vida",
          text: "Toda icterícia que aparece nas PRIMEIRAS 24 HORAS de vida é SEMPRE PATOLÓGICA. A principal causa é HEMÓLISE. Solicitar imediatamente: BTF, hemograma completo com reticulócitos, Coombs direto (RN), Coombs indireto (mãe), tipagem ABO/Rh de mãe e RN, esfregaço periférico.",
        },
        {
          type: "decision",
          title: "Incompatibilidade Rh × Incompatibilidade ABO",
          decisions: [
            {
              condition: "Incompatibilidade Rh",
              color: "#EF4444",
              actions: [
                "Mãe Rh negativo (dd) + RN Rh positivo (Dd ou DD)",
                "Coombs Direto RN: FORTEMENTE POSITIVO",
                "Coombs Indireto Mãe: POSITIVO (Anti-D livre no soro materno)",
                "NÃO ocorre na 1ª gestação — exige sensibilização prévia por eritrócitos Rh+",
                "PIORA em gestações sucessivas (resposta anamnésica IgG progressiva)",
                "Formas graves: hidropsia fetal, derrame pleural/ascite, anasarca",
                "Lab: Hb↓, Ht↓, reticulocitose, LDH↑, haptoglobina↓, eritroblastos",
                "PREVENÇÃO: Anti-D (Rh0(D)) 300 mcg IM na 28ª semana + até 72h pós-parto",
              ],
            },
            {
              condition: "Incompatibilidade ABO",
              color: "#F97316",
              actions: [
                "Mãe tipo O + RN tipo A ou B (anticorpo anti-A,B IgG materno natural)",
                "Coombs Direto RN: NEGATIVO ou FRACAMENTE positivo — ARMADILHA CLÁSSICA",
                "OCORRE na 1ª gestação — NÃO precisa de sensibilização prévia",
                "Anticorpos IgG naturais anti-A,B cruzam a placenta livremente",
                "Apenas 4% das gestações incompatíveis resulta em hemólise clínica",
                "Forma geralmente mais branda que Rh (exceções existem)",
                "Esfregaço: microesferócitos (diferencia de incompatibilidade Rh)",
              ],
            },
          ],
        },
        {
          type: "obs",
          title:
            "Armadilha Clássica — Coombs Negativo na Incompatibilidade ABO",
          text: "Na incompatibilidade ABO, o Coombs Direto pode ser NEGATIVO porque os antígenos A e B no eritrócito fetal têm baixa densidade de expressão neonatal, reduzindo a quantidade de IgG fixada à superfície celular abaixo do limiar de detecção. Armadilha clássica de banca: RN ictérico < 24h + mãe tipo O + Coombs Direto NEGATIVO → a resposta correta ainda pode ser incompatibilidade ABO. O esfregaço com microesferócitos, mãe tipo O e ausência de resposta em gestações anteriores fecham o diagnóstico.",
        },
        {
          type: "grid",
          title: "Esferocitose Hereditária",
          items: [
            {
              label: "Fisiopatologia",
              value:
                "Defeito em proteínas do citoesqueleto eritrocitário (ankirina, banda 3, espectrina, proteína 4.2). Hemácias esféricas, menos deformáveis, aprisionadas e destruídas no baço.",
              highlight: true,
            },
            {
              label: "Esfregaço Periférico",
              value:
                "Esferócitos: hemácias redondas, sem palidez central, com coloração mais intensa. Coombs Direto NEGATIVO — diferencia de Rh.",
              highlight: true,
            },
            {
              label: "Clínica",
              value:
                "Espectro amplo: assintomático → anemia grave. No neonato: icterícia grave precoce com risco real de kernicterus. Crise aplástica aguda por Parvovírus B19.",
            },
            {
              label: "Diagnóstico Gold Standard",
              value:
                "Teste EMA-binding (eosin-5'-maleimide) por citometria de fluxo — sensibilidade 93%, especificidade 99%. Substituiu a fragilidade osmótica como padrão.",
            },
            {
              label: "Tratamento Neonatal",
              value:
                "Ácido fólico 1 mg/dia. Fototerapia. Transfusão se icterícia grave ou BT próxima ao nível de EST.",
            },
            {
              label: "Esplenectomia",
              value:
                "Apenas em formas graves com dependência transfusional. Evitar < 6 anos (risco de sepse fulminante). Vacinação obrigatória prévia: pneumococo, meningococo, Haemophilus.",
            },
          ],
        },
        {
          type: "grid",
          title: "Deficiência de G6PD",
          items: [
            {
              label: "Epidemiologia",
              value:
                "Deficiência enzimática MAIS PREVALENTE do mundo (~400 milhões de afetados). Ligada ao X → homens clinicamente afetados. Confere proteção parcial contra Plasmodium falciparum.",
              highlight: true,
            },
            {
              label: "Mecanismo",
              value:
                "G6PD gera NADPH na via das pentoses → NADPH reduz glutationa → protege sulfidrila da Hb contra oxidação. Sem G6PD → Hb oxidada → corpúsculos de Heinz → hemólise.",
              highlight: true,
            },
            {
              label: "Clínica",
              value:
                "MAIORIA assintomática. Icterícia neonatal grave (muito frequente no período neonatal), anemia hemolítica aguda após exposição a gatilho oxidante.",
            },
            {
              label: "Esfregaço",
              value:
                "Corpúsculos de Heinz (Hb oxidada precipitada na membrana). Bite cells (hemácias mordidas pelo baço). SEM esferócitos clássicos — diferencia de esferocitose.",
            },
            {
              label: "Gatilhos — EVITAR",
              value:
                "Primaquina, sulfas (SMX-TMP), nitrofurantoína, dapsona, AAS em doses altas, azul de metileno (TATOL), naftalina, fava (favas), infecções.",
            },
            {
              label: "Tratamento",
              value:
                "PRINCIPAL MEDIDA: evitar fatores desencadeantes. Fototerapia na icterícia neonatal. Transfusão na crise hemolítica grave. Ácido fólico em hemólise crônica.",
            },
          ],
        },
        {
          type: "obs",
          title: "G6PD × Esferocitose — Diferenciação para Prova",
          text: "G6PD: Coombs Direto negativo, esfregaço sem esferócitos (Heinz e bite cells), ligada ao X (meninos), história de exposição a gatilho oxidante, dosagem enzimática eritrocitária confirma. Esferocitose: esferócitos no esfregaço, teste EMA-binding positivo por citometria, história familiar de icterícia recorrente/litíase biliar/esplenectomia, Coombs Direto negativo. Ambas: Coombs NEGATIVO — distingue de incompatibilidade Rh onde o Coombs é fortemente positivo.",
        },
      ],
    },
  },
  {
    id: "direta",
    name: "Direta / Colestase",
    color: "#F59E0B",
    content: {
      title: "Icterícia Direta e Atresia das Vias Biliares",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Colestase Neonatal — Definição e Urgência Diagnóstica",
          text: "Bilirrubina direta > 1 mg/dL OU > 20% da bilirrubina total = COLESTASE NEONATAL. É SEMPRE PATOLÓGICA — não existe colestase fisiológica. Investigação urgente em qualquer RN com icterícia progressiva após 2 semanas + acolia fecal + colúria. O diagnóstico e tratamento precoce da AVBEH é DETERMINANTE do prognóstico cirúrgico — janela de 8 semanas.",
        },
        {
          type: "flow",
          title: "Fluxograma de Investigação da Colestase Neonatal",
          steps: [
            {
              text: "1. Confirmar colestase: BD > 1 mg/dL ou > 20% da BT",
              color: "#F59E0B",
            },
            {
              text: "2. Clínica: icterícia progressiva + acolia fecal + colúria + hepatomegalia firme",
              color: "#F59E0B",
            },
            {
              text: "3. Triagem inicial: GGT, FA, TGO/TGP, albumina, coagulograma, hemograma",
              color: "#F97316",
            },
            {
              text: "4. USG abdominal: Sinal do Cordão Triangular + vesícula biliar < 1,5 cm após jejum 4h",
              color: "#F97316",
            },
            {
              text: "5. Biópsia Hepática Percutânea — MÉTODO DE ESCOLHA para avaliação histológica",
              color: "#EF4444",
            },
            {
              text: "6. Colangiografia Intra-Operatória — PADRÃO-OURO para diagnóstico definitivo",
              color: "#EC4899",
            },
            {
              text: "7. AVBEH confirmada → Portoenterostomia de Kasai idealmente antes da 8ª semana",
              color: "#8B5CF6",
            },
          ],
        },
        {
          type: "grid",
          title: "Atresia de Vias Biliares Extra-Hepáticas (AVBEH)",
          items: [
            {
              label: "Fisiopatologia",
              value:
                "Processo fibro-inflamatório obliterativo progressivo dos ductos biliares extra-hepáticos. Possível gatilho: infecção viral perinatal (CMV, reovírus tipo 3) → resposta imune aberrante.",
              highlight: true,
            },
            {
              label: "Progressão Temporal",
              value:
                "Progressiva A PARTIR DA 2ª SEMANA de vida. Icterícia 'fisiológica' que não regride + acolia = sinal de alerta máximo.",
              highlight: true,
            },
            {
              label: "Tríade Clínica Clássica",
              value:
                "Icterícia colestática progressiva + acolia fecal (fezes brancas/acinzentadas) + colúria (urina cor de chá). Hepatomegalia de consistência firme.",
            },
            {
              label: "USG — Sinal do Cordão Triangular",
              value:
                "Estrutura ecogênica triangular/tubular > 4 mm no hilo hepático, acima da bifurcação portal. Sensibilidade ~73%, especificidade ~98%.",
            },
            {
              label: "Biópsia Hepática (método de escolha)",
              value:
                "Proliferação ductular, fibrose periportal, plugs biliares intraductais. Diferencia AVBEH de hepatite neonatal idiopática (células gigantes).",
            },
            {
              label: "Colangiografia Intra-Op. (padrão-ouro)",
              value:
                "Visualização direta da árvore biliar. Ausência total de fluxo biliar extra-hepático confirma AVBEH. Realizada no mesmo ato cirúrgico que o Kasai se confirmada.",
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Cirurgia de Kasai — Janela Terapêutica Crítica",
          text: "Portoenterostomia de Kasai: ressecção dos ductos biliares obstruídos + anastomose da porta hepatis com alça jejunal em Y de Roux. DEVE ser realizada ANTES da 8ª semana de vida (idealmente < 60 dias). Kasai < 45 dias: restabelecimento do fluxo biliar em 60–70% dos casos (meta-análises). Após 90 dias: resultados muito ruins — fibrose intra-hepática avançada inviabiliza o procedimento. Mesmo após Kasai bem-sucedido, a maioria necessita de transplante hepático na infância ou adolescência.",
        },
        {
          type: "obs",
          title: "Cartão de Fezes Acólicas e Triagem Precoce",
          text: "O cartão colorimétrico de fezes (7 cores, tons 1–3 = acolia) é o principal instrumento de triagem populacionar da AVBEH no Japão e Taiwan, com sensibilidade > 90% e redução comprovada na mediana de tempo até o Kasai. No Brasil, a Portaria MS 2.829/2012 preconiza investigação de colestase neonatal, mas implementação é parcial. Pérola de prova: icterícia que persiste após 14 dias de vida + acolia fecal → AVBEH até prova em contrário — nunca atribuir à icterícia fisiológica prolongada sem exclusão ativa.",
        },
      ],
    },
  },
  {
    id: "fototerapia",
    name: "Fototerapia / TTO",
    color: "#10B981",
    content: {
      title: "Fototerapia, Exsanguinotransfusão e Algoritmo de Conduta",
      blocks: [
        {
          type: "grid",
          title: "Mecanismo da Fototerapia",
          items: [
            {
              label: "Fotoisomerização",
              value:
                "Luz azul (430–490 nm) isomeriza BI IXα (4Z,15Z) → lumirrubina (isômero estrutural) e fotobilirrubina (isômero configuracional 4Z,15E). Processo rápido e reversível.",
              highlight: true,
            },
            {
              label: "Excreção Independente de Conjugação",
              value:
                "Fotoisômeros são HIDROSSOLÚVEIS — excretados pela bile e pela urina SEM UGT1A1. Eficaz mesmo em prematuros e na Síndrome de Gilbert.",
              highlight: true,
            },
            {
              label: "Fototerapia Intensiva",
              value:
                "Irradiância ≥ 30 μW/cm²/nm reduz BT em 1–2 mg/dL/hora nas primeiras horas. Maximizar superfície exposta e minimizar distância da fonte.",
            },
            {
              label: "Bronze Baby Syndrome",
              value:
                "Colestase + fototerapia → pigmento bronze-acinzentado na pele (fotoprodutos da BD). NÃO é contraindicação absoluta — usar quando BT indicar, mesmo com BD elevada.",
            },
            {
              label: "Técnica",
              value:
                "Máxima exposição corporal. Patch ocular obrigatório. Monitorar temperatura e hidratação. Rotação de decúbito a cada 2–3h.",
            },
            {
              label: "Monitorização da BTF",
              value:
                "A cada 4–6h nas primeiras 24h de fototerapia intensiva. Após queda consistente, a cada 8–12h.",
            },
          ],
        },
        {
          type: "decision",
          title: "Quando Suspender a Fototerapia — Por Idade Gestacional",
          decisions: [
            {
              condition: "≥ 38 semanas",
              color: "#10B981",
              actions: [
                "Suspender quando BT < 13–14 mg/dL",
                "BT deve cair ≥ 2 mg/dL do valor que indicou a fototerapia",
                "BTF de controle 24h após suspensão",
                "Sem fatores de risco: limiar mais liberal para suspensão",
              ],
            },
            {
              condition: "35–37 sem + < 5 dias de vida",
              color: "#F59E0B",
              actions: [
                "Critério mais conservador — faixa de maior vulnerabilidade",
                "BT cair abaixo da curva de indicação do nomograma",
                "Considerar fatores: hemólise, asfixia, sepse — agravam o risco",
                "Reavaliação ambulatorial em 24h após alta com fototerapia suspensa",
              ],
            },
            {
              condition: "≤ 35 semanas (prematuro)",
              color: "#EF4444",
              actions: [
                "BT cair 2 mg/dL DO VALOR INICIAL que indicou a fototerapia",
                "Critério mais conservador — maior risco de neurotoxicidade",
                "Monitorização mais frequente (BTF a cada 6h)",
                "Manutenção por mais tempo em muito prematuros (< 28 sem)",
              ],
            },
            {
              condition: "≥ 35 sem + > 5 dias de vida",
              color: "#84CC16",
              actions: [
                "BT < 14 mg/dL como critério de suspensão",
                "Limiar mais liberal em RN mais velho com hemólise resolvida",
                "BTF de controle 24–48h após suspensão",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Exsanguinotransfusão (EST) — Indicações e Técnica",
          text: "INDICAÇÕES: BT no nível de EST pelo nomograma (curva superior da AAP 2022); sinais de kernicterus agudo independente da BT; falha de fototerapia intensiva (BT não reduz ≥ 1–2 mg/dL nas primeiras 4h); relação B/A crítica. SE SINAIS DE KERNICTERUS → exsanguinotransfusão imediata. TÉCNICA: DUPLO VOLUME = 2 × 85 mL/kg ≈ 160–170 mL/kg de sangue reconstituído (CVM + plasma fresco). Remove ~85% das hemácias sensibilizadas e reduz BT em ~50% na primeira troca.",
        },
        {
          type: "flow",
          title: "Algoritmo de Conduta Baseado no Nomograma (AAP 2022)",
          steps: [
            {
              text: "1. Avaliar: IG ao nascer + idade em horas + fatores de risco neurotóxicos + BTF",
              color: "#10B981",
            },
            {
              text: "2. Plotar BTF no Nomograma de Bhutani pela IDADE EM HORAS de vida",
              color: "#10B981",
            },
            {
              text: "3. Zona de BAIXO RISCO: observação clínica + reavaliação ambulatorial precoce (24–48h)",
              color: "#84CC16",
            },
            {
              text: "4. Zona INTERMEDIÁRIA com fatores de risco: BTF seriada + considerar fototerapia preventiva",
              color: "#F59E0B",
            },
            {
              text: "5. BT acima da curva de fototerapia → FOTOTERAPIA INTENSIVA imediata",
              color: "#F97316",
            },
            {
              text: "6. Hemólise ativa + BT subindo → IGIV 0,5–1 g/kg IV (reduz hemólise imuno-mediada ~50%)",
              color: "#8B5CF6",
            },
            {
              text: "7. BT na curva de EST ou SINAIS DE KERNICTERUS → EXSANGUINOTRANSFUSÃO de duplo volume",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "obs",
          title: "IGIV na Hemólise Imuno-Mediada — Cochrane 2018 / AAP 2022",
          text: "Imunoglobulina IV (0,5–1 g/kg em 2–4h) bloqueia receptores Fc dos macrófagos esplênicos e hepáticos → reduz hemólise imuno-mediada na incompatibilidade ABO e Rh. Meta-análise Cochrane (Kumar et al., 2018): IGIV reduz a necessidade de EST em aproximadamente 50% e encurta o tempo de fototerapia. A AAP 2022 recomenda quando a BT se aproxima do nível de EST em RN com doença hemolítica por anticorpos (Coombs positivo). Dose única geralmente suficiente; pode repetir em 12h se hemólise persistente.",
        },
      ],
    },
  },
];

export default function IctericiaNeonatal() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Pediatria"
      title="Ictericia Neonatal — Guia Completo"
    />
  );
}
