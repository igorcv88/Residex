import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "conceitos",
    name: "Conceitos",
    color: "#6366F1",
    content: {
      title: "Conceitos Iniciais e Epidemiologia",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Definição de Trauma",
          text: "Toda lesão causada por uma força externa sobre o organismo. Trauma é a principal causa de morte em adultos jovens (1–44 anos) no Brasil e no mundo. Abordagem sistematizada pelo ATLS (Advanced Trauma Life Support) reduz mortalidade — padronização é o pilar.",
        },
        {
          type: "grades",
          title: "Distribuição Trimodal da Mortalidade no Trauma",
          organ: "Tempo",
          grades: [
            {
              grade: "1º Pico",
              color: "#EF4444",
              items: [
                "Segundos a minutos após o trauma",
                "Lesões incompatíveis com a vida: ruptura de aorta, laceração de tronco cerebral, lesão medular alta",
                "Morte na cena — prevenir com uso de cinto, capacete, legislação de trânsito",
              ],
            },
            {
              grade: "2º Pico (Hora Dourada)",
              color: "#F59E0B",
              items: [
                "Minutos a horas após o trauma — pico do XABCDE",
                "Falhas no atendimento ao trauma: hematoma epidural, hemopneumotórax, choque hemorrágico, TCE grave",
                "PREVENÍVEL com atendimento sistematizado — janela terapêutica real",
              ],
            },
            {
              grade: "3º Pico",
              color: "#8B5CF6",
              items: [
                "Dias a semanas após o trauma",
                "Internação prolongada → SIRS, sepse, SDMO, infecções nosocomiais, tromboembolismo",
                "Reduzir com bundle de UTI: prevenção de VAP, controle glicêmico, mobilização precoce",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Preparação para o Atendimento",
          items: [
            {
              label: "1. Briefing Pré-atendimento",
              value:
                "Sala de trauma com todos os componentes e equipamentos verificados antes da chegada",
              highlight: true,
            },
            {
              label: "2. Comunicação com a Rede",
              value:
                "Informação da APH → regulação conforme gravidade → centro de trauma capacitado",
              highlight: false,
            },
            {
              label: "Sala de Trauma",
              value:
                "Aquecida, iluminada, monitor, desfibrilador, acesso venoso, material de via aérea, drenos disponíveis",
              highlight: false,
            },
            {
              label: "EPI Completo",
              value:
                "Luvas, máscara, avental, protetor ocular — precaução universal obrigatória",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Hora Dourada — Golden Hour (Cowley, 1975)",
          text: "Conceito de que o tratamento definitivo das lesões dentro da primeira hora após o trauma reduz drasticamente a mortalidade. Embora o período exato seja questionado pela literatura moderna (variar com tipo de lesão), o princípio da agilidade diagnóstica e terapêutica é universalmente válido. O foco atual é na 'Hora de Ouro': identificar e controlar o sangramento antes de qualquer outra coisa.",
        },
      ],
    },
  },
  {
    id: "mecanismo",
    name: "Mecanismo",
    color: "#EC4899",
    content: {
      title: "Mecanismos de Trauma e Cinemática",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Alta Energia — Suspeitar de Lesões Ocultas",
          text: "TC de corpo inteiro (pan-scan): > 3 metros de queda, automobilístico > 60 km/h, moto > 40 km/h, capotamento, ejeção do veículo, óbito na cena, mecanismo desconhecido. Não muda mortalidade per se — mas identifica lesões que mudam o manejo. Cabeça + pelve = diagnóstico precoce.",
        },
        {
          type: "grid",
          title: "Mecanismos e Padrões de Lesão Esperados",
          items: [
            {
              label: "Atropelamento",
              value:
                "Fraturas, ferimentos descolantes, TCE grave, lesões torácicas/abdominais/pélvicas (tríade de Waddell em crianças)",
              highlight: true,
            },
            {
              label: "Acidente de Motocicleta",
              value:
                "Rádio/úmero, fraturas, lesões torácicas e abdominais — alta energia por ausência de proteção estrutural",
              highlight: false,
            },
            {
              label: "Colisão Veicular — Frontal",
              value:
                "Principalmente lesões torácicas: esterno, aorta, coração. Joelho → fêmur → quadril",
              highlight: true,
            },
            {
              label: "Colisão — Lateral",
              value:
                "Grandes vasos, baço, fígado, abdome, pelve — lesão ipsilateral ao impacto",
              highlight: false,
            },
            {
              label: "Colisão — Traseira",
              value:
                "Hiperextensão cervical — lesão ligamentar C1-C2 mesmo sem imagem alterada",
              highlight: false,
            },
            {
              label: "Queda",
              value:
                "Altura, ponto de contato, tipo de solo, queda livre, escorregamento, múltiplos níveis — calcâneo + coluna + crânio na queda em pé",
              highlight: false,
            },
          ],
        },
        {
          type: "grid",
          title: "Arma de Fogo — Cinemática Balística",
          items: [
            {
              label: "Calibre",
              value:
                "Diretamente proporcional à transferência de energia cinética",
              highlight: false,
            },
            {
              label: "Velocidade",
              value:
                "EC = ½mv² — velocidade é o determinante quadrático da energia cinética",
              highlight: true,
            },
            {
              label: "Trajetória",
              value:
                "Entrada, ricochete, trajetória intracavitária irregular — não assumir trajetória direta",
              highlight: true,
            },
            {
              label: "Distância",
              value:
                "Inversamente proporcional à lesão — queima-roupa: cavidade permanente maior",
              highlight: false,
            },
            {
              label: "Cavitação Temporária",
              value:
                "Até 30x maior que o projétil em armas de alta velocidade — lesão por onda de choque a distância",
              highlight: true,
            },
            {
              label: "Objetos Implantados",
              value:
                "NÃO REMOVER objetos implantados na cena — estabilizar e transportar",
              highlight: true,
            },
          ],
        },
        {
          type: "grid",
          title: "Arma Branca",
          items: [
            {
              label: "Profundas",
              value:
                "Heteroagressão — força externa maior, trajetória imprevisível",
              highlight: false,
            },
            {
              label: "Extitação/Superficiais",
              value:
                "Autoagressão — padrão de lesões hesitantes, superficiais e paralelas",
              highlight: false,
            },
            {
              label: "Regra geral",
              value:
                "Ferida de entrada ≠ profundidade da lesão — sempre explorar cirurgicamente se penetrante em cavidade",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola: Mecanismo Penetrante Cervical",
          text: "Trauma penetrante cervical: NÃO imobilizar com colar cervical — não há instabilidade ligamentar (lesão direta), e o colar atrapalha a avaliação e compressão de vasos. Diferente do trauma fechado cervical onde o colar é mandatório se houver critério de indicação.",
        },
      ],
    },
  },
  {
    id: "pre-hospitalar",
    name: "Pré-Hospitalar",
    color: "#0EA5E9",
    content: {
      title: "Atendimento Pré-Hospitalar e Triagem",
      blocks: [
        {
          type: "flow",
          title: "Sequência Pré-Hospitalar",
          steps: [
            {
              text: "PRIORIDADE SEGURANÇA NA CENA — não criar nova vítima. Checar riscos antes de aproximar",
              color: "#EF4444",
            },
            {
              text: "ATENDIMENTO RÁPIDO — avaliação primária e estabilização mínima na cena (scoop and run vs stay and play)",
              color: "#0EA5E9",
            },
            {
              text: "COMUNICAÇÃO MIST: Mecanismo | Injury (lesões) | Sinais Vitais | Tratamentos instituídos",
              color: "#10B981",
            },
            {
              text: "REGULAÇÃO: informar APH → central de regulação → destino conforme gravidade e capacidade do centro",
              color: "#6366F1",
            },
          ],
        },
        {
          type: "alert",
          color: "#0EA5E9",
          title: "MIST — Passagem de Caso no Trauma",
          text: "M — Mecanismo do trauma | I — Injury (lesões identificadas) | S — Sinais vitais na cena e na chegada | T — Tratamentos instituídos pelo APH. Passagem estruturada reduz perda de informação e acelera tomada de decisão na sala de trauma.",
        },
        {
          type: "grades",
          title: "START Triage — Simple Triage and Rapid Treatment",
          organ: "Triagem",
          grades: [
            {
              grade: "VERDE",
              color: "#10B981",
              items: [
                "Deambula — pode andar sozinho, lesões menores",
                "Atendimento postergado — menor prioridade",
              ],
            },
            {
              grade: "AMARELO",
              color: "#F59E0B",
              items: [
                "FR < 30 | TEC ≤ 2 seg | CUMPRE ORDENS",
                "Urgente — instável mas pode aguardar brevemente",
              ],
            },
            {
              grade: "VERMELHO",
              color: "#EF4444",
              items: [
                "FR > 30 OU TEC > 2 seg OU NÃO CUMPRE ORDENS",
                "Emergência — prioridade máxima de atendimento",
              ],
            },
            {
              grade: "PRETO",
              color: "#475569",
              items: [
                "Não respira MESMO APÓS liberar via aérea",
                "Óbito ou expectativa de sobrevida mínima — baixa prioridade em desastre",
              ],
            },
          ],
        },
        {
          type: "decision",
          title: "Triagem em Massa — Fluxo pelo Sistema de Saúde",
          decisions: [
            {
              condition: "Vítimas com alteração no XABCDE",
              color: "#EF4444",
              actions: [
                "Levar ao Centro de Trauma de maior complexidade disponível",
              ],
            },
            {
              condition:
                "Múltiplas Vítimas (< 5 pessoas) — Sistema CONSEGUE ATENDER",
              color: "#F59E0B",
              actions: ["Vermelho → Amarelo → Verde: prioridade por gravidade"],
            },
            {
              condition: "Vítimas em Massa — Sistema NÃO COMPORTA",
              color: "#8B5CF6",
              actions: [
                "Verde → Amarelo → Vermelho: tratar quem tem maior chance de sobrevida com menor recurso (reversão da lógica)",
              ],
            },
            {
              condition:
                "Desastre — Sistema de Saúde Distribuído (Padrão Nacional)",
              color: "#0EA5E9",
              actions: [
                "Montagem de posto avançado na área de atendimento",
                "Atende quem consegue chegar à rede — triagem por mobilidade",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola de Banca — START vs SALT vs Jumpstart",
          text: "O método START é o padrão para adultos nas provas brasileiras. Para crianças, o JumpSTART é usado (diferenças: FR normal diferente, apneia recebe ventilações de resgate antes de classificar como preto). Em provas de residência, cobram principalmente o método START com as cores e critérios numéricos exatos.",
        },
      ],
    },
  },
  {
    id: "xabcde-x",
    name: "X · Exsanguinante",
    color: "#EF4444",
    content: {
      title: "X — Hemorragias Exsanguinantes",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title:
            "X vem antes do A — Sangramento Exsanguinante é Prioridade Máxima",
          text: "O 'X' foi adicionado ao ABCDE pelo Committee on TCCC (2013) e incorporado ao ATLS 10ª edição. Hemorragia externa maciça mata em minutos — antes que qualquer comprometimento de via aérea. Controle do sangramento precede a abertura da via aérea.",
        },
        {
          type: "grid",
          title: "Tipos de Lesões Exsanguinantes",
          items: [
            {
              label: "Sangram muito e rápido",
              value:
                "Grandes vasos em membros, couro cabeludo, pescoço, virilha, axila",
              highlight: true,
            },
            {
              label: "Lesão arterial incompleta",
              value:
                "Pior que completa — retração parcial da artéria mantém o sangramento ativo",
              highlight: true,
            },
            {
              label: "Lesão venosa completa",
              value: "Grande volume, mas mais lento — pressão venosa menor",
              highlight: false,
            },
            {
              label: "Lesão arterial completa",
              value:
                "Retração e vasoespasmo da artéria seccionada — pode sangrar menos que a incompleta",
              highlight: false,
            },
          ],
        },
        {
          type: "flow",
          title: "Tratamento Escalonado — Controle de Hemorragia Externa",
          steps: [
            {
              text: "COMPRESSÃO DIRETA — primeira linha, sempre. Mínimo 5 minutos de pressão contínua sem tirar para ver",
              color: "#EF4444",
            },
            {
              text: "PACKING — tamponamento da ferida com gaze/curativo hemostático. Comprimir o trajeto, não só a superfície",
              color: "#F59E0B",
            },
            {
              text: "TORNIQUETE — 5 cm proximal à lesão. Apertar até ausência de pulso distal. Anotar horário. Tempo máximo 2 horas (evitar gangrena)",
              color: "#EC4899",
            },
            {
              text: "CURATIVO COMPRESSIVO — complementar ao packing em lesões de tronco/virilha onde torniquete não é possível",
              color: "#8B5CF6",
            },
          ],
        },
        {
          type: "obs",
          title: "Torniquete — Evidência e Mitos",
          text: "Estudos do conflito do Iraque/Afeganistão (Eastridge, JTrauma 2012): torniquete precoce salvou vidas sem aumento de amputações quando aplicado < 2h. A crença de que torniquete causa amputação é MITO quando aplicado corretamente. Tempo máximo de 2 horas é seguro; acima de 6 horas o risco de síndrome compartimental e lesão nervosa aumenta exponencialmente.",
        },
        {
          type: "alert",
          color: "#F59E0B",
          title: "Volta ao X — Reavaliação Mandatória",
          text: "Voltar ao X se identificar qualquer alteração nas outras etapas (A, B, C, D, E). O X é DINÂMICO — um torniquete pode se soltar, packing pode saturar, nova fonte de sangramento pode ser identificada. Reavaliar em toda rodada do ABCDE.",
        },
      ],
    },
  },
  {
    id: "abcde",
    name: "ABCDE",
    color: "#10B981",
    content: {
      title: "Atendimento Inicial — XABCDE",
      blocks: [
        {
          type: "decision",
          title: "A — Via Aérea",
          decisions: [
            {
              condition: "Avaliar Permeabilidade",
              color: "#10B981",
              actions: [
                "Resposta verbal? Fala → via aérea patente",
                "Oxigênio suplementar a TODOS: máscara 15 L/min (ato reflexo)",
                "Avaliar: stridor, uso de músculos acessórios, queda de saturação",
              ],
            },
            {
              condition: "Decisão de Intubar",
              color: "#F59E0B",
              actions: [
                "NÃO: ventila/oxigena adequadamente → manobras manuais (jaw thrust, chin lift) + dispositivos adjuvantes",
                "NÃO protege via aérea → IOT de sequência rápida imediata",
                "Falha de IOT → cricotireoidotomia cirúrgica (não tentar VM por máscara como substituto)",
              ],
            },
            {
              condition: "Restrição de Movimento Cervical",
              color: "#0EA5E9",
              actions: [
                "Colar cervical + prancha rígida em TODO trauma fechado com mecanismo de risco",
                "NÃO RESTRINGIR no trauma penetrante cervical",
                "Manter estabilização manual durante a IOT — não soltar a coluna",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "B — Respiração: Avaliação Sistemática",
          items: [
            {
              label: "Inspeção",
              value:
                "FR, amplitude, simetria, ferimentos aspirativos, movimentos paradoxais, ingurgitamento jugular",
              highlight: false,
            },
            {
              label: "Palpação",
              value:
                "Crepitação, enfisema subcutâneo, dor à compressão, desvio de traqueia",
              highlight: true,
            },
            {
              label: "Ausculta",
              value:
                "Murmúrio vesicular bilateral — ausência = pneumotórax ou hemotórax",
              highlight: true,
            },
            {
              label: "Percussão",
              value: "Timpanismo = pneumotórax | Macicez = hemotórax",
              highlight: true,
            },
            {
              label: "Complementares",
              value:
                "RX de tórax (AP em trauma fechado) | FAST | TC se estável",
              highlight: false,
            },
            {
              label: "Tratamento",
              value:
                "97% resolvem com dreno de tórax — RESEQUE com dreno se pneumo/hemotórax confirmado",
              highlight: true,
            },
          ],
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "Pneumotórax Hipertensivo — Diagnóstico CLÍNICO",
          text: "Hipotensão + ausência de MV unilateral + ingurgitamento jugular + desvio de traqueia (tardio). Não aguardar RX — descompressão imediata com agulha 14G no 2° EIC na LMC, seguido de dreno de tórax. Instável com suspeita clínica = tratar antes de confirmar.",
        },
        {
          type: "decision",
          title: "C — Circulação",
          decisions: [
            {
              condition: "Localização do Sangramento",
              color: "#EC4899",
              actions: [
                "Tórax, abdome, pelve, ossos longos — os 5 locais de sangramento interno significativo",
                "Coxa (fêmur): até 1,5 L | Pelve: até 3–4 L | Tórax: maciço | Abdome: ilimitado",
              ],
            },
            {
              condition: "Acesso Venoso",
              color: "#F59E0B",
              actions: [
                "2 acessos venosos periféricos calibrosos (≥ 16G) — antecubital preferencial",
                "2 AVPs: coletar sangue para tipagem, hemograma, coagulação, lactato, gasometria",
                "IO (intraósseo) se falha no acesso periférico — qualquer droga ou fluido pode ser infundido",
              ],
            },
            {
              condition: "Reposição Volêmica",
              color: "#10B981",
              actions: [
                "RL 250–500 mL de teste (não 1–2 L de rotina — ATLS 10ª edição abandonou o 2L)",
                "Hipotensão permissiva: PAS 80–90 mmHg no trauma penetrante sem TCE",
                "Transfusão precoce: protocolo 1:1:1 (CHC:PFC:Plaquetas) no choque hemorrágico grave",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "D — Disability: Avaliação Neurológica",
          items: [
            {
              label: "ECG",
              value: "Escala de Coma de Glasgow — documentar ANTES de sedar",
              highlight: true,
            },
            {
              label: "Pupilas",
              value: "Tamanho, simetria, fotorreatividade bilateral",
              highlight: true,
            },
            {
              label: "Lateralização",
              value:
                "Movimentos assimétricos — sugere lesão focal intracraniana",
              highlight: false,
            },
            {
              label: "Evitar Lesão Secundária",
              value:
                "Elevar cabeceira 30° | Cuidado com Na e CO₂ | Normoglicemia | Normotermia",
              highlight: true,
            },
          ],
        },
        {
          type: "grid",
          title: "E — Exposição",
          items: [
            {
              label: "Expor todo o paciente",
              value:
                "Tirar toda a roupa — não se pode tratar o que não se vê. Tesoura de trauma",
              highlight: true,
            },
            {
              label: "Aquecimento",
              value:
                "Prevenir hipotermia — cobrir com manta aluminizada após exposição. Tríade da morte: hipotermia + acidose + coagulopatia",
              highlight: true,
            },
            {
              label: "Avaliar o dorso",
              value:
                "Log-roll (4 pessoas): inspecionar coluna torso-lombar e glúteos — retirar prancha rígida após",
              highlight: true,
            },
            {
              label: "Retirar prancha rígida",
              value:
                "Após log-roll — prancha causa úlceras por pressão se mantida > 30 min. Não é dispositivo de transporte definitivo",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "ATLS 10ª Edição (2018) — Mudanças Principais",
          text: "1) X adicionado antes do A (controle de hemorragia exsanguinante). 2) Reposição volêmica: abandonado o 2L de RL rotineiro → hipotensão permissiva e hemostasia cirúrgica precoce. 3) Protocolo de transfusão maciça 1:1:1 incorporado. 4) Ácido Tranexâmico (TXA) dentro de 3h do trauma (CRASH-2). 5) Pelve como fonte de sangramento independente no C.",
        },
      ],
    },
  },
  {
    id: "medidas-aux",
    name: "Medidas Auxiliares",
    color: "#F97316",
    content: {
      title: "Medidas Auxiliares e Monitorização",
      blocks: [
        {
          type: "grid",
          title: "Cardiorrespiratório",
          items: [
            {
              label: "ECG Contínuo",
              value:
                "Monitor cardíaco — CORRIGIR A CAUSA, não corrigir o ECG pelo ECG. Arritmia pós-trauma = pensar contusão miocárdica",
              highlight: true,
            },
            {
              label: "Oximetria de Pulso",
              value:
                "SatO₂ alvo > 94% — não confiável em hipoperfusão periférica, intoxicação por CO ou metemoglobinemia",
              highlight: false,
            },
            {
              label: "Capnografia",
              value:
                "EtCO₂ = CO₂ do ar expirado. METABOLISMO FUNCIONANDO: EtCO₂ ≈ PaCO₂ − 2 a 5. Queda súbita = parada circulatória, êmbolo, broncoespasmo ou dislodgamento do tubo",
              highlight: true,
            },
            {
              label: "PNI / PAM invasiva",
              value:
                "PAM = parâmetro de perfusão real. Alvo no trauma: PAM > 65 mmHg. Linha arterial se instável",
              highlight: false,
            },
          ],
        },
        {
          type: "grid",
          title: "SVO₂ — Saturação Venosa Central de O₂",
          items: [
            {
              label: "Normal",
              value: "65–75% — reflete extração tecidual de O₂ em equilíbrio",
              highlight: false,
            },
            {
              label: "Baixa (< 65%)",
              value:
                "Alto consumo de O₂ ou baixo débito cardíaco — choque, anemia severa, hipertermia",
              highlight: true,
            },
            {
              label: "Alta (> 75%)",
              value:
                "Shunting artério-venoso, intoxicação por CN⁻, sepse (vasoplegia) — O₂ não sendo extraído",
              highlight: true,
            },
            {
              label: "Onde medir",
              value:
                "CVC em jugular interna/subclávia → amostra venosa mista = CATETER DE SWAN-GANZ (artéria pulmonar)",
              highlight: false,
            },
          ],
        },
        {
          type: "grid",
          title: "Temperatura",
          items: [
            {
              label: "Padrão ouro de perfusão tecidual",
              value:
                "Temperatura é proxy do estado perfusional — extremidades frias = baixo débito",
              highlight: true,
            },
            {
              label: "0,04 mL/kg/h — Adulto",
              value:
                "Débito urinário mínimo alvo no adulto em reposição. Cateter vesical de demora em todo trauma grave",
              highlight: true,
            },
            {
              label: "1 mL/kg/h — Criança",
              value: "Débito urinário alvo em crianças durante ressuscitação",
              highlight: true,
            },
            {
              label: "0,5 mL/kg/h — Queimadura",
              value:
                "Fórmula de Parkland: 4 mL × kg × % SCQ (50% nas primeiras 8h, 50% nas 16h seguintes)",
              highlight: false,
            },
          ],
        },
        {
          type: "grid",
          title: "Sondas",
          items: [
            {
              label: "Sonda Gástrica",
              value:
                "Descompressão gástrica — reduz risco de broncoaspiração e melhora ventilação mecânica. Orogástrica se suspeita de fratura de base de crânio",
              highlight: true,
            },
            {
              label: "Sonda Vesical",
              value:
                "Monitorar débito urinário e hematúria. CONTRAINDICADA se suspeita de ruptura uretral: sangue no meato, escroto/períneo em 'borboleta', próstata elevada ao TR",
              highlight: true,
            },
          ],
        },
        {
          type: "decision",
          title: "Exames de Imagem no Trauma",
          decisions: [
            {
              condition: "FAST / E-FAST (Instáveis e Estáveis)",
              color: "#F97316",
              actions: [
                "Avalia pericárdio (tamponamento), pleura (hemopneumotórax), peritônio (líquido livre)",
                "Rápido, à beira do leito, repete após intervenção",
                "Sensibilidade: 73–88% para líquido livre peritoneal ≥ 200 mL",
              ],
            },
            {
              condition: "RX (Instáveis, Membros)",
              color: "#0EA5E9",
              actions: [
                "Tórax AP, pelve AP, coluna cervical lateral — a 'big three' do trauma",
                "Realizado na sala de trauma sem mover o paciente",
              ],
            },
            {
              condition: "TC (Estáveis — Pan-scan)",
              color: "#10B981",
              actions: [
                "Alta energia + paciente estável hemodinamicamente → TC de crânio, coluna, tórax, abdome, pelve",
                "Quando houver perda de função ou alta energia: TC é padrão",
                "Pan-scan reduz lesões perdidas em 30% vs exame seletivo (evidência prospectiva)",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Laboratório Inicial",
          items: [
            {
              label: "Hemograma",
              value:
                "Hb/Ht — anemia por diluição nas primeiras horas subestima a perda real. Usar lactato + BE como proxy",
              highlight: false,
            },
            {
              label: "Gasometria Arterial",
              value:
                "pH, BE, PaCO₂, PaO₂, lactato. BE < −6: acidose metabólica significativa. Lactato > 4: hipoperfusão grave",
              highlight: true,
            },
            {
              label: "Coagulograma",
              value:
                "TAP/INR, TTPA, fibrinogênio — monitorar coagulopatia consumptiva (tríade letal)",
              highlight: true,
            },
            {
              label: "Tipagem sanguínea",
              value:
                "ABO + Rh — indispensável antes de transfusão. Crossmatch de urgência se disponível",
              highlight: true,
            },
            {
              label: "β-HCG",
              value:
                "TODAS as mulheres em idade fértil — gravidez muda drasticamente o manejo (volume, radiação, cirurgia)",
              highlight: true,
            },
            {
              label: "Glicemia",
              value:
                "Hiper e hipoglicemia são lesões secundárias — corrigir ativamente",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "CRASH-2 Trial (NEJM 2010) — Ácido Tranexâmico no Trauma",
          text: "20.211 pacientes. TXA 1g IV em 10 min + 1g em 8h → redução de mortalidade por sangramento de 5,7% → 4,9% (p = 0,0035). NNT ≈ 67. JANELA TERAPÊUTICA CRÍTICA: > 3 horas do trauma há aumento de mortalidade (efeito pró-trombótico sem benefício hemostático). Dose: 1g bolus lento + 1g em 8h. Indicado: PAS < 90 OU FC > 110 dentro de 3h do trauma.",
        },
      ],
    },
  },
  {
    id: "secundaria",
    name: "Aval. Secundária",
    color: "#84CC16",
    content: {
      title: "Avaliação Secundária — AMPLE e Exame Físico",
      blocks: [
        {
          type: "alert",
          color: "#84CC16",
          title: "Avaliação Secundária Só Começa Após Primária Estabilizada",
          text: "A avaliação secundária é o exame físico da cabeça aos pés após o controle das ameaças imediatas à vida. Se o paciente descompensa durante a secundária → voltar imediatamente ao XABCDE (primária).",
        },
        {
          type: "grid",
          title: "AMPLE — História Dirigida no Trauma",
          items: [
            {
              label: "A — Alergias",
              value:
                "Alergias medicamentosas — especialmente látex, antibióticos, contraste iodado",
              highlight: false,
            },
            {
              label: "M — Medicamentos",
              value:
                "Anticoagulantes (Warfarina, Dabigatran, Rivaroxabana), antiplaquetários, insulina, betabloqueadores — impactam o manejo",
              highlight: true,
            },
            {
              label: "P — Passado Médico / Cirúrgico",
              value:
                "Cirurgias abdominais prévias, hepatopatia, nefropatia, cardiopatia — risco cirúrgico e complicações",
              highlight: false,
            },
            {
              label: "L — Last Meal (Última Refeição)",
              value:
                "Risco de broncoaspiração durante IOT e anestesia — jejum recente = IOT com sequência rápida",
              highlight: true,
            },
            {
              label: "A — Ambiente / Evento",
              value:
                "Ambiente onde ocorreu o trauma — incêndio (CO, cianeto), afogamento, soterramento, temperatura extrema",
              highlight: true,
            },
          ],
        },
        {
          type: "flow",
          title: "Exame Físico Completo — Da Cabeça aos Pés",
          steps: [
            {
              text: "CABEÇA E FACE: couro cabeludo, crânio, pupilas, ouvidos (otorreia), nariz, boca, mandíbula",
              color: "#84CC16",
            },
            {
              text: "PESCOÇO: veias jugulares, traqueia, coluna cervical, sopros carotídeos",
              color: "#0EA5E9",
            },
            {
              text: "TÓRAX: inspeção completa, ausculta, percussão, costelas, esterno, clavículas",
              color: "#6366F1",
            },
            {
              text: "ABDOME: inspeção, ausculta, palpação, percussão — procurar rigidez, distensão, hematomas",
              color: "#EC4899",
            },
            {
              text: "PELVE E PERÍNEO: compressão lateral e anterior única (repetir agrava sangramento), uretra, vagina, reto",
              color: "#F59E0B",
            },
            {
              text: "MEMBROS: pulsos, perfusão, fraturas, deformidades, compartimentos",
              color: "#F97316",
            },
            {
              text: "DORSO / LOG-ROLL: coluna torácica e lombar, glúteos, região sacral, reto (tônus)",
              color: "#10B981",
            },
          ],
        },
        {
          type: "grid",
          title: "Rever o Torniquete na Avaliação Secundária",
          items: [
            {
              label: "Reavaliação obrigatória",
              value:
                "Verificar posicionamento, tempo de aplicação (anotar hora), presença de pulso distal",
              highlight: true,
            },
            {
              label: "Conversão",
              value:
                "Se estável e hemostasia possível → converter para packing + curativo compressivo para aumentar tempo de segurança",
              highlight: false,
            },
            {
              label: "NÃO soltar sem preparo",
              value:
                "Nunca remover torniquete sem ter controle da fonte do sangramento — síndrome de reperfusão pode ser letal",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Profilaxia Antitetânica na Avaliação Secundária",
          text: "Toda ferida contaminada ou profunda → verificar status vacinal. Vacinado nos últimos 5 anos: nada. 5–10 anos: reforço com toxoide (dT ou dTpa). > 10 anos ou sem vacinação: toxoide + imunoglobulina antitetânica (TIG 250–500 UI IM em sítio diferente). Feridas limpas superficiais: reforço se > 10 anos.",
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "TC de Corpo Inteiro (Pan-scan) — Critérios de Alta Energia",
          text: "Indicar se: > 3 metros de queda | Automobilístico > 60 km/h | Moto > 40 km/h | Capotamento | Ejeção do veículo | Óbito na cena | Mecanismo desconhecido. Cabeça + coluna + tórax + abdome + pelve com contraste. Diagnóstico de cabeça e pelve é especialmente dependente do pan-scan.",
        },
      ],
    },
  },
];

export default function Politrauma() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Cirurgia do Trauma"
      title="Politrauma — Guia Completo"
    />
  );
}
