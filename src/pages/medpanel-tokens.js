// ─────────────────────────────────────────────
// MedPanel Design Tokens — centralizado
// Altere aqui para propagar em todos os módulos
// ─────────────────────────────────────────────

export const T = {
  // ── Fundos ──────────────────────────────────
  bgPage: "#ffffff", // Slate 100 — fundo geral claro (igual à Home)
  bgSurface: "#ffffff", // Header + Nav — branco puro
  bgCard: "#ffffff", // Cards normais — branco
  bgCardHl: "#eff6ff", // Blue 50 — cards com highlight
  bgObs: "#f8fafc", // Slate 50 — obs levemente recuado

  // ── Bordas ──────────────────────────────────
  borderCard: "#e2e8f0", // Slate 200 — borda suave
  borderCardHl: "#bfdbfe", // Blue 200 — borda cards highlighted
  borderObs: "#6366F1", // Indigo — borda lateral do bloco obs
  borderSection: "#e2e8f0", // Separadores header/nav
  borderNav: "#e2e8f0", // Linha entre nav e conteúdo

  // ── Texto ────────────────────────────────────
  textPrimary: "#000000", // Slate 950 — títulos (WCAG AAA)
  textBody: "#000000", // Slate 700 — corpo de texto (WCAG AA 9.8:1)
  textMuted: "#262f3c", // Slate 500 — labels e metadados (WCAG AA 5.9:1)
  textSubtle: "#94a3b8", // Slate 400 — nav inativos, rodapé
  textDisabled: "#cbd5e1", // Slate 300 — dots inativos, separadores

  // ── Labels monospace ─────────────────────────
  labelSection: "#64748b", // Títulos de seção — legível sobre fundo claro
  labelCard: "#6366f1", // Label card não-highlight — indigo
  labelCardHl: null, // Usa cor de acento da seção — dinâmico
  labelObs: "#4f46e5", // Indigo 600 — label do bloco obs
  labelAlert: null, // Usa block.color — dinâmico

  // ── Navegação ────────────────────────────────
  navText: "#314d5e", // Itens inativos
  navActive: "#000000", // Item ativo — preto sobre branco
  navDotInactive: "#afb8c4", // Ponto lateral inativo
  navDotBottom: "#afb8c4", // Dots do rodapé inativos

  // ── Botão volta ──────────────────────────────
  btnBackBorder: "#9aaac3",
  btnBackText: "#4e6485",

  // ── Cores de acento por seção ────────────────
  accents: [
    "#6366F1", // Indigo
    "#0EA5E9", // Sky
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#F97316", // Orange
    "#8B5CF6", // Violet
    "#84CC16", // Lime
  ],
};

// ─────────────────────────────────────────────
// Helpers de estilo reutilizáveis
// ─────────────────────────────────────────────

export const S = {
  page: {
    background: T.bgPage,
    minHeight: "100vh",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    color: T.textBody,
    display: "flex",
    flexDirection: "column",
  },

  btnBack: {
    background: "transparent",
    border: `1px solid ${T.btnBackBorder}`,
    color: T.btnBackText,
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: 12,
    width: "fit-content",
    margin: "16px 0 0 28px",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },

  header: {
    borderBottom: `1px solid ${T.borderSection}`,
    padding: "16px 28px",
    background: T.bgSurface,
  },

  headerEyebrow: {
    fontSize: 10,
    letterSpacing: "0.35em",
    color: T.textSubtle,
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  headerTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 400,
    color: T.textPrimary,
    letterSpacing: "0.01em",
  },

  headerSections: {
    fontSize: 11,
    color: T.textDisabled,
    marginTop: 4,
    fontFamily: "monospace",
  },

  nav: {
    width: 170,
    borderRight: `1px solid ${T.borderNav}`,
    background: T.bgSurface,
    padding: "12px 0",
    flexShrink: 0,
    overflowY: "auto",
  },

  navBtn: (isActive, color) => ({
    width: "100%",
    background: isActive ? `${color}12` : "transparent",
    border: "none",
    borderLeft: `2px solid ${isActive ? color : "transparent"}`,
    color: isActive ? T.navActive : T.navText,
    padding: "10px 16px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 12,
    fontFamily: "monospace",
    transition: "all 0.15s",
  }),

  navDot: (isActive, color) => ({
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: isActive ? color : T.navDotInactive,
    flexShrink: 0,
  }),

  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px",
  },

  sectionHeader: (color) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    paddingBottom: 14,
    borderBottom: `1px solid ${color}33`,
  }),

  sectionBadge: (color) => ({
    background: `${color}15`,
    border: `1px solid ${color}44`,
    color,
    padding: "4px 16px",
    borderRadius: 4,
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  }),

  sectionTitle: {
    fontSize: 17,
    fontWeight: 400,
    color: T.textPrimary,
  },

  footer: {
    borderTop: `1px solid ${T.borderNav}`,
    padding: "10px 28px",
    background: T.bgSurface,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerLabel: {
    fontSize: 10,
    color: T.textDisabled,
    fontFamily: "monospace",
  },

  footerDot: (isActive, color) => ({
    width: isActive ? 20 : 6,
    height: 6,
    borderRadius: 3,
    background: isActive ? color : T.navDotBottom,
    cursor: "pointer",
    transition: "all 0.2s",
  }),

  // ── Blocks ───────────────────────────────────

  alert: (color) => ({
    background: `${color}0e`,
    border: `1px solid ${color}40`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 8,
    padding: "14px 18px",
    marginBottom: 16,
  }),

  alertTitle: (color) => ({
    fontSize: 11,
    fontFamily: "monospace",
    color,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6,
  }),

  alertText: {
    fontSize: 13,
    color: T.textBody,
    lineHeight: 1.75,
  },

  obs: {
    background: T.bgObs,
    border: `1px solid ${T.borderObs}33`,
    borderLeft: `3px solid ${T.borderObs}`,
    borderRadius: 8,
    padding: "14px 18px",
    marginBottom: 16,
  },

  obsTitle: {
    fontSize: 11,
    fontFamily: "monospace",
    color: T.labelObs,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6,
  },

  obsText: {
    fontSize: 13,
    color: T.textBody,
    lineHeight: 1.75,
  },

  gridTitle: {
    fontSize: 10,
    fontFamily: "monospace",
    color: T.labelSection,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 10,
  },

  gridWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 8,
    marginBottom: 20,
  },

  gridCard: (isHl, color) => ({
    background: T.bgCardHl,
    border: `1px solid ${color}44`,
    borderLeft: `3px solid ${color}`,
    color,
    color: T.textPrimary,
    borderRadius: 6,
    padding: "10px 14px",
  }),

  gridLabel: (isHl, color) => ({
    fontSize: 10,
    color: isHl ? color : T.labelCard,
    fontFamily: "monospace",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }),

  gridValue: (isHl) => ({
    fontSize: 12.5,
    color: isHl ? T.textPrimary : T.textBody,
    lineHeight: 1.6,
  }),

  flowStep: (color) => ({
    background: `${color}0a`,
    border: `1px solid ${color}25`,
    borderLeft: `2px solid ${color}`,
    borderRadius: 6,
    padding: "9px 14px",
    flex: 1,
    fontSize: 12.5,
    color: T.textBody,
    lineHeight: 1.6,
    marginTop: 2,
  }),

  flowCircle: (color) => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: `${color}18`,
    border: `1px solid ${color}55`,
    color,
    fontSize: 11,
    fontFamily: "monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  gradeWrap: (color) => ({
    background: T.bgCard,
    border: `1px solid ${T.borderCard}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 8,
    padding: "12px 16px",
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 8,
  }),

  gradeBadge: (color) => ({
    background: `${color}15`,
    border: `1px solid ${color}44`,
    color,
    fontSize: 10,
    fontFamily: "monospace",
    padding: "4px 10px",
    borderRadius: 4,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginTop: 2,
  }),

  gradeItem: (color) => ({
    fontSize: 12.5,
    color: T.textBody,
    lineHeight: 1.65,
    display: "flex",
    gap: 6,
  }),

  gradeItemDot: (color) => ({
    color,
    flexShrink: 0,
  }),

  decisionWrap: (color) => ({
    background: T.bgCard,
    border: `1px solid ${T.borderCard}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 8,
    padding: "12px 16px",
    marginBottom: 8,
  }),

  decisionCondition: (color) => ({
    fontSize: 11,
    color,
    fontFamily: "monospace",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  }),

  decisionAction: (color) => ({
    fontSize: 12.5,
    color: T.textBody,
    lineHeight: 1.65,
    display: "flex",
    gap: 6,
  }),
};
