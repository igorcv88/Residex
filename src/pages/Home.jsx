import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';

const categoriaColor = {
  Emergência:   { bg: '#fff4e5', accent: '#b35a00', border: '#ffd9a0' },
  Pediatria:    { bg: '#fef0f6', accent: '#b5006e', border: '#f9b8d9' },
  Ginecologia:  { bg: '#fff8f0', accent: '#9a4500', border: '#ffd4a8' },
  Fisiologia:     { bg: '#f0f0f0', accent: '#333333', border: '#cccccc' },
  Farmacologia:      { bg: '#f0faf9', accent: '#0a7060', border: '#a0ddd6' },
  Clínica: { bg: '#e8f4fd', accent: '#1a6fa8', border: '#b3d9f5' },
  Cirurgia:   { bg: '#edf7ed', accent: '#2a7a3b', border: '#b3e5b3' },
};

const defaultColor = { bg: '#f5f5f5', accent: '#444', border: '#ddd' };

export default function Home() {
  const navigate = useNavigate();

  const categorias = [...new Set(routes.map(r => r.categoria))];

  return (
    <div style={styles.page}>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.logo}>
              <span style={styles.logoDot}>●</span>
              <span style={styles.logoText}>MedPanel</span>
            </div>
            <p style={styles.logoSub}>Referências clínicas rápidas</p>
          </div>
          <div style={styles.badge}>{routes.length} módulos</div>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={styles.main}>

        {categorias.map(categoria => {
          const cor = categoriaColor[categoria] || defaultColor;
          const paginasDaCategoria = routes.filter(r => r.categoria === categoria);

          return (
            <section key={categoria} style={styles.section}>

              {/* Label da categoria */}
              <div style={styles.categoriaLabel}>
                <span style={{ ...styles.categoriaBadge, background: cor.bg, color: cor.accent, border: `1px solid ${cor.border}` }}>
                  {categoria}
                </span>
              </div>

              {/* Cards */}
              <div style={styles.grid}>
                {paginasDaCategoria.map(route => (
                  <div
                    key={route.path}
                    onClick={() => navigate(route.path)}
                    style={{ ...styles.card, borderTop: `3px solid ${cor.accent}` }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={styles.cardIcon}>{route.icon}</div>
                    <h3 style={styles.cardTitle}>{route.title}</h3>
                    <p style={styles.cardDesc}>{route.descricao}</p>
                    <div style={{ ...styles.cardLink, color: cor.accent }}>
                      Abrir →
                    </div>
                  </div>
                ))}
              </div>

            </section>
          );
        })}

      </main>

      <footer style={styles.footer}>
        MedPanel · uso pessoal · não substitui diretrizes clínicas oficiais
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f8fa',
    fontFamily: 'Georgia',
  },
  header: {
    background: '#0d1b2a',
    padding: '24px 0',
    borderBottom: '3px solid #1a6fa8',
  },
  headerInner: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoDot: {
    color: '#1a9fd4',
    fontSize: 18,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  logoSub: {
    color: '#7a9bbf',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 28,
  },
  badge: {
    background: '#1a3a5c',
    color: '#7ac5e8',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    border: '1px solid #1a6fa8',
  },
  main: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '40px 24px',
  },
  section: {
    marginBottom: 40,
  },
  categoriaLabel: {
    marginBottom: 16,
  },
  categoriaBadge: {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#ffffff',
    borderRadius: 10,
    padding: '24px 20px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0d1b2a',
    margin: '0 0 8px',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6b7c8f',
    lineHeight: 1.6,
    margin: '0 0 16px',
  },
  cardLink: {
    fontSize: 13,
    fontWeight: 600,
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    color: '#aaa',
    fontSize: 12,
    borderTop: '1px solid #e5e7eb',
  },
};