import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "coracaozinho",
    name: "Coraçãozinho",
    color: "#EF4444",
    content: {
      title: "Oximetria de Pulso — Cardiopatias Congênitas Críticas",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Conceito — Por que rastrear?",
          text: "Cardiopatias congênitas críticas (CCCs) são aquelas que dependem da perviedade do canal arterial para manter fluxo pulmonar ou sistêmico adequado. Ao fechar o canal nas primeiras horas/dias de vida, o RN entra em colapso circulatório grave — muitas vezes antes mesmo de apresentar cianose visível. O teste detecta queda de saturação pré-ductal (MSD) e pós-ductal (MMII) antes da deterioração clínica.",
        },
        {
          type: "grid",
          title: "Como e Quando Realizar",
          items: [
            {
              label: "COMO",
              value:
                "Oxímetro de pulso pré-ductal (MSD — membros superiores direito) + qualquer membro inferior (pós-ductal). Esperar sinal estável. RN deve estar acordado e tranquilo.",
              highlight: true,
            },
            {
              label: "QUANDO",
              value:
                "Entre 24 e 48 horas de vida em RN ≥ 35 semanas. Não realizar antes de 24h — maior taxa de falsos positivos (canal ainda aberto).",
              highlight: true,
            },
            {
              label: "Local",
              value:
                "Preferencialmente na maternidade, antes da alta hospitalar.",
              highlight: false,
            },
            {
              label: "Base legal",
              value:
                "Portaria GM/MS nº 20/2014 — obrigatório em todo RN ≥ 34 semanas no Brasil.",
              highlight: false,
            },
          ],
        },
        {
          type: "phases",
          title: "Fisiologia Fetal — Os 3 Bypasses",
          phases: [
            {
              number: "1°",
              name: "Ducto Venoso (Ductus Venosus)",
              color: "#0EA5E9",
              items: [
                "Sangue oxigenado da veia umbilical contorna o fígado",
                "Vai direto para a veia cava inferior → Átrio Direito",
                "Protege o fígado de sobrecarga de volume",
              ],
            },
            {
              number: "2°",
              name: "Forame Oval",
              color: "#F59E0B",
              items: [
                "Sangue oxigenado do AD é empurrado para o Átrio Esquerdo",
                "AD → AE → Ventrículo Esquerdo → Aorta Ascendente",
                "Destino: coração, cabeça, pescoço e SUBCLÁVIA DIREITA → MSD → SATURAÇÃO PRÉ-DUCTAL",
              ],
            },
            {
              number: "3°",
              name: "Canal Arterial (Ductus Arteriosus)",
              color: "#EF4444",
              items: [
                "VD → Tronco Pulmonar → 10% vai para o pulmão (apenas para nutrição)",
                "90% vai pelo canal arterial → Aorta Descendente",
                "25% → Resto do corpo → SATURAÇÃO PÓS-DUCTAL",
                "65% → Placenta (para re-oxigenação)",
              ],
            },
          ],
        },
        {
          type: "decision",
          title: "Tipos de CCC — Dependência do Canal",
          decisions: [
            {
              condition: "Fluxo Pulmonar Dependente do Canal",
              color: "#6366F1",
              actions: [
                "Quando o canal fecha, não chega sangue nos pulmões",
                "Ex: atresia pulmonar, estenose pulmonar crítica, tetralogia de Fallot grave",
                "Clínica: insuficiência respiratória que NÃO melhora com O₂ suplementar",
                "Pérola: O₂ não melhora pois o problema é vascular, não pulmonar",
              ],
            },
            {
              condition: "Fluxo Sistêmico Dependente do Canal",
              color: "#EF4444",
              actions: [
                "Quando o canal fecha, não chega sangue para o corpo",
                "Ex: coarctação grave de aorta, síndrome do coração esquerdo hipoplásico",
                "Clínica: pulsos femorais diminuídos, choque circulatório, diferença de sat > 4%",
                "Pérola: sat pós-ductal muito menor que pré-ductal",
              ],
            },
          ],
        },
        {
          type: "grades",
          title: "Interpretação do Resultado — Algoritmo Oficial",
          organ: "SpO₂",
          grades: [
            {
              grade: "NEGATIVO",
              color: "#10B981",
              items: [
                "SpO₂ ≥ 95% em MSD E no MMII",
                "Diferença entre MSD e MMII ≤ 3%",
                "Alta normal — rastreio concluído",
              ],
            },
            {
              grade: "DUVIDOSO",
              color: "#F59E0B",
              items: [
                "SpO₂ 90–94% em qualquer membro OU diferença > 4%",
                "Conduta: Repetir em 1 hora",
                "Se persistir duvidoso → Repetir mais 1 hora",
                "Se mantiver duvidoso na 3ª medida → POSITIVO",
              ],
            },
            {
              grade: "POSITIVO",
              color: "#EF4444",
              items: [
                "SpO₂ < 90% em qualquer membro",
                "OU duvidoso mantido após 2 repetições horárias",
                "Conduta: Avaliação cardiológica IMEDIATA — ecocardiograma urgente",
                "Considerar prostaglandina E1 se CCC confirmada (manter canal aberto)",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Saturação Pós-Ductal Normal ao Nascer",
          text: "Cuidado com a interpretação nas primeiras horas: a saturação fetal normal NÃO é 95–100%. Ao nascimento, a transição cardiopulmonar faz a SpO₂ subir progressivamente. Por isso o teste é feito entre 24–48h — após estabilização da circulação de transição. A sensibilidade do teste para CCCs ducts-dependentes é de ~76% e a especificidade >99% (NEJM 2011, Mahle et al.). A taxa de falsos negativos (CCCs não detectadas) é de ~6–8% — o teste não substitui avaliação clínica.",
        },
      ],
    },
  },

  {
    id: "orelhinha",
    name: "Orelhinha",
    color: "#0EA5E9",
    content: {
      title: "Triagem Auditiva Neonatal Universal",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Regra dos 1-3-6 Meses",
          text: "Todo RN deve ter a triagem auditiva realizada até 1 mês de vida (idealmente antes da alta hospitalar), o diagnóstico audiológico confirmado até 3 meses e a intervenção (aparelho auditivo, implante coclear, reabilitação) iniciada até os 6 meses. O cumprimento dessa janela temporal é determinante para o desenvolvimento normal da linguagem — o cérebro em maturação depende de estímulo sonoro nas janelas críticas do neurodesenvolvimento.",
        },
        {
          type: "decision",
          title: "Qual Exame Usar — Por Risco",
          decisions: [
            {
              condition: "TODO MUNDO — EOA (Emissões Otoacústicas)",
              color: "#10B981",
              actions: [
                "Avalia a função coclear (células ciliadas externas)",
                "Rápido, não invasivo, excelente sensibilidade para perda coclear",
                "Resultado: PASSA ou FALHA",
                "NÃO detecta neuropatia auditiva (lesão retrococlear)",
              ],
            },
            {
              condition:
                "FATORES DE RISCO — PEATE (Potencial Evocado de Tronco)",
              color: "#F59E0B",
              actions: [
                "Avalia a via auditiva neural central (tronco encefálico)",
                "Detecta neuropatia auditiva — que a EOA PERDE",
                "Mais demorado, requer cooperação/sono",
                "Obrigatório nos fatores de risco listados abaixo",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Fatores de Risco — Indicam PEATE Obrigatório",
          items: [
            {
              label: "UTI Neonatal ≥ 5 dias",
              value:
                "Qualquer RN internado em UTI Neonatal por 5 dias ou mais tem risco aumentado de neuropatia auditiva por hipóxia, ototóxicos ou hiperbilirrubinemia.",
              highlight: true,
            },
            {
              label: "Asfixia / EHI",
              value:
                "Encefalopatia hipóxico-isquêmica acomete o nervo auditivo — EOA pode ser normal mesmo com lesão neural.",
              highlight: true,
            },
            {
              label: "STORCH",
              value:
                "Sífilis congênita, Toxoplasmose, Outros (CMV, varicela), Rubéola, Citomegalovírus, Herpes. CMV é a causa infecciosa mais comum de surdez congênita.",
              highlight: false,
            },
            {
              label: "Malformações craniofaciais",
              value:
                "Síndromes com acometimento do ouvido externo/médio/interno — ex: Pierre Robin, Treacher Collins.",
              highlight: false,
            },
            {
              label: "Meningite / Encefalite",
              value:
                "Inflamação pode lesar o nervo auditivo. Rastrear SEMPRE após meningite bacteriana.",
              highlight: false,
            },
            {
              label: "Trauma de base de crânio",
              value: "Pode lesar o osso temporal e as estruturas auditivas.",
              highlight: false,
            },
            {
              label: "História familiar de surdez",
              value:
                "Surdez hereditária não sindrômica (GJB2/Conexina 26) — mais comum. Pesquisar pais e familiares.",
              highlight: false,
            },
          ],
        },
        {
          type: "flow",
          title: "Fluxo da Triagem — Do Teste ao Diagnóstico",
          steps: [
            {
              text: "Realização das EOA (todo RN) ou PEATE (fatores de risco) — idealmente antes da alta",
              color: "#0EA5E9",
            },
            {
              text: "PASSA em ambas as orelhas → alta com orientação — CONCLUÍDO",
              color: "#10B981",
            },
            {
              text: "FALHA em uma ou ambas → repetir na mesma internação (2ª EOA)",
              color: "#F59E0B",
            },
            {
              text: "FALHA na 2ª EOA → encaminhar para avaliação audiológica completa até 3 meses",
              color: "#F97316",
            },
            {
              text: "Diagnóstico audiológico confirmado → intervenção (AASI ou implante coclear) até 6 meses",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "obs",
          title: "Lei 12.303/2010 — Triagem Auditiva Obrigatória no Brasil",
          text: "A triagem auditiva neonatal universal é obrigatória em todo RN nascido em hospitais e maternidades brasileiros (Lei 12.303/2010). A prevalência de surdez congênita é de 1–3 por 1.000 nascidos vivos (surdez profunda) e 6 por 1.000 considerando todas as perdas. Sem detecção precoce, a criança chega ao 2°–3° ano de vida sem diagnóstico — período em que o desenvolvimento da linguagem oral já foi comprometido de forma irreversível.",
        },
      ],
    },
  },

  {
    id: "olhinho",
    name: "Olhinho",
    color: "#10B981",
    content: {
      title: "Reflexo Vermelho — Triagem de Opacidades dos Meios Oculares",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "O Que o Teste Detecta",
          text: "O Teste do Olhinho (Teste do Reflexo Vermelho — TRV) avalia a transparência dos meios oculares (córnea, humor aquoso, cristalino e vítreo). Detecta precocemente condições que causam ambliopia (olho preguiçoso) ou perda visual grave: CATARATA CONGÊNITA (principal indicação), retinoblastoma, glaucoma congênito, retinopatia da prematuridade e vítreo primário hiperplásico persistente. A janela de tratamento eficaz para catarata congênita é CURTA — atraso no diagnóstico impede desenvolvimento visual normal.",
        },
        {
          type: "grid",
          title: "Como Realizar e Quando",
          items: [
            {
              label: "Instrumento",
              value:
                "Oftalmoscópio direto — luz branca — afastamento de ~50 cm do rosto do RN em sala com luz reduzida.",
              highlight: false,
            },
            {
              label: "Idealmente",
              value:
                "Até 7 dias de vida (maternidade). Realizar antes da alta hospitalar sempre que possível.",
              highlight: true,
            },
            {
              label: "Limite máximo",
              value:
                "6 meses de vida (algumas fontes: 1 ano) — porém NÃO substitui avaliação oftalmológica especializada.",
              highlight: true,
            },
            {
              label: "Repetir até",
              value:
                "3 anos de idade (consultas de puericultura) — a cada visita médica.",
              highlight: false,
            },
          ],
        },
        {
          type: "grades",
          title: "Interpretação do Reflexo Vermelho",
          organ: "Resultado",
          grades: [
            {
              grade: "NEGATIVO",
              color: "#10B981",
              items: [
                "Os DOIS olhos com reflexo vermelho/laranja brilhante e simétrico",
                "Normal — meios oculares transparentes",
                "Repetir nas consultas de puericultura até 3 anos",
              ],
            },
            {
              grade: "DUVIDOSO",
              color: "#F59E0B",
              items: [
                "Dúvida se é o mesmo olho ou nenhum olho com reflexo alterado",
                "Reflexo assimétrico em brilho, cor ou tamanho",
                "Conduta: encaminhar para avaliação oftalmológica",
              ],
            },
            {
              grade: "POSITIVO",
              color: "#EF4444",
              items: [
                "Um dos olhos com reflexo ausente, esbranquiçado, amarelado ou opaco (leucocoria)",
                "OU presença de MANCHA BRANCA na pupila",
                "Conduta: encaminhar URGENTE para oftalmologista",
                "Leucocoria = retinoblastoma até prova em contrário — urgência oncológica",
              ],
            },
          ],
        },
        {
          type: "decision",
          title: "Diagnósticos por Tipo de Alteração",
          decisions: [
            {
              condition: "Leucocoria (reflexo branco)",
              color: "#EF4444",
              actions: [
                "Catarata congênita — principal — opacificação do cristalino",
                "Retinoblastoma — URGÊNCIA — tumor maligno intraocular mais comum na infância",
                "Persistência do vítreo primário hiperplásico (PHPV)",
                "Toxocaríase ocular / toxoplasmose",
              ],
            },
            {
              condition: "Reflexo assimétrico / ausente",
              color: "#F59E0B",
              actions: [
                "Glaucoma congênito — córnea turva, fotofobia, epífora",
                "Anisometropia — diferença de refração entre os olhos → ambliopia",
                "Estrabismo — desalinhamento ocular → ambliopia supressiva",
                "Hemangioma periocular extenso",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Catarata Congênita: Janela Cirúrgica",
          text: "A catarata congênita densa unilateral deve ser operada nas primeiras 6–10 semanas de vida e a bilateral até 10 semanas, seguida de correção óptica e oclusão do olho dominante (para forçar o uso do olho amblíope). Cada semana de atraso na cirurgia reduz o prognóstico visual de forma permanente — o córtex visual não amadurece sem estímulo luminoso nessa janela crítica. O Comitê Brasileiro de Oftalmologia Pediátrica recomenda que todo RN com leucocoria seja avaliado em até 24–48h da detecção (Portaria 2.731/2019 inclui o TRV na caderneta de saúde da criança).",
        },
      ],
    },
  },

  {
    id: "pezinho",
    name: "Pézinho",
    color: "#F59E0B",
    content: {
      title: "Triagem Neonatal Bioquímica — Doenças Raras",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Janela Ideal: 48h–5 dias de Vida",
          text: "A coleta antes de 48h de vida gera TSH elevado por estresse fisiológico do nascimento → FALSO POSITIVO para hipotireoidismo. A coleta após 28 dias FALSO NEGATIVO para fenilcetonúria (bebê já em dieta e tratamento parcial). O período ótimo é entre o 3° e 5° dia de vida (48h–5 dias). Aceitável: até 28 dias. EXCEÇÃO: coleta após 28 dias deve ser interpretada com cautela — avaliar criteriosamente.",
        },
        {
          type: "grid",
          title: "Como Coletar — Técnica do Papel Filtro",
          items: [
            {
              label: "Local de punção",
              value:
                "Calcâneo do RN — face lateral ou medial. NUNCA a face posterior (risco de lesão do tendão de Aquiles).",
              highlight: true,
            },
            {
              label: "Instrumento",
              value: "Lanceta de segurança para neonatos (2mm profundidade).",
              highlight: false,
            },
            {
              label: "Técnica",
              value:
                "Puncionar → aguardar formação de gota espontânea → encostar o papel filtro (não esfregar) → preencher 4 círculos homogeneamente (1 gota em cada quadrante).",
              highlight: true,
            },
            {
              label: "Secagem",
              value:
                "Horizontal, temperatura ambiente, protegido da luz e umidade. NUNCA secar ao sol, ventilador ou forno.",
              highlight: false,
            },
            {
              label: "Envio",
              value:
                "Dentro de 2–5 dias após coleta. Acondicionado em envelope de papel (não plástico).",
              highlight: false,
            },
          ],
        },
        {
          type: "phases",
          title: "Doenças Rastreadas — Os 4 Hambúrgueres e as 2 Fitas",
          phases: [
            {
              number: "🩸",
              name: "4 HAMBÚRGUERES (Sangue)",
              color: "#EF4444",
              items: [
                "HEMOGLOBINOPATIAS → Eletroforese de hemoglobina (Hb S, Hb C, Hb D)",
                "HIPERPLASIA ADRENAL CONGÊNITA (HAC) → 17-OH-progesterona",
                "HOMOCISTINÚRIA CLÁSSICA → Metionina",
                "FENILCETONÚRIA (PKU) → Fenilalanina",
              ],
            },
            {
              number: "📄",
              name: "2 FITAS",
              color: "#6366F1",
              items: [
                "FIBROSE CÍSTICA → IRT (Tripsina Imunorreativa)",
                "TOXOPLASMOSE CONGÊNITA → IgM anti-toxoplasma",
              ],
            },
            {
              number: "✅",
              name: "TÔ DE BOA (2 extras — Programa Ampliado)",
              color: "#10B981",
              items: [
                "TOXOPLASMOSE CONGÊNITA → IgM (confirma a fita)",
                "DEFICIÊNCIA DE BIOTINIDASE → Atividade da biotinidase",
              ],
            },
          ],
        },
        {
          type: "grades",
          title: "Doenças Rastreadas — Detalhe por Patologia",
          organ: "Doença",
          grades: [
            {
              grade: "Fenilcetonúria",
              color: "#EF4444",
              items: [
                "Deficiência de fenilalanina hidroxilase → acúmulo de fenilalanina",
                "Marcador: Fenilalanina ↑",
                "Sem tratamento: deficiência intelectual grave, microcefalia, autismo",
                "Tratamento: dieta pobre em fenilalanina + BH4 (sapropterina) em casos responsivos",
              ],
            },
            {
              grade: "Hipotireoidismo",
              color: "#F59E0B",
              items: [
                "Deficiência de hormônio tireoidiano — causa mais comum de hipotireoidismo congênito",
                "Marcador: TSH ↑ (+ T4 livre ↓ na confirmação)",
                "Falso positivo se coleta < 48h (TSH fisiologicamente alto ao nascer)",
                "Tratamento: levotiroxina VO — iniciar até 2 semanas para proteção neurológica",
              ],
            },
            {
              grade: "HAC — Hiperplasia Adrenal Congênita",
              color: "#EC4899",
              items: [
                "Deficiência de 21-hidroxilase (95% dos casos) → bloqueio na síntese de cortisol",
                "Marcador: 17-OH-progesterona ↑",
                "Forma perdedora de sal: crise adrenal com hiponatremia + hipercalemia → óbito",
                "Tratamento: hidrocortisona + fludrocortisona (forma perdedora de sal)",
              ],
            },
            {
              grade: "Hemoglobinopatias",
              color: "#8B5CF6",
              items: [
                "Anemia falciforme (Hb SS), traço falciforme (Hb AS), Hb SC, Hb SD",
                "Marcador: Eletroforese de hemoglobina",
                "Falso negativo se transfusão recente (hemácias do doador mascaram o resultado)",
                "Tratamento: profilaxia com penicilina V, vacinação, hidroxiureia em formas graves",
              ],
            },
            {
              grade: "Fibrose Cística",
              color: "#0EA5E9",
              items: [
                "Mutação do gene CFTR → disfunção de transporte de cloreto",
                "Marcador: IRT (Tripsina Imunorreativa) → confirmar com teste do suor + painel mutações CFTR",
                "Triagem por 2 amostras de IRT (IRT/IRT) ou IRT/DNA",
                "Tratamento: CFTR moduladores (ivacaftor, tezacaftor, elexacaftor) em mutações específicas",
              ],
            },
            {
              grade: "Deficiência de Biotinidase",
              color: "#84CC16",
              items: [
                "Incapacidade de reciclar biotina → deficiência de vitamina B7",
                "Marcador: Atividade da biotinidase",
                "Sem tratamento: convulsões, alopecia, dermatite, surdez, déficit neurológico",
                "Tratamento: biotina VO 5–20mg/dia — prognóstico excelente se tratado precocemente",
              ],
            },
          ],
        },
        {
          type: "decision",
          title: "Falsos Positivos e Falsos Negativos — Pérolas de Banca",
          decisions: [
            {
              condition: "FALSOS POSITIVOS",
              color: "#EF4444",
              actions: [
                "TSH ↑ (hipotireoidismo) → coleta < 48h (pico fisiológico de TSH ao nascimento)",
                "17-OH-progesterona ↑ (HAC) → prematuridade (HAC falsa em RNPT — córtex adrenal imaturo produz mais 17-OHP)",
                "IRT ↑ (FC) → estresse perinatal, qualquer causa de insuficiência pancreática",
              ],
            },
            {
              condition: "FALSOS NEGATIVOS",
              color: "#F59E0B",
              actions: [
                "Fenilcetonúria → coleta muito precoce (< 24h) — fenilalanina ainda não acumulou",
                "Hemoglobinopatias → TRANSFUSÃO DE SANGUE recente — hemácias do doador normal mascaram o resultado",
                "Hipotireoidismo → coleta tardia + levotiroxina já iniciada empiricamente",
              ],
            },
          ],
        },
        {
          type: "flow",
          title: "Protocolo para PREMATUROS — Coletas Múltiplas",
          steps: [
            {
              text: "1ª Coleta: ADMISSÃO NA UTI — antes de qualquer medicação (base individual)",
              color: "#F59E0B",
            },
            {
              text: "2ª Coleta: 56–70h de vida — também por punção periférica (não calcâneo se muito prematuro)",
              color: "#F59E0B",
            },
            {
              text: "3ª Coleta: 28 dias de vida OU NA ALTA (o que ocorrer primeiro)",
              color: "#F97316",
            },
            {
              text: "4ª Coleta: 16 dias após a 3ª coleta (se ainda internado)",
              color: "#F97316",
            },
            {
              text: "5ª Coleta: 120 dias após a 3ª coleta (acompanhamento ambulatorial)",
              color: "#EF4444",
            },
            {
              text: "HEMOTRANSFUNDIDOS: fazer 2 amostras — 1 antes da transfusão + 1 após 90-120 dias",
              color: "#8B5CF6",
            },
          ],
        },
        {
          type: "obs",
          title: "Programa Nacional de Triagem Neonatal (PNTN) — Fases",
          text: "O PNTN foi ampliado em fases. Fase I (1992): hipotireoidismo + fenilcetonúria. Fase II (2001): + hemoglobinopatias + fibrose cística. Fase III (2012): + HAC + deficiência de biotinidase. Fase IV (em expansão): inclui aminoacidopatias, acidemias orgânicas e doenças lisossômicas por espectrometria de massa em tandem (MS/MS) — rastreia até 50 doenças com uma única amostra. A Rede Nacional de Triagem Neonatal (Portaria 822/2001) garante a gratuidade dos testes no SUS. Todos os estados têm laboratório de referência (SRTN).",
        },
      ],
    },
  },

  {
    id: "linguinha",
    name: "Linguinha",
    color: "#8B5CF6",
    content: {
      title: "Avaliação de Anquiloglossia — Freio Lingual",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Protocolo BTAT — Bristol Tongue Assessment Tool",
          text: "O Teste da Linguinha avalia a presença e grau de anquiloglossia (freio lingual curto ou posterior) e seu impacto funcional na amamentação. O instrumento validado utilizado no Brasil é o BTAT (Bristol Tongue Assessment Tool), obrigatório pelo Decreto 9.579/2018. Avalia: aparência da ponta da língua, fixação do freio na gengiva inferior, elevação da língua com boca aberta e extensão da língua com boca aberta — cada item pontuado de 0 a 4 (total 0–16).",
        },
        {
          type: "grid",
          title: "Instrumento — BTAT (Protocolo Bristol)",
          items: [
            {
              label: "Exame físico (obrigatório)",
              value:
                "Protocolo Bristol — 4 domínios avaliados por profissional de saúde capacitado (médico, fonoaudiólogo, enfermeiro ou dentista).",
              highlight: true,
            },
            {
              label: "Aparência da ponta da língua",
              value:
                "0 = bífida/em coração | 1 = pequena entalhe | 2 = aspecto normal",
              highlight: false,
            },
            {
              label: "Fixação do freio na gengiva",
              value:
                "0 = na ponta da crista alveolar | 1 = entre ponta e meio | 2 = no meio | 3 = por trás",
              highlight: false,
            },
            {
              label: "Elevação da língua — boca aberta",
              value:
                "0 = nenhum movimento | 1 = < 25% de elevação | 2 = 25-50% | 3 = 50-75% | 4 = > 75%",
              highlight: false,
            },
            {
              label: "Extensão da língua — boca aberta",
              value:
                "0 = não passa da gengiva inferior | 1 = passa levemente | 2 = até o lábio inferior | 3 = além do lábio",
              highlight: false,
            },
            {
              label: "Interpretação",
              value:
                "Score ≥ 8: improvável restrição significativa | Score 6-7: possível restrição | Score ≤ 5: restrição significativa provável",
              highlight: true,
            },
          ],
        },
        {
          type: "flow",
          title: "Fluxograma de Conduta",
          steps: [
            {
              text: "Exame físico com BTAT — todo RN (obrigatório pelo Decreto 9.579/2018)",
              color: "#8B5CF6",
            },
            {
              text: "Score ≤ 5 (restrição significativa) → avaliar impacto funcional na amamentação",
              color: "#8B5CF6",
            },
            {
              text: "Dificuldade na amamentação confirmada → considerar frenectomia/frenotomia",
              color: "#EC4899",
            },
            {
              text: "SEM dificuldade na amamentação → conduta expectante + suporte de lactação",
              color: "#10B981",
            },
            {
              text: "INDICAÇÃO DE CIRURGIA: score ≤ 5 COM interferência comprovada na amamentação → 0 a 3 pontos no domínio de diagnóstico funcional",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "decision",
          title: "Indicação Cirúrgica — Frenotomia / Frenectomia",
          decisions: [
            {
              condition: "INDICAÇÕES de Frenotomia",
              color: "#8B5CF6",
              actions: [
                "Score BTAT ≤ 5 COM dificuldade comprovada na amamentação",
                "Dor mamilar materna persistente após técnica correta",
                "Ganho de peso insuficiente do lactente por dificuldade de pega",
                "Exaustão materna + risco de desmame precoce não desejado",
              ],
            },
            {
              condition: "NÃO INDICAR baseado apenas em:",
              color: "#374151",
              actions: [
                "Score alterado SEM impacto funcional na amamentação",
                "Queixa isolada de dificuldade para falar (indicação tardia — controverso)",
                "Preferência cosmética",
                "⚠ PÉROLA: Fornecer à família informação de que NÃO existe evidência científica robusta correlacionando anquiloglossia com problemas de fala em longo prazo",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Controvérsias — Base de Evidência",
          text: "A anquiloglossia tem prevalência estimada de 4–16% dos RN. A indicação de frenotomia neonatal é controversa — revisão Cochrane 2017 (O'Shea et al.) encontrou melhora modesta da dor materna mas qualidade de evidência BAIXA a MUITO BAIXA para impacto no aleitamento. A Academia Americana de Pediatria (2020) e a SBP 2021 ressaltam que a decisão deve ser individualizada, multidisciplinar (fonoaudiologia + lactação + cirurgia) e nunca baseada apenas no exame físico. Muitos casos resolvem espontaneamente com suporte de aleitamento e técnica correta de amamentação.",
        },
      ],
    },
  },
];

// ─── render ────────────────────────────────────────────────────────
export default function TriagemNeonatal() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Pediatria"
      title="Triagem Neonatal — Guia Completo"
    />
  );
}
