// medpanel-layout.jsx
// Shell completo compartilhado — importar em cada página
// Mudar aqui: back button, header, nav, footer, scroll → propaga em TUDO

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "./medpanel-tokens";
import { renderBlock } from "./medpanel-blocks";

/**
 * MedPanelPage — Layout universal do MedPanel
 *
 * Props:
 *   sections  {Array}   — array de seções (id, name, color, content.title, content.blocks)
 *   specialty {string}  — linha eyebrow ex: "Cirurgia do Trauma"
 *   title     {string}  — título principal ex: "Neurotrauma — Guia Completo"
 *   subtitle  {string}  — linha de seções ex: "TCE · HIC · Morte Encefálica"
 *                         se omitido, gera automaticamente a partir de sections[].name
 */
export default function MedPanelPage({ sections, specialty, title, subtitle }) {
  const [active, setActive] = useState(sections[0].id);
  const navigate = useNavigate();

  const sec = sections.find((s) => s.id === active);
  const color = sec.color;

  const autoSubtitle = sections.map((s) => s.name).join(" · ");

  return (
    <div style={S.page}>

      {/* ── Botão de volta ───────────────────────────────────────────── */}
      <button onClick={() => navigate("/")} style={S.btnBack}>
        ← MedPanel
      </button>

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div style={S.header}>
        <div style={S.headerEyebrow}>
          {specialty || "MedPanel"} · Referência para Residência
        </div>
        <h1 style={S.headerTitle}>{title}</h1>
        <div style={S.headerSections}>
          {subtitle || autoSubtitle}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Nav lateral */}
        <div style={S.nav}>
          {sections.map((s) => (
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

        {/* Conteúdo principal */}
        <div style={S.content}>
          <div style={S.sectionHeader(color)}>
            <div style={S.sectionBadge(color)}>{sec.name}</div>
            <div style={S.sectionTitle}>{sec.content.title}</div>
          </div>

          {sec.content.blocks.map((block, idx) =>
            renderBlock(block, idx, color)
          )}
        </div>

      </div>

      {/* ── Footer com dots ──────────────────────────────────────────── */}
      <div style={S.footer}>
        <div style={S.footerLabel}>
          {sections.findIndex((s) => s.id === active) + 1}/{sections.length} · {sec.name}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              style={S.footerDot(active === s.id, s.color)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
