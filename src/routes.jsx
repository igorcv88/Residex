import AINEs from './pages/AINEs';
import COX2 from './pages/COX2';
import HV from './pages/HV';
import Abdominal from './pages/Abdominal';
import Choque from './pages/Choque';

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
