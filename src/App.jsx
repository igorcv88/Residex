import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// ── Firebase Configuration ──────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDf-h0vqTuAJu_4hyB0mygXcCVtSvnaGBk",
  authDomain: "residex-9fa67.firebaseapp.com",
  projectId: "residex-9fa67",
  storageBucket: "residex-9fa67.firebasestorage.app",
  messagingSenderId: "641940405806",
  appId: "1:641940405806:web:23f99f7355ba0b4d3ce9bf",
  measurementId: "G-BY6328631R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Design Tokens & CSS ──────────────────────────────────────────────
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
  alert: (color) => ({ background: `${color}0e`, border: `1px solid ${color}40`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }),
  alertTitle: (color) => ({ fontSize: 11, fontFamily: "monospace", color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }),
  gridTitle: { fontSize: 10, fontFamily: "monospace", color: T.labelSection, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 },
  gridWrap: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 20 },
  gridCard: (color) => ({ background: T.bgCardHl, border: `1px solid ${color}44`, borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "10px 14px" }),
  gridLabel: (color) => ({ fontSize: 10, color, fontFamily: "monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }),
  gridValue: { fontSize: 12.5, color: T.textPrimary, lineHeight: 1.6 },
  gradeWrap: (color) => ({ background: T.bgCard, border: `1px solid ${T.borderCard}`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "10px 14px", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 6 }),
  gradeBadge: (color) => ({ background: `${color}15`, border: `1px solid ${color}44`, color, fontSize: 11, fontFamily: "monospace", padding: "4px 8px", borderRadius: 4, flexShrink: 0, whiteSpace: "nowrap", minWidth: 38, textAlign: "center" }),
  decisionWrap: (color) => ({ background: T.bgCard, border: `1px solid ${T.borderCard}`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8 }),
  input: { width: "100%", padding: "10px 12px", borderRadius: 6, border: `1px solid ${T.borderCard}`, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }
};

const mobileCSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&family=DM+Serif+Display&display=swap');
[style*="monospace"] { font-family: 'JetBrains Mono', monospace !important; font-weight: 500; }
@media (max-width: 768px) {
  .mp-nav-sidebar { display: none !important; }
  .mp-nav-mobile { display: flex !important; overflow-x: auto; gap: 8px; padding: 10px 12px; background: #0F172A; border-bottom: 1px solid rgba(255,255,255,0.06); position: sticky; top: 0; z-index: 10; }
  .mp-nav-mobile-btn { flex-shrink: 0; white-space: nowrap; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }
  .mp-body { flex-direction: column !important; overflow-y: auto !important; }
  .mp-content { width: 100% !important; padding: 16px 12px !important; }
}
@media (min-width: 769px) { .mp-nav-mobile { display: none !important; } }
`;

// ── Helpers & Constants ─────────────────────────────────────────────
const trendV = { c: 1.0, e: 0.75, d: 0.40 };
const SPEC_COLORS = { CM: "#0EA5E9", CG: "#F59E0B", OBS: "#EC4899", PED: "#10B981", PREV: "#6366F1", GIN: "#F97316" };

function tier(v) {
  if (v >= 80) return { color: "#EF4444", label: "CRÍTICO" };
  if (v >= 60) return { color: "#F97316", label: "ALTA PRIOR." };
  if (v >= 40) return { color: "#10B981", label: "MÉDIA PRIOR." };
  return { color: "#0EA5E9", label: "BAIXA PRIOR." };
}

// ── Core Engine: Calcula WIPR com base no Perfil do Utilizador ──────
function calculateDynamicWIPR(rawTopics, profile) {
  if (!rawTopics.length || !profile.institutions.length) return [];

  // Calcular o Peso Total (W_T) das bancas escolhidas pelo utilizador
  const W_T = profile.institutions.reduce((sum, inst) => sum + inst.weight, 0);

  // 1. Processar os temas e encontrar o máximo histórico (maxWfRaw)
  let maxWfRaw = 0;
  const mappedData = rawTopics.map(t => {
    let n_total = 0;
    let c_total = 0;

    profile.institutions.forEach(inst => {
      const freq = t.frequencias[inst.name] || { n: 0, c: 0 };
      n_total += freq.n * inst.weight;
      c_total += freq.c * inst.weight;
    });

    const rawWf = n_total / W_T;
    if (rawWf > maxWfRaw) maxWfRaw = rawWf;

    return { ...t, n_total, c_total, rawWf };
  });

  const maxWf = maxWfRaw === 0 ? 1 : maxWfRaw;

  // 2. Aplicar a fórmula final W-IPR
  return mappedData.map(t => {
    const Wcov = t.c_total / W_T;
    const tendencia = trendV[t.tendencia] || 0.75; 
    const simplicidade = t.simplicidade || 0.70;
    
    const wiprRaw = (t.rawWf / maxWf * 0.40 + Wcov * 0.30 + tendencia * 0.20 + simplicidade * 0.10) * 100;
    return { ...t, wipr: Math.round(wiprRaw) };
  }).sort((a, b) => b.wipr - a.wipr);
}

// ── Sections ────────────────────────────────────────────────────────

function PerfilSection({ color, profile, setProfile, user, rawTopics }) {
  const [examDate, setExamDate] = useState(profile.examDate || "");
  const [instWeight, setInstWeight] = useState(1);
  const [institutions, setInstitutions] = useState(profile.institutions || []);
  const [saving, setSaving] = useState(false);

  // ── ESTADOS DO DROPDOWN PESQUISÁVEL ──
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [uniqueInsts, setUniqueInsts] = useState([]);

  // Extrai dinamicamente todas as bancas que existem no Firebase
  useEffect(() => {
    const instSet = new Set();
    rawTopics.forEach(t => {
      if (t.frequencias) {
        Object.keys(t.frequencias).forEach(inst => instSet.add(inst));
      }
    });
    setUniqueInsts(Array.from(instSet).sort());
  }, [rawTopics]);

  // Filtra as bancas à medida que o utilizador digita
  const filteredInsts = uniqueInsts.filter(i => 
    i.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddInst = () => {
    if (!search || !uniqueInsts.includes(search)) {
      alert("Por favor, selecione uma instituição válida da lista clicando nela.");
      return;
    }
    if (institutions.some(i => i.name === search)) {
      alert("Esta instituição já foi adicionada ao seu alvo.");
      return;
    }
    setInstitutions([...institutions, { name: search, weight: Number(instWeight) }]);
    setSearch(""); // Limpa o campo de pesquisa
    setInstWeight(1);
  };

  const handleRemoveInst = (idx) => {
    setInstitutions(institutions.filter((_, i) => i !== idx));
  };

  const saveProfile = async () => {
    setSaving(true);
    const newProfile = { examDate, institutions };
    await setDoc(doc(db, "usuarios", user.uid), { perfil: newProfile }, { merge: true });
    setProfile(newProfile);
    setSaving(false);
    alert("Perfil guardado! A fórmula foi recalculada com as suas instituições.");
  };

  return (
    <div>
      <div style={S.alert(color)}>
        <div style={S.alertTitle(color)}>Data da Prova</div>
        <input 
          type="date" 
          value={examDate} 
          onChange={e => setExamDate(e.target.value)} 
          style={{...S.input, maxWidth: 200, marginBottom: 10}} 
        />
        <div style={{ fontSize: 11, color: T.textMuted }}>O plano semanal será distribuído até esta data.</div>
      </div>

      <div style={S.alert("#F97316")}>
        <div style={S.alertTitle("#F97316")}>Instituições Alvo & Pesos</div>
        
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
          
          {/* COMPONENTE AUTO-COMPLETE (DROPDOWN) */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <input 
              placeholder="Digite para procurar a instituição..." 
              value={search} 
              onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Pequeno atraso para permitir o clique
              style={{...S.input, width: "100%", boxSizing: "border-box"}} 
            />
            
            {showDropdown && (
              <div style={{ 
                position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, 
                background: "#fff", border: `1px solid ${T.borderCard}`, borderRadius: 6, 
                maxHeight: 200, overflowY: "auto", zIndex: 50, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
              }}>
                {filteredInsts.length > 0 ? filteredInsts.map(inst => (
                  <div 
                    key={inst}
                    onMouseDown={() => { setSearch(inst); setShowDropdown(false); }} // Usamos onMouseDown em vez de onClick para rodar antes do onBlur do input
                    style={{ padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid ${T.borderCard}`, fontSize: 13, color: T.textPrimary, transition: "background 0.2s" }}
                    onMouseEnter={(e) => e.target.style.background = "#f1f5f9"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                  >
                    {inst}
                  </div>
                )) : (
                  <div style={{ padding: "10px 14px", fontSize: 13, color: T.textDisabled, fontStyle: "italic" }}>
                    Nenhuma instituição encontrada.
                  </div>
                )}
              </div>
            )}
          </div>

          <select value={instWeight} onChange={e => setInstWeight(e.target.value)} style={{...S.input, width: 90}}>
            {[1,2,3,4,5].map(w => <option key={w} value={w}>Peso {w}</option>)}
          </select>
          <button onClick={handleAddInst} style={{ padding: "0 20px", height: 41, background: "#F97316", color: "#fff", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }}>Adicionar</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {institutions.map((inst, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", background: "#fff", padding: "10px 14px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
              <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{inst.name}</span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.textMuted }}>Peso {inst.weight}</span>
                <button onClick={() => handleRemoveInst(idx)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 12 }}>Remover</button>
              </div>
            </div>
          ))}
          {institutions.length === 0 && <div style={{ fontSize: 12, color: T.textMuted, fontStyle: "italic" }}>Nenhuma instituição adicionada.</div>}
        </div>
      </div>

      <button onClick={saveProfile} disabled={saving} style={{ padding: "12px 24px", background: color, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: "bold", cursor: "pointer", width: "100%" }}>
        {saving ? "A guardar..." : "Guardar Perfil & Recalcular Fórmula"}
      </button>
    </div>
  );
}


function FormulaSection({ color, profile }) {
  if (!profile.institutions.length) return <div style={{ color: T.textMuted }}>Configure o seu perfil primeiro.</div>;

  return (
    <div>
      <div style={S.gridTitle}>Pesos por instituição (Dinâmico)</div>
      <div style={{ ...S.gridWrap, gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", marginBottom: 24 }}>
        {profile.institutions.map((w, idx) => (
          <div key={idx} style={S.gridCard(color)}>
            <div style={S.gridLabel(color)}>{w.name}</div>
            <div style={{ fontSize: 30, fontWeight: 300, color: color, fontFamily: "'DM Serif Display', serif", lineHeight: 1.1, marginBottom: 6 }}>{w.weight}</div>
          </div>
        ))}
      </div>
      <div style={{ ...S.alert("#000"), background: "#fafaf8", border: "1px solid #e2e8f0", borderLeft: "3px solid #000" }}>
        <div style={{ ...S.alertTitle("#000")}}>Fórmula W-IPR Aplicada</div>
        <div style={{ ...S.gridValue, fontSize: 11, color: T.textMuted }}>
          Os 69 temas já foram processados. O algoritmo somou as frequências exclusivas das bancas que escolheu e ponderou pela complexidade e tendência de cada matéria. Vá à aba "Rankings" para ver o resultado exato.
        </div>
      </div>
    </div>
  );
}

function RankingsSection({ color, dynamicTopics }) {
  const [filter, setFilter] = useState("all");

  const filtered = dynamicTopics.filter(t => {
    if (filter === "c") return t.wipr >= 80;
    if (filter === "h") return t.wipr >= 60 && t.wipr < 80;
    if (filter === "m") return t.wipr >= 40 && t.wipr < 60;
    if (filter === "l") return t.wipr < 40;
    return true;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {[{ id: "all", label: "Todos" }, { id: "c", label: "Crítico 80+" }, { id: "h", label: "Alta 60–79" }, { id: "m", label: "Média 40–59" }, { id: "l", label: "Baixa <40" }].map(f => (
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
        {filtered.length} TEMAS EXIBIDOS
      </div>

      {filtered.map((t, i) => {
        const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#6366F1", label: "REV" };
        const sc = SPEC_COLORS[t.especialidade] || color;
        const globalRank = dynamicTopics.indexOf(t) + 1;
        
        return (
          <div key={t.id + i} style={S.gradeWrap(ti.color)}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ ...S.gradeBadge(ti.color), fontSize: 13, padding: "6px 10px" }}>{t.wipr}</div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: T.textDisabled }}>#{globalRank}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.4, marginBottom: 3 }}>{t.nome || t.id}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, background: `${sc}15`, border: `1px solid ${sc}44`, color: sc }}>{t.especialidade || 'GERAL'}</span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>{t.id}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlanoSection({ color, user, dynamicTopics, profile }) {
  const [exp, setExp] = useState(new Set([1]));
  const [done, setDone] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // 1. Calcular Semanas Restantes
  const hoje = new Date();
  const prova = profile.examDate ? new Date(profile.examDate) : new Date(hoje.getTime() + 180 * 24 * 60 * 60 * 1000); // Default 6 meses
  const diffTime = Math.abs(prova - hoje);
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  const totalWeeks = Math.max(1, Math.min(diffWeeks, 52)); // Min 1 semana, Max 52 semanas

  // 2. Distribuir os 69 temas dinamicamente pelas semanas
  const temasPorSemana = Math.ceil(dynamicTopics.length / totalWeeks);
  const WEEKS = Array.from({ length: totalWeeks }, (_, i) => ({
    n: i + 1,
    col: i < totalWeeks * 0.3 ? "#EF4444" : i < totalWeeks * 0.7 ? "#F97316" : "#10B981",
    topics: dynamicTopics.slice(i * temasPorSemana, (i + 1) * temasPorSemana)
  })).filter(w => w.topics.length > 0);

  const docRef = doc(db, "progresso", user.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) setDone(new Set(docSnap.data().temasFeitos || []));
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

  if (loading) return <div style={{ padding: 20 }}>A carregar...</div>;

  return (
    <div>
      <div style={S.alert(color)}>
        <div style={S.alertTitle(color)}>Cronograma Gerado Automático</div>
        <div style={{ ...S.alertText, fontSize: 12 }}>
          Faltam <b>{totalWeeks} semanas</b> para a prova. Os {dynamicTopics.length} temas foram divididos à razão de ~{temasPorSemana} por semana, começando pelos mais Críticos.
        </div>
      </div>

      {WEEKS.map(w => {
        const isO = exp.has(w.n);
        const weekKeys = w.topics.map(t => `${w.n}-${t.id}`);
        const doneCount = weekKeys.filter(k => done.has(k)).length;
        const allDone = doneCount > 0 && doneCount === w.topics.length;

        return (
          <div key={w.n} style={S.decisionWrap(allDone ? "#10B981" : w.col)}>
            <div onClick={() => tog(w.n)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: allDone ? "#F0FDF4" : "#fafaf8", cursor: "pointer" }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : w.col, minWidth: 60, fontWeight: 600 }}>SEMANA {w.n}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: allDone ? T.textMuted : T.textPrimary, textDecoration: allDone ? "line-through" : "none" }}>Estudo Guiado</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>{doneCount}/{w.topics.length}</span>
            </div>

            {isO && (
              <div style={{ padding: "0 14px 10px" }}>
                {w.topics.map((t) => {
                  const key = `${w.n}-${t.id}`;
                  const isDone = done.has(key);
                  const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#6366F1" };

                  return (
                    <div key={key} onClick={(e) => { e.stopPropagation(); togDone(key); }} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 0", cursor: "pointer", borderBottom: `1px solid ${T.borderCard}` }}>
                      <div style={{ flexShrink: 0, width: 32, height: 20, borderRadius: 4, background: `${ti.color}26`, color: ti.color, fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        {t.wipr}
                      </div>
                      <div style={{ flex: 1, fontSize: 12.5, color: isDone ? T.textDisabled : T.textPrimary, textDecoration: isDone ? "line-through" : "none" }}>
                        {t.nome || t.id}
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
  { id: "perfil",   name: "Meu Perfil",    color: "#F97316" },
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
        setStatus("authorized"); 
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
  const [active, setActive] = useState("perfil");
  const [rawTopics, setRawTopics] = useState([]);
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [profile, setProfile] = useState({ examDate: "", institutions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  const sec = SECTIONS.find(s => s.id === active);

  // 1. Puxar Dados Brutos (Firebase) + Perfil do Utilizador
  useEffect(() => {
    async function fetchData() {
      try {
        // Puxar Perfil
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        let userProfile = { examDate: "", institutions: [] };
        
        if (userDoc.exists() && userDoc.data().perfil) {
          userProfile = userDoc.data().perfil;
        } else {
          // Perfil Default se for o primeiro acesso
          userProfile = { examDate: "2026-11-15", institutions: [{name: "ENARE_AOCP_FGV", weight: 5}, {name: "USP", weight: 4}, {name: "UNIFESP", weight: 2}] };
        }
        setProfile(userProfile);

        // Puxar os 69 Temas e os metadados
        const querySnapshot = await getDocs(collection(db, "estatisticas_temas"));
        const rawData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRawTopics(rawData);

      } catch (error) {
        setFirebaseError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user.uid]);

  // 2. Recalcular WIPR sempre que o perfil (bancas/pesos) mudar
  useEffect(() => {
    if (rawTopics.length > 0) {
      const calculated = calculateDynamicWIPR(rawTopics, profile);
      setDynamicTopics(calculated);
    }
  }, [rawTopics, profile]);

  function renderContent() {
    if (isLoading) return <div style={{fontFamily: "monospace", color: T.textSubtle}}>Baixando dados do Firebase...</div>;
    
    if (firebaseError) return (
      <div style={S.alert("#EF4444")}>
        <div style={S.alertTitle("#EF4444")}>Falha de Conexão</div>
        <div style={{ ...S.alertText, fontFamily: "monospace", fontSize: 12 }}>{firebaseError}</div>
      </div>
    );
    
    if (active === "perfil") return <PerfilSection color={sec.color} profile={profile} setProfile={setProfile} user={user}rawTopics={rawTopics} />;
    if (active === "formula")  return <FormulaSection color={sec.color} profile={profile} />;
    if (active === "rankings") return <RankingsSection color={sec.color} dynamicTopics={dynamicTopics} />;
    if (active === "plano")    return <PlanoSection color={sec.color} user={user} dynamicTopics={dynamicTopics} profile={profile} />;
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

      <div className="mp-nav-mobile">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} className="mp-nav-mobile-btn" style={{ background: active === s.id ? s.color : "rgba(255,255,255,0.06)", color: active === s.id ? "#fff" : "rgba(255,255,255,0.6)", boxShadow: active === s.id ? `0 0 12px ${s.color}44` : "none" }}>
            {s.name}
          </button>
        ))}
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
