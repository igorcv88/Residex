import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "classificacao",
    name: "Classificação",
    color: "#6366F1",
    content: {
      title: "Idade Gestacional, Peso e Adequação",
      blocks: [
        {
          type: "grades",
          title: "Classificação por Idade Gestacional",
          organ: "IG",
          grades: [
            {
              grade: "Extremo",
              color: "#EF4444",
              items: [
                "< 28 semanas — extremamente prematuro",
                "Risco máximo de reanimação complexa, surfactante, hipotermia neonatal",
                "Sala de parto com equipe neonatal completa SEMPRE presente",
              ],
            },
            {
              grade: "Muito Prem.",
              color: "#F97316",
              items: [
                "29 a 33 semanas e 6 dias — muito prematuro",
                "Alto risco de SDR, apneia, instabilidade hemodinâmica",
                "Intubação profilática de surfactante vs CPAP inicial — depende de IG e clínica",
              ],
            },
            {
              grade: "Tardio",
              color: "#F59E0B",
              items: [
                "34 a 36 semanas e 6 dias — prematuro tardio",
                "Maior risco de hipoglicemia, hipotermia, dificuldade de sucção e sepse",
                "Não tratar como RN a termo — monitorização intensiva",
              ],
            },
            {
              grade: "Termo",
              color: "#10B981",
              items: [
                "37 a 41 semanas e 6 dias — RN a termo",
                "Reanimação conforme avaliação dos 3 critérios ao nascimento",
              ],
            },
            {
              grade: "Pós-Termo",
              color: "#84CC16",
              items: [
                "> 42 semanas — pós-termo",
                "Risco de síndrome de aspiração de mecônio, insuficiência placentária",
                "Líquido amniótico meconial: atenção especial no fluxograma",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Classificação por Peso ao Nascer",
          items: [
            {
              label: "Extremo Baixo Peso",
              value:
                "< 1.000g — altíssimo risco. Mortalidade inversamente proporcional ao peso. Sala aquecida a 26°C + saco plástico sem secar.",
              highlight: true,
            },
            {
              label: "Muito Baixo Peso",
              value:
                "1.000 – 1.499g — alto risco. Saco plástico + touca de lã/plástico + campo aquecido.",
              highlight: true,
            },
            {
              label: "Baixo Peso",
              value:
                "1.500 – 2.499g — risco intermediário. Secar vigorosamente + campo aquecido.",
            },
            {
              label: "Peso Normal",
              value:
                "> 2.500g — risco habitual. Avaliação dos 3 critérios ao nascimento determina conduta.",
            },
          ],
        },
        {
          type: "decision",
          title: "Adequação para a Idade Gestacional",
          decisions: [
            {
              condition: "AIG — Adequado para IG",
              color: "#10B981",
              actions: [
                "Peso entre P10 e P90 para a IG",
                "Crescimento intrauterino normal",
                "Menor risco de hipoglicemia por restrição de crescimento",
              ],
            },
            {
              condition: "PIG — Pequeno para IG",
              color: "#EF4444",
              actions: [
                "Peso < P10 para a IG — RCIU (Restrição de Crescimento Intrauterino)",
                "Alto risco de hipoglicemia nas primeiras horas — glicemia < 47 mg/dL",
                "Risco aumentado de policitemia, hipotermia e necessidade de reanimação",
              ],
            },
            {
              condition: "GIG — Grande para IG",
              color: "#F59E0B",
              actions: [
                "Peso > P90 para a IG — filho de mãe diabética, macrossomia",
                "Risco de hipoglicemia neonatal por hiperinsulinismo fetal",
                "Risco de tocotraumatismo (distocia de ombro, lesão de plexo braquial)",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Por que Classificar antes da Reanimação?",
          text: "A IG ao nascer determina CADA etapa da reanimação: (1) o limiar de saturação alvo pelo oxímetro muda com a IG; (2) < 34 semanas não recebe os 3 critérios simples de 'vai para o colo' — vai direto para a mesa aquecida; (3) < 28 semanas vai para saco plástico sem secar; (4) a concentração inicial de O₂ é 21% no termo e 21–30% no prematuro. A classificação correta na sala de parto evita erros graves que ocorrem quando prematuros tardios (34–36 semanas) são manejados como RN a termo. SBP 2021 e ILCOR 2021 reforçam a estratificação por IG como etapa zero da reanimação.",
        },
      ],
    },
  },
  {
    id: "anteparto",
    name: "Anteparto",
    color: "#EC4899",
    content: {
      title: "Fatores de Risco, Preparo e Equipe",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Toda Sala de Parto Deve Estar Preparada para Reanimação",
          text: "10% dos RN necessitam de alguma manobra de reanimação e 1% precisa de reanimação completa (VPP + compressões + drogas). A presença antecipada de profissional habilitado em reanimação neonatal é obrigatória em TODOS os partos. Em partos de alto risco, mínimo 2 profissionais exclusivos para o RN: 1 para manobras de vias aéreas e 1 para compressões/acesso venoso. SBP 2021: a antecipação dos fatores de risco é a intervenção mais eficaz para reduzir mortalidade perinatal.",
        },
        {
          type: "grid",
          title: "Fatores de Risco Anteparto",
          items: [
            {
              label: "IG < 36 semanas",
              value:
                "Prematuridade em qualquer grau é o principal fator de risco individual. Quanto menor a IG, maior a probabilidade e complexidade da reanimação.",
              highlight: true,
            },
            {
              label: "Diabetes Materna",
              value:
                "Hipoglicemia neonatal, macrossomia, tocotraumatismo. Controle glicêmico pré-natal influencia diretamente o desfecho neonatal.",
              highlight: true,
            },
            {
              label: "Hipertensão Materna",
              value:
                "RCIU, oligodrâmnio, insuficiência placentária. Uso de sulfato de magnésio (tocólise) pode causar depressão neonatal.",
            },
            {
              label: "Uso de Drogas / Opioides",
              value:
                "Depressão respiratória por opioides maternos intraparto → considerar naloxona. Uso crônico → síndrome de abstinência neonatal.",
            },
            {
              label: "Infecção Materna / Febre",
              value:
                "Corioamnionite, febre intraparto → risco de sepse neonatal precoce. Antibioticoterapia materna influencia conduta neonatal (ver sepse neonatal).",
            },
            {
              label: "Anomalias Fetais / Oligodrâmnio",
              value:
                "Má-formações cardiovasculares, pulmonares ou abdominais elevam muito a complexidade. Equipe especializada com material específico.",
            },
          ],
        },
        {
          type: "grid",
          title: "Fatores de Risco Intraparto",
          items: [
            {
              label: "Líquido Amniótico Meconial",
              value:
                "Meconial espesso: risco de síndrome de aspiração de mecônio. RN vigoroso (choro + tônus bom): NÃO aspirar rotineiramente — evidência Cochrane 2018 (JAMA Peds).",
              highlight: true,
            },
            {
              label: "Desacelerações Fetais Tardias",
              value:
                "Padrão de sofrimento fetal agudo. Equipe neonatal DEVE ser chamada. Impacto direto na disponibilidade de manobras de reanimação.",
              highlight: true,
            },
            {
              label: "Prolapso de Cordão",
              value:
                "Emergência obstétrica → comprometimento imediato do fluxo umbilical. Cesárea de emergência → RN com risco de asfixia grave.",
            },
            {
              label: "Descolamento Prematuro de Placenta",
              value:
                "Choque materno + hipoxia fetal aguda. RN pode nascer exangue. Ter volume (SF 10 mL/kg) e concentrado de hemácias disponível.",
            },
            {
              label: "Anestesia Geral Materna",
              value:
                "Depressão do SNC neonatal por agentes inalatórios ou barbitúricos. Intubação neonatal pode ser necessária.",
            },
            {
              label: "Parto Difícil / Instrumentado",
              value:
                "Fórcipe, vácuo extrator → risco de trauma cranioencefálico, hemorragia intracraniana, lesão medular cervical.",
            },
          ],
        },
        {
          type: "phases",
          title: "Equipe e Material — Preparo Obrigatório",
          phases: [
            {
              number: "EQ",
              name: "Equipe por Risco",
              color: "#EC4899",
              items: [
                "Parto de baixo risco: 1 profissional com habilidade em reanimação neonatal",
                "Parto de risco intermediário: 2 profissionais exclusivos para o RN",
                "< 34 semanas ou risco alto: 3–4 profissionais (médico neonatologista líder obrigatório)",
                "< 28 semanas: equipe máxima com neonatologista + técnico + enfermagem treinada",
              ],
            },
            {
              number: "MAT",
              name: "Material — Verificar Antes de Todo Parto",
              color: "#0EA5E9",
              items: [
                "Fonte de calor radiante LIGADA + campo aquecido",
                "Aspirador + sonda de aspiração (6, 8, 10Fr)",
                "Balão autoinflável (volume 250 mL) + máscaras 0 e 1",
                "Reanimador em T (T-piece) — PREFERENCIAL em prematuros",
                "Laringoscópio + lâmina 0 (< 34 sem) e 1 (≥ 34 sem) + cânulas traqueais 2.5/3.0/3.5",
                "Oxímetro de pulso + eletrodos de monitor cardíaco",
                "Adrenalina 1:10.000 + SF 0,9% + seringa + cateter umbilical",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Cânulas Traqueais — Tamanho por Idade Gestacional",
          text: "< 28 semanas: cânula 2.5. 28–34 semanas: cânula 3.0. > 34 semanas: cânula 3.5. Profundidade de inserção: IG/10 + 6 cm na comissura labial (regra prática). Confirmação: capnografia colorimétrica (CO₂ detector) + ausculta simétrica + expansão torácica bilateral. Rx de tórax confirma posição ideal: ponta da cânula 1–2 cm acima da carina (T2–T3). Cânulas com cuff NÃO são usadas rotineiramente em neonatos.",
        },
      ],
    },
  },
  {
    id: "fluxograma",
    name: "Fluxograma",
    color: "#F59E0B",
    content: {
      title: "Minuto de Ouro — Avaliação e Decisão ao Nascer",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "O Minuto de Ouro — Golden Minute",
          text: "O conceito do 'Minuto de Ouro' estabelece que a VPP deve ser iniciada dentro do PRIMEIRO MINUTO de vida se o RN apresentar apneia ou FC < 100 bpm após as manobras iniciais. Toda a sequência de avaliação (3 perguntas) e medidas iniciais (posicionar, secar/estimular, aspirar se necessário) deve ocorrer nos primeiros 30–60 segundos. Cada minuto de atraso no início da VPP aumenta a mortalidade e o risco de sequelas neurológicas em 16% (ILCOR 2021 — Wyckoff et al., Circulation). Tempo é cérebro no período neonatal.",
        },
        {
          type: "flow",
          title: "3 Perguntas ao Nascimento — ≥ 34 Semanas",
          steps: [
            {
              text: "1ª: RN a TERMO (37–41 semanas e 6 dias)?",
              color: "#F59E0B",
            },
            {
              text: "2ª: CHORANDO ou RESPIRANDO com regularidade?",
              color: "#F59E0B",
            },
            {
              text: "3ª: TÔNUS MUSCULAR bom (flexão dos membros)?",
              color: "#F59E0B",
            },
            {
              text: "✅ TODAS SIM → CLAMPEAMENTO TARDIO (≥ 60 seg) + SECAR A PELE + MANTER TEMPERATURA + ir para o COLO da mãe + avaliação contínua da vitalidade",
              color: "#10B981",
            },
            {
              text: "❌ QUALQUER NÃO → FONTE DE CALOR RADIANTE + Posicionar + Secar corpo e crânio + Aspirar SOMENTE se necessário (secreção obstruindo) + Avaliar após 30 seg",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "decision",
          title: "Conduta por Faixa de IG ao Nascer",
          decisions: [
            {
              condition: "≥ 34 SEMANAS",
              color: "#10B981",
              actions: [
                "Aplica as 3 perguntas — se TODAS sim → colo da mãe",
                "Clampeamento tardio ≥ 60 segundos (se vigoroso e sem necessidade de reanimação imediata)",
                "Se NÃO → fonte de calor + posicionar + secar vigorosamente + aspirar só se necessário",
                "Avaliar: respiração, FC, cor, tônus — após manobras iniciais",
                "Concentração inicial de O₂: 21% (ar ambiente) — NUNCA O₂ 100% de início",
              ],
            },
            {
              condition: "< 34 SEMANAS",
              color: "#EF4444",
              actions: [
                "NÃO aplica as 3 perguntas — VAI DIRETO para mesa aquecida",
                "Clampeamento tardio ≥ 60 segundos (se sem necessidade de reanimação imediata)",
                "NÃO secar — colocar no SACO PLÁSTICO até o pescoço (< 34 semanas)",
                "Touca de lã ou plástico + campo aquecido por cima",
                "Sala aquecida: 23–25°C; < 28 semanas: sala a 26°C",
                "Concentração inicial de O₂: 21–30% — ajustar pelo oxímetro",
                "Considerar CPAP precoce em vez de intubação se respiração espontânea",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Avaliação da Vitalidade — O Que Olhar e Como",
          items: [
            {
              label: "Frequência Cardíaca — Parâmetro Principal",
              value:
                "FC é o PRINCIPAL PARÂMETRO para todas as decisões da reanimação. Ausculta cardiaca por 6 segundos × 10 = FC/min. Monitor cardíaco de 3 eletrodos: mais preciso que oxímetro ou ausculta na FC baixa.",
              highlight: true,
            },
            {
              label: "FC > 100 bpm",
              value:
                "Reanimação eficaz ou RN vigoroso. Desmame progressivo da VPP. Monitorar saturação.",
            },
            {
              label: "FC 60–99 bpm",
              value:
                "VPP imediata com técnica correta. Avaliar eficácia pela elevação da FC. Se sem melhora em 30 seg → ventilação via cânula traqueal + compressões.",
            },
            {
              label: "FC < 60 bpm",
              value:
                "VPP + compressões cardíacas simultaneamente. Se não melhorar → adrenalina.",
              highlight: true,
            },
            {
              label: "Respiração/Choro",
              value:
                "Choro vigoroso = via aérea pérvia + drive respiratório presente. Apneia primária vs secundária: distinguir pela resposta à estimulação. Apneia que não responde → VPP imediata.",
            },
            {
              label: "Saturação O₂ Pré-Ductal",
              value:
                "Oxímetro: mão ou punho DIREITO (pré-ductal). Saturação normal ao nascer NÃO é 95–100% — veja a curva por minuto de vida.",
              highlight: true,
            },
          ],
        },
        {
          type: "grades",
          title: "Saturação Pré-Ductal Esperada por Minuto de Vida (SBP 2021)",
          organ: "Minuto",
          grades: [
            {
              grade: "1 min",
              color: "#EF4444",
              items: ["60–65% — normal ao nascer, não alarmar"],
            },
            { grade: "2 min", color: "#F97316", items: ["65–70%"] },
            { grade: "3 min", color: "#F59E0B", items: ["70–75%"] },
            { grade: "4 min", color: "#84CC16", items: ["75–80%"] },
            { grade: "5 min", color: "#10B981", items: ["80–85%"] },
            {
              grade: "10 min",
              color: "#6366F1",
              items: ["85–95% — alvo atingido"],
            },
          ],
        },
        {
          type: "obs",
          title:
            "Líquido Amniótico Meconial — Mudança de Paradigma (JAMA Pediatrics 2015)",
          text: "A aspiração orofaríngea intraparto foi ABANDONADA pelas diretrizes SBP 2021 e ILCOR 2021 — não reduz síndrome de aspiração de mecônio (SAM) e atrasa o início da reanimação. Para RN com líquido MECONIAL ESPESSO: (1) Se VIGOROSO (choro + tônus bom + FC > 100) → clampeamento tardio + colo da mãe + observação. (2) Se NÃO VIGOROSO (apneia ou tônus flácido) → VPP imediata; intubação e aspiração subglótica apenas se houver grande quantidade de mecônio e obstrução das vias aéreas confirmada — não mais de forma sistemática. Estudo RCT multinacional (Gupta et al., NEJM 2019) não demonstrou benefício da aspiração traqueal profilática.",
        },
      ],
    },
  },
  {
    id: "vpp",
    name: "VPP",
    color: "#0EA5E9",
    content: {
      title: "Ventilação com Pressão Positiva — Técnica e Dispositivos",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "VPP — A Intervenção Mais Importante da Reanimação Neonatal",
          text: "A VPP é a principal e mais importante manobra da reanimação neonatal. Indicações: FC < 100 bpm OU apneia/respiração irregular APÓS 30 segundos das manobras iniciais. Frequência: 40–60 incursões/minuto. Mnemônico: 'VENTILA... VENTILA... VENTILA...' (1 segundo para inspirar, 1 para expirar). Pressão de pico inicial: 20–25 cmH₂O no termo; 20 cmH₂O no prematuro. PEEP: 5 cmH₂O (apenas com T-piece ou bolsa-válvula). Avaliar eficácia pela FC: deve subir dentro de 15–30 segundos de VPP eficaz.",
        },
        {
          type: "decision",
          title: "Dispositivos de VPP — Bolsa Autoinflável vs Reanimador em T",
          decisions: [
            {
              condition: "REANIMADOR em T (T-PIECE) — PREFERENCIAL",
              color: "#0EA5E9",
              actions: [
                "Dispositivo de escolha para PREMATUROS (< 34 semanas)",
                "Oferece PEEP controlada (5 cmH₂O) — fundamental para abrir alvéolos prematuros",
                "Pressão de pico ajustável e constante (PIP controlada)",
                "Requer fonte de gás pressurizado (ar comprimido ou misturador O₂)",
                "Permite ventilação consistente independente do operador",
                "NÃO pode ser usado sem fonte de gás — ter AMBU disponível como backup",
              ],
            },
            {
              condition: "BOLSA AUTOINFLÁVEL (AMBU)",
              color: "#6366F1",
              actions: [
                "Funciona SEM fonte de gás pressurizado — transporte, emergências",
                "Volume: 250 mL para neonatos — NUNCA usar bolsa adulta",
                "SEM PEEP intrínseca (a menos que use válvula de PEEP acoplada)",
                "Pressão variável — depende da força do operador: risco de barotrauma",
                "Reservatório de O₂: permite FiO₂ de 90–100% (remover se quiser ar ambiente)",
                "Mnemônico de verificação: 'CONTA 7 — RAM-PUF' → VENTILA (1) dois (2) três (3)",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Técnica da VPP — MRPA (Mnemônico SBP)",
          items: [
            {
              label: "M — Máscara",
              value:
                "Tamanho 0 (prematuros) ou 1 (a termo). Cobrir nariz E boca — não os olhos. Apoio no mento. Vedação sem compressão excessiva.",
              highlight: true,
            },
            {
              label: "R — Respiração",
              value:
                "40–60 ventilações por minuto. Observar expansão torácica SIMÉTRICA e DISCRETA. Expansão excessiva = pressão excessiva = risco de pneumotórax.",
              highlight: true,
            },
            {
              label: "P — Pressão",
              value:
                "PIP inicial: 20–25 cmH₂O (termo) / 20 cmH₂O (prematuro). Aumentar se não houver expansão torácica. PEEP: 5 cmH₂O.",
            },
            {
              label: "A — Avaliação",
              value:
                "Após 30 segundos de VPP: avaliar FC, saturação, respiração. FC é o principal parâmetro de sucesso.",
            },
          ],
        },
        {
          type: "flow",
          title: "VPP Não Está Ventilando — Sequência OTOV",
          steps: [
            {
              text: "O — Orifício (Obstrução): verificar se máscara está vedando e via aérea livre",
              color: "#0EA5E9",
            },
            {
              text: "T — Técnica: reposicionar a cabeça em leve extensão (posição de farejamento); verificar posição da máscara",
              color: "#0EA5E9",
            },
            {
              text: "O — Open mouth: abrir a boca do RN levemente + aspirar boca e narinas se secreção",
              color: "#6366F1",
            },
            {
              text: "V — Volume/Pressão: aumentar a pressão de pico em 5–10 cmH₂O; considerar sonda gástrica (6Fr) para descomprimir o estômago",
              color: "#6366F1",
            },
            {
              text: "Sem melhora → INTUBAÇÃO ENDOTRAQUEAL ou MÁSCARA LARÍNGEA (≥ 34 semanas e ≥ 1500g)",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "grades",
          title: "Concentração de O₂ na VPP — Por IG (SBP 2021 / ILCOR 2021)",
          organ: "IG",
          grades: [
            {
              grade: "≥ 35 sem",
              color: "#10B981",
              items: [
                "Iniciar com 21% (ar ambiente) — O₂ 100% causa lesão oxidativa em RN a termo",
                "Aumentar para atingir saturação-alvo pelo oxímetro (tabela de saturação por minuto)",
              ],
            },
            {
              grade: "< 35 sem",
              color: "#F59E0B",
              items: [
                "Iniciar com 21–30% — misturador de O₂ obrigatório",
                "Ajustar FiO₂ pela curva de saturação pré-ductal",
                "Evitar hiperóxia: SpO₂ > 95% nos primeiros minutos → reduzir O₂",
              ],
            },
            {
              grade: "< 28 sem",
              color: "#EF4444",
              items: [
                "Iniciar com 30% — consenso SBP/AAP para prematuros extremos",
                "Aumentar gradualmente se SpO₂ abaixo da curva para a idade em minutos",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Máscara Laríngea — Quando Usar (SBP 2021)",
          text: "Indicada em RN ≥ 34 semanas OU ≥ 1.500g quando a VPP com máscara facial é ineficaz (OTOV realizado) E a intubação falhou ou não é viável. É uma alternativa de resgate para via aérea difícil. Tamanho 1 para RN. Inserção rápida: gel lubrificante + posicionar com o cuff desinflado + insuflar com ar após posicionar. Não permite aspiração traqueal de mecônio. NÃO é indicada rotineiramente — reservada para casos específicos. Evidência Cochrane (O'Donnell, 2018): eficácia comparável à intubação em RN ≥ 34 semanas que precisam de VPP prolongada.",
        },
      ],
    },
  },
  {
    id: "compressao",
    name: "Compressão / Drogas",
    color: "#EF4444",
    content: {
      title: "Massagem Cardíaca, Adrenalina e Expansores de Volume",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Compressão Cardíaca — Indicação e Sincronismo",
          text: "INDICAÇÃO: FC < 60 bpm após 30 segundos de VPP EFICAZ com O₂ 100%. NUNCA iniciar compressão antes de garantir ventilação adequada — a causa mais comum de FC baixa no RN é ventilação ineficaz. A FC de 60 bpm é o limiar porque abaixo deste valor o débito cardíaco é insuficiente para perfusão coronariana. Ao iniciar compressão: aumentar FiO₂ para 100% e chamar equipe adicional para preparo de acesso venoso umbilical.",
        },
        {
          type: "phases",
          title: "Técnica da Massagem Cardíaca",
          phases: [
            {
              number: "3:1",
              name: "Relação Compressão:Ventilação",
              color: "#EF4444",
              items: [
                "3 compressões + 1 ventilação = 1 ciclo",
                "90 compressões + 30 ventilações por minuto = 120 eventos/minuto",
                "Mnemônico: 'UM-DOIS-TRÊS-VENTILA' (cadência constante)",
                "Diferente do adulto (30:2) e da criança (15:2) — específico para o RN",
                "Não interromper compressão para ventilar — sincronizado",
              ],
            },
            {
              number: "2P",
              name: "Técnica dos Dois Polegares (PREFERENCIAL)",
              color: "#F97316",
              items: [
                "Mãos envolvem o tórax com os polegares SOBREPOSTOS no terço inferior do esterno",
                "Mais eficaz que a técnica dos 2 dedos: maior pressão sistólica, menor fadiga",
                "Profundidade: 1/3 do diâmetro anteroposterior do tórax",
                "Permitir expansão completa do tórax entre as compressões (descompressão ativa)",
                "PREFERENCIAL quando há 2 profissionais",
              ],
            },
          ],
        },
        {
          type: "flow",
          title: "Avaliação Após 30 Segundos de Massagem + VPP",
          steps: [
            {
              text: "FC ≥ 60 bpm → SUSPENDER compressão → manter VPP → reduzir O₂ gradualmente",
              color: "#10B981",
            },
            {
              text: "FC 60–99 bpm → manter VPP + O₂ → reavaliar em 30 seg → desmame progressivo se FC continua subindo",
              color: "#F59E0B",
            },
            {
              text: "FC < 60 bpm após 60 seg de compressão + VPP eficaz → ADRENALINA",
              color: "#EF4444",
            },
            {
              text: "FC = 0 após compressão + adrenalina × 3 doses → considerar SUSPENSÃO da reanimação após 20 min (critérios SBP + família)",
              color: "#6366F1",
            },
          ],
        },
        {
          type: "grid",
          title: "Adrenalina — Dose, Via e Concentração",
          items: [
            {
              label: "Concentração Correta — DILUIÇÃO OBRIGATÓRIA",
              value:
                "Adrenalina 1:10.000 (0,1 mg/mL). Se disponível apenas 1:1.000 → DILUIR 1 mL em 9 mL de SF 0,9% → obter 1:10.000. NUNCA usar 1:1.000 sem diluir.",
              highlight: true,
            },
            {
              label: "Via Endovenosa (CATETER UMBILICAL) — PREFERENCIAL",
              value:
                "Dose: 0,01–0,03 mg/kg IV = 0,1–0,3 mL/kg da solução 1:10.000. Cateter venoso umbilical: inserir 2–4 cm até refluxo sanguíneo livre. Flush com 0,5–1 mL de SF após cada dose.",
              highlight: true,
            },
            {
              label: "Via Endotraqueal — Menor Eficácia",
              value:
                "Apenas enquanto acesso IV não disponível. Dose: 0,05–0,1 mg/kg ET = 0,5–1 mL/kg da solução 1:10.000. Absorção imprevisível — transicionar para IV assim que possível.",
            },
            {
              label: "Intervalo e Repetição",
              value:
                "Repetir a cada 3–5 minutos. Máximo 3–4 doses. Após cada dose ET: 5 ventilações para dispersão pulmonar.",
            },
          ],
        },
        {
          type: "decision",
          title: "Expansor de Volume — Quando e Quanto",
          decisions: [
            {
              condition: "INDICAÇÃO de Volume",
              color: "#0EA5E9",
              actions: [
                "FC < 60 bpm persistente APÓS VPP + compressão + adrenalina",
                "Suspeita de hipovolemia: palidez persistente + pulsos finos + DPP, prolapso de cordão, placenta prévia",
                "Resposta inadequada à reanimação sem causa identificada",
              ],
            },
            {
              condition: "COMO ADMINISTRAR",
              color: "#10B981",
              actions: [
                "SF 0,9% — expansor de escolha: 10 mL/kg IV lento em 5–10 minutos",
                "Concentrado de hemácias tipo O negativo: se anemia grave confirmada ou suspeita (DPP, prolapso)",
                "VIA: cateter venoso umbilical",
                "Repetir se necessário (máx 2–3 doses): reavaliar FC e perfusão após cada",
                "ATENÇÃO: volume excessivo em prematuro → HIV (hemorragia intraventricular)",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Cateter Venoso Umbilical — Inserção de Emergência",
          text: "O cateter umbilical venoso (CVU) é o acesso de eleição na reanimação neonatal para adrenalina e volume. Técnica de emergência ('low and dirty'): cortar o cordão a 2–3 cm da pele + identificar a veia umbilical (1 vaso, orifício maior, parede fina) + inserir cateter 4Fr ou 5Fr até 2–4 cm de profundidade (refluxo de sangue livre = posição adequada) + fixar com fita ou ponto simples. NÃO inserir profundamente em emergência (risco de posição hepática). A inserção leva 30–60 segundos quando treinada. O CVU permite adrenalina, volume e coleta de gasometria.",
        },
      ],
    },
  },
  {
    id: "pos-reanimacao",
    name: "Pós-Reanimação",
    color: "#10B981",
    content: {
      title: "Clampeamento, Hipotermia, Surfactante e Cuidados Pós-Reanimação",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Clampeamento Tardio do Cordão (DCC) — Evidência Nível 1",
          text: "O clampeamento tardio do cordão (DCC — Delayed Cord Clamping) ≥ 60 segundos é RECOMENDADO por SBP 2021, ACOG 2020, WHO 2012 e ILCOR 2021 para RN VIGOROSOS de qualquer IG. Benefícios documentados: ↑ Hb e ferritina nos primeiros meses, ↓ necessidade de transfusão em prematuros, ↓ incidência de hemorragia intraventricular em RNPT, possível proteção neurológica. Benefício dose-resposta: quanto maior o tempo (até 3 minutos), maior a transfusão placentária. CONTRAINDICAÇÃO: RN que necessita de reanimação imediata — nesse caso, clampear imediatamente e transferir para mesa.",
        },
        {
          type: "decision",
          title: "Clampeamento — Momentos e Decisões",
          decisions: [
            {
              condition: "CLAMPEAMENTO TARDIO (≥ 60 seg) — Padrão",
              color: "#10B981",
              actions: [
                "RN vigoroso: choro + tônus bom + FC > 100",
                "≥ 34 semanas: aguardar ≥ 60 segundos a 1 metro abaixo do introito vaginal",
                "< 34 semanas: aguardar ≥ 60 segundos — mesmo benefício ou maior em prematuros",
                "Ordenha do cordão (milking) 4–5 vezes: alternativa se DCC não for viável — evidência emergente",
                "Nível do bebê: pode ser mantido no nível da placenta (sem necessidade de elevar)",
              ],
            },
            {
              condition: "CLAMPEAMENTO IMEDIATO — Exceções",
              color: "#EF4444",
              actions: [
                "RN NÃO VIGOROSO que necessita de reanimação imediata na mesa",
                "Circulação placentária distressada (prolapso de cordão, DPP)",
                "Hemorragia materna grave comprometendo o volume circulante",
                "Rh negativo com isoimunização ativa",
                "Cordão muito curto (impossível manter o bebê posicionado)",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Hipotermia Terapêutica — Encefalopatia Hipóxico-Isquêmica",
          items: [
            {
              label: "Critérios de Elegibilidade",
              value:
                "≥ 36 semanas + ≥ 1800g + ≤ 6 horas de vida + encefalopatia moderada ou grave (Sarnat II–III ou Thompson ≥ 7) + EHI confirmada (pH < 7,0 ou BE < −16 no cordão, ou Apgar ≤ 5 no 10° min).",
              highlight: true,
            },
            {
              label: "Protocolo de Hipotermia",
              value:
                "Meta de temperatura corporal central: 33–34°C por 72 horas. Reaquecimento lento: 0,5°C por hora ao final das 72h. NÃO iniciar em < 36 semanas — risco de HIV e instabilidade.",
              highlight: true,
            },
            {
              label: "Benefício Documentado",
              value:
                "NNT: ~7–8 para reduzir morte ou incapacidade grave (meta-análise Jacobs et al., Cochrane 2013; confirmada por TOBY, CoolCap e NICHD trials). Reduz mortalidade em ~25% e incapacidade em ~25% em elegíveis.",
            },
            {
              label: "Evitar na Sala de Parto",
              value:
                "NÃO expor o RN ao frio passivamente como 'hipotermia' — risco sem controle de temperatura. Iniciar hipotermia ATIVA controlada em UTI com equipamento específico ou bolsas de gelo + monitorização contínua.",
            },
            {
              label: "Pré-Hipotermia — Evitar",
              value:
                "NUNCA administrar: soluções hipotônicas, glicose 50%, bicarbonato de sódio, sulfato de magnésio ou fenitoína antes da confirmação do protocolo — alteram desfechos.",
            },
            {
              label: "EEG e RM",
              value:
                "EEG amplitudeintegrado (aEEG): avaliar atividade de fundo nas primeiras horas. RM encefálica: realizar no 4°–7° dia de vida — preditor de desfecho neurológico.",
            },
          ],
        },
        {
          type: "phases",
          title: "Surfactante — Estratégias de Administração",
          phases: [
            {
              number: "INSURE",
              name: "Intubação-Surfactante-Extubação",
              color: "#0EA5E9",
              items: [
                "Intubar + administrar surfactante + extubar para CPAP em minutos",
                "Padrão histórico — ainda usado quando LISA não disponível",
                "Risco: necessidade de sedação, barotrauma, instabilidade na extubação",
              ],
            },
            {
              number: "LISA/MIST",
              name: "Surfactante Minimamente Invasivo (PREFERENCIAL)",
              color: "#10B981",
              items: [
                "Less Invasive Surfactant Administration — RN em CPAP respirando espontaneamente",
                "Sonda gástrica fina (4–5Fr) introduzida na traqueia por laringoscopia direta",
                "Infundir surfactante com RN em respiração espontânea no CPAP",
                "Metanálise (Aldana-Aguirre, 2017): menor necessidade de VM e menor DBP vs INSURE",
                "Recomendado por SBP 2021 para < 32 semanas em CPAP necessitando surfactante",
                "Dose: Beractante 100–200 mg/kg OU Poractante 100–200 mg/kg",
              ],
            },
          ],
        },
        {
          type: "flow",
          title: "Cuidados Pós-Reanimação — Checklist",
          steps: [
            {
              text: "1. Monitorização contínua: SpO₂ pré-ductal, FC, FR, temperatura axial, glicemia capilar",
              color: "#10B981",
            },
            {
              text: "2. Glicemia: ≥ 47 mg/dL na primeira hora. Hipoglicemia neonatal: glicose 10% 2 mL/kg IV se sintomática ou < 25 mg/dL",
              color: "#10B981",
            },
            {
              text: "3. Hipotermia terapêutica: avaliar critérios de EHI — iniciar se elegível em ≤ 6h de vida",
              color: "#0EA5E9",
            },
            {
              text: "4. Gasometria arterial: pH < 7,1 + lactato > 8 + BE < −12 = acidose grave. Gasometria de cordão umbilical: colher imediatamente pós-parto",
              color: "#6366F1",
            },
            {
              text: "5. Comunicar à família: condição do RN, procedimentos realizados e plano terapêutico. Concordância com a família em situações de ressuscitação prolongada",
              color: "#F59E0B",
            },
            {
              text: "6. Suspensão da reanimação: após 20 minutos de reanimação completa sem FC detectável — decisão médica + família informada (SBP 2021 / ILCOR 2021)",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "obs",
          title: "Quando NÃO Iniciar a Reanimação (SBP 2021 / ILCOR 2021)",
          text: "A decisão de não iniciar ou suspender a reanimação é eticamente complexa e deve envolver a família. NÃO iniciar reanimação: IG ≤ 22 semanas completas (limiar de viabilidade — análise caso a caso); anomalias letais confirmadas (anencefalia, trissomia 13 ou 18 com confirmação pré-natal). SUSPENDER após 20 minutos: FC indetectável após reanimação completa e contínua por ≥ 20 minutos — taxa de sobrevivência com desfecho neurológico favorável é extremamente baixa. Exceção: hipotermia acidental profunda do RN → estender esforços. Toda decisão deve ser documentada com participação da família.",
        },
      ],
    },
  },
];

export default function ReanimacaoNeonatal() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Pediatria"
      title="Reanimação Neonatal — Guia Completo"
    />
  );
}
