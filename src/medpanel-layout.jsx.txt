// medpanel-layout.jsx
// Shell completo compartilhado — importar em cada página
// Mobile-responsive: nav horizontal fixa no topo + conteúdo abaixo
// Mudar aqui: back button, header, nav, footer, scroll → propaga em TUDO

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "./medpanel-tokens";
import { renderBlock } from "./medpanel-blocks";

/* ── CSS responsivo injetado via <style> ─────────────────────────── */
const mobileCSS = `
*, *::before, *::after { box-sizing: border-box; }

@media (max-width: 768px) {

  /* Esconde sidebar desktop */
  .mp-nav-sidebar {
    display: none !important;
  }

  /* Nav horizontal mobile — sempre visível */
  .mp-nav-mobile {
    display: flex !important;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 8px;
    padding: 10px 12px;
    background: #0F172A;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .mp-nav-mobile::-webkit-scrollbar {
    height: 3px;
  }
  .mp-nav-mobile::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 3px;
  }

  .mp-nav-mobile-btn {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  /* Body vira column */
  .mp-body {
    flex-direction: column !important;
    overflow-y: auto !important;
  }

  /* Conteúdo ocupa tudo */
  .mp-content {
    width: 100% !important;
    min-width: 0 !important;
    padding: 16px 12px !important;
  }

  /* Header compacto */
  .mp-header {
    padding: 16px 12px 12px !important;
  }
  .mp-header-title {
    font-size: 20px !important;
    line-height: 1.2 !important;
  }
  .mp-header-sections {
    display: none !important;
  }
  .mp-header-eyebrow {
    font-size: 10px !important;
  }

  /* Footer compacto */
  .mp-footer {
    padding: 8px 12px !important;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Section header full-bleed */
  .mp-section-header {
    margin: 0 -12px 16px !important;
    padding: 16px 12px !important;
    border-radius: 0 !important;
  }

  /* Back button */
  .mp-btn-back {
    padding: 10px 12px !important;
    font-size: 12px !important;
  }
}

/* Desktop: nav mobile oculta */
@media (min-width: 769px) {
  .mp-nav-mobile {
    display: none !important;
  }
}
`;

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

      {/* ── CSS injetado ─────────────────────────────────────────── */}
      <style>{mobileCSS}</style>

      {/* ── Botão de volta ───────────────────────────────────────── */}
      <button
        onClick={() => navigate("/")}
        style={S.btnBack}
        className="mp-btn-back"
      >
        ← MedPanel
      </button>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div style={S.header} className="mp-header">
        <div style={S.headerEyebrow} className="mp-header-eyebrow">
          {specialty || "MedPanel"} · Referência para Residência
        </div>
        <h1 style={S.headerTitle} className="mp-header-title">
          {title}
        </h1>
        <div style={S.headerSections} className="mp-header-sections">
          {subtitle || autoSubtitle}
        </div>
      </div>

      {/* ── Nav horizontal mobile — sempre visível ───────────────── */}
      <div className="mp-nav-mobile">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className="mp-nav-mobile-btn"
            style={{
              background: active === s.id ? s.color : "rgba(255,255,255,0.06)",
              color: active === s.id ? "#fff" : "rgba(255,255,255,0.6)",
              boxShadow: active === s.id
                ? `0 0 12px ${s.color}44`
                : "none",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div
        style={{ display: "flex", flex: 1, overflow: "hidden" }}
        className="mp-body"
      >

        {/* Nav lateral — desktop only */}
        <div style={S.nav} className="mp-nav-sidebar">
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
        <div style={S.content} className="mp-content">
          <div style={S.sectionHeader(color)} className="mp-section-header">
            <div style={S.sectionBadge(color)}>{sec.name}</div>
            <div style={S.sectionTitle}>{sec.content.title}</div>
          </div>

          {sec.content.blocks.map((block, idx) =>
            renderBlock(block, idx, color)
          )}
        </div>

      </div>

      {/* ── Footer com dots ──────────────────────────────────────── */}
      <div style={S.footer} className="mp-footer">
        <div style={S.footerLabel}>
          {sections.findIndex((s) => s.id === active) + 1}/{sections.length} ·{" "}
          {sec.name}
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
