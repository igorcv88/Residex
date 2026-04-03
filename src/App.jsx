import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf-h0vqTuAJu_4hyB0mygXcCVtSvnaGBk",
  authDomain: "residex-9fa67.firebaseapp.com",
  projectId: "residex-9fa67",
  storageBucket: "residex-9fa67.firebasestorage.app",
  messagingSenderId: "641940405806",
  appId: "1:641940405806:web:23f99f7355ba0b4d3ce9bf",
  measurementId: "G-BY6328631R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Design Tokens (medpanel-tokens) ─────────────────────────────────
const T = {
  bgPage: "#f8fafc", bgSurface: "#f1f5f9", bgCard: "#ffffff",
  bgObs: "#eef2ff", bgCardHl: "#eff6ff", borderCard: "#e2e8f0",
  borderCardHl: "#bfdbfe", borderObs: "#6366F1", borderSection: "#dde3eb",
  borderNav: "#dde3eb", textPrimary: "#000000", textBody: "#000000",
  textMuted: "#445162", textSubtle: "#71859f", textDisabled: "#78818b",
  labelSection: "#64748b", labelCard: "#6366f1", labelObs: "#4f46e5",
  navText: "#253a47", navActive: "#000000", navDotInactive: "#afb8c4",
  navDotBottom: "#afb8c4",
};

const S = {
  page: { background: T.bgPage, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: T.textBody, display: "flex", flexDirection: "column" },
  header: { borderBottom: `1px solid ${T.borderSection}`, padding: "16px 28px", background: T.bgSurface },
  headerEyebrow: { fontSize: 10, letterSpacing: "0.35em", color: T.textSubtle, fontFamily: "monospace", textTransform: "uppercase", marginBottom: 4 },
  headerTitle: { margin: 0, fontSize: 20, fontWeight: 400, color: T.textPrimary, letterSpacing: "0.01em" },
  nav: { width: 170, borderRight: `1px solid ${T.borderNav}`, background: T.bgSurface, padding: "12px 0", flexShrink: 0, overflowY: "auto" },
  navBtn: (isActive, color) => ({ width: "100%", background: isActive ? `${color}12` : "transparent", border: "none", borderLeft: `2px solid ${isActive ? color : "transparent"}`, color: isActive ? T.navActive : T.navText, padding: "10px 16px", cursor: "pointer", textAlign: "left", fontSize: 12, fontFamily: "monospace", transition: "all 0.15s" }),
  navDot: (isActive, color) => ({ width: 5, height: 5, borderRadius: "50%", background: isActive ? color : T.navDotInactive, flexShrink: 0 }),
  content: { flex: 1, overflowY: "auto", padding: "24px 28px" },
  sectionHeader: (color) => ({ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${color}33` }),
  sectionBadge: (color) => ({ background: `${color}15`, border: `1px solid ${color}44`, color, padding: "4px 16px", borderRadius: 4, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }),
  sectionTitle: { fontSize: 17, fontWeight: 400, color: T.textPrimary },
  footer: { borderTop: `1px solid ${T.borderNav}`, padding: "10px 28px", background: T.bgSurface, display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerLabel: { fontSize: 10, color: T.textDisabled, fontFamily: "monospace" },
  alert: (color) => ({ background: `${color}0e`, border: `1px solid ${color}40`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }),
  alertTitle: (color) => ({ fontSize: 11, fontFamily: "monospace", color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }),
  obs: { background: T.bgObs, border: `1px solid ${T.borderObs}33`, borderLeft: `3px solid ${T.borderObs}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 },
  gridTitle: { fontSize: 10, fontFamily: "monospace", color: T.labelSection, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 },
  gridWrap: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 20 },
  gridCard: (color) => ({ background: T.bgCardHl, border: `1px solid ${color}44`, borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "10px 14px" }),
  gridLabel: (color) => ({ fontSize: 10, color, fontFamily: "monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }),
  gridValue: { fontSize: 12.5, color: T.textPrimary, lineHeight: 1.6 },
  gradeWrap: (color) => ({ background: T.bgCard, border: `1px solid ${T.borderCard}`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "10px 14px", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 6 }),
  gradeBadge: (color) => ({ background: `${color}15`, border: `1px solid ${color}44`, color, fontSize: 11, fontFamily: "monospace", padding: "4px 8px", borderRadius: 4, flexShrink: 0, whiteSpace: "nowrap", minWidth: 38, textAlign: "center" }),
  decisionWrap: (color) => ({ background: T.bgCard, border: `1px solid ${T.borderCard}`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8 }),
};

const mobileCSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&family=DM+Serif+Display&display=swap');
[style*="monospace"] { font-family: 'JetBrains Mono', monospace !important; font-weight: 500; }
@media (max-width: 768px) {
  .mp-nav-sidebar { display: none !important; }
  .mp-nav-mobile { display: flex !important; overflow-x: auto; -webkit-overflow-scrolling: touch; gap: 8px; padding: 10px 12px; background: #0F172A; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; position: sticky; top: 0; z-index: 10; }
  .mp-nav-mobile::-webkit-scrollbar { height: 3px; }
  .mp-nav-mobile::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
  .mp-nav-mobile-btn { flex-shrink: 0; white-space: nowrap; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
  .mp-body { flex-direction: column !important; overflow-y: auto !important; }
  .mp-content { width: 100% !important; min-width: 0 !important; padding: 16px 12px !important; }
  .mp-header { padding: 16px 12px 12px !important; }
  .mp-header-title { font-size: 18px !important; line-height: 1.2 !important; }
  .mp-footer { padding: 8px 12px !important; flex-wrap: wrap; gap: 6px; }
}
@media (min-width: 769px) { .mp-nav-mobile { display: none !important; } }
`;

// ── Dicionário Base de Metadados (Topics) ───────────────────────────
const TOPICS_METADATA = [
  { spec: "PREV", code: "PREV1", name: "Medidas de Saúde Coletiva", trend: "d", simp: .70, old: 22 },
  { spec: "PREV", code: "PREV2", name: "Estudos Epidemiológicos", trend: "e", simp: .90, old: 89 },
  { spec: "PREV", code: "PREV3", name: "Testes Epidemiológicos", trend: "e", simp: .90, old: 73 },
  { spec: "PREV", code: "PREV4", name: "Vigilância Epidemiológica", trend: "e", simp: .85, old: 65 },
  { spec: "PREV", code: "PREV5", name: "Saúde do Trabalhador", trend: "d", simp: .70, old: 40 },
  { spec: "CM", code: "CM1a", name: "Cardio — Arritmias Cardíacas e PCR", trend: "e", simp: .80, old: 75 },
  { spec: "CM", code: "CM1b", name: "Cardio — IC, Cardiomiopatias e Pericardiopatias", trend: "c", simp: .60, old: 90 },
  { spec: "CM", code: "CM1c", name: "Cardio — Hipertensão Arterial Sistêmica", trend: "e", simp: .80, old: 91 },
  { spec: "CM", code: "CM1d", name: "Cardio — Valvopatias e Semiologia Cardíaca", trend: "e", simp: .75, old: 72 },
  { spec: "CM", code: "CM1e", name: "Cardio — Doença Arterial Coronariana", trend: "c", simp: .60, old: 81 },
  { spec: "CM", code: "CM1f", name: "Cardio — Síndrome Metabólica e Dislipidemia", trend: "c", simp: .80, old: 55 },
  { spec: "CM", code: "CM2a", name: "Endocrino — Doenças da Tireoide", trend: "e", simp: .70, old: 60 },
  { spec: "CM", code: "CM2b", name: "Endocrino — Doenças da Paratireoide", trend: "e", simp: .70, old: 60 },
  { spec: "CM", code: "CM2c", name: "Endocrino — Suprarrenal, Hipófise e Hipotálamo", trend: "e", simp: .60, old: 58 },
  { spec: "CM", code: "CM2d", name: "Endocrino — Diabetes Mellitus", trend: "e", simp: .70, old: 65 },
  { spec: "CM", code: "CM2e", name: "Endocrino — Obesidade", trend: "e", simp: .75, old: 50 },
  { spec: "CM", code: "CM3a", name: "Gastro — Pancreatite Aguda, Crônica e Neoplasias", trend: "c", simp: .70, old: 79 },
  { spec: "CM", code: "CM3b", name: "Gastro — Diarreias, Parasitoses Intestinais", trend: "e", simp: .70, old: 50 },
  { spec: "CM", code: "CM3c", name: "Gastro — DIIs, SII e Constipação", trend: "e", simp: .80, old: 56 },
  { spec: "CM", code: "CM4a", name: "Hepato — Anatomia, Fisiologia e Hepatites", trend: "e", simp: .70, old: 60 },
  { spec: "CM", code: "CM4b", name: "Hepato — Insuficiência Hepática e suas Causas", trend: "e", simp: .70, old: 60 },
  { spec: "CM", code: "CM4c", name: "Hepato — Insuficiência Hepática e Complicações", trend: "e", simp: .70, old: 60 },
  { spec: "CM", code: "CM4d", name: "Hepato — Tumores Hepáticos", trend: "e", simp: .65, old: 55 },
  { spec: "CM", code: "CM6a", name: "Infecto — Grandes Síndromes Bacterianas, ITU e ATB", trend: "c", simp: .70, old: 84 },
  { spec: "CM", code: "CM6b", name: "Infecto — Síndromes Febris", trend: "e", simp: .75, old: 64 },
  { spec: "CM", code: "CM6c", name: "Infecto — Toxicologia Clínica", trend: "e", simp: .75, old: 42 },
  { spec: "CM", code: "CM6d", name: "Infecto — HIV/AIDS", trend: "c", simp: .70, old: 45 },
  { spec: "CG", code: "CG1a", name: "Trauma — Atendimento Inicial ao Politraumatizado", trend: "d", simp: .80, old: 40 },
  { spec: "CG", code: "CG1b", name: "Trauma — Trauma Torácico", trend: "d", simp: .80, old: 40 },
  { spec: "CG", code: "CG1c", name: "Trauma — Trauma Abdominal, Pélvico e Urológico", trend: "d", simp: .80, old: 40 },
  { spec: "CG", code: "CG1d", name: "Trauma — Neurotrauma e Trauma Crânio-Cervical", trend: "d", simp: .80, old: 40 },
  { spec: "CG", code: "CG1e", name: "Trauma — Queimaduras e Trauma de Extremidades", trend: "d", simp: .80, old: 36 },
  { spec: "CG", code: "CG2a", name: "Gastrocirúrgica — Doenças do Esôfago", trend: "e", simp: .80, old: 61 },
  { spec: "CG", code: "CG2b", name: "Gastrocirúrgica — Doenças do Estômago", trend: "e", simp: .75, old: 69 },
  { spec: "CG", code: "CG2c", name: "Gastrocirúrgica — Doenças das Vias Biliares", trend: "c", simp: .70, old: 77 },
  { spec: "CG", code: "CG2d", name: "Gastrocirúrgica — Doenças Malignas das Vias Biliares", trend: "e", simp: .70, old: 50 },
  { spec: "CG", code: "CG2e", name: "Gastrocirúrgica — Cirurgia de Obesidade", trend: "e", simp: .70, old: 50 },
  { spec: "CG", code: "CG2f", name: "Gastrocirúrgica — Hemorragia Digestiva", trend: "e", simp: .60, old: 38 },
  { spec: "CG", code: "CG3",  name: "Hérnias", trend: "e", simp: .90, old: 50 },
  { spec: "CG", code: "CG4a", name: "Abdome Agudo — Inflamatório", trend: "e", simp: .70, old: 52 },
  { spec: "CG", code: "CG4b", name: "Abdome Agudo — Obstrutivo, Vascular e Perfurativo", trend: "e", simp: .60, old: 67 },
  { spec: "CG", code: "CG5a", name: "Perioperatório — Técnica Cirúrgica e Pós", trend: "e", simp: .80, old: 32 },
  { spec: "CG", code: "CG5b", name: "Perioperatório — Pré-Operatório e Nutrição", trend: "d", simp: .80, old: 28 },
  { spec: "CG", code: "CG9a", name: "Ortopedia — Geral e Fraturas", trend: "d", simp: .70, old: 35 },
  { spec: "CG", code: "CG9b", name: "Ortopedia — Pediátrica e Tumores Ósseos", trend: "d", simp: .70, old: 30 },
  { spec: "CG", code: "CG11", name: "Anestesiologia", trend: "e", simp: .75, old: 44 },
  { spec: "CG", code: "CG13", name: "Oftalmologia", trend: "d", simp: .70, old: 33 },
  { spec: "PED", code: "PED1a", name: "Neonato — Reanimação e Testes de Triagem", trend: "e", simp: .75, old: 65 },
  { spec: "PED", code: "PED1b", name: "Neonato — Distúrbios I (Sepse, Icterícia, Resp.)", trend: "e", simp: .75, old: 65 },
  { spec: "PED", code: "PED1c", name: "Neonato — Distúrbios II (Infecções Cong. e Metab.)", trend: "e", simp: .75, old: 65 },
  { spec: "PED", code: "PED1d", name: "Neonato — Distúrbios III (Miscelânea)", trend: "e", simp: .80, old: 38 },
  { spec: "PED", code: "PED2",  name: "Alimentação Infantil", trend: "e", simp: .90, old: 30 },
  { spec: "PED", code: "PED3a", name: "Síndromes Pondero-Estaturais", trend: "d", simp: .80, old: 25 },
  { spec: "PED", code: "PED3b", name: "Síndromes Puberais", trend: "e", simp: .85, old: 43 },
  { spec: "PED", code: "PED4",  name: "Distúrbios Nutricionais", trend: "e", simp: .80, old: 45 },
  { spec: "PED", code: "PED6",  name: "Uropediatria", trend: "e", simp: .65, old: 65 },
  { spec: "PED", code: "PED8",  name: "Doenças Exantemáticas", trend: "e", simp: .80, old: 66 },
  { spec: "GIN", code: "GIN1",  name: "Gin — Ciclo Menstrual", trend: "e", simp: .80, old: 50 },
  { spec: "GIN", code: "GIN2",  name: "Gin — Planejamento Familiar", trend: "e", simp: .80, old: 50 },
  { spec: "GIN", code: "GIN3",  name: "Gin — Amenorreia", trend: "c", simp: .85, old: 62 },
  { spec: "GIN", code: "GIN4",  name: "Gin — Síndrome dos Ovários Policísticos", trend: "c", simp: .85, old: 62 },
  { spec: "GIN", code: "GIN5",  name: "Gin — SUA e Dismenorreia", trend: "e", simp: .90, old: 35 },
  { spec: "GIN", code: "GIN6a", name: "Gin — IST I: Vulvovaginites, Cervicites e DIP", trend: "e", simp: .90, old: 50 },
  { spec: "GIN", code: "GIN6b", name: "Gin — IST II: Úlceras Genitais e Violência Sexual", trend: "c", simp: .90, old: 40 },
  { spec: "OBS", code: "OBS1",  name: "Obs — Avaliação Inicial da Gestação", trend: "e", simp: .80, old: 71 },
  { spec: "OBS", code: "OBS2",  name: "Obs — Assistência ao Pré-Natal", trend: "e", simp: .80, old: 71 },
  { spec: "OBS", code: "OBS3",  name: "Obs — Sangramentos Gestacionais", trend: "e", simp: .75, old: 76 },
  { spec: "OBS", code: "OBS4a", name: "Obs — Doenças na Gestação: DHG e DMG", trend: "c", simp: .70, old: 88 },
  { spec: "OBS", code: "OBS4b", name: "Obs — Doenças na Gestação: STORCHs, Gemelaridade", trend: "e", simp: .65, old: 49 },
];

const trendV = { c: 1.0, e: 0.75, d: 0.40 };
const SPEC_COLORS = { CM: "#0EA5E9", CG: "#F59E0B", OBS: "#EC4899", PED: "#10B981", PREV: "#6366F1", GIN: "#F97316" };

function tier(v) {
  if (v >= 80) return { color: "#EF4444", label: "CRÍTICO" };
  if (v >= 60) return { color: "#F97316", label: "ALTA PRIOR." };
  if (v >= 40) return { color: "#10B981", label: "MÉDIA PRIOR." };
  return { color: "#0EA5E9", label: "BAIXA PRIOR." };
}

// ── Components ───────────────────────────────────────────────────────
function FormulaSection({ color }) {
  const weights = [
    { inst: "ENARE", w: 5, color: "#EF4444", desc: "Prova com maior peso — foco principal do estudo" },
    { inst: "USP",            w: 4, color: "#F97316", desc: "Alta relevância, forte em Cirurgia e Gastro" },
    { inst: "UNIFESP",        w: 2, color: "#0EA5E9", desc: "Peso menor — complementar ao ENARE/USP" },
  ];
  return (
    <div>
      <div style={S.gridTitle}>Pesos por instituição</div>
      <div style={{ ...S.gridWrap, gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", marginBottom: 24 }}>
        {weights.map(w => (
          <div key={w.inst} style={S.gridCard(w.color)}>
            <div style={S.gridLabel(w.color)}>{w.inst}</div>
            <div style={{ fontSize: 30, fontWeight: 300, color: w.color, fontFamily: "'DM Serif Display', serif", lineHeight: 1.1, marginBottom: 6 }}>{w.w}</div>
            <div style={{ ...S.gridValue, fontSize: 12, color: T.textMuted }}>{w.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ ...S.alert("#000"), background: "#fafaf8", border: "1px solid #e2e8f0", borderLeft: "3px solid #000" }}>
        <div style={{ ...S.alertTitle("#000")}}>Fórmula W-IPR — completa e Dinâmica</div>
        <div style={{ ...S.gridValue, fontSize: 11, color: T.textMuted }}>
          W-IPR = round( (Wf_norm × 0.40 + Wcov × 0.30 + Wtrend × 0.20 + Wsimp × 0.10) × 100 )<br/>
          * Os dados estão agora ligados diretamente ao Firebase e ajustam-se automaticamente.
        </div>
      </div>
    </div>
  );
}

function RankingsSection({ color, dynamicTopics }) {
  const [filter, setFilter] = useState("all");

  const filtered = dynamicTopics.filter(t => {
    if (filter === "c")  return t.wipr >= 80;
    if (filter === "h")  return t.wipr >= 60 && t.wipr < 80;
    if (filter === "m")  return t.wipr >= 40 && t.wipr < 60;
    if (filter === "l")  return t.wipr < 40;
    if (filter === "up") return t.wipr > t.old + 2;
    if (filter === "dn") return t.wipr < t.old - 2;
    return true;
  });

  const stats = [
    { label: "Temas analisados", val: dynamicTopics.length, c: T.textPrimary },
    { label: "Crítico", val: dynamicTopics.filter(t => t.wipr >= 80).length, c: "#EF4444" },
    { label: "Subiram ↑", val: dynamicTopics.filter(t => t.wipr > t.old + 2).length, c: "#10B981" },
    { label: "Caíram ↓",  val: dynamicTopics.filter(t => t.wipr < t.old - 2).length, c: "#EF4444" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={S.gridCard(s.c)}>
            <div style={S.gridLabel(s.c)}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: s.c, fontFamily: "monospace", lineHeight: 1 }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {[{ id: "all", label: "Todos" }, { id: "c", label: "Crítico 80+" }, { id: "h", label: "Alta 60–79" }, { id: "m", label: "Média 40–59" }, { id: "l", label: "Baixa <40" }, { id: "up", label: "↑ Subiram" }, { id: "dn", label: "↓ Caíram" }].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              background: filter === f.id ? `${color}15` : "transparent",
              border: `1px solid ${filter === f.id ? color : T.borderCard}`,
              color: filter === f.id ? color : T.textMuted,
              padding: "5px 12px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled, marginBottom: 12 }}>
        {filtered.length} TEMAS EXIBIDOS · Sincronizado com Firebase
      </div>

      {filtered.map((t, i) => {
        const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#6366F1", label: "REV" };
        const sc = SPEC_COLORS[t.spec] || color;
        const d  = t.wipr - t.old;
        const globalRank = dynamicTopics.indexOf(t) + 1;
        return (
          <div key={t.code + i} style={S.gradeWrap(ti.color)}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ ...S.gradeBadge(ti.color), fontSize: 13, padding: "6px 10px" }}>{t.wipr}</div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: T.textDisabled }}>#{globalRank}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.4, marginBottom: 3 }}>{t.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, background: `${sc}15`, border: `1px solid ${sc}44`, color: sc }}>{t.spec}</span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>{t.code}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, flexShrink: 0, minWidth: 32, textAlign: "right", color: d > 2 ? "#10B981" : d < -2 ? "#EF4444" : T.textDisabled }}>
              {d > 2 ? `↑${d}` : d < -2 ? `↓${Math.abs(d)}` : "→"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlanoSection({ color, user, dynamicTopics }) {
  const [exp, setExp] = useState(new Set([1, 2, 3]));
  const [done, setDone] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Aqui mantemos o seu modelo WEEKS, mas com um helper para buscar o WIPR dinâmico
  const getDynamicWIPR = (nameOrCode) => {
    const topic = dynamicTopics.find(t => t.name === nameOrCode || t.code === nameOrCode);
    return topic ? topic.wipr : 0;
  };

  const WEEKS = [
    { n:1, focus:"Epidemiologia + DHG/DMG", col:"#EF4444", h:22, topics:[{name:"Estudos Epidemiológicos", h:11, mode:"Estudo completo"},{name:"Obs — Doenças na Gestação: DHG e DMG", h:11, mode:"Estudo completo"}]},
    { n:2, focus:"HAS + Bacterianas/ITU", col:"#EF4444", h:21, topics:[{name:"Cardio — Hipertensão Arterial Sistêmica", h:10, mode:"Estudo completo"},{name:"Infecto — Grandes Síndromes Bacterianas, ITU e ATB", h:11, mode:"Estudo completo"}]},
    { n:3, focus:"IC + Pancreatite", col:"#EF4444", h:20, topics:[{name:"Cardio — IC, Cardiomiopatias e Pericardiopatias", h:11, mode:"Estudo completo"},{name:"Gastro — Pancreatite Aguda, Crônica e Neoplasias", h:9, mode:"Estudo completo"}]},
    { n:4, focus:"Vias biliares + Arritmias + Pré-natal", col:"#EF4444", h:20, topics:[{name:"Gastrocirúrgica — Doenças das Vias Biliares", h:8, mode:"Estudo completo"},{name:"Cardio — Arritmias Cardíacas e PCR", h:7, mode:"Estudo completo"},{name:"Obs — Assistência ao Pré-Natal", h:5, mode:"Estudo completo"}]},
    // Pode expandir o array de semanas seguindo a nova nomenclatura do Dicionário Base...
  ];

  const docRef = doc(db, "progresso", user.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setDone(new Set(docSnap.data().temasFeitos || []));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const tog = (n) => setExp(p => { const nx = new Set(p); nx.has(n) ? nx.delete(n) : nx.add(n); return nx; });
  const togDone = async (key) => {
    const nx = new Set(done);
    nx.has(key) ? nx.delete(key) : nx.add(key);
    setDone(nx);
    await setDoc(docRef, { temasFeitos: Array.from(nx) }, { merge: true });
  };

  if (loading) return <div style={{ fontFamily: "monospace", color: T.textSubtle, padding: 20 }}>Sincronizando...</div>;

  return (
    <div>
      {/* Botões expandir/recolher */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["Expandir tudo", true], ["Recolher tudo", false]].map(([l, o]) => (
          <button key={l} onClick={() => setExp(o ? new Set(WEEKS.map(w => w.n)) : new Set())}
            style={{ background: "transparent", border: `1px solid ${T.borderCard}`, color: T.textMuted, padding: "5px 11px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>
            {l}
          </button>
        ))}
      </div>

      {WEEKS.map(w => {
        const isO = exp.has(w.n);
        const weekKeys = w.topics.map((_, i) => `${w.n}-${i}`);
        const doneCount = weekKeys.filter(k => done.has(k)).length;
        const allDone = doneCount > 0 && doneCount === w.topics.length;

        return (
          <div key={w.n} style={S.decisionWrap(allDone ? "#10B981" : w.col)}>
            <div onClick={() => tog(w.n)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: allDone ? "#F0FDF4" : "#fafaf8", cursor: "pointer" }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : w.col, minWidth: 60, fontWeight: 600 }}>SEMANA {w.n}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: allDone ? T.textMuted : T.textPrimary, textDecoration: allDone ? "line-through" : "none" }}>{w.focus}</span>
            </div>

            {isO && (
              <div style={{ padding: "0 14px 10px" }}>
                {w.topics.map((t, i) => {
                  const key = `${w.n}-${i}`;
                  const isDone = done.has(key);
                  const wiprLive = getDynamicWIPR(t.name);
                  const ti = wiprLive > 0 ? tier(wiprLive) : { color: "#6366F1" };

                  return (
                    <div key={key} onClick={(e) => { e.stopPropagation(); togDone(key); }} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 0", cursor: "pointer" }}>
                      <div style={{ flexShrink: 0, width: 32, height: 20, borderRadius: 4, background: `${ti.color}26`, color: ti.color, fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        {wiprLive > 0 ? wiprLive : "rev"}
                      </div>
                      <div style={{ flex: 1, fontSize: 12.5, color: isDone ? T.textDisabled : T.textPrimary, textDecoration: isDone ? "line-through" : "none" }}>
                        {t.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Application Core ────────────────────────────────────────────────
const SECTIONS = [
  { id: "formula",  name: "Fórmula",       color: "#6366F1" },
  { id: "rankings", name: "Rankings",      color: "#0EA5E9" },
  { id: "plano",    name: "Plano Semanal", color: "#10B981" },
];

export default function RESIDEX_CONTROLLER() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setStatus("authorized"); // Pulei as regras de lock apenas para demo
      } else {
        setUser(null);
        setStatus("loggedOut");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  if (status === "loading") return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0F172A", color: "#fff", fontFamily: "monospace" }}>Carregando...</div>;
  if (status === "loggedOut") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0F172A", padding: 20 }}>
      <h1 style={{ color: "#fff", fontSize: 28, marginBottom: 20 }}>RESIDEX</h1>
      <button onClick={handleLogin} style={{ padding: "14px 24px", color: "#0F172A", background: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>Entrar com Google</button>
    </div>
  );

  return <RESIDEX_APP user={user} onLogout={handleLogout} />;
}

function RESIDEX_APP({ user, onLogout }) {
  const [active, setActive] = useState("formula");
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const sec = SECTIONS.find(s => s.id === active);

  useEffect(() => {
    async function fetchStats() {
      try {
        const querySnapshot = await getDocs(collection(db, "estatisticas_temas"));
        const fbData = {};
        
        querySnapshot.forEach((doc) => {
          fbData[doc.id] = doc.data().frequencias || {};
        });

        const W_E = 5, W_U = 4, W_F = 2, W_T = 11;

        // Passo 1: Calcular os pesos brutos para descobrir qual o maxWf atual da nuvem
        let maxWfRaw = 0;
        const mappedData = TOPICS_METADATA.map(t => {
          const freqs = fbData[t.code] || {};
          
          // Ajuste aqui os nomes literais das bancas se diferente (ex: ENAMED_INEP, USP, etc)
          const enare = freqs["ENARE_AOCP_FGV"] || { n: 0, c: 0 };
          const usp   = freqs["USP"] || { n: 0, c: 0 };
          const unif  = freqs["UNIFESP"] || { n: 0, c: 0 };

          const rawWf = (enare.n * W_E + usp.n * W_U + unif.n * W_F) / W_T;
          if (rawWf > maxWfRaw) maxWfRaw = rawWf;

          return {
            ...t,
            nE: enare.n, cE: enare.c,
            nU: usp.n, cU: usp.c,
            nF: unif.n, cF: unif.c,
            rawWf
          };
        });

        const maxWf = maxWfRaw === 0 ? 1 : maxWfRaw; // Evita divisão por zero

        // Passo 2: Gerar o WIPR final normalizado
        const finalTopics = mappedData.map(t => {
          const Wcov = (t.cE * W_E + t.cU * W_U + t.cF * W_F) / W_T;
          const wiprRaw = (t.rawWf / maxWf * 0.40 + Wcov * 0.30 + trendV[t.trend] * 0.20 + t.simp * 0.10) * 100;
          return { ...t, wipr: Math.round(wiprRaw) };
        }).sort((a, b) => b.wipr - a.wipr);

        setDynamicTopics(finalTopics);
      } catch (error) {
        console.error("Erro ao buscar estatísticas do Firestore:", error);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchStats();
  }, []);

  function renderContent() {
    if (isLoadingData) return <div style={{fontFamily: "monospace", color: T.textSubtle}}>Baixando dados do Firebase...</div>;
    
    if (active === "formula")  return <FormulaSection color={sec.color} />;
    if (active === "rankings") return <RankingsSection color={sec.color} dynamicTopics={dynamicTopics} />;
    if (active === "plano")    return <PlanoSection color={sec.color} user={user} dynamicTopics={dynamicTopics} />;
  }

  return (
    <div style={S.page}>
      <style>{mobileCSS}</style>
      <div style={S.header}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <div style={S.headerEyebrow}>RESIDEX · Análise Estratégica</div>
            <h1 style={S.headerTitle}>W-IPR (Ao Vivo)</h1>
          </div>
          <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${T.borderSection}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "monospace", color: T.textMuted }}>
            Sair
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }} className="mp-body">
        <div style={S.nav} className="mp-nav-sidebar">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={S.navBtn(active === s.id, s.color)}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={S.navDot(active === s.id, s.color)} />
                {s.name}
              </div>
            </button>
          ))}
        </div>
        <div style={S.content} className="mp-content">
          <div style={S.sectionHeader(sec.color)}>
            <div style={S.sectionBadge(sec.color)}>{sec.name}</div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
