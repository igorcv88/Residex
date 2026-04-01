import MedPanelPage from "./medpanel-layout";

const systems = [
  {
    id: "gastro",
    name: "Gastrointestinal",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Gastroproteção mucosa",
          detail:
            "PGE₂ e PGI₂ produzidas pela COX-1 constitutiva estimulam secreção de muco e bicarbonato pelo epitélio gástrico, criando barreira física e química contra o HCl. PGE₂ atua em receptores EP₃ nas células parietais inibindo secreção ácida basal.",
        },
        {
          title: "Manutenção do fluxo sanguíneo mucoso",
          detail:
            "PGI₂ mantém microcirculação submucosa vasodilatada. Fluxo adequado é essencial para remoção de retrofluxo de H⁺ e manutenção do gradiente de pH.",
        },
        {
          title: "Proliferação epitelial",
          detail:
            "PGE₂ estimula migração e proliferação de células epiteliais para reparo de microlesões contínuas da mucosa.",
        },
        {
          title: "Motilidade intestinal basal",
          detail:
            "COX-1 no plexo mioentérico contribui com tônus prostaglandínico basal da motilidade. Papel regulatório mais permissivo que dominante.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Redução de muco e bicarbonato → exposição direta do epitélio ao HCl → úlcera péptica (gástrica > duodenal)",
        },
        {
          severity: "high",
          text: "Queda do fluxo sanguíneo mucoso → isquemia relativa → erosões hemorrágicas",
        },
        {
          severity: "high",
          text: "Risco de perfuração, sangramento digestivo alto — complicações que justificam black box warning dos NSAIDs",
        },
        {
          severity: "med",
          text: "Efeito sistêmico — não depende de contato local. NSAIDs IV ou supositório têm mesmo risco GI que via oral",
        },
        {
          severity: "low",
          text: "Dismotilidade leve, constipação ou diarreia dependendo do balanço de PGs no plexo",
        },
      ],
      drugs:
        "Indometacina e ketorolac têm maior risco GI da classe. Ibuprofeno > naproxeno em risco GI em uso crônico. AAS em baixa dose mantém risco GI mesmo sem efeito analgésico.",
    },
    cox2: {
      physiology: [
        {
          title: "Papel mínimo em mucosa gástrica normal",
          detail:
            "COX-2 não é expressa constitutivamente na mucosa gástrica saudável. Sua contribuição para gastroproteção basal é negligível — razão pela qual coxibs reduzem risco GI.",
        },
        {
          title: "Reparo pós-lesão",
          detail:
            "COX-2 é induzida em resposta a lesão mucosa e inflamação local, contribuindo com PGE₂ para reparo epitelial e angiogênese cicatricial. Paradoxo: coxibs em mucosa já lesada podem retardar cicatrização de úlceras existentes.",
        },
        {
          title: "Carcinogênese colorretal",
          detail:
            "COX-2 é superexpressa em 80-90% dos adenomas e carcinomas colorretais. PGE₂ derivada de COX-2 tumoral promove proliferação, inibe apoptose, estimula angiogênese e suprime imunidade antitumoral via receptor EP₄.",
        },
      ],
      inhibition: [
        {
          severity: "low",
          text: "Preservação da mucosa gástrica — principal vantagem dos coxibs vs. NSAIDs não seletivos",
        },
        {
          severity: "med",
          text: "Retardo de cicatrização em úlceras já existentes — coxibs não são seguros em úlcera ativa",
        },
        {
          severity: "low",
          text: "Redução de pólipos adenomatosos — base da aprovação do celecoxib em PAF (polipose adenomatosa familiar)",
        },
        {
          severity: "low",
          text: "Potencial quimioprotetor colorretal — evidência observacional robusta mas sem aprovação preventiva formal",
        },
      ],
      drugs:
        "Celecoxib 400mg 2x/dia aprovado como adjuvante em PAF. APC trial: redução de 28-45% de pólipos, mas com sinal de risco CV dose-dependente. Nimesulida e etodolac têm COX-2 preferencial (~10x) com benefício GI intermediário.",
    },
  },
  {
    id: "cardio",
    name: "Cardiovascular",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "TXA₂ plaquetário — pró-agregação",
          detail:
            "COX-1 é a única isoforma expressa em plaquetas maduras (anucleadas, sem síntese proteica). Converte AA em TXA₂, potente vasoconstritor e indutor de agregação plaquetária. Peça central da hemostasia primária.",
        },
        {
          title: "PGI₂ endotelial — antiagregação",
          detail:
            "Células endoteliais expressam COX-1 (e COX-2) para produzir PGI₂ (prostaciclina), que age em receptores IP em plaquetas e músculo liso: inibe agregação, promove vasodilatação. Contrapeso fisiológico ao TXA₂.",
        },
        {
          title: "Equilíbrio TXA₂/PGI₂",
          detail:
            "O balanço entre TXA₂ plaquetário (pró-trombótico) e PGI₂ endotelial (antitrombótico) determina o tônus hemostático vascular. Qualquer perturbação desse equilíbrio tem consequências CV.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Inibição de TXA₂ plaquetário → antiagregação → efeito ANTITROMBÓTICO. Base do AAS em baixa dose para profilaxia CV",
        },
        {
          severity: "med",
          text: "Inibição concomitante de PGI₂ endotelial → parcialmente neutraliza o efeito antitrombótico — por isso AAS baixa dose (162mg) inibe COX-1 plaquetária irreversivelmente com menor impacto endotelial (endotélio sintetiza nova COX-1, plaqueta não)",
        },
        {
          severity: "med",
          text: "NSAIDs não seletivos (ibuprofeno) inibem COX-1 reversivelmente — ibuprofeno compete com AAS pelo sítio ativo, podendo ANULAR o efeito antiagregante do AAS se tomado antes",
        },
        {
          severity: "low",
          text: "Leve vasodilatação por redução de TXA₂ vasoconstricor — efeito clinicamente irrelevante em doses usuais",
        },
      ],
      drugs:
        "AAS 75-162mg: inibição COX-1 plaquetária irreversível — pilar da profilaxia CV. Ibuprofeno tomado antes do AAS bloqueia o efeito antiagregante. Naproxeno não interfere com AAS pelo mesmo mecanismo. Flurbiprofeno: maior seletividade COX-1 → antiagregação intensa, limitando seu uso sistêmico.",
    },
    cox2: {
      physiology: [
        {
          title: "PGI₂ endotelial vascular — predominantemente COX-2",
          detail:
            "No endotélio vascular, COX-2 é a principal isoforma responsável pela produção de PGI₂ sistêmica. Enquanto COX-1 plaquetária faz TXA₂, COX-2 endotelial faz PGI₂ — o antagonista fisiológico.",
        },
        {
          title: "Resposta inflamatória vascular",
          detail:
            "Em lesão/inflamação vascular, COX-2 é induzida em células musculares lisas e macrófagos da placa aterosclerótica. PGE₂ local modula instabilidade da placa — papel ainda debatido.",
        },
        {
          title: "Regulação da PA",
          detail:
            "COX-2 no rim (mácula densa) produz PGE₂ que modula liberação de renina. COX-2 vascular contribui com PGI₂ vasodilatadora. Eixo integrado com SRAA.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "↓ PGI₂ endotelial → TXA₂ plaquetário sem contrapeso → estado PROTROMBÓTICO → risco aumentado de IAM e AVC isquêmico",
        },
        {
          severity: "high",
          text: "Risco dose e seletividade-dependente: rofecoxib (270x) > etoricoxib (106x) > celecoxib (30x) > NSAIDs não seletivos (efeito misto)",
        },
        {
          severity: "high",
          text: "Elevação de PA sistólica (~3-5mmHg média) por perda de vasodilatação PGI₂-dependente e retenção hidrossalina",
        },
        {
          severity: "med",
          text: "Descompensação de IC por retenção de sódio e aumento de pós-carga",
        },
        {
          severity: "low",
          text: "NSAIDs não seletivos: inibem TXA₂ E PGI₂ simultaneamente → efeito CV mais neutro — mas não neutro, especialmente com meia-vida longa (naproxeno) ou doses altas (ibuprofeno)",
        },
      ],
      drugs:
        "Rofecoxib retirado em 2004 (VIGOR trial: 5x mais IAM vs. naproxeno). Lumiracoxib (500-700x seletivo): nunca chegou a ter dados CV suficientes — retirado por hepatotoxicidade. PRECISION trial 2016: celecoxib não inferior CV ao naproxeno e ibuprofeno em 24.000 pacientes. Diclofenaco: pior perfil CV entre não seletivos (Bhala, Lancet 2013).",
    },
  },
  {
    id: "renal",
    name: "Renal",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Vasodilatação da arteríola aferente",
          detail:
            "COX-1 na arteríola aferente produz PGI₂ e PGE₂ vasodilatatoras. Em condições normais, papel permissivo — o rim funciona sem depender dessas PGs quando perfusão é adequada.",
        },
        {
          title: "PGE₂ tubular — natriurese",
          detail:
            "COX-1 no túbulo coletor medular produz PGE₂ que antagoniza ADH (vasopressina) e aldosterona, promovendo natriurese e diurese. Regulação fina do volume extracelular.",
        },
        {
          title: "Ativação crítica em hipoperfusão",
          detail:
            "Quando há ativação do SRAA (hipovolemia, ICC, cirrose, uso de IECA/BRA), angiotensina II e noradrenalina causam vasoconstricção renal. PGs se tornam ESSENCIAIS para contrariar essa vasoconstricção e manter TFG. É aqui que inibir COX causa lesão.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Em estados de ativação do SRAA: vasoconstricção aferente descontrolada → queda abrupta de TFG → IRA hemodinâmica (pré-renal funcional, reversível com suspensão)",
        },
        {
          severity: "high",
          text: "Retenção de sódio e água por remoção do antagonismo de ADH/aldosterona → edema, HAS, descompensação de IC",
        },
        {
          severity: "med",
          text: "Hiperpotassemia leve por redução da secreção de aldosterona (mecanismo parcialmente COX-1 dependente)",
        },
        {
          severity: "low",
          text: "Em normovolemia com rim saudável: efeito mínimo — este é o ponto crítico que explica por que NSAIDs são seguros em jovens hígidos mas perigosos em idosos/cardiopatas",
        },
      ],
      drugs:
        "Ketorolac: maior risco IRA da classe — limite 5 dias pela FDA. Indometacina: usada terapeuticamente para fechar canal arterial em prematuros (mecanismo = vasoconstricção renal intencional). Ibuprofeno >1600mg/dia: dados epidemiológicos robustos de IRA em uso crônico.",
    },
    cox2: {
      physiology: [
        {
          title: "COX-2 na mácula densa — controle de renina",
          detail:
            "COX-2 é constitutivamente expressa na mácula densa e no segmento ascendente espesso da alça de Henle. PGE₂ gerada aqui estimula liberação de renina pelo aparelho justaglomerular — integração direta COX-2/SRAA.",
        },
        {
          title: "COX-2 no interstício medular",
          detail:
            "Células intersticiais da medula renal expressam COX-2 constitutivamente. PGE₂ produzida protege a medula contra hipóxia — a medula é o segmento mais vulnerável do rim por ser o de maior demanda metabólica e menor PO₂.",
        },
        {
          title: "Regulação do desenvolvimento renal",
          detail:
            "COX-2 é essencial para desenvolvimento normal da arquitetura renal in utero. Camundongos knockout COX-2 desenvolvem hipoplasia renal grave, confirmando papel ontogenético.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Supressão da síntese de renina → queda de angiotensina II e aldosterona → hipoaldosteronismo hiporreninêmico → HIPERPOTASSEMIA — risco especial em IRC, diabetes, uso de IECA/BRA/espironolactona",
        },
        {
          severity: "high",
          text: "Isquemia medular progressiva em uso crônico → nefrite intersticial crônica → DRC — a 'nefropatia analgésica' moderna (antes atribuída à fenacetina)",
        },
        {
          severity: "high",
          text: "Retenção hidrossalina dose-dependente → edema, HAS — coxibs têm efeito igual ou MAIOR que NSAIDs não seletivos nesse parâmetro (PRECISION: 1,1% eventos renais com celecoxib vs. 0,9% naproxeno)",
        },
        {
          severity: "med",
          text: "Feto: COX-2 inibida no terceiro trimestre → oligoâmnio, hipoplasia pulmonar fetal, IRA neonatal, fechamento prematuro do canal arterial",
        },
      ],
      drugs:
        "Coxibs NÃO são nefroprotetores — mito clínico importante. Etoricoxib: elevação de PA e retenção hídrica dose-dependentes — monitorar PA em 2 semanas. Celecoxib em PAF: necessidade de monitoramento renal periódico em uso crônico. Meloxicam: perfil intermediário — COX-2 preferencial mas não seletivo puro.",
    },
  },
  {
    id: "inflam",
    name: "Inflamação e Dor",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Contribuição constitutiva à inflamação basal",
          detail:
            "COX-1 está presente em mastócitos, macrófagos residentes e plaquetas que chegam ao sítio inflamatório. Contribui com PGE₂ e PGF₂α nas fases iniciais da resposta inflamatória antes da indução de COX-2.",
        },
        {
          title: "COX-1 neuronal central — analgesia central",
          detail:
            "COX-1 é expressa constitutivamente em neurônios do corno dorsal medular, gânglios da raiz dorsal e microglia. PGE₂ espinhal derivada de COX-1 contribui para sensibilização central e hiperalgesia. Esse é o componente analgésico central que NSAIDs não seletivos têm e coxibs perdem.",
        },
        {
          title: "Papel na febre",
          detail:
            "Ambas COX-1 e COX-2 contribuem para produção de PGE₂ no hipotálamo. COX-1 tem papel mais relevante na fase inicial da resposta febril antes da indução de COX-2.",
        },
      ],
      inhibition: [
        {
          severity: "med",
          text: "Analgesia — componente real mas secundário ao efeito COX-2. Principalmente via inibição de COX-1 neuronal espinhal (sensibilização central)",
        },
        {
          severity: "med",
          text: "Antipirético — contribuição inicial. NSAIDs não seletivos têm efeito antipirético mais robusto que coxibs puros",
        },
        {
          severity: "low",
          text: "Anti-inflamatório periférico leve — inibição das fases iniciais antes da indução de COX-2",
        },
        {
          severity: "low",
          text: "NSAIDs não seletivos que inibem COX-1 neuronal têm NNT ligeiramente melhor que coxibs em dor aguda — componente analgésico central explica essa diferença",
        },
      ],
      drugs:
        "Ibuprofeno 400mg NNT 2.5 vs. celecoxib 200mg NNT 4.2 — diferença parcialmente explicada pela perda do componente COX-1 central do celecoxib. Ketoprofeno: alta penetração no SNC → componente analgésico central especialmente relevante.",
    },
    cox2: {
      physiology: [
        {
          title: "Isoforma induzível — a enzima da inflamação",
          detail:
            "COX-2 tem expressão basal praticamente nula na maioria dos tecidos. É induzida por citocinas (IL-1β, TNF-α, IL-6), LPS, fatores de crescimento e estresse mecânico. NF-κB é o principal fator de transcrição. Tempo de indução: 30-60 minutos após estímulo inflamatório.",
        },
        {
          title: "PGE₂ periférica — dor, calor, rubor, edema",
          detail:
            "PGE₂ derivada de COX-2 no tecido inflamado age em receptores EP₁-EP₄: EP₁ e EP₃ → sensibilização de nociceptores periféricos (hiperalgesia primária), EP₂ e EP₄ → vasodilatação, aumento da permeabilidade capilar (edema, rubor, calor).",
        },
        {
          title: "PGE₂ central — sensibilização central e febre",
          detail:
            "COX-2 induzida em microglia e astrócitos do SNC (hipotálamo, medula espinhal) por citocinas circulantes. PGE₂ hipotalâmica → febre (receptor EP₃). PGE₂ espinhal → hiperalgesia secundária, alodinia.",
        },
        {
          title: "Resolução da inflamação",
          detail:
            "Paradoxo: COX-2 tardia também produz 15d-PGJ₂, ligante endógeno de PPARγ, com efeitos anti-inflamatórios. Inibir COX-2 cronicamente pode retardar a resolução — dado importante em inflamações que deveriam ser autolimitadas.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Analgesia robusta — inibição da sensibilização periférica e central. Principal mecanismo analgésico de TODOS os NSAIDs",
        },
        {
          severity: "high",
          text: "Anti-inflamatório — redução de edema, calor, rubor por queda de PGE₂/PGI₂ vasodilatatoras locais",
        },
        {
          severity: "high",
          text: "Antipirético — PGE₂ hipotalâmica bloqueada → reset do set-point térmico",
        },
        {
          severity: "med",
          text: "Potencial retardo da resolução inflamatória em uso prolongado (perda de 15d-PGJ₂/PPARγ)",
        },
        {
          severity: "low",
          text: "Quimioprevenção oncológica — evidência em câncer colorretal, esofágico, gástrico. Celecoxib: aprovado em PAF",
        },
      ],
      drugs:
        "Etoricoxib 120mg NNT ~1.9 em dor aguda — seletividade COX-2 elevada com alta potência absoluta. Indometacina: COX-2 muito potente + COX-1 → maior anti-inflamatório da classe, usado em gota e periartrite. Meloxicam: preferencial COX-2, onset lento (5-6h Tmax VO) → inadequado para dor aguda, ideal para crônica.",
    },
  },
  {
    id: "resp",
    name: "Respiratório",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Tônus brônquico basal",
          detail:
            "PGE₂ derivada de COX-1 atua em receptores EP₂ no músculo liso brônquico → broncodilatação. Contrabalança parcialmente o tônus colinérgico constrictivo basal.",
        },
        {
          title: "Muco das vias aéreas",
          detail:
            "PGE₂ estimula secreção de muco brônquico e atividade ciliar. Papel protetor na higiene mucociliar.",
        },
        {
          title: "Desvio do AA para leucotrienos",
          detail:
            "Ponto crítico: quando COX é inibida, o ácido araquidônico acumulado é desviado para a via da 5-lipoxigenase (5-LOX) → leucotrienos (LTC₄, LTD₄, LTE₄) → broncoconstrição intensa em indivíduos susceptíveis.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Síndrome de Samter (tríade: pólipos nasais + asma + sensibilidade a AAS/NSAIDs) — desvio de AA para leucotrienos → broncoespasmo grave. Prevalência: ~10% dos asmáticos",
        },
        {
          severity: "high",
          text: "Broncospasmo agudo em susceptíveis — reação dose-dependente, piora com inibição COX-1 intensa (AAS, ibuprofeno, indometacina)",
        },
        {
          severity: "med",
          text: "Rinite vasomotora por hiperemia de mucosa nasal — desvio para leucotrienos → edema nasal",
        },
        {
          severity: "low",
          text: "Em não-susceptíveis: sem efeito clinicamente relevante sobre função pulmonar",
        },
      ],
      drugs:
        "AAS: principal causador de asma por AAS pela inibição COX-1 intensa e irreversível. Paracetamol: inibição COX muito fraca — opção segura em asmáticos AINE-sensíveis. Coxibs: menor desvio para leucotrienos por preservação de COX-1 → melhor tolerados em asmáticos AINE-sensíveis (mas não absolutamente seguros).",
    },
    cox2: {
      physiology: [
        {
          title: "Papel mínimo em brônquios normais",
          detail:
            "COX-2 tem expressão basal negligível no epitélio brônquico normal. Induzida em inflamação alérgica, asma grave, infecções respiratórias.",
        },
        {
          title: "Inflamação alérgica — papel complexo",
          detail:
            "Em asma atópica, COX-2 induzida por IL-4/IL-13 produz PGE₂ que paradoxalmente tem efeito protetor broncodilatador via EP₂. Inibir COX-2 em asma alérgica pode portanto piorar broncoespasmo — mecanismo distinto da síndrome de Samter.",
        },
        {
          title: "Surfactante e integridade alveolar",
          detail:
            "COX-2 em pneumócitos tipo II contribui para síntese de surfactante em resposta a estresse. Papel relevante no pulmão fetal — inibição gestacional implica risco de hipoplasia pulmonar.",
        },
      ],
      inhibition: [
        {
          severity: "med",
          text: "Em asma alérgica: perda de PGE₂ broncodilatadora (EP₂) → pode agravar broncoespasmo por mecanismo diferente da síndrome de Samter",
        },
        {
          severity: "med",
          text: "Feto: inibição COX-2 no terceiro trimestre → hipoplasia pulmonar fetal (redução de surfactante)",
        },
        {
          severity: "low",
          text: "Coxibs: menor desvio de AA para leucotrienos vs. NSAIDs COX-1 ativos → relativa vantagem em síndrome de Samter",
        },
        {
          severity: "low",
          text: "Sem efeito significativo em pulmão adulto saudável fora do contexto alérgico/asmático",
        },
      ],
      drugs:
        "Celecoxib: preferido em pacientes com histórico de broncoespasmo por AAS (síndrome de Samter). Atenção: coxibs NÃO são completamente seguros em asma — monitorar. Zileutona (inibidor 5-LOX) e montelucaste (antagonista LTD₄) são complementos em Samter, não substitutos.",
    },
  },
  {
    id: "repro",
    name: "Reprodutivo / Obstétrico",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Síntese de TXA₂ placentário",
          detail:
            "COX-1 plaquetária e placentária produz TXA₂ com papel na vasoconstricção uteroplacentária em equilíbrio com PGI₂. Desequilíbrio TXA₂/PGI₂ na pré-eclâmpsia (↑TXA₂, ↓PGI₂) é central para a fisiopatologia.",
        },
        {
          title: "Hemostasia no parto",
          detail:
            "COX-1 plaquetária essencial para hemostasia adequada após descolamento placentário.",
        },
      ],
      inhibition: [
        {
          severity: "med",
          text: "AAS baixa dose (75-150mg): inibição preferencial de COX-1 plaquetária → reduz TXA₂ sem reduzir tanto PGI₂ endotelial → restaura equilíbrio → usado em prevenção de pré-eclâmpsia em gestantes de alto risco (evidência sólida, Cochrane 2019)",
        },
        {
          severity: "med",
          text: "NSAIDs não seletivos: antiagregação → risco aumentado de sangramento perioperatório em cesárea/parto",
        },
        {
          severity: "low",
          text: "Tocolítico leve — inibição de COX-1 miometrial reduz PGF₂α contrátil, usado historicamente",
        },
      ],
      drugs:
        "AAS 75-162mg: recomendado a partir de 12-16 semanas em gestantes com alto risco de pré-eclâmpsia (≥1 fator de alto risco ou ≥2 fatores moderados). NICE, ACOG e FEBRASGO concordam na indicação.",
    },
    cox2: {
      physiology: [
        {
          title: "Ovulação — papel essencial",
          detail:
            "COX-2 é induzida na granulosa do folículo dominante pelo pico de LH. PGE₂ local é essencial para ruptura folicular e liberação do oócito. Knockout COX-2 em camundongas: infertilidade completa por falha de ovulação.",
        },
        {
          title: "Implantação embrionária",
          detail:
            "COX-2 no endométrio é induzida pelo embrião implantando. PGE₂ e PGI₂ locais aumentam permeabilidade vascular, remodelação do estroma e expressão de integrinas — processo de receptividade endometrial.",
        },
        {
          title: "Manutenção do canal arterial fetal",
          detail:
            "COX-2 no ducto arterioso produz PGE₂ que mantém o canal patente no feto — essencial para circulação fetal. Ao nascimento, a queda fisiológica de PGE₂ contribui para fechamento.",
        },
        {
          title: "Trabalho de parto",
          detail:
            "COX-2 é induzida nas membranas amnióticas, decidua e miométrio nas semanas que precedem o parto a termo. PGE₂ e PGF₂α → amadurecimento cervical, contrações uterinas coordenadas.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Fechamento prematuro do canal arterial → hipertensão pulmonar neonatal → contraindicação absoluta de NSAIDs/coxibs no terceiro trimestre (>28 semanas)",
        },
        {
          severity: "high",
          text: "Oligoidrâmnio fetal por redução da diurese fetal (COX-2 renal fetal inibida) — pode ser irreversível se prolongado",
        },
        {
          severity: "med",
          text: "Disfunção ovulatória em uso crônico — ciclos anovulatórios documentados em mulheres em uso regular de NSAIDs. Reversível com suspensão (Luteal Unruptured Follicle syndrome — LUF)",
        },
        {
          severity: "med",
          text: "Inibição da implantação — relevante em mulheres tentando engravidar. Dados principalmente de modelos animais mas consistentes o suficiente para recomendar evitar NSAIDs na janela de implantação (dias 7-10 pós-ovulação)",
        },
        {
          severity: "med",
          text: "Tocolítico — indometacina IV é usado para tocolise em trabalho de parto prematuro (24-32 semanas), monitorando canal arterial fetal com eco seriada. Uso máximo 48-72h",
        },
      ],
      drugs:
        "Indometacina IV: tocolítico de segunda linha com evidência — eficaz, mas requer monitorização ecocardiográfica fetal. Celecoxib e outros coxibs: absolutamente contraindicados em gravidez (maior impacto em COX-2 necessária para canal arterial). AAS baixa dose: único NSAID com indicação ativa durante a gravidez (pré-eclâmpsia).",
    },
  },
  {
    id: "neuro",
    name: "Neurológico / SNC",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Expressão constitutiva neuronal",
          detail:
            "COX-1 é expressa em neurônios do corno dorsal medular, gânglios da raiz dorsal e microglia em repouso. PGE₂ espinhal mantém tônus de excitabilidade basal nos circuitos de dor.",
        },
        {
          title: "Neuroproteção microglial",
          detail:
            "Microglia em repouso usa COX-1 para produzir PGE₂ com função regulatória do ambiente neuronal. Papel protetor na homeostase sináptica.",
        },
      ],
      inhibition: [
        {
          severity: "med",
          text: "Analgesia central — componente real via inibição de PGE₂ espinhal derivada de COX-1. Explica parte da eficácia analgésica dos NSAIDs não seletivos sobre coxibs",
        },
        {
          severity: "med",
          text: "Indometacina: penetração SNC intensa → cefaleia, tontura, psicose rara — efeitos adversos neurológicos mais frequentes da classe",
        },
        {
          severity: "low",
          text: "Não há efeito neuroprotetor clinicamente estabelecido pela inibição de COX-1",
        },
      ],
      drugs:
        "Ketoprofeno: alta lipossolubilidade e penetração SNC → componente analgésico central superior ao ibuprofeno, justificando potência desproporcional à dose. Indometacina: usada em diagnóstico diferencial de cefaleia (cefaleia respondedora à indometacina inclui hemicrania contínua e hemicrania paroxística).",
    },
    cox2: {
      physiology: [
        {
          title: "COX-2 induzível em microglia e astrócitos",
          detail:
            "Em resposta a citocinas inflamatórias periféricas, lesão neuronal ou infecção, COX-2 é induzida em microglia ativada e astrócitos. PGE₂ central gerada é o mediador da febre hipotalâmica e da sensibilização central.",
        },
        {
          title: "Neuroplasticidade e potenciação de longa duração",
          detail:
            "COX-2 é expressa em neurônios pós-sinápticos do hipocampo e córtex em resposta à atividade sináptica (gene de resposta imediata). PGE₂ hipocampal modula potenciação de longa duração (LTP) — base de mecanismos de memória. Relevância clínica ainda investigada.",
        },
        {
          title: "Neuroinflamação em doenças degenerativas",
          detail:
            "COX-2 é superexpressa em Alzheimer, Parkinson e ELA — detectada em neurônios e microglia ativada em placas amiloides. PGE₂ local contribui para neurotoxicidade inflamatória crónica.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Antipirese — bloqueio de PGE₂ hipotalâmica → reset do termostato. Mecanismo mais relevante para a antipirexia de NSAIDs e coxibs",
        },
        {
          severity: "high",
          text: "Analgesia central — redução de sensibilização central (hiperalgesia secundária, alodinia) via bloqueio de PGE₂ espinhal induzida por inflamação",
        },
        {
          severity: "med",
          text: "Potencial neuroprotetor em Alzheimer — hipótese de longa data baseada em estudos epidemiológicos (uso crônico de NSAIDs reduz risco de DA em ~30-40%). Ensaios clínicos com celecoxib e naproxeno em prevenção de DA: negativos ou com tendência prejudicial — janela terapêutica provavelmente pré-sintomática",
        },
        {
          severity: "med",
          text: "Possível prejuízo à neuroplasticidade em uso crônico — dados experimentais de prejuízo de memória em roedores com inibição COX-2 prolongada. Relevância humana incerta",
        },
      ],
      drugs:
        "Indometacina intratecal: usada em pesquisa para dissecção de mecanismos espinhais de dor. Celecoxib em Alzheimer: ADAPT trial (2004-2007) interrompido por sinal de risco CV; sem resultado definitivo sobre neuroproteção. Ibuprofeno: evidência epidemiológica mais robusta de potencial protetor em DA, mas sem confirmação em RCT.",
    },
  },
  {
    id: "onco",
    name: "Oncologia",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Papel limitado na carcinogênese",
          detail:
            "COX-1 não tem papel proeminente na progressão tumoral na maioria dos cânceres. Expressa constitutivamente em células tumorais de vários tipos, mas sem função regulatória clara na proliferação.",
        },
        {
          title: "Angiogênese tumoral — papel menor",
          detail:
            "COX-1 contribui minimamente com TXA₂ pró-angiogênico em alguns tumores. COX-2 é o alvo oncológico principal.",
        },
      ],
      inhibition: [
        {
          severity: "low",
          text: "Antiagregação plaquetária (TXA₂↓) — plaquetas facilitam extravasamento e formação de metástases ao proteger células tumorais circulantes. AAS: evidência epidemiológica de redução de metástases hematogênicas, principalmente colorretal",
        },
        {
          severity: "low",
          text: "AAS em baixa dose: redução de risco de câncer colorretal (~20-25%) — estudos observacionais e alguns RCTs. Mecanismo provavelmente misto COX-1 e COX-2",
        },
      ],
      drugs:
        "AAS 75-325mg: evidência mais robusta para quimioprevenção de CCR entre todos os NSAIDs — revisão sistemática Rothwell et al. (Lancet 2010): redução de 24% na incidência e 35% na mortalidade por CCR. USPSTF inclui AAS baixa dose em recomendações de prevenção de CCR em população específica.",
    },
    cox2: {
      physiology: [
        {
          title: "Superexpressão em tumores epiteliais",
          detail:
            "COX-2 está superexpressa em 80-90% dos adenocarcinomas colorretais, 70-80% dos carcinomas gástricos, 50-70% dos carcinomas de esôfago, mama, pulmão e próstata. Correlaciona com pior prognóstico e maior invasividade em múltiplos tumores.",
        },
        {
          title: "Mecanismos pró-tumorais da PGE₂",
          detail:
            "PGE₂ derivada de COX-2 tumoral: (1) estimula proliferação via EP₁/EP₄ → PKA/β-catenina, (2) inibe apoptose via Bcl-2, (3) estimula VEGF → angiogênese, (4) suprime resposta imune antitumoral via EP₂/EP₄ em células T e NK, (5) estimula migração e invasão via EP₄ → PI3K/Akt.",
        },
        {
          title: "Microambiente tumoral",
          detail:
            "Macrófagos associados a tumor (TAMs) são grandes produtores de COX-2 induzida → PGE₂ no microambiente → supressão imune local e promoção de crescimento tumoral. Eixo PGE₂/EP₄ é alvo terapêutico ativo em imunooncologia.",
        },
      ],
      inhibition: [
        {
          severity: "med",
          text: "Quimioprevenção colorretal — celecoxib é o único NSAID aprovado (PAF). Redução de 28-45% de pólipos adenomatosos em RCTs. Estudos observacionais: redução de CCR em usuários regulares de NSAIDs",
        },
        {
          severity: "med",
          text: "Potencialização de imunoterapia — inibição COX-2 + anti-PD1/PDL1: dados pré-clínicos promissores. Ensaios fase I/II em andamento em melanoma, CCR avançado",
        },
        {
          severity: "med",
          text: "Evidência epidemiológica para esôfago, estômago, mama, pulmão — menos robusta que CCR",
        },
        {
          severity: "low",
          text: "Limitação prática: o mesmo risco CV que contraindica coxibs em uso crônico limita seu uso quimioprofilático em população de risco moderado-alto",
        },
      ],
      drugs:
        "Celecoxib 400mg 2x/dia: único NSAID com aprovação oncológica (PAF). APC trial: 33-45% redução de pólipos mas RR para eventos CV de 2.5-3.4 dose-dependente. PreSAP trial: risco CV menor com 400mg/dia mas benefício também menor. Nimesulida: estudos in vitro promissores em hepatocarcinoma — sem tradução clínica até o momento.",
    },
  },
  {
    id: "hepato",
    name: "Hepático",
    icon: "◈",
    cox1: {
      physiology: [
        {
          title: "Papel fisiológico hepático limitado",
          detail:
            "COX-1 é expressa em células de Kupffer (macrófagos residentes hepáticos) e endotélio sinusoidal. PGE₂ e TXA₂ modulam tônus vascular do sinusoide hepático e função de células de Kupffer. Papel homeostático basal, não dominante.",
        },
        {
          title: "Hemostasia hepática",
          detail:
            "Cells de Kupffer via COX-1 contribuem com TXA₂ que modula o tônus da veia porta. Relevante na hipertensão portal onde o equilíbrio prostaglandínico está perturbado.",
        },
      ],
      inhibition: [
        {
          severity: "low",
          text: "Sem hepatotoxicidade direta significativa pela inibição de COX-1 per se",
        },
        {
          severity: "med",
          text: "Em cirrose: redução de PGE₂ vasodilatadora → vasoconstricção esplâncnica relativa → pode precipitar síndrome hepatorrenal em cirróticos descompensados. NSAIDs contraindicados em Child B/C por esse mecanismo",
        },
      ],
      drugs:
        "NSAIDs em cirrose Child B/C: contraindicados — risco de síndrome hepatorrenal mesmo com doses únicas. Paracetamol em dose ajustada (<2g/dia) é preferível ao AINE em cirróticos para analgesia leve.",
    },
    cox2: {
      physiology: [
        {
          title: "Regeneração hepática",
          detail:
            "COX-2 é induzida durante regeneração hepática pós-hepatectomia parcial. PGE₂ local estimula proliferação de hepatócitos via EP₁/EP₂. Papel funcional confirmado em modelos de hepatectomia 70% em roedores.",
        },
        {
          title: "Fibrogênese",
          detail:
            "Células estreladas hepáticas ativadas expressam COX-2. PGE₂ local tem efeito paradoxalmente antifibrótico — limita ativação excessiva de miofibroblastos via EP₂. Inibição de COX-2 pode portanto acelerar fibrose hepática — dado experimental com implicações em hepatite crônica.",
        },
      ],
      inhibition: [
        {
          severity: "high",
          text: "Hepatotoxicidade idiossincrática — não é efeito direto da inibição de COX-2, mas de metabólitos reativos de fármacos específicos: diclofenaco e lumiracoxib formam acil-glucuronídeos e/ou quinonas via CYP2C9 → adutos proteicos hepáticos → hepatite imunomediada",
        },
        {
          severity: "med",
          text: "Nimesulida: hepatotoxicidade idiossincrática com incidência estimada em 1:10.000-100.000. Mecanismo parcialmente elucidado — metabólitos reativos e estresse oxidativo mitocondrial",
        },
        {
          severity: "low",
          text: "Celecoxib: sem formação de acil-glucuronídeos reativos (sulfonamida sem grupo carboxílico livre) → ausência de hepatotoxicidade significativa. Explica sobrevivência regulatória vs. lumiracoxib",
        },
      ],
      drugs:
        "Ranking de hepatotoxicidade: lumiracoxib > diclofenaco > nimesulida > sulindac > outros. Celecoxib e ibuprofeno: menor sinal de hepatotoxicidade idiossincrática. Rastreamento: ALT antes de iniciar diclofenaco em uso crônico e a cada 3 meses é recomendado por algumas diretrizes europeias.",
    },
  },
];

const severityConfig = {
  high: { color: "#EF4444", label: "Alto impacto", dot: "●" },
  med: { color: "#F59E0B", label: "Impacto moderado", dot: "●" },
  low: { color: "#10B981", label: "Impacto leve", dot: "●" },
};

export default function COXReference() {
  return (
    <MedPanelPage
      sections={sections}
      specialty="Ciclo Basico"
      title="Fisiologia da COX — Guia Completo"
    />
  );
}
