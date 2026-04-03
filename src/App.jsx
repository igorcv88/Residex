import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  bgPage: "#ffffff",
  bgSurface: "#ffffff",
  bgCard: "#ffffff",
  bgCardHl: "#eff6ff",
  bgObs: "#f8fafc",
  borderCard: "#e2e8f0",
  borderCardHl: "#bfdbfe",
  borderObs: "#6366F1",
  borderSection: "#e2e8f0",
  borderNav: "#e2e8f0",
  textPrimary: "#000000",
  textBody: "#000000",
  textMuted: "#445162",
  textSubtle: "#71859f",
  textDisabled: "#78818b",
  labelSection: "#64748b",
  labelCard: "#6366f1",
  labelObs: "#4f46e5",
  navText: "#253a47",
  navActive: "#000000",
  navDotInactive: "#afb8c4",
  navDotBottom: "#afb8c4",
  btnBackBorder: "#9aaac3",
  btnBackText: "#4e6485",
};

const S = {
page: {
    background: T.bgPage,
    minHeight: "100vh",
    fontFamily: "Source Serif 4",
    color: T.textBody,
    display: "flex",
    flexDirection: "column",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 8,
    marginBottom: 20,
  },
  gridCard: (color) => ({
    background: T.bgCardHl,
    border: `1px solid ${color}44`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 6,
    padding: "10px 14px",
  }),
  gridLabel: (color) => ({
    fontSize: 10,
    color,
    fontFamily: "monospace",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }),
  gridValue: {
    fontSize: 12.5,
    color: T.textPrimary,
    lineHeight: 1.6,
  },
  gradeWrap: (color) => ({
    background: T.bgCard,
    border: `1px solid ${T.borderCard}`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 8,
    padding: "10px 14px",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 6,
  }),
  gradeBadge: (color) => ({
    background: `${color}15`,
    border: `1px solid ${color}44`,
    color,
    fontSize: 11,
    fontFamily: "monospace",
    padding: "4px 8px",
    borderRadius: 4,
    flexShrink: 0,
    whiteSpace: "nowrap",
    minWidth: 38,
    textAlign: "center",
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
};

// ── Responsive CSS ───────────────────────────────────────────────────
// ── Responsive CSS & Fontes ──────────────────────────────────────────
const mobileCSS = `
/* 1. Importando as fontes super profissionais do Google */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; }

/* 2. Matando a fonte feia globalmente! 
   Isso pega qualquer lugar do código que tentou usar "monospace" 
   e substitui pela JetBrains Mono elegante e encorpada */
[style*="monospace"] {
  font-family: 'Roboto', monospace !important;
  font-weight: 500; /* Deixa a fonte um pouco mais gordinha e legível */
}

@media (max-width: 768px) {
  .mp-nav-sidebar { display: none !important; }
  .mp-nav-mobile {
    display: flex !important;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 8px; padding: 10px 12px;
    background: #0F172A;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0; position: sticky; top: 0; z-index: 10;
  }
  .mp-nav-mobile::-webkit-scrollbar { height: 3px; }
  .mp-nav-mobile::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
  .mp-nav-mobile-btn {
    flex-shrink: 0; white-space: nowrap; padding: 6px 14px;
    border-radius: 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s;
  }
  .mp-body { flex-direction: column !important; overflow-y: auto !important; }
  .mp-content { width: 100% !important; min-width: 0 !important; padding: 16px 12px !important; }
  .mp-header { padding: 16px 12px 12px !important; }
  .mp-header-title { font-size: 18px !important; line-height: 1.2 !important; }
  .mp-header-sections { display: none !important; }
  .mp-footer { padding: 8px 12px !important; flex-wrap: wrap; gap: 6px; }
}
@media (min-width: 769px) { .mp-nav-mobile { display: none !important; } }
`;

// ── W-IPR Engine ────────────────────────────────────────────────────
const W_E = 5, W_U = 4, W_F = 2, W_T = 11, maxWf = 3.182;
const trendV = { c: 1.0, e: 0.75, d: 0.40 };

const RAW = [
  { spec:"PREV", name:"Epidemiologia — delineamento e bioestatística",       code:"PREV2",       nE:4.0,nU:2.5,nF:2.5, cE:1,cU:1,cF:1, trend:"e", simp:.90, old:89 },
  { spec:"OBS",  name:"DHG e DMG — pré-eclâmpsia, HELLP, diabetes gest.",   code:"OBS4",        nE:3.5,nU:2.5,nF:2.5, cE:1,cU:1,cF:1, trend:"c", simp:.70, old:88 },
  { spec:"CM",   name:"Hipertensão arterial sistêmica",                      code:"CM1-CARDIO",  nE:3.5,nU:2.5,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:91 },
  { spec:"CM",   name:"Grandes síndromes bacterianas, ITU e antibioticos",   code:"CM6-INFECTO", nE:2.5,nU:2.0,nF:2.0, cE:1,cU:1,cF:1, trend:"c", simp:.70, old:84 },
  { spec:"CM",   name:"Insuficiência cardíaca e cardiomiopatias",            code:"CM1-CARDIO",  nE:2.5,nU:2.5,nF:1.5, cE:1,cU:1,cF:1, trend:"c", simp:.60, old:90 },
  { spec:"CG",   name:"Pancreatite aguda, crônica e neoplasias pancreáticas",code:"CM3/CG",      nE:1.5,nU:3.5,nF:1.0, cE:1,cU:1,cF:1, trend:"c", simp:.70, old:79 },
  { spec:"CG",   name:"Vias biliares — colecistite, coledocolitíase, CA",    code:"CG1+4",       nE:1.0,nU:3.5,nF:1.0, cE:1,cU:1,cF:1, trend:"c", simp:.70, old:77 },
  { spec:"CM",   name:"Arritmias cardíacas e PCR",                           code:"CM1-CARDIO",  nE:2.5,nU:2.0,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:75 },
  { spec:"OBS",  name:"Assistência ao pré-natal",                            code:"OBS1+2",      nE:2.5,nU:2.0,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:71 },
  { spec:"OBS",  name:"Sangramentos gestacionais — DPP, plac. prévia, atonia",code:"OBS3",       nE:2.5,nU:2.0,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:76 },
  { spec:"CM",   name:"DAC — síndromes coronarianas agudas e crônicas",      code:"CM4-CARDIO",  nE:1.5,nU:2.5,nF:1.5, cE:1,cU:1,cF:1, trend:"c", simp:.60, old:81 },
  { spec:"PREV", name:"Vigilância epidemiológica — sistemas e notificação",  code:"PREV4",       nE:2.5,nU:1.5,nF:1.5, cE:1,cU:1,cF:1, trend:"e", simp:.85, old:65 },
  { spec:"GIN",  name:"Amenorreia e síndrome dos ovários policísticos",      code:"GIN3+4",      nE:1.5,nU:1.0,nF:1.5, cE:1,cU:1,cF:1, trend:"c", simp:.85, old:62 },
  { spec:"PED",  name:"Neonato II — TORCH e distúrbios metabólicos",         code:"PED1",        nE:2.0,nU:1.5,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:65 },
  { spec:"CM",   name:"Síndromes febris — meningite, dengue, chikungunya",   code:"CM6-INFECTO", nE:2.0,nU:1.5,nF:1.5, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:64 },
  { spec:"CM",   name:"Valvopatias e semiologia cardíaca",                   code:"CM1-CARDIO",  nE:1.5,nU:1.5,nF:2.0, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:72 },
  { spec:"CM",   name:"Síndrome metabólica e dislipidemia",                  code:"CM4-CARDIO",  nE:1.0,nU:1.5,nF:1.0, cE:1,cU:1,cF:1, trend:"c", simp:.80, old:55 },
  { spec:"CG",   name:"Abdome agudo — obstrutivo, vascular e perfurativo",   code:"CG4",         nE:1.5,nU:2.0,nF:1.5, cE:1,cU:1,cF:1, trend:"e", simp:.60, old:67 },
  { spec:"CM",   name:"HIV/AIDS — TARV, profilaxias, infecções oportunistas",code:"CM6-INFECTO", nE:1.0,nU:1.0,nF:1.5, cE:1,cU:1,cF:1, trend:"c", simp:.70, old:45 },
  { spec:"CG",   name:"Esôfago — DRGE, Barrett, megaesôfago, CA",           code:"CG2",         nE:1.0,nU:2.0,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:61 },
  { spec:"GIN",  name:"Vulvovaginites, cervicites e DSTs",                   code:"GIN6",        nE:1.5,nU:1.0,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.90, old:50 },
  { spec:"CG",   name:"Abdome agudo inflamatório — apendicite, diverticulite",code:"CG4",        nE:1.0,nU:1.5,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.70, old:52 },
  { spec:"CG",   name:"Diarreias, parasitoses intestinais e DII",            code:"CM3-GASTRO",  nE:1.5,nU:1.0,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.70, old:50 },
  { spec:"OBS",  name:"Gestação — isoimunização, TORCH, infecções",          code:"OBS4-extra",  nE:1.5,nU:1.0,nF:1.5, cE:1,cU:1,cF:1, trend:"e", simp:.65, old:49 },
  { spec:"CM",   name:"Suprarrenal, hipófise e hipotálamo — Cushing, Addison",code:"CM2-ENDO",   nE:1.0,nU:1.5,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.60, old:58 },
  { spec:"PED",  name:"Distúrbios nutricionais pediátricos",                 code:"PED4",        nE:1.0,nU:1.0,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:45 },
  { spec:"CM",   name:"Tumores hepáticos — CHC, metástases, abscesso",       code:"CM4-HEPATO",  nE:1.0,nU:1.5,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.65, old:55 },
  { spec:"GIN",  name:"SUA e dismenorreia",                                  code:"GIN5",        nE:0.5,nU:0.5,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.90, old:35 },
  { spec:"CM",   name:"Urgência e emergência hipertensiva",                  code:"CM1-URG",     nE:0.5,nU:0.5,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.85, old:35 },
  { spec:"CG",   name:"Hérnias — inguinal, femoral, umbilical, hiatal",      code:"CG3",         nE:1.0,nU:1.0,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.90, old:50 },
  { spec:"GIN",  name:"Violência sexual e abordagem na APS",                 code:"GIN4",        nE:1.0,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"c", simp:.90, old:40 },
  { spec:"CM",   name:"Toxicologia clínica — intoxicações e antídotos",      code:"CM6-TOX",     nE:0.5,nU:1.0,nF:0.5, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:42 },
  { spec:"CG",   name:"Anestesiologia — bloqueios, fármacos e complicações", code:"CG11",        nE:0.5,nU:1.0,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.75, old:44 },
  { spec:"CG",   name:"Estômago — úlcera péptica e câncer gástrico",         code:"CG2-EST",     nE:1.0,nU:2.0,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.75, old:69 },
  { spec:"PED",  name:"Neonato III — miscelânea neonatal",                   code:"PED1-misc",   nE:1.0,nU:0.5,nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:38 },
  { spec:"PED",  name:"Síndromes puberais — puberdade precoce e atraso",     code:"PED3",        nE:0.5,nU:1.0,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.85, old:43 },
  { spec:"CG",   name:"CCP — cirurgia de tireoide e paratireoide",           code:"CG-CCP",      nE:0.5,nU:1.0,nF:0.5, cE:1,cU:1,cF:1, trend:"e", simp:.70, old:42 },
  { spec:"PED",  name:"Alimentação infantil — aleitamento e introdução",     code:"PED2",        nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.90, old:30 },
  { spec:"CG",   name:"DGE, SII e constipação",                              code:"CM3-GASTRO2", nE:0.5,nU:1.0,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.80, old:38 },
  { spec:"CG",   name:"Hemorragia digestiva — alta e baixa",                 code:"CG1-HDA",     nE:0.5,nU:1.0,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.60, old:38 },
  { spec:"CG",   name:"Técnica cirúrgica e pós-operatório",                  code:"CG6",         nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"e", simp:.80, old:32 },
  { spec:"CG",   name:"Ortopedia geral e fraturas",                          code:"CG9",         nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:1, trend:"d", simp:.70, old:35 },
  { spec:"CG",   name:"Pré-operatório e nutrição cirúrgica",                 code:"CG5",         nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"d", simp:.80, old:28 },
  { spec:"CG",   name:"Oftalmologia — retinopatia, glaucoma, catarata",      code:"CG13",        nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"d", simp:.70, old:33 },
  { spec:"CG",   name:"Ortopedia pediátrica e tumores ósseos",               code:"CG9-ped",     nE:0.5,nU:0.5,nF:0.5, cE:1,cU:1,cF:0, trend:"d", simp:.70, old:30 },
  { spec:"CG",   name:"Queimaduras e trauma de extremidades",                code:"CG1-trauma",  nE:1.0,nU:0.5,nF:0.5, cE:1,cU:0,cF:0, trend:"d", simp:.80, old:36 },
  { spec:"PED",  name:"Síndromes pondero-estaturais",                        code:"PED3-pond",   nE:0.5,nU:0.5,nF:0.5, cE:1,cU:0,cF:0, trend:"d", simp:.80, old:25 },
  { spec:"PREV", name:"Saúde do trabalhador — NR, doenças ocupacionais",     code:"PREV1",       nE:0.5,nU:0.5,nF:0.5, cE:1,cU:0,cF:1, trend:"d", simp:.70, old:22 },
  { spec:"PREV", name:"Testes epidemiológicos — Se, Sp, VPP, VPN, RV, acurácia, NNT", code:"PREV3",       nE:2.0, nU:1.5, nF:1.5, cE:1,cU:1,cF:1, trend:"e", simp:.90, old:73 },
  { spec:"PED",  name:"Doenças exantemáticas — exantema súbito, Kawasaki, sarampo, varicela", code:"PED8", nE:1.5, nU:1.0, nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.80, old:66 },
  { spec:"PED",  name:"Uropediatria — ITU, DMSA, RVU, s.nefrótica, s.nefrítica, SHU",        code:"PED6", nE:1.0, nU:1.5, nF:1.0, cE:1,cU:1,cF:1, trend:"e", simp:.65, old:65 },
];

function calcWIPR(t) {
  const Wf = (t.nE * W_E + t.nU * W_U + t.nF * W_F) / W_T;
  const Wcov = (t.cE * W_E + t.cU * W_U + t.cF * W_F) / W_T;
  return Math.round((Wf / maxWf * 0.40 + Wcov * 0.30 + trendV[t.trend] * 0.20 + t.simp * 0.10) * 100);
}

function tier(v) {
  if (v >= 80) return { color: "#EF4444", label: "CRÍTICO" };
  if (v >= 60) return { color: "#F97316", label: "ALTA PRIOR." };
  if (v >= 40) return { color: "#10B981", label: "MÉDIA PRIOR." };
  return { color: "#0EA5E9", label: "BAIXA PRIOR." };
}

const TOPICS = RAW.map(t => ({ ...t, wipr: calcWIPR(t) })).sort((a, b) => b.wipr - a.wipr);

const SPEC_COLORS = {
  CM: "#0EA5E9", CG: "#F59E0B", OBS: "#EC4899",
  PED: "#10B981", PREV: "#6366F1", GIN: "#F97316",
};

// ── Week plan data ───────────────────────────────────────────────────
const WEEKS = [
  { n:1,  focus:"Epidemiologia + DHG/DMG",          col:"#EF4444", h:22,
    topics:[{name:"Epidemiologia — delineamento e bioestatística",wipr:94,h:11,inst:"ENARE domina · 4q/prova",mode:"Estudo completo"},{name:"DHG e DMG — pré-eclâmpsia, HELLP, diabetes gest.",wipr:94,h:11,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"}]},
  { n:2,  focus:"HAS + Bacterianas/ITU",             col:"#EF4444", h:21,
    topics:[{name:"Hipertensão arterial sistêmica",wipr:89,h:10,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"Grandes síndromes bacterianas, ITU e antibioticos",wipr:85,h:11,inst:"ENARE crescente",mode:"Estudo completo"}]},
  { n:3,  focus:"IC + Pancreatite",                  col:"#EF4444", h:20,
    topics:[{name:"Insuficiência cardíaca e cardiomiopatias",wipr:85,h:11,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"Pancreatite aguda, crônica e neoplasias pancreáticas",wipr:84,h:9,inst:"USP líder · 3.5q/prova",mode:"Estudo completo"}]},
  { n:4,  focus:"Vias biliares + Arritmias + Pré-natal", col:"#EF4444", h:20,
    topics:[{name:"Vias biliares — colecistite, coledocolitíase, CA",wipr:81,h:8,inst:"USP líder + ENARE crescente",mode:"Estudo completo"},{name:"Arritmias cardíacas e PCR",wipr:81,h:7,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"Assistência ao pré-natal",wipr:81,h:5,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"}]},
  { n:5,  focus:"Sangramentos gest + DAC + Vigilância epi", col:"#EF4444", h:21,
    topics:[{name:"Sangramentos gestacionais — DPP, plac. prévia, atonia",wipr:81,h:7,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"DAC — síndromes coronarianas agudas e crônicas",wipr:79,h:8,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"Vigilância epidemiológica — sistemas e notificação",wipr:78,h:6,inst:"ENARE forte · 2.5q/prova",mode:"Estudo completo"}]},
 // substitui o objeto { n:6, ... } existente
{
  n:6, focus:"PREV3 + SOP + Neonato II + Síndromes febris", col:"#F97316", h:21,
  topics:[
    { name:"Testes epidemiológicos — Se, Sp, VPP, VPN, RV, acurácia, NNT", wipr:76, h:5,
      inst:"ENARE forte · 2q/prova · USP+UNIFESP constantes", mode:"Estudo completo" },
    { name:"Amenorreia e síndrome dos ovários policísticos", wipr:75, h:6,
      inst:"ENARE crescente", mode:"Estudo completo" },
    { name:"Neonato II — TORCH e distúrbios metabólicos", wipr:75, h:6,
      inst:"ENARE+USP+UNIFESP", mode:"Estudo completo" },
    { name:"Síndromes febris — meningite, dengue, chikungunya", wipr:74, h:4,
      inst:"ENARE+USP+UNIFESP", mode:"Estudo completo" },
  ]
},
  { n:7,  focus:"Valvopatias + Dislipidemia + Abdome agudo", col:"#F97316", h:17,
    topics:[{name:"Valvopatias e semiologia cardíaca",wipr:73,h:6,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"},{name:"Síndrome metabólica e dislipidemia",wipr:73,h:5,inst:"crescente todas as bancas",mode:"Estudo completo"},{name:"Abdome agudo — obstrutivo, vascular e perfurativo",wipr:72,h:6,inst:"ENARE+USP+UNIFESP",mode:"Estudo completo"}]},
  { n:8,  focus:"HIV + Esôfago + Vulvovaginites + Abdome inflam", col:"#F97316", h:17,
    topics:[{name:"HIV/AIDS — TARV, profilaxias, infecções oportunistas",wipr:71,h:5,inst:"crescente todas as bancas",mode:"Estudo completo"},{name:"Esôfago — DRGE, Barrett, megaesôfago, CA",wipr:70,h:5,inst:"USP+ENARE+UNIFESP",mode:"Estudo completo"},{name:"Vulvovaginites, cervicites e DSTs",wipr:69,h:4,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"},{name:"Abdome agudo inflamatório — apendicite, diverticulite",wipr:67,h:3,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"}]},
  // substitui o objeto { n:9, ... } existente
{
  n:9, focus:"Doenças gest + PED8 + Diarreias + Suprarrenal", col:"#F97316", h:21,
  topics:[
    { name:"Gestação — isoimunização, TORCH, infecções", wipr:68, h:5,
      inst:"ENARE+USP+UNIFESP", mode:"Visão geral" },
    { name:"Doenças exantemáticas — exantema súbito, Kawasaki, sarampo, varicela", wipr:68, h:5,
      inst:"ENARE domina · Kawasaki recorrente todas as bancas", mode:"Estudo completo" },
    { name:"Diarreias, parasitoses intestinais e DII", wipr:67, h:6,
      inst:"ENARE+USP+UNIFESP", mode:"Visão geral" },
    { name:"Suprarrenal, hipófise e hipotálamo", wipr:66, h:5,
      inst:"ENARE+USP+UNIFESP", mode:"Visão geral" },
  ]
},
 // substitui o objeto { n:10, ... } existente
{
  n:10, focus:"Dist nutricionais + PED6 + Estômago + Hérnias", col:"#F97316", h:19,
  topics:[
    { name:"Distúrbios nutricionais pediátricos", wipr:66, h:4,
      inst:"ENARE+USP+UNIFESP", mode:"Visão geral" },
    { name:"Uropediatria — ITU, DMSA, RVU, s.nefrótica, s.nefrítica, SHU", wipr:66, h:5,
      inst:"USP líder (1.5q) · ENARE+UNIFESP presentes", mode:"Estudo completo" },
    { name:"Estômago — úlcera péptica e câncer gástrico", wipr:63, h:4,
      inst:"USP forte", mode:"Visão geral" },
    { name:"Hérnias — inguinal, femoral, umbilical, hiatal", wipr:60, h:3,
      inst:"ENARE+USP", mode:"Visão geral" },
    { name:"Tumores hepáticos — CHC, metástases, abscesso", wipr:60, h:1,
      inst:"ENARE+USP", mode:"Visão geral" },
  ]
},
  { n:11, focus:"Neonato III + Violência + SUA + Urgência HAS", col:"#10B981", h:13,
    topics:[{name:"Neonato III — miscelânea neonatal",wipr:63,h:3,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"},{name:"Violência sexual e abordagem na APS",wipr:63,h:3,inst:"ENARE crescente",mode:"Visão geral"},{name:"SUA e dismenorreia",wipr:61,h:3,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"},{name:"Urgência e emergência hipertensiva",wipr:61,h:2,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"},{name:"CCP — tireoide e paratireoide",wipr:61,h:2,inst:"ENARE+USP+UNIFESP",mode:"Visão geral"}]},
  { n:12, focus:"Anestesia + Toxicologia + Puberais + Alimentação", col:"#10B981", h:12,
    topics:[{name:"Anestesiologia — bloqueios, fármacos e complicações",wipr:62,h:3,inst:"USP+UNIFESP+ENARE",mode:"Visão geral"},{name:"Toxicologia clínica — intoxicações e antídotos",wipr:61,h:3,inst:"USP+ENARE+UNIFESP",mode:"Visão geral"},{name:"Síndromes puberais — puberdade precoce e atraso",wipr:57,h:3,inst:"ENARE+USP",mode:"Visão geral"},{name:"Alimentação infantil — aleitamento e introdução",wipr:55,h:3,inst:"ENARE+USP",mode:"Visão geral"}]},
  { n:13, focus:"DGE + HDA/HDB + Técnica cirúrgica + Ortopedia", col:"#10B981", h:11,
    topics:[{name:"DGE, SII e constipação",wipr:56,h:3,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Hemorragia digestiva — alta e baixa",wipr:54,h:3,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Técnica cirúrgica e pós-operatório",wipr:54,h:2,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Ortopedia geral e fraturas",wipr:51,h:3,inst:"ENARE+USP+UNIFESP",mode:"Visão rápida"}]},
  { n:14, focus:"Baixa prioridade — cirurgia e pediatria", col:"#0EA5E9", h:9,
    topics:[{name:"Pré-operatório e nutrição cirúrgica",wipr:47,h:2,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Oftalmologia — retinopatia, glaucoma, catarata",wipr:46,h:2,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Ortopedia pediátrica e tumores ósseos",wipr:46,h:2,inst:"ENARE+USP",mode:"Visão rápida"},{name:"Queimaduras e trauma",wipr:39,h:2,inst:"ENARE",mode:"Visão rápida"},{name:"Síndromes pondero-estaturais",wipr:36,h:1,inst:"ENARE",mode:"Visão rápida"}]},
  { n:15, focus:"Saúde do trabalhador", col:"#0EA5E9", h:3,
    topics:[{name:"Saúde do trabalhador — NR, doenças ocupacionais",wipr:40,h:3,inst:"ENARE+UNIFESP",mode:"Visão rápida"}]},
  { n:16, focus:"Revisão ativa — banco de questões críticos", col:"#EF4444", h:18,
    topics:[{name:"Revisão: Epidemiologia + Vigilância",wipr:0,h:5,inst:"ENARE prioridade máxima",mode:"Revisão"},{name:"Revisão: HAS + IC + Arritmias + DAC",wipr:0,h:5,inst:"ENARE+USP+UNIFESP",mode:"Revisão"},{name:"Revisão: DHG/DMG + Pré-natal + Sangramentos + SOP",wipr:0,h:4,inst:"ENARE+USP+UNIFESP",mode:"Revisão"},{name:"Revisão: Bacterianas/ITU + Febris + HIV",wipr:0,h:4,inst:"ENARE crescente",mode:"Revisão"}]},
];

// ── Mode colors ─────────────────────────────────────────────────────
function modeStyle(mode) {
  if (mode === "Estudo completo") return { bg: "#FEF2F2", tx: "#991B1B", br: "#FECACA" };
  if (mode === "Visão geral")     return { bg: "#F0FDF4", tx: "#14532D", br: "#BBF7D0" };
  if (mode === "Revisão")         return { bg: "#EEF2FF", tx: "#312E81", br: "#C7D2FE" };
  return { bg: "#F0F9FF", tx: "#0C4A6E", br: "#BAE6FD" };
}

// ── Section: Fórmula ────────────────────────────────────────────────
function FormulaSection({ color }) {
  const weights = [
    { inst: "ENARE / ENAMED", w: 5, color: "#EF4444", desc: "Prova com maior peso — foco principal do estudo" },
    { inst: "USP",            w: 4, color: "#F97316", desc: "Alta relevância, forte em Cirurgia e Gastro" },
    { inst: "UNIFESP",        w: 2, color: "#0EA5E9", desc: "Peso menor — complementar ao ENARE/USP" },
  ];
  const components = [
    { label: "Wf_norm · 40%", desc: "Frequência ponderada normalizada. Maior componente — quantidade histórica de questões ajustada pela importância de cada banca." },
    { label: "Wcov · 30%",    desc: "Cobertura institucional ponderada. Tema nas 3 bancas = 1.0 · Só ENARE = 0.45 · Penaliza nichos de uma única prova." },
    { label: "Wtrend · 20%",  desc: "Tendência 2024–2026. Crescente = 1.0 · Estável = 0.75 · Decrescente = 0.40. Reflete ciclos de cobrança recente." },
    { label: "Wsimp · 10%",   desc: "Custo-benefício de complexidade (0–1). Temas mais diretos pontuam mais — maior retorno por hora estudada." },
  ];
  return (
    <div>
      <div style={S.gridTitle}>Pesos por instituição</div>
      <div style={{ ...S.gridWrap, gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", marginBottom: 24 }}>
        {weights.map(w => (
          <div key={w.inst} style={S.gridCard(w.color)}>
            <div style={S.gridLabel(w.color)}>{w.inst}</div>
            <div style={{ fontSize: 32, fontWeight: 300, color: w.color, fontFamily: "Neuton", lineHeight: 1.1, marginBottom: 6 }}>{w.w}</div>
            <div style={{ ...S.gridValue, fontSize: 11.5, color: T.textMuted }}>{w.desc}</div>
          </div>
        ))}
      </div>

      <div style={S.alert(color)}>
        <div style={S.alertTitle(color)}>Frequência ponderada — componente 40%</div>
        <div style={{ ...S.alertText, fontFamily: "Neuton", fontSize: 12.5, lineHeight: 2 }}>
          Wf = (n_ENARE × 5 + n_USP × 4 + n_UNIFESP × 2) ÷ 11<br />
          Wf_norm = Wf ÷ 3.18 &nbsp;&nbsp;← máximo observado (Epidemiologia)
        </div>
      </div>

      <div style={S.alert("#10B981")}>
        <div style={S.alertTitle("#10B981")}>Cobertura institucional — componente 30%</div>
        <div style={{ ...S.alertText, fontFamily: "Neuton", fontSize: 12.5, lineHeight: 2 }}>
          Wcov = (pE × 5 + pU × 4 + pF × 2) ÷ 11<br />
          p = 1 se presente, 0 se ausente na instituição
        </div>
      </div>

      <div style={{ ...S.alert("#000"), background: "#fafaf8", border: "1px solid #e2e8f0", borderLeft: "3px solid #000" }}>
        <div style={{ ...S.alertTitle("#000"), fontSize: 10 }}>Fórmula W-IPR — completa</div>
        <div style={{ ...S.alertText, fontFamily: "Neuton", fontSize: 13, fontWeight: 500, lineHeight: 2 }}>
          W-IPR = round( (Wf_norm × 0.40 + Wcov × 0.30 + Wtrend × 0.20 + Wsimp × 0.10) × 100 )
        </div>
      </div>

      <div style={{ ...S.gridTitle, marginTop: 8 }}>Componentes da fórmula</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 8, marginBottom: 20 }}>
        {components.map(c => (
          <div key={c.label} style={S.gridCard(color)}>
            <div style={S.gridLabel(color)}>{c.label}</div>
            <div style={{ ...S.gridValue, fontSize: 12, color: T.textMuted }}>{c.desc}</div>
          </div>
        ))}
      </div>

      <div style={S.obs}>
        <div style={S.obsTitle}>Efeito principal dos pesos</div>
        <div style={S.obsText}>
          ENARE domina com peso 5. Temas fortes no ENARE sobem mesmo que UNIFESP não os priorize.
          Temas dominantes apenas na UNIFESP (peso 2) sofrem deflação significativa. USP (peso 4)
          mantém alta relevância, especialmente em Cirurgia e Gastro — Pancreatite e Vias biliares
          sobem por força do USP mesmo com ENARE moderado nesses temas.
        </div>
      </div>
    </div>
  );
}

// ── Section: Rankings ───────────────────────────────────────────────
const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "c",   label: "Crítico 80+" },
  { id: "h",   label: "Alta 60–79" },
  { id: "m",   label: "Média 40–59" },
  { id: "l",   label: "Baixa <40" },
  { id: "up",  label: "↑ Subiram" },
  { id: "dn",  label: "↓ Caíram" },
];

function RankingsSection({ color }) {
  const [filter, setFilter] = useState("all");

  const filtered = TOPICS.filter(t => {
    if (filter === "c")  return t.wipr >= 80;
    if (filter === "h")  return t.wipr >= 60 && t.wipr < 80;
    if (filter === "m")  return t.wipr >= 40 && t.wipr < 60;
    if (filter === "l")  return t.wipr < 40;
    if (filter === "up") return t.wipr > t.old + 2;
    if (filter === "dn") return t.wipr < t.old - 2;
    return true;
  });

  const stats = [
    { label: "Temas analisados", val: TOPICS.length, c: T.textPrimary },
    { label: "Crítico W-IPR 80+", val: TOPICS.filter(t => t.wipr >= 80).length, c: "#EF4444" },
    { label: "Subiram ↑", val: TOPICS.filter(t => t.wipr > t.old + 2).length, c: "#10B981" },
    { label: "Caíram ↓",  val: TOPICS.filter(t => t.wipr < t.old - 2).length, c: "#EF4444" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={S.gridCard(s.c)}>
            <div style={S.gridLabel(s.c)}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: s.c, fontFamily: "monospace", lineHeight: 1 }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              background: filter === f.id ? `${color}15` : "transparent",
              border: `1px solid ${filter === f.id ? color : T.borderCard}`,
              color: filter === f.id ? color : T.textMuted,
              padding: "5px 12px",
              borderRadius: 4,
              fontSize: 11,
              fontFamily: "monospace",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled, marginBottom: 12 }}>
        {filtered.length} TEMAS EXIBIDOS · ↑ verde = subiu vs IPR anterior · ↓ vermelho = caiu
      </div>

      {filtered.map((t, i) => {
        const ti = tier(t.wipr);
        const sc = SPEC_COLORS[t.spec] || color;
        const d  = t.wipr - t.old;
        const globalRank = TOPICS.indexOf(t) + 1;
        return (
          <div key={t.code + i} style={S.gradeWrap(ti.color)}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ ...S.gradeBadge(ti.color), fontSize: 13, padding: "6px 10px" }}>{t.wipr}</div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: T.textDisabled }}>#{globalRank}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.4, marginBottom: 3 }}>{t.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 9, fontFamily: "monospace", padding: "2px 7px",
                  borderRadius: 3, background: `${sc}15`, border: `1px solid ${sc}44`, color: sc,
                }}>{t.spec}</span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>{t.code}</span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>ant. {t.old}</span>
              </div>
            </div>
            <div style={{
              fontSize: 12, fontFamily: "monospace", fontWeight: 600, flexShrink: 0, minWidth: 32, textAlign: "right",
              color: d > 2 ? "#10B981" : d < -2 ? "#EF4444" : T.textDisabled,
            }}>
              {d > 2 ? `↑${d}` : d < -2 ? `↓${Math.abs(d)}` : "→"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Section: Plano Semanal ──────────────────────────────────────────
function PlanoSection({ color, user }) {
  const [exp, setExp] = useState(new Set([1, 2, 3]));
  const [done, setDone] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Agora a mágica acontece: Cada pessoa tem sua própria pasta baseada no ID único dela (user.uid)
  const docRef = doc(db, "progresso", user.uid);

  // ESCUTAR O BANCO DE DADOS (Real-time)
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDone(new Set(data.temasFeitos || []));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]); // O useEffect agora reage ao ID do usuário

  const tog = (n) => setExp(p => { const nx = new Set(p); nx.has(n) ? nx.delete(n) : nx.add(n); return nx; });

  // SALVAR NO BANCO DE DADOS
  const togDone = async (key) => {
    const nx = new Set(done);
    nx.has(key) ? nx.delete(key) : nx.add(key);
    
    setDone(nx);

    try {
      await setDoc(docRef, { temasFeitos: Array.from(nx) }, { merge: true });
    } catch (e) {
      console.error("Erro ao sincronizar:", e);
    }
  };

  if (loading) {
    return <div style={{ fontFamily: "monospace", color: T.textSubtle, padding: 20 }}>Sincronizando com a nuvem...</div>;
  }

  const maxH = Math.max(...WEEKS.map(w => w.h));

  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:18}}>
      {[{l:"Semanas",v:"16",c:color},{l:"Total horas",v:`~${WEEKS.reduce((s,w)=>s+w.h,0)}h`,c:color},{l:"Média/sem",v:"~15h",c:color},{l:"Temas",v:"48",c:color}].map(s=><div key={s.l} style={S.gridCard(s.c)}><div style={S.gridLabel(s.c)}>{s.l}</div><div style={{fontSize:22,fontWeight:300,color:s.c,fontFamily:"monospace"}}>{s.v}</div></div>)}
    </div>
    <div style={{display:"flex",gap:6,marginBottom:14}}>
      {[["Expandir tudo",true],["Recolher tudo",false]].map(([l,o])=><button key={l} onClick={()=>setExp(o?new Set(WEEKS.map(w=>w.n)):new Set())} style={{background:"transparent",border:`1px solid ${T.borderCard}`,color:T.textMuted,padding:"5px 11px",borderRadius:4,fontSize:11,fontFamily:"monospace",cursor:"pointer"}}>{l}</button>)}
    </div>
    {WEEKS.map(w=>{
      const isO=exp.has(w.n);
      const weekKeys=w.topics.map((_,i)=>`${w.n}-${i}`);
      const doneCount=weekKeys.filter(k=>done.has(k)).length;
      const allDone=doneCount===w.topics.length;

      return(<div key={w.n} style={S.decisionWrap(allDone?"#10B981":w.col)}>
        <div onClick={()=>tog(w.n)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background: allDone?"#F0FDF4":"#fafaf8",cursor:"pointer",transition:"background 0.2s"}}>
          <span style={{fontSize:10,fontFamily:"monospace",color:allDone?"#14532D":w.col,minWidth:60,fontWeight:600,letterSpacing:"0.06em"}}>SEMANA {w.n}</span>
          <span style={{flex:1,fontSize:12.5,color:allDone?T.textMuted:T.textPrimary,textDecoration:allDone?"line-through":"none",transition:"all 0.2s"}}>{w.focus}</span>
          <span style={{fontSize:10,fontFamily:"monospace",color:allDone?"#14532D":T.textDisabled,flexShrink:0}}>{doneCount}/{w.topics.length}</span>
          <div style={{width:56,height:4,background:T.borderCard,borderRadius:2,overflow:"hidden",flexShrink:0}}>
            <div style={{width:`${Math.round(w.h/maxH*100)}%`,height:"100%",background:allDone?"#10B981":w.col,borderRadius:2,transition:"background 0.3s"}}/>
          </div>
          <span style={{fontSize:11,fontFamily:"monospace",color:allDone?"#14532D":w.col,minWidth:26,textAlign:"right"}}>{w.h}h</span>
          <span style={{fontSize:12,color:T.textDisabled,transition:"transform 0.2s",transform:isO?"rotate(90deg)":"none",flexShrink:0}}>›</span>
        </div>

        {isO&&<div style={{padding:"0 14px 10px"}}>
          {w.topics.map((t,i)=>{
            const key=`${w.n}-${i}`;
            const isDone=done.has(key);
            const ms=modeStyle(t.mode);
            const ti=t.wipr>0?tier(t.wipr):{c:"#6366F1",l:"REV"};

            const badgeStyle=isDone
              ? {flexShrink:0,width:32,height:20,borderRadius:4,
                 background:ti.c,
                 border:`1px solid ${ti.c}`,
                 color:"#ffffff",
                 fontSize:10,fontFamily:"monospace",
                 display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,
                 transition:"all 0.2s"}
              : {flexShrink:0,width:32,height:20,borderRadius:4,
                 background:`${ti.c}15`,
                 border:`1px solid ${ti.c}44`,
                 color:ti.c,
                 fontSize:10,fontFamily:"monospace",
                 display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,
                 transition:"all 0.2s"};

            return(<div
              key={key}
              onClick={(e)=>{e.stopPropagation();togDone(key);}}
              style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 0",
                      borderBottom:i<w.topics.length-1?`1px solid ${T.borderCard}`:"none",
                      cursor:"pointer",borderRadius:4,
                      background:isDone?"#fafffe":"transparent",
                      transition:"background 0.2s",
                      margin:"0 -4px",paddingLeft:4,paddingRight:4}}
            >
              <div style={badgeStyle}>{t.wipr>0?t.wipr:"rev"}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12.5,
                             color:isDone?T.textDisabled:T.textPrimary,
                             lineHeight:1.35,
                             textDecoration:isDone?"line-through":"none",
                             transition:"all 0.2s"}}>{t.name}</div>
                <div style={{fontSize:10,color:isDone?T.textDisabled:T.textMuted,marginTop:1,fontFamily:"monospace",transition:"color 0.2s"}}>{t.inst}</div>
              </div>
              <span style={{fontSize:9,padding:"2px 5px",borderRadius:3,
                            background:isDone?"#F0FDF4":ms.bg,
                            border:`1px solid ${isDone?"#BBF7D0":ms.br}`,
                            color:isDone?"#14532D":ms.tx,
                            fontFamily:"monospace",fontWeight:600,flexShrink:0,
                            transition:"all 0.2s"}}>
                {isDone?"✓ feito":t.mode}
              </span>
              <span style={{fontSize:11,fontFamily:"monospace",color:isDone?T.textDisabled:T.textMuted,flexShrink:0,minWidth:22,textAlign:"right"}}>{t.h}h</span>
            </div>);
          })}
        </div>}
      </div>);
    })}
  </div>);
}

// ── Main Component ───────────────────────────────────────────────────
const SECTIONS = [
  { id: "formula",  name: "Fórmula",       color: "#6366F1" },
  { id: "rankings", name: "Rankings",      color: "#0EA5E9" },
  { id: "plano",    name: "Plano Semanal", color: "#10B981" },
];

export default function RESIDEX_CONTROLLER() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, unauthorized, authorized
  const [userData, setUserData] = useState(null);

  const ADMIN_EMAIL = "igorv88@gmail.com"; // COLOQUE SEU EMAIL AQUI

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Verifica no banco de dados o status do usuário
        const userRef = doc(db, "usuarios", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (currentUser.email === ADMIN_EMAIL) {
          setStatus("authorized"); // Admin sempre entra
        } else if (userSnap.exists()) {
          const data = userSnap.data();
          const hoje = new Date();
          const validade = data.validUntil?.toDate(); // Converte timestamp do Firebase para Data JS

          if (validade && hoje < validade) {
            setStatus("authorized");
            setUserData(data);
          } else {
            setStatus("unauthorized");
          }
        } else {
          // Usuário logou mas não tem registro de compra no banco
          setStatus("unauthorized");
        }
      } else {
        setUser(null);
        setStatus("loggedOut");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  // 1. TELA DE CARREGAMENTO
  if (status === "loading") {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0F172A", color: "#fff", fontFamily: "monospace" }}>
        Sincronizando credenciais...
      </div>
    );
  }

  // 2. TELA DE LOGIN (DESLOGADO)
  if (status === "loggedOut") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0F172A", padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ color: "#fff", fontSize: 28, marginBottom: 10 }}>RESIDEX</h1>
          <p style={{ color: "#94A3B8", fontFamily: "monospace" }}>Seu cronograma personalizado para </p>
        </div>
        <button 
          onClick={handleLogin}
          style={{ padding: "14px 24px", color: "#0F172A", background: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" />
          Entrar com Google
        </button>
      </div>
    );
  }

  // 3. TELA DE BLOQUEIO (LOGADO MAS SEM ASSINATURA ATIVA)
  if (status === "unauthorized") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0F172A", padding: 20, textAlign: "center" }}>
        <div style={{ background: "#1E293B", padding: 40, borderRadius: 16, border: "1px solid #334155", maxWidth: 400 }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>🔒</div>
          <h2 style={{ color: "#fff", marginBottom: 15 }}>Acesso Restrito</h2>
          <p style={{ color: "#94A3B8", lineHeight: 1.6, marginBottom: 30 }}>
            Olá, <b>{user.displayName}</b>. <br/> 
            Não identificamos uma assinatura ativa para este e-mail ({user.email}).
          </p>
          <button style={{ width: "100%", padding: 14, background: "#10B981", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold", marginBottom: 15, cursor: "pointer" }}>
            Assinar Plano Anual
          </button>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", textDecoration: "underline" }}>
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  // 4. ACESSO LIBERADO (MOSTRA O RESIDEX ORIGINAL)
  return (
    <>
      {/* Aqui você pode colocar um pequeno banner de "Admin" se quiser */}
      {user.email === ADMIN_EMAIL && (
        <div style={{ background: "#6366F1", color: "#fff", fontSize: 10, textAlign: "center", padding: "2px 0", fontFamily: "monospace" }}>
          MODO ADMINISTRADOR ATIVO
        </div>
      )}
      <RESIDEX_APP user={user} onLogout={handleLogout} />
    </>
  );
}

function RESIDEX_APP({ user, onLogout }) {
  const [active, setActive] = useState("formula");
  const sec = SECTIONS.find(s => s.id === active);
  const color = sec.color;

  function renderContent() {
    if (active === "formula")  return <FormulaSection color={color} />;
    if (active === "rankings") return <RankingsSection color={color} />;
    if (active === "plano")    return <PlanoSection color={color} user={user} />; // Passamos o user aqui!
  }

  const sectionTitles = {
    formula:  "Sistema de Pontuação W-IPR",
    rankings: "48 Temas — Ranking Recalculado",
    plano:    "Cronograma 16 Semanas",
  };

  return (
    <div style={S.page}>
      <style>{mobileCSS}</style>

      {/* Header */}
      <div style={{...S.header, display: "flex", justifyContent: "space-between", alignItems: "center"}} className="mp-header">
        <div>
          <div style={S.headerEyebrow} className="mp-header-eyebrow">
            RESIDEX · Análise Estratégica
          </div>
          <h1 style={S.headerTitle} className="mp-header-title">
            W-IPR — Índice de Prioridade
          </h1>
        </div>
        {/* Botão de Logout Discreto */}
        <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${T.borderSection}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "monospace", color: T.textMuted }}>
          Sair
        </button>
      </div>

      {/* Nav mobile */}
      <div className="mp-nav-mobile">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className="mp-nav-mobile-btn"
            style={{
              background: active === s.id ? s.color : "rgba(255,255,255,0.06)",
              color: active === s.id ? "#fff" : "rgba(255,255,255,0.6)",
              boxShadow: active === s.id ? `0 0 12px ${s.color}44` : "none",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }} className="mp-body">

        {/* Sidebar desktop */}
        <div style={S.nav} className="mp-nav-sidebar">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={S.navBtn(active === s.id, s.color)}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={S.navDot(active === s.id, s.color)} />
                {s.name}
              </div>
            </button>
          ))}

          {/* Mini weight legend */}
          <div style={{ padding: "20px 16px 8px", borderTop: `1px solid ${T.borderNav}`, marginTop: 16 }}>
            <div style={{ ...S.gridTitle, marginBottom: 8 }}>Pesos</div>
            {[["ENARE", 5, "#EF4444"], ["USP", 4, "#F97316"], ["UNIFESP", 2, "#0EA5E9"]].map(([inst, w, c]) => (
              <div key={inst} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: T.textMuted }}>{inst}</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 600, color: c }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={S.content} className="mp-content">
          <div style={S.sectionHeader(color)} className="mp-section-header">
            <div style={S.sectionBadge(color)}>{sec.name}</div>
            <div style={S.sectionTitle}>{sectionTitles[active]}</div>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Footer */}
      <div style={S.footer} className="mp-footer">
        <div style={S.footerLabel}>
          {user.email} · RESIDEX v2
        </div>
      </div>
    </div>
  );
}
