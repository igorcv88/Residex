import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "tce-inicial",
    name: "TCE · Inicial",
    color: "#6366F1",
    content: {
      title: "Atendimento Inicial ao TCE",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Classificação pela Escala de Coma de Glasgow",
          text: "Leve: ECG 14–15 | Moderado: ECG 9–12 | Grave: ECG ≤8 → intubação orotraqueal imediata. Atenção: ECG 13 é controverso — maioria dos protocolos modernos classifica como moderado.",
        },
        {
          type: "grid",
          title: "D — Disability: Avaliação Pupilar",
          items: [
            { label: "Normal", value: "Isocóricas fotorreagentes — sem sinal focal", highlight: false },
            { label: "Midríase unilateral", value: "Herniação uncal ipsilateral à lesão — III nervo comprimido. Sinal de alarme", highlight: true },
            { label: "Miose bilateral", value: "Lesão pontina (síndrome de Horner central) ou opioides", highlight: false },
            { label: "Anisocoria", value: "'Pépila abre — olha pra lesão': midríase ipsilateral ao hematoma", highlight: true },
            { label: "Paciente intubado", value: "Glasgow: acrescenta +1 no verbal (assume V=1T). Score máximo intubado = 11T", highlight: true },
          ],
        },
        {
          type: "grid",
          title: "Critérios de Imagem no TCE Leve (Canadian CT Head Rule)",
          items: [
            { label: "Moderado / Grave", value: "ECG < 15 → TC sempre indicada", highlight: true },
            { label: "Intoxicação exógena", value: "Exame clínico não confiável → TC", highlight: false },
            { label: "Anticoagulante / antiagregante", value: "Risco de hematoma oculto mesmo com ECG 15", highlight: true },
            { label: "Amnésia retrógrada ≥ 30 min", value: "Indicação de TC no TCE leve", highlight: false },
            { label: "≥ 2 episódios de vômito", value: "Indicação de TC no TCE leve", highlight: false },
            { label: "Alta energia cinética", value: "Atropelamento, queda > 1 m, ejeção de veículo", highlight: false },
            { label: "Mecanismo de alta energia", value: "Cinemática de trauma suspeita → imagem", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "Pérola: Glasgow no Intubado (Banca Clássica)",
          text: "O componente verbal é suprimido pela IOT. A convenção é documentar como 'XTY' (ex: E3V1TM5) e somar +1 ao escore para fins de comparação prognóstica. Bancas frequentemente cobram a diferença entre ECG clínico e ECG corrigido no paciente intubado.",
        },
        {
          type: "flow",
          title: "Abordagem Neurológica no ABCDE",
          steps: [
            { text: "A–C: Via aérea, respiração, circulação — hipotensão e hipóxia são lesão secundária!", color: "#EF4444" },
            { text: "D: ECG, pupilas, lateralização — documentar antes de sedar/intubar", color: "#6366F1" },
            { text: "E: TC de crânio se indicada — complementar ao exame físico", color: "#0EA5E9" },
            { text: "Alvo: SatO2 > 94%, PaO2 > 60, PAS > 90, normocapnia (35–45)", color: "#10B981" },
          ],
        },
      ],
    },
  },
  {
    id: "tce-fisio",
    name: "TCE · Fisiologia",
    color: "#0EA5E9",
    content: {
      title: "Anatomia, Fisiologia e Herniação",
      blocks: [
        {
          type: "grid",
          title: "Camadas Anatômicas e Hematomas Correspondentes",
          items: [
            { label: "Pele / Couro Cabeludo", value: "Hematoma subgaleal — não cruza suturas (neonato: pode ser volumoso)", highlight: false },
            { label: "Gálea Aponeurótica", value: "Hematoma subgaleal", highlight: false },
            { label: "Osso (Calota Craniana)", value: "Hematoma Epidural (entre osso e dura-máter)", highlight: true },
            { label: "Dura-Máter", value: "Hematoma Subdural (entre dura e aracnoide)", highlight: true },
            { label: "Aracnoide", value: "Hemorragia Subaracnóide (HSA) — preenche sulcos corticais", highlight: true },
            { label: "Pia-Máter / Parênquima", value: "Contusão / Hematoma Intraparenquimatoso / LAD", highlight: false },
          ],
        },
        {
          type: "alert",
          color: "#0EA5E9",
          title: "PPC = PAM − PIC",
          text: "Pressão de Perfusão Cerebral normal: 60–70 mmHg. Alvo no TCE grave: PPC ≥ 60 mmHg. PIC normal: < 20 mmHg. Hipertensão intracraniana definida como PIC > 20 mmHg sustentada por ≥ 5 min.",
        },
        {
          type: "grid",
          title: "CO₂ e Vasomotricidade Cerebral",
          items: [
            { label: "Hipercapnia (CO₂ alto)", value: "Vasodilatação cerebral → ↑ FSC → ↑ PIC → piora herniação. EVITAR", highlight: true },
            { label: "Normocapnia (35–45 mmHg)", value: "Alvo padrão no TCE grave (Degrau 0)", highlight: false },
            { label: "Hipocapnia leve (30–35)", value: "Vasoconstricção leve → ↓ PIC. Uso no Degrau 1 — transitório", highlight: true },
            { label: "Hipocapnia profunda (< 30)", value: "Vasoconstricção intensa → isquemia. Somente Degrau 3, raro", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "Doutrina de Monro-Kellie",
          text: "O volume intracraniano é fixo: encéfalo (~80%) + LCR (~10%) + sangue (~10%). Qualquer acréscimo de volume exige redução compensatória de outro componente. Quando os mecanismos se esgotam (compliance mínima), pequenos aumentos de volume causam grandes elevações de PIC — curva exponencial. Base fisiopatológica de toda a terapêutica da HIC.",
        },
        {
          type: "flow",
          title: "Cascata da Herniação Uncal",
          steps: [
            { text: "↑ Volume (hematoma/edema) → ↑ PIC progressiva", color: "#0EA5E9" },
            { text: "Deslocamento rostro-caudal → Herniação do uncus do lobo temporal pelo tentório", color: "#6366F1" },
            { text: "Compressão do III nervo craniano → Midríase ipsilateral (1º sinal)", color: "#F59E0B" },
            { text: "Compressão do trato corticoespinal → Hemiplegia contralateral", color: "#EC4899" },
            { text: "Herniação central → Tríade de Cushing → Parada respiratória → Morte encefálica", color: "#EF4444" },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Tríade de Cushing — Sinal de Alarme Tardio",
          text: "Hipertensão + Bradicardia + Alteração da respiração (irregular / Cheyne-Stokes). Indica herniação iminente. Não espere a tríade completa para agir — é sinal tardio. Tratar como HIC máxima.",
        },
      ],
    },
  },
  {
    id: "tce-hematomas",
    name: "TCE · Hematomas",
    color: "#EC4899",
    content: {
      title: "Hematomas Intracranianos",
      blocks: [
        {
          type: "grid",
          title: "Hematoma Epidural (HED)",
          items: [
            { label: "Vaso comprometido", value: "Artéria meníngea média (ramo da maxilar interna) — sangramento ARTERIAL", highlight: true },
            { label: "Imagem TC", value: "Biconvexa (lenticular) — hiperdensa — RESPEITA suturas cranianas", highlight: true },
            { label: "Intervalo lúcido", value: "Presente em ~30–40% — lucidez após trauma → piora súbita → herniação", highlight: true },
            { label: "Localização", value: "Temporal > parietal > frontal (onde está a a. meníngea média)", highlight: false },
            { label: "Prognóstico", value: "Melhor que subdural se operado a tempo — sem lesão axonal primária subjacente", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "Pérola: HED Respeita Suturas mas não Respeita a Foice",
          text: "O HED é limitado pelas suturas cranianas (aderência dura-osso), formando a imagem biconvexa. Não cruza suturas — diferente do subdural. Pode, porém, cruzar a linha média pelo seio longitudinal superior (raro). Banca cobra diretamente: 'biconvexo respeita sutura, não respeita foice.'",
        },
        {
          type: "grid",
          title: "Hematoma Subdural (HSD)",
          items: [
            { label: "Vaso comprometido", value: "Veias Ponte (bridging veins) — sangramento VENOSO", highlight: true },
            { label: "Agudo (< 3 dias)", value: "Hiperdensa — côncavo-convexo — acompanha convexidade cerebral", highlight: true },
            { label: "Subagudo (3–21 dias)", value: "Isodensa com parênquima — diagnóstico difícil na TC! Obliteração dos sulcos", highlight: true },
            { label: "Crônico (> 21 dias)", value: "Hipodensa — comum em idosos com atrofia cortical após trauma mínimo", highlight: false },
            { label: "Não respeita suturas", value: "Se espalha por toda a convexidade — pode ser bilateral", highlight: false },
            { label: "Veias Ponte", value: "Mais tensas em idosos (atrofia cortical → mais espaço → mais tensão)", highlight: false },
          ],
        },
        {
          type: "grid",
          title: "Hemorragia Subaracnóide Traumática (HSAt)",
          items: [
            { label: "Prevalência", value: "35–65% dos TCE moderados/graves — lesão mais comum no TCE", highlight: false },
            { label: "Imagem", value: "Hiperdensidade preenchendo sulcos corticais / cisternas basais", highlight: true },
            { label: "Tratamento", value: "Suporte clínico — NÃO TRATAR IGUAL HSA ANEURISMÁTICA", highlight: true },
            { label: "Nimodipino", value: "NÃO indicado na HSAt — somente na aneurismática (evidência ausente no trauma)", highlight: true },
          ],
        },
        {
          type: "grid",
          title: "Hematoma Intraparenquimatoso / Contusão Cerebral",
          items: [
            { label: "Prevalência", value: "15–25% dos TCE graves", highlight: false },
            { label: "Mecanismo", value: "Golpe + Contragolpe — lesão no local do impacto E no polo oposto", highlight: true },
            { label: "Localização preferencial", value: "Frontal e temporal (contragolpe) — bordas irregulares do crânio", highlight: false },
            { label: "Imagem", value: "Focos hiperdensas mesclados com edema (aspecto em 'sal e pimenta')", highlight: false },
          ],
        },
        {
          type: "alert",
          color: "#EC4899",
          title: "LAD — Lesão Axonal Difusa",
          text: "TC pode ser NORMAL ou com pequenos focos hemorrágicos difusos. RNM (sequências SWI/FLAIR) é muito superior. Mecanismo: aceleração/desaceleração angular — cisalhamento axonal. Prognóstico ruim — sem cirurgia específica. Atenção: TCE grave com TC 'normal' → pensar em LAD.",
        },
        {
          type: "obs",
          title: "Decisão Cirúrgica nos Hematomas — Limites Clássicos",
          text: "HED: cirurgia se volume > 30 mL OU espessura > 15 mm OU desvio da linha média > 5 mm (BTF Guidelines). HSD agudo: cirurgia se espessura > 10 mm OU desvio > 5 mm OU PIC > 20 mmHg refratária. Instabilidade neurológica ou herniação → cirurgia de emergência independente de critérios de imagem.",
        },
      ],
    },
  },
  {
    id: "tce-hic",
    name: "TCE · HIC",
    color: "#10B981",
    content: {
      title: "Hipertensão Intracraniana — Manejo Escalonado",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Degrau 0 — Medidas Básicas (SEMPRE, em todos os TCE graves)",
          text: "Cabeceira 30° | Cabeça centralizada (retorno venoso) | Remover colar cervical após TC | Evitar hipertermia (T < 37,5°C) | Normoglicemia (70–180) | Normocapnia (35–45) | Normonatremia | Sedação profunda | Evitar aspiração de VA | PAM 80–100 | Fenitoína se afundamento craniano ou sangramento cortical",
        },
        {
          type: "flow",
          title: "Escalonamento Terapêutico da HIC (Brain Trauma Foundation)",
          steps: [
            { text: "DEGRAU 0: Medidas básicas + Monitorização de PIC — sempre o ponto de partida", color: "#10B981" },
            { text: "DEGRAU 1: Osmoterapia (Manitol ou NaCl 20%) + Hipocapnia leve CO₂ 30–35 + Cirurgia se indicada", color: "#0EA5E9" },
            { text: "DEGRAU 2: NaCl 3% (Na 145–155) + Craniectomia de resgate (casos selecionados)", color: "#F59E0B" },
            { text: "DEGRAU 3 (RARO): Coma barbitúrico (Tiopental) + Hipotermia + Hiperventilação agressiva CO₂ < 30", color: "#EF4444" },
          ],
        },
        {
          type: "grid",
          title: "Osmoterapia — Comparativo",
          items: [
            { label: "Manitol 20% (0,25–1 g/kg)", value: "Osmolaridade alvo 300–320 mOsm/L. TEM EFEITO REBOTE — preferir se cirurgia imediata programada", highlight: false },
            { label: "NaCl 20% (0,5–1 mL/kg)", value: "Sódio Rápido — PREFERÍVEL EM CHOCADOS (não piora hipotensão). Sem efeito rebote significativo", highlight: true },
            { label: "NaCl 3% (Degrau 2)", value: "Somente se Na < 160 mEq/L. Alvo: Na 145–155. Controle lento", highlight: false },
            { label: "Restrição", value: "Não usar Manitol + NaCl hipertônico simultaneamente sem monitorização osmolar", highlight: false },
          ],
        },
        {
          type: "grid",
          title: "Indicações de Monitorização de PIC",
          items: [
            { label: "TCE Grave + TC Anormal", value: "Indicação absoluta: ECG ≤ 8 + qualquer alteração tomográfica", highlight: true },
            { label: "TCE Grave + TC Normal", value: "Indicar SE: idade > 40 anos OU PAS < 90 mmHg OU decorticação/descerebração", highlight: true },
            { label: "Cateter Intraventricular", value: "Método padrão-ouro — permite drenagem terapêutica de LCR", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "DECRA Trial (2011) e RESCUEicp Trial (2016) — Craniectomia Descompressiva",
          text: "DECRA (Cooper, NEJM 2011): craniectomia bifrontal precoce reduziu PIC mas aumentou desfechos desfavoráveis (escala GOS). RESCUEicp (Hutchinson, NEJM 2016): craniectomia de resgate (Degrau 2) reduziu mortalidade de 48% → 26%, porém com aumento de sobreviventes em estado vegetativo. Conclusão: craniectomia reservada para refratariedade — não como primeira linha.",
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "CONTRAINDICAÇÃO ABSOLUTA — Degrau 3",
          text: "Coma barbitúrico (Tiopental) é CONTRAINDICADO em pacientes instáveis hemodinamicamente. Causa vasodilatação periférica e depressão miocárdica — risco de colapso cardiovascular. Monitorização de EEG obrigatória para ajuste de dose (burst suppression).",
        },
      ],
    },
  },
  {
    id: "tce-morte",
    name: "TCE · Morte Enc.",
    color: "#F97316",
    content: {
      title: "Morte Encefálica — Diagnóstico e Doação",
      blocks: [
        {
          type: "grid",
          title: "Pré-requisitos Obrigatórios para Iniciar o Protocolo",
          items: [
            { label: "Coma não perceptivo", value: "ECG 3 — ausência de resposta a qualquer estímulo", highlight: true },
            { label: "Causa conhecida e irreversível", value: "Lesão de causa compatível com ME", highlight: true },
            { label: "Temperatura > 35°C", value: "Excluir hipotermia antes do protocolo", highlight: false },
            { label: "SatO₂ > 94% | PAS > 100", value: "Hemodinâmica adequada para o teste de apneia", highlight: false },
            { label: "Sem sedativos / bloqueadores", value: "Encefalopatia H-I: aguardar ≥ 24h | Outras causas: ≥ 6h", highlight: true },
            { label: "Sem distúrbio metabólico", value: "Glicemia, sódio, Ca normalizados antes do protocolo", highlight: false },
          ],
        },
        {
          type: "flow",
          title: "Protocolo de Confirmação de Morte Encefálica (CFM 2173/2017)",
          steps: [
            { text: "2 médicos (pelo menos 1 deve ser neurologista/neurocirurgião/intensivista) com ≥ 1 ano de formado", color: "#F97316" },
            { text: "2 exames clínicos compatíveis com intervalo por faixa etária (adultos: sem intervalo mínimo obrigatório)", color: "#F97316" },
            { text: "Teste de Apneia: desconectar VM + O₂ 6 L/min por cateter traqueal por 10 min, prévia FiO₂ 100%", color: "#EC4899" },
            { text: "POSITIVO se PaCO₂ > 55 mmHg (ou ↑ > 20 do basal) SEM resposta respiratória espontânea", color: "#EF4444" },
            { text: "Exame complementar obrigatório: AngioTC, EEG ou Doppler transcraniano — confirmar ausência de atividade", color: "#6366F1" },
          ],
        },
        {
          type: "obs",
          title: "Resolução CFM 2173/2017 — Intervalos Entre os Exames",
          text: "RN a 30 dias: 24h. 1 mês a 2 anos: 12h. > 2 anos: sem intervalo mínimo definido na resolução (critério institucional). O exame complementar é obrigatório para TODAS as faixas etárias. O número mínimo de médicos examinadores é 2.",
        },
        {
          type: "alert",
          color: "#F97316",
          title: "Comunicação com a Família — Responsabilidade da Captação",
          text: "Quem fala com a família sobre doação de órgãos é a EQUIPE DE CAPTAÇÃO (CIHDOTT/OPO) — NÃO o médico assistente. Isso evita conflito de interesse. O médico assistente mantém todos os cuidados até a retirada dos órgãos.",
        },
        {
          type: "grid",
          title: "Pérolas de Banca — Morte Encefálica",
          items: [
            { label: "Reflexo de retirada", value: "PODE estar PRESENTE na ME — é reflexo medular espinhal, não encefálico. Não invalida o diagnóstico", highlight: true },
            { label: "Sinal de Lázaro", value: "Movimentos reflexos espinhais após desconexão do VM — NÃO invalida ME", highlight: true },
            { label: "Diabetes insipidus", value: "Complicação comum na ME — monitorar Na⁺ e repor Desmopressina ou Vasopressina", highlight: false },
            { label: "EEG", value: "Exame confirmatório — ausência de atividade é confirmatória, mas EEG isolado não diagnostica ME no Brasil", highlight: false },
            { label: "Quem não pode confirmar ME", value: "Médico integrante da equipe de transplante NÃO pode ser um dos dois examinadores", highlight: true },
          ],
        },
      ],
    },
  },
  {
    id: "raqui",
    name: "Trauma Raqui",
    color: "#8B5CF6",
    content: {
      title: "Trauma Raquimedular — Atendimento e Lesões",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Imobilização Cervical — Indicação e Contraindicação",
          text: "Indicado: colar cervical + prancha rígida + coxim lateral. NÃO INDICADO EM TRAUMA PENETRANTE CERVICAL — evidência mostra aumento de mortalidade sem benefício neurológico (não há instabilidade ligamentar — é lesão direta).",
        },
        {
          type: "grid",
          title: "Indicações de Imobilização Cervical",
          items: [
            { label: "Alta energia", value: "Mecanismo de alto impacto cinético (>40 km/h, queda > 3m)", highlight: false },
            { label: "Sintomas neurológicos", value: "Qualquer déficit neurológico — fraqueza, parestesia, plegia", highlight: true },
            { label: "Dor cervical posterior", value: "Linha média posterior — sempre imobilizar mesmo sem imagem", highlight: true },
            { label: "ECG < 15", value: "Paciente não colaborativo — não afastar lesão clinicamente", highlight: false },
            { label: "Intoxicação", value: "Exame clínico não confiável — imobilizar até avaliação", highlight: false },
            { label: "Lesão distratora", value: "Lesão grande em membro que 'esquece' a dor no pescoço", highlight: true },
          ],
        },
        {
          type: "decision",
          title: "Imagem da Coluna Cervical — Escolha do Método",
          decisions: [
            {
              condition: "Radiografia Cervical",
              color: "#8B5CF6",
              actions: [
                "Baixa sensibilidade (< 52%) — só fazer se TC indisponível",
                "Da base do crânio até T1 obrigatório — incluindo junção C7-T1",
                "Melhor incidência: transoral (inclui processo odontoide e C1/C2)",
              ],
            },
            {
              condition: "TC Cervical",
              color: "#0EA5E9",
              actions: [
                "Sensibilidade > 90% para lesões ósseas",
                "Mostra relação com grandes vasos e estruturas adjacentes",
                "Indicada sempre que houver critério de imobilização",
              ],
            },
            {
              condition: "RNM Cervical",
              color: "#10B981",
              actions: [
                "Sensibilidade > 98% para lesão medular e ligamentar",
                "Indicações: suspeita de lesão medular, TC normal + sintomas persistentes, planejamento cirúrgico",
                "Padrão-ouro para lesão de disco, ligamento e medula",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Critérios para Retirada do Colar Cervical",
          items: [
            { label: "Sem indicação de imagem", value: "Critérios NEXUS negativos → pode retirar clinicamente", highlight: false },
            { label: "Imagem normal", value: "TC sem fratura + RNM sem lesão ligamentar/medular", highlight: true },
            { label: "Palpação indolor", value: "Linha média posterior sem dor à palpação ativa", highlight: true },
            { label: "Movimentação ativa", value: "Paciente consegue movimentar pescoço ativamente sem dor", highlight: false },
          ],
        },
        {
          type: "grades",
          title: "Fraturas Vertebrais Importantes",
          organ: "Coluna",
          grades: [
            {
              grade: "Jefferson (C1)",
              color: "#8B5CF6",
              items: [
                "Alta energia compressiva axial (cabeça bate no teto — mergulho em água rasa)",
                "Explosão do anel do atlas em 4 pontos — fratura em burst de C1",
                "Geralmente estável — sem déficit neurológico (canal cervical amplo em C1)",
              ],
            },
            {
              grade: "Odontoide (C2)",
              color: "#EC4899",
              items: [
                "Separação do processo odontoide — separa C1/C2",
                "Tipo I (ápice) — estável | Tipo II (base) — instável, mais comum, maior risco de pseudoartrose | Tipo III (corpo C2) — boa consolidação",
                "Tipo II: cirurgia frequente (parafuso de Anderson ou halo vest em idosos frágeis)",
              ],
            },
            {
              grade: "Lesões Acima de C5",
              color: "#EF4444",
              items: [
                "Insuficiência respiratória — nervo frênico nasce de C3-C4-C5",
                "Tetraplegia completa acima de C5",
                "Ventilação mecânica imediata — IOT de urgência",
              ],
            },
            {
              grade: "Chance (Lombar)",
              color: "#F59E0B",
              items: [
                "Fratura transversa por hiperflexão — cinto de segurança (cintura no abdome)",
                "Fratura em distração — compromete coluna anterior + posterior",
                "Associada a lesão de vasos retroperitoneais e vísceras abdominais em ~40–50% — pedir TC abdominal!",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Síndromes Medulares Incompletas",
          items: [
            { label: "Brown-Séquard", value: "Hemissecção medular (trauma penetrante). Perda motora + propriocepção IPSILATERAL. Perda de dor + temperatura CONTRALATERAL. Melhor prognóstico funcional entre as síndromes", highlight: true },
            { label: "Sd. Medular Central", value: "Mais comum. Hiperextensão em idoso com espondilose. Tetraparesia com MMSS > MMII + retenção urinária. Fraqueza distal predominante nas mãos", highlight: true },
            { label: "Sd. Medular Anterior", value: "Flexão + lesão artéria espinal anterior. Paraplegia + perda de dor/temperatura. PRESERVA propriocepção + tato fino (colunas posteriores poupadas). Pior prognóstico", highlight: false },
            { label: "Sd. Cauda Equina", value: "Lesões abaixo de L1-L2. Incontinência urinária + parestesia de MMII em sela + disfunção erétil. Neurônio motor inferior (flácido). URGÊNCIA CIRÚRGICA — descompressão em < 48h", highlight: true },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Choque Neurogênico — Diferença com Hemorrágico",
          text: "Lesão simpática por trauma cervical/torácico alto (acima de T6). Vasodilatação periférica → HIPOTENSÃO + BRADICARDIA (diferente do hemorrágico que tem taquicardia reflexa). Pele quente e seca. Tratamento: volume + vasopressores (Norepinefrina ou Fenilefrina). Distinguir do choque espinal (flácido + arreflexia temporária — transitório).",
        },
        {
          type: "obs",
          title: "Methylprednisolona no TCM — NASCIS III e Diretrizes Atuais",
          text: "NASCIS III (1997): melhora neurológica discreta com pulsoterapia em < 8h, porém com aumento de pneumonia e sepse. ACS, AANS, CNS e Spine Trauma Study Group removeram a recomendação. Nível de evidência muito baixo — não utilizar rotineiramente. Maioria dos centros de trauma de alto volume não usa mais.",
        },
      ],
    },
  },
  {
    id: "face",
    name: "Trauma de Face",
    color: "#F59E0B",
    content: {
      title: "Trauma de Face — Lesões e Atendimento",
      blocks: [
        {
          type: "grid",
          title: "Mecanismos e Ossos da Face",
          items: [
            { label: "Mecanismos", value: "Agressões | Queda de moto | Automobilístico | Esportivo", highlight: false },
            { label: "Nasal", value: "Osso mais fraturado da face — redução incruenta na maioria dos casos", highlight: true },
            { label: "Zigomático", value: "Segundo mais fraturado — fratura 'malar' frequente", highlight: false },
            { label: "Mandíbula", value: "Côndilo e ramo — fratura de côndilo mais frequente", highlight: false },
            { label: "Órbita", value: "Blow-out — piso da órbita mais comum — diplopia por encarceramento do reto inferior", highlight: true },
            { label: "Maxila", value: "Fraturas de Le Fort — padrão piramidal", highlight: false },
          ],
        },
        {
          type: "alert",
          color: "#F59E0B",
          title: "Prioridade: Via Aérea no Trauma de Face",
          text: "Lesão de partes moles com alteração anatômica → via aérea comprometida. Intubação é mais complexa — SOMENTE se o paciente ABRE A BOCA e SOMENTE se as estruturas são VISÍVEIS. Se não → cricotireoidotomia cirúrgica. Sangramento ativo: controle local com tamponamento.",
        },
        {
          type: "grades",
          title: "Fraturas de Le Fort — Classificação",
          organ: "Maxila",
          grades: [
            {
              grade: "Le Fort I",
              color: "#10B981",
              items: [
                "MAXILA APENAS — separação horizontal no nível do soalho do seio maxilar",
                "Mobilidade apenas do processo alveolar superior ('palato flutuante')",
                "Não envolve órbita nem nasal — padrão mais baixo",
              ],
            },
            {
              grade: "Le Fort II",
              color: "#F59E0B",
              items: [
                "NASAL + MAXILA POUPANDO A ÓRBITA — fratura em pirâmide",
                "Passa pelos ossos nasais, lacrimais e processo maxilar do zigomático",
                "Bloco nasal-maxilar móvel — órbita íntegra",
              ],
            },
            {
              grade: "Le Fort III",
              color: "#EF4444",
              items: [
                "NASAL + MAXILA + ACOMETIMENTO DA ÓRBITA — disjunção craniofacial completa",
                "Toda a face move separada do crânio — o mais grave",
                "Alta associação com TCE, fratura de base de crânio e LAD",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola de Banca — Le Fort",
          text: "Le Fort I = só maxila. Le Fort II = pirâmide nasal-maxilar, POUPA a órbita. Le Fort III = disjunção craniofacial, ACOMETE a órbita. Regra: quanto maior o número, mais alta e mais grave é a fratura. Banca cobra: 'Le Fort II poupa a órbita — Le Fort III acomete a órbita.' Pedir TC de face em qualquer suspeita significativa (RX tem baixa sensibilidade).",
        },
        {
          type: "grid",
          title: "Trauma de Órbita — Pontos Críticos",
          items: [
            { label: "Blow-out", value: "Fratura do piso da órbita — encarceramento do reto inferior → diplopia", highlight: true },
            { label: "Hematoma periorbitário", value: "'Olho de guaxinim' — suspeita de fratura de base de crânio (sinal de Battle = retroauricular)", highlight: true },
            { label: "Diplopia em crianças", value: "URGÊNCIA cirúrgica — encarceramento muscular pode causar isquemia em horas", highlight: true },
            { label: "Osso nasal e órbita", value: "OSSO NASAL NÃO FAZ PARTE DA ÓRBITA — pérola clássica de banca", highlight: true },
            { label: "Tratamento", value: "Prioritário apenas se: alterações oculares + fratura de órbita + pinçamento de nervo + hematoma de septo nasal", highlight: false },
          ],
        },
        {
          type: "grid",
          title: "Fratura de Osso Nasal e Septo",
          items: [
            { label: "Redução", value: "Incruenta na maioria — eletiva após redução do edema (5–10 dias)", highlight: false },
            { label: "Tamponamento", value: "Epistaxe ativa — tamponamento anterior imediato", highlight: false },
            { label: "Hematoma de septo nasal", value: "DRENAR AGORA — risco de necrose avascular da cartilagem septal (isquemia por compressão)", highlight: true },
            { label: "X. Exsanguinantes", value: "Sangram muito — empacotamento com gase + compressão direta. Raramente embolização", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "Neurológico no Trauma de Face — Armadilha das Pupilas",
          text: "Trauma ocular direto PODE alterar as pupilas — anisocoria no trauma de face pode ser por lesão ocular direta (hifema, lesão do esfíncter pupilar), não necessariamente TCE. No D-Disability do ATLS em trauma de face: 'considera o que você está vendo clinicamente' — não interpretar pupilas isoladamente sem correlação com mecanismo e imagem.",
        },
      ],
    },
  },
];

export default function Neurotrauma() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Cirurgia do Trauma"
      title="Neurotrauma — Guia Completo"
    />
  );
}
