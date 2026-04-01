import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "anatomia",
    name: "Anatomia",
    color: "#6366F1",
    content: {
      title: "Anatomia do Abdome",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Limite Superior",
          text: "O abdome se inicia no 4º espaço intercostal — espaço toracoabdominal vai do 4º EIC até o rebordo costal. Lesões nessa transição exigem TC de abdome + pelve + tórax e laparoscopia terapêutica/diagnóstica como padrão-ouro.",
        },
        {
          type: "grid",
          title: "Regiões Abdominais",
          items: [
            {
              label: "Abdome Anterior",
              value:
                "À frente da linha axilar anterior. Inclui reto abdominal (xifoide → púbis). Região de maior relevância em trauma penetrante por parede anterior.",
              highlight: false,
            },
            {
              label: "Flanco",
              value:
                "Entre linha axilar anterior e posterior (bilateral). Abordagem específica em trauma penetrante — NUNCA exploração digital.",
              highlight: true,
            },
            {
              label: "Dorso",
              value:
                "Posterior à linha axilar posterior. NUNCA exploração digital. Conduta guiada por TC e achados clínicos.",
              highlight: true,
            },
            {
              label: "Transição Toracoabdominal",
              value:
                "4º EIC → Rebordo costal. Oculta lesões diafragmáticas. FAST e radiografia insuficientes — TC + Laparoscopia obrigatórias.",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola para Residência",
          text: "O dorso e o flanco NÃO são explorados digitalmente em nenhuma circunstância. A exploração digital é permitida APENAS na parede anterior, e mesmo assim como parte de avaliação seriada em paciente estável — e não substitui TC ou laparoscopia.",
        },
      ],
    },
  },
  {
    id: "atendimento",
    name: "Atendimento Inicial",
    color: "#EC4899",
    content: {
      title: "Atendimento Inicial ao Trauma Abdominal",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Princípio Central",
          text: "QUEM DETERMINA A CONDUTA É A HEMODINÂMICA DO PACIENTE. Não existe Tratamento Não Operatório (TNO) em paciente instável. Todo algoritmo de trauma abdominal começa com essa bifurcação.",
        },
        {
          type: "flow",
          title: "C — Circulação no ABCDE",
          steps: [
            { text: "Localizar sangramento", color: "#EC4899" },
            { text: "FAST / E-FAST imediato", color: "#EC4899" },
            {
              text: "Instável + FAST+ → Laparotomia exploradora",
              color: "#EF4444",
            },
            {
              text: "Instável + FAST- → Repetir FAST / buscar outra causa",
              color: "#F59E0B",
            },
            {
              text: "Estável → TC com contraste + algoritmo específico",
              color: "#10B981",
            },
          ],
        },
        {
          type: "grid",
          title: "Objetivos Cirúrgicos Fundamentais",
          items: [
            {
              label: "1. Parar Sangramento",
              value:
                "Prioridade absoluta. Damage control se instável. Identificar fonte: lesão de órgão sólido, vascular, retroperitônio.",
              highlight: true,
            },
            {
              label: "2. Parar Contaminação",
              value:
                "Alças rompidas → peritonite por E. coli, anaeróbios. Fechamento provisório das alças sem reconstrução em damage control.",
              highlight: false,
            },
            {
              label: "3. Damage Control Surgery",
              value:
                "Cirurgia curta para conter danos. Retorno à cirurgia definitiva em 24-48h com hemodinâmica estabilizada em UTI.",
              highlight: false,
            },
            {
              label: "4. Ressuscitação",
              value:
                "Hemostática com hipotensão permissiva (PA sistólica 80-90mmHg até controle cirúrgico). Evitar cristaloide em excesso.",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Hipotensão Permissiva — Base Científica",
          text: "Bickell et al. (NEJM 1994): ressuscitação agressiva pré-hospitalar com cristaloide em trauma penetrante aumentou mortalidade. A hipotensão permissiva (MAP 50mmHg, sistólica 80-90) é padrão em trauma penetrante até controle cirúrgico. Em TCE associado, manter PAM ≥80mmHg. Razão hemácias:PFC:plaquetas = 1:1:1 (protocolo de transfusão maciça).",
        },
      ],
    },
  },
  {
    id: "imagem",
    name: "Exames de Imagem",
    color: "#0EA5E9",
    content: {
      title: "Exames de Imagem no Trauma Abdominal",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "FAST — Ponto Crítico",
          text: "O FAST responde SIM ou NÃO — há líquido livre? NÃO informa ONDE está sangrando nem QUANTO. É ferramenta de triagem, não diagnóstico. FAST negativo em paciente instável não exclui lesão — REPETIR.",
        },
        {
          type: "grid",
          title: "Janelas do FAST",
          items: [
            {
              label: "Hepatorrenal (Morrison)",
              value:
                "Principal janela. Acúmulo preferencial de líquido. Mais sensível em trauma hepático e renal direito.",
              highlight: true,
            },
            {
              label: "Subxifoide (Pericárdica)",
              value:
                "Tamponamento cardíaco. Hemopericárdio. Fundamental no trauma toracoabdominal.",
              highlight: false,
            },
            {
              label: "Esplenorrenal",
              value:
                "Trauma esplênico e renal esquerdo. Menos sensível que janela de Morrison por presença de gordura retroperitoneal.",
              highlight: false,
            },
            {
              label: "Pélvica (Douglas)",
              value:
                "Detecta líquido que migrou para cavidade pélvica. Útil em lesões de bexiga intraperitoneal e alças.",
              highlight: false,
            },
            {
              label: "E-FAST (+ Pulmonar)",
              value:
                "Adiciona avaliação de pneumotórax e hemotórax. Sinal da 'linha pleural deslizante' presente = ausência de pneumotórax. Padrão atual em trauma maior.",
              highlight: true,
            },
          ],
        },
        {
          type: "phases",
          title: "TC Abdome e Pelve — SEMPRE COM CONTRASTE",
          phases: [
            {
              number: "1",
              name: "Sem Contraste",
              color: "#6366F1",
              items: [
                "Lesões ósseas",
                "Cálculos urinários",
                "Hematomas hiperdemos frescos",
              ],
            },
            {
              number: "2",
              name: "Arterial (25-30s)",
              color: "#EF4444",
              items: [
                "Grandes vasos (aorta, VCI)",
                "Lesões vasculares ativas",
                "Blush arterial = sangramento ativo",
              ],
            },
            {
              number: "3",
              name: "Portal (60-70s)",
              color: "#F59E0B",
              items: [
                "Parênquima hepático e esplênico",
                "Perfusão de alças intestinais",
                "Fase de maior acurácia para órgãos sólidos",
              ],
            },
            {
              number: "4",
              name: "Excretora (3-5min)",
              color: "#10B981",
              items: [
                "Cálice renal e ureter",
                "Lesões retroperitoneais",
                "Extravasamento urinário",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Arteriografia",
          items: [
            {
              label: "Indicação",
              value:
                "Paciente ESTÁVEL, indicado após TC demonstrar blush arterial (extravasamento de contraste em fase arterial = sangramento ativo identificável).",
              highlight: false,
            },
            {
              label: "Vantagem",
              value:
                "Identifica exatamente o ponto de sangramento E direciona o tratamento com embolização — TNO mais eficaz que laparotomia em lesões específicas.",
              highlight: true,
            },
            {
              label: "Embolização (TNO)",
              value:
                "Sangramento arterial ativo em órgão sólido (fígado, baço, rim) em paciente estável. Evita laparotomia. Taxa de sucesso >85% no trauma hepático e esplênico.",
              highlight: true,
            },
            {
              label: "Limitação",
              value:
                "Sangramento venoso não é tratável por arteriografia. Lesão de víscera oca, alças, diafragma — arteriografia inútil nestas situações.",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Blush Arterial — O que significa na TC",
          text: "Extravasamento ativo de contraste na fase arterial (hiperdensidade dentro do hematoma ou na cavidade) indica sangramento arterial ativo. É indicação de arteriografia + embolização em paciente estável OU laparotomia imediata em instável. NÃO confundir com pseudoaneurisma (aparece nas fases tardias com wash-out característico).",
        },
      ],
    },
  },
  {
    id: "damage",
    name: "Damage Control",
    color: "#F59E0B",
    content: {
      title: "Damage Control Surgery",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Conceito Fundamental",
          text: "Damage Control é a estratégia de abreviar a cirurgia inicial para sobrevivência imediata, diferindo o reparo definitivo para quando o paciente tolera fisiologicamente. O objetivo não é curar — é não matar.",
        },
        {
          type: "flow",
          title: "Tríade Letal (Indicação de Damage Control)",
          steps: [
            { text: "Hipotermia (< 35°C)", color: "#EF4444" },
            { text: "Acidose (pH < 7,2 / lactato > 5)", color: "#EF4444" },
            {
              text: "Coagulopatia (INR > 1,5 / fibrinogênio < 150)",
              color: "#EF4444",
            },
            { text: "Qualquer combinação = Damage Control", color: "#F59E0B" },
          ],
        },
        {
          type: "grid",
          title: "Fases do Damage Control",
          items: [
            {
              label: "Fase 0 — Pré-hospitalar",
              value:
                "Hipotensão permissiva. Torniquete se extremidade. Ácido tranexâmico em até 3h do trauma (CRASH-2 trial). Evitar cristaloide em excesso.",
              highlight: false,
            },
            {
              label: "Fase 1 — Cirurgia Abreviada",
              value:
                "Tempo operatório CURTO para conter danos. Packing hepático. Grampeamento de alças sem anastomose. Ligaduras vasculares. Fechamento temporário da parede abdominal.",
              highlight: true,
            },
            {
              label: "Fase 2 — UTI",
              value:
                "Retorno 24-48h após para melhorar hemodinâmica. Corrigir tríade letal. Aquecimento, reposição de fatores, correção de pH. Ventilação protetora.",
              highlight: false,
            },
            {
              label: "Fase 3 — Cirurgia Definitiva",
              value:
                "Reconstrução das vísceras, anastomoses, fechamento definitivo da parede. Somente quando: temperatura >36°C, pH >7,35, coagulação normalizada.",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Ácido Tranexâmico — CRASH-2",
          text: "CRASH-2 trial (Lancet 2010, 20.000 pacientes): ácido tranexâmico 1g IV em 10min + 1g em 8h, iniciado em até 3h do trauma, reduz mortalidade por sangramento (RR 0,85). Após 3h: sem benefício e possível dano (aumento de mortalidade). Mecanismo: inibe fibrinólise (bloqueia plasminogênio). Incluído em protocolos ATLS e da maioria das cirurgias de trauma no Brasil.",
        },
      ],
    },
  },
  {
    id: "penetrante",
    name: "Trauma Penetrante",
    color: "#EF4444",
    content: {
      title: "Trauma Penetrante",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Regra de Ouro",
          text: "INSTÁVEL → Laparotomia imediata, sem investigação adicional. ESTÁVEL → Algoritmo por localização da ferida.",
        },
        {
          type: "grid",
          title:
            "Critérios do MAL — Laparotomia Obrigatória (Paciente Estável)",
          items: [
            {
              label: "Evisceração",
              value:
                "Qualquer conteúdo abdominal visível através da ferida. Laparotomia independente do estado clínico aparente.",
              highlight: true,
            },
            {
              label: "Irritação Peritoneal",
              value:
                "Dor à descompressão, defesa involuntária, abdome em tábua. Peritonite = contaminação estabelecida = cirurgia.",
              highlight: true,
            },
            {
              label: "Pneumoperitônio",
              value:
                "Ar livre subdiafragmático em RX ou TC = solução de continuidade de víscera oca = laparotomia.",
              highlight: true,
            },
          ],
        },
        {
          type: "location",
          title:
            "Conduta por Localização da Ferida (Paciente ESTÁVEL sem Critérios do MAL)",
          locations: [
            {
              name: "Parede Anterior",
              color: "#EF4444",
              stable: [
                "Série de EP (exame físico seriado a cada 6-8h)",
                "TC de abdome",
                "FAST",
                "Exploração digital da ferida (APENAS aqui)",
                "Lavado peritoneal diagnóstico",
              ],
              gold: "Laparoscopia Diagnóstica",
              obs: "Exploração digital positiva (penetrou a fáscia) → laparoscopia. Negativa → observação. Lavado peritoneal: >100.000 hemácias/mm³ = positivo para hemoperitônio.",
            },
            {
              name: "Flanco / Dorso",
              color: "#F59E0B",
              stable: [
                "Série de EP",
                "TC de abdome e pelve (TRIFÁSICO)",
                "NUNCA exploração digital",
              ],
              gold: "Conduta conforme TC",
              obs: "Ferida em flanco/dorso: TC trifásico é fundamental para avaliar retroperitônio, rins, cólon. Exploração digital é contraindicada — anatomia complexa e risco de aprofundar lesão.",
            },
            {
              name: "Transição Toracoabdominal",
              color: "#6366F1",
              stable: [
                "TC de abdome, pelve e tórax",
                "NUNCA exploração digital",
              ],
              gold: "Laparoscopia Terapêutica e Diagnóstica",
              obs: "Toda ferida entre 4º EIC e rebordo costal tem potencial de lesão diafragmática. Radiografia e FAST INSUFICIENTES para excluir lesão de diafragma. Laparoscopia é o único método confiável.",
            },
          ],
        },
        {
          type: "obs",
          title: "Lesão Diafragmática — Armadilha Clássica de Prova",
          text: "Lesão diafragmática é subestimada em 12-66% dos casos no trauma inicial. RX pode estar normal. FAST normal. TC pode ser normal em lesão pequena. A única forma de excluir com segurança é laparoscopia. Na lesão crônica (hérnias diafragmáticas traumáticas tardias), paciente apresenta meses/anos depois com obstrução intestinal por encarceramento de alças. A laparoscopia diagnóstica em toda ferida toracoabdominal penetrante é o padrão que as bancas de residência cobram.",
        },
      ],
    },
  },
  {
    id: "contuso",
    name: "Trauma Contuso",
    color: "#10B981",
    content: {
      title: "Trauma Contuso",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Diferença Fundamental vs. Penetrante",
          text: "Trauma contuso: mecanismo de lesão interno, órgão sólido é o principal alvo. A maioria das lesões de órgão sólido em trauma contuso pode ser tratada de forma NÃO OPERATÓRIA (TNO) — desde que o paciente seja ESTÁVEL.",
        },
        {
          type: "flow",
          title: "Algoritmo — Trauma Contuso",
          steps: [
            { text: "FAST imediato", color: "#10B981" },
            {
              text: "INSTÁVEL + FAST+ → Laparotomia Exploradora",
              color: "#EF4444",
            },
            {
              text: "INSTÁVEL + FAST- → Repetir FAST / buscar outra causa de instabilidade",
              color: "#F59E0B",
            },
            { text: "ESTÁVEL → Critérios do BEM?", color: "#10B981" },
            {
              text: "SIM (todos critérios) → Observação + EP Seriado + TC",
              color: "#10B981",
            },
            { text: "NÃO → TC abdome e pelve com contraste", color: "#0EA5E9" },
          ],
        },
        {
          type: "grid",
          title: "Critérios do BEM — Para TNO / Observação Segura",
          items: [
            {
              label: "Trauma de Baixa Energia",
              value:
                "Alta energia (atropelamento, capotamento, queda >3m, esmagamento) exige investigação mesmo sem achados. Mecanismo importa.",
              highlight: false,
            },
            {
              label: "EP Confiável",
              value:
                "Exame físico sem limitações técnicas. Paciente cooperativo, sem déficits neurológicos, sem paralisia.",
              highlight: true,
            },
            {
              label: "SEM Intoxicação",
              value:
                "Álcool, drogas, sedativos mascaram peritonismo. Um exame físico em paciente intoxicado é INVÁLIDO para decisão de conduta.",
              highlight: true,
            },
            {
              label: "SEM Fatores Distratores",
              value:
                "Fraturas de costelas, bacia, membros — dor distratora invalida o EP abdominal. TC obrigatória nesses casos.",
              highlight: true,
            },
          ],
        },
        {
          type: "decision",
          title: "TC com Contraste: Decisão por Achado",
          decisions: [
            {
              condition: "Lesão de Órgão Sólido",
              color: "#F59E0B",
              actions: [
                "Graduar a lesão (AAST)",
                "Considerar TNO (paciente estável)",
                "Sangramento Arterial Ativo (blush) → Arteriografia + Embolização",
              ],
            },
            {
              condition: "SEM Lesão de Órgão Sólido",
              color: "#EF4444",
              actions: [
                "Pneumoperitônio → Laparotomia",
                "Lesão de mesentério / delgado / bexiga intraperitoneal → Laparoscopia ou Laparotomia",
                "Líquido livre SEM lesão identificada + TCE → Laparotomia (EP não confiável)",
              ],
            },
            {
              condition: "Pneumoperitônio",
              color: "#EF4444",
              actions: [
                "Laparotomia direta",
                "Víscera oca rota até prova em contrário",
                "Não aguardar piora clínica",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "TNO em Lesão de Órgão Sólido — Critérios e Limites",
          text: "TNO no trauma contuso de órgãos sólidos (fígado, baço, rim) é o padrão atual. Taxa de sucesso: fígado 85-90%, baço 60-80% (grau I-III), rim >95%. Critérios para TNO: estabilidade hemodinâmica, sem peritonismo, sem lesão de víscera oca associada. TNO falha em: blush arterial persistente após embolização, instabilização tardia, lesões grau IV-V esplênicas sem embolização disponível. Monitorização em CTI/enfermaria cirúrgica por 24-48h mínimo.",
        },
      ],
    },
  },
  {
    id: "hepatico",
    name: "Trauma Hepático",
    color: "#F97316",
    content: {
      title: "Trauma Hepático",
      blocks: [
        {
          type: "alert",
          color: "#F97316",
          title: "Órgão mais lesado no Trauma Abdominal",
          text: "Fígado é o órgão mais frequentemente lesado no trauma abdominal penetrante. Baço é o mais frequente no contuso. A maioria (80-85%) das lesões hepáticas para de sangrar espontaneamente.",
        },
        {
          type: "grades",
          title: "Graduação AAST — Trauma Hepático",
          organ: "fígado",
          grades: [
            {
              grade: "I",
              color: "#10B981",
              items: [
                "Hematoma subcapsular < 10% da superfície",
                "Laceração < 1cm de profundidade",
              ],
            },
            {
              grade: "II",
              color: "#84CC16",
              items: [
                "Hematoma subcapsular 10-50%",
                "Laceração 1-3cm de profundidade",
              ],
            },
            {
              grade: "III",
              color: "#EAB308",
              items: [
                "Hematoma subcapsular > 50% ou em expansão",
                "Laceração > 3cm de profundidade",
              ],
            },
            {
              grade: "IV",
              color: "#F97316",
              items: [
                "Disjunção do parênquima envolvendo 25-75% do lobo hepático",
              ],
            },
            {
              grade: "V",
              color: "#EF4444",
              items: [
                "Lesão de grandes vasos",
                "Disjunção do parênquima do lobo > 75%",
              ],
            },
            {
              grade: "VI",
              color: "#7C3AED",
              items: ["Avulsão hepática — incompatível com vida na maioria"],
            },
          ],
        },
        {
          type: "grid",
          title: "Controle de Sangramento Intraoperatório",
          items: [
            {
              label: "Tamponamento (Packing)",
              value:
                "Compressão do parênquima hepático com compressas. Primeira manobra no damage control hepático. Eficaz em sangramentos venosos e parenquimatosos.",
              highlight: true,
            },
            {
              label: "Manobra de Pringle",
              value:
                "Compressão digital ou com clamp da tríade portal (artéria hepática + veia porta + colédoco) no forame de Winslow. Controla até 80% dos sangramentos hepáticos.",
              highlight: true,
            },
            {
              label: "Pringle NÃO controla:",
              value:
                "Veia cava retro-hepática e veias hepáticas supra-hepáticas. Nesses casos: exclusão vascular total (clampeamento supra e infra-hepático da VCI + Pringle) — alta mortalidade.",
              highlight: false,
            },
            {
              label: "TNO Graus I-III",
              value:
                "Padrão atual em estável. Blush arterial: arteriografia + embolização. Observação rigorosa. Conversão para cirurgia: instabilização, expansão do hematoma, peritonismo tardio.",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Bile Leak — Complicação Tardia",
          text: "Biloma e fístula biliar ocorrem em 2-7% do TNO hepático, tipicamente 5-10 dias após o trauma. Suspeita: dor abdominal progressiva, febre, icterícia leve. Diagnóstico: TC (coleção peri-hepática hipodensa) + HIDA scan ou CPRE. Tratamento: CPRE com esfincterotomia + stent biliar é o padrão. Fístulas de ductos maiores podem requerer cirurgia. Questão frequente em residência: complicação tardia de TNO hepático.",
        },
      ],
    },
  },
  {
    id: "esplenico",
    name: "Trauma Esplênico",
    color: "#8B5CF6",
    content: {
      title: "Trauma Esplênico",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Órgão mais lesado no Trauma Contuso",
          text: "Baço é o órgão mais frequentemente lesado no trauma contuso abdominal. Rica vascularização + localização subcostal + cápsula fina = vulnerabilidade. TNO é possível em graus I-III estáveis.",
        },
        {
          type: "grades",
          title: "Graduação AAST — Trauma Esplênico",
          organ: "baço",
          grades: [
            {
              grade: "I",
              color: "#10B981",
              items: [
                "Hematoma subcapsular < 10%",
                "Laceração < 1cm de profundidade",
              ],
            },
            {
              grade: "II",
              color: "#84CC16",
              items: [
                "Hematoma subcapsular 10-50%",
                "Laceração 1-3cm de profundidade, não acomete vasos trabeculares",
              ],
            },
            {
              grade: "III",
              color: "#EAB308",
              items: [
                "Hematoma subcapsular > 50% ou em expansão",
                "NÃO acomete o hilo esplênico",
              ],
            },
            {
              grade: "IV",
              color: "#EF4444",
              items: [
                "Lesão de hilo esplênico — desvascularização > 25% do baço",
              ],
            },
            {
              grade: "V",
              color: "#7C3AED",
              items: [
                "Explosão esplênica",
                "Lesão vascular hilar com desvascularização total",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Tratamento",
          items: [
            {
              label: "Esplenorrafia",
              value:
                "Reparo cirúrgico do baço — preferido quando possível para preservar função imune. Indicado em graus I-II acessíveis cirurgicamente.",
              highlight: false,
            },
            {
              label: "Esplenectomia",
              value:
                "Graus IV-V, instabilidade intraoperatória, falha de TNO. Perda da função de filtração de germes encapsulados.",
              highlight: true,
            },
            {
              label: "Embolização Arterial",
              value:
                "TNO em graus III-IV estáveis com blush arterial. Taxa de sucesso ~85-90%. Reduz falha de TNO de 33% para 5% em grau IV.",
              highlight: true,
            },
            {
              label: "TNO — Critérios",
              value:
                "Graus I-III: TNO seguro em estável. Grau IV: TNO possível com embolização. Grau V: esplenectomia na maioria dos casos.",
              highlight: false,
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Pós-Esplenectomia — OBRIGATÓRIO",
          text: "OPSS (Overwhelming Post-Splenectomy Sepsis): sepse fulminante por germes encapsulados, mortalidade >50%. Vacinação OBRIGATÓRIA idealmente 14 dias após esplenectomia (ou 2 semanas antes se eletiva): Pneumococo (Pneumovax 23 ou PCV13), Meningococo (MenACWY + MenB), Haemophilus influenzae tipo b. Profilaxia com penicilina oral por 2 anos ou indefinidamente em alto risco. Questão CLÁSSICA de residência.",
        },
      ],
    },
  },
  {
    id: "renal",
    name: "Trauma Renal",
    color: "#0EA5E9",
    content: {
      title: "Trauma Renal",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Princípio do Trauma Renal",
          text: "Hematoma renal estável em trauma CONTUSO NÃO É EXPLORADO — hematoma perirrenal age como tamponamento. A exploração aumenta a taxa de nefrectomia sem benefício. Trauma penetrante com hematoma em EXPANSÃO: explorar.",
        },
        {
          type: "grades",
          title: "Graduação AAST — Trauma Renal",
          organ: "rim",
          grades: [
            {
              grade: "I",
              color: "#10B981",
              items: [
                "Hematoma subcapsular não expansivo",
                "Sem laceração do parênquima",
              ],
            },
            {
              grade: "II",
              color: "#84CC16",
              items: [
                "Hematoma perirrenal contido na fáscia de Gerota",
                "Laceração < 1cm de profundidade, sem extravasamento urinário",
              ],
            },
            {
              grade: "III",
              color: "#EAB308",
              items: [
                "Laceração > 1cm de profundidade",
                "Sem acometimento do sistema coletor, sem extravasamento urinário",
              ],
            },
            {
              grade: "IV",
              color: "#F97316",
              items: [
                "Hematoma além da fáscia",
                "Laceração com acometimento do sistema coletor (extravasamento urinário)",
                "Trombose de artéria ou veia segmentar com infarto",
                "Lesão do hilo renal",
              ],
            },
            {
              grade: "V",
              color: "#EF4444",
              items: [
                "Disjunção de artéria renal principal",
                "Hematoma hilar com desvascularização renal total",
                "Rim 'estilhaçado'",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Conduta por Mecanismo",
          items: [
            {
              label: "Trauma Penetrante + Hematoma em Expansão",
              value:
                "EXPLORAR. Laparotomia com controle vascular antes de abrir a fáscia de Gerota. Exploração sem controle prévio = nefrectomia quase certa.",
              highlight: true,
            },
            {
              label: "Trauma Contuso + Hematoma Estável",
              value:
                "NÃO EXPLORAR a loja renal. Hematoma tamponado pela fáscia. TC seriada para monitoramento. TNO com sucesso >95% em graus I-III.",
              highlight: true,
            },
            {
              label: "Grau IV com Extravasamento Urinário",
              value:
                "Maioria trata com TNO + stent ureteral (CPRE/ureteroscopia). Urinoma sintomático: drenagem percutânea.",
              highlight: false,
            },
            {
              label: "Grau V (Trombose Artéria Renal)",
              value:
                "Janela terapêutica estreita (< 6h). Revascularização cirúrgica possível mas raramente viável no politrauma. Maioria evolui para nefrectomia.",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Hematúria — Correlação com Gravidade",
          text: "Hematúria macroscópica: indicação de uretrocistografia e avaliação de uretra/bexiga antes de cateterismo em trauma pélvico. Hematúria microscópica ISOLADA em adulto hígido com trauma contuso de baixa energia: NÃO indica TC renal obrigatória (AAST/AUA guideline). Indicações de TC: hematúria macroscópica, hipotensão, mecanismo de alta energia, trauma penetrante flanco/dorso. Importante: lesão de artéria renal pode cursar SEM hematúria.",
        },
      ],
    },
  },
  {
    id: "pancreas",
    name: "Trauma Pancreático",
    color: "#F59E0B",
    content: {
      title: "Trauma Pancreático",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "O Mais Difícil de Diagnosticar",
          text: "Trauma pancreático tem diagnóstico difícil e tardio. Amilase e lipase podem ser NORMAIS nas primeiras horas. A TC pode subestimar lesões iniciais. O achado cirúrgico é o padrão-ouro. O acometimento do ducto de Wirsung é o fator determinante do tratamento.",
        },
        {
          type: "grades",
          title: "Graduação AAST — Trauma Pancreático",
          organ: "pâncreas",
          grades: [
            {
              grade: "I",
              color: "#10B981",
              items: [
                "Contusão mínima / laceração superficial",
                "SEM lesão ductal",
              ],
            },
            {
              grade: "II",
              color: "#84CC16",
              items: [
                "Laceração maior",
                "SEM acometimento do ducto pancreático principal (Wirsung)",
              ],
            },
            {
              grade: "III",
              color: "#EAB308",
              items: [
                "Laceração distal",
                "COM acometimento do ducto pancreático principal",
              ],
            },
            {
              grade: "IV",
              color: "#F97316",
              items: ["Laceração proximal", "Lesão da ampola de Vater"],
            },
            {
              grade: "V",
              color: "#EF4444",
              items: [
                "Destruição da cabeça do pâncreas",
                "Lesão proximal com envolvimento duodenal",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Tratamento por Localização + Grau",
          items: [
            {
              label: "Grau I-II (Sem Ducto)",
              value:
                "TNO ou drenagem simples. Sem ressecção necessária. Octreotide adjuvante controverso. Cuidado com desenvolvimento de pseudocisto.",
              highlight: false,
            },
            {
              label: "Grau III — Corpo/Cauda (Com Ducto)",
              value:
                "PANCREATECTOMIA DISTAL (corpo + cauda). Com ou sem esplenectomia. Cirurgia mais comum no trauma pancreático.",
              highlight: true,
            },
            {
              label: "Grau IV-V — Cabeça (Com Ducto)",
              value:
                "GASTRODUODENOPANCREATECTOMIA (Whipple). Operação de alta complexidade. Em trauma agudo: inicialmente damage control com drenagem, Whipple diferido.",
              highlight: true,
            },
            {
              label: "Triângulo de Kocher",
              value:
                "Manobra essencial para expor a cabeça do pâncreas e duodeno. Mobilização duodenal da direita. Todo cirurgião de trauma precisa dominar.",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "CPRE no Trauma Pancreático",
          text: "CPRE (colangiopancreatografia retrógrada endoscópica) tem papel diagnóstico E terapêutico no trauma pancreático. Diagnóstico: opacificação do ducto de Wirsung, identificação de ruptura ductal. Tratamento: stent transpapilar em rupturas parciais do ducto em pacientes estáveis sem indicação cirúrgica imediata — alternativa à pancreatectomia distal em casos selecionados. MRCP (RM com colangiopancreatografia): método não invasivo preferido quando disponível para avaliar ducto principal antes da decisão cirúrgica.",
        },
      ],
    },
  },
  {
    id: "viscera",
    name: "Víscera Oca",
    color: "#EC4899",
    content: {
      title: "Trauma de Víscera Oca",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Diagnóstico — Principal Desafio",
          text: "Lesão de víscera oca é subdiagnosticada na TC inicial. A TC pode ser NORMAL nas primeiras horas após perfuração intestinal. Líquido livre sem lesão de órgão sólido em trauma contuso = pensar em víscera oca até prova em contrário.",
        },
        {
          type: "grades",
          title: "Graduação AAST — Víscera Oca (Delgado/Cólon)",
          organ: "víscera oca",
          grades: [
            {
              grade: "I",
              color: "#10B981",
              items: [
                "Hematoma de parede sem desvascularização",
                "Laceração parcial da espessura",
              ],
            },
            {
              grade: "II",
              color: "#84CC16",
              items: ["Laceração < 50% da circunferência"],
            },
            {
              grade: "III",
              color: "#EAB308",
              items: ["Laceração > 50% da circunferência, sem secção completa"],
            },
            {
              grade: "IV",
              color: "#F97316",
              items: ["Secção completa da alça"],
            },
            {
              grade: "V",
              color: "#EF4444",
              items: [
                "Secção completa + perda tecidual significativa",
                "Lesão vascular com desvascularização segmentar",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Tratamento",
          items: [
            {
              label: "Grau I-II — Rafia Primária",
              value:
                "Sutura da lesão. Laparotomia obrigatória. Rafia primária em graus I-II: segura se sem contaminação excessiva e sem desvascularização.",
              highlight: true,
            },
            {
              label: "Grau III-IV — Ressecção + Anastomose",
              value:
                "Em condições ideais (sem sepse, sem contaminação maciça, sem instabilidade). Em damage control: grampeamento + fechamento temporário + anastomose diferida.",
              highlight: false,
            },
            {
              label: "Grau V — Ressecção + Ostomia",
              value:
                "Contaminação maciça, instabilidade, grau V: ressecção + ostomia (Hartmann ou ileostomia). Reconstrução do trânsito em 3-6 meses.",
              highlight: false,
            },
            {
              label: "Lesão de Bexiga Intraperitoneal",
              value:
                "Laparotomia + rafia vesical em dois planos. Lesão extraperitoneal: cateter de Foley por 10-14 dias é suficiente na maioria.",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Sinal do Cinto de Segurança — Clássico de Prova",
          text: "Sinal do cinto de segurança (seat belt sign): equimose linear transversal no abdome após trauma contuso por cinto. Altamente associado a lesão de víscera oca (mesentério, jejuno, alças fixas) e fratura de coluna lombar (fratura de Chance — fratura em flexão-distração L1-L2). A tríade: equimose abdominal + fratura de Chance + lesão de víscera oca é chamada de 'Síndrome do Cinto de Segurança'. SEMPRE solicitar TC com janela óssea para coluna nesses pacientes. Lesão de mesentério pode ser sutil na TC — pneumoperitônio mínimo, espessamento da gordura mesentérica, líquido entre as alças sem causa aparente.",
        },
      ],
    },
  },
];

const gradientColors = {
  I: "#10B981",
  II: "#84CC16",
  III: "#EAB308",
  IV: "#F97316",
  V: "#EF4444",
  VI: "#7C3AED",
};
export default function TraumaAbdominal() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Cirurgia do Trauma"
      title="Trauma Abdominal — Guia Completo"
    />
  );
}
