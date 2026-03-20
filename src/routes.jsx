import AINEs from './pages/AINEs';
import COX2 from './pages/COX2';
import HV from './pages/HV';
import Abdominal from './pages/Abdominal';
import InsuficienciaHepatica from './pages/Choque';
import Hepato101 from './pages/Choque';
import Obesidade from './pages/Choque';
import DoencasTireoide from './pages/Choque';
import Choque from './pages/Choque';
import DiabetesMellitus from './pages/Choque';

export const routes = [
  {
    path: '/HV',
    element: <HV />,
    title: 'Hidratação Venosa',
    icon: '💧',
    categoria: 'Pediatria',
    descricao:
      'Calculadora de hidratação venosa pediatrica de ataque e manutenção',
  },
  {
    path: '/InsuficienciaHepatica',
    element: <InsuficienciaHepatica />,
    title: 'Insuficiencia Hepatica',
    icon: '🥵😵‍💫',
    categoria: 'Clinica',
    descricao:
      'Cirrose, hepatite fulminante, DHEM, doença alcoólica, CBP, CEP, hepatopatia medicamentosa, hemocromatose e Doença de Wilson — causas, critérios e tratamento.',
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
    path: '/aines',
    element: <AINEs />,
    title: 'Potência dos AINEs',
    icon: '💊',
    categoria: 'Farmacologia',
    descricao: 'Comparativo de potência e seletividade COX-1/COX-2',
  },
  {
    path: '/cox2',
    element: <COX2 />,
    title: 'Fisiologia das COX',
    icon: '🔬',
    categoria: 'Fisiologia',
    descricao: 'Mecanismo das ciclooxigenases e cascata do ácido araquidônico',
  },
];
