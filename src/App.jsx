import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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
      const wiprRaw =
        (Wf_norm * 0.4 + Wcov_norm * 0.3 + vd * 0.2 + sm * 0.1) * 100;

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
  const filteredInsts = uniqueInstsRaw.filter((raw) =>
    formatInstUI(raw).toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (rawKey) => {
    setSearch(formatInstUI(rawKey));
    setSelectedRaw(rawKey);
    setShowDropdown(false);
  };

  const handleAddInst = () => {
    // Procura o match exato caso o utilizador digite em vez de clicar
    const rawToAdd =
      selectedRaw ||
      uniqueInstsRaw.find(
        (r) => formatInstUI(r).toLowerCase() === search.toLowerCase(),
      );

    if (!rawToAdd)
      return alert("Por favor, selecione uma instituição válida da lista.");
    if (institutions.some((i) => (i.raw || i.name) === rawToAdd))
      return alert("Esta instituição já foi adicionada.");

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

        <select
          value={instWeight}
          onChange={(e) => setInstWeight(e.target.value)}
          style={{ ...S.input, width: 140 }}
        >
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
            <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
              {formatInstUI(inst.raw || inst.name)}
            </span>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: T.textMuted }}>
                Peso {inst.weight}
              </span>
              <button
                onClick={() =>
                  setInstitutions(institutions.filter((_, i) => i !== idx))
                }
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
    if (!examDate || institutions.length === 0)
      return alert("Preencha a data e adicione pelo menos uma instituição.");
    setSaving(true);
    const newProfile = { examDate, institutions };
    await setDoc(
      doc(db, "usuarios", user.uid),
      { perfil: newProfile, onboardingConcluido: true },
      { merge: true },
    );
    onComplete(newProfile);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 20 }}>
      <h2 style={{ marginBottom: 10 }}>Bem-vindo ao RESIDEX</h2>
      <p style={{ color: T.textMuted, marginBottom: 30, lineHeight: 1.6 }}>
        Configure o seu alvo principal. O algoritmo fará o resto.
      </p>

      <div style={S.alert("#6366F1")}>
        <div style={S.alertTitle("#6366F1")}>
          1. Quando é a sua prova principal?
        </div>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          style={{ ...S.input, maxWidth: 200 }}
        />
      </div>

      <div style={S.alert("#F97316")}>
        <div style={S.alertTitle("#F97316")}>
          2. Quais as instituições alvo?
        </div>
        <InstitutionSelector
          institutions={institutions}
          setInstitutions={setInstitutions}
        />

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
          <br />• <b>Peso 5:</b> Instituição de prioridade máxima. Foco total do
          estudo.
          <br />• <b>Peso 4:</b> Instituição muito desejada, mas não é a
          principal.
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
    await setDoc(
      doc(db, "usuarios", user.uid),
      { perfil: newProfile },
      { merge: true },
    );
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
        <InstitutionSelector
          institutions={institutions}
          setInstitutions={setInstitutions}
        />
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
            <div style={S.gridLabel(color)}>
              {formatInstUI(w.raw || w.name)}
            </div>
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
          O sistema avaliou todo o histórico das provas e aplicou o nosso
          algoritmo exclusivo aos seus alvos específicos.
          <br />
          <br />
          O motor de processamento determina a relevância de cada tema cruzando
          a incidência na banca escolhida, a prevalência nacional e a
          complexidade técnica da matéria.
          <br />
          <br />O resultado final é o <b>Índice de Prioridade (1-100)</b>: um
          número fechado que rege a ordem exata do que deve ser estudado
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
        <div
          style={{
            fontSize: 11,
            color: T.textMuted,
            lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <b
            style={{
              color: T.textPrimary,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: 10,
            }}
          >
            Diretrizes de Estudo
          </b>
        </div>
        <div
          style={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <b style={{ color: "#EF4444" }}>Crítico:</b>
          Estudo profundo nível R+. Exige domínio de especialista: interações
          medicamentosas, contraindicações específicas e minúcias de cada classe
          terapêutica.
        </div>
        <div>
          <b style={{ color: "#F97316" }}>Alto:</b>
          Domínio completo para o generalista. Aprofundamento em toda a matéria,
          incluindo os detalhes de rodapé, mas sem adentrar no nível de
          exclusividade do especialista.
        </div>
        <div>
          <b style={{ color: "#EAB308" }}>Médio:</b>
          Foco no essencial bem consolidado. Dominar o texto principal que todo
          generalista deve saber, ignorando detalhes de rodapé e contextos
          excessivamente específicos.
        </div>
        <div>
          <b style={{ color: "#0EA5E9" }}>Baixo:</b> Estudo de reconhecimento.
          Focar apenas no básico para identificar e diagnosticar padrões
          principais, sem necessidade de decorar posologias ou minúcias de
          tratamento.
        </div>
      </div>
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}
      >
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
      <div
        style={{
          fontSize: 10,
          fontFamily: "monospace",
          color: T.textDisabled,
          marginBottom: 12,
        }}
      >
        {filtered.length}
        TEMAS EXIBIDOS
        {filtered.map((t, i) => {
          const ti =
            t.wipr > 0 ? tier(t.wipr) : { color: "#6366F1", label: "REV" };
          const sc = SPEC_COLORS[t.especialidade] || color;
          return (
            <div key={t.id + i} style={S.gradeWrap(ti.color)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    ...S.gradeBadge(ti.color),
                    fontSize: 13,
                    padding: "6px 10px",
                  }}
                >
                  {t.wipr}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: T.textDisabled,
                  }}
                >
                  #{dynamicTopics.indexOf(t) + 1}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: T.textPrimary,
                    lineHeight: 1.4,
                    marginBottom: 3,
                  }}
                >
                  {t.nome || t.id}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
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
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: T.textDisabled,
                    }}
                  >
                    {t.id}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ── Mode colors (Adicione logo acima da PlanoSection) ───────────────
function modeStyle(mode) {
  if (mode === "Estudo completo")
    return { bg: "#FEF2F2", tx: "#991B1B", br: "#FECACA" };
  if (mode === "Visão geral")
    return { bg: "#F0FDF4", tx: "#14532D", br: "#BBF7D0" };
  if (mode === "Revisão rápida")
    return { bg: "#F0F9FF", tx: "#0C4A6E", br: "#BAE6FD" };
  return { bg: "#EEF2FF", tx: "#312E81", br: "#C7D2FE" }; // Revisão
}

// ── Nova PlanoSection (Dinâmica & Visualmente Completa) ─────────────
function PlanoSection({ color, user, dynamicTopics, profile }) {
  const [exp, setExp] = useState(new Set([1, 2]));
  const [done, setDone] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // 1. Calcular Deadline e Semanas
  const hoje = new Date();
  const prova = profile.examDate
    ? new Date(profile.examDate)
    : new Date(hoje.getTime() + 180 * 24 * 60 * 60 * 1000);
  const diffTime = Math.abs(prova - hoje);
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  const totalWeeks = Math.max(1, Math.min(diffWeeks, 52));

  // 2. Injeção Dinâmica de Horas e Modos de Estudo baseados no W-IPR
  const enhancedTopics = dynamicTopics.map((t) => {
    let h = 2;
    let mode = "Revisão rápida";

    if (t.wipr >= 80) {
      h = 10;
      mode = "Estudo completo";
    } else if (t.wipr >= 60) {
      h = 7;
      mode = "Estudo completo";
    } else if (t.wipr >= 40) {
      h = 4;
      mode = "Visão geral";
    }

    return { ...t, h, mode };
  });

  // 3. Distribuição Pelas Semanas e Geração de Títulos/Cores
  const temasPorSemana = Math.ceil(enhancedTopics.length / totalWeeks);
  const WEEKS = Array.from({ length: totalWeeks }, (_, i) => {
    const weekTopics = enhancedTopics.slice(
      i * temasPorSemana,
      (i + 1) * temasPorSemana,
    );

    if (weekTopics.length === 0) return null;

    // Cor dinâmica da semana (Alterado o nível médio para o amarelo #EAB308)
    const maxWipr = Math.max(...weekTopics.map((t) => t.wipr));
    const weekColor =
      maxWipr >= 80
        ? "#EF4444"
        : maxWipr >= 60
          ? "#F97316"
          : maxWipr >= 40
            ? "#EAB308"
            : "#0EA5E9";

    // Título dinâmico
    const focusTitles = weekTopics.slice(0, 2).map((t) => {
      const parts = (t.nome || t.id).split("—");
      return parts.length > 1 ? parts[1].trim() : parts[0].trim();
    });
    const focus =
      focusTitles.join(" + ") + (weekTopics.length > 2 ? "..." : "");

    // Total de horas da semana
    const weekH = weekTopics.reduce((s, t) => s + t.h, 0);

    return { n: i + 1, col: weekColor, focus, h: weekH, topics: weekTopics };
  }).filter(Boolean);

  const docRef = doc(db, "progresso", user.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) setDone(new Set(docSnap.data().temasFeitos || []));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const tog = (n) =>
    setExp((p) => {
      const nx = new Set(p);
      nx.has(n) ? nx.delete(n) : nx.add(n);
      return nx;
    });
  const togDone = async (key) => {
    const nx = new Set(done);
    nx.has(key) ? nx.delete(key) : nx.add(key);
    setDone(nx);
    await setDoc(docRef, { temasFeitos: Array.from(nx) }, { merge: true });
  };

  if (loading)
    return (
      <div
        style={{ padding: 20, fontFamily: "monospace", color: T.textSubtle }}
      >
        Sincronizando nuvem...
      </div>
    );

  // 4. Cálculos Matemáticos de Progresso Geral
  const totalTopics = enhancedTopics.length;
  const totalHours = enhancedTopics.reduce((s, t) => s + t.h, 0);

  let doneTopicsCount = 0;
  let doneHoursCount = 0;
  WEEKS.forEach((w) =>
    w.topics.forEach((t) => {
      if (done.has(`${w.n}-${t.id}`)) {
        doneTopicsCount++;
        doneHoursCount += t.h;
      }
    }),
  );

  const pctTopics =
    totalTopics > 0
      ? ((doneTopicsCount / totalTopics) * 100).toFixed(1)
      : "0.0";
  const pctHours =
    totalHours > 0 ? ((doneHoursCount / totalHours) * 100).toFixed(1) : "0.0";
  const avgHoursPerWeek =
    totalWeeks > 0 ? Math.round(totalHours / totalWeeks) : 0;
  const maxH = Math.max(...WEEKS.map((w) => w.h), 1);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 8,
          marginBottom: 18,
        }}
      >
        {[
          { l: "Semanas", v: totalWeeks, c: color },
          { l: "Total horas", v: `~${totalHours}h`, c: color },
          { l: "Média/sem", v: `~${avgHoursPerWeek}h`, c: color },
          { l: "Temas", v: totalTopics, c: color },
        ].map((s) => (
          <div key={s.l} style={S.gridCard(s.c)}>
            <div style={S.gridLabel(s.c)}>{s.l}</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 300,
                color: s.c,
                fontFamily: "monospace",
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginBottom: 18,
          padding: "14px 16px",
          background: "#fafaf8",
          border: `1px solid ${T.borderCard}`,
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: T.textMuted,
              letterSpacing: "0.06em",
            }}
          >
            PROGRESSO GERAL
          </span>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: color }}>
            {doneTopicsCount}/{totalTopics} tarefas · {doneHoursCount}h/
            {totalHours}h
          </span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: T.textDisabled,
              }}
            >
              Tarefas concluídas
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: color,
                fontWeight: 600,
              }}
            >
              {pctTopics}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: T.borderCard,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pctTopics}%`,
                height: "100%",
                background: color,
                borderRadius: 3,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: T.textDisabled,
              }}
            >
              Horas de estudo
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: color,
                fontWeight: 600,
              }}
            >
              {pctHours}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: T.borderCard,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pctHours}%`,
                height: "100%",
                background: color,
                borderRadius: 3,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[
          ["Expandir tudo", true],
          ["Recolher tudo", false],
        ].map(([l, o]) => (
          <button
            key={l}
            onClick={() =>
              setExp(o ? new Set(WEEKS.map((w) => w.n)) : new Set())
            }
            style={{
              background: "transparent",
              border: `1px solid ${T.borderCard}`,
              color: T.textMuted,
              padding: "5px 11px",
              borderRadius: 4,
              fontSize: 11,
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {WEEKS.map((w) => {
        const isO = exp.has(w.n);
        const weekKeys = w.topics.map((t) => `${w.n}-${t.id}`);
        const doneCount = weekKeys.filter((k) => done.has(k)).length;
        const allDone = doneCount > 0 && doneCount === w.topics.length;

        return (
          <div
            key={w.n}
            style={{
              ...S.decisionWrap(allDone ? "#10B981" : w.col),
              padding: 0,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <div
              onClick={() => tog(w.n)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: allDone ? "#F0FDF4" : "#fafaf8",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: allDone ? "#14532D" : w.col,
                  minWidth: 60,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                SEMANA {w.n}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 12.5,
                  color: allDone ? T.textMuted : T.textPrimary,
                  textDecoration: allDone ? "line-through" : "none",
                  transition: "all 0.2s",
                }}
              >
                {w.focus}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: allDone ? "#14532D" : T.textDisabled,
                  flexShrink: 0,
                }}
              >
                {doneCount}/{w.topics.length}
              </span>

              <div
                style={{
                  width: 56,
                  height: 4,
                  background: T.borderCard,
                  borderRadius: 2,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: `${Math.round((w.h / maxH) * 100)}%`,
                    height: "100%",
                    background: allDone ? "#10B981" : w.col,
                    borderRadius: 2,
                    transition: "background 0.3s",
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: allDone ? "#14532D" : w.col,
                  minWidth: 26,
                  textAlign: "right",
                }}
              >
                {w.h}h
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: T.textDisabled,
                  transition: "transform 0.2s",
                  transform: isO ? "rotate(90deg)" : "none",
                  flexShrink: 0,
                }}
              >
                ›
              </span>
            </div>

            {isO && (
              <div style={{ padding: "0 14px 10px" }}>
                {w.topics.map((t, i) => {
                  const key = `${w.n}-${t.id}`;
                  const isDone = done.has(key);
                  const ms = modeStyle(t.mode);
                  const ti =
                    t.wipr > 0
                      ? tier(t.wipr)
                      : { color: "#6366F1", label: "REV" };

                  const badgeStyle = isDone
                    ? {
                        flexShrink: 0,
                        width: 32,
                        height: 20,
                        borderRadius: 4,
                        background: ti.color,
                        border: `1px solid ${ti.color}`,
                        color: "#ffffff",
                        fontSize: 10,
                        fontFamily: "monospace",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }
                    : {
                        flexShrink: 0,
                        width: 32,
                        height: 20,
                        borderRadius: 4,
                        background: `${ti.color}15`,
                        border: `1px solid ${ti.color}44`,
                        color: ti.color,
                        fontSize: 10,
                        fontFamily: "monospace",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      };

                  return (
                    <div
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        togDone(key);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        padding: "8px 4px",
                        borderBottom:
                          i < w.topics.length - 1
                            ? `1px solid ${T.borderCard}`
                            : "none",
                        cursor: "pointer",
                        borderRadius: 4,
                        background: isDone ? "#fafffe" : "transparent",
                        transition: "background 0.2s",
                        margin: "0 -4px",
                      }}
                    >
                      <div style={badgeStyle}>
                        {t.wipr > 0 ? t.wipr : "rev"}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12.5,
                            color: isDone ? T.textDisabled : T.textPrimary,
                            lineHeight: 1.35,
                            textDecoration: isDone ? "line-through" : "none",
                            transition: "all 0.2s",
                          }}
                        >
                          {t.nome || t.id}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: isDone ? T.textDisabled : T.textMuted,
                            marginTop: 1,
                            fontFamily: "monospace",
                            transition: "color 0.2s",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Eixo: {t.especialidade || "Geral"}
                        </div>
                      </div>

                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 5px",
                          borderRadius: 3,
                          background: isDone ? "#F0FDF4" : ms.bg,
                          border: `1px solid ${isDone ? "#BBF7D0" : ms.br}`,
                          color: isDone ? "#14532D" : ms.tx,
                          fontFamily: "monospace",
                          fontWeight: 600,
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      >
                        {isDone ? "✓ feito" : t.mode}
                      </span>

                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: "monospace",
                          color: isDone ? T.textDisabled : T.textMuted,
                          flexShrink: 0,
                          minWidth: 22,
                          textAlign: "right",
                        }}
                      >
                        {t.h}h
                      </span>
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
        <h1 style={{ color: "#fff", fontSize: 28, marginBottom: 20 }}>
          RESIDEX
        </h1>
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
        if (
          userDoc.exists() &&
          userDoc.data().perfil &&
          userDoc.data().perfil.institutions.length > 0
        ) {
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
      engineObterRanking(profile, db).then((calculated) =>
        setDynamicTopics(calculated),
      );
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
    if (active === "perfil")
      return (
        <PerfilSection
          color={sec.color}
          profile={profile}
          setProfile={setProfile}
          user={user}
        />
      );
    if (active === "formula")
      return <FormulaSection color={sec.color} profile={profile} />;
    if (active === "rankings")
      return (
        <RankingsSection color={sec.color} dynamicTopics={dynamicTopics} />
      );
    if (active === "plano")
      return (
        <PlanoSection
          color={sec.color}
          user={user}
          dynamicTopics={dynamicTopics}
          profile={profile}
        />
      );
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
      <div
        style={{ display: "flex", flex: 1, overflow: "hidden" }}
        className="mp-body"
      >
        <div style={S.nav} className="mp-nav-sidebar">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={S.navBtn(active === s.id, s.color)}
            >
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
