import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "conceito",
    name: "Conceito",
    color: "#6366F1",
    content: {
      title: "Definição, Classificação e Epidemiologia",
      blocks: [
        {
          type: "phases",
          title: "Classificação Temporal — Marco das 72 Horas",
          phases: [
            {
              number: "EOS",
              name: "Precoce (Early-Onset Sepsis)",
              color: "#EF4444",
              items: [
                "Início nas PRIMEIRAS 72h de vida (alguns consensos: < 7 dias)",
                "Origem: patógenos adquiridos durante o parto ou período perinatal",
                "Apresentação clínica geralmente nas primeiras 24–48h",
                "Principal causa de morbimortalidade neonatal nas primeiras 72h",
                "Diferencial essencial: SDR, taquipneia transitória, HTPP — condições respiratórias presentes AO NASCIMENTO",
              ],
            },
            {
              number: "LOS",
              name: "Tardia (Late-Onset Sepsis)",
              color: "#8B5CF6",
              items: [
                "Início APÓS 72h de vida",
                "Origem: patógenos nosocomiais, comunitários ou do próprio parto",
                "RNPT < 1500g — risco cumulativo de LOS de 21–36%",
                "Gram positivos = 70% dos casos (S. epidermidis o mais frequente em UTI)",
                "Gram negativos = menor frequência, porém MAIOR mortalidade",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Epidemiologia e Impacto",
          items: [
            {
              label: "Incidência EOS (a termo)",
              value:
                "0,5–1 caso por 1.000 nascidos vivos. Mortalidade 2–10% em RN a termo; 30–50% em RNPT < 28 semanas.",
              highlight: true,
            },
            {
              label: "Incidência EOS (prematuro < 34 sem)",
              value:
                "5–10 por 1.000 NV. Incidência inversamente proporcional à idade gestacional — quanto menor, maior o risco.",
              highlight: true,
            },
            {
              label: "LOS em UTI Neonatal",
              value:
                "15–25% dos RNPT < 1500g desenvolve ≥ 1 episódio de LOS durante internação. S. epidermidis (CoNS): 30–50% dos episódios.",
            },
            {
              label: "Mortalidade por Agente",
              value:
                "E. coli: 16%. GBS: 2–6% a termo, 20–30% em prematuros. Gram negativos entéricos: mortalidade 2–4x maior que gram positivos.",
            },
          ],
        },
        {
          type: "obs",
          title:
            "EONS Calculator (Kaiser Permanente) — Ferramenta de Estratificação",
          text: "O Neonatal Early-Onset Sepsis Calculator (Escobar et al., 2014; Pediatrics) combina fatores de risco maternos com sinais clínicos do RN para estimar a probabilidade individual de EOS por GBS ou E. coli. Variáveis: IG ao nascer, status GBS materno, RPM ≥ 18h, temperatura intraparto, tipo de antibiótico profilático e tempo de administração. Estudos de validação em > 600.000 RN demonstraram redução de 60% nas hemoculturas e 50% no uso de antibióticos empíricos sem aumento de sepse não tratada. A AAP 2018 e CDC 2019 referendam seu uso em RN ≥ 35 semanas. Disponível em: neonatalsepsiscalculator.kaiserpermanente.org.",
        },
        {
          type: "alert",
          color: "#6366F1",
          title: "Atenção — Diferencial Clínico nas Primeiras Horas",
          text: "Na EOS precoce (< 6h), o quadro respiratório pode ser IDÊNTICO à SDR por deficiência de surfactante ou taquipneia transitória. A distinção é clínica e laboratorial: sepse se manifesta com instabilidade hemodinâmica, hemograma alterado e evolução atípica para a IG. A regra de ouro: tratar empiricamente até resultado de hemocultura em RN com fatores de risco maternos + apresentação clínica compatível — não aguardar piora para iniciar antibióticos.",
        },
      ],
    },
  },
  {
    id: "precoce",
    name: "Sepse Precoce",
    color: "#EF4444",
    content: {
      title: "Patógenos, Fatores de Risco e Profilaxia GBS",
      blocks: [
        {
          type: "grid",
          title: "Patógenos da Sepse Precoce — Adquiridos do Canal de Parto",
          items: [
            {
              label: "Streptococcus agalactiae (GBS) — Grupo B",
              value:
                "Principal agente de EOS nos RN a TERMO. Coloniza vagina/reto materno em 10–30% das gestantes. Transmissão vertical durante o parto. Sensível à penicilina/ampicilina — NUNCA cefalosporina de 3ª sem confirmar sensibilidade.",
              highlight: true,
            },
            {
              label: "Escherichia coli",
              value:
                "Principal agente de EOS em PREMATUROS (< 34 semanas). Causa mais frequente de meningite neonatal. Cepas produtoras de ESBL emergentes — resistência à ampicilina crescente.",
              highlight: true,
            },
            {
              label: "Listeria monocytogenes",
              value:
                "Bacilo gram positivo intracelular. Transmissão via alimentos (queijos não pasteurizados, embutidos). ÚNICA bactéria da EOS resistente a cefalosporinas de 3ª geração — tratamento: ampicilina + gentamicina.",
              highlight: true,
            },
            {
              label: "STORCH",
              value:
                "Sífilis, Toxoplasma, Rubéola, CMV, HSV/HIV. Causam sepse de aparência viral, com hepatoesplenomegalia, petéquias, adenomegalia. Investigação sorológica específica separada da avaliação bacteriana.",
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Pérola de Prova — Listeria e Cefalosporina",
          text: "A Listeria monocytogenes possui resistência NATURAL a TODAS as cefalosporinas (incluindo cefotaxima e ceftriaxona). O esquema ampicilina + gentamicina cobre GBS, E. coli E Listeria. Se o esquema empírico for apenas cefotaxima + gentamicina, há risco real de Listeria não coberta. Em toda meningite neonatal com gram positivo intracelular: ampicilina OBRIGATÓRIA no esquema.",
        },
        {
          type: "grades",
          title: "Fatores de Risco Maternos para Sepse Precoce",
          organ: "Fator",
          grades: [
            {
              grade: "★",
              color: "#EF4444",
              items: [
                "Rotura prematura de membranas (RPM) ≥ 18 horas — risco aumenta progressivamente com o tempo",
              ],
            },
            {
              grade: "★",
              color: "#EF4444",
              items: [
                "Corioamnionite — diagnóstico: febre materna ≥ 38°C + 2 critérios (taquicardia fetal, taquicardia materna, uterino sensível, líquido fétido, leucocitose > 15.000)",
              ],
            },
            {
              grade: "★",
              color: "#F97316",
              items: [
                "Febre materna ≥ 38°C nas 48h que antecedem o parto (mesmo sem corioamnionite confirmada)",
              ],
            },
            {
              grade: "★",
              color: "#F97316",
              items: [
                "Parto antes de 37 semanas — prematuridade: fator de risco independente de alto impacto",
              ],
            },
            {
              grade: "★",
              color: "#F59E0B",
              items: [
                "ITU materna sem tratamento OU tratada há menos de 72h antes do parto (bacteriúria por GBS = risco máximo)",
              ],
            },
            {
              grade: "★",
              color: "#F59E0B",
              items: [
                "Procedimentos de medicina fetal nas 72h antes do parto (amniocentese, cordocentese)",
              ],
            },
            {
              grade: "★",
              color: "#84CC16",
              items: [
                "Cerclagem uterina — comunicação permanente entre vagina e cavidade uterina",
              ],
            },
          ],
        },
        {
          type: "decision",
          title: "Profilaxia Intraparto do GBS — ACOG 2019 / CDC 2019",
          decisions: [
            {
              condition: "INDICAÇÕES de Profilaxia",
              color: "#10B981",
              actions: [
                "Cultura retal/vaginal POSITIVA para GBS (35–37 semanas)",
                "Bacteriúria por GBS em qualquer IG na gestação atual",
                "Filho anterior com doença invasiva por GBS",
                "Status GBS DESCONHECIDO + prematuridade OU RPM ≥ 18h OU febre ≥ 38°C",
              ],
            },
            {
              condition: "CONTRAINDICAÇÕES / Não indicar",
              color: "#EF4444",
              actions: [
                "Cultura NEGATIVA para GBS nas últimas 5 semanas — DISPENSA profilaxia mesmo com fatores de risco",
                "Cesárea eletiva sem trabalho de parto e sem RPM — mesmo GBS positivo",
                "Cesárea de emergência COM RPM ou trabalho de parto → profilaxia INDICADA",
              ],
            },
          ],
        },
        {
          type: "obs",
          title:
            "Profilaxia GBS — Drogas e Janela de Eficácia (< 4h = Inadequada)",
          text: "Droga de escolha: Penicilina G cristalina 5 milhões UI IV dose de ataque + 2,5 milhões UI IV a cada 4h até o parto. Alternativa: Ampicilina 2g IV ataque + 1g IV a cada 4h. Alérgica com BAIXO risco de anafilaxia: Cefazolina. Alérgica com ALTO risco de anafilaxia: cultura com antibiograma — se sensível à clindamicina: clindamicina; se resistente: vancomicina. PÉROLA CRÍTICA: profilaxia < 4 horas antes do parto = INADEQUADA — o RN deve ser observado 36–48h mesmo sem sinais clínicos. Eficácia máxima após 4h de antibiótico intraparto.",
        },
      ],
    },
  },
  {
    id: "clinica",
    name: "Clínica e Exames",
    color: "#0EA5E9",
    content: {
      title: "Apresentação Clínica e Avaliação Laboratorial",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Apresentação Clínica — Inespecífica é a Regra",
          text: "A sepse neonatal NÃO apresenta os critérios clássicos de SIRS do adulto de forma confiável. O neonato não tem capacidade robusta de resposta febril — hipotermia é sinal de gravidade equivalente. O clínico deve ser sensível a 'o RN não está bem' — qualquer alteração do comportamento basal é sinal de alerta. A instabilidade térmica associada a apneia e hipoatividade = tríade de sepse neonatal clássica de prova.",
        },
        {
          type: "grid",
          title: "Manifestações Clínicas por Sistema",
          items: [
            {
              label: "Instabilidade Térmica",
              value:
                "Hipotermia (< 36,5°C) OU hipertermia (> 37,5°C). Hipotermia é mais frequente em RNPT e é sinal de pior prognóstico — resposta febril imatura.",
              highlight: true,
            },
            {
              label: "Apneia e Bradicardia",
              value:
                "Apneia central de aparecimento súbito após período estável. Bradicardia reflexa acompanhando apneia. No prematuro: descartar apneia da prematuridade — diagnóstico de exclusão.",
              highlight: true,
            },
            {
              label: "Hipoatividade / Letargia",
              value:
                "Hipotonia generalizada, sucção débil, choro fraco ou ausente. Alteração do nível de consciência. Convulsões = sinal de meningite associada.",
            },
            {
              label: "Intolerância Alimentar",
              value:
                "Distensão abdominal, resíduo gástrico bilioso ou hemático, vômitos. Diferencial: ECN (enterocolite necrosante) — frequentemente coexiste com sepse gram negativa.",
            },
            {
              label: "Instabilidade Hemodinâmica",
              value:
                "Palidez, cianose, tempo de enchimento capilar > 3s, hipotensão, taquicardia. Choque séptico no RN = emergência — mortalidade > 50%.",
            },
            {
              label: "Icterícia Precoce/Intensa",
              value:
                "Sepse pode causar icterícia por hemólise e disfunção hepática. Icterícia no RN < 24h + instabilidade = excluir sepse obrigatoriamente.",
            },
          ],
        },
        {
          type: "flow",
          title: "Exames — Prioridade e Sequência",
          steps: [
            {
              text: "1. HEMOCULTURA — PADRÃO-OURO: 2 amostras de sítios diferentes (pelo menos 1 periférica). Volume mínimo: 1 mL por frasco. Colher ANTES dos antibióticos.",
              color: "#0EA5E9",
            },
            {
              text: "2. HEMOGRAMA COMPLETO + DIFERENCIAL: neutropenia/neutrofilia, relação I/T, leucocitose > 25.000 ou leucopenia < 5.000, plaquetopenia.",
              color: "#0EA5E9",
            },
            {
              text: "3. PCR SÉRICO: alto VPN (PCR negativo < 6h afasta parcialmente, mas pode ser falso negativo nas primeiras 6–12h). Repetir com 24–48h.",
              color: "#6366F1",
            },
            {
              text: "4. PROCALCITONINA (PCT): eleva-se antes da PCR (2–4h). Mais específica nas primeiras 6h. PCT > 2 ng/mL + clínica = forte indicação de sepse bacteriana.",
              color: "#6366F1",
            },
            {
              text: "5. GASOMETRIA + LACTATO: acidose metabólica, hiperlactatemia → sepse grave/choque. Base excess < -10 = sinal de alerta.",
              color: "#F59E0B",
            },
            {
              text: "6. LIQUOR (se suspeita meningite): pleocitose (> 20–30 céls/mm³ no RN a termo), proteína > 150 mg/dL, glicose < 30 mg/dL. Gram e cultura.",
              color: "#F59E0B",
            },
            {
              text: "7. PCR EM TEMPO REAL / 16S rRNA: sensibilidade 80–95%, resultado em 6h. Não substitui hemocultura — usado como adjunto.",
              color: "#10B981",
            },
          ],
        },
        {
          type: "grades",
          title:
            "Critérios Hematológicos — Rodwell Modificado (Critérios de Benitz)",
          organ: "Parâmetro",
          grades: [
            {
              grade: "I/T",
              color: "#EF4444",
              items: [
                "Relação Imaturos/Total (I/T) > 0,2 = critério de sepse",
                "Bastões + metamielócitos + mielócitos dividido pelo total de neutrófilos",
                "I/T > 0,3 = fortemente sugestivo de infecção bacteriana grave",
              ],
            },
            {
              grade: "WBC",
              color: "#F97316",
              items: [
                "Leucocitose > 25.000/mm³ nas primeiras 12h OU > 20.000/mm³ após 12h",
                "Leucopenia < 5.000/mm³ — sinal de pior prognóstico em qualquer idade",
              ],
            },
            {
              grade: "PMN",
              color: "#F59E0B",
              items: [
                "Neutropenia absoluta < 1.500/mm³ (a termo) ou < 500/mm³ (prematuro)",
                "Neutrofilia com elevação de formas imaturas (bandemia) = resposta inflamatória aguda",
              ],
            },
            {
              grade: "PLT",
              color: "#84CC16",
              items: [
                "Plaquetopenia < 150.000/mm³ — marcador de gravidade e consumo",
                "< 50.000 → risco de sangramento + CIVD — investigar disfunção multiorgânica",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "PCR — Alto VPN, Baixo VPP nas Primeiras Horas",
          text: "A PCR tem comportamento cinético que limita sua utilidade precoce: eleva-se 6–8h após o início da infecção, com pico em 24–48h. Nas primeiras 6h de sepse, PCR pode ser NORMAL em 40–60% dos casos confirmados — falso negativo real. Entretanto, PCR negativa após 24–48h de evolução tem VPN > 97%, sendo útil para SUSPENDER antibióticos em RN com baixa probabilidade clínica. Procalcitonina (PCT) tem cinética mais favorável: eleva-se em 2–4h, normaliza rapidamente com controle da infecção — excelente marcador de resposta terapêutica. Meta-análise Stocker et al. (BMJ 2017): guia baseada em PCT permite redução segura da duração da antibioticoterapia.",
        },
      ],
    },
  },
  {
    id: "manejo",
    name: "Manejo Clínico",
    color: "#F59E0B",
    content: {
      title: "Algoritmo de Decisão — ≥ 35 Semanas com Risco no Parto",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Algoritmo CDC 2010 / AAP 2018 — RN ≥ 35 Semanas",
          text: "A estratégia atual abandona o tratamento empírico universal para todos os RN com fatores de risco, adotando estratificação individual. Três condições definem a conduta: (1) SEPSE CLÍNICA confirmada → hemoculturas + antibióticos imediatos; (2) Mãe com corioamnionite → hemoculturas + antibióticos imediatos; (3) Fatores de risco SEM clínica → observação clínica seriada 36–48h. A abordagem guiada pelo EONS Calculator reduz intervenções desnecessárias em 50–60% sem comprometer desfechos.",
        },
        {
          type: "decision",
          title: "Três Cenários Clínicos — Conduta Imediata",
          decisions: [
            {
              condition: "SINAIS CLÍNICOS DE DOENÇA",
              color: "#EF4444",
              actions: [
                "Hemoculturas × 2 sítios diferentes",
                "Hemograma + PCR + PCT + gasometria",
                "Liquor se condição clínica permitir",
                "Iniciar AMP + GENTA empírico IMEDIATAMENTE",
                "Não aguardar resultado de exames para iniciar antibióticos",
                "Internação em UTI Neonatal",
              ],
            },
            {
              condition: "MÃE COM FEBRE DURANTE O PARTO",
              color: "#F97316",
              actions: [
                "Hemoculturas × 2 + hemograma",
                "Iniciar AMP + GENTA empírico",
                "Internação para observação + avaliação clínica seriada",
                "Reavaliação com resultado da hemocultura (48–72h)",
                "Se hemocultura negativa + RN assintomático → suspender antibióticos",
              ],
            },
            {
              condition: "PROFILAXIA GBS INADEQUADA (< 4h) SEM CLÍNICA",
              color: "#10B981",
              actions: [
                "Observação clínica seriada 36–48h",
                "NÃO coletar exames rotineiros SEM clínica",
                "Avaliar RN a cada 4–6h (temperatura, FR, FC, tônus, alimentação)",
                "Alta após 36–48h se persistir assintomático",
                "Orientar retorno imediato se qualquer sintoma em casa",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Meningite Neonatal — Abordagem Específica",
          text: "Suspeitar sempre em: sepse com convulsões, fontanela abultada, rigidez de nuca (rara no RN), deterioração neurológica, sepse por E. coli ou GBS (10–30% cursam com meningite). Liquor no RN: valores normais diferentes do adulto — até 30 células (polimorfonucleares ou mononucleares), proteínas até 150 mg/dL, glicose > 30 mg/dL. CONDUTA: cefalosporina de 3ª geração (cefotaxima preferida no neonato — ceftriaxona pode causar colestase e disploca bilirrubina da albumina) ASSOCIADA a ampicilina (para cobrir Listeria). Duração: 14–21 dias na meningite bacteriana.",
        },
        {
          type: "flow",
          title: "Tomada de Decisão — Observação × Tratamento",
          steps: [
            {
              text: "RN ≥ 35 semanas com fator de risco → Avaliar presença de sinais clínicos (apneia, instabilidade térmica, hipoatividade, bradicardia)",
              color: "#F59E0B",
            },
            {
              text: "SINAIS CLÍNICOS PRESENTES → hemoculturas + iniciar AMP + GENTA. Liquor se clinicamente viável.",
              color: "#EF4444",
            },
            {
              text: "MÃE COM FEBRE / CORIOAMNIONITE SEM CLÍNICA → hemoculturas + AMP + GENTA empírico preventivo",
              color: "#F97316",
            },
            {
              text: "PROFILAXIA GBS < 4H OU AUSENTE, RN ASSINTOMÁTICO → Observação seriada 36–48h sem antibióticos",
              color: "#10B981",
            },
            {
              text: "HEMOCULTURA NEGATIVA + RN ASSINTOMÁTICO após 48–72h → SUSPENDER antibióticos → considerar alta supervisionada",
              color: "#84CC16",
            },
            {
              text: "HEMOCULTURA POSITIVA → ajustar antibiótico pelo antibiograma → completar 10–14 dias (bacteremia isolada) ou 14–21 dias (meningite)",
              color: "#6366F1",
            },
          ],
        },
        {
          type: "obs",
          title: "Duração da Antibioticoterapia — Evidências Atuais",
          text: "Bacteremia sem foco sem meningite: 10 dias (maioria dos centros). Bacteremia + melhora clínica rápida + hemocultura negativa em 48h: alguns centros reduzem para 7 dias com evidência crescente de segurança (Cantey et al., Pediatrics 2018). Meningite por GBS: mínimo 14 dias. Meningite por gram negativos: mínimo 21 dias ou 14 dias após última hemocultura positiva (o que for maior). Meningite por Listeria: mínimo 14–21 dias com ampicilina. Ponto crítico de prova: hemocultura negativa isolada NÃO define duração do tratamento — a clínica e o agente responsável determinam.",
        },
      ],
    },
  },
  {
    id: "tardia",
    name: "Sepse Tardia",
    color: "#8B5CF6",
    content: {
      title: "Late-Onset Sepsis — Patógenos, Fatores de Risco e Diagnóstico",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Sepse Tardia — Características Fundamentais",
          text: "Início > 72h de vida. Origem: parto (vertical tardia), nosocomial (mais frequente em UTI neonatal) ou comunitária. RNPT < 1500g são o grupo de maior risco cumulativo. O S. epidermidis (estafilococo coagulase negativo — CoNS) é responsável por 30–50% dos episódios de LOS em UTI neonatal — frequentemente associado a dispositivos intravasculares. Gram negativos menos frequentes, porém causam MAIOR mortalidade e maior morbidade neurológica.",
        },
        {
          type: "decision",
          title: "Perfil de Patógenos — Comunitária × Hospitalar",
          decisions: [
            {
              condition: "SEPSE TARDIA COMUNITÁRIA (De Casa)",
              color: "#8B5CF6",
              actions: [
                "GBS tipo III — mais tardio que tipo Ia/Ib da EOS",
                "Herpes simplex vírus (HSV) — apresentação grave, encefalite",
                "Enterovírus — epidemias sazonais, hepatite fulminante",
                "E. coli e Klebsiella — gram negativos entéricos",
                "Tratamento: AMP + GENTA cobre os principais agentes",
                "Aciclovir se suspeita de HSV (vesículas, encefalite, elevação de transaminases)",
              ],
            },
            {
              condition: "SEPSE TARDIA NOSOCOMIAL (Hospital)",
              color: "#EF4444",
              actions: [
                "CoNS (S. epidermidis) — 1° lugar: associado a CVC e ventilação",
                "Staphylococcus aureus — MRSA em UTI de alto risco",
                "Klebsiella pneumoniae — ESBL crescente em UTI neonatal",
                "Pseudomonas aeruginosa — gram negativo hospitalar grave",
                "Candida spp. — RNPT < 1000g + antibióticos de amplo espectro prolongados",
                "Tratamento: OXA + GENTA (hospitalar) — ajustar conforme epidemiologia local",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Fatores de Risco para Sepse Tardia Nosocomial",
          items: [
            {
              label: "Prematuridade Extrema (< 28 sem)",
              value:
                "Barreira cutânea imatura (estrato córneo ausente nas primeiras semanas), IgG materna insuficiente, imunidade inata deficiente.",
              highlight: true,
            },
            {
              label: "Cateter Venoso Central (CVC)",
              value:
                "Principal fator de risco para CoNS e Candida. Biofilme no cateter. Cada dia de CVC = aumento do risco de sepse associada. Taxa-alvo: < 1 episódio/1.000 dias-cateter.",
              highlight: true,
            },
            {
              label: "Ventilação Mecânica",
              value:
                "Quebra de barreira das vias aéreas. PAVM (pneumonia associada à VM) pode ser ponto de partida de bacteremia. Extubação precoce reduz risco.",
            },
            {
              label: "Nutrição Parenteral Total (NPT)",
              value:
                "Substrato rico para Candida e gram positivos. Cada dia de NPT aumenta risco de candidemia. Progressão enteral precoce = proteção.",
            },
            {
              label: "Antibioticoterapia Prolongada",
              value:
                "Seleção de flora resistente. Inibição da colonização por lactobacillus. Cada dia a mais de antibiótico de amplo espectro = fator de risco para Candida.",
            },
            {
              label: "Contato com Visitantes Doentes",
              value:
                "Transmissão horizontal de vírus respiratórios (RSV, influenza) e bactérias. Higiene das mãos como principal medida de controle de infecção.",
            },
          ],
        },
        {
          type: "obs",
          title: "Candidemia em RNPT < 1000g — Profilaxia com Fluconazol",
          text: "Candida spp. é responsável por 10–15% dos episódios de LOS em RNPT < 1000g, com mortalidade de 30–50% e alta morbidade neurosensorial. A profilaxia com fluconazol 3–6 mg/kg 3x/semana em RNPT < 1000g ou < 27 semanas por 6 semanas reduz a incidência de candidemia em ~60% (Kaufman et al., Pediatrics 2001; confirmado por múltiplas meta-análises). A AAP recomenda em UTI com taxas de candidemia invasiva > 2% em RNPT < 1000g. Importante: fluconazol NÃO cobre C. krusei e C. glabrata — nesses casos, anidulafungina ou micafungina são preferidas.",
        },
        {
          type: "flow",
          title: "Diagnóstico da Sepse Tardia — Sequência",
          steps: [
            {
              text: "1. Anamnese + fatores de risco: IG, dias de internação, dispositivos, antibióticos prévios, espectro da flora local",
              color: "#8B5CF6",
            },
            {
              text: "2. Avaliação clínica completa: temperatura, hemodinâmica, neurológico, abdome (ECN?), pele (lesões por Candida ou HSV?)",
              color: "#8B5CF6",
            },
            {
              text: "3. Exames: hemoculturas × 2 (periférica + cateter se CVC) + hemograma + PCR + PCT + gasometria",
              color: "#6366F1",
            },
            {
              text: "4. Liquor OBRIGATÓRIO se condição clínica permitir — meningite na LOS tem apresentação insidiosa",
              color: "#6366F1",
            },
            {
              text: "5. Se suspeita de Candida: cultura do cateter + fundo de olho + USG abdominal (candidíase hepatoesplênica) + ecocardiograma",
              color: "#F59E0B",
            },
            {
              text: "6. TRATAMENTO EMPÍRICO: baseado na origem (hospitalar × comunitária) + epidemiologia da UTI",
              color: "#10B981",
            },
          ],
        },
      ],
    },
  },
  {
    id: "tratamento",
    name: "Tratamento",
    color: "#10B981",
    content: {
      title: "Antibióticos Empíricos, Ajuste e Duração",
      blocks: [
        {
          type: "decision",
          title: "Esquemas Empíricos por Cenário Clínico",
          decisions: [
            {
              condition: "SEPSE PRECOCE (EOS) — Empírico",
              color: "#10B981",
              actions: [
                "AMP + GENTA — esquema padrão universal",
                "Ampicilina: 50 mg/kg/dose IV (200 mg/kg/dia em meningite)",
                "Gentamicina: 4–5 mg/kg/dose IV a cada 24–36h (estendida em prematuro)",
                "Cobre GBS, E. coli e Listeria — os três principais agentes",
                "NUNCA usar cefotaxima isolada — não cobre Listeria",
              ],
            },
            {
              condition: "SEPSE TARDIA — De Casa (Comunitária)",
              color: "#6366F1",
              actions: [
                "AMP + GENTA — mesmo esquema da EOS",
                "Adicionar aciclovir se suspeita de HSV neonatal",
                "Considerar cobertura entérica ampliada se gram negativo suspeito",
              ],
            },
            {
              condition: "SEPSE TARDIA — Do Hospital (Nosocomial)",
              color: "#F97316",
              actions: [
                "OXA (oxacilina) + GENTA — esquema padrão hospitalar",
                "Oxacilina cobre MSSA e CoNS",
                "MRSA suspeito (UTI de alto risco, falha de oxacilina) → VANCOMICINA",
                "Candida suspeita → Fluconazol ou Anidulafungina",
                "Gram negativo ESBL suspeito → Meropenem",
              ],
            },
            {
              condition: "MENINGITE — Qualquer Origem",
              color: "#EF4444",
              actions: [
                "CEFALOSPORINA DE 3ª GERAÇÃO + AMPICILINA",
                "Cefotaxima (preferida ao ceftriaxona no neonato)",
                "Ampicilina: OBRIGATÓRIA para cobrir Listeria",
                "GBS confirmado: Penicilina G cristalina isolada (estreptococo altamente sensível)",
                "E. coli ESBL: Meropenem",
                "Gram positivo em UTI com MRSA: Vancomicina + Cefotaxima",
              ],
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Ceftriaxona — CONTRAINDICADA no Neonato",
          text: "Ceftriaxona É CONTRAINDICADA em neonatos, especialmente nos primeiros 28 dias. Mecanismos: (1) Desloca bilirrubina da albumina → aumenta BI livre → risco de kernicterus; (2) Liga-se fortemente ao cálcio → precipitação de ceftriaxona-cálcio nos pulmões, rins e vesícula biliar → fatal se infundido com NPT contendo cálcio. A ALTERNATIVA nos neonatos é SEMPRE a cefotaxima — mesma cobertura, sem os riscos. Pérola de prova: 'ceftriaxona na meningite neonatal' = ALTERNATIVA ERRADA.",
        },
        {
          type: "grid",
          title: "Gentamicina Neonatal — Posologia Estendida",
          items: [
            {
              label: "Posologia Extended Interval (EID)",
              value:
                "4–5 mg/kg IV a cada 24h (a termo), 4–5 mg/kg IV a cada 36h (28–34 sem), 4–5 mg/kg IV a cada 48h (< 28 sem). Conceito: exposição bactericida pico-dependente + minimiza nefrotoxicidade.",
              highlight: true,
            },
            {
              label: "Vantagem da EID",
              value:
                "Pico mais alto (efeito bactericida concentração-dependente) + período prolongado sem exposição (menor nefrotoxicidade/ototoxicidade). Meta-análises mostram equivalência terapêutica com menos efeitos adversos.",
              highlight: true,
            },
            {
              label: "Monitorização",
              value:
                "Nível vale (trough) < 1 mcg/mL antes da dose indica clearance adequado. Em anúria/oligúria grave: considerar TDM individualizado.",
            },
            {
              label: "Nefrotoxicidade",
              value:
                "Monitorizar creatinina, débito urinário. Aminoglicosídeos + indometacina/ibuprofeno (fechamento de PCA) = combinação de risco — avaliar intervalo.",
            },
          ],
        },
        {
          type: "grades",
          title: "Duração do Tratamento por Diagnóstico",
          organ: "Diagnóstico",
          grades: [
            {
              grade: "7d",
              color: "#10B981",
              items: [
                "Bacteremia transitória assintomática — hemocultura positiva isolada sem clínica em RN de baixo risco (evidência crescente de segurança)",
              ],
            },
            {
              grade: "10d",
              color: "#84CC16",
              items: [
                "Bacteremia documentada com melhora clínica + hemocultura de controle negativa em 48h — sem meningite",
              ],
            },
            {
              grade: "14d",
              color: "#F59E0B",
              items: [
                "Meningite por GBS ou gram positivo",
                "Bacteremia por Candida (mínimo 14 dias após última hemocultura negativa)",
              ],
            },
            {
              grade: "21d",
              color: "#EF4444",
              items: [
                "Meningite por gram negativo (E. coli, Klebsiella)",
                "Meningite por Listeria",
                "Usar o que for MAIOR: 21 dias OU 14 dias após última hemocultura positiva",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Vancomicina na Sepse Neonatal Nosocomial — Quando e Como",
          text: "Indicações de vancomicina: (1) MRSA suspeito ou confirmado; (2) CoNS em RN com CVC e falha de oxacilina; (3) Enterococcus faecium; (4) sepse hospitalar grave sem melhora em 48–72h de oxacilina. Posologia neonatal baseada em PMA (Idade Pós-Menstrual = IG ao nascer + dias de vida): PMA < 29 sem → 15 mg/kg a cada 24h; 29–35 sem → 15 mg/kg a cada 18h; > 35 sem → 15 mg/kg a cada 12h. Meta-análise VANISH Trial neonatal e guidelines IDSA 2016: TDM (Therapeutic Drug Monitoring) com monitorização de AUC/MIC é preferida ao trough isolado — alvo AUC 400–600 mg·h/L.",
        },
      ],
    },
  },
];

export default function SepseNeonatal() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Pediatria"
      title="Sepse Neonatal — Guia Completo"
    />
  );
}
