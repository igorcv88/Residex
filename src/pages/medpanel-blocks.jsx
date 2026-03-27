// medpanel-blocks.jsx
// Renderizador de blocos compartilhado — importar em medpanel-layout
// Para adicionar um novo tipo de bloco: adicionar aqui, propaga em todas as páginas

import { T, S } from "./medpanel-tokens";

export function renderBlock(block, idx, color) {

  // ── Alert ────────────────────────────────────────────────────────────────
  if (block.type === "alert") {
    return (
      <div key={idx} style={S.alert(block.color)}>
        <div style={S.alertTitle(block.color)}>⚠ {block.title}</div>
        <div style={S.alertText}>{block.text}</div>
      </div>
    );
  }

  // ── Obs ──────────────────────────────────────────────────────────────────
  if (block.type === "obs") {
    return (
      <div key={idx} style={S.obs}>
        <div style={S.obsTitle}>◆ {block.title}</div>
        <div style={S.obsText}>{block.text}</div>
      </div>
    );
  }

  // ── Grid ─────────────────────────────────────────────────────────────────
  if (block.type === "grid") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={S.gridWrap}>
          {block.items.map((item, i) => (
            <div key={i} style={S.gridCard(item.highlight, color)}>
              <div style={S.gridLabel(item.highlight, color)}>{item.label}</div>
              <div style={S.gridValue(item.highlight)}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Flow ─────────────────────────────────────────────────────────────────
  if (block.type === "flow") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {block.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={S.flowCircle(step.color)}>{i + 1}</div>
                {i < block.steps.length - 1 && (
                  <div style={{ width: 1, height: 12, background: T.borderCard }} />
                )}
              </div>
              <div style={S.flowStep(step.color)}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Grades ───────────────────────────────────────────────────────────────
  if (block.type === "grades") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {block.grades.map((g, i) => (
            <div key={i} style={S.gradeWrap(g.color)}>
              <div style={S.gradeBadge(g.color)}>{g.grade}</div>
              <div>
                {g.items.map((item, j) => (
                  <div key={j} style={S.gradeItem(g.color)}>
                    <span style={S.gradeItemDot(g.color)}>·</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Phases ───────────────────────────────────────────────────────────────
  if (block.type === "phases") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {block.phases.map((p, i) => (
            <div key={i} style={S.gradeWrap(p.color)}>
              <div style={{
                ...S.gradeBadge(p.color),
                fontSize: 16,
                fontWeight: 500,
                padding: "6px 14px",
                minWidth: 36,
                textAlign: "center",
              }}>{p.number}</div>
              <div>
                <div style={{ fontSize: 11, color: p.color, fontFamily: "monospace",
                  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                  {p.name}
                </div>
                {p.items.map((item, j) => (
                  <div key={j} style={S.gradeItem(p.color)}>
                    <span style={S.gradeItemDot(p.color)}>·</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Decision ─────────────────────────────────────────────────────────────
  if (block.type === "decision") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {block.decisions.map((d, i) => (
            <div key={i} style={S.decisionWrap(d.color)}>
              <div style={S.decisionCondition(d.color)}>{d.condition}</div>
              {d.actions.map((a, j) => (
                <div key={j} style={S.decisionAction(d.color)}>
                  <span style={{ color: d.color, flexShrink: 0 }}>→</span>{a}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Location ─────────────────────────────────────────────────────────────
  if (block.type === "location") {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div style={S.gridTitle}>{block.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {block.locations.map((loc, i) => (
            <div key={i} style={S.decisionWrap(loc.color)}>
              <div style={S.decisionCondition(loc.color)}>{loc.name}</div>
              {loc.stable && loc.stable.map((s, j) => (
                <div key={j} style={S.decisionAction(loc.color)}>
                  <span style={{ color: loc.color, flexShrink: 0 }}>·</span>{s}
                </div>
              ))}
              {loc.gold && (
                <div style={{ ...S.decisionAction(loc.color), marginTop: 4 }}>
                  <span style={{ color: "#F59E0B", flexShrink: 0, fontFamily: "monospace", fontSize: 10 }}>★</span>
                  <span style={{ color: T.textPrimary }}>{loc.gold}</span>
                </div>
              )}
              {loc.obs && (
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6,
                  fontStyle: "italic", lineHeight: 1.5 }}>{loc.obs}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Fallback (tipo desconhecido) ──────────────────────────────────────────
  return (
    <div key={idx} style={{ ...S.obs, borderLeftColor: "#F59E0B" }}>
      <div style={{ ...S.obsTitle, color: "#F59E0B" }}>⚠ Tipo de bloco desconhecido: "{block.type}"</div>
      <pre style={{ fontSize: 11, color: T.textMuted, overflow: "auto" }}>
        {JSON.stringify(block, null, 2)}
      </pre>
    </div>
  );
}
