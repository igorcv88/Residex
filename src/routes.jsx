import AINEs from './pages/AINEs';
import COX2 from './pages/COX2';
import HV from './pages/HV';
import Abdominal from './pages/Abdominal';
import InsuficienciaHepatica from './pages/InsuficienciaHepatica';
import Hepato101 from './pages/Hepato101';
import Obesidade from './pages/Obesidade';
import DoencasTireoide from './pages/DoencasTireoide';
import Choque from './pages/Choque';
import DiabetesMellitus from './pages/DiabetesMellitus';
import IctericiaNeonatal from './pages/IctericiaNeonatal';
import SepseNeonatal from './pages/SepseNeonatal';
import ReanimacaoNeonatal from './pages/ReanimacaoNeonatal';
import PedCalc from './pages/PedCalc';
import Neurotrauma from './pages/Neurotrauma';
import Politrauma from './pages/Politrauma';
import ViaAerea from './pages/ViaAerea';
import CicloMenstrual from './pages/CicloMenstrual';
import TriagemNeonatal from './pages/TriagemNeonatal';
import Anamneses from './pages/Anamneses';
import ComplicacoesInsuficienciaHepatica from './pages/ComplicacoesInsuficienciaHepatica';

export const routes = [
  {
    path: '/HV',
    element: <HV />,
    title: 'Hidratação Venosa PED',
    icon: '💧',
    categoria: 'Emergencia',
    descricao:
      'Calculadora de hidratação venosa pediatrica de ataque e manutenção',
  },
  {
    path: '/PedCalc',
    element: <PedCalc />,
    title: 'Calculadora de Doses Pediátricas',
    icon: '💊',
    categoria: 'Emergencia',
    descricao:
      'Calculadora de medicações pediátricas e protocolos de diversas emergencias pediatricas',
  },
  {
    path: '/Anamneses',
    element: <Anamneses />,
    title: 'Anamneses',
    icon: '📖',
    categoria: 'Emergencia',
    descricao:
      'Compilado interativo de inumeras historias clinicas padrão para os casos mais comuns do pronto socorro',
  },
  {
    path: '/IctericiaNeonatal',
    element: <IctericiaNeonatal />,
    title: 'Ictericia Neonatal',
    icon: '🟡',
    categoria: 'Pediatria',
    descricao:
      ' Referência completa de icterícia neonatal — Zonas de Kramer, tipos fisiológica e patológica, kernicterus, causas não hemolíticas (aleitamento, leite materno, Gilbert), hemolíticas (Rh, ABO, esferocitose, G6PD), colestase neonatal com AVBEH, e algoritmo de fototerapia e exsanguinotransfusão.',
  },
  {
    path: '/ReanimacaoNeonatal',
    element: <ReanimacaoNeonatal />,
    title: 'Reanimação Neonatal',
    icon: '👶',
    categoria: 'Pediatria',
    descricao:
      'Referência completa de reanimação neonatal — classificação por IG e peso, fatores de risco anteparto, Minuto de Ouro com as 3 perguntas, saturação por minuto de vida, técnica de VPP (OTOV, T-piece vs AMBU), compressão 3:1, adrenalina 1:10.000, clampeamento tardio, hipotermia terapêutica e LISA/MIST.',
  },
  {
    path: '/SepseNeonatal',
    element: <SepseNeonatal />,
    title: 'Sepse Neonatal',
    icon: '🦠',
    categoria: 'Pediatria',
    descricao:
      ' Referência completa de sepse neonatal — classificação EOS/LOS, patógenos precoces e tardios, fatores de risco maternos, profilaxia GBS, critérios hematológicos (I/T, Rodwell), algoritmo de manejo ≥ 35 semanas, esquemas empíricos por cenário e duração do tratamento.',
  },
  {
    path: '/InsuficienciaHepatica',
    element: <InsuficienciaHepatica />,
    title: 'Insuficiencia Hepatica',
    icon: '🥵',
    categoria: 'Clinica',
    descricao:
      'Cirrose, hepatite fulminante, DHEM, doença alcoólica, CBP, CEP, hepatopatia medicamentosa, hemocromatose e Doença de Wilson — causas, critérios e tratamento.',
  },
      {
    path: '/ComplicacoesInsuficienciaHepatica',
    element: <ComplicacoesInsuficienciaHepatica />,
    title: 'Insuficiência Hepática — Complicações',
    icon: '😵‍💫',
    categoria: 'Clinica',
    descricao:
      'Encefalopatia Hepática (West Haven, rifaximina), Síndrome Hepato-Pulmonar (tríade, ortodeoxia, MELD exception), fisiopatologia detalhada da HP.',
  },
  {
    path: '/Hepato101',
    element: <Hepato101 />,
    title: 'Fundamentos de Hepatologia',
    icon: '🫟',
    categoria: 'Clinica',
    descricao:
      'Fundamentos da hepatologia: anatomia segmentar, fisiologia hepática, metabolismo da bilirrubina e síndromes ictéricas hereditárias (Gilbert, Crigler-Najjar, Dubin-Johnson, Rotor).',
  },
  {
    path: '/Obesidade',
    element: <Obesidade />,
    title: 'Obesidade',
    icon: '⚖️',
    categoria: 'Clinica',
    descricao:
      'Epidemiologia, fisiopatologia hormonal (grelina, leptina, GLP-1), diagnóstico antropométrico, síndrome metabólica, MEV e farmacologia completa com trials (SELECT, SURMOUNT).',
  },
  {
    path: '/DiabetesMellitus',
    element: <DiabetesMellitus />,
    title: 'Diabetes Mellitus',
    icon: '🧛🏻',
    categoria: 'Clinica',
    descricao:
      'Fisiologia da glicose, critérios diagnósticos (incluindo TOTG 1h — SBD 2024), classificação (DM1, DM2, LADA, MODY), insulinoterapia e algoritmo terapêutico SBD 2025.',
  },
  {
    path: '/DoencasTireoide',
    element: <DoencasTireoide />,
    title: 'Doencas da Tireoide',
    icon: '🦋',
    categoria: 'Clinica',
    descricao:
      'Anatomia e síntese hormonal, hipertireoidismo (Graves, BNT), crise tireotóxica com sequência de manejo, hipotireoidismo, tireoidites, nódulo (BETHESDA/TIRADS) e câncer de tireoide.',
  },
    {
    path: '/CicloMenstrual',
    element: <CicloMenstrual />,
    title: 'CicloMenstrual',
    icon: '🔄🩸',
    categoria: 'Ginecologia',
    descricao:
      'Fisiologia do ciclo ovariano-endometrial: eixo hipotálamo-hipófise, fases folicular/lútea, hormônios e transtornos pré-menstruais para residência.',
  },
  {
    path: '/Abdominal',
    element: <Abdominal />,
    title: 'Trauma Abdominal',
    icon: '🔪🩸',
    categoria: 'Cirurgia',
    descricao:
      'Resumo interativo sobre trauma abdominal incluindo abordagem inicial e traumas especificos',
  },
  {
    path: '/Choque',
    element: <Choque />,
    title: 'Choque Hemorrágico/Hipovolemico',
    icon: '🩸',
    categoria: 'Cirurgia',
    descricao: 'Resumo interativo sobre choque no contexto do trauma',
  },
  {
    path: '/ViaAerea',
    element: <ViaAerea />,
    title: 'Via Aerea no Trauma',
    icon: '🫁',
    categoria: 'Cirurgia',
    descricao: 'Via aérea no trauma — dispositivos básicos e avançados, indicações de IOT, sequência rápida com os 7 Ps, farmacologia completa (indutores e BNMs), cricotireoidotomia e manejo pós-intubação com ventilação protetora.',
  },
  {
    path: '/Politrauma',
    element: <Politrauma />,
    title: 'Politrauma - XABCDE',
    icon: '🚑',
    categoria: 'Cirurgia',
    descricao: 'Atendimento sistematizado ao politraumatizado — XABCDE completo, mecanismos de trauma, triagem START, pré-hospitalar, medidas auxiliares e avaliação secundária com base no ATLS 10ª edição.',
  },
  {
    path: '/Neurotrauma',
    element: <Neurotrauma />,
    title: 'Neurotrauma: TCE, Raquimedular e Face',
    icon: '🧠',
    categoria: 'Cirurgia',
    descricao: 'TCE, hematomas intracranianos, manejo da HIC por degraus, morte encefálica, trauma raquimedular e trauma de face — referência para residência.',
  },
  {
    path: '/aines',
    element: <AINEs />,
    title: 'Potência dos AINEs',
    icon: '💊',
    categoria: 'Ciclo Basico',
    descricao: 'Comparativo de potência e seletividade COX-1/COX-2',
  },
  {
    path: '/cox2',
    element: <COX2 />,
    title: 'Fisiologia das COX',
    icon: '🔬',
    categoria: 'Ciclo Basico',
    descricao: 'Mecanismo das ciclooxigenases e cascata do ácido araquidônico',
  },
];
