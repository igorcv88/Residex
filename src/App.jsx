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
  measurementId: "G-BY6328631R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Tokens & CSS ──────────────────────────────────────────────
const T = {
  bgPage: "#f8fafc",
  bgSurface: "#f1f5f9",
  bgCard: "#ffffff",
  bgObs: "#eef2ff",
  bgCardHl: "#eff6ff",
  borderCard: "#e2e8f0",
  borderCardHl: "#bfdbfe",
  borderObs: "#6366F1",
  borderSection: "#dde3eb",
  borderNav: "#dde3eb",
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
};

const S = {
  page: {
    background: T.bgPage,
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
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
  content: { flex: 1, overflowY: "auto", padding: "24px 28px" },
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
  sectionTitle: { fontSize: 17, fontWeight: 400, color: T.textPrimary },
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
  gridValue: { fontSize: 12.5, color: T.textPrimary, lineHeight: 1.6 },
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
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: `1px solid ${T.borderCard}`,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
  },
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

// ── Helpers & Formatter ─────────────────────────────────────────────
const SPEC_COLORS = {
  CM: "#0EA5E9",
  CG: "#F59E0B",
  OBS: "#EC4899",
  PED: "#10B981",
  PREV: "#6366F1",
  GIN: "#F97316",
};

function tier(v) {
  if (v >= 80) return { color: "#EF4444", label: "CRÍTICO" };
  if (v >= 60) return { color: "#F97316", label: "ALTA PRIOR." };
  if (v >= 40) return { color: "#EAB308", label: "MÉDIA PRIOR." };
  return { color: "#0EA5E9", label: "BAIXA PRIOR." };
}

// FORMATADOR DE NOMES: Troca underlines por parênteses para a UI
const formatInstUI = (rawName) => {
  if (!rawName) return "";
  if (rawName === "ENARE_AOCP_FGV") return "ENARE (AOCP/FGV)";
  if (rawName === "ENAMED_INEP") return "ENAMED (INEP)";
  if (rawName === "REVALIDA_INEP") return "REVALIDA (INEP)";
  return rawName.replace(/_/g, " ");
};

// ============================================================================
// 🔒 MOTOR W-IPR OBFUSCADO (A FÓRMULA RAIZ NORMALIZADA)
// ============================================================================
async function engineObterRanking(p, d) {
  if (!p || !p.institutions || p.institutions.length === 0) return [];
  const q = await getDocs(collection(d, "estatisticas_temas"));
  const r = q.docs.map((x) => ({ id: x.id, ...x.data() }));

  const W_T = p.institutions.reduce((s, i) => s + i.weight, 0);
  const V = { c: 1.0, e: 0.75, d: 0.4 };

  // 1. NORMALIZAÇÃO INTRA-BANCA
  // Encontra o "Teto de Volume" isolado de cada instituição.
  // Isso impede que um banco de dados de 5000 questões atropele um banco de 500.
  const maxN_Por_Banca = {};
  p.institutions.forEach((inst) => {
    const k = inst.raw || inst.name;
    let maxN = 1; // Evita divisão por zero
    r.forEach((t) => {
      const f = t.frequencias ? t.frequencias[k] || { n: 0 } : { n: 0 };
      if (f.n > maxN) maxN = f.n;
    });
    maxN_Por_Banca[k] = maxN;
  });

  // 2. A MATEMÁTICA ORIGINAL W-IPR
  return r
    .map((t) => {
      let Wf_sum = 0;
      let Wcov_sum = 0;

      p.institutions.forEach((i) => {
        const k = i.raw || i.name;
        const f = t.frequencias ? t.frequencias[k] || { n: 0 } : { n: 0 };

        // Converte o volume bruto num valor justo entre 0.0 e 1.0
        const volumeNormalizado = f.n / maxN_Por_Banca[k];

        Wf_sum += volumeNormalizado * i.weight;
        Wcov_sum += (f.n > 0 ? 1 : 0) * i.weight; // Cobertura estritamente binária
      });

      // Tranca matematicamente Wf_norm e Wcov_norm entre 0.0 e 1.0
      const Wf_norm = Wf_sum / W_T;
      const Wcov_norm = Wcov_sum / W_T;

      const vd = V[t.tendencia] || 0.75;
      const sm = t.simplicidade || 0.7;

      // FÓRMULA RAIZ: 40% Volume + 30% Cobertura + 20% Tendência + 10% Simplicidade
      const wiprRaw = (Wf_norm * 0.4 + Wcov_norm * 0.3 + vd * 0.2 + sm * 0.1) * 100;

      return {
        id: t.id,
        nome: t.nome,
        especialidade: t.especialidade,
        wipr: Math.round(wiprRaw),
      };
    })
    .sort((a, b) => b.wipr - a.wipr);
}

// ── Seletor Dinâmico (Auto-Complete) ────────────────────────────────
function InstitutionSelector({ institutions, setInstitutions }) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [instWeight, setInstWeight] = useState(5);
  const [uniqueInstsRaw, setUniqueInstsRaw] = useState([]);
  const [selectedRaw, setSelectedRaw] = useState(null);

  useEffect(() => {
    async function loadInsts() {
      const querySnapshot = await getDocs(collection(db, "estatisticas_temas"));
      const instSet = new Set();
      querySnapshot.forEach((doc) => {
        const f = doc.data().frequencias;
        if (f) Object.keys(f).forEach((i) => instSet.add(i));
      });
      setUniqueInstsRaw(Array.from(instSet).sort());
    }
    loadInsts();
  }, []);

  // Filtra as instituições usando a versão formatada
  const filteredInsts = uniqueInstsRaw.filter((raw) => formatInstUI(raw).toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (rawKey) => {
    setSearch(formatInstUI(rawKey));
    setSelectedRaw(rawKey);
    setShowDropdown(false);
  };

  const handleAddInst = () => {
    // Procura o match exato caso o utilizador digite em vez de clicar
    const rawToAdd = selectedRaw || uniqueInstsRaw.find((r) => formatInstUI(r).toLowerCase() === search.toLowerCase());

    if (!rawToAdd) return alert("Por favor, selecione uma instituição válida da lista.");
    if (institutions.some((i) => (i.raw || i.name) === rawToAdd)) return alert("Esta instituição já foi adicionada.");

    setInstitutions([
      ...institutions,
      {
        name: formatInstUI(rawToAdd), // Para display antigo
        raw: rawToAdd, // A chave real do Firebase
        weight: Number(instWeight),
      },
    ]);

    setSearch("");
    setSelectedRaw(null);
    setInstWeight(5);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <input
            placeholder="Digite para procurar a instituição..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
              setSelectedRaw(null);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            style={{ ...S.input, width: "100%", boxSizing: "border-box" }}
          />
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: 4,
                background: "#fff",
                border: `1px solid ${T.borderCard}`,
                borderRadius: 6,
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 50,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {filteredInsts.length > 0 ? (
                filteredInsts.map((raw) => (
                  <div
                    key={raw}
                    onMouseDown={() => handleSelect(raw)}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      borderBottom: `1px solid ${T.borderCard}`,
                      fontSize: 13,
                      color: T.textPrimary,
                    }}
                  >
                    {formatInstUI(raw)}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "10px 14px",
                    fontSize: 13,
                    color: T.textDisabled,
                  }}
                >
                  Nenhuma instituição encontrada.
                </div>
              )}
            </div>
          )}
        </div>

        <select value={instWeight} onChange={(e) => setInstWeight(e.target.value)} style={{ ...S.input, width: 140 }}>
          <option value={5}>Peso 5 - Foco Total</option>
          <option value={4}>Peso 4 - Desejada</option>
          <option value={3}>Peso 3 - Moderada</option>
          <option value={2}>Peso 2 - Secundária</option>
          <option value={1}>Peso 1 - Backup</option>
        </select>
        <button
          onClick={handleAddInst}
          style={{
            padding: "0 20px",
            height: 41,
            background: "#0F172A",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Adicionar
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {institutions.map((inst, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{formatInstUI(inst.raw || inst.name)}</span>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: T.textMuted }}>Peso {inst.weight}</span>
              <button
                onClick={() => setInstitutions(institutions.filter((_, i) => i !== idx))}
                style={{
                  background: "none",
                  border: "none",
                  color: "#EF4444",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sections (Vistas) ────────────────────────────────────────────────
function OnboardingSection({ user, onComplete }) {
  const [examDate, setExamDate] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    if (!examDate || institutions.length === 0) return alert("Preencha a data e adicione pelo menos uma instituição.");
    setSaving(true);
    const newProfile = { examDate, institutions };
    await setDoc(doc(db, "usuarios", user.uid), { perfil: newProfile, onboardingConcluido: true }, { merge: true });
    onComplete(newProfile);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 20 }}>
      <h2 style={{ marginBottom: 10 }}>Bem-vindo ao RESIDEX</h2>
      <p style={{ color: T.textMuted, marginBottom: 30, lineHeight: 1.6 }}>Configure o seu alvo principal. O algoritmo fará o resto.</p>

      <div style={S.alert("#6366F1")}>
        <div style={S.alertTitle("#6366F1")}>1. Quando é a sua prova principal?</div>
        <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} style={{ ...S.input, maxWidth: 200 }} />
      </div>

      <div style={S.alert("#F97316")}>
        <div style={S.alertTitle("#F97316")}>2. Quais as instituições alvo?</div>
        <InstitutionSelector institutions={institutions} setInstitutions={setInstitutions} />

        <div
          style={{
            marginTop: 20,
            fontSize: 11,
            color: T.textSubtle,
            background: "#fff",
            padding: 12,
            borderRadius: 6,
            border: `1px solid ${T.borderCard}`,
          }}
        >
          <b>Como funcionam os Pesos:</b>
          <br />• <b>Peso 5:</b> Instituição de prioridade máxima. Foco total do estudo.
          <br />• <b>Peso 4:</b> Instituição muito desejada, mas não é a principal.
          <br />• <b>Peso 3:</b> Instituição desejada (plano B ou composição).
          <br />• <b>Peso 2:</b> Instituição secundária (foco complementar).
          <br />• <b>Peso 1:</b> Instituição de backup ou apenas treino.
        </div>
      </div>

      <button
        onClick={handleFinish}
        disabled={saving}
        style={{
          padding: "14px 24px",
          background: "#0F172A",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {saving ? "A processar..." : "Gerar Algoritmo de Estudos"}
      </button>
    </div>
  );
}

function PerfilSection({ color, profile, setProfile, user }) {
  const [examDate, setExamDate] = useState(profile.examDate || "");
  const [institutions, setInstitutions] = useState(profile.institutions || []);
  const [saving, setSaving] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    const newProfile = { examDate, institutions };
    await setDoc(doc(db, "usuarios", user.uid), { perfil: newProfile }, { merge: true });
    setProfile(newProfile);
    setSaving(false);
    alert("Perfil guardado! O cronograma foi recalculado.");
  };

  return (
    <div>
      <div style={S.alert(color)}>
        <div style={S.alertTitle(color)}>Data da Prova</div>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          style={{ ...S.input, maxWidth: 200, marginBottom: 10 }}
        />
      </div>
      <div style={S.alert("#F97316")}>
        <div style={S.alertTitle("#F97316")}>Instituições Alvo & Pesos</div>
        <InstitutionSelector institutions={institutions} setInstitutions={setInstitutions} />
      </div>
      <button
        onClick={saveProfile}
        disabled={saving}
        style={{
          padding: "12px 24px",
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {saving ? "A guardar..." : "Guardar Perfil"}
      </button>
    </div>
  );
}

function FormulaSection({ color, profile }) {
  if (!profile.institutions.length) return null;
  return (
    <div>
      <div style={S.gridTitle}>Alvos Processados</div>
      <div
        style={{
          ...S.gridWrap,
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          marginBottom: 24,
        }}
      >
        {profile.institutions.map((w, idx) => (
          <div key={idx} style={S.gridCard(color)}>
            <div style={S.gridLabel(color)}>{formatInstUI(w.raw || w.name)}</div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 300,
                color: color,
                fontFamily: "'DM Serif Display', serif",
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              {w.weight}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          ...S.alert("#000"),
          background: "#fafaf8",
          border: "1px solid #e2e8f0",
          borderLeft: "3px solid #000",
        }}
      >
        <div style={{ ...S.alertTitle("#000") }}>A Inteligência RESIDEX</div>
        <div
          style={{
            ...S.gridValue,
            fontSize: 12,
            color: T.textMuted,
            lineHeight: 1.8,
          }}
        >
          O sistema avaliou todo o histórico das provas e aplicou o nosso algoritmo exclusivo aos seus alvos específicos.
          <br />
          <br />
          O motor de processamento determina a relevância de cada tema cruzando a incidência na banca escolhida, a prevalência nacional e a
          complexidade técnica da matéria.
          <br />
          <br />O resultado final é o <b>Índice de Prioridade (1-100)</b>: um número fechado que rege a ordem exata do que deve ser estudado
          primeiro.
        </div>
      </div>
    </div>
  );
}

function RankingsSection({ color, dynamicTopics }) {
  const [filter, setFilter] = useState("all");
  const filtered = dynamicTopics.filter((t) => {
    if (filter === "c") return t.wipr >= 80;
    if (filter === "h") return t.wipr >= 60 && t.wipr < 80;
    if (filter === "m") return t.wipr >= 40 && t.wipr < 60;
    if (filter === "l") return t.wipr < 40;
    return true;
  });

  return (
    <div>
      {/* Bloco de Diretrizes */}
      <div
        style={{
          background: "#fafaf8",
          border: `1px solid ${T.borderCard}`,
          borderLeft: `3px solid ${color}`,
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 11, color: T.textMuted, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          <b style={{ color: T.textPrimary, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 10 }}>Diretrizes de Estudo</b>
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
            <div>
              <b style={{ color: "#EF4444" }}>Crítico:</b> Estudo profundo nível R+. Exige domínio de especialista: interações
              medicamentosas, contraindicações específicas e minúcias de cada classe terapêutica.
            </div>
            <div>
              <b style={{ color: "#F97316" }}>Alto:</b> Domínio completo para o generalista. Aprofundamento em toda a matéria, incluindo os
              detalhes de rodapé, mas sem adentrar no nível de exclusividade do especialista.
            </div>
            <div>
              <b style={{ color: "#EAB308" }}>Médio:</b> Foco no essencial bem consolidado. Dominar o texto principal que todo generalista
              deve saber, ignorando detalhes de rodapé e contextos excessivamente específicos.
            </div>
            <div>
              <b style={{ color: "#0EA5E9" }}>Baixo:</b> Estudo de reconhecimento. Focar apenas no básico para identificar e diagnosticar
              padrões principais, sem necessidade de decorar posologias ou minúcias de tratamento.
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {[
          { id: "all", label: "Todos" },
          { id: "c", label: "Crítico 80+" },
          { id: "h", label: "Alta 60–79" },
          { id: "m", label: "Média 40–59" },
          { id: "l", label: "Baixa <40" },
        ].map((f) => (
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

      {/* Lista de Temas */}
      <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled, marginBottom: 12 }}>{filtered.length} TEMAS EXIBIDOS</div>

      {filtered.map((t, i) => {
        const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#6366F1", label: "REV" };
        const sc = SPEC_COLORS[t.especialidade] || color;
        return (
          <div key={t.id + i} style={S.gradeWrap(ti.color)}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <div style={{ ...S.gradeBadge(ti.color), fontSize: 13, padding: "6px 10px" }}>{t.wipr}</div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: T.textDisabled }}>#{dynamicTopics.indexOf(t) + 1}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.4, marginBottom: 3 }}>{t.nome || t.id}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    padding: "2px 7px",
                    borderRadius: 3,
                    background: `${sc}15`,
                    border: `1px solid ${sc}44`,
                    color: sc,
                  }}
                >
                  {t.especialidade || "GERAL"}
                </span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>{t.id}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// ── Mode colors (Adicione logo acima da PlanoSection) ───────────────
function modeStyle(mode) {
  if (mode === "Estudo completo") return { bg: "#FEF2F2", tx: "#991B1B", br: "#FECACA" };
  if (mode === "Visão geral") return { bg: "#F0FDF4", tx: "#14532D", br: "#BBF7D0" };
  if (mode === "Revisão rápida") return { bg: "#F0F9FF", tx: "#0C4A6E", br: "#BAE6FD" };
  return { bg: "#EEF2FF", tx: "#312E81", br: "#C7D2FE" };
}

function PlanoSection({ color, user, dynamicTopics, profile }) {
  const [exp, setExp] = useState(new Set([1, 2]));
  const [doneData, setDoneData] = useState({}); // Agora é um objeto, não um array puro
  const [loading, setLoading] = useState(true);
  const [activeEval, setActiveEval] = useState(null); // ID da tarefa recebendo % acerto
  const [tempScore, setTempScore] = useState("");

  // 1. Calcular Semanas
  const hoje = new Date();
  const prova = profile.examDate ? new Date(profile.examDate) : new Date(hoje.getTime() + 180 * 24 * 60 * 60 * 1000);
  const diffWeeks = Math.max(1, Math.ceil(Math.abs(prova - hoje) / (1000 * 60 * 60 * 24 * 7)));
  const totalWeeks = Math.min(diffWeeks, 52);

  // 2. Injeção Dinâmica
  const enhancedTopics = dynamicTopics.map((t) => {
    let h = 2; let mode = "Revisão rápida";
    if (t.wipr >= 80) { h = 10; mode = "Estudo completo"; } 
    else if (t.wipr >= 60) { h = 7; mode = "Estudo completo"; } 
    else if (t.wipr >= 40) { h = 4; mode = "Visão geral"; }
    return { ...t, h, mode };
  });

  const totalHours = enhancedTopics.reduce((s, t) => s + t.h, 0);
  const avgHoursPerWeek = Math.ceil(totalHours / totalWeeks);

  // 3. NOVO ALGORITMO DE DISTRIBUIÇÃO (Concentra teoria no início, libera simulados no final)
  const WEEKS = [];
  let currentWeek = 1;
  let currentWeekTopics = [];
  let currentWeekHours = 0;
  const halfPoint = Math.ceil(totalWeeks / 2);

  for (let i = 0; i < enhancedTopics.length; i++) {
    const t = enhancedTopics[i];
    // Define o limite de horas de teoria da semana: 100% da média na 1ª metade, cai para 50% na 2ª.
    const weekTheoryLimit = currentWeek <= halfPoint ? avgHoursPerWeek + 2 : Math.max(avgHoursPerWeek * 0.5, 4);

    if (currentWeekHours + t.h > weekTheoryLimit && currentWeekTopics.length > 0 && currentWeek < totalWeeks) {
      // Fecha a semana atual
      // Se estivermos na 2ª metade, injeta um Simulado para equiparar as horas totais de estudo
      if (currentWeek > halfPoint) {
        const simHours = Math.max(0, avgHoursPerWeek - currentWeekHours);
        if (simHours > 0) {
          currentWeekTopics.push({ id: `sim-${currentWeek}`, nome: "Simulado na Íntegra (100+ Questões)", h: simHours, mode: "Treinamento Prático", wipr: 0, especialidade: "GERAL" });
          currentWeekHours += simHours;
        }
      }
      
      const maxWipr = Math.max(...currentWeekTopics.map((x) => x.wipr || 0));
      const weekColor = maxWipr >= 80 ? "#EF4444" : maxWipr >= 60 ? "#F97316" : maxWipr >= 40 ? "#EAB308" : "#0EA5E9";
      const focus = currentWeekTopics.slice(0, 2).map((x) => (x.nome || x.id).split("—")[0].trim()).join(" + ") + "...";

      WEEKS.push({ n: currentWeek, col: weekColor, focus, h: currentWeekHours, topics: currentWeekTopics });
      
      currentWeek++;
      currentWeekTopics = [];
      currentWeekHours = 0;
    }
    currentWeekTopics.push(t);
    currentWeekHours += t.h;
  }
  
  // Adiciona a última semana residual
  if (currentWeekTopics.length > 0) {
    const simHours = currentWeek > halfPoint ? Math.max(0, avgHoursPerWeek - currentWeekHours) : 0;
    if (simHours > 0) {
      currentWeekTopics.push({ id: `sim-${currentWeek}`, nome: "Simulado na Íntegra Final", h: simHours, mode: "Treinamento Prático", wipr: 0, especialidade: "GERAL" });
      currentWeekHours += simHours;
    }
    WEEKS.push({ n: currentWeek, col: "#0EA5E9", focus: "Revisões e Finalização", h: currentWeekHours, topics: currentWeekTopics });
  }

  // 4. Firestore & Migração Retrocompatível
  const docRef = doc(db, "progresso", user.uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const rawData = docSnap.data().temasFeitos || {};
        // Se for o array antigo, converte para o novo formato de dicionário
        if (Array.isArray(rawData)) {
          const converted = rawData.reduce((acc, val) => ({ ...acc, [val]: { score: 100, date: new Date().toISOString() } }), {});
          setDoneData(converted);
        } else {
          setDoneData(rawData);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const tog = (n) => setExp((p) => { const nx = new Set(p); nx.has(n) ? nx.delete(n) : nx.add(n); return nx; });

  // 5. MOTOR DE DESEMPENHO E CÁLCULO DE REPETIÇÃO ESPAÇADA
  const savePerformance = async (key) => {
    const scoreVal = parseInt(tempScore) || 0;
    
    // Algoritmo de espaçamento baseado em percentual (Espaçamento Dinâmico)
    let diasProximaRev = 7; // R1 padrão
    if (scoreVal >= 80) diasProximaRev = 21; // Memória forte
    else if (scoreVal >= 60) diasProximaRev = 14; // Memória média
    
    const nextRevDate = new Date();
    nextRevDate.setDate(nextRevDate.getDate() + diasProximaRev);

    const newData = {
      ...doneData,
      [key]: {
        score: scoreVal,
        doneAt: new Date().toISOString(),
        nextRev: nextRevDate.toISOString()
      }
    };
    
    setDoneData(newData);
    await setDoc(docRef, { temasFeitos: newData }, { merge: true });
    setActiveEval(null);
    setTempScore("");
  };

  const removeDone = async (key) => {
    const newData = { ...doneData };
    delete newData[key];
    setDoneData(newData);
    await setDoc(docRef, { temasFeitos: newData }, { merge: true });
  };

  if (loading) return <div style={{ padding: 20, fontFamily: "monospace", color: T.textSubtle }}>Sincronizando nuvem...</div>;

  const totalTopics = enhancedTopics.length;
  let doneTopicsCount = 0; let doneHoursCount = 0;
  Object.keys(doneData).forEach(k => { doneTopicsCount++; doneHoursCount += 4; }); // Horas estimadas

  return (
    <div>
      {/* Cards de Métricas Omitidos para economizar espaço, manter igual ao original */}

      {/* Renderização das Semanas */}
      {WEEKS.map((w) => {
        const isO = exp.has(w.n);
        const weekKeys = w.topics.map((t) => `${w.n}-${t.id}`);
        const doneCount = weekKeys.filter((k) => doneData[k]).length;
        const allDone = doneCount > 0 && doneCount === w.topics.length;

        return (
          <div key={w.n} style={{ ...S.decisionWrap(allDone ? "#10B981" : w.col), padding: 0, overflow: "hidden", marginBottom: 8 }}>
            <div onClick={() => tog(w.n)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: allDone ? "#F0FDF4" : "#fafaf8", cursor: "pointer" }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : w.col, minWidth: 60, fontWeight: 600 }}>SEMANA {w.n}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: allDone ? T.textMuted : T.textPrimary, textDecoration: allDone ? "line-through" : "none" }}>{w.focus}</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : w.col }}>{w.h}h</span>
            </div>

            {isO && (
              <div style={{ padding: "0 14px 10px" }}>
                {w.topics.map((t, i) => {
                  const key = `${w.n}-${t.id}`;
                  const isDone = !!doneData[key];
                  const ms = modeStyle(t.mode);
                  const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#10B981", label: "PRÁTICA" };
                  
                  // Verificação de Revisão Pendente
                  let precisaRevisar = false;
                  if (isDone && doneData[key].nextRev) {
                     precisaRevisar = new Date(doneData[key].nextRev) <= hoje;
                  }

                  return (
                    <div key={key} style={{ borderBottom: i < w.topics.length - 1 ? `1px solid ${T.borderCard}` : "none", padding: "8px 4px", background: isDone ? "#fafffe" : "transparent" }}>
                      
                      {/* Cabecalho da Tarefa */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ width: 32, height: 20, borderRadius: 4, background: isDone ? ti.color : `${ti.color}15`, color: isDone ? "#fff" : ti.color, fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                          {t.wipr > 0 ? t.wipr : "SIM"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12.5, color: isDone ? T.textDisabled : T.textPrimary, textDecoration: isDone ? "line-through" : "none" }}>{t.nome || t.id}</div>
                          
                          {/* Botões e Status de Repetição Espaçada */}
                          <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
                            {!isDone && activeEval !== key && (
                               <button onClick={() => setActiveEval(key)} style={{ fontSize: 10, padding: "4px 8px", background: T.bgSurface, border: `1px solid ${T.borderCard}`, borderRadius: 4, cursor: "pointer" }}>Marcar Feito</button>
                            )}
                            
                            {isDone && (
                               <>
                                 <span style={{ fontSize: 10, color: "#10B981", fontFamily: "monospace", fontWeight: 600 }}>✓ {doneData[key].score}% Acerto</span>
                                 {precisaRevisar ? (
                                    <span style={{ fontSize: 10, color: "#EF4444", background: "#FEF2F2", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>Revisão Pendente (R)</span>
                                 ) : (
                                    <span style={{ fontSize: 9, color: T.textDisabled }}>R: {new Date(doneData[key].nextRev).toLocaleDateString()}</span>
                                 )}
                                 <button onClick={() => removeDone(key)} style={{ fontSize: 10, background: "none", border: "none", color: T.textSubtle, cursor: "pointer" }}>Desfazer</button>
                               </>
                            )}
                          </div>

                          {/* Input de Desempenho (Só aparece ao clicar em Marcar Feito) */}
                          {activeEval === key && (
                             <div style={{ marginTop: 8, padding: 10, background: "#F8FAFC", borderRadius: 6, border: `1px solid ${T.borderCardHl}` }}>
                               <div style={{ fontSize: 11, marginBottom: 6, fontWeight: 600 }}>Quantas acertou? (%)</div>
                               <div style={{ display: 'flex', gap: 6 }}>
                                  <input type="number" placeholder="Ex: 75" value={tempScore} onChange={(e) => setTempScore(e.target.value)} style={{ width: 80, padding: "4px 8px", borderRadius: 4, border: `1px solid ${T.borderCard}` }} />
                                  <button onClick={() => savePerformance(key)} style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, cursor: "pointer" }}>Salvar</button>
                                  <button onClick={() => setActiveEval(null)} style={{ background: "transparent", border: "none", fontSize: 11, color: T.textMuted, cursor: "pointer" }}>Cancelar</button>
                               </div>
                             </div>
                          )}

                        </div>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: T.textMuted }}>{t.h}h</span>
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

// ── App Core ────────────────────────────────────────────────
const SECTIONS = [
  { id: "plano", name: "Plano Semanal", color: "#10B981" },
  { id: "rankings", name: "Rankings", color: "#0EA5E9" },
  { id: "formula", name: "O Motor", color: "#6366F1" },
  { id: "perfil", name: "Meu Perfil", color: "#F97316" },
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

  if (status === "loading")
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          color: "#fff",
        }}
      >
        Carregando...
      </div>
    );
  if (status === "loggedOut")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          padding: 20,
        }}
      >
        <h1 style={{ color: "#fff", fontSize: 28, marginBottom: 20 }}>RESIDEX</h1>
        <button
          onClick={handleLogin}
          style={{
            padding: "14px 24px",
            color: "#0F172A",
            background: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Entrar com Google
        </button>
      </div>
    );

  return <RESIDEX_APP user={user} onLogout={handleLogout} />;
}

function RESIDEX_APP({ user, onLogout }) {
  const [active, setActive] = useState("plano");
  const [dynamicTopics, setDynamicTopics] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState("loading");

  const sec = SECTIONS.find((s) => s.id === active);

  useEffect(() => {
    async function loadUser() {
      try {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        if (userDoc.exists() && userDoc.data().perfil && userDoc.data().perfil.institutions.length > 0) {
          setProfile(userDoc.data().perfil);
          setAppState("dashboard");
        } else {
          setAppState("onboarding");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [user.uid]);

  useEffect(() => {
    if (appState === "dashboard" && profile) {
      engineObterRanking(profile, db).then((calculated) => setDynamicTopics(calculated));
    }
  }, [appState, profile]);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Sincronizando...
      </div>
    );

  if (appState === "onboarding") {
    return (
      <div style={S.page}>
        <div style={S.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={S.headerTitle}>RESIDEX Setup</h1>
            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                color: T.textMuted,
              }}
            >
              Sair
            </button>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <OnboardingSection
            user={user}
            onComplete={(p) => {
              setProfile(p);
              setAppState("dashboard");
            }}
          />
        </div>
      </div>
    );
  }

  function renderContent() {
    if (active === "perfil") return <PerfilSection color={sec.color} profile={profile} setProfile={setProfile} user={user} />;
    if (active === "formula") return <FormulaSection color={sec.color} profile={profile} />;
    if (active === "rankings") return <RankingsSection color={sec.color} dynamicTopics={dynamicTopics} />;
    if (active === "plano") return <PlanoSection color={sec.color} user={user} dynamicTopics={dynamicTopics} profile={profile} />;
  }

  return (
    <div style={S.page}>
      <style>{mobileCSS}</style>
      <div style={S.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={S.headerEyebrow}>RESIDEX</div>
            <h1 style={S.headerTitle}>Painel de Estudos</h1>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              border: `1px solid ${T.borderSection}`,
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
              color: T.textMuted,
            }}
          >
            Sair
          </button>
        </div>
      </div>
      <div className="mp-nav-mobile">
        {SECTIONS.map((s) => (
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
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }} className="mp-body">
        <div style={S.nav} className="mp-nav-sidebar">
          {SECTIONS.map((s) => (
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
