import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { T } from "./medpanel-tokens";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DATA — CATEGORIAS
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "todos",        name: "Todos",         color: "#64748b" },
  { id: "pediatria",    name: "Pediatria",      color: "#10B981" },
  { id: "orl",          name: "ORL",            color: "#EC4899" },
  { id: "geral",        name: "Geral",          color: "#6366F1" },
  { id: "critico",      name: "Crítico",        color: "#EF4444" },
  { id: "respiratorio", name: "Respiratório",   color: "#0EA5E9" },
  { id: "vascular",     name: "Vascular",       color: "#8B5CF6" },
  { id: "digestivo",    name: "Digestivo",      color: "#F59E0B" },
  { id: "trauma",       name: "Trauma",         color: "#F97316" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA — ANAMNESES
// Campos: id, title, category, hipotese, hda, exame, conduta
// conduta NÃO inclui a HD — ela é inserida no copy automaticamente
// ─────────────────────────────────────────────────────────────────────────────

const ANAMNESES = [
  // ── PNEUMONIA VIRAL PEDIATRIA ─────────────────────────────────────────────
  {
    id: "pneumonia-viral-ped",
    title: "Pneumonia Viral — Ped",
    category: "pediatria",
    hipotese: "Pneumonia viral (Pediatria) — possível Influenza / COVID-19",
    hda:
`Paciente acompanhado pela mãe/pai/responsável.
Refere dor torácica inespecífica, associada à tosse seca sem expectoração, com início há ___ dias.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Dispneia ocasional, com piora progressiva. Queda do estado geral.
Refere contato com pessoas com sintomatologia semelhante.
Nega coriza e dor facial. Nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Nega dor em panturrilhas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de asma ou pneumonia: ___________________
Contato com pessoas com sintomatologia semelhante: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente. Atividade normal. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Nuca livre. Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Orofaringe: sem alterações. Ausência de secreção em retrocavidade.
Otoscopia: normal.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com roncos difusos. Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

⚠ Atentar para protocolos de isolamento (Influenza / COVID-19)`,
    conduta:
`- Investigação radiológica.
- Início de antivirais + sintomáticos.
- Considerar Oseltamivir.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta regular. Sono adequado. Afastamento da escola.
- Orientações sobre proteção individual e contato com pessoas.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
  // ── GECA PEDIATRIA ────────────────────────────────────────────────────────
  {
    id: "geca-ped",
    title: "GECA Pediátrica",
    category: "pediatria",
    hipotese: "Gastroenterocolite aguda (GECA)",
    hda:
`Paciente acompanhado pelo(a) pai/mãe/responsável.
Refere dor abdominal difusa, tipo cólica, associada a diarreia aquosa e vômitos com início há ___ dias. Nega dor localizada.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega evacuações com sangramentos. Nega hematêmese e melena.
Nega coriza e dor facial. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso (nome e posologia): ___________________
Cirurgias anteriores (abdominais): ___________________
Contactantes com os mesmos sintomas: sim / não
Última refeição: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), desidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Atividade normal. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Nuca livre. Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso difusamente, sem sinais de peritonite. Não palpo visceromegalias. Inocente do ponto de vista cirúrgico. RHA+ e hiperativos. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica.
- Início de hidratação e sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta leve. Sono adequado. Afastamento da escola.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
// ── IVAS PEDIATRIA ────────────────────────────────────────────────────────
  {
    id: "ivas-ped",
    title: "IVAS — Ped",
    category: "pediatria",
    hipotese: "Infecção de vias aéreas superiores (IVAS) — provável etiologia viral",
    hda:
`Paciente acompanhado pelo(a) pai/mãe/responsável.
Refere mal-estar + coriza hialina + febre não medida + inapetência com início há ___ dias.
Dor de garganta discreta, tosse seca e mialgia. Queda do estado geral.
Nega dor torácica. Nega hemoptise. Nega chiado no peito e dispneia.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso (nome e posologia): ___________________
Cirurgias anteriores (nasal, amigdalectomia, cervical): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente. Contactuante. Atividade normal.
Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Nuca livre. Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Otoscopia: normal.
Orofaringe: hiperemia discreta difusa. Ausência de secreção em retrocavidade.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Em virtude do provável quadro viral, opto pelo uso de sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Afastamento da escola.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
  // ── OTITE EXTERNA ─────────────────────────────────────────────────────────
  {
    id: "otite-externa",
    title: "Otite Externa",
    category: "orl",
    hipotese: "Otite externa aguda",
    hda:
`Paciente refere dor no ouvido (direito / esquerdo) há ____ dias.
Relata dor irradiada para garganta, acompanhada de febre, cefaleia e mal-estar.
Inapetência após aparecimento dos sintomas.
Relata secreção externa, alterações da audição do mesmo lado e dor ao movimento do tragus.
Nega dor torácica. Nega hemoptise. Nega chiado no peito e dispneia.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (nasal, amigdalectomia, cervical): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Testes de equilíbrio preservados. Teste índex-nariz preservado. Romberg negativo.
Palpação indolor dos seios da face.
Orofaringe: hiperemia discreta difusa. Ausência de secreção em retrocavidade.
Otoscopia: hiperemia do conduto auditivo (direito / esquerdo), com secreção no meato correspondente. Dor à manipulação do tragus ipsilateral.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Antimicrobianos/antifúngicos (sistêmicos e/ou locais) + sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Orientações sobre uso de hastes flexíveis e acúmulo de água após práticas aquáticas.
- Repouso.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
// ── IVAS ADULTO ───────────────────────────────────────────────────────────
  {
    id: "ivas",
    title: "IVAS",
    category: "orl",
    hipotese: "Infecção de vias aéreas superiores (IVAS) — provável etiologia viral",
    hda:
`Paciente refere mal-estar + coriza hialina + febre não medida + inapetência com início há ___ dias.
Dor de garganta discreta, tosse seca e mialgia.
Nega dor torácica. Nega hemoptise. Nega chiado no peito e dispneia.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (nasal, amigdalectomia, cervical): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face.
Orofaringe: hiperemia discreta difusa. Ausência de secreção em retrocavidade.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Em virtude do provável quadro viral, opto pelo uso de sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── SINUSITE ──────────────────────────────────────────────────────────────
  {
    id: "sinusite",
    title: "Sinusite",
    category: "orl",
    hipotese: "Sinusite aguda bacteriana",
    hda:
`Paciente refere dor facial em região (malar / frontal) há ___ dias, acompanhada de tosse e expectoração purulenta (ou mucossanguinolenta) nasal.
Refere febre e cefaleia discreta. Inapetência após início dos sintomas.
Dor de garganta discreta. Relata alterações do odor habitual.
Nega dor torácica. Nega hemoptise. Nega chiado no peito e dispneia.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (nasal, amigdalectomia, cervical): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação dolorosa do seio ___________________.
Orofaringe: hiperemia discreta difusa + secreção retrocavitária de aspecto purulento.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Antimicrobianos + sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── CRISE DE BRONCOESPASMO / ASMA ─────────────────────────────────────────
  {
    id: "asma",
    title: "Crise de Asma",
    category: "respiratorio",
    hipotese: "Crise de broncoespasmo — asma brônquica",
    hda:
`Paciente refere dor torácica inespecífica, associada à dispneia e chiado no peito, com início há ___ dias.
Refere / nega febre, cefaleia discreta e inapetência após início dos sintomas.
Dispneia com piora progressiva. Antecedente de asma brônquica e crises de broncoespasmo. Queda do estado geral.
Nega coriza e dor facial. Nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Nega dor em panturrilhas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de asma ou pneumonia: ___________________
Medicamentos em uso: ___________________
Faz uso de corticoides? Faz uso de bombinhas? Quais: ___________________
Cirurgias anteriores (tórax/abdome): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com sibilos difusos. Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação radiológica, se necessário.
- Medidas de broncodilatação: beta-adrenérgicos + corticoides.
- Após melhora e reavaliação: antibióticos se etiologia infecciosa.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta regular. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.
- Se piora clínica: internação. Considerar template de insuficiência respiratória aguda.`,
  },

  // ── INSUFICIÊNCIA RESPIRATÓRIA AGUDA ─────────────────────────────────────
  {
    id: "ira",
    title: "Insuf. Respiratória Aguda",
    category: "critico",
    hipotese: "Insuficiência respiratória aguda — em investigação etiológica",
    hda:
`Paciente chega ao Departamento de Emergência em franca insuficiência respiratória aguda.
Sinais de desconforto ventilatório. Angústia. Sudorese. Taquidispneia.
Cansaço e fadiga ventilatória iminente. (A)Febril.
Nega dor torácica típica e irradiações. Nega dor em membros inferiores.

ANTECEDENTES
Doenças pré-existentes: ___________________
Cirurgias realizadas (cardíacas, torácicas, traqueais, angioplastias): ___________________
Alergias conhecidas: ___________________
Medicamentos em uso: ___________________
Hábitos (álcool, tabaco, drogas): ___________________
Histórico de asma e doenças pulmonares prévias: ___________________
Uso de O2 domiciliar: sim / não`,
    exame:
`MEG, consciente / contactuante / torporoso, com intensa angústia respiratória, cianótico, taquipneico.
Sudoreico, pálido, hidratado e anictérico.
Temperatura axilar: ____ºC
AC: BCR em 2 tempos, sem sopros.
AP: MV (presente / ausente) (unilateral / bilateral) à (direita / esquerda), com ruídos adventícios: _________________________________________
SpO2 = ______% — FR = ________irpm
Presença de tiragem intercostal e de fúrcula.
Abdome: plano / globoso, flácido, RHA+; sem sinais de peritonite.
Extremidades: perfusão lentificada; sem / com edemas; sem / com sinais de TVP.

Necessidade de assistência ventilatória com O2 suplementar.
IOT em sequência rápida realizada.
Pré-oxigenação com O2 100%.
Drogas utilizadas: ___________________
Procedimento sem / com intercorrências.
TOT nº _____, rima labial em _____cm. Cuff insuflado com pressão adequada.
Aspirado traqueal: ___________________
Parâmetros de ventilação protetora ajustados.
Vasopressores: sim / não. Reposição volêmica: sim / não.

POCUS
Pulmonar: ___________________
ECO cardio: ___________________
FAST: ___________________`,
    conduta:
`- Otimização da ventilação mecânica conforme quadro clínico.
- Exames laboratoriais, incluindo gasometria arterial.
- RX tórax no leito.
- Início de tratamentos pertinentes ao quadro clínico.
- Solicitada vaga em UTI.
- Orientações aos familiares quanto ao quadro clínico, tratamento e gravidade.`,
  },

  // ── SCA ───────────────────────────────────────────────────────────────────
  {
    id: "sca",
    title: "SCA",
    category: "critico",
    hipotese: "Síndrome coronariana aguda (SCA) — em classificação (IAMSST / IAMSSST / AI)",
    hda:
`Paciente refere dor precordial típica, de forte intensidade, com início há ___ dias.
Irradiação para membro superior esquerdo, mandíbula ou dorso: sim / não
Refere náuseas e vômitos. Sensação de opressão. Sudorese fria. Mal-estar e fraqueza.
Nega febre. Dispneia: sim / não
Nega diarreia ou evacuações com sangramentos. Nega sintomas dispépticos.
Nega hematêmese e melena. Nega sintomas urinários.
Nega tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de doença coronariana / stents: ___________________
Medicamentos em uso: ___________________
(Homem) Uso de inibidores da fosfodiesterase (Viagra / Cialis): sim / não
Cirurgias anteriores (cardíacas — safena, mamária, troca de válvula): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Última refeição / horário: ___________________
(Mulher em idade fértil) DUM: ___________________
Dislipidemia / hipertrigliceridemia: ___________________
Antecedentes familiares de infarto (pai / irmãos): sim / não`,
    exame:
`REG, mucosas (pálidas / coradas), anictérico / ictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC. Sudorese profusa.
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência / presença de turgência jugular.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
AC: BCR em 2 tempos, sem sopros.
⚠ ECG de entrada: ritmo ___________________ — sinais de isquemia em ___________________
AP: MV+ bilateralmente, sem RA.
Abdome: plano, tenso, doloroso à palpação epigástrica. Ausência de visceromegalias. RHA+. Murphy, Blumberg e Rovsing negativos. Jobert e Giordano negativos. Sem sinais de peritonite.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica — SCA com enzimas cardíacas seriadas.
- Protocolo institucional de dor torácica (AAS / Clopidogrel / Estatina / Nitrato / outros).
- Jejum.
- Repouso no leito.
- Orientações gerais e quanto aos sinais de gravidade.
- Exames laboratoriais para classificação e elegibilidade à trombólise.
- Se IAMSST: encaminhamento ao serviço de hemodinâmica para ICP (Intervenção Coronária Percutânea).
- Solicitada avaliação da cardiologia.`,
  },

  // ── TAQUIARRITMIA ─────────────────────────────────────────────────────────
  {
    id: "taquiarritmia",
    title: "Taquiarritmia",
    category: "critico",
    hipotese: "Taquiarritmia sintomática — em classificação",
    hda:
`Paciente refere mal-estar, desconforto torácico e palpitações com início hoje.
Dor torácica: sim / não — caracterizar irradiação, qualidade e tempo de início se presente.
Náuseas e vômitos: sim / não.
Dispneia: sim / não.
Síncope / tontura: sim / não.
Estava realizando atividade física: sim / não.
Nega febre.
Nega diarreia com ou sem sangramentos. Nega sintomas dispépticos.
Nega hematêmese e melena. Nega sintomas urinários.
Nega tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de doença coronariana / stents: ___________________
Medicamentos em uso: ___________________
Faz / fez tratamento para arritmia cardíaca? Interrompeu o uso: ___________________
(Homem) Uso de inibidores da fosfodiesterase: sim / não
Cirurgias cardíacas prévias / marcapasso: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Última refeição / horário: ___________________
(Mulher em idade fértil) DUM: ___________________
Antecedentes familiares de infarto: sim / não`,
    exame:
`REG, mucosas (pálidas / coradas), anictérico / ictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC. Sudorese: sim / não.
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência / presença de turgência jugular.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
AC: BCR em 2 tempos, sem sopros. FC = ______bpm.
⚠ ECG de entrada: ritmo ___________________ — tipo ___________________ — sinais isquêmicos: ___________________
AP: MV+ bilateralmente, sem RA. Presença / ausência de crepitantes pulmonares bilaterais.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP. TEC ____s.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

CRITÉRIOS DE INSTABILIDADE (ACLS)
□ Hipotensão (PAS <90 mmHg ou PAM <65 mmHg)
□ Sinais de choque (TEC >3 s)
□ Congestão pulmonar
□ Dor torácica típica
□ Rebaixamento do nível de consciência / síncope`,
    conduta:
`- Se instável: cardioversão elétrica sincronizada (100–200J, após sedação).
- Se estável com QRS estreito:
  1ª linha — manobra de Valsalva modificada.
  2ª linha — adenosina 6mg IV (repetir 12mg se necessário, máx 30mg).
  3ª linha — amiodarona 150mg IV lento se sem reversão.
- Exames laboratoriais para classificação.
- Repouso no leito. Orientações quanto a drogas estimulantes do SNC.
- Orientações gerais e quanto aos sinais de gravidade.
- Se IAMSST: encaminhamento à hemodinâmica para ICP.
- Solicitada avaliação da cardiologia.`,
  },

  // ── TCE LEVE ──────────────────────────────────────────────────────────────
  {
    id: "tce-leve",
    title: "TCE Leve",
    category: "trauma",
    hipotese: "Traumatismo cranioencefálico leve (TCE leve)",
    hda:
`Paciente vítima de traumatismo cranioencefálico leve hoje.
Mecanismo do trauma: ___________________
Nega perda de consciência, vômitos, alterações neurológicas em marcha, confusão mental, distúrbios visuais e auditivos.
Refere cefaleia discreta. Sem sinais de alerta (rigidez de nuca, turvação visual).
Nega outras áreas traumatizadas (cervical, tórax, abdome, extremidades).
Sem outras queixas.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores: sim / não`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada, sem déficits motores em extremidades.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
Sensibilidade e força preservadas nas 4 extremidades.

Análise da cabeça: presença de (escoriação / hematoma subgaleal) em região ______
Movimentos cervicais preservados. Movimentos mandibulares preservados.
Ausência de epistaxe ou sinais traumáticos nasais.
Ausência de otorragia e sangramento auricular.
Sem alterações na cavidade oral.

AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.
Extremidades: perfusão distal mantida; sem crepitações ou fraturas perceptíveis.`,
    conduta:
`- Orientações quanto ao TCE e observação domiciliar.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Repouso.
- Medicação sintomática para domicílio.`,
  },

  // ── ENTORSE DE TORNOZELO ──────────────────────────────────────────────────
  {
    id: "entorse-tornozelo",
    title: "Entorse de Tornozelo",
    category: "trauma",
    hipotese: "Entorse de tornozelo — suspeita de lesão ligamentar / fratura associada",
    hda:
`Paciente relata trauma em tornozelo (direito / esquerdo) hoje.
Mecanismo do trauma: ___________________
Dor local e limitação dos movimentos. Deambulação prejudicada. Edema local.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Tipo de trabalho / necessidade de afastamento: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores na mesma região: ___________________
Vacinação antitetânica: em dia / não / não sabe`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada.
Glasgow=15; Pupilas isocóricas e fotorreagentes.

Tornozelo (direito / esquerdo):
Dor e edema do tornozelo, com hematoma local. Movimento de dorsiflexão prejudicado.
Dor à palpação do ligamento fibulotalar anterior: sim / não
Dor à palpação da cabeça da fíbula: sim / não
Dor à palpação da base do 5º metatarso ipsilateral: sim / não
Dor na região medial do tornozelo: sim / não
Perfusão distal mantida. Suspeita de fratura.
Ferimentos corto-contusos associados: sim / não
Tornozelo contralateral sem alterações.

AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.`,
    conduta:
`- Analgesia.
- Investigação radiológica.
- Sutura (se houver) + curativo.
- Profilaxia antitetânica.
- Gelo local + repouso.
- Medicação sintomática para domicílio.
- Orientações quanto ao tratamento, curativo e seguimento.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Seguimento na ortopedia.`,
  },

  // ── SUTURA ────────────────────────────────────────────────────────────────
  {
    id: "sutura",
    title: "Sutura",
    category: "geral",
    hipotese: "Ferimento corto-contuso com necessidade de sutura",
    hda:
`Paciente relata ferimento hoje com ___________ contra a região ___________________.
Sangramento discreto local.

(Se couro cabeludo ou face)
Nega perda de consciência, vômitos, alterações neurológicas em marcha, confusão mental, distúrbios visuais e auditivos.
Refere cefaleia discreta. Sem sinais de alerta (rigidez de nuca, turvação visual).
Nega outras áreas traumatizadas (cervical, tórax, abdome, extremidades).

(Se tronco)
Nega dispneia ou dor torácica.
Nega dor abdominal, vômitos, náuseas e alterações intestinais.
Nega sudorese, mal-estar e hipotensão.

(Se extremidades)
Nega alterações motoras dos dedos. Força preservada, movimentos mantidos.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores: sim / não
Vacinação antitetânica: em dia / não / não sabe`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada, sem déficits motores em extremidades.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
Sensibilidade e força preservadas nas 4 extremidades.
Movimentos cervicais preservados. Movimentos mandibulares preservados.
Ausência de epistaxe ou sinais traumáticos nasais.
Ausência de otorragia e sangramento auricular.
Sem alterações na cavidade oral.
AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.
Extremidades: perfusão distal mantida; sem crepitações ou fraturas perceptíveis.

FCC de ____cm, formato (linear / irregular), em topografia _______________, (superficial / profundo), (com / sem) lesão de fáscia ou músculo, sangramento discreto e necessidade de sutura.`,
    conduta:
`- Sutura do ferimento sob anestesia local infiltrativa + curativo.
- Profilaxia antitetânica.
- Medicação sintomática para domicílio.
- Orientações quanto ao tratamento da ferida, curativo e seguimento.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Retirada de pontos em unidade básica de saúde em ____ dias.`,
  },

  // ── PRONTUÁRIO GERAL SIMPLES ──────────────────────────────────────────────
  {
    id: "prontuario-geral",
    title: "Prontuário Geral",
    category: "geral",
    hipotese: "Em investigação / aguarda elucidação diagnóstica",
    hda:
`Paciente vem ao Pronto Socorro hoje para ___________________________________.
Sem outras queixas. Nega dor e outras alterações.
Desejoso de _______________________________________________________________.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Em uso regular de: ___________________`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: flácido, RHA+ normoativos; sem sinais de peritonite.
Extremidades: perfusão distal mantida; sem edemas ou sinais de TVP.`,
    conduta:
`- Orientações gerais.
- Repouso.
- Medicação sintomática para domicílio.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Seguimento com: ___________________`,
  },

  // ── HERPES ZOSTER ─────────────────────────────────────────────────────────
  {
    id: "herpes-zoster",
    title: "Herpes Zoster",
    category: "geral",
    hipotese: "Herpes zoster",
    hda:
`Paciente refere dor em ___________________ (somente no lado direito / esquerdo) com início há ___ dias. Relata aparecimento de lesões cutâneas tipo vesículas dolorosas.
Nega febre, cefaleia e inapetência. Nega dor torácica típica e dispneia.
Nega hemoptoicos. Nega sangramentos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de doença herpética ou varicela: ___________________
Antecedente de Herpes Zoster: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal mantida; sem edemas ou sinais de TVP.

Presença de lesões vesiculares em dermátomo correspondente — região ___________________, compatível com Herpes Zoster.`,
    conduta:
`- Investigação diagnóstica complementar.
- Início de aciclovir oral + tópico.
- Analgesia. Prevenção de infecção secundária.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso.
- Avaliação da dermatologia.
- Seguimento ambulatorial após tratamento.`,
  },

  // ── ITU ───────────────────────────────────────────────────────────────────
  {
    id: "itu",
    title: "ITU",
    category: "geral",
    hipotese: "Infecção do trato urinário (ITU)",
    hda:
`Paciente refere dor abdominal difusa, tipo cólica, principalmente em hipogastro, com início há ___ dias.
Refere ainda sintomas irritativos do trato urinário inferior: disúria e polaciúria.
Nega alterações do trânsito intestinal.
Febre não medida. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega / refere evacuações com sangramentos.
Nega hematêmese e melena.
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de ITU / uso recente de antibiótico: ___________________
Urocultura prévia: ___________________
Antecedente de nefrolitíase: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais / urológicas): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
USG de abdome / trato urinário prévio: ___________________
Internações anteriores por ITU: sim / não
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), hidratado / desidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso à palpação em hipogastro, sem sinais de defesa. Ausência de peritonite. Ausência de visceromegalias. Inocente do ponto de vista cirúrgico. RHA+. Blumberg, Rovsing, Jobert, Murphy e Giordano (positivo / negativo).
Toque retal: não realizado / realizado — descrever achados.
Toque vaginal: não realizado / realizado — descrever achados.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Coleta de urina tipo 1 + urocultura.
- Antimicrobianos + sintomáticos.
- Jejum até 2ª ordem (se suspeita de abdome agudo).
- Orientações gerais e quanto aos sinais de gravidade. Repouso.
- Reavaliação após exames.
- Se melhora clínica: alta com antibióticos e sintomáticos.
- Cultura pós-tratamento agendada.
- Seguimento com urologia / ginecologia.
- Orientações sobre os sintomas de gravidade e retorno ao PS se necessário.`,
  },

  // ── IAPC ──────────────────────────────────────────────────────────────────
  {
    id: "iapc",
    title: "IAPC",
    category: "vascular",
    hipotese: "Insuficiência arterial periférica crônica (IAPC)",
    hda:
`Paciente refere dor em perna (direita / esquerda), com início há ___ dias.
Nega febre, cefaleia e inapetência. Nega dor torácica e dispneia.
Refere piora da dor ao caminhar. Sinais de claudicação intermitente.
Nega hemoptoicos. Nega sangramentos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de arritmia cardíaca / FA crônica: ___________________
Antecedente de doença arteriosclerótica: ___________________
Amputação prévia: sim / não
Acompanhamento com cirurgia vascular: sim / não
Medicamentos em uso: ___________________
Uso de anticoncepcional oral: sim / não
Antecedente de TVP ou TEP: sim / não
Cirurgias anteriores: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Orofaringe: sem alterações.
AC: BC (rítmicas / arrítmicas) em 2 tempos, sem sopros. Ritmo de FA: sim / não
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal assimétrica; ausência de pulso à (direita / esquerda) a partir do nível ___________. Palidez cutânea. Dor à palpação da perna (direita / esquerda).
Presença de lesões tróficas em artelhos.
Ausência de lesões cutâneas em tronco.`,
    conduta:
`- Investigação diagnóstica (Doppler arterial).
- Exames laboratoriais + ECG.
- Analgesia. Repouso.
- Orientações gerais e quanto aos sinais de gravidade.
- Avaliação da cirurgia vascular.`,
  },

  // ── GECA ADULTO ───────────────────────────────────────────────────────────
  {
    id: "geca",
    title: "GECA",
    category: "digestivo",
    hipotese: "Gastroenterocolite aguda (GECA)",
    hda:
`Paciente refere dor abdominal difusa, tipo cólica, associada a diarreia aquosa e vômitos com início há ___ dias. Nega dor localizada.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega evacuações com sangramentos. Nega hematêmese e melena.
Nega coriza e dor facial. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso (nome e posologia): ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Últimas refeições / contactantes com sintomas semelhantes: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), desidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso difusamente, sem sinais de peritonite. Não palpo visceromegalias. Inocente do ponto de vista cirúrgico. RHA+ e hiperativos. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica.
- Início de hidratação e sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta leve. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── DIARREIA INFECCIOSA ───────────────────────────────────────────────────
  {
    id: "diarreia",
    title: "Diarreia Infecciosa",
    category: "digestivo",
    hipotese: "Diarreia infecciosa",
    hda:
`Paciente refere dor abdominal difusa, tipo cólica, principalmente em flanco e fossa ilíaca esquerda, com início há ___ dias.
Relata diarreia com urgência fecal, com poucas evacuações ao longo do dia.
Febre não medida. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega / refere evacuações com sangramentos (disenteria).
Nega hematêmese e melena.
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Últimas refeições / contactantes com sintomas semelhantes: ___________________
Endoscopia / USG abdome / colonoscopia prévia: ___________________
Último tratamento para verminose: ___________________
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), hidratado / desidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso à palpação em FI esquerda, sem sinais de peritonite. Ausência de visceromegalias. Inocente do ponto de vista cirúrgico. RHA+. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Toque retal: não realizado / realizado — descrever achados.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica.
- Antimicrobianos + sintomáticos. Hidratação oral.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta leve e obstipante. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── DIVERTICULITE AGUDA ───────────────────────────────────────────────────
  {
    id: "diverticulite",
    title: "Diverticulite Aguda",
    category: "digestivo",
    hipotese: "Diverticulite aguda",
    hda:
`Paciente refere dor abdominal difusa, tipo cólica, principalmente em flanco e fossa ilíaca esquerda, com início há ___ dias.
Relata alterações do trânsito intestinal (obstipação / diarreia).
Febre não medida. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega / refere evacuações com sangramentos.
Nega hematêmese e melena.
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Últimas refeições / contactantes com sintomas semelhantes: ___________________
Endoscopia / USG abdome / colonoscopia prévia: ___________________
Episódio anterior de diverticulite: sim / não
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), hidratado / desidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso à palpação em FI esquerda, com defesa involuntária. Sinais de peritonite presentes. Ausência de visceromegalias. Inocente do ponto de vista cirúrgico. RHA+. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Toque retal: não realizado / realizado — descrever achados.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica — abdome agudo.
- Antimicrobianos + sintomáticos.
- Jejum até 2ª ordem.
- Orientações gerais e quanto aos sinais de gravidade. Repouso.
- Reavaliação após exames.`,
  },

  // ── SÍNDROME DO INTESTINO IRRITÁVEL ───────────────────────────────────────
  {
    id: "sii",
    title: "Síndrome do Intestino Irritável",
    category: "digestivo",
    hipotese: "Síndrome do intestino irritável (SII)",
    hda:
`Paciente refere dor abdominal difusa, tipo queimação ou cólica, associada a náuseas e vômitos ocasionais, principalmente relacionados a quadros de estresse, com início há ___ dias.
Sintomas recorrentes. Relata diarreia com urgência fecal.
Nega febre. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega evacuações com sangramentos. Nega hematêmese e melena.
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Últimas refeições / contactantes com sintomas semelhantes: ___________________
Endoscopia digestiva / USG abdome / colonoscopia prévia: ___________________
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), hidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações / hiperemia difusa (sinal de refluxo).
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso à palpação difusa, sem sinais de peritonite. Ausência de visceromegalias. Inocente do ponto de vista cirúrgico. RHA+. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Toque retal: não realizado.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica ambulatorial.
- Sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta leve. Sono adequado. Evitar atividade física. Redução do estresse.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── SÍNDROME DISPÉPTICA ───────────────────────────────────────────────────
  {
    id: "dispepsia",
    title: "Síndrome Dispéptica",
    category: "digestivo",
    hipotese: "Síndrome dispéptica",
    hda:
`Paciente refere dor abdominal em andar superior, tipo queimação, associada a náuseas e vômitos, com início há ___ dias.
Nega febre. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega diarreia, evacuações com sangramentos. Nega hematêmese e melena.
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Últimas refeições / contactantes com sintomas semelhantes: ___________________
Endoscopia digestiva / USG abdome prévio: ___________________
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`BEG/REG, mucosas (pálidas / coradas), hidratado, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações / hiperemia difusa (sinal de refluxo).
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, flácido, doloroso à palpação de andar superior (epigastro), sem sinais de peritonite. Ausência de visceromegalias. Inocente do ponto de vista cirúrgico. RHA+. Blumberg, Rovsing, Jobert, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação clínica.
- Sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta leve. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
  // ── ABSCESSO ──────────────────────────────────────────────────────────────
  {
    id: "abscesso",
    title: "Abscesso",
    category: "geral",
    hipotese: "Abscesso cutâneo com celulite adjacente",
    hda:
`Paciente relata dor + tumoração em região ___________________ com início há ____ dias.
Febre não medida.
Observa área de hiperemia + saída de secreção local.
Sem outras queixas.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Cirurgias anteriores: ___________________
Antecedentes alérgicos: ___________________
Medicamentos em uso: ___________________
Quadros de abscessos anteriores: ___________________`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico. Consciente e contactuante.
Glasgow=15; sem alterações neurológicas.
AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: flácido, RHA+; sem sinais de peritonite.
Extremidades: perfusão distal mantida; sem edemas. Sem sinais de TVP.

Exame local: presença de abscesso em região _______________, com flogose local. Ponto de flutuação presente, com necessidade de drenagem. Celulite associada adjacente.`,
    conduta:
`- Drenagem de abscesso + curativo local.
- Antibioticoterapia compatível + sintomáticos.
- Orientações quanto ao seguimento e curativos.
- Seguimento ambulatorial.
- Curativo em unidade de saúde básica.
- Repouso + limpeza diária local.
- Profilaxia antitetânica.`,
  },

  // ── TEP ───────────────────────────────────────────────────────────────────
  {
    id: "tep",
    title: "TEP",
    category: "vascular",
    hipotese: "Tromboembolismo pulmonar (TEP)",
    hda:
`Paciente refere dor torácica atípica, associada à tosse seca e dispneia, com início há ___ dias.
Nega febre, cefaleia e inapetência.
Relata piora da dispneia com esforço físico.
Nega coriza e dor facial.
Refere / nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Refere dor em panturrilha (direita / esquerda).

FATORES DE RISCO
Imobilização / cirurgia recente: ___________________
Usou anticoagulação pós-cirurgia: sim / não
Antecedente de neoplasia: ___________________
Uso de anticoncepcional oral: sim / não
Antecedente de TVP ou TEP: sim / não
Hábitos (tabagismo, etilismo, drogas): ___________________

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________

ESCORE DE WELLS
□ Sinais/sintomas de TVP = 3 pts
□ Diagnóstico alternativo menos provável que TEP = 3 pts
□ FC > 100 bpm = 1,5 pts
□ Imobilização ou cirurgia < 4 semanas = 1,5 pts
□ TVP ou TEP prévio = 1,5 pts
□ Hemoptise = 1 pt
□ Neoplasia maligna = 1 pt
TOTAL: ___ pts  (Baixo risco <2 | Intermediário 2–6 | Alto >6)`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e (a)cianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com / sem ruídos adventícios. Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; com edema de perna (direita / esquerda), associado a empastamento. Sinal de Homans positivo.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação radiológica + ECG.
- Exames laboratoriais, incluindo D-Dímero.
- Orientações gerais e quanto aos sinais de gravidade.
- Evitar esforço físico.
- Início de anticoagulação.`,
  },

  // ── TRAQUEOBRONQUITE ──────────────────────────────────────────────────────
  {
    id: "traqueobronquite",
    title: "Traqueobronquite",
    category: "respiratorio",
    hipotese: "Traqueobronquite aguda",
    hda:
`Paciente refere dor torácica inespecífica, associada à tosse seca sem expectoração purulenta, com início há ___ dias.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Dispneia ocasional, com piora progressiva. Queda do estado geral.
Nega coriza e dor facial. Nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Nega dor em panturrilhas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de asma ou pneumonia: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (tórax/abdome): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com roncos difusos. Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

ESCORES
Q-SOFA: Glasgow <15 / FR >22 irpm / PAS <100 mmHg
CURB-65: Confusão / Ureia >50 / FR >30 / PA <90x60 mmHg / Idade >65 anos`,
    conduta:
`- Investigação radiológica.
- Início de antimicrobianos + sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta regular. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── TRAUMA DE MÃO ─────────────────────────────────────────────────────────
  {
    id: "trauma-mao",
    title: "Trauma de Mão",
    category: "trauma",
    hipotese: "Trauma de mão — suspeita de fratura / lesão de partes moles",
    hda:
`Paciente relata trauma em mão (direita / esquerda) hoje.
Mecanismo do trauma: ___________________
Dor local e limitação dos movimentos.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Tipo de trabalho / necessidade de afastamento: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores na mesma região: ___________________
Vacinação antitetânica: em dia / não / não sabe`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
Sensibilidade e força preservadas nas outras extremidades.

Mão (direita / esquerda):
Dor e deformidade em _______________ (citar dedos e porção).
Perfusão distal mantida. Suspeita de fratura.
Ferimentos corto-contusos associados: sim / não

AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.
Extremidades inferiores: perfusão distal mantida; sem edemas ou sinais de TVP.`,
    conduta:
`- Analgesia.
- Investigação radiológica.
- Sutura (se houver) + curativo.
- Profilaxia antitetânica.
- Medicação sintomática para domicílio.
- Orientações quanto ao tratamento da ferida, curativo e seguimento.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Seguimento na ortopedia.`,
  },

  // ── TRAUMA DE PÉ ──────────────────────────────────────────────────────────
  {
    id: "trauma-pe",
    title: "Trauma de Pé",
    category: "trauma",
    hipotese: "Trauma de pé — suspeita de fratura / lesão de partes moles",
    hda:
`Paciente relata trauma em pé (direito / esquerdo) hoje.
Mecanismo do trauma: ___________________
Dor local e limitação dos movimentos.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Tipo de trabalho / necessidade de afastamento: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores na mesma região: ___________________
Vacinação antitetânica: em dia / não / não sabe`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
Sensibilidade e força preservadas nas outras extremidades.

Pé (direito / esquerdo):
Dor e deformidade em _______________ (citar dedos e porção).
Perfusão distal mantida. Suspeita de fratura.
Ferimentos corto-contusos associados: sim / não
Pé contralateral sem alterações.

AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.
Extremidades superiores: perfusão distal mantida; sem edemas ou sinais de TVP.`,
    conduta:
`- Analgesia.
- Investigação radiológica.
- Sutura (se houver) + curativo.
- Profilaxia antitetânica.
- Medicação sintomática para domicílio.
- Orientações quanto ao tratamento da ferida, curativo e seguimento.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Seguimento na ortopedia.`,
  },

  // ── TRAUMA UNGUEAL ────────────────────────────────────────────────────────
  {
    id: "trauma-ungueal",
    title: "Trauma Ungueal",
    category: "trauma",
    hipotese: "Trauma ungueal com hematoma subungueal — suspeita de fratura de falange distal",
    hda:
`Paciente relata trauma da falange distal do (pé / mão) (direita / esquerda) hoje.
Mecanismo do trauma: ___________________
Dor local e limitação dos movimentos. Edema local.

ANTECEDENTES
Antecedentes mórbidos: ___________________
Tipo de trabalho / necessidade de afastamento: ___________________
Cirurgias anteriores: ___________________
Uso de álcool, tabaco e drogas: ___________________
Alergias medicamentosas: ___________________
Traumatismos anteriores na mesma região: ___________________
Vacinação antitetânica: em dia / não / não sabe`,
    exame:
`BEG, corado, hidratado, afebril, anictérico e acianótico. Eupneico.
Consciente, contactuante, marcha preservada.
Glasgow=15; Pupilas isocóricas e fotorreagentes.
AC: BCR em 2 tempos, sem sopros.
AP: MVFD sem RA.
Abdome: sem particularidades.

Dor + hematoma ungueal do ___º dedo do (pé / mão) (direita / esquerda).
Suspeita de fratura: sim / não
Necessidade de drenagem do hematoma: sim / não`,
    conduta:
`- Analgesia.
- Investigação radiológica.
- Drenagem ungueal (se indicado).
- Sutura (se houver) + curativo.
- Profilaxia antitetânica.
- Repouso.
- Medicação sintomática para domicílio.
- Orientações quanto ao tratamento da ferida, curativo e seguimento.
- Orientações sobre sintomas de gravidade e retorno ao hospital se necessário.
- Seguimento na ortopedia.`,
  },

  // ── TVP ───────────────────────────────────────────────────────────────────
  {
    id: "tvp",
    title: "TVP",
    category: "vascular",
    hipotese: "Trombose venosa profunda (TVP)",
    hda:
`Paciente refere dor em perna (direita / esquerda), com início há ___ dias.
Nega febre, cefaleia e inapetência. Nega dor torácica e dispneia.
Refere piora da dor ao caminhar e edema unilateral.
Nega hemoptoicos. Nega sangramentos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).

FATORES DE RISCO
Imobilização / cirurgia recente: ___________________
Usou anticoagulação pós-cirurgia: sim / não
Antecedente de neoplasia: ___________________
Uso de anticoncepcional oral: sim / não
Antecedente de TVP ou TEP: sim / não

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem ruídos adventícios.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; com edema de perna (direita / esquerda), associado a empastamento. Sinal de Homans positivo.
Ausência de lesões cutâneas em tronco, dorso e extremidades.`,
    conduta:
`- Investigação diagnóstica (Doppler venoso).
- Exames laboratoriais, incluindo D-Dímero.
- Orientações gerais e quanto aos sinais de gravidade.
- Evitar esforço físico.
- Início de anticoagulação.
- Seguimento com cirurgia vascular.`,
  },

  // ── PANCREATITE AGUDA ─────────────────────────────────────────────────────
  {
    id: "pancreatite",
    title: "Pancreatite Aguda",
    category: "digestivo",
    hipotese: "Pancreatite aguda",
    hda:
`Paciente refere dor abdominal epigástrica, de forte intensidade, com início há ___ dias.
Refere náuseas e vômitos. Sensação de distensão abdominal.
Nega febre. Refere cefaleia discreta e inapetência após início dos sintomas.
Mal-estar. Nega diarreia ou evacuações com sangramentos.
Nega hematêmese e melena.
Nega sintomas urinários (disúria, polaciúria).
Nega sintomas respiratórios, nasais. Nega dispneia, tosse e hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega lesões de pele na topografia do flanco direito.
Sem outras queixas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (abdominais): ___________________
Hábitos (etilismo — interrogar obrigatoriamente): ___________________
Última refeição / horário: ___________________
Antecedente de litíase biliar: sim / não
Dislipidemia / hipertrigliceridemia: sim / não
(Mulher em idade fértil) DUM: ___________________`,
    exame:
`REG, mucosas (pálidas / coradas), desidratado, anictérico / ictérico e acianótico. Eupneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, sem RA.
Abdome: plano, tenso, doloroso à palpação epigástrica. Sinais de peritonite em epigastro. Ausência de visceromegalias. RHA+. Murphy, Blumberg e Rovsing negativos. Jobert e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

Sinais de gravidade: Cullen (periumbilical): ausente / presente. Gray-Turner (flancos): ausente / presente.`,
    conduta:
`- Investigação clínica — abdome agudo.
- Sintomáticos e hidratação IV.
- Jejum.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso.`,
  },

  // ── PCR ───────────────────────────────────────────────────────────────────
  {
    id: "pcr",
    title: "PCR",
    category: "critico",
    hipotese: "Parada cardiorrespiratória — em investigação etiológica (5H/5T)",
    hda:
`Paciente dá entrada no Departamento de Emergência irresponsivo, sem pulso e sem respiração.

Mecanismo / contexto: ___________________
Tempo estimado de parada antes do atendimento: ___________________

INFORMAÇÕES COLETADAS (familiar / prontuário)
Doenças pré-existentes: ___________________
Medicamentos em uso: ___________________
Cirurgias prévias: ___________________
Histórico breve da doença atual: ___________________
Eventos recentes de interesse médico: ___________________
Alergias medicamentosas: ___________________
Hábitos (álcool, cigarro, drogas): ___________________`,
    exame:
`Paciente irresponsivo, sem pulso e sem respiração na chegada.
Ritmo inicial checado: ___________________
Desfibrilação realizada (se ritmo chocável): sim / não

Reanimação iniciada conforme protocolo ACLS / AHA.
Acesso venoso garantido, cristaloides infundidos.
Adrenalina administrada (ritmo não chocável).
Via aérea: BVM / dispositivo extraglótico / IOT.

RCE obtido em: ____ minutos.
Estado pós-RCE: acordado / em coma.
Ritmo pós-RCE: ___________________

IOT em sequência rápida (se coma pós-RCE):
- Pré-oxigenação com O2 100%.
- Drogas utilizadas: ___________________
- TOT nº _____, rima labial em _____cm. Cuff insuflado com pressão adequada.
- Aspirado traqueal: ___________________
- Parâmetros de ventilação protetora ajustados.

Monitorização: SpO2, capnografia, ECG contínuo.
Pupilas: ___________________
Vasopressores: sim / não
Controle direcionado de temperatura (coma pós-PCR): Tº alvo ____ºC`,
    conduta:
`- Mantidas medidas intensivas.
- Exames laboratoriais + RX tórax no leito + ECG + POCUS.
- Investigação tomográfica após estabilização.
- Sedação contínua com ___________________________.
- Solicitada vaga em UTI.
- Orientações e suporte aos familiares. Risco elevado de complicações e óbito.
- Transferência à UTI assim que possível e com condições de transporte.`,
  },

  // ── PNEUMONIA ─────────────────────────────────────────────────────────────
  {
    id: "pneumonia",
    title: "Pneumonia",
    category: "respiratorio",
    hipotese: "Pneumonia adquirida na comunidade (PAC)",
    hda:
`Paciente refere dor torácica ventilatório-dependente à (direita / esquerda), associada à tosse com expectoração purulenta, com início há ___ dias.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Dispneia ocasional, com piora progressiva. Queda do estado geral.
Nega coriza e dor facial. Nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Nega dor em panturrilhas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de asma ou pneumonia: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (tórax/abdome): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com crepitações em hemitórax (direito / esquerdo). Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

ESCORES
Q-SOFA: Glasgow <15 / FR >22 irpm / PAS <100 mmHg
CURB-65: Confusão / Ureia >50 / FR >30 / PA <90x60 mmHg / Idade >65 anos`,
    conduta:
`- Investigação radiológica.
- Início de antimicrobianos + sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta regular. Sono adequado. Evitar atividade física.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },

  // ── PNEUMONIA VIRAL ───────────────────────────────────────────────────────
  {
    id: "pneumonia-viral",
    title: "Pneumonia Viral",
    category: "respiratorio",
    hipotese: "Pneumonia viral — possível Influenza / COVID-19",
    hda:
`Paciente refere dor torácica inespecífica, associada à tosse seca sem expectoração purulenta, com início há ___ dias.
Refere febre, cefaleia discreta e inapetência após início dos sintomas.
Dispneia ocasional, com piora progressiva. Queda do estado geral.
Refere contato com pessoas com sintomatologia semelhante.
Nega coriza e dor facial. Nega hemoptoicos.
Nega sintomas neurológicos (convulsões, parestesias, alterações motoras).
Nega alterações visuais, tontura. Nega rigidez de nuca. Nega vômitos.
Nega dor cervical, alterações do pescoço ou tumoração cervical.
Nega dor abdominal (exceto ao tossir).
Sem outras queixas (urinárias ou intestinais).
Nega dor em panturrilhas.

ANTECEDENTES
Doenças de base e pregressas: ___________________
Antecedente de asma ou pneumonia: ___________________
Contato com pessoas com sintomatologia semelhante: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores (tórax/abdome): ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________`,
    exame:
`BEG/REG, mucosas coradas e hidratadas, anictérico e acianótico. Eupneico/Taquipneico.
Temperatura axilar: ____ºC
Consciente e contactuante. Glasgow=15. Visão e audição preservadas.
Sem sinais de irritação meníngea. Brudzinski, Kernig e Lasègue negativos. Nuca livre.
Pulsos carotídeos palpáveis e simétricos.
Ausência de linfoadenopatia cervical. Ausência de massas e tumores cervicais.
Movimentos cervicais preservados. Força simétrica dos membros superiores.
Palpação indolor dos seios da face. Teste de olfato preservado.
Orofaringe: sem alterações.
AC: BCR em 2 tempos, sem sopros.
AP: MV+ bilateralmente, com roncos difusos. Tosse durante manobras inspiratórias.
Abdome: plano, flácido, sem visceromegalias. Inocente do ponto de vista cirúrgico. Sem sinais de peritonite. RHA+ normoativos. Blumberg, Murphy e Giordano negativos.
Extremidades: perfusão distal simétrica; sem edemas ou sinais de TVP.
Ausência de lesões cutâneas em tronco, dorso e extremidades.

ESCORES
Q-SOFA: Glasgow <15 / FR >22 irpm / PAS <100 mmHg
CURB-65: Confusão / Ureia >50 / FR >30 / PA <90x60 mmHg / Idade >65 anos
⚠ Atentar para protocolos de isolamento (Influenza / COVID-19)`,
    conduta:
`- Investigação radiológica.
- Início de antivirais + sintomáticos.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Dieta regular. Sono adequado. Evitar atividade física.
- Orientações sobre proteção individual e contato com pessoas.
- Retorno oportuno se necessário.
- Seguimento ambulatorial após tratamento inicial.`,
  },
  // ── POLITRAUMA LEVE ───────────────────────────────────────────────────────
  {
    id: "politrauma-leve",
    title: "Politrauma Leve",
    category: "trauma",
    hipotese: "Politrauma leve — sem instabilidade hemodinâmica aparente",
    hda:
`Paciente trazido pelo SAMU / Bombeiro, conforme protocolo habitual.
Mecanismo de trauma: ___________________
Refere dor em: ___________________

ANTECEDENTES
Doenças de base e pregressas: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Última refeição / horário: ___________________
Antecedentes traumáticos: ___________________`,
    exame:
`Protocolo ATLS — Primary Survey:

A — Vias aéreas pérveas. Cervical imobilizada / retirada de colar conforme protocolo NEXUS (Glasgow=15; sem parestesias ou déficits; sem lesão distrativa; palpação indolor da coluna cervical; movimentos mantidos e inocentes).

B — MV+ bilateralmente, sem RA. Expansibilidade simétrica bilateral. FR=__irpm. SpO2=___%

C — BCR em 2 tempos, sem sopros. Abdome plano, flácido, RHA+; sem sinais de peritonite. Bacia estável. Sem sangramentos aparentes. PA=____x_____mmHg. FC=______bpm.

D — Glasgow=15; Pupilas isocóricas e fotorreagentes. Ausência de déficits localizatórios.

E — Palpação da coluna total normal, indolor e sem crepitações. Sem outras lesões.

Ausência de lesões cutâneas traumáticas em tronco, dorso e extremidades.
E-FAST: ___________________`,
    conduta:
`- Investigação radiológica (quando necessário).
- Analgesia.
- Jejum — possibilidade de cirurgia.
- Orientações gerais e quanto aos sinais de gravidade.
- Repouso. Retirada de medidas de proteção de transporte.
- Avaliação da ortopedia (quando necessário).`,
  },

  // ── POLITRAUMA GRAVE ──────────────────────────────────────────────────────
  {
    id: "politrauma-grave",
    title: "Politrauma Grave",
    category: "critico",
    hipotese: "Politrauma grave — instabilidade hemodinâmica",
    hda:
`Paciente trazido pelo SAMU / APH / Bombeiro, conforme protocolo habitual.
Mecanismo de trauma: ___________________
Houve morte no local: sim / não.
Paciente instável do ponto de vista hemodinâmico na recepção.

INFORMAÇÕES RECEBIDAS (familiar / APH / acompanhante):
Nome: ___________________
Doenças pré-existentes: ___________________
Medicamentos em uso: ___________________
Cirurgias anteriores: ___________________
Hábitos (tabagismo, etilismo, drogas): ___________________
Última refeição / horário: ___________________
Broncoaspiração no local: sim / não
Antecedentes traumáticos: ___________________`,
    exame:
`Protocolo ATLS — Primary Survey:

A — Vias aéreas comprometidas. Sangramento em orofaringe. Necessidade de manejo da via aérea e IOT. Imobilização cervical mantida até investigação complementar.
IOT em sequência rápida. Drogas: ___________________
TOT nº _____, rima labial em _____cm. Cuff insuflado com pressão adequada.
Aspirado traqueal: ___________________
Ventilação mecânica com parâmetros protetores ajustados.

B — MV+ bilateralmente / unilateralmente, com _____________________
Drenagem torácica sob selo d'água do hemitórax (direito / esquerdo) — saída de ar/sangue: ______ml.

C — BCR em 2 tempos, sem sopros. Instável hemodinamicamente.
Abdome: plano / tenso, RHA (presentes / ausentes); (com / sem) sinais de peritonite.
Bacia: estável / instável; contenção mecânica com lençol em região trocantérica bilateral.
Sangramentos: ___________________

D — Glasgow=_____; Pupilas: _____________________
Déficits neurológicos: _____________________

E — Coluna total: _____________________
Outras lesões: _____________________
(não esquecer do dorso)

E-FAST:
Bases pulmonares: _____ / Subxifoide: _____ / Morrison: _____ / Espleno-renal: _____ / Hipogástrico: _____`,
    conduta:
`- Suporte intensivo.
- Investigação radiológica / tomográfica.
- Suporte ventilatório invasivo; adequação ao ventilador mecânico.
- Sedação contínua.
- Reposição volêmica / Protocolo de transfusão maciça.
- Uso de ácido tranexâmico.
- Jejum — possibilidade de cirurgia.
- Monitorização hemodinâmica rigorosa.
- SVD — controle de diurese (meta: 0,5–1 ml/kg/h).
- Medidas de neurocrítico em virtude do TCE.
- Orientações gerais e quanto aos sinais de gravidade aos acompanhantes.
- Avaliação: ortopedia / neurocirurgia / cirurgia torácica / cirurgia geral / cirurgia vascular.
- Solicitada vaga em UTI.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INPUT STYLE (igual ao pedcalc-layout)
// ─────────────────────────────────────────────────────────────────────────────

const inp = {
  background: T.bgCard,
  border: `1px solid ${T.borderCard}`,
  color: T.textPrimary,
  padding: "7px 12px",
  borderRadius: 5,
  fontSize: 14,
  fontFamily: "monospace",
  outline: "none",
  boxSizing: "border-box",
};

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK — bloco copiável (HDA / Exame Físico / Conduta)
// ─────────────────────────────────────────────────────────────────────────────

function AnamneseBlock({ label, color, text, copyKey, isCopied, onCopy }) {
  return (
    <div
      style={{
        border: `1px solid ${color}2e`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 8,
        marginBottom: 14,
        overflow: "hidden",
        background: T.bgCard,
      }}
    >
      {/* ── cabeçalho do bloco ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 14px",
          background: `${color}0d`,
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontFamily: "monospace",
            color,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <button
          onClick={() => onCopy(copyKey, text)}
          title="Copiar para área de transferência"
          style={{
            background: isCopied ? `${color}22` : "transparent",
            border: `1px solid ${isCopied ? color + "77" : color + "33"}`,
            color: isCopied ? color : `${color}99`,
            borderRadius: 4,
            cursor: "pointer",
            padding: "3px 9px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 10,
            fontFamily: "monospace",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          {isCopied ? (
            <>
              <CheckIcon /> Copiado
            </>
          ) : (
            <>
              <CopyIcon /> Copiar
            </>
          )}
        </button>
      </div>

      {/* ── conteúdo ── */}
      <div
        style={{
          padding: "14px 16px",
          fontSize: 12.5,
          color: T.textBody,
          lineHeight: 1.8,
          whiteSpace: "pre-wrap",
          fontFamily:
            "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Anamneses() {
  const navigate = useNavigate();

  const [selCat, setSelCat]   = useState("todos");
  const [selId,  setSelId]    = useState(null);
  const [search, setSearch]   = useState("");
  const [copied, setCopied]   = useState({});   // { "<id>-hda": bool, ... }

  // ── lista filtrada ──
  const visible = useMemo(
    () =>
      ANAMNESES.filter(
        (a) =>
          (selCat === "todos" || a.category === selCat) &&
          a.title.toLowerCase().includes(search.toLowerCase())
      ),
    [selCat, search]
  );

  const sel   = ANAMNESES.find((a) => a.id === selId) ?? null;
  const color = CATEGORIES.find(
    (c) => c.id === (sel?.category ?? "todos")
  )?.color ?? "#64748b";

  // ── copy handler ──
  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied((p) => ({ ...p, [key]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2200);
  };

  // ── textos para clipboard ──
  const conductaFull = sel
    ? `HIPÓTESE DIAGNÓSTICA: ${sel.hipotese}\n\n${sel.conduta}`
    : "";

  return (
    <div
      style={{
        background: T.bgPage,
        height: "100dvh",
        fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif",
        color: T.textBody,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontSize: 13,
      }}
    >
      {/* ── CSS responsivo ── */}
      <style>{`
        .anm-layout { display: flex; flex: 1; overflow: hidden; }

        .anm-sidebar {
          width: 160px;
          border-right: 1px solid ${T.borderSection};
          background: ${T.bgSurface};
          padding: 8px 0;
          flex-shrink: 0;
          overflow-y: auto;
        }
        .anm-list {
          width: 220px;
          border-right: 1px solid ${T.borderSection};
          background: ${T.bgSurface};
          overflow-y: auto;
          flex-shrink: 0;
        }
        .anm-detail {
          flex: 1;
          overflow-y: auto;
          padding: 22px 24px;
        }
        .anm-mobile-back { display: none !important; }

        @media (max-width: 768px) {
          .anm-layout { flex-direction: column; }

          .anm-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid ${T.borderSection};
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            flex-shrink: 0 !important;
            padding: 0 !important;
          }
          .anm-sidebar-title { display: none !important; }
          .anm-cat-btn {
            width: auto !important;
            white-space: nowrap !important;
            border-left: none !important;
            border-bottom: 2px solid var(--cat-color) !important;
            padding: 10px 14px !important;
          }

          .anm-list {
            width: 100% !important;
            border-right: none !important;
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            overflow-y: auto !important
            border-bottom: 1px solid ${T.borderSection};
          }
          .anm-list-hidden { display: none !important; }

          .anm-detail { padding: 16px 14px !important; }
          .anm-detail-hidden { display: none !important; }

          .anm-mobile-back { display: inline-flex !important; }
        }
      `}</style>

      {/* ── botão voltar ao MedPanel ── */}
      <div style={{ background: T.bgSurface }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: `1px solid ${T.borderSection}`,
            color: T.textMuted,
            padding: "6px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: 12,
            width: "fit-content",
            margin: "14px 0 0 20px",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          ← MedPanel
        </button>
      </div>

      {/* ── header ── */}
      <div
        style={{
          borderBottom: `1px solid ${T.borderSection}`,
          padding: "14px 24px",
          background: T.bgSurface,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            color: T.textSubtle,
            fontFamily: "monospace",
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Clínica Geral
        </div>
        <div
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 400,
            color: T.textPrimary,
            letterSpacing: "0.01em",
          }}
        >
          Anamneses
        </div>
        <div
          style={{
            fontSize: 11,
            color: T.textDisabled,
            marginTop: 3,
            fontFamily: "monospace",
          }}
        >
          {ANAMNESES.length} modelos · HDA · Exame Físico · Conduta
        </div>
      </div>

      {/* ── body ── */}
      <div className="anm-layout">

        {/* ─── col 1: categorias ─── */}
        <div className="anm-sidebar">
          <div
            className="anm-sidebar-title"
            style={{
              padding: "8px 14px",
              fontSize: 9,
              color: T.textMuted,
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Categoria
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = selCat === cat.id;
            return (
              <button
                key={cat.id}
                className="anm-cat-btn"
                onClick={() => {
                  setSelCat(cat.id);
                  setSelId(null);
                }}
                style={{
                  "--cat-color": isActive ? cat.color : "transparent",
                  width: "100%",
                  background: isActive ? `${cat.color}15` : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${isActive ? cat.color : "transparent"}`,
                  color: isActive ? T.textPrimary : "#4b5563",
                  padding: "8px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 11,
                  fontFamily: "monospace",
                  transition: "all 0.12s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: isActive ? cat.color : T.textSubtle,
                      flexShrink: 0,
                    }}
                  />
                  {cat.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── col 2: lista ─── */}
        <div
          className={`anm-list ${sel ? "anm-list-hidden" : ""}`}
        >
          {/* barra de busca */}
          <div
            style={{
              padding: "10px 12px",
              borderBottom: `1px solid ${T.borderSection}`,
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: T.bgSurface,
            }}
          >
            <input
              style={{ ...inp, width: "100%", fontSize: 12 }}
              placeholder="Buscar anamnese..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* itens */}
          {visible.length === 0 && (
            <div
              style={{
                padding: "16px 14px",
                color: T.textMuted,
                fontFamily: "monospace",
                fontSize: 11,
              }}
            >
              Nenhum resultado
            </div>
          )}
          {visible.map((a) => {
            const catColor =
              CATEGORIES.find((c) => c.id === a.category)?.color ?? "#64748b";
            const isActive = selId === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelId(a.id)}
                style={{
                  width: "100%",
                  background: isActive ? `${catColor}12` : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${isActive ? catColor : "transparent"}`,
                  color: isActive ? T.textPrimary : T.textBody,
                  padding: "10px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 12,
                  fontFamily: "monospace",
                  transition: "all 0.12s",
                  borderBottom: `1px solid ${T.borderSection}`,
                }}
              >
                <div
                  style={{
                    color: isActive ? T.textPrimary : "#333333",
                    marginBottom: 2,
                  }}
                >
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: catColor,
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {CATEGORIES.find((c) => c.id === a.category)?.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── col 3: detalhe ─── */}
        <div
          className={`anm-detail ${!sel ? "anm-detail-hidden" : ""}`}
        >
          {/* botão voltar (mobile) */}
          {sel && (
            <button
              className="anm-mobile-back"
              onClick={() => setSelId(null)}
              style={{
                background: "transparent",
                border: `1px solid ${T.borderCard}`,
                color: "#64748b",
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 12,
                alignItems: "center",
                gap: 5,
                marginBottom: 18,
              }}
            >
              ← Voltar para lista
            </button>
          )}

          {!sel ? (
            /* placeholder quando nada selecionado */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 10,
                color: T.textSubtle,
                fontFamily: "monospace",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 28 }}>📋</span>
              Selecione uma anamnese
              <br />
              para visualizar os blocos copiáveis
            </div>
          ) : (
            <>
              {/* ── cabeçalho da anamnese ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  paddingBottom: 14,
                  borderBottom: `1px solid ${color}22`,
                }}
              >
                <div
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}44`,
                    color,
                    padding: "3px 12px",
                    borderRadius: 4,
                    fontSize: 9,
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {CATEGORIES.find((c) => c.id === sel.category)?.name}
                </div>
                <div style={{ fontSize: 17, color: T.textPrimary }}>
                  {sel.title}
                </div>
              </div>

              {/* ── BLOCO HDA ── */}
              <AnamneseBlock
                label="HDA — História da Doença Atual"
                color={color}
                text={sel.hda}
                copyKey={`${sel.id}-hda`}
                isCopied={!!copied[`${sel.id}-hda`]}
                onCopy={handleCopy}
              />

              {/* ── BLOCO EXAME FÍSICO ── */}
              <AnamneseBlock
                label="Exame Físico"
                color={color}
                text={sel.exame}
                copyKey={`${sel.id}-exame`}
                isCopied={!!copied[`${sel.id}-exame`]}
                onCopy={handleCopy}
              />

              {/* ── BLOCO CONDUTA (inclui HD no clipboard) ── */}
              <AnamneseBlock
                label="Conduta"
                color={color}
                text={
                  /* Exibe a HD visualmente no início do bloco */
                  `HIPÓTESE DIAGNÓSTICA: ${sel.hipotese}\n\n${sel.conduta}`
                }
                copyKey={`${sel.id}-conduta`}
                isCopied={!!copied[`${sel.id}-conduta`]}
                onCopy={handleCopy}
              />
            </>
          )}
        </div>
      </div>

      {/* ── footer ── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderSection}`,
          padding: "8px 20px",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
          background: T.bgSurface,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: T.textSubtle,
            fontFamily: "monospace",
          }}
        >
          MedPanel 2026 — Igor Vieira.
        </div>
        <div
          style={{
            fontSize: 9,
            color: T.textMuted,
            fontFamily: "monospace",
          }}
        >
          ⚠ Modelos orientativos — adaptar ao caso clínico real antes de registrar.
        </div>
      </div>
    </div>
  );
}
