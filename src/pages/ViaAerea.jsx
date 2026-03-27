import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: "sala-trauma",
    name: "Sala de Trauma",
    color: "#0EA5E9",
    content: {
      title: "Abordagem Inicial da Via Aérea na Sala de Trauma",
      blocks: [
        {
          type: "alert",
          color: "#0EA5E9",
          title: "O₂ Suplementar para TODOS — Ato Reflexo",
          text: "Todo politraumatizado recebe O₂ suplementar imediatamente — máscara não-reinalante 15 L/min. Não aguardar saturação cair. Oxigenação é a primeira prioridade antes de qualquer decisão sobre via aérea definitiva.",
        },
        {
          type: "decision",
          title: "Respiração Ruidosa — Obstrução de Via Aérea",
          decisions: [
            {
              condition: "Corpo Estranho Visível",
              color: "#EF4444",
              actions: [
                "REMOÇÃO com pinça de Magill — visibilizar com laringoscópio antes de tentar",
                "Nunca fazer varredura digital cega — pode empurrar o corpo estranho para mais fundo",
              ],
            },
            {
              condition: "Sangramento Ativo na VA",
              color: "#EC4899",
              actions: [
                "ASPIRAÇÃO imediata — cânula rígida de Yankauer",
                "Posicionar em decúbito lateral se não houver contraindicação de coluna",
              ],
            },
            {
              condition: "Queda da Base da Língua",
              color: "#F59E0B",
              actions: [
                "Manobras manuais: Jaw Thrust (empurrar mandíbula anteriormente) — preferível no trauma (não movimenta coluna)",
                "Chin Lift (elevação do mento) — apenas se trauma cervical descartado",
                "Cânula orofaríngea (Guedel): provoca vômito em acordados — só em ECG < 8",
                "Cânula nasofaríngea: melhor tolerada em semiconscientes — CONTRAINDICADA em fratura de base de crânio",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Jaw Thrust vs Chin Lift no Trauma",
          text: "O Jaw Thrust é a manobra de escolha no trauma porque desloca a mandíbula anteriormente sem extensão do pescoço, minimizando o risco de lesão cervical. O Chin Lift requer extensão cervical — contraindicado se coluna não for descartada. Em crianças: cânula orofaríngea inserida diretamente (não com rotação de 180°) — usar abaixador de língua para visualizar e passar a cânula diretamente.",
        },
        {
          type: "grid",
          title: "Cânulas Orofaríngea vs Nasofaríngea",
          items: [
            { label: "Cânula Orofaríngea (Guedel)", value: "Provoca vômito em pacientes com reflexo presente. Só usar em ECG ≤ 8. Tamanho: lóbulo da orelha → comissura labial", highlight: true },
            { label: "Cânula Nasofaríngea", value: "Melhor tolerada em semiconscientes (ECG 9–12). CONTRAINDICADA em fratura de base de crânio. Lubrificar antes de inserir", highlight: true },
            { label: "Crianças — Guedel", value: "Inserir diretamente com abaixador de língua + passa a cânula diretamente (não rotacionar 180°)", highlight: false },
            { label: "Tamanho Guedel", value: "0 (lactente) → 1 → 2 → 3 → 4 (adulto médio) → 5 (adulto grande). Medir: lábio → ângulo da mandíbula", highlight: false },
          ],
        },
      ],
    },
  },
  {
    id: "dispositivos",
    name: "Dispositivos",
    color: "#10B981",
    content: {
      title: "Dispositivos de Via Aérea — Básicos e Avançados",
      blocks: [
        {
          type: "grades",
          title: "Dispositivos Básicos",
          organ: "VA",
          grades: [
            {
              grade: "AMBU",
              color: "#10B981",
              items: [
                "Alto fluxo + Pressão Positiva — ventilação com máscara-bolsa-válvula",
                "Indicação: apneia, hipoventilação grave, pré-oxigenação otimizada antes de IOT",
                "Técnica C-E: dedos C seguram a máscara, dedos E tracionam a mandíbula. Vedação é fundamental",
                "Risco: distensão gástrica → broncoaspiração. Pressão de pico deve ser mínima necessária",
              ],
            },
            {
              grade: "CN (Cateter Nasal)",
              color: "#0EA5E9",
              items: [
                "Hipoxemia LEVE — FiO₂ estimada: 24–44% (fluxo 1–6 L/min)",
                "Fórmula prática: FiO₂ = 20 + (4 × fluxo em L/min)",
                "Não usar > 6 L/min — não aumenta FiO₂ e causa desconforto nasal",
              ],
            },
            {
              grade: "MNR (Máscara Não-Reinalante)",
              color: "#F97316",
              items: [
                "Dispneia com esforço | Trauma | Pré-oxigenação pré-IOT",
                "FiO₂ de até 90–100% com 15 L/min — reservatório cheio",
                "Padrão de O₂ suplementar no trauma grave — não economizar fluxo",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Dispositivos Avançados — Supraglóticos",
          items: [
            { label: "Máscara Laríngea (ML)", value: "Tamanho por PESO. Indicada na falha de IOT ou anatomia favorável. Pode usar em pé. Não protege completamente de aspiração", highlight: true },
            { label: "Tubo Laríngeo", value: "Tamanho por ALTURA. Mais fácil de inserir às cegas. Indicado na falha de IOT. Alternativa à ML no trauma", highlight: true },
            { label: "Quando usar supraglótico", value: "Falha na IOT + consegue ventilar com máscara → supraglótico como ponte. Não substitui IOT definitiva em via aérea de risco", highlight: false },
            { label: "Anatomia favorável", value: "Maior facilidade de inserção às cegas nos supraglóticos — avaliação prévia (LEMON) importante", highlight: false },
          ],
        },
        {
          type: "alert",
          color: "#10B981",
          title: "Via Aérea Definitiva — Definição",
          text: "Tubo com cuff insuflado na traqueia — garante via aérea definitiva. Inclui: TOT (cuff supraglótico), TN (tubo nasotraqueal) e crico/traqueostomia. É a única via aérea que protege completamente de aspiração e permite ventilação controlada.",
        },
        {
          type: "obs",
          title: "Intubação Nasotraqueal Às Cegas — Quando e Quando Não",
          text: "Técnica histórica para paciente respirando espontaneamente sem possibilidade de abertura de boca. Praticamente abandonada com o advento de videolaringoscópios. CONTRAINDICADA em apneia (não há fluxo de ar para guiar), em fratura de base de crânio e em trauma facial grave. Em provas: cobram que não é indicada em apneia.",
        },
      ],
    },
  },
  {
    id: "indicacoes",
    name: "Indicações IOT",
    color: "#F59E0B",
    content: {
      title: "Indicações de Intubação Orotraqueal",
      blocks: [
        {
          type: "alert",
          color: "#F59E0B",
          title: "Duas Perguntas Obrigatórias — VENTILA? PROTEGE VA?",
          text: "Se a resposta for NÃO a qualquer uma das duas → INTUBAR. Não é necessário que ambas falhem. Antecipação é fundamental: um paciente que vai deteriorar deve ser intubado eletivamente antes de tornar-se emergência.",
        },
        {
          type: "grid",
          title: "Indicações — Não Ventila Adequadamente",
          items: [
            { label: "Hipoxemia", value: "SatO₂ < 90% com O₂ suplementar máximo — incapacidade de oxigenar", highlight: true },
            { label: "Apneia", value: "Ausência de drive respiratório — IOT imediata", highlight: true },
            { label: "Bradipneia", value: "FR < 8 ipm — ventilação minuto insuficiente para eliminação de CO₂", highlight: false },
            { label: "PaCO₂ em Ascensão", value: "Hipercapnia progressiva apesar de esforço — fadiga respiratória iminente", highlight: true },
          ],
        },
        {
          type: "grid",
          title: "Indicações — Não Protege a Via Aérea",
          items: [
            { label: "ECG < 9", value: "Reflexos protetores de VA comprometidos — risco alto de aspiração", highlight: true },
            { label: "Piora Neurológica Progressiva", value: "Antecipação: intubar antes do ECG cair para < 8. Deterioração implica perda iminente dos reflexos", highlight: true },
            { label: "Broncoaspiração Ativa", value: "Sangue, vômito, secreção — via aérea definitiva para proteção e aspiração eficaz", highlight: false },
          ],
        },
        {
          type: "grid",
          title: "Indicações — Como Vai Evoluir",
          items: [
            { label: "Hematoma Cervical em Expansão", value: "Intubar agora — em 30 min pode ser impossível (compressão e desvio de traqueia)", highlight: true },
            { label: "Queimadura Cervical / Facial", value: "Edema progressivo de VA nas primeiras horas — IOT precoce eletiva antes de obstrução", highlight: true },
            { label: "Contusão Pulmonar", value: "Pode mascarar insuficiência respiratória — reavaliar frequentemente, intubar antes de deteriorar", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "LEMON — Predição de Via Aérea Difícil",
          text: "L — Look externally (facies, lesões, macro/micrognatia). E — Evaluate 3-3-2 (abertura boca 3 dedos, mento-hioide 3 dedos, hioide-tireóide 2 dedos). M — Mallampati (I–IV). O — Obstruction (estridor, tumor, hematoma). N — Neck mobility (coluna rígida). Qualquer item alterado = via aérea potencialmente difícil → preparar alternativas antes de iniciar. NÃO aplicável em emergência urgente (sequência rápida independente).",
        },
        {
          type: "flow",
          title: "Preparação Para Intubar — O Que Olhar",
          steps: [
            { text: "OLHAR A VIA AÉREA: LEMON, lesões faciais/cervicais, abertura de boca, Mallampati se possível", color: "#F59E0B" },
            { text: "PACIENTES DE RISCO: brevilíneos/retrognatas → lâmina angulada; lesão/sangramento cervical; mobilidade cervical limitada", color: "#EC4899" },
            { text: "OBSTRUÇÃO/SANGRAMENTO: visualizar antes de tentar — se VA sangrante, aspirar primeiro", color: "#EF4444" },
            { text: "MOBILIDADE CERVICAL: colar em trauma → videolaringoscópio ou fibroscópio como 1ª escolha", color: "#0EA5E9" },
          ],
        },
      ],
    },
  },
  {
    id: "sequencia-rapida",
    name: "Seq. Rápida",
    color: "#6366F1",
    content: {
      title: "Sequência de Intubação Rápida — 7 Ps",
      blocks: [
        {
          type: "flow",
          title: "Os 7 Ps da Sequência de Intubação Rápida (SIR)",
          steps: [
            { text: "1. PREPARATION — Material completo: laringoscópio, tubo (testado), guia, ambu, drogas, acesso venoso, aspirador ligado", color: "#6366F1" },
            { text: "2. PREOXYGENATION — O₂ a 100% por ≥ 3–5 min (MNR 15 L/min ou VNI). Alvo: SatO₂ > 95% antes de paralisar", color: "#0EA5E9" },
            { text: "3. PRETREATMENT — Drogas adjuvantes conforme contexto clínico (Fentanil em HIC, Lidocaína controversa)", color: "#10B981" },
            { text: "4. PARALYSIS WITH INDUCTION — Indutor + Bloqueador neuromuscular em sequência rápida sem ventilação intermediária", color: "#F59E0B" },
            { text: "5. POSITIONING — Posição de cheirar (sniffing position): extensão atlanto-occipital + flexão cervical baixa. TRAUMA: posição neutra", color: "#EC4899" },
            { text: "6. PLACEMENT — Passagem da cânula sob visão direta da glote. Confirmar: capnografia + ausculta bilateral + condensação", color: "#EF4444" },
            { text: "7. POST-INTUBATION MANAGEMENT — Fixar tubo, RX tórax, ajuste de ventilador, sedoanalgesia contínua", color: "#8B5CF6" },
          ],
        },
        {
          type: "alert",
          color: "#6366F1",
          title: "Pré-Oxigenação — Etapa Mais Subestimada",
          text: "O objetivo é desnitrogenizar os alvéolos, criando reserva de O₂. Em adultos saudáveis, compra 8–10 minutos de apneia segura. Em obesos, gestantes e crianças, essa janela é muito menor (< 3 min). Hipoxemia + hipotensão + acidose metabólica antes da IOT = condições adversas que aumentam o risco de parada pós-intubação.",
        },
        {
          type: "grid",
          title: "Condições Pré-Intubação que Aumentam Risco de Parada",
          items: [
            { label: "Hipoxemia", value: "SatO₂ < 90% antes da IOT → risco de colapso cardiovascular pós-paralisia. Otimizar com CPAP/VNI antes", highlight: true },
            { label: "Hipotensão", value: "PAS < 90 → repor volume antes da indução. Indutor vasodilata → colapso pós-IOT. Ketamina preferida", highlight: true },
            { label: "Acidose Metabólica Grave", value: "pH < 7,1 → hiperventilação é compensação. Paralisia → apneia → acidose pior → parada. Repor HCO₃⁻ se necessário", highlight: true },
            { label: "Falência do VD", value: "Pressão positiva → ↑ RVP → colapso do VD. PEEP mínima, volume cuidadoso, norepinefrina pronta", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "Pós-Intubação Imediato — Checklist",
          text: "Confirmação OBRIGATÓRIA: (1) capnografia — EtCO₂ presente e estável. (2) Ausculta bilateral simétrica. (3) Condensação no tubo durante expiração. (4) SatO₂ estável ou em melhora. (5) RX de tórax para confirmar posição (carina: T4-T5 / 2–4 cm acima). Após confirmar: fixar o tubo, ajustar ventilador, iniciar sedoanalgesia contínua.",
        },
      ],
    },
  },
  {
    id: "drogas",
    name: "Drogas SIR",
    color: "#EC4899",
    content: {
      title: "Drogas da Sequência de Intubação Rápida",
      blocks: [
        {
          type: "grades",
          title: "Indutores — Comparativo Detalhado",
          organ: "Droga",
          grades: [
            {
              grade: "KETAMINA",
              color: "#10B981",
              items: [
                "Broncodilatador potente — preferencial em broncoespasmo e asma grave",
                "Mantém o DRIVE RESPIRATÓRIO — única que mantém respiração espontânea em doses dissociativas",
                "Mantém tônus simpático → sustenta PA e FC — escolha no CHOQUE hemorrágico",
                "PODE PIORAR: aumenta PA e FC — cautela em trauma craniano com HIC grave (debatido — evidência moderna mais favorável)",
                "Dose: 1–2 mg/kg IV (indutor) | 0,3–0,5 mg/kg (analgesia)",
              ],
            },
            {
              grade: "ETOMIDATO",
              color: "#6366F1",
              items: [
                "CARDIO-ESTÁVEL — mínima alteração hemodinâmica. ESCOLHA NO TRAUMA",
                "Mantém reflexos laríngeos levemente — usar com bloqueador neuromuscular",
                "Inibe 11β-hidroxilase → supressão adrenal por 12–24h — controverso em sepse",
                "NÃO é broncodilatador — em broncoespasmo, preferir Ketamina",
                "Dose: 0,3 mg/kg IV",
              ],
            },
            {
              grade: "FENTANIL",
              color: "#0EA5E9",
              items: [
                "APENAS em hipertensão intracraniana — blunting da resposta pressórica à laringoscopia",
                "Opiode de ação rápida: onset 1–2 min, duração 30–60 min",
                "Pode causar rigidez torácica ('peito de madeira') em doses altas (> 5 mcg/kg) — rara em doses de intubação",
                "Dose: 1–3 mcg/kg IV lento 3 min antes da laringoscopia",
              ],
            },
            {
              grade: "PROPOFOL / MIDAZOLAM",
              color: "#EF4444",
              items: [
                "NÃO INDICADOS NO TRAUMA",
                "Propofol: vasodilatação + depressão miocárdica → colapso em pacientes hipovolêmicos",
                "Midazolam: onset lento (2–3 min), hipotensão, depressão respiratória prolongada",
                "Uso aceitável em sedação de manutenção pós-IOT em paciente estável",
              ],
            },
          ],
        },
        {
          type: "grades",
          title: "Bloqueadores Neuromusculares — Succinilcolina vs Rocurônio",
          organ: "BNM",
          grades: [
            {
              grade: "SUCCINILCOLINA",
              color: "#F59E0B",
              items: [
                "Paralisia com indução em 45–60 seg | Duração: 10 minutos — succinilcolinesterase",
                "AUMENTA K⁺ sérico em 0,5–1 mEq/L — fisiológico e geralmente seguro",
                "CONTRAINDICADA: trauma de esmagamento (crush), queimadura, TCE com > 72h, desnervação — risco de hipercalemia fatal (K⁺ > 6–7) por upregulation de receptores nicotínicos extrajuncionais",
                "Pode fazer até 72h do trauma de esmagamento/queimado sem risco de hipercalemia",
                "Causa fasciculação muscular — piora PIC transitoriamente",
                "Dose: 1,5 mg/kg IV",
              ],
            },
            {
              grade: "ROCURÔNIO",
              color: "#8B5CF6",
              items: [
                "Paralisia em 60–90 seg (alta dose: 1,2–1,6 mg/kg → 60 seg) | Duração: 60 minutos",
                "NÃO ALTERA K⁺ — escolha em contraindicações à Succinilcolina",
                "REVERSÍVEL com Sugammadex (16 mg/kg reverterá imediatamente) — vantagem para via difícil",
                "Dose padrão SIR: 1,2 mg/kg IV. Alta dose (1,6 mg/kg): similar ao onset da succinilcolina",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Succinilcolina e Hipercalemia — O Detalhe Que a Banca Cobra",
          text: "O aumento de K⁺ com succinilcolina é NORMAL (0,5–1 mEq/L) em pacientes sem contraindicação. O risco de hipercalemia fatal ocorre em condições que causam upregulation de receptores nicotínicos extrajuncionais: queimaduras > 72h, esmagamento > 72h, desnervação (lesão medular crônica, ELA, Guillain-Barré), imobilidade prolongada. NAS PRIMEIRAS 72h DO TRAUMA DE ESMAGAMENTO E QUEIMADURA — PODE USAR. Após 72h — CONTRAINDICADA.",
        },
        {
          type: "alert",
          color: "#EC4899",
          title: "Regra Prática: Trauma + Choque = Ketamina + Rocurônio",
          text: "No trauma com instabilidade hemodinâmica: Ketamina (mantém simpaticomimético) + Rocurônio (não altera K⁺, reversível). Se estável neurologicamente e sem choque: Etomidato + Succinilcolina. Se HIC grave: Fentanil como pré-tratamento + Etomidato + Rocurônio.",
        },
      ],
    },
  },
  {
    id: "crico",
    name: "Crico / Traqueost.",
    color: "#F97316",
    content: {
      title: "Cricotireoidotomia e Traqueostomia",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "CRICO — Única Saída em 'Não Intuba / Não Ventila'",
          text: "Indicação absoluta: NÃO INTUBOU + NÃO ESTÁ VENTILANDO COM MÁSCARA. Não tentar mais uma laringoscopia — ir direto para crico. Cada tentativa de IOT com falha consome tempo de apneia. Após 3 tentativas ou falha de supraglótico: CRICO CIRÚRGICA.",
        },
        {
          type: "flow",
          title: "Técnica da Cricotireoidotomia Cirúrgica",
          steps: [
            { text: "Identificar membrana cricotireóidea: entre cartilagem tireóide (acima) e cartilagem cricoide (abaixo)", color: "#F97316" },
            { text: "Incisão transversa de 3 cm sobre a membrana — pele + subcutâneo + membrana em um único gesto", color: "#F97316" },
            { text: "Dilatar o orifício com pinça hemostática ou cabo do bisturi (rotação 90°)", color: "#EC4899" },
            { text: "Inserir tubo 6,0–6,5 ou cânula de traqueostomia n°5–6 — inflar o cuff", color: "#10B981" },
            { text: "Confirmar: EtCO₂ + ausculta bilateral + SatO₂ em melhora", color: "#0EA5E9" },
          ],
        },
        {
          type: "grid",
          title: "Cricotireoidotomia por Punção vs Cirúrgica",
          items: [
            { label: "Punção (por agulha)", value: "Acesso rápido mas temporário — ventilação jet 50 psi por 30–45 min. CONTRAINDICADA em < 12 anos (risco de barotrauma e estenose subglótica)", highlight: true },
            { label: "Cirúrgica (bisturi)", value: "Padrão definitivo no adulto — técnica rápida e confiável. Pode ser feita com qualquer bisturi + tubo disponível", highlight: true },
            { label: "Contraindicação por punção < 12 anos", value: "Cricóide muito pequena e deformável — risco de colapso da via aérea e estenose. Preferir cricotomia cirúrgica ou traqueostomia", highlight: false },
            { label: "Nunca em emergência", value: "Traqueostomia NÃO é procedimento de emergência — demora, sangra mais, requer dissecção. Indicada eletivamente pós-crico", highlight: true },
          ],
        },
        {
          type: "decision",
          title: "Traqueostomia — Indicações e Relação com a Crico",
          decisions: [
            {
              condition: "Pós-Crico (Definitiva)",
              color: "#F97316",
              actions: [
                "Toda cricotireoidotomia deve ser convertida para traqueostomia em 24–72h",
                "Risco de estenose subglótica com crico por > 72h",
              ],
            },
            {
              condition: "Traqueostomia Eletiva",
              color: "#0EA5E9",
              actions: [
                "IOT prolongada prevista (> 7–14 dias) — traqueostomia reduz trabalho respiratório, permite desmame",
                "Lesão laríngea ou de traqueia alta — quando IOT é impossível eletivamente",
                "Obstáculo anatômico definitivo (tumor de orofaringe, estenose)",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Algoritmo de Via Aérea Difícil — ASA 2022",
          text: "Sequência: 1) Otimizar posição + pré-oxigenação. 2) Videolaringoscópio como 1ª opção se via difícil prevista. 3) Máximo 3 tentativas de IOT (trocar lâmina/técnica a cada tentativa). 4) Supraglótico (máscara laríngea/tubo laríngeo) como estratégia de resgate. 5) CRICO se: 'não intuba + não ventila'. Alertas de via difícil: Mallampati III-IV, abertura < 3 dedos, pescoço imóvel, cicatriz cervical, obesidade mórbida.",
        },
      ],
    },
  },
  {
    id: "pos-iot",
    name: "Pós-IOT",
    color: "#8B5CF6",
    content: {
      title: "Manejo Pós-Intubação e Ventilação Mecânica",
      blocks: [
        {
          type: "flow",
          title: "Confirmação Imediata Pós-IOT",
          steps: [
            { text: "CAPNOGRAFIA: EtCO₂ ≥ 35 mmHg com forma de onda normal — mais confiável que ausculta", color: "#10B981" },
            { text: "AUSCULTA: bilateral simétrica + ausência de murmúrio epigástrico (intubação esofágica)", color: "#0EA5E9" },
            { text: "OXIMETRIA: SatO₂ estável ou melhorando após IOT confirmada", color: "#6366F1" },
            { text: "RX TÓRAX: confirmar posição do tubo — ponta 2–4 cm acima da carina (nível T4–T5)", color: "#F59E0B" },
            { text: "FIXAR O TUBO: cadarço cervical + fita adesiva. Documentar cm na comissura labial", color: "#8B5CF6" },
          ],
        },
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Sedoanalgesia Contínua — Obrigatória Pós-IOT",
          text: "Todo paciente intubado precisa de sedoanalgesia contínua. Analgesia primeiro (escada: Fentanil, Morfina) → sedação por cima (Propofol ou Midazolam em UTI, Ketamina em emergência). Meta: RASS −1 a −2 (acordar → seguir ordens simples → agitado). Paciente sem sedação → extubação acidental, dessincronização com VM, HIC.",
        },
        {
          type: "grid",
          title: "Ajuste Inicial do Ventilador — Parâmetros Básicos",
          items: [
            { label: "Modo", value: "Volume Controlado (VCV) ou Pressão Controlada (PCV) — ambos aceitáveis na emergência. Assistido-Controlado (A/C) como padrão inicial", highlight: false },
            { label: "Volume Corrente", value: "6–8 mL/kg de peso ideal — estratégia protetora para todos os pacientes. Peso ideal: homen = 50 + 0,91(altura cm − 152); mulher = 45 + 0,91(altura − 152)", highlight: true },
            { label: "FR", value: "12–16 irpm inicialmente. Ajustar por capnografia/gasometria. TCE grave: alvo EtCO₂ 35–40 (normocapnia)", highlight: false },
            { label: "PEEP", value: "5 cmH₂O de início — ajustar por oxigenação. Cuidado com PEEP alto em choque (↓ retorno venoso) e pneumotórax", highlight: true },
            { label: "FiO₂", value: "100% no início → titular para SatO₂ 94–98%. Evitar hiperóxia: associada a piora em TCE e pós-PCR", highlight: true },
            { label: "Pressão de Platô", value: "< 30 cmH₂O — marcador de overdistensão alveolar. Se alto: reduzir VC ou aumentar FR", highlight: true },
          ],
        },
        {
          type: "grid",
          title: "Complicações Pós-IOT — DOPE",
          items: [
            { label: "D — Displacement", value: "Tubo deslocado: extubação acidental ou intubação seletiva (geralmente D). Checar cm na comissura labial e ausculta", highlight: true },
            { label: "O — Obstruction", value: "Tubo obstruído: secreção, dobramento, mordedura. Passar aspirador, trocar tubo se necessário", highlight: true },
            { label: "P — Pneumothorax", value: "↑ pressão de via aérea + ↓ MV unilateral = pneumotórax hipertensivo. Descompressão imediata", highlight: true },
            { label: "E — Equipment failure", value: "Falha do ventilador ou circuito. Desconectar do VM e ventilar com AMBU enquanto resolve o problema", highlight: false },
          ],
        },
        {
          type: "obs",
          title: "CRASH-2 + Damage Control Resuscitation — Integração com a Via Aérea",
          text: "No choque hemorrágico, a IOT com pressão positiva reduz o retorno venoso e pode precipitar parada cardíaca em pacientes hipovolêmicos graves (peri-intubation cardiac arrest). Reposição de volume antes da IOT, ketamina como indutor e PEEP mínima inicial são as estratégias de proteção. ARDSNet: volume corrente 6 mL/kg e platô < 30 cmH₂O reduzem mortalidade na LPA/SDRA — aplicar desde o início na contusão pulmonar.",
        },
      ],
    },
  },
];

export default function ViaAerea() {
  const [active, setActive] = useState(sections[0].id);
  const navigate = useNavigate();
  const sec = sections.find((s) => s.id === active);
  const color = sec.color;

  const renderBlock = (block, idx) => {
    if (block.type === "alert") {
      return (
        <div key={idx} style={{
          background: `${block.color}10`, border: `1px solid ${block.color}40`,
          borderLeft: `3px solid ${block.color}`, borderRadius: 8,
          padding: "14px 18px", marginBottom: 16,
        }}>
          <div style={{
            fontSize: 11, fontFamily: "monospace", color: block.color,
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
          }}>⚠ {block.title}</div>
          <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.75 }}>{block.text}</div>
        </div>
      );
    }

    if (block.type === "obs") {
      return (
        <div key={idx} style={{
          background: "#0c1220", border: "1px solid #1e293b",
          borderLeft: "3px solid #6366F1", borderRadius: 8,
          padding: "14px 18px", marginBottom: 16,
        }}>
          <div style={{
            fontSize: 11, fontFamily: "monospace", color: "#818cf8",
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
          }}>◆ {block.title}</div>
          <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75 }}>{block.text}</div>
        </div>
      );
    }

    if (block.type === "grid") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 10, fontFamily: "monospace", color: "#475569",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
          }}>{block.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
            {block.items.map((item, i) => (
              <div key={i} style={{
                background: item.highlight ? `${color}0d` : "#080d18",
                border: `1px solid ${item.highlight ? color + "33" : "#1a2235"}`,
                borderRadius: 6, padding: "10px 14px",
              }}>
                <div style={{
                  fontSize: 10, color: item.highlight ? color : "#6366f1",
                  fontFamily: "monospace", marginBottom: 4,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>{item.label}</div>
                <div style={{ fontSize: 12.5, color: item.highlight ? "#f1f5f9" : "#94a3b8", lineHeight: 1.6 }}>
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
          <div style={{
            fontSize: 10, fontFamily: "monospace", color: "#475569",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
          }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {block.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `${step.color}20`, border: `1px solid ${step.color}60`,
                    color: step.color, fontSize: 11, fontFamily: "monospace",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{i + 1}</div>
                  {i < block.steps.length - 1 && (
                    <div style={{ width: 1, height: 12, background: "#1e2a3a" }} />
                  )}
                </div>
                <div style={{
                  background: `${step.color}0d`, border: `1px solid ${step.color}25`,
                  borderRadius: 6, padding: "9px 14px", flex: 1,
                  fontSize: 12.5, color: "#cbd5e1", lineHeight: 1.6, marginTop: 2,
                }}>{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "grades") {
      return (
        <div key={idx} style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 10, fontFamily: "monospace", color: "#475569",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
          }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.grades.map((g, i) => (
              <div key={i} style={{
                background: `${g.color}08`, border: `1px solid ${g.color}30`,
                borderRadius: 8, padding: "12px 16px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  background: `${g.color}20`, border: `1px solid ${g.color}50`,
                  color: g.color, fontSize: 10, fontFamily: "monospace",
                  padding: "4px 10px", borderRadius: 4, flexShrink: 0,
                  whiteSpace: "nowrap", marginTop: 2,
                }}>{g.grade}</div>
                <div>
                  {g.items.map((item, j) => (
                    <div key={j} style={{
                      fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65,
                      display: "flex", gap: 6,
                    }}>
                      <span style={{ color: g.color, flexShrink: 0 }}>·</span>{item}
                    </div>
                  ))}
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
          <div style={{
            fontSize: 10, fontFamily: "monospace", color: "#475569",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
          }}>{block.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.decisions.map((d, i) => (
              <div key={i} style={{
                background: `${d.color}08`, border: `1px solid ${d.color}30`,
                borderRadius: 8, padding: "12px 16px",
              }}>
                <div style={{
                  fontSize: 11, color: d.color, fontFamily: "monospace",
                  marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em",
                }}>{d.condition}</div>
                {d.actions.map((a, j) => (
                  <div key={j} style={{
                    fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65,
                    display: "flex", gap: 6,
                  }}>
                    <span style={{ color: d.color, flexShrink: 0 }}>→</span>{a}
                  </div>
                ))}
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
      background: "#06080f", minHeight: "100vh",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      color: "#dde3f0", display: "flex", flexDirection: "column",
    }}>
      <button onClick={() => navigate("/")} style={{
        background: "transparent", border: "1px solid #1e2a3a",
        color: "#64748b", padding: "6px 14px", borderRadius: 6,
        cursor: "pointer", fontFamily: "monospace", fontSize: 12,
        width: "fit-content", margin: "16px 0 0 28px",
        display: "inline-flex", alignItems: "center", gap: 5,
      }}>← MedPanel</button>

      <div style={{ borderBottom: "1px solid #111827", padding: "16px 28px", background: "#080b14" }}>
        <div style={{
          fontSize: 10, letterSpacing: "0.35em", color: "#374151",
          fontFamily: "monospace", textTransform: "uppercase", marginBottom: 4,
        }}>Cirurgia do Trauma · Referência para Residência</div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#f1f5f9", letterSpacing: "0.01em" }}>
          Via Aérea no Trauma — Guia Completo
        </h1>
        <div style={{ fontSize: 11, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>
          Sala de Trauma · Dispositivos · Indicações · Seq. Rápida · Drogas SIR · Crico · Pós-IOT
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{
          width: 170, borderRight: "1px solid #0f1623",
          background: "#080b14", padding: "12px 0",
          flexShrink: 0, overflowY: "auto",
        }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              width: "100%",
              background: active === s.id ? `${s.color}12` : "transparent",
              border: "none",
              borderLeft: `2px solid ${active === s.id ? s.color : "transparent"}`,
              color: active === s.id ? "#f1f5f9" : "#4b5563",
              padding: "10px 16px", cursor: "pointer", textAlign: "left",
              fontSize: 12, fontFamily: "monospace", transition: "all 0.15s",
            }}>
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
              background: `${color}18`, border: `1px solid ${color}44`,
              color, padding: "4px 16px", borderRadius: 4, fontSize: 10,
              fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{sec.name}</div>
            <div style={{ fontSize: 17, fontWeight: 400, color: "#e2e8f0" }}>
              {sec.content.title}
            </div>
          </div>
          {sec.content.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #0f1623", padding: "10px 28px",
        background: "#080b14", display: "flex",
        justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: 10, color: "#1f2937", fontFamily: "monospace" }}>
          {sections.findIndex((s) => s.id === active) + 1}/{sections.length} · {sec.name}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map((s) => (
            <div key={s.id} onClick={() => setActive(s.id)} style={{
              width: active === s.id ? 20 : 6, height: 6, borderRadius: 3,
              background: active === s.id ? s.color : "#1f2937",
              cursor: "pointer", transition: "all 0.2s",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
