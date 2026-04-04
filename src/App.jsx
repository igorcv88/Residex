import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";


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
    background: "#ffffff", // Garante o fundo branco
    color: "#000000",      // Garante o texto preto para contraste
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
// ── LÓGICA ATUALIZADA: PlanoSection ──────────────────────────────────
function modeStyle(mode) {
  if (mode === "Estudo completo") return { bg: "#FEF2F2", tx: "#991B1B", br: "#FECACA" };
  if (mode === "Visão geral") return { bg: "#FFFBEB", tx: "#92400E", br: "#FDE68A" };
  if (mode === "Revisão rápida") return { bg: "#F0F9FF", tx: "#0C4A6E", br: "#BAE6FD" };
  if (mode === "Treinamento Prático") return { bg: "#F5F3FF", tx: "#6D28D9", br: "#DDD6FE" };
  return { bg: "#EEF2FF", tx: "#312E81", br: "#C7D2FE" }; // Revisão Ativa
}

function PlanoSection({ color, user, dynamicTopics, profile }) {
  const [exp, setExp] = useState(new Set([1, 2]));
  const [doneData, setDoneData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeEval, setActiveEval] = useState(null); 
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

  const totalTheoryHours = enhancedTopics.reduce((s, t) => s + t.h, 0);
  const avgHoursPerWeek = Math.max(Math.ceil(totalTheoryHours / totalWeeks), 15); // Mínimo base

  // 3. NOVO ALGORITMO DE DISTRIBUIÇÃO (Concentra teoria no início, balanceia o fim)
  const WEEKS = [];
  let currentWeek = 1;
  let currentWeekTopics = [];
  let currentWeekHours = 0;
  const halfPoint = Math.ceil(totalWeeks / 2);

  for (let i = 0; i < enhancedTopics.length; i++) {
    const t = enhancedTopics[i];
    
    // Na 1ª metade, o limite é a média + um chorinho. Na 2ª metade, a teoria cai pela metade.
    const weekTheoryLimit = currentWeek <= halfPoint ? avgHoursPerWeek * 1.2 : avgHoursPerWeek * 0.5;

    // Se bater o limite de horas de teoria daquela semana e não for a última:
    if (currentWeekHours + t.h > weekTheoryLimit && currentWeek < totalWeeks) {
      
      // Injeta simulado na 2ª metade para compensar a queda de teoria (Bug das 150h corrigido)
      if (currentWeek > halfPoint) {
        const simHours = Math.round(Math.max(0, avgHoursPerWeek - currentWeekHours));
        if (simHours >= 2 && simHours <= 15) { // Evita anomalias
          currentWeekTopics.push({ id: `sim-${currentWeek}`, nome: "Simulado na Íntegra", h: simHours, mode: "Treinamento Prático", wipr: 0, especialidade: "GERAL" });
          currentWeekHours += simHours;
        }
      }
      
      const maxWipr = Math.max(...currentWeekTopics.map((x) => x.wipr || 0));
      const weekColor = maxWipr >= 80 ? "#EF4444" : maxWipr >= 60 ? "#F97316" : maxWipr >= 40 ? "#EAB308" : "#0EA5E9";
      const focus = currentWeekTopics.slice(0, 2).map((x) => (x.nome || x.id).split("—")[0].trim()).join(" + ") + (currentWeekTopics.length > 2 ? "..." : "");

      WEEKS.push({ n: currentWeek, col: weekColor, focus, h: currentWeekHours, topics: currentWeekTopics });
      
      currentWeek++;
      currentWeekTopics = [];
      currentWeekHours = 0;
    }
    
    currentWeekTopics.push(t);
    currentWeekHours += t.h;
  }
  
  // Trata os resíduos da última semana com limite máximo de horas
  if (currentWeekTopics.length > 0) {
      const finalSimHours = currentWeek > halfPoint ? Math.round(Math.max(0, avgHoursPerWeek - currentWeekHours)) : 0;
      if (finalSimHours >= 2 && finalSimHours <= 15) {
        currentWeekTopics.push({ id: `sim-${currentWeek}`, nome: "Simulado na Íntegra", h: finalSimHours, mode: "Treinamento Prático", wipr: 0, especialidade: "GERAL" });
        currentWeekHours += finalSimHours;
      }
      WEEKS.push({ n: currentWeek, col: "#0EA5E9", focus: "Revisões e Finalização", h: currentWeekHours, topics: currentWeekTopics });
  }

  // 4. INJEÇÃO DE REPETIÇÃO ESPAÇADA NAS SEMANAS
  Object.keys(doneData).forEach(key => {
      // Formato da key: "semanaId-topicoId"
      const parts = key.split('-');
      if (parts.length >= 2) {
          const origWeek = parseInt(parts[0]);
          const topicId = parts.slice(1).join('-');
          const data = doneData[key];

          if (data.score !== undefined && !topicId.startsWith('sim')) {
              // Regra de Espaçamento Baseada em Evidências
              let delayWeeks = 1; // < 60% (Revisão Urgente R1)
              if (data.score >= 80) delayWeeks = 3; // > 80% (Revisão Longa R3)
              else if (data.score >= 60) delayWeeks = 2; // Médio (Revisão Média R2)

              const targetWeek = origWeek + delayWeeks;

              // Encontra a semana alvo e injeta o card de revisão
              const targetW = WEEKS.find(w => w.n === targetWeek);
              if (targetW) {
                  const origTopic = enhancedTopics.find(t => t.id === topicId);
                  if (origTopic) {
                      // Verifica se já não adicionamos esta revisão
                      const revId = `rev-${targetWeek}-${topicId}`;
                      if (!targetW.topics.some(t => t.id === revId)) {
                          targetW.topics.unshift({ // Coloca no topo da semana
                              id: revId,
                              parentId: key, // Salva quem é o pai para podermos checar
                              nome: `[R${delayWeeks}] Revisão de ${origTopic.nome || origTopic.id}`,
                              h: 1, // Revisão leva menos tempo
                              mode: "Revisão Ativa",
                              wipr: origTopic.wipr,
                              especialidade: origTopic.especialidade,
                              isReview: true
                          });
                          targetW.h += 1;
                      }
                  }
              }
          }
      }
  });

  // 5. Firestore
  const docRef = doc(db, "progresso", user.uid);
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const rawData = docSnap.data().temasFeitos || {};
        if (Array.isArray(rawData)) {
          const converted = rawData.reduce((acc, val) => ({ ...acc, [val]: { score: 100, doneAt: new Date().toISOString() } }), {});
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

  const savePerformance = async (key) => {
    const scoreVal = parseInt(tempScore) || 0;
    const newData = { ...doneData, [key]: { score: scoreVal, doneAt: new Date().toISOString() } };
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

  // 6. CÁLCULOS RESTAURADOS DE PROGRESSO GERAL
  let totalTopics = 0;
  let computedTotalHours = 0;
  WEEKS.forEach(w => {
      totalTopics += w.topics.length;
      computedTotalHours += w.h;
  });

  let doneTopicsCount = 0; 
  let doneHoursCount = 0;
  WEEKS.forEach(w => {
      w.topics.forEach(t => {
          const key = t.isReview ? t.id : `${w.n}-${t.id}`;
          if (doneData[key]) {
              doneTopicsCount++;
              doneHoursCount += t.h;
          }
      });
  });

  const pctTopics = totalTopics > 0 ? ((doneTopicsCount / totalTopics) * 100).toFixed(1) : "0.0";
  const pctHours = computedTotalHours > 0 ? ((doneHoursCount / computedTotalHours) * 100).toFixed(1) : "0.0";
  const maxH = Math.max(...WEEKS.map((w) => w.h), 1);

  return (
    <div>
      {/* HEADER RESTAURADO: Cards de Informação */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginBottom: 18 }}>
        {[
          { l: "Semanas", v: totalWeeks, c: color },
          { l: "Total horas", v: `~${computedTotalHours}h`, c: color },
          { l: "Média/sem", v: `~${Math.round(computedTotalHours/totalWeeks)}h`, c: color },
          { l: "Temas + Revs", v: totalTopics, c: color },
        ].map((s) => (
          <div key={s.l} style={S.gridCard(s.c)}>
            <div style={S.gridLabel(s.c)}>{s.l}</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: s.c, fontFamily: "monospace" }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* HEADER RESTAURADO: Barras de Progresso */}
      <div style={{ marginBottom: 18, padding: "14px 16px", background: "#fafaf8", border: `1px solid ${T.borderCard}`, borderRadius: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: T.textMuted, letterSpacing: "0.06em" }}>PROGRESSO GERAL</span>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: color }}>{doneTopicsCount}/{totalTopics} tarefas · {doneHoursCount}h/{computedTotalHours}h</span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>Tarefas concluídas</span>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: color, fontWeight: 600 }}>{pctTopics}%</span>
          </div>
          <div style={{ height: 6, background: T.borderCard, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${pctTopics}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: T.textDisabled }}>Horas de estudo</span>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: color, fontWeight: 600 }}>{pctHours}%</span>
          </div>
          <div style={{ height: 6, background: T.borderCard, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${pctHours}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      {/* BOTÕES RESTAURADOS */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <button onClick={() => setExp(new Set(WEEKS.map((w) => w.n)))} style={{ background: "transparent", border: `1px solid ${T.borderCard}`, color: T.textMuted, padding: "5px 11px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>Expandir tudo</button>
        <button onClick={() => setExp(new Set())} style={{ background: "transparent", border: `1px solid ${T.borderCard}`, color: T.textMuted, padding: "5px 11px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>Recolher tudo</button>
      </div>

      {/* Renderização das Semanas */}
      {WEEKS.map((w) => {
        const isO = exp.has(w.n);
        // Calcula se a semana está toda feita baseada nos itens (normais e injeções)
        const weekKeys = w.topics.map((t) => t.isReview ? t.id : `${w.n}-${t.id}`);
        const doneCount = weekKeys.filter((k) => doneData[k]).length;
        const allDone = doneCount > 0 && doneCount === w.topics.length;

        return (
          <div key={w.n} style={{ ...S.decisionWrap(allDone ? "#10B981" : w.col), padding: 0, overflow: "hidden", marginBottom: 8 }}>
            <div onClick={() => tog(w.n)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: allDone ? "#F0FDF4" : "#fafaf8", cursor: "pointer" }}>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : w.col, minWidth: 60, fontWeight: 600 }}>SEMANA {w.n}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: allDone ? T.textMuted : T.textPrimary, textDecoration: allDone ? "line-through" : "none" }}>{w.focus}</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: allDone ? "#14532D" : T.textDisabled }}>{doneCount}/{w.topics.length}</span>
              
              <div style={{ width: 56, height: 4, background: T.borderCard, borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                <div style={{ width: `${Math.round((w.h / maxH) * 100)}%`, height: "100%", background: allDone ? "#10B981" : w.col, borderRadius: 2, transition: "background 0.3s" }} />
              </div>

              <span style={{ fontSize: 11, fontFamily: "monospace", color: allDone ? "#14532D" : w.col, minWidth: 26, textAlign: "right" }}>{w.h}h</span>
            </div>

            {isO && (
              <div style={{ padding: "0 14px 10px" }}>
                {w.topics.map((t, i) => {
                  const key = t.isReview ? t.id : `${w.n}-${t.id}`;
                  const isDone = !!doneData[key];
                  const ms = modeStyle(t.mode);
                  
                  // Define cor do badge
                  let badgeColor = "#6366F1";
                  let badgeText = "REV";
                  if (!t.isReview) {
                     const ti = t.wipr > 0 ? tier(t.wipr) : { color: "#8B5CF6", label: "SIM" };
                     badgeColor = ti.color;
                     badgeText = t.wipr > 0 ? t.wipr : "SIM";
                  }

                  return (
                    <div key={key} style={{ borderBottom: i < w.topics.length - 1 ? `1px solid ${T.borderCard}` : "none", padding: "8px 4px", background: isDone ? "#fafffe" : "transparent" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        
                        <div style={{ width: 32, height: 20, borderRadius: 4, background: isDone ? badgeColor : `${badgeColor}15`, color: isDone ? "#fff" : badgeColor, fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                          {badgeText}
                        </div>
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12.5, color: isDone ? T.textDisabled : T.textPrimary, textDecoration: isDone ? "line-through" : "none" }}>{t.nome || t.id}</div>
                          
                          {/* Botões de Ação */}
                          <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
                            {!isDone && activeEval !== key && (
                               <button onClick={() => {
                                  if (t.isReview) {
                                      // Se for revisão, não pede nota, só conclui
                                      const newData = { ...doneData, [key]: { score: 100, doneAt: new Date().toISOString() } };
                                      setDoneData(newData);
                                      setDoc(docRef, { temasFeitos: newData }, { merge: true });
                                  } else {
                                      setActiveEval(key);
                                  }
                               }} style={{ fontSize: 10, padding: "4px 8px", background: T.bgSurface, border: `1px solid ${T.borderCard}`, borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>{t.isReview ? "Concluir Revisão" : "Marcar Feito"}</button>
                            )}
                            
                            {isDone && (
                               <>
                                 <span style={{ fontSize: 10, color: "#10B981", fontFamily: "monospace", fontWeight: 600 }}>✓ {t.isReview ? "Revisado" : `${doneData[key].score}% Acerto`}</span>
                                 <button onClick={() => removeDone(key)} style={{ fontSize: 10, background: "none", border: "none", color: T.textSubtle, cursor: "pointer" }}>Desfazer</button>
                               </>
                            )}
                          </div>

                          {/* Formulário de % (Só aparece para teoria e se clicado) */}
                          {activeEval === key && !t.isReview && (
                             <div style={{ marginTop: 8, padding: 10, background: "#F8FAFC", borderRadius: 6, border: `1px solid ${T.borderCardHl}` }}>
                               <div style={{ fontSize: 11, marginBottom: 6, fontWeight: 600, color: "#000" }}>De 0 a 100, como foi seu rendimento?</div>
                               <div style={{ display: 'flex', gap: 6 }}>
                                  <input 
                                    type="number" 
                                    placeholder="0-100" 
                                    value={tempScore} 
                                    onChange={(e) => setTempScore(e.target.value)} 
                                    style={{ ...S.input, width: 80, height: 35 }} 
                                  />
                                  <button 
                                    onClick={() => savePerformance(key)} 
                                    style={{ 
                                      background: "#ffffff", 
                                      color: "#000000", 
                                      border: `1px solid ${T.borderCard}`, 
                                      borderRadius: 4, 
                                      padding: "0 15px", 
                                      fontSize: 11, 
                                      cursor: "pointer",
                                      fontWeight: "bold"
                                    }}
                                  >
                                    Salvar
                                  </button>
                                  <button onClick={() => setActiveEval(null)} style={{ background: "transparent", border: "none", fontSize: 11, color: T.textMuted, cursor: "pointer" }}>Cancelar</button>
                               </div>
                               <div style={{ fontSize: 9, color: T.textSubtle, marginTop: 6 }}>Isso calculará a semana da sua próxima revisão.</div>
                             </div>
                          )}
                        </div>

                        {/* Badges Finais: Modo e Horas */}
                        <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3, background: isDone ? "#F0FDF4" : ms.bg, border: `1px solid ${isDone ? "#BBF7D0" : ms.br}`, color: isDone ? "#14532D" : ms.tx, fontFamily: "monospace", fontWeight: 600, flexShrink: 0 }}>
                          {isDone ? "✓" : t.mode}
                        </span>
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
  
  // Estados para o login com email/senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  const handleGoogleLogin = () => signInWithPopup(auth, provider);
  
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError("Preencha e-mail e senha.");
      return;
    }
    setAuthError("");
    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O onAuthStateChanged lidará com a mudança de estado
    } catch (error) {
      console.error(error);
      setAuthError("Credenciais inválidas ou erro no login.");
    } finally {
      setIsAuthenticating(false);
    }
  };

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
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        A carregar sistema...
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
          background: "#0F172A", // Mantém o fundo escuro do padrão mobile/nav
          padding: 20,
          fontFamily: "'DM Sans', sans-serif"
        }}
      >
        <div 
          style={{
            background: "#ffffff",
            width: "100%",
            maxWidth: 380,
            padding: "40px 32px",
            borderRadius: 16,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Ícone atualizado */}
          <img 
            src="196501.png" 
            alt="Doctor Icon" 
            style={{ width: 84, height: 84, marginBottom: 16 }} 
          />
          
          <h1 style={{ 
            color: "#0F172A", 
            fontSize: 26, 
            marginBottom: 4, 
            fontFamily: "monospace", // Usa JetBrains Mono
            fontWeight: 600,
            letterSpacing: "0.05em"
          }}>
            RESIDEX
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28, textAlign: "center" }}>
            Motor algorítmico de aprovação médica
          </p>

          {/* Mensagem de Erro */}
          {authError && (
            <div style={{ ...S.alert("#EF4444"), width: "100%", padding: "10px 14px", marginBottom: 16 }}>
              <div style={{ color: "#991B1B", fontSize: 12, fontWeight: 500 }}>{authError}</div>
            </div>
          )}

          {/* Formulário Email/Senha */}
          <form onSubmit={handleEmailLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...S.input, background: "#f8fafc", border: "1px solid #e2e8f0" }} 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...S.input, background: "#f8fafc", border: "1px solid #e2e8f0" }} 
            />
            
            <button
              type="submit"
              disabled={isAuthenticating}
              style={{
                padding: "12px",
                marginTop: 4,
                color: "#ffffff",
                background: "#0F172A", // Botão principal escuro para contraste
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: "bold",
                cursor: isAuthenticating ? "not-allowed" : "pointer",
                opacity: isAuthenticating ? 0.7 : 1,
                transition: "background 0.2s"
              }}
            >
              {isAuthenticating ? "A entrar..." : "Entrar"}
            </button>
          </form>

          {/* Divisor */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ padding: "0 12px", fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>OU</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Botão Google com Ícone SVG */}
          <button
            onClick={handleGoogleLogin}
            disabled={isAuthenticating}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              padding: "12px",
              color: "#334155",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: isAuthenticating ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>
        </div>
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
