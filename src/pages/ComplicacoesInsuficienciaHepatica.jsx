import MedPanelPage from "./medpanel-layout";

const sections = [
  // ─────────────────────────────────────────────────────────────────────
  // 1. HIPERTENSÃO PORTAL
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "hipertensao-portal",
    name: "Hipertensão Portal",
    color: "#6366F1",
    content: {
      title: "Hipertensão Portal — Fisiopatologia e Consequências",
      blocks: [
        {
          type: "alert",
          color: "#6366F1",
          title: "Limiares Críticos do GPVH",
          text: "GPVH > 5 mmHg = hipertensão portal. GPVH > 10 mmHg = clinicamente significativa (risco de descompensação). GPVH > 12 mmHg = risco de sangramento varicoso. GPVH > 20 mmHg no sangramento agudo = preditor independente de falha terapêutica e mortalidade."
        },
        {
          type: "grid",
          title: "Fisiopatologia em 2 Componentes Principais",
          items: [
            {
              label: "↑ Resistência Intra-hepática",
              value: "Fibrose + nódulos regenerativos + contração ativa de células estreladas (componente dinâmico reversível ≈ 30%). Bloqueia o fluxo portal. Alvejado por nitratos tópicos e carvedilol.",
              highlight: true
            },
            {
              label: "↑ Fluxo Portal (Vasodilatação Esplâncnica)",
              value: "↑ NO, prostaciclininas, glucagon → vasodilatação arteriolar esplâncnica → ↑ débito cardíaco → síndrome hiperdinâmica → perpetua e agrava HTP.",
              highlight: true
            },
            {
              label: "Síndrome Hiperdinâmica",
              value: "↑ DC, ↓ RVP, ↓ PA efetiva → ativação SRAA + SNS + vasopressina → retenção de sódio e água → ascite, edema e SHR."
            },
            {
              label: "Neovascularização Colateral",
              value: "Varizes esofagogástricas, recanilização da veia umbilical (caput medusae), varizes ectópicas, gastropatia portal hipertensiva."
            }
          ]
        },
        {
          type: "grid",
          title: "Consequências Clínicas da HTP",
          items: [
            { label: "Ascite", value: "Mais comum. Vasodilatação esplâncnica + hipoalbuminemia + retenção renal de Na+." },
            { label: "Hemorragia Varicosa", value: "Mortalidade do 1º episódio: 15-20%. Recorrência sem profilaxia: ~70% em 2 anos.", highlight: true },
            { label: "Encefalopatia Hepática", value: "Shunting porto-sistêmico + disfunção hepatocitária → acúmulo de amônia e outras neurotoxinas." },
            { label: "SHR", value: "Fase terminal da circulação hiperdinâmica. Vasoconstrição renal reflexa à vasodilatação esplâncnica extrema." },
            { label: "Síndrome Hepatopulmonar", value: "Vasodilatação intrapulmonar → shunt funcional → hipoxemia. Ortodeoxia e platipneia são patognomônicas." },
            { label: "PBE", value: "Translocação bacteriana facilitada pela HTP + dismotilidade intestinal + imunodepressão." }
          ]
        },
        {
          type: "obs",
          title: "Beta-bloqueadores na HTP — Mecanismo e Evidência",
          text: "BBnS (propranolol, nadolol) reduzem GPVH por 2 mecanismos: ↓ DC via β1 (↓ fluxo portal) + vasoconstrição esplâncnica via β2. Carvedilol acrescenta bloqueio α1 → maior redução de GPVH (resposta hemodinâmica em ~50% dos pacientes). Meta-análise Cochrane (2012): BBnS reduzem mortalidade relacionada ao primeiro sangramento varicoso. ATENÇÃO: em ascite refratária com PAM < 82 mmHg, BBnS podem precipitar SHR (ATTIRE trial, 2021)."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 2. ASCITE
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ascite",
    name: "Ascite",
    color: "#0EA5E9",
    content: {
      title: "Ascite — Diagnóstico, GASA e Tratamento",
      blocks: [
        {
          type: "grades",
          title: "Classificação Clínica da Ascite",
          organ: "ascite",
          grades: [
            {
              grade: "1",
              color: "#10B981",
              items: [
                "Leve — detectável apenas por USG",
                "Não detectável ao exame físico",
                "Paracentese diagnóstica obrigatória na primeira apresentação"
              ]
            },
            {
              grade: "2",
              color: "#F59E0B",
              items: [
                "Moderada — distensão abdominal simétrica evidente",
                "Detecção clínica possível (sinal do piparote, macicez em flanco)",
                "Sem tensão abdominal importante"
              ]
            },
            {
              grade: "3",
              color: "#EF4444",
              items: [
                "Volumosa (tensa) — distensão acentuada",
                "Normalmente requer paracentese de alívio",
                "Risco de disfunção respiratória e SHR"
              ]
            }
          ]
        },
        {
          type: "alert",
          color: "#0EA5E9",
          title: "Paracentese Diagnóstica — Quando Obrigatória",
          text: "SEMPRE na primeira ascite. SEMPRE em qualquer internação de cirrótico com ascite (excluir PBE mesmo assintomático). SEMPRE diante de mudança de padrão clínico, deterioração, febre, dor abdominal ou encefalopatia sem causa aparente. Coagulopatia e plaquetopenia NÃO são contraindicações — não corrigir rotineiramente antes do procedimento."
        },
        {
          type: "grid",
          title: "Paracentese — Técnica",
          items: [
            {
              label: "Local de Punção",
              value: "1/5 da distância entre a crista ilíaca anterossuperior e a cicatriz umbilical (preferencialmente fossa ilíaca esquerda). Evitar cicatrizes cirúrgicas e circulação colateral.",
              highlight: true
            },
            {
              label: "LVP (> 5 litros)",
              value: "Infundir albumina 6-8g por litro removido acima de 5L para prevenir disfunção circulatória pós-paracentese (DCPP). Sem albumina: DCPP em 80% dos casos.",
              highlight: true
            }
          ]
        },
        {
          type: "grid",
          title: "GASA — Gradiente Albumina Soro-Ascite",
          items: [
            {
              label: "GASA ≥ 1,1 g/dL → TRANSUDATO (HTP presente)",
              value: "Proteína < 2,5 g/dL: CIRROSE. Proteína > 2,5 g/dL: IC, Budd-Chiari, síndrome de obstrução sinusoidal, pericardite constritiva.",
              highlight: true
            },
            {
              label: "GASA < 1,1 g/dL → EXSUDATO (sem HTP)",
              value: "Pancreatite, síndrome nefrótica, carcinomatose peritoneal, TB peritoneal, peritonite bacteriana secundária.",
              highlight: true
            },
            {
              label: "Cálculo e Coleta",
              value: "GASA = [Albumina sérica] − [Albumina do líquido ascítico]. Colher amostras SIMULTÂNEAS. Sensibilidade ~97% para HTP. Superior à divisão exsudato/transudato pelo método de Light."
            }
          ]
        },
        {
          type: "flow",
          title: "Algoritmo de Tratamento da Ascite",
          steps: [
            {
              text: "1. Tratar doença de base (abstinência alcoólica, antivirais, imunossupressão se necessário)",
              color: "#0EA5E9"
            },
            {
              text: "2. Restrição de sódio (2g/dia = 88 mEq/dia) — SOMENTE se hiponatremia (Na < 130 mEq/L). Restrição hídrica só se Na < 125 mEq/L.",
              color: "#0EA5E9"
            },
            {
              text: "3. Espironolactona — PRIMEIRA ESCOLHA. Início: 100mg/dia. Máx: 400mg/dia. Resposta esperada em 5-7 dias.",
              color: "#10B981"
            },
            {
              text: "4. Furosemida — NUNCA isolada. Adicionar se resposta inadequada à espiro. Proporção obrigatória espiro:furo = 100:40 para manter normonatremia e normocalemia.",
              color: "#F59E0B"
            },
            {
              text: "5. Objetivo: perda ≤ 500g/dia SEM edema periférico; ≤ 1kg/dia COM edema periférico. Controlar ascite sem gerar depleção vascular.",
              color: "#6366F1"
            }
          ]
        },
        {
          type: "obs",
          title: "Pérola de Banca — Furosemida Isolada é Proibida na Cirrose",
          text: "Furosemida isolada na ascite cirrótica: ineficaz (hiperaldosteronismo secundário reabsorve o Na+ no néfron distal mesmo com bloqueio de Henle) e perigosa (hipocalemia + alcalose metabólica → ↑ NH3 não-ionizada → precipita encefalopatia e SHR). A proporção espiro:furo 100:40 é mandatória. Evidência consolidada nas diretrizes EASL 2018 e AASLD 2021."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3. ASCITE REFRATÁRIA
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ascite-refrataria",
    name: "Ascite Refratária",
    color: "#F59E0B",
    content: {
      title: "Ascite Refratária — Critérios, TIPS e Manejo",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Definição de Ascite Refratária (EASL/AASLD)",
          text: "Ascite que NÃO RESPONDE a diurético em dose máxima (espiro 400mg + furo 160mg/dia) por > 1 semana. OU que recorre rapidamente após paracentese (< 4 semanas). OU que gera efeitos adversos intratáveis: encefalopatia, hiponatremia < 125 mEq/L, creatinina > 2 mg/dL, hipocalemia < 3 mEq/L, hipercalemia > 6 mEq/L, ginecomastia incapacitante."
        },
        {
          type: "grid",
          title: "Critérios de Refratariedade",
          items: [
            {
              label: "Sem Resposta Adequada (quantitativo)",
              value: "Perda ponderal < 200g/dia na semana de dose máxima de diurético. Critério objetivo antes de classificar como refratária.",
              highlight: true
            },
            {
              label: "Rápida Recorrência",
              value: "Reacúmulo para grau 2-3 em < 4 semanas após paracentese de alívio."
            },
            {
              label: "Efeitos Adversos Intratáveis",
              value: "Encefalopatia induzida por diurético, desequilíbrios eletrolíticos graves, insuficiência renal progressiva."
            },
            {
              label: "EXCLUIR MÁ ADESÃO",
              value: "Dosagem de Na+ urinário em 24h. Excreção < 50 mEq/dia: adesão inadequada. Excreção > 100 mEq/dia com ascite refratária: confirma refratariedade real.",
              highlight: true
            }
          ]
        },
        {
          type: "flow",
          title: "Manejo da Ascite Refratária",
          steps: [
            {
              text: "1. Paracentese de alívio (LVP) + albumina 6-8g/L removido acima de 5L. Tratamento imediato de escolha. Pode ser repetida em série.",
              color: "#F59E0B"
            },
            {
              text: "2. TIPS (Transjugular Intrahepatic Portosystemic Shunt): considerar se Child ≤ B9, sem EH prévia grave, bilirrubina < 5mg/dL, sem IC direita. Reduce recorrência superior a LVP repetitiva.",
              color: "#6366F1"
            },
            {
              text: "3. Transplante hepático: tratamento definitivo. Incluir na lista imediatamente se sem contraindicação. Ascite refratária = MELD mínimo atendido.",
              color: "#10B981"
            },
            {
              text: "ALFAPOMPA (sistema implantável de drenagem peritoneal): opção paliativa em não candidatos a TIPS ou Tx. Evidência crescente mas ainda limitada.",
              color: "#8B5CF6"
            }
          ]
        },
        {
          type: "obs",
          title: "TIPS vs. LVP Repetitiva — Meta-análise (Salerno, Hepatology 2007)",
          text: "TIPS vs. LVP repetitiva: TIPS superior na prevenção de recorrência de ascite (OR 0,14, p < 0,001). Sem diferença de sobrevida no curto prazo (estudos individuais subdimensionados). TIPS associado a maior incidência de EH (20-30% vs. ~10%). Meta-análise mais recente (Bai 2014, 5 trials): TIPS melhora sobrevida sem transplante (HR 0,61, p = 0,03). Contraindicado em Child C > 12, MELD > 18, IC direita, obstrução biliar."
        },
        {
          type: "alert",
          color: "#F59E0B",
          title: "Ascite Refratária = Sinal de Alarme Prognóstico",
          text: "Sobrevida mediana de 6 meses sem transplante. Avaliar candidatura a Tx IMEDIATAMENTE. No Brasil (Portaria MS 2600/2009): MELD ≥ 15 é critério de inclusão em lista. Ascite refratária isolada pode ser suficiente para atingir MELD elegível quando associada a hiponatremia (MELD-Na)."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 4. PBE
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "pbe",
    name: "PBE",
    color: "#EF4444",
    content: {
      title: "Peritonite Bacteriana Espontânea — Diagnóstico, Tratamento e Profilaxia",
      blocks: [
        {
          type: "grid",
          title: "Conceito, Epidemiologia e Fisiopatologia",
          items: [
            {
              label: "Definição",
              value: "Infecção do líquido ascítico SEM foco intra-abdominal identificável. Diagnóstico de exclusão: descartada PBE Secundária.",
              highlight: true
            },
            {
              label: "Etiologia",
              value: "MONOBACTERIANA. E. coli (mais comum), Klebsiella pneumoniae, Streptococcus pneumoniae. Anaeróbios raros — se presentes: suspeitar de PBE secundária (perfuração visceral)."
            },
            {
              label: "Epidemiologia",
              value: "10-30% dos cirróticos hospitalizados com ascite. Mortalidade hospitalar: 20-40%. Mais comum em cirrose avançada (Child B-C)."
            },
            {
              label: "Fisiopatologia",
              value: "Bacteremia → translocação por linfonodos mesentéricos → supercrescimento bacteriano intestinal (SIBO) → hipertensão portal facilita translocação → colonização do ascite.",
              highlight: true
            }
          ]
        },
        {
          type: "alert",
          color: "#EF4444",
          title: "NÃO ESPERAR CULTURA PARA INICIAR TRATAMENTO",
          text: "Diagnóstico de PBE = PMN ≥ 250/mm³ no líquido ascítico. Iniciar antibiótico IMEDIATAMENTE após coleta das amostras. A cultura positiva em apenas 40-60% dos casos (baixo inóculo). Atraso aumenta mortalidade de forma proporcional às horas de espera."
        },
        {
          type: "grid",
          title: "Clínica",
          items: [
            { label: "Febre", value: "Mais comum (~70%). Pode ser o único sintoma.", highlight: true },
            { label: "Dor abdominal", value: "Difusa, intensidade variável. Peritonismo raro (diferencia de PBE secundária)." },
            { label: "Encefalopatia", value: "Piora ou instalação de EH sem causa aparente → SEMPRE excluir PBE (paracentese imediata).", highlight: true },
            { label: "Diarreia / Constipação", value: "Distúrbio do trânsito intestinal inespecífico." },
            { label: "Assintomática", value: "20-30% dos casos → reforça a paracentese diagnóstica em toda internação do cirrótico." }
          ]
        },
        {
          type: "flow",
          title: "Diagnóstico de PBE",
          steps: [
            { text: "Paracentese diagnóstica → contagem celular diferencial (PMN)", color: "#EF4444" },
            { text: "PMN ≥ 250/mm³ → DIAGNÓSTICO CONFIRMADO (independente da cultura)", color: "#EF4444" },
            { text: "Colher cultura em frascos de hemocultura (aumenta positividade de 40% → 80%)", color: "#F59E0B" },
            { text: "Monobacteriana → PBE | Polimicrobiana com anaeróbios → suspeitar PBE Secundária", color: "#6366F1" },
            { text: "Ausência de foco cirúrgico intra-abdominal (imagem se dúvida)", color: "#10B981" }
          ]
        },
        {
          type: "flow",
          title: "Tratamento da PBE",
          steps: [
            { text: "Ceftriaxona 2g IV 1x/dia OU Cefotaxima 2g IV a cada 8h — por 5-7 dias", color: "#EF4444" },
            { text: "Albumina IV: 1,5g/kg no D1 (máx 150g) + 1g/kg no D3 (máx 100g)", color: "#6366F1" },
            { text: "Albumina previne SHR: NNT ≈ 5 (Sort et al. NEJM 1999). Reduz SHR de 33% para 10% e mortalidade hospitalar de 29% para 10%.", color: "#10B981" },
            { text: "Paracentese de controle em 48h: redução < 25% dos PMN ou sem melhora clínica → suspeitar de resistência ou PBE secundária", color: "#F59E0B" }
          ]
        },
        {
          type: "decision",
          title: "Diagnóstico Diferencial — Variantes do Líquido Ascítico",
          decisions: [
            {
              condition: "Ascite Neutrofílica (PMN ≥ 250, cultura negativa)",
              color: "#F59E0B",
              actions: [
                "Tratar IGUAL À PBE",
                "Provável PBE com inóculo bacteriano baixo",
                "NÃO suspender antibiótico por cultura negativa"
              ]
            },
            {
              condition: "Bacterascite (cultura +, PMN < 250/mm³)",
              color: "#0EA5E9",
              actions: [
                "Se ASSINTOMÁTICO: repetir paracentese em 48h",
                "Se SINTOMÁTICO ou PMN em ascensão: tratar igual PBE",
                "Pode representar colonização transitória pré-PBE"
              ]
            },
            {
              condition: "PBE Secundária (polimicrobiana, proteína > 1g/dL, glicose < 50mg/dL, DHL elevado)",
              color: "#EF4444",
              actions: [
                "Principal causa: perfuração de úlcera gástrica ou outra víscera",
                "Anaeróbios presentes na cultura",
                "Requer investigação cirúrgica IMEDIATA",
                "Cobertura para gram-negativos + anaeróbios (metronidazol + cefalosporina)"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Profilaxia da PBE",
          items: [
            {
              label: "Profilaxia Primária — Indicações",
              value: "Proteína do líquido ascítico < 1,5g/dL + (creatinina ≥ 1,2 OU Na ≤ 130 OU Child ≥ 9 com bilirrubina ≥ 3). TTO: norfloxacino 400mg/dia OU sulfametoxazol-trimetoprim OU ciprofloxacino.",
              highlight: true
            },
            {
              label: "Profilaxia Secundária — TODOS, SEMPRE",
              value: "Após episódio de PBE: TODOS recebem profilaxia por tempo indeterminado (até transplante). Norfloxacino 400mg/dia OU bactrim OU ciprofloxacino. NÃO há exceção.",
              highlight: true
            },
            {
              label: "Hemorragia Digestiva Alta",
              value: "Proteína do líquido < 1g/dL + HDA: bactrim ou ciprofloxacino por 7 dias. Ceftriaxona IV preferida se hospitalizado. HDA é fator de risco para PBE (sangue como substrato bacteriano)."
            },
            {
              label: "Resistência a Quinolonas",
              value: "Prevalência crescente em centros com uso prolongado de profilaxia. Rifaximina 550mg 2x/dia como alternativa emergente (evidência ainda limitada para profilaxia primária)."
            }
          ]
        },
        {
          type: "obs",
          title: "Sort et al. NEJM 1999 — O Trial que Definiu Albumina na PBE",
          text: "126 pacientes com PBE randomizados para cefotaxima ± albumina IV. Resultado primário: SHR em 10% (albumina) vs. 33% (controle) — p = 0,002. Mortalidade hospitalar: 10% vs. 29% (p = 0,01). Mortalidade em 3 meses: 22% vs. 41% (p = 0,03). NNT para prevenir SHR ≈ 4. Este trial único estabeleceu a albumina como padrão insubstituível na PBE."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 5. HEMORRAGIA VARICOSA
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "hemorragia-varicosa",
    name: "Hemorragia Varicosa",
    color: "#EC4899",
    content: {
      title: "Hemorragia Digestiva Varicosa — Manejo Agudo e Profilaxia",
      blocks: [
        {
          type: "alert",
          color: "#EF4444",
          title: "Emergência — Mortalidade 15-20% por Episódio",
          text: "Sem profilaxia secundária, recorrência em 6 semanas: 60%. Meta de Hb na ressuscitação: 7-8 g/dL — transfusão liberal AUMENTA pressão portal e mortalidade (Villanueva et al. NEJM 2013: estratégia restritiva Hb 7 vs. liberal Hb 9 → mortalidade 5% vs. 9%, p=0,02). GPVH > 20 mmHg = preditor de falha terapêutica."
        },
        {
          type: "phases",
          title: "Protocolo Agudo — 4 Pilares Simultâneos",
          phases: [
            {
              number: "1",
              name: "Estabilização Hemodinâmica",
              color: "#EC4899",
              items: [
                "AVP + cristaloides com cautela (NÃO superinfundir — ↑ pressão portal)",
                "Transfusão se Hb < 7 g/dL ou instabilidade hemodinâmica",
                "Meta Hb 7-8 g/dL (estratégia restritiva)",
                "Plasma fresco congelado: apenas se coagulopatia grave + sangramento ativo (TEG/ROTEM guiado)"
              ]
            },
            {
              number: "2",
              name: "Vasoconstritor Esplâncnico",
              color: "#6366F1",
              items: [
                "Iniciar ANTES da endoscopia, ao diagnóstico",
                "Terlipressina 2mg IV a cada 4h (1ª escolha — único com redução de mortalidade)",
                "OU Somatostatina 250mcg bolus + 250-500mcg/h em infusão",
                "OU Octreotida 50mcg bolus + 50mcg/h em infusão",
                "Manter por 2-5 dias pós-hemostasia"
              ]
            },
            {
              number: "3",
              name: "Endoscopia (até 24h, ideal < 12h)",
              color: "#F59E0B",
              items: [
                "Esôfago → Ligadura Elástica (LE) — tratamento de escolha",
                "Fundo gástrico (variz gástrica) → Cianoacrilato (cola tissular)",
                "EDA diagnóstica + terapêutica simultânea",
                "Falha da LE: segunda sessão ou TIPS de resgate"
              ]
            },
            {
              number: "4",
              name: "Antibioticoprofilaxia",
              color: "#10B981",
              items: [
                "Ceftriaxona 1g IV 1x/dia por 7 dias (preferida sobre norfloxacino em cirrose avançada — Fernández 2006)",
                "Reduz infecções, falha de controle do sangramento e mortalidade",
                "NNT ≈ 4 para prevenir infecção grave no contexto de HDA varicosa"
              ]
            }
          ]
        },
        {
          type: "decision",
          title: "Falha no Controle do Sangramento",
          decisions: [
            {
              condition: "Falha endoscópica (recorrência precoce < 5 dias)",
              color: "#EF4444",
              actions: [
                "TIPS de resgate — maior eficácia, ideal nas primeiras 72h",
                "TIPS precoce (< 72h): indicado em Child B com sangramento ativo ou Child C 10-13 ao diagnóstico (Monescillo trial, Hepatology 2004)",
                "Balão de Sengstaken-Blakemore como ponte até TIPS (máx 24h)"
              ]
            },
            {
              condition: "TIPS não disponível ou contraindicado",
              color: "#F59E0B",
              actions: [
                "Balão de tamponamento (Sengstaken-Blakemore: variz esofágica / Linton-Nachlas: variz gástrica)",
                "SEMS (stent metálico esofágico autoexpansível) — alternativa ao balão",
                "Shunt cirúrgico de emergência (alta mortalidade, último recurso)"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Profilaxia das Varizes",
          items: [
            {
              label: "Profilaxia Primária — Alto Risco",
              value: "Varizes grandes (F2-F3) OU com sinais de alto risco (red wale marks, cherry red spots): BBnS OU Ligadura Elástica. Preferir BBnS se sem contraindicação. Carvedilol 6,25-12,5mg/dia: superior a propranolol/nadolol em meta-análises recentes.",
              highlight: true
            },
            {
              label: "Profilaxia Primária — Baixo Risco",
              value: "Varizes pequenas sem sinais de risco: BBnS (propranolol 20mg 2x/dia ou nadolol 40mg 1x/dia). Ajustar para FC 55-60bpm ou ↓ 25% da FC basal."
            },
            {
              label: "Profilaxia Secundária — COMBINAÇÃO",
              value: "Após QUALQUER episódio de HDA varicosa: BBnS + Ligadura Elástica (combinação superior a cada um isolado — meta-análise Cochrane). LE: sessões a cada 2-4 semanas até erradicação. Manter BBnS indefinidamente.",
              highlight: true
            },
            {
              label: "Contraindicação a BBnS",
              value: "Ascite refratária + PAM < 82 mmHg: BBnS podem piorar disfunção circulatória e precipitar SHR (ATTIRE trial 2021). Reavaliar risco-benefício individualmente."
            }
          ]
        },
        {
          type: "obs",
          title: "Terlipressina — Único Vasoconstritor com Redução de Mortalidade",
          text: "Meta-análise Ioannou et al. (Cochrane 2003): terlipressina é o único vasoconstritor esplâncnico com redução de mortalidade comprovada em sangramento varicoso agudo. Mecanismo: agonista V1 → vasoconstrição esplâncnica → ↓ fluxo portal → ↓ GPVH. Vantagem posológica: administração em bolus (4/4h) vs. infusão contínua. Contraindicações: DAC ativa, DAOP grave, arritmias, gravidez."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 6. SÍNDROME HEPATORRENAL
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "shr",
    name: "Sínd. Hepatorrenal",
    color: "#8B5CF6",
    content: {
      title: "Síndrome Hepatorrenal — Fisiopatologia, Diagnóstico e Tratamento",
      blocks: [
        {
          type: "alert",
          color: "#8B5CF6",
          title: "Critérios Diagnósticos ICA-AKI 2015 (ICA = International Club of Ascites)",
          text: "1. Cirrose + ascite. 2. Creatinina > 1,5 mg/dL OU aumento ≥ 0,3 mg/dL em 48h OU ≥ 50% em 7 dias. 3. SEM melhora após 48h de: suspensão de diuréticos + expansão com albumina 1g/kg/dia (máx 100g). 4. Sem choque. 5. Sem nefrotóxico recente (AINES, contraste, aminoglicosídeos). 6. Sem proteinúria > 500mg/dia, hematúria ou doença renal parenquimatosa."
        },
        {
          type: "decision",
          title: "SHR Tipo 1 (Agudo) vs. Tipo 2 (Crônico)",
          decisions: [
            {
              condition: "SHR Tipo 1 (SHR-AKI) — Emergência",
              color: "#EF4444",
              actions: [
                "Duplicação da creatinina em < 2 semanas para > 2,5 mg/dL",
                "Precipitante identificável em 50%: PBE (mais comum), HDA, infecção grave, paracentese sem albumina",
                "Sobrevida mediana < 2 semanas sem tratamento",
                "Mortalidade hospitalar > 80% sem Tx hepático"
              ]
            },
            {
              condition: "SHR Tipo 2 (SHR-CKD) — Insidioso",
              color: "#F59E0B",
              actions: [
                "Piora lenta e progressiva da função renal",
                "Creatinina 1,5-2,5 mg/dL de forma estável",
                "Associado à ascite refratária",
                "Sobrevida mediana 3-6 meses"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Fisiopatologia — Vasoconstrição Renal Funcional",
          items: [
            {
              label: "Gatilho",
              value: "Vasodilatação esplâncnica extrema → redução do volume arterial efetivo → ativação máxima de SRAA + SNS + vasopressina (ADH).",
              highlight: true
            },
            {
              label: "Resposta Renal",
              value: "Angiotensina II + noradrenalina + vasopressina → vasoconstrição da artéria aferente renal → ↓ TFG → oligúria → azotemia progressiva."
            },
            {
              label: "Ausência de Dano Estrutural",
              value: "Rins morfologicamente NORMAIS — podem funcionar se transplantados. Reversível com Tx hepático. Diferencia de NTA (cilindros granulares/células epiteliais na urina).",
              highlight: true
            },
            {
              label: "Precipitantes Clássicos",
              value: "PBE (30-35% desenvolvem SHR sem albumina), HDA, paracentese sem albumina, infecções graves, AINES, contraste iodado, aminoglicosídeos, diuréticos excessivos."
            }
          ]
        },
        {
          type: "flow",
          title: "Tratamento do SHR",
          steps: [
            {
              text: "1. Suspender diuréticos + AINES + nefrotóxicos. Expansão diagnóstico-terapêutica com albumina 1g/kg/dia x 48h (máx 100g/dia).",
              color: "#8B5CF6"
            },
            {
              text: "2. 1ª linha: Terlipressina 0,5-2mg IV a cada 4-6h + albumina 20-40g/dia. Maior evidência disponível (CONFIRM, 2021).",
              color: "#EF4444"
            },
            {
              text: "3. Alternativa (UTI): Noradrenalina 0,5-3mg/h IV contínua + albumina. Eficácia comparável à terlipressina. Exige monitoramento invasivo.",
              color: "#F59E0B"
            },
            {
              text: "4. Alternativa (SHR-2 / ambulatorial): Midodrina 7,5-12,5mg VO 3x/dia + Octreotida SC 100-200mcg 3x/dia + albumina IV semanal.",
              color: "#6366F1"
            },
            {
              text: "5. TIPS: considerar no SHR-2 sem EH grave e Child ≤ B9. Melhora função renal mas sem impacto na sobrevida comprovado.",
              color: "#10B981"
            },
            {
              text: "6. TRANSPLANTE HEPÁTICO: ÚNICO tratamento definitivo. Prioridade máxima. Avaliar imediatamente.",
              color: "#10B981"
            }
          ]
        },
        {
          type: "obs",
          title: "CONFIRM Trial — Terlipressina no SHR (NEJM 2021)",
          text: "300 pacientes com SHR-AKI. Terlipressina vs. placebo (ambos + albumina). Reversão confirmada do SHR: 32% vs. 17% (p < 0,001). Reversão sem diálise ou recorrência em 10 dias: 29% vs. 16% (p = 0,012). Sem diferença de sobrevida aos 90 dias (endpoint secundário). Taxa de eventos respiratórios graves maior no grupo terlipressina (11% vs. 2%). FDA aprovou terlipressina para SHR em setembro de 2022. NNT para reversão ≈ 7."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 7. ENCEFALOPATIA HEPÁTICA
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "encefalopatia",
    name: "Encefalopatia Hepática",
    color: "#F97316",
    content: {
      title: "Encefalopatia Hepática — Classificação e Manejo",
      blocks: [
        {
          type: "grades",
          title: "Classificação de West Haven",
          organ: "encefalopatia",
          grades: [
            {
              grade: "Mín",
              color: "#10B981",
              items: [
                "Sem alteração clínica detectável",
                "Alterações em testes neuropsicológicos (trilha, flicker)",
                "Impacto em qualidade de vida, condução de veículos e trabalho"
              ]
            },
            {
              grade: "I",
              color: "#84CC16",
              items: [
                "Inversão do ciclo sono-vigília",
                "Euforia ou ansiedade leve",
                "Diminuição de atenção e concentração",
                "Cálculo prejudicado"
              ]
            },
            {
              grade: "II",
              color: "#F59E0B",
              items: [
                "Asterixe (flapping tremor) — sinal mais característico",
                "Desorientação temporal/espacial leve-moderada",
                "Comportamento inadequado",
                "Fala arrastada"
              ]
            },
            {
              grade: "III",
              color: "#F97316",
              items: [
                "Sonolência / estupor (mas responsivo)",
                "Confusão intensa",
                "Comportamento grosseiro / desinibido",
                "Desorientação grave"
              ]
            },
            {
              grade: "IV",
              color: "#EF4444",
              items: [
                "Coma — sem resposta a estímulos verbais",
                "IVa: resposta a estímulos dolorosos",
                "IVb: sem resposta a estímulos dolorosos",
                "Risco de hipertensão intracraniana (IHA fulminante)"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Fisiopatologia — Hipótese Amoniacal + Inflamatória",
          items: [
            {
              label: "Amônia (NH3)",
              value: "Produzida no cólon (urease bacteriana) + intestino delgado (glutaminase). Em cirrose: shunting porto-sistêmico + ↓ metabolismo hepático → ↑ NH3 cerebral → edema astrocitário via síntese de glutamina.",
              highlight: true
            },
            {
              label: "Teoria Inflamatória",
              value: "Inflamação sistêmica (citocinas, LPS) potencializa neurotoxicidade da amônia. Infecção pode precipitar EH sem elevação expressiva de NH3 — explica EH pós-PBE.",
              highlight: true
            },
            {
              label: "Outros Neurotoxinas",
              value: "Mercaptanas, ácidos graxos de cadeia curta, fenóis, benzodiazepínicos endógenos (agonistas do receptor GABA-A)."
            },
            {
              label: "Deposição de Manganês",
              value: "Sinal T1 hiperintenso em gânglios da base na RM. Contribui para parkinsonismo e apraxia na cirrose avançada."
            }
          ]
        },
        {
          type: "decision",
          title: "Fatores Precipitantes — IDENTIFICAR E TRATAR",
          decisions: [
            {
              condition: "Causas Mais Comuns — Investigar Primeiro",
              color: "#EF4444",
              actions: [
                "Infecção: PBE, ITU, pneumonia — paracentese + hemoculturas + urinocultura",
                "Sangramento gastrointestinal — NH3 do sangue digerido (200mL de sangue = proteína equivalente a refeição completa)",
                "Constipação — ↑ produção e absorção de NH3 colônica",
                "Hiponatremia / hipocalemia → ↑ NH3 não-ionizada (forma que cruza BHE)"
              ]
            },
            {
              condition: "Causas Iatrogênicas",
              color: "#F59E0B",
              actions: [
                "Diuréticos em excesso → alcalose metabólica",
                "Benzodiazepínicos, opioides, sedativos (evitar ou usar com extrema cautela)",
                "TIPS: encefalopatia pós-TIPS em 10-40% dos casos",
                "Cirurgia ou procedimentos com anestesia geral"
              ]
            }
          ]
        },
        {
          type: "flow",
          title: "Tratamento da Encefalopatia Hepática",
          steps: [
            {
              text: "1. Identificar e TRATAR fator precipitante — reduz EH em > 80% dos episódios agudos.",
              color: "#F97316"
            },
            {
              text: "2. Lactulose 15-30mL VO ou SNG a cada 4-6h. Alvo: 2-3 evacuações pastosas/dia. EH grau III-IV sem via oral: enema 300mL + 700mL água a cada 4-6h.",
              color: "#10B981"
            },
            {
              text: "3. Rifaximina 550mg VO 2x/dia — adicionar à lactulose em EH recorrente ou persistente. NNT ≈ 4 para prevenir recorrência em 6 meses (Bass et al. NEJM 2010).",
              color: "#6366F1"
            },
            {
              text: "4. PROTEÍNA: NÃO RESTRINGIR. Meta: 1,2-1,5g/kg/dia. Preferir proteína vegetal (leguminosas) e de laticínios (menos aminoácidos aromáticos precursores de falsos neurotransmissores).",
              color: "#F59E0B"
            },
            {
              text: "5. Zinco: suplementar se deficiência (comum em cirrose — cofator de enzimas do ciclo da ureia). Dose: 220mg VO 2x/dia.",
              color: "#8B5CF6"
            },
            {
              text: "6. EH grau III-IV: UTI, proteção de vias aéreas, IOT preventiva em deterioração rápida. Elevar cabeceira 30°.",
              color: "#EF4444"
            }
          ]
        },
        {
          type: "alert",
          color: "#F97316",
          title: "Pérola de Banca — Restrição Proteica é CONTRAINDICADA",
          text: "Erro clássico de provas: restringir proteína na EH. Aumenta catabolismo muscular, piora sarcopenia (fator de mau prognóstico independente na cirrose) e NÃO melhora a EH. O tratamento é direcionar a proteína correta (vegetal/laticínio) na dose adequada, não reduzir a ingestão. EASL 2018 e ESPEN 2019 são categóricos nessa recomendação."
        },
        {
          type: "obs",
          title: "Bass et al. NEJM 2010 — Rifaximina para Prevenção de EH",
          text: "299 pacientes com EH recorrente, em remissão, randomizados para rifaximina 550mg 2x/dia vs. placebo por 6 meses. Redução de episódios de EH: 58% (HR 0,42, IC95% 0,28-0,64; p<0,001). Redução de hospitalizações por EH: 50% (HR 0,50; p<0,001). NNT para prevenir 1 episódio ≈ 4. Rifaximina não absorvível → ação luminal → reduz flora produtora de amônia sem efeitos sistêmicos (superior à neomicina em segurança)."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 8. SÍNDROME HEPATOPULMONAR
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "shp",
    name: "Sínd. Hepatopulmonar",
    color: "#10B981",
    content: {
      title: "Síndrome Hepatopulmonar — Diagnóstico e Manejo",
      blocks: [
        {
          type: "alert",
          color: "#10B981",
          title: "Tríade Diagnóstica da SHP",
          text: "1. Hepatopatia (cirrose, HTP) ou disfunção hepática. 2. Hipoxemia: PaO2 < 70 mmHg EM AR AMBIENTE (ou gradiente A-a O2 > 15 mmHg; > 20 mmHg se > 64 anos). 3. Dilatações vasculares intrapulmonares (DVIP) comprovadas por ecocardiograma contrastado ou cintilografia pulmonar."
        },
        {
          type: "grid",
          title: "Fisiopatologia e Sinais Patognomônicos",
          items: [
            {
              label: "DVIP",
              value: "Vasodilatação de capilares pulmonares (diâmetro normal 8-15µm → até 500µm). Mediada por NO (↑ eNOS), ET-1, TNF-α. Shunt funcional: O2 não atinge hemácias centrais. Sem vasoespasmo → vasodilatadores pulmonares são ineficazes.",
              highlight: true
            },
            {
              label: "Platipneia — PATOGNOMÔNICO",
              value: "Dispneia que PIORA em ortostase (sentado/em pé) e MELHORA em decúbito dorsal. DVIP predominam nas bases → piora com ortostase por aumento da perfusão basal. Ortopneia 'às avessas'.",
              highlight: true
            },
            {
              label: "Ortodeoxia — PATOGNOMÔNICO",
              value: "Queda da PaO2 ≥ 5% ou ≥ 4 mmHg ao assumir posição ortostática. Confirmar com gasometria em decúbito e em pé. Par platipneia + ortodeoxia = SHP até prova em contrário.",
              highlight: true
            },
            {
              label: "Diferencial SHP vs. Shunt Cardíaco",
              value: "Na SHP: O2 suplementar a 100% corrige parcialmente a hipoxemia (shunt funcional, não anatômico fixo). Em shunt cardíaco D→E verdadeiro: hipoxemia não responde a O2 a 100%."
            }
          ]
        },
        {
          type: "grades",
          title: "Classificação por Gravidade (PaO2 em ar ambiente)",
          organ: "SHP",
          grades: [
            {
              grade: "Leve",
              color: "#10B981",
              items: ["PaO2 ≥ 80 mmHg", "Gradiente A-a ≥ 15 mmHg"]
            },
            {
              grade: "Moderada",
              color: "#F59E0B",
              items: ["PaO2 60-79 mmHg"]
            },
            {
              grade: "Grave",
              color: "#F97316",
              items: ["PaO2 50-59 mmHg", "Prioridade para transplante"]
            },
            {
              grade: "Muito Grave",
              color: "#EF4444",
              items: [
                "PaO2 < 50 mmHg",
                "Indicação prioritária de Tx (MELD exception nos EUA)",
                "Mortalidade peri-Tx aumentada — risco-benefício a discutir"
              ]
            }
          ]
        },
        {
          type: "flow",
          title: "Diagnóstico da SHP",
          steps: [
            { text: "Gasometria arterial em ar ambiente (decúbito + ortostase): calcular PaO2 e gradiente A-a O2", color: "#10B981" },
            { text: "Ecocardiograma com contraste (bolhas salinas): microbolhas nas câmaras esquerdas após 3-6 batimentos cardíacos (vs. 1-2 em shunt cardíaco). Método de triagem preferido.", color: "#6366F1" },
            { text: "Cintilografia pulmonar com MAA-Tc99m (macroagregados de albumina): shunt extrapulmonar > 6% confirma SHP. Quantifica gravidade. Útil no pré-transplante.", color: "#F59E0B" },
            { text: "Angiografia pulmonar: não é primeira linha. Reservada para formas focais candidatas à embolização ou avaliação cirúrgica.", color: "#8B5CF6" }
          ]
        },
        {
          type: "grid",
          title: "Tratamento",
          items: [
            {
              label: "Transplante Hepático",
              value: "ÚNICO tratamento definitivo. Resolução completa da SHP em 85-90% dos casos. Melhora gradual em 6-12 meses pós-Tx. PaO2 < 60 mmHg = MELD exception points nos EUA (prioridade aumentada).",
              highlight: true
            },
            {
              label: "O2 Suplementar",
              value: "Paliativo. Melhora sintomas mas não reverte DVIP. Indicar desde PaO2 < 60 mmHg em repouso. Manter SpO2 ≥ 88-90%."
            },
            {
              label: "Sem Farmacoterapia Eficaz",
              value: "Pentoxifilina, azul de metileno, alho: estudos pequenos sem evidência robusta. Não recomendados rotineiramente. Antibióticos orais (norfloxacino): hipótese bacteriana — estudos em andamento."
            },
            {
              label: "TIPS",
              value: "Resultados inconsistentes. Pode piorar hipoxemia (↑ shunting). Não é indicação padrão na SHP — uso individualizado em casos selecionados."
            }
          ]
        },
        {
          type: "obs",
          title: "SHP vs. Hipertensão Portopulmonar — Diferencial Crítico de Banca",
          text: "SHP: vasodilatação pulmonar → hipoxemia → PaO2 baixa → O2 melhora parcialmente → Tx hepático indicado. HPP: vasoconstrição arteriolar pulmonar → hipertensão pulmonar → sem hipoxemia predominante → ECO mostra PAP elevada → tratar com vasodilatadores (sildenafil, bosentan, prostanoides). Transplante: SHP PaO2 < 50 mmHg = alto risco peri-Tx mas não é contraindicação absoluta. HPP com PAP > 45 mmHg É CONTRAINDICAÇÃO ABSOLUTA AO TRANSPLANTE."
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // 9. TRANSPLANTE HEPÁTICO
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "transplante",
    name: "Transplante Hepático",
    color: "#84CC16",
    content: {
      title: "Transplante Hepático — Indicações, Contra-indicações e Complicações",
      blocks: [
        {
          type: "alert",
          color: "#84CC16",
          title: "MELD Score — Critério de Alocação no Brasil",
          text: "MELD = 10 × [0,957 × ln(Creatinina) + 0,378 × ln(Bilirrubina) + 1,12 × ln(INR)] + 6,43. MELD ≥ 15: benefício de sobrevida com transplante vs. manejo clínico. Brasil — Portaria MS 2600/2009: critério de inclusão em lista = MELD ≥ 15 OU critério excepcional (CHC dentro de Milão, SHP grave, HPP respondedora a vasodilatadores)."
        },
        {
          type: "grid",
          title: "Indicações de Transplante Hepático",
          items: [
            {
              label: "Cirrose Descompensada",
              value: "Principal indicação. MELD ≥ 15 ou Child C ≥ 10. Descompensações: ascite refratária, PBE, EH recorrente, SHR, hemorragia varicosa refratária.",
              highlight: true
            },
            {
              label: "CHC — Critérios de Milão",
              value: "Nódulo único ≤ 5cm OU até 3 nódulos ≤ 3cm, sem invasão vascular macroscópica, sem metástase. Tx é tratamento curativo — sobrevida 5a ≈ 75% (Mazzaferro, NEJM 1996).",
              highlight: true
            },
            {
              label: "IHA Grave (Fulminante)",
              value: "Critérios de King's College (paracetamol ou não-paracetamol) ou Clichy. EH + coagulopatia grave. Urgência máxima na lista (status 1)."
            },
            {
              label: "Outras Indicações",
              value: "CBP, CEP, Budd-Chiari, doença de Wilson, hemocromatose, amiloidose, doença hepática policística, oxalose primária."
            }
          ]
        },
        {
          type: "grid",
          title: "Contra-Indicações ao Transplante",
          items: [
            {
              label: "ABSOLUTAS",
              value: "CHC fora dos critérios de Milão (metastático ou macroinfiltração vascular). AIDS com CD4 < 100 sem tratamento. Sepse não controlada. Doença cardiovascular ou pulmonar avançada irrecuperável. Uso ativo de álcool/drogas < 6 meses. HPP com PAP > 45 mmHg.",
              highlight: true
            },
            {
              label: "RELATIVAS",
              value: "Idade > 70 anos (avaliação caso a caso). Doença psiquiátrica grave sem controle. Obesidade grau 3 (IMC > 40) — HILATMA: maior risco de complicação cirúrgica. Outros carcinomas < 5 anos de remissão completa.",
              highlight: true
            },
            {
              label: "HILATMA",
              value: "Hepatectomia em Large Abdômen: obesidade mórbida + hepatomegalia + aderências = acesso cirúrgico extremamente difícil e mortalidade cirúrgica aumentada. Contraindicação relativa com potencial de remissão pós-emagrecimento."
            }
          ]
        },
        {
          type: "phases",
          title: "Complicações do Transplante",
          phases: [
            {
              number: "1",
              name: "Aguda (até 90 dias)",
              color: "#EF4444",
              items: [
                "Rejeição aguda celular: 20-30% dos receptores",
                "Diagnóstico: elevação de transaminases (AST/ALT) + biópsia hepática",
                "Histologia: tríade de rejeição — infiltrado portal, endotelite venosa, colangite",
                "Tratamento: pulsoterapia com metilprednisolona 500-1000mg IV x 3 dias",
                "Infecções oportunistas: CMV (peak 4-6 semanas), Pneumocystis jirovecii, fungos invasivos",
                "Trombose da artéria hepática: complicação vascular mais grave (5-10%)"
              ]
            },
            {
              number: "2",
              name: "Crônica (> 6 meses)",
              color: "#F59E0B",
              items: [
                "Rejeição crônica ductopênica: perda progressiva de ductos biliares (vanishing bile duct syndrome)",
                "Principal causa: MÁ ADESÃO AO IMUNOSSUPRESSOR",
                "Histologia: ductopenia (< 50% dos espaços porta com ducto biliar) + arteriopatia obliterativa",
                "Pode evoluir para retransplante",
                "Complicações metabólicas dos IS: HAS, DM, dislipidemia, nefrotoxicidade (tacrolimus/ciclosporina)",
                "Recidiva da doença de base: hepatite B (rara com profilaxia), NASH, CBP, CEP"
              ]
            }
          ]
        },
        {
          type: "grid",
          title: "Imunossupressão Padrão Pós-Tx",
          items: [
            {
              label: "Inibidores de Calcineurina",
              value: "Tacrolimus (FK506) — base da IS. Superior à ciclosporina (menor rejeição). Nefrotoxicidade é o principal efeito adverso a longo prazo. Monitorar níveis séricos e função renal.",
              highlight: true
            },
            {
              label: "Antiproliferativos",
              value: "Micofenolato mofetila (MMF) 1g 2x/dia ou Azatioprina — adjuvantes, poupadores de calcineurina."
            },
            {
              label: "Corticoides",
              value: "Pulsoterapia na indução e na rejeição aguda. Retirada progressiva em 3-12 meses. Manter em rejeição córtico-resistente + conversor de tacrolimus para ciclosporina."
            },
            {
              label: "mTOR Inibidores",
              value: "Sirolimus / Everolimus: menor nefrotoxicidade, efeito antiproliferativo potencial (preferidos no CHC). Não usar nas primeiras semanas pós-Tx (retardo na cicatrização)."
            }
          ]
        },
        {
          type: "obs",
          title: "Critérios de Milão — O Trial que Definiu o Transplante no CHC",
          text: "Mazzaferro et al., NEJM 1996: 48 pacientes com CHC dentro dos critérios transplantados. Sobrevida em 4 anos: 75% vs. 40% fora dos critérios. Taxa de recorrência: 8% vs. 59%. Este trial único estabeleceu os critérios de Milão como padrão global. Critérios expandidos (UCSF, Metroticket 2.0) tentam ampliar elegibilidade com resultados oncológicos equivalentes em centros selecionados."
        }
      ]
    }
  }
];

export default function ComplicacoesInsuficienciaHepatica() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Clínica / Gastroenterologia"
      title="Insuficiência Hepática — Complicações"
    />
  );
}
