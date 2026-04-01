import MedPanelPage from "./medpanel-layout";

const sections = [
  {
    id: "menstruacao",
    name: "Menstruação",
    color: "#EC4899",
    content: {
      title: "Definição, Parâmetros Normais e Oogênese",
      blocks: [
        {
          type: "alert",
          color: "#EC4899",
          title: "Definição Fisiológica",
          text: "Sangramento genital periódico que representa o desfecho de um ciclo ovariano não culminado em gravidez. Marca o reinício do recrutamento folicular. É o resultado de eventos endócrinos — não uma patologia de base.",
        },
        {
          type: "grid",
          title: "Parâmetros Normais do Ciclo Menstrual (FIGO 2011)",
          items: [
            { label: "Duração do fluxo", value: "3–8 dias", highlight: true },
            {
              label: "Volume do fluxo",
              value: "5–80 mL por ciclo",
              highlight: true,
            },
            {
              label: "Intervalo intermenstrual",
              value: "24–38 dias",
              highlight: true,
            },
            {
              label: "Regularidade ciclo a ciclo",
              value: "Variação ≤ 10 dias (considerado regular)",
              highlight: false,
            },
            {
              label: "Regularização pós-menarca",
              value: "3–5 anos até estabilização completa",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola de Banca — Terminologia FIGO 2011",
          text: "A FIGO substituiu termos antigos ('oligomenorreia', 'menorragia', 'polimenorreia') por descritores objetivos: frequência (frequente < 24d / infrequente > 38d), regularidade, duração e volume. Bancas cobram os limites exatos: 24–38 dias de intervalo, 3–8 dias de duração, < 80 mL de volume.",
        },
        {
          type: "phases",
          title: "Oogênese — Depleção do Pool Folicular ao Longo da Vida",
          phases: [
            {
              number: "20ª",
              name: "Semana Fetal",
              color: "#EC4899",
              items: [
                "Pico de 6–7 milhões de ovogônias",
                "Início imediato da atresia fisiológica",
                "Processo irreversível e contínuo",
              ],
            },
            {
              number: "0",
              name: "Nascimento",
              color: "#F59E0B",
              items: [
                "~1 milhão de folículos primordiais",
                "Atresia NÃO cessa com o nascimento",
                "Independe de hormônios, gravidez ou ACO",
              ],
            },
            {
              number: "↑",
              name: "Puberdade",
              color: "#6366F1",
              items: [
                "~400.000 folículos disponíveis",
                "Apenas ~400 serão ovulados na vida toda",
                "Restante sofre atresia fisiológica",
              ],
            },
            {
              number: "∿",
              name: "Por Ciclo",
              color: "#10B981",
              items: [
                "~1.000 folículos recrutados por ciclo",
                "5–15 expostos ao FSH (antrais)",
                "Apenas 1 domina; demais → atresia",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola Clássica — ACO Não Preserva a Reserva Ovariana",
          text: "A depleção folicular é independente de ovulação, gestação ou uso de contraceptivo. ACO não 'poupa' folículos nem posterga a menopausa. Isso é cobrado com frequência em questões sobre infertilidade e reserva ovariana. O AMH (anti-Mülleriano) é hoje o melhor marcador de reserva — estável em qualquer fase do ciclo.",
        },
      ],
    },
  },
  {
    id: "snc",
    name: "Eixo SNC",
    color: "#6366F1",
    content: {
      title: "Hipotálamo, Hipófise e Alças de Feedback",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Regra de Ouro — GnRH Pulsátil",
          text: "GnRH em pulsos de ALTA frequência → predomina LH. Pulsos de BAIXA frequência → predomina FSH. Administração contínua (agonistas GnRH: leuprolida, buserelina) → downregulation → supressão gonadal completa. Base do tratamento de endometriose, mioma, puberdade precoce e preparo para FIV.",
        },
        {
          type: "grid",
          title: "GnRH — Características Fundamentais",
          items: [
            { label: "Estrutura", value: "Decapeptídeo", highlight: false },
            {
              label: "Origem embriológica",
              value:
                "Neurônios migram dos placódios olfatórios nasais → hipotálamo",
              highlight: true,
            },
            {
              label: "Meia-vida",
              value: "~10 minutos (degradação rápida)",
              highlight: false,
            },
            {
              label: "Padrão de secreção",
              value: "Pulsátil obrigatório (pulso a cada 60–90 min)",
              highlight: true,
            },
            {
              label: "Alta frequência (fase folicular tardia)",
              value: "→ Pico de LH → Ovulação",
              highlight: false,
            },
            {
              label: "Baixa frequência (fase lútea / início folicular)",
              value: "→ Predomínio de FSH",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Síndrome de Kallmann e Origem do GnRH",
          text: "A falha na migração dos neurônios GnRH (dos placódios olfatórios para o hipotálamo) causa Síndrome de Kallmann: hipogonadismo hipogonadotrófico + anosmia (subdesenvolvimento do bulbo olfatório). É o diagnóstico diferencial clássico de amenorreia primária com FSH/LH baixos — cobrado em residência de ginecologia e endocrinologia.",
        },
        {
          type: "grid",
          title: "Moduladores da Pulsatilidade do GnRH",
          items: [
            {
              label: "Estimulam GnRH",
              value:
                "Noradrenalina, adrenalina, dopamina (baixa dose), serotonina",
              highlight: false,
            },
            {
              label: "Inibem GnRH",
              value:
                "β-endorfinas, opioides endógenos, GABA, melatonina, prolactina alta, dopamina (alta dose)",
              highlight: true,
            },
            {
              label: "Kisspeptina (KNDy)",
              value:
                "Neurônios do núcleo arqueado: principal gatilho do pulso de GnRH — alvo terapêutico emergente",
              highlight: true,
            },
            {
              label: "Estrogênio (baixas doses)",
              value:
                "Feedback negativo hipofisário; em altas doses por ≥ 36h → feedback POSITIVO",
              highlight: false,
            },
            {
              label: "Progesterona",
              value: "Reduz a frequência dos pulsos de GnRH (fase lútea)",
              highlight: false,
            },
            {
              label: "Atletas de alto rendimento",
              value:
                "Hipoestrogenismo por opioides endógenos ↑ → supressão do eixo → amenorreia hipotalâmica",
              highlight: false,
            },
          ],
        },
        {
          type: "phases",
          title: "Alças de Feedback do Eixo Hipotálamo-Hipófise-Ovário",
          phases: [
            {
              number: "UC",
              name: "Alça Ultracurta",
              color: "#8B5CF6",
              items: [
                "GnRH inibe sua própria secreção",
                "Autofeedback hipotalâmico local",
              ],
            },
            {
              number: "C",
              name: "Alça Curta",
              color: "#6366F1",
              items: [
                "LH/FSH inibem GnRH hipotalâmico",
                "Feedback hipófise → hipotálamo",
              ],
            },
            {
              number: "L–",
              name: "Alça Longa Negativa",
              color: "#0EA5E9",
              items: [
                "E2 (baixas doses) + P4 + Inibina → inibem GnRH e FSH/LH",
                "Domina durante quase todo o ciclo",
              ],
            },
            {
              number: "L+",
              name: "Feedback Positivo",
              color: "#EC4899",
              items: [
                "E2 > 200 pg/mL por ≥ 36h → PICO DE LH",
                "Único feedback positivo do eixo",
                "Ocorre apenas uma vez por ciclo → trigga ovulação",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Hormônios da Adeno-Hipófise — Funções no Ciclo",
          items: [
            {
              label: "FSH",
              value:
                "Recrutamento e crescimento folicular; estimula granulosa → aromatase → E2",
              highlight: true,
            },
            {
              label: "LH",
              value:
                "Estimula teca → androgênios; pico → ovulação; luteotrófico (mantém corpo lúteo)",
              highlight: true,
            },
            {
              label: "Inibina B",
              value:
                "Granulosa fase folicular → inibe FSH seletivamente; marcador de reserva ovariana",
              highlight: false,
            },
            {
              label: "Inibina A",
              value:
                "Corpo lúteo → cai no final da fase lútea → FSH sobe → novo ciclo",
              highlight: false,
            },
            {
              label: "Prolactina",
              value:
                "Inibe GnRH; hiperprolactinemia → amenorreia hipotalâmica (diagn. diferencial)",
              highlight: false,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — pubRF (Peptídeo Regulador de GnRH)",
          text: "O pubRF auxilia a manter os receptores hipofisários para GnRH e pode promover down-regulation com estímulo excessivo. Isso explica como agonistas do GnRH em uso contínuo dessensibilizam a hipófise progressivamente — supressão completa de FSH/LH em ~2 semanas de uso contínuo.",
        },
      ],
    },
  },
  {
    id: "hormonios",
    name: "Hormônios",
    color: "#F59E0B",
    content: {
      title: "Estrogênios, Progesterona e Androgênios",
      blocks: [
        {
          type: "grid",
          title: "Subtipos de Estrogênio",
          items: [
            {
              label: "Estradiol (E2)",
              value:
                "Mais potente; produzido pela granulosa folicular; domina na menacme",
              highlight: true,
            },
            {
              label: "Estrona (E1)",
              value:
                "Conversão periférica de androstenediona; domina na pós-menopausa",
              highlight: false,
            },
            {
              label: "Estriol (E3)",
              value:
                "Mais fraco; produzido pela placenta; útil no TGI pós-menopausa (efeito local)",
              highlight: false,
            },
          ],
        },
        {
          type: "flow",
          title:
            "Via de Biossíntese do Estradiol — Teoria das 2 Células (2 Gonadotrofinas)",
          steps: [
            {
              text: "LDL plasmático → captado pela célula da TECA ovariana (via LH-R)",
              color: "#F59E0B",
            },
            {
              text: "LH estimula TECA → CYP17A1 → Androstenediona e Testosterona",
              color: "#F59E0B",
            },
            {
              text: "Androgênios difundem passivamente para a GRANULOSA (sem LH-R no início do ciclo)",
              color: "#6366F1",
            },
            {
              text: "FSH estimula GRANULOSA → CYP19A1 (Aromatase) → Estradiol (E2)",
              color: "#EC4899",
            },
            {
              text: "E2 > 200 pg/mL por ≥ 36h → Feedback POSITIVO → PICO DE LH/FSH",
              color: "#10B981",
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Teoria 2 Células e SOP",
          text: "Na SOP, o excesso de LH estimula excessivamente a teca → androgênios aumentam. A granulosa tem aromatase limitada e não consegue converter todo esse excedente. Resultado: hiperandrogenismo. Além disso, inibina B está aumentada na SOP (muitos folículos pequenos), suprimindo FSH e impedindo a dominância folicular → anovulação crônica.",
        },
        {
          type: "grid",
          title: "Efeitos Orgânicos do Estrogênio",
          items: [
            {
              label: "Vagina",
              value:
                "Proliferação epitelial, ↑ glicogênio → Lactobacillus → acidifica pH (proteção)",
              highlight: false,
            },
            {
              label: "Colo uterino",
              value:
                "Muco claro, filante, abundante — máximo na fase folicular tardia",
              highlight: true,
            },
            {
              label: "Endométrio",
              value:
                "Fase proliferativa: espessamento, tubulação glandular, vascularização",
              highlight: true,
            },
            {
              label: "Mama",
              value: "Desenvolvimento ductal; ↑ densidade mamográfica",
              highlight: false,
            },
            {
              label: "Tubas uterinas",
              value:
                "Ativa peristalse tubária (facilita transporte do ovócito até o útero)",
              highlight: false,
            },
            {
              label: "Osso",
              value:
                "Inibe reabsorção osteoclástica → queda na menopausa → osteoporose",
              highlight: true,
            },
            {
              label: "Sistema vascular",
              value:
                "↑ NO → vasodilatação; ↑ HDL, ↓ LDL — cardioprotector antes da menopausa",
              highlight: false,
            },
            {
              label: "Termorregulaçao (SNC)",
              value: "Estabiliza o setpoint hipotalâmico; queda → fogachos",
              highlight: true,
            },
          ],
        },
        {
          type: "grid",
          title: "Efeitos Orgânicos da Progesterona",
          items: [
            {
              label: "Vagina",
              value:
                "Inibe inervação sensorial; reduz resposta estrogênica do epitélio",
              highlight: false,
            },
            {
              label: "Colo uterino",
              value:
                "Muco espesso, opaco, não filante — fecha o colo na fase lútea",
              highlight: true,
            },
            {
              label: "Endométrio",
              value:
                "Fase secretora: diferenciação glandular, glicogênio, decidualização",
              highlight: true,
            },
            {
              label: "Mama",
              value:
                "Desenvolvimento lobular e acinar (prepara estrutura para lactação)",
              highlight: false,
            },
            {
              label: "Tubas uterinas",
              value:
                "Inibe peristalse tubária (fase lútea → reduz risco de gravidez ectópica?)",
              highlight: false,
            },
            {
              label: "Temperatura basal",
              value:
                "Efeito termogênico hipotalâmico: ↑ 0,3–0,5°C pós-ovulação",
              highlight: true,
            },
            {
              label: "GnRH / eixo",
              value:
                "Reduz frequência dos pulsos de GnRH → supressão parcial na fase lútea",
              highlight: false,
            },
            {
              label: "Rim",
              value:
                "Antialdosterona (derivado de espironolactona na drospirenona) → natriurese leve",
              highlight: false,
            },
          ],
        },
        {
          type: "grid",
          title: "Androgênios Femininos — Origens e SHBG",
          items: [
            {
              label: "25% — Ovário",
              value:
                "Testosterona e androstenediona pelas células da teca (LH-dependente)",
              highlight: false,
            },
            {
              label: "25% — Suprarrenal",
              value: "DHEA-S e androstenediona (ACTH-dependente)",
              highlight: false,
            },
            {
              label: "50% — Conversão periférica",
              value:
                "Androstenediona → testosterona no tecido adiposo, pele e fígado",
              highlight: true,
            },
            {
              label: "SHBG — Aumentado por",
              value:
                "Estrogênio, tiroxina (T4), TH, gravidez → ↓ testosterona livre",
              highlight: false,
            },
            {
              label: "SHBG — Reduzido por",
              value:
                "Insulina, androgênios, GH, obesidade, hipotireoidismo → ↑ testosterona livre",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — SHBG, Hiperandrogenismo e SOP",
          text: "Na SOP, hiperinsulinemia reduz SHBG → mais testosterona livre → piora do hiperandrogenismo e acne/hirsutismo. Perda de peso e metformina elevam SHBG indiretamente. ACO combinado com EE + progestágeno antiandrogênico (drospirenona, acetato de ciproterona) eleva SHBG diretamente e reduz testosterona total — cobrado em questões de tratamento de SOP/hirsutismo.",
        },
      ],
    },
  },
  {
    id: "ciclo",
    name: "Fases do Ciclo",
    color: "#10B981",
    content: {
      title: "Fase Folicular, Ovulação e Fase Lútea",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Regra dos Dois Tempos — Essencial para Banca",
          text: "Fase folicular = VARIÁVEL (10–21 dias). Fase lútea = FIXA (~14 ± 2 dias). Ciclos irregulares variam pela fase folicular. Ciclo de 28d → ovula D14; ciclo de 35d → ovula D21; ciclo de 21d → ovula D7. A ovulação sempre ocorre 14 dias ANTES da próxima menstruação.",
        },
        {
          type: "phases",
          title: "Fase Folicular (D1 → Pico de LH)",
          phases: [
            {
              number: "D1–5",
              name: "Folicular Precoce",
              color: "#10B981",
              items: [
                "FSH elevado: queda de Inibina A e E2 do ciclo anterior",
                "Recrutamento de múltiplos folículos antrais (~1.000 por ciclo)",
                "5–15 folículos expostos ao FSH (antrais pequenos)",
                "Folículos primordiais recrutados 4–6 meses antes",
              ],
            },
            {
              number: "D6–10",
              name: "Folicular Tardia",
              color: "#6366F1",
              items: [
                "E2 em ascensão → seleção do folículo dominante",
                "Dominante: maior número de receptores FSH + mais aromatase",
                "E2 crescente suprime FSH → outros folículos entram em atresia",
                "AMH: protege folículos pré-antrais do efeito de FSH excessivo",
              ],
            },
            {
              number: "D10–14",
              name: "Pré-Ovulatório",
              color: "#EC4899",
              items: [
                "E2 > 200 pg/mL por ≥ 36h → único feedback positivo",
                "Pico de LH: 10–12h após pico de E2",
                "Pico de LH dura 36–48h no total",
                "Ovulação: 34–36h após início do pico de LH",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Folículo Dominante e AMH",
          text: "O folículo dominante é selecionado em D5–7 do ciclo atual, mas o recrutamento inicial ocorreu 4–6 meses antes. O AMH, produzido pelos folículos pré-antrais e antrais pequenos, suprime o recrutamento excessivo e protege a reserva folicular do FSH. AMH baixo = pobre resposta ovariana na estimulação. AMH alto = risco de OHSS (SOP-like).",
        },
        {
          type: "flow",
          title: "Sequência da Ovulação — Marcos Temporais",
          steps: [
            {
              text: "E2 > 200 pg/mL por ≥ 36h → dispara feedback positivo na hipófise",
              color: "#EC4899",
            },
            {
              text: "PICO DE LH (+ pico menor de FSH): 10–12h após pico máximo de E2",
              color: "#F59E0B",
            },
            {
              text: "Meiose I retomada: ovócito primário → ovócito secundário + 1º glóbulo polar",
              color: "#6366F1",
            },
            {
              text: "Ovócito para em Metáfase II — aguarda fertilização para completar Meiose II",
              color: "#8B5CF6",
            },
            {
              text: "OVULAÇÃO: 34–36h após início do pico de LH (ou ~24h após o pico)",
              color: "#10B981",
            },
            {
              text: "Ovócito liberado: viável por 12–24h; espermatozoide viável por 48–72h no TGF",
              color: "#0EA5E9",
            },
          ],
        },
        {
          type: "phases",
          title: "Meiose do Ovócito — As Duas Paradas Obrigatórias",
          phases: [
            {
              number: "P1",
              name: "1ª Parada — Prófase I",
              color: "#8B5CF6",
              items: [
                "Ocorre na vida fetal (ao nascer)",
                "Ovócito primário 'congela' em Prófase I",
                "Aguarda seleção folicular para retomada",
                "Pode durar décadas até o ciclo ovulatório",
              ],
            },
            {
              number: "M1",
              name: "Retomada — Meiose I (Pico LH)",
              color: "#6366F1",
              items: [
                "Pico de LH: retomada da meiose I",
                "Completa → 1º glóbulo polar expulso",
                "Avanço até Metáfase II",
              ],
            },
            {
              number: "P2",
              name: "2ª Parada — Metáfase II",
              color: "#EC4899",
              items: [
                "Ovócito OVULADO está em Metáfase II",
                "Só completa Meiose II se houver fecundação",
                "Espermatozoide penetra → 2º glóbulo polar expulso",
              ],
            },
          ],
        },
        {
          type: "grid",
          title: "Janela Fértil e Marcadores de Ovulação",
          items: [
            {
              label: "Temperatura basal",
              value:
                "↑ 0,3–0,5°C após ovulação (P4 termogênica) — retrospectivo; confirma ovulação passada",
              highlight: false,
            },
            {
              label: "Muco cervical (Spinnbarkeit)",
              value:
                "Máximo filante, claro, elástico no pico de E2 — prospectivo; melhor método natural",
              highlight: true,
            },
            {
              label: "LH urinário (kit OTC)",
              value:
                "Detecta pico 24–36h antes da ovulação — melhor marcador prático para coito programado",
              highlight: true,
            },
            {
              label: "Ovócito viável",
              value: "12–24h após ovulação",
              highlight: true,
            },
            {
              label: "Espermatozoide viável",
              value: "48–72h no trato genital feminino (pode chegar a 5 dias)",
              highlight: false,
            },
            {
              label: "Janela fértil total",
              value:
                "5 dias antes da ovulação + dia da ovulação = 6 dias; pico de fecundabilidade D-1 e D0",
              highlight: false,
            },
          ],
        },
        {
          type: "phases",
          title: "Fase Lútea (Fixo ~14 dias pós-ovulação)",
          phases: [
            {
              number: "D1–3",
              name: "Luteinização",
              color: "#F59E0B",
              items: [
                "Granulosa + teca → corpo lúteo (células grandes e pequenas)",
                "P4 sobe rapidamente após ovulação",
                "Ocitocina, relaxina, inibina A produzidas pelo CL",
              ],
            },
            {
              number: "D7–9",
              name: "Pico Lúteo",
              color: "#F97316",
              items: [
                "Pico de P4 (~15–25 ng/mL) em D21 (ciclo 28d)",
                "Se gravidez: HCG resgate do CL a partir do D7–9 (implantação)",
                "LH residual hipofisário mantém CL até D9",
              ],
            },
            {
              number: "D12–14",
              name: "Luteólise",
              color: "#EF4444",
              items: [
                "Sem HCG: queda de Inibina A → FSH começa a subir",
                "Queda de E2 e P4 → vasoespasmo → menstruação",
                "RESET: FSH sobe, Inibina A cai → novo recrutamento folicular",
              ],
            },
          ],
        },
        {
          type: "obs",
          title: "Pérola — Insuficiência Lútea e Abortamento Precoce",
          text: "Fase lútea inadequada (P4 insuficiente) pode causar abortamento recorrente precoce por falha na decidualização. Diagnóstico: P4 sérica D21 < 10 ng/mL (em ciclo regular de 28d). A suplementação vaginal de P4 é padrão em TRA e em casos selecionados de abortamento recorrente de causa lútea.",
        },
      ],
    },
  },
  {
    id: "endometrio",
    name: "Endométrio",
    color: "#0EA5E9",
    content: {
      title: "Fases Endometriais, Anatomia e Menstruação",
      blocks: [
        {
          type: "grid",
          title: "Anatomia do Endométrio",
          items: [
            {
              label: "Camada basal (1/3 inferior)",
              value:
                "Não menstrua; mantida pelos estrogênios basais; responsável pela regeneração pós-menstrual",
              highlight: false,
            },
            {
              label: "Camada funcional",
              value:
                "Responde ao ciclo hormonal; espessa na proliferação, secretora na fase lútea, descama na menstruação",
              highlight: true,
            },
            {
              label: "Espessura — referência USG",
              value:
                "2–4 mm (menstrual) → 8–12 mm (secretora) → > 4–5 mm na pós-menopausa = biópsia",
              highlight: true,
            },
          ],
        },
        {
          type: "phases",
          title: "Fases Endometriais Correlacionadas ao Ciclo Hormonal",
          phases: [
            {
              number: "F1",
              name: "Fase Proliferativa (E2)",
              color: "#0EA5E9",
              items: [
                "E2: up-regulation dos receptores de E2 e P4",
                "Telomerase ativa → regeneração celular acelerada",
                "Glândulas tubulares, estroma denso",
                "USG: padrão trilaminar crescente (D5 → D14)",
              ],
            },
            {
              number: "F2",
              name: "Fase Secretora (P4)",
              color: "#10B981",
              items: [
                "P4: downregulation dos receptores estrogênicos (para a proliferação)",
                "Diferenciação glandular: glândulas serpenteantes, vacúolos basais (histologia)",
                "Estroma edemaciado, artérias espiraladas se desenvolvem",
                "Glicogênio secretado → nutrição do embrião em implantação",
              ],
            },
            {
              number: "F3",
              name: "Menstruação",
              color: "#EC4899",
              items: [
                "Queda abrupta de E2 e P4 → vasoespasmo das artérias espirais",
                "Isquemia → necrose da camada funcional",
                "Ativação de MMPs (metaloproteinases) → descamação ordenada",
                "PGs (PGF2α, PGE2), IL-1, TNF-α → dismenorreia primária",
              ],
            },
          ],
        },
        {
          type: "flow",
          title: "Mecanismo da Dismenorreia Primária — Cascade de PGs",
          steps: [
            {
              text: "Queda de P4 → desinibição da COX-2 no endométrio → ↑ PGF2α e PGE2",
              color: "#EC4899",
            },
            {
              text: "PGF2α: contração miometrial intensa + vasoespasmo das artérias espirais",
              color: "#EF4444",
            },
            {
              text: "Isquemia miometrial → dor tipo cólica, hipoxia local → liberação de bradicinina",
              color: "#F59E0B",
            },
            {
              text: "1ª linha: AINEs (ibuprofeno 400–600 mg, naproxeno 500 mg) — inibem COX → reduz PGs",
              color: "#10B981",
            },
            {
              text: "2ª linha: ACO combinado → endométrio atrófico → menos PGs produzidas",
              color: "#6366F1",
            },
          ],
        },
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Queda de GABA e SPM/TDPM — Mecanismo Central",
          text: "O alopregnanolona (metabólito da P4) é modulador positivo do receptor GABA-A. Na fase lútea tardia, a queda abrupta de P4 reduz allopregnanolona → hiperexcitabilidade neuronal hipotalâmica → sintomas afetivos do SPM/TDPM. SSRIs (fluoxetina, sertralina) aumentam sensibilidade ao alopregnanolona independentemente da recaptação de serotonina — explica eficácia mesmo com uso intermitente.",
        },
        {
          type: "obs",
          title: "Pérola — Endometriose e Fase Proliferativa",
          text: "Na endometriose, células endometriais ectópicas retêm receptividade ao E2 e P4. O implante endometriótico prolifera na fase folicular e sangra na menstruação → inflamação crônica peritoneal. Análogos do GnRH suprimem E2 → atrofia do implante. A 'pseudogravidez' (ACO contínuo) e 'pseudomenopausa' (análogo GnRH) são as bases do tratamento clínico.",
        },
      ],
    },
  },
  {
    id: "transtornos",
    name: "Transtornos",
    color: "#EF4444",
    content: {
      title: "SPM e Transtorno Disfórico Pré-Menstrual (TDPM)",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Regra Absoluta — Diagnóstico Prospectivo",
          text: "SPM e TDPM EXIGEM confirmação prospectiva (diário de sintomas por ≥ 2 ciclos consecutivos). Sintomas devem estar AUSENTES na fase folicular (após D4 do fluxo). Transtorno depressivo maior ou TAG que piora no pré-menstrual ≠ TDPM (é PME — Premenstrual Exacerbation) — diagnóstico diferencial fundamental.",
        },
        {
          type: "grid",
          title: "SPM vs TDPM — Diferenciação Diagnóstica",
          items: [
            {
              label: "SPM — Prevalência",
              value:
                "3–8% das mulheres em menacme; sintomas leves a moderados; pouca interferência na vida",
              highlight: false,
            },
            {
              label: "TDPM — Prevalência",
              value:
                "~2%; forma grave e incapacitante; DSM-5 o classifica como transtorno depressivo",
              highlight: true,
            },
            {
              label: "Critério temporal (ambos)",
              value:
                "Sintomas nos 5 dias antes da menstruação, cessam no 1º–4º dia do fluxo",
              highlight: true,
            },
            {
              label: "SPM — Critério mínimo",
              value:
                "≥ 1 sintoma somático + ≥ 1 sintoma afetivo por ≥ 3 ciclos consecutivos",
              highlight: false,
            },
            {
              label: "TDPM — Critério DSM-5",
              value:
                "≥ 5 sintomas, com ≥ 1 dos 4 core: labilidade afetiva, irritabilidade/raiva, humor deprimido, ansiedade/tensão",
              highlight: true,
            },
            {
              label: "Confirmação (ambos)",
              value:
                "Diário prospectivo ≥ 2 ciclos; exclui transtornos subjacentes",
              highlight: false,
            },
          ],
        },
        {
          type: "flow",
          title: "Algoritmo de Tratamento SPM/TDPM (ACOG 2023)",
          steps: [
            {
              text: "Todos: mudanças de estilo de vida — aeróbico regular, ↓ cafeína/sal/álcool, sono",
              color: "#10B981",
            },
            {
              text: "SPM leve: Ca²⁺ 1.200 mg/d + vitamina B6 80 mg/d + magnésio 250–400 mg/d (evidência B)",
              color: "#10B981",
            },
            {
              text: "TDPM / SPM moderado-grave → SSRI (1ª linha absoluta)",
              color: "#6366F1",
            },
            {
              text: "SSRI: fluoxetina 20 mg/d ou sertralina 50–150 mg/d (contínuo ou fase lútea D14–D28)",
              color: "#6366F1",
            },
            {
              text: "Alternativa: ACS com drospirenona (Yaz: EE 20 μg + drospirenona 3 mg — aprovado FDA para TDPM)",
              color: "#0EA5E9",
            },
            {
              text: "Refratário a SSRI + ACS → Análogo de GnRH (leuprolida) + add-back obrigatório se > 6 meses",
              color: "#F59E0B",
            },
            {
              text: "Add-back: E2 transdérmico baixa dose + P4 natural → protege osso sem recidivar TDPM",
              color: "#EF4444",
            },
          ],
        },
        {
          type: "grid",
          title: "Farmacologia Detalhada — Droga por Droga",
          items: [
            {
              label: "Fluoxetina",
              value:
                "20 mg/d contínuo ou D14–D28. Meia-vida longa (5–6 dias) facilita uso intermitente. Aprovado FDA para TDPM. NNT ≈ 4–5.",
              highlight: true,
            },
            {
              label: "Sertralina",
              value:
                "50–150 mg/d contínuo ou intermitente. Aprovado FDA. Boa tolerabilidade. Primeira escolha na prática.",
              highlight: false,
            },
            {
              label: "Drospirenona (ACS)",
              value:
                "Progestágeno derivado da espironolactona: antiandrogênico + antimineralocorticóide. Yaz aprovado FDA para TDPM. Reduz retenção hídrica.",
              highlight: true,
            },
            {
              label: "Análogos GnRH",
              value:
                "Menopausa farmacológica reversível. Máximo 6 meses SEM add-back. Com add-back: pode usar cronicamente.",
              highlight: true,
            },
            {
              label: "Bromocriptina",
              value:
                "Agonista D2 → ↓ prolactina. Útil se mastalgia cíclica proeminente. Menos eficaz para sintomas afetivos.",
              highlight: false,
            },
            {
              label: "⚠ Progestágeno isolado — CONTRAINDICADO",
              value:
                "NÃO eficaz no SPM/TDPM. Pode PIORAR sintomas (base GABA). Nunca usar como monoterapia.",
              highlight: true,
            },
          ],
        },
        {
          type: "obs",
          title: "Trial — SSRIs no TDPM (Cochrane Meta-análise, Shah et al.)",
          text: "Revisão Cochrane confirmou SSRIs superiores a placebo tanto em uso contínuo quanto intermitente (fase lútea). NNT ≈ 4–5 para resposta clínica. Uso intermitente (D14 ao D28) é tão eficaz quanto contínuo para sintomas afetivos — vantagem: menor exposição cumulativa e custo. Início de ação dos SSRIs no TDPM é mais rápido que na depressão (dias, não semanas) — reforça mecanismo GABAérgico.",
        },
        {
          type: "obs",
          title: "Pérola Compilada — O Que a Banca Cobra sobre SPM/TDPM",
          text: "① SPM não exige 5 sintomas — basta 1 somático + 1 afetivo. ② TDPM exige ≥ 5 do DSM-5 com ≥ 1 dos 4 core. ③ Análogo GnRH sem add-back > 6 meses = contraindicado (osteoporose irreversível). ④ SSRI pode ser usado somente na fase lútea — eficaz no TDPM (único transtorno psiquiátrico que responde a SSRI intermitente). ⑤ Progestágeno isolado é ineficaz e pode piorar. ⑥ Ca²⁺ 1.200 mg/d tem evidência B para SPM leve.",
        },
      ],
    },
  },
];

export default function CicloMenstrual() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Ginecologia"
      title="Ciclo Menstrual — Guia Completo"
    />
  );
}
