import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { EXTRA_CATEGORIES, EXTRA_DRUGS } from "./PedCalcDrugsExtra";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const BG = "#06080f";
const BG2 = "#080b14";
const BG3 = "#0d1220";
const BORDER = "#111827";
const BORDER2 = "#1e2a3a";

// ─────────────────────────────────────────────
// DRUG CATEGORIES
// ─────────────────────────────────────────────
const DRUG_CATEGORIES_BASE = [
  { id: "todos",           name: "Todos",                    color: "#64748b" },
  { id: "antibioticos",    name: "Antibióticos",             color: "#10B981" },
  { id: "analgesicos",     name: "Analgésicos / Antitérmicos", color: "#F59E0B" },
  { id: "corticoides",     name: "Corticoides",              color: "#EF4444" },
  { id: "antihistaminicos",name: "Anti-histamínicos",        color: "#8B5CF6" },
  { id: "tgi",             name: "Drogas TGI",               color: "#0EA5E9" },
  { id: "broncodilatadores", name: "Broncodilatadores",      color: "#6366F1" },
  { id: "anticonvulsivantes", name: "Anticonvulsivantes",    color: "#EC4899" },
  { id: "sedativos",       name: "Sedação / Analgesia",      color: "#F97316" },
];
const DRUG_CATEGORIES = [...DRUG_CATEGORIES_BASE, ...EXTRA_CATEGORIES];
const DRUGS = [...DRUGS_BASE, ...EXTRA_DRUGS];

// ─────────────────────────────────────────────
// DRUG DATABASE
// calc(input) → [{label, value, freq, sub, highlight}]
// ─────────────────────────────────────────────
const DRUGS_BASE = [

  // ══ ANTIBIÓTICOS ══════════════════════════
  {
    id: "ampicilina_ev", name: "Ampicilina EV/IM",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "FA 500mg e 1g",
    dilution: "100mg/mL padrão | Max EV: 30mg/mL em SF0,9%",
    infusion: "30 min",
    calc: (w) => {
      const low  = Math.min(w * 25, 2000);
      const high = Math.min(w * 50, 3000);
      return [
        { label: "Geral (100mg/kg/dia ÷ 4x)", value: `${low.toFixed(0)} mg/dose`,  freq: "6/6h",  sub: `Regra: ${(w/4).toFixed(1)} mL/dose (200mg/mL) | Max 8g/dia`, highlight: false },
        { label: "Grave / Apendicite (200mg/kg/dia ÷ 4x)", value: `${high.toFixed(0)} mg/dose`, freq: "6/6h", sub: "Max 3g/dose — Max 12g/dia", highlight: true },
      ];
    },
    notes: "Cobre GBS, E. coli e Listeria. 1ª linha sepse neonatal (+ gentamicina). Regra: Peso/4 em mL/dose (200mg/mL).",
  },
  {
    id: "amoxicilina_vo", name: "Amoxicilina VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 250mg/5mL (azul) | Susp 400mg/5mL (BD)",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "Habitual (50mg/kg/dia ÷ 3x) — Susp 250mg/5mL", value: `${Math.min((w*50/3),500).toFixed(0)} mg/dose`, freq: "8/8h", sub: `Regra: ${(w/3).toFixed(1)} mL/dose | Max 500mg 8/8h`, highlight: false },
      { label: "Dose alta (80-90mg/kg/dia ÷ 2x) — Susp 400mg/5mL", value: `${Math.min((w*85/2),875).toFixed(0)} mg/dose`, freq: "12/12h", sub: `Regra: ${(w/4).toFixed(1)} mL/dose | Max 875mg 12/12h | Max 4g/dia`, highlight: true },
    ],
    notes: "Dose alta: otite resistente, pneumonia. Peso/3 (250mg/5mL) ou Peso/4 (400mg/5mL).",
  },
  {
    id: "amoxiclav_vo", name: "Amoxicilina-Clavulanato VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 250+62,5mg/5mL | Susp 400+57mg/5mL",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "Susp 250+62,5/5mL — 8/8h", value: `${(w/3).toFixed(1)} mL/dose`, freq: "8/8h", sub: `≈ ${Math.min((w*50/3),500).toFixed(0)} mg amoxicilina | Regra: Peso/3`, highlight: false },
      { label: "Susp 400+57/5mL — 12/12h", value: `${(w/4).toFixed(1)} mL/dose`, freq: "12/12h", sub: `≈ ${Math.min((w*50/2),875).toFixed(0)} mg amoxicilina | Regra: Peso/4`, highlight: true },
    ],
    notes: "Cálculo sempre pela amoxicilina. Max 500+125mg 8/8h ou 875+125mg 12/12h.",
  },
  {
    id: "azitromicina_vo", name: "Azitromicina VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 200mg/5mL",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "10mg/kg/dia — 1× ao dia", value: `${Math.min(w*10,500).toFixed(0)} mg/dia`, freq: "1× ao dia", sub: `Regra: ${(w/4).toFixed(1)} mL/dose (200mg/5mL) | Max 500mg/dia`, highlight: true },
    ],
    notes: "3-5 dias (coqueluche: 5 dias, pneumonia: 3 dias). Regra: Peso/4 em mL/dose.",
  },
  {
    id: "cefalexina_vo", name: "Cefalexina VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 250mg/5mL | CP 500mg",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "25-50mg/kg/dia ÷ 4x", value: `${Math.min((w*50/4),500).toFixed(0)} mg/dose`, freq: "6/6h", sub: `Regra: ${(w/4).toFixed(1)} mL/dose (250mg/5mL) | Max 2g/dia`, highlight: true },
    ],
    notes: "Infecções de pele, IVU não complicada. Regra: Peso/4 em mL/dose.",
  },
  {
    id: "ceftriaxona_ev", name: "Ceftriaxona EV/IM",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "FA 250mg, 500mg, 1g",
    dilution: "100mg/mL → max 40mg/mL em SF0,9% ou SG5%",
    infusion: "30 min",
    calc: (w) => [
      { label: "Habitual (50-75mg/kg/dia 1-2×)", value: `${Math.min(w*75,2000).toFixed(0)} mg`, freq: "24/24h ou 12/12h", sub: "Max 2g/dia. Se >2g/dia: dividir em 2×", highlight: false },
      { label: "Grave / SNC (80-100mg/kg/dia)", value: `${Math.min(w*100,4000).toFixed(0)} mg/dia`, freq: "12/12h", sub: "Max 4g/dia — sempre dividir em 2×", highlight: true },
      { label: "⚠ CONTRAINDICADO em neonatos", value: "< 28 dias de vida", freq: "", sub: "Usar CEFOTAXIMA — desloca bilirrubina e precipita com cálcio", highlight: false },
    ],
    notes: "Sem ajuste renal. NÃO usar em neonatos (<28 dias). Não infundir junto com Ca²⁺.",
  },
  {
    id: "metronidazol_vo", name: "Metronidazol VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 40mg/mL | CP 250mg, 400mg",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "40mg/kg/dia ÷ 3x (habitual)", value: `${Math.min((w*40/3),750).toFixed(0)} mg/dose`, freq: "8/8h", sub: `Regra: ${(w/3).toFixed(1)} mL/dose (40mg/mL) | Max 750mg/dose`, highlight: true },
    ],
    notes: "Giardia, amebíase, anaeróbios. Regra prática: Peso/3 em mL/dose (40mg/mL).",
  },
  {
    id: "smxtmp_vo", name: "SMX-TMP (Cotrimoxazol) VO",
    category: "antibioticos", color: "#10B981", inputType: "weight",
    presentation: "Susp 200+40mg/5mL (40mg TMP/5mL)",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "8-12mg/kg TMP/dia ÷ 2x (≥ 2 meses)", value: `${Math.min((w*8/2),160).toFixed(0)}-${Math.min((w*12/2),160).toFixed(0)} mg TMP/dose`, freq: "12/12h", sub: `Regra: ${(w/2).toFixed(1)} mL/dose | Max 160mg TMP/dose`, highlight: true },
    ],
    notes: "CONTRAINDICADO < 2 meses. Regra: Peso/2 em mL/dose. IVU, P. jirovecii, toxoplasma.",
  },

  // ══ ANALGÉSICOS / ANTITÉRMICOS ══════════
  {
    id: "dipirona", name: "Dipirona",
    category: "analgesicos", color: "#F59E0B", inputType: "weight",
    presentation: "Gotas 500mg/mL (25mg/gt) | Sol 50mg/mL | Amp 500mg/mL",
    dilution: "EV: diluir em 10mL AD",
    infusion: "EV lento (≥ 5 min)",
    calc: (w) => [
      { label: "Dose em mg (15-25mg/kg/dose)", value: `${Math.min(w*20,1000).toFixed(0)} mg/dose`, freq: "6/6h", sub: "Max 4g/dia — a partir de 3 meses", highlight: false },
      { label: "Gotas 500mg/mL (25mg/gota)", value: `${Math.min(Math.ceil(w*0.9),40)} gotas/dose`, freq: "6/6h", sub: `Regra: ~1 gota/kg — Max 40 gotas`, highlight: false },
      { label: "Solução oral 50mg/mL (Novalgina)", value: `${(w*0.4).toFixed(1)} mL/dose`, freq: "6/6h", sub: "Regra: 0,3-0,5 mL × Peso", highlight: false },
      { label: "EV / IM (500mg/mL)", value: `${Math.min(w*0.04,2).toFixed(2)} mL/dose`, freq: "6/6h", sub: `Regra: 0,04 mL × Peso — Max 2mL/dose — diluir em 10mL AD`, highlight: true },
    ],
    notes: "A partir de 3 meses. Max 4g/dia. Regra EV: 0,04 mL × Peso.",
  },
  {
    id: "paracetamol", name: "Paracetamol (Tylenol)",
    category: "analgesicos", color: "#F59E0B", inputType: "weight",
    presentation: "Gotas 200mg/mL (10mg/gt) | Gotas 100mg/mL (5mg/gt) | Tylenol Bebê 100mg/mL",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "Dose em mg (10-15mg/kg/dose)", value: `${Math.min(w*12,750).toFixed(0)} mg/dose`, freq: "até 6/6h", sub: "Max 4g/dia", highlight: false },
      { label: "Gotas 200mg/mL (10mg/gota)", value: `${Math.min(Math.ceil(w),40)} gotas/dose`, freq: "até 6/6h", sub: `Regra: 1 gota/kg — Max 40 gotas`, highlight: false },
      { label: "Gotas 100mg/mL (5mg/gota)", value: `${Math.min(Math.ceil(w*2),80)} gotas/dose`, freq: "até 6/6h", sub: "Regra: 2 gotas/kg — Max 80 gotas", highlight: false },
      { label: "Tylenol Bebê 100mg/mL", value: `${(w/10).toFixed(1)} mL/dose`, freq: "até 6/6h", sub: "Regra: Peso/10 em mL", highlight: true },
    ],
    notes: "Intervalo mínimo 4h. Max 5 doses/dia ou 4g/dia. Padrão ouro de antitérmico.",
  },
  {
    id: "ibuprofeno", name: "Ibuprofeno (Alivium)",
    category: "analgesicos", color: "#F59E0B", inputType: "weight",
    presentation: "Gotas 50mg/mL (5mg/gt) | Gotas 100mg/mL (10mg/gt) | Susp 100mg/5mL",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "Antitérmico / Analgésico (4-10mg/kg/dose)", value: `${Math.min(w*7,600).toFixed(0)} mg/dose`, freq: "6-8h", sub: "Max 600mg/dose", highlight: false },
      { label: "Gotas 50mg/mL (5mg/gota)", value: `${Math.min(Math.ceil(w*2),40)} gotas/dose`, freq: "6-8h", sub: "Regra: 2 gotas/kg — Max 40 gotas", highlight: false },
      { label: "Gotas 100mg/mL (10mg/gota)", value: `${Math.min(Math.ceil(w),40)} gotas/dose`, freq: "6-8h", sub: "Regra: 1 gota/kg — Max 40 gotas", highlight: true },
      { label: "Anti-inflamatório (40mg/kg/dia ÷ 3x)", value: `${Math.min((w*40/3),800).toFixed(0)} mg/dose`, freq: "8/8h", sub: "Max 2,4g/dia — Max 10 dias", highlight: false },
    ],
    notes: "A partir de 3 meses. Não usar >10 dias. Intervalo mínimo 6h. Evitar em asma.",
  },
  {
    id: "tramadol", name: "Tramadol",
    category: "analgesicos", color: "#F59E0B", inputType: "weight",
    presentation: "Gotas 100mg/mL (2,5mg/gt) | Caps 50mg | Amp 50mg/mL",
    dilution: "EV: 50-100mL SF0,9%", infusion: "30 min",
    calc: (w) => [
      { label: "1-2mg/kg/dose", value: `${Math.min(w*1,100).toFixed(0)}–${Math.min(w*2,100).toFixed(0)} mg/dose`, freq: "4-6h", sub: "Max 100mg/dose | Max 400mg/dia | Associar antiemético", highlight: true },
      { label: "Gotas 100mg/mL (2,5mg/gota)", value: `${Math.min(Math.ceil((w*1.5)/2.5),40)} gotas/dose`, freq: "4-6h", sub: "≈ 1,5mg/kg", highlight: false },
    ],
    notes: "Opioide fraco. Sempre associar antiemético. EV em 30 min.",
  },
  {
    id: "morfina", name: "Morfina",
    category: "analgesicos", color: "#F59E0B", inputType: "weight",
    presentation: "FA 1mg/mL ou 10mg/mL",
    dilution: "10mg/mL: diluir 1mL + 9mL AD → 1mg/mL",
    infusion: "EV lento 2-5 min",
    calc: (w) => [
      { label: "> 6 meses: 0,05-0,1mg/kg/dose", value: `${Math.min(w*0.075,4).toFixed(2)} mg/dose`, freq: "2-4h se necessário", sub: "Iniciar na menor dose. Max 5mg/dose. Desmame gradual", highlight: true },
      { label: "< 6 meses: 0,025-0,05mg/kg/dose", value: `${Math.min(w*0.03,2).toFixed(3)} mg/dose`, freq: "4-6h", sub: "Maior sensibilidade a opioides", highlight: false },
    ],
    notes: "Não suspender abruptamente. Desmame com escala WAT-1.",
  },

  // ══ CORTICOIDES ══════════════════════════
  {
    id: "prednisolona_vo", name: "Prednisolona VO",
    category: "corticoides", color: "#EF4444", inputType: "weight",
    presentation: "Sol 3mg/mL (Prelone, Predsim) | CP 5-40mg",
    dilution: "—", infusion: "VO",
    calc: (w) => {
      const gina = w <= 2 ? 20 : w <= 5 ? 30 : w <= 11 ? 40 : 50;
      return [
        { label: "Asma (1-2mg/kg/dia)", value: `${Math.min(w*1,60).toFixed(0)}–${Math.min(w*2,60).toFixed(0)} mg/dia`, freq: "1-2× ao dia × 3-5 dias", sub: `Regra: ${(Math.min(w,60)/3).toFixed(1)} mL/dia (3mg/mL) | GINA max: ${gina}mg/dia`, highlight: true },
        { label: "Anti-inflamatório geral (0,5-2mg/kg/dia)", value: `${Math.min(w*0.5,60).toFixed(0)}–${Math.min(w*2,60).toFixed(0)} mg/dia`, freq: "1-2× ao dia", sub: "Max 60mg/dia", highlight: false },
      ];
    },
    notes: "Regra: Peso/3 em mL/dia (3mg/mL). Para asma: 3-5 dias. GINA 2024 limita dose por faixa etária.",
  },
  {
    id: "hidrocortisona_ev", name: "Hidrocortisona EV",
    category: "corticoides", color: "#EF4444", inputType: "weight",
    presentation: "FA 500mg + 5mL AD (100mg/mL)",
    dilution: "Max 5mg/mL em SF0,9% ou SG5%",
    infusion: "1 hora",
    calc: (w) => [
      { label: "Ataque — Asma / Anafilaxia (10mg/kg)", value: `${Math.min(w*10,200).toFixed(0)} mg`, freq: "dose única de ataque", sub: "Max 200mg — correr em 1h", highlight: true },
      { label: "Manutenção (4-6mg/kg/dose)", value: `${Math.min(w*4,200).toFixed(0)}–${Math.min(w*6,200).toFixed(0)} mg/dose`, freq: "4-6h", sub: "Max 200mg/dose", highlight: false },
    ],
    notes: "Sem ajuste para função renal. Alternativa à metilprednisolona.",
  },
  {
    id: "dexametasona_ev", name: "Dexametasona EV/IM/VO",
    category: "corticoides", color: "#EF4444", inputType: "weight",
    presentation: "EV/IM: 4mg/mL ou 8mg/mL | VO: CP 4mg | Elixir 0,1mg/mL",
    dilution: "Não necessita diluição",
    infusion: "30 min",
    calc: (w) => [
      { label: "Crupe (0,15-0,6mg/kg — dose única)", value: `${Math.min(w*0.6,10).toFixed(2)} mg`, freq: "dose única", sub: "Max 10mg — preferir VO", highlight: true },
      { label: "Asma exacerbação (0,6mg/kg)", value: `${Math.min(w*0.6,16).toFixed(2)} mg`, freq: "dose única", sub: "Max 16mg — equivale a 5 dias de prednisolona", highlight: false },
      { label: "Anti-inflamatório (0,15mg/kg 6/6h)", value: `${Math.min(w*0.15,8).toFixed(2)} mg/dose`, freq: "6/6h", sub: "0,02-0,3mg/kg/dia", highlight: false },
    ],
    notes: "Crupe: dose única. Não necessita diluição. Eficácia semelhante independente da via.",
  },
  {
    id: "metilpred_ev", name: "Metilprednisolona EV",
    category: "corticoides", color: "#EF4444", inputType: "weight",
    presentation: "FA 500mg (62,5mg/mL)",
    dilution: "Max 1mg/mL em SF0,9% ou SG5%",
    infusion: "30-120 min",
    calc: (w) => [
      { label: "Asma grave — ataque (2mg/kg)", value: `${Math.min(w*2,60).toFixed(0)} mg`, freq: "dose inicial", sub: "Max 60mg", highlight: true },
      { label: "Asma — manutenção (1-2mg/kg/dia ÷ 4x)", value: `${Math.min(w*0.5,15).toFixed(0)} mg/dose`, freq: "6/6h", sub: `Max 60mg/dia`, highlight: false },
      { label: "Pulsoterapia (30mg/kg/dia × 3-5 dias)", value: `${Math.min(w*30,1000).toFixed(0)} mg/dia`, freq: "1× ao dia", sub: "Max 1g/dia — infundir em 1-4h — monitorizar sinais vitais 30/30min", highlight: false },
    ],
    notes: "Pulsoterapia: após → prednisolona 1-2mg/kg/dia. Apenas succinato pode ser EV.",
  },

  // ══ ANTI-HISTAMÍNICOS ════════════════════
  {
    id: "loratadina", name: "Loratadina (Claritin)",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "age",
    presentation: "Xarope 5mg/5mL (1mg/mL) | CP 10mg",
    dilution: "—", infusion: "VO",
    calc: (a) => {
      if (a < 2) return [{ label: "< 2 anos", value: "Não recomendado rotineiramente", freq: "", sub: "", highlight: false }];
      if (a < 6) return [{ label: "2-5 anos: 5mg 1×/dia", value: "5 mg (5mL xarope)", freq: "1× ao dia", sub: "Xarope 1mg/mL — 5mL/dia", highlight: true }];
      return [{ label: "≥ 6 anos: 10mg 1×/dia", value: "10 mg (10mL ou 1 cp)", freq: "1× ao dia", sub: "10mL xarope ou 1 comprimido", highlight: true }];
    },
    notes: "Não sedante. 1 tomada ao dia. Sem ajuste renal.",
  },
  {
    id: "desloratadina", name: "Desloratadina (Desalex)",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "age",
    presentation: "Xarope 0,5mg/mL | Gotas 1,25mg/mL (0,0625mg/gt) | CP 5mg",
    dilution: "—", infusion: "VO",
    calc: (a) => {
      const m = a * 12;
      if (m < 6)  return [{ label: "< 6 meses", value: "Consultar especialista", freq: "", sub: "", highlight: false }];
      if (m < 12) return [{ label: "6-11 meses: 1mg", value: "1 mg/dia", freq: "1×/dia", sub: "2mL xarope 0,5mg/mL ou 16 gotas", highlight: true }];
      if (a < 6)  return [{ label: "1-5 anos: 1,25mg", value: "1,25 mg/dia", freq: "1×/dia", sub: "2,5mL xarope ou 20 gotas", highlight: true }];
      if (a < 12) return [{ label: "6-11 anos: 2,5mg", value: "2,5 mg/dia", freq: "1×/dia", sub: "5mL xarope ou 40 gotas", highlight: true }];
      return [{ label: "≥ 12 anos: 5mg", value: "5 mg/dia (1 cp)", freq: "1×/dia", sub: "10mL xarope ou 80 gotas ou 1 comprimido", highlight: true }];
    },
    notes: "Não sedante. Dose por faixa etária.",
  },
  {
    id: "dexclorfeniramina", name: "Dexclorfeniramina (Polaramine)",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "age",
    presentation: "Sol 0,4mg/mL | Gotas 2,8mg/mL (0,14mg/gt) | CP 2mg",
    dilution: "—", infusion: "VO",
    calc: (a) => {
      if (a < 2)  return [{ label: "< 2 anos", value: "Não recomendado (sedação)", freq: "", sub: "", highlight: false }];
      if (a < 6)  return [{ label: "2-5 anos: 0,5mg/dose", value: "0,5 mg/dose", freq: "4-6h", sub: "1,25mL sol ou 5 gotas", highlight: true }];
      if (a < 12) return [{ label: "6-11 anos: 1mg/dose", value: "1 mg/dose", freq: "4-6h", sub: "2,5mL sol ou 10 gotas ou ½ cp", highlight: true }];
      return [{ label: "≥ 12 anos: 2mg/dose", value: "2 mg/dose", freq: "4-6h", sub: "5mL sol ou 20 gotas ou 1 cp", highlight: true }];
    },
    notes: "1ª geração — sedante. Dose por faixa etária.",
  },
  {
    id: "hidroxizine", name: "Hidroxizine (Hixizine)",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "weight",
    presentation: "Xarope 10mg/5mL (2mg/mL) | CP 25mg",
    dilution: "—", infusion: "VO",
    calc: (w) => {
      if (w > 40) return [{ label: "> 40kg: dose fixa", value: "25-50 mg", freq: "1-2×/dia", sub: "CP 25mg", highlight: true }];
      return [
        { label: "2mg/kg/dia ÷ 4x (≤ 40kg)", value: `${Math.min(w*0.5,25).toFixed(0)} mg/dose`, freq: "6/6h", sub: `Max 25mg/dose`, highlight: false },
        { label: "Xarope 2mg/mL", value: `${(w/4).toFixed(1)} mL/dose`, freq: "6/6h", sub: "Regra: Peso/4 em mL/dose", highlight: true },
      ];
    },
    notes: "Sedante. Útil em prurido intenso e urticária. Regra: Peso/4 em mL/dose.",
  },
  {
    id: "difenidramina_ev", name: "Difenidramina EV/IM",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "Max 25mg/mL em SF0,9% ou SG5%",
    infusion: "10-15 min",
    calc: (w) => [
      { label: "1mg/kg/dose", value: `${Math.min(w*1,50).toFixed(0)} mg/dose`, freq: "6-8h", sub: "Max 50mg/dose", highlight: true },
    ],
    notes: "Anafilaxia, reações alérgicas graves EV. Correr diluído em 10-15min.",
  },
  {
    id: "prometazina", name: "Prometazina (Fenergan)",
    category: "antihistaminicos", color: "#8B5CF6", inputType: "weight",
    presentation: "FA 25mg/mL | CP 25mg",
    dilution: "Evitar via EV (necrose tecidual)",
    infusion: "IM preferencial",
    calc: (w) => [
      { label: "0,25-1mg/kg/dose (habitual 0,5mg/kg) — ≥ 2 anos", value: `${Math.min(w*0.5,25).toFixed(1)} mg/dose`, freq: "4-6h", sub: `Max 25mg/dose | ${(Math.min(w*0.5,25)/25).toFixed(2)}mL da amp (25mg/mL) IM`, highlight: true },
    ],
    notes: "≥ 2 anos. EVITAR via EV. Preferir IM ou VO. Sedante.",
  },

  // ══ TGI ═══════════════════════════════════
  {
    id: "ondansetrona", name: "Ondansetrona",
    category: "tgi", color: "#0EA5E9", inputType: "weight",
    presentation: "FA 2mg/mL | CP 4mg, 8mg | Sol Ondset 0,8mg/mL",
    dilution: "EV: push puro em 2-5 min",
    infusion: "2-5 min (push)",
    calc: (w) => {
      const oral = w < 15 ? Math.min(w*0.2,4) : w < 30 ? 4 : 8;
      const ev = Math.min(w*0.15,8);
      return [
        { label: "VO (por peso)", value: `${oral.toFixed(1)} mg/dose`, freq: "8/8h", sub: w < 15 ? `0,2mg/kg (<15kg)` : w < 30 ? "4mg fixo (15-30kg)" : "8mg fixo (>30kg)", highlight: false },
        { label: "EV (0,15-0,3mg/kg)", value: `${ev.toFixed(1)} mg/dose`, freq: "8/8h", sub: `Regra EV: 0,075 × ${w.toFixed(1)} = ${(0.075*w).toFixed(2)}mL da amp 2mg/mL — push puro 2-5min`, highlight: true },
      ];
    },
    notes: "≥ 3 meses. Pode repetir VO se vomitar em 15min. Max 16mg/dose EV.",
  },
  {
    id: "domperidona", name: "Domperidona (Motilium)",
    category: "tgi", color: "#0EA5E9", inputType: "weight",
    presentation: "Susp 1mg/mL | CP 10mg",
    dilution: "—", infusion: "VO",
    calc: (w) => w > 35
      ? [{ label: "> 35kg: dose fixa 10mg", value: "10 mg/dose", freq: "8/8h", sub: "1 comprimido", highlight: true }]
      : [{ label: "0,25mg/kg/dose (≤ 35kg)", value: `${Math.min(w*0.25,10).toFixed(2)} mg/dose`, freq: "8/8h", sub: `Max 1mg/kg/dia`, highlight: true }],
    notes: "Para refluxo e gastroparesia. Max 1mg/kg/dia. Não ultrapassar 30mg/dia.",
  },
  {
    id: "omeprazol", name: "Omeprazol VO/EV",
    category: "tgi", color: "#0EA5E9", inputType: "weight",
    presentation: "Caps 10-40mg | Losec Mups (diluível) | FA 40mg EV",
    dilution: "EV: SF0,9%", infusion: "20-30 min",
    calc: (w) => [
      { label: "1-2mg/kg/dia", value: `${w < 20 ? 10 : 20} mg/dia`, freq: "1-2×/dia", sub: `<20kg: 10mg/dia | >20kg: 20mg/dia | Max 40mg/dia`, highlight: true },
    ],
    notes: "<20kg: 10mg | >20kg: 20mg. Losec Mups pode ser diluído e dado via sonda.",
  },
  {
    id: "lactulose", name: "Lactulose (Lactulona)",
    category: "tgi", color: "#0EA5E9", inputType: "weight",
    presentation: "Xarope 667mg/mL | Sachê 10g/15mL",
    dilution: "—", infusion: "VO",
    calc: (w) => [
      { label: "Constipação (1-3mL/kg/dia)", value: `${Math.min(w*2,90).toFixed(0)} mL/dia`, freq: "1× ao dia (dividir se >30mL)", sub: "Ajustar para 1-2 evacuações/dia | Max 90mL/dia", highlight: true },
    ],
    notes: "A partir de 6 meses. 1× ao dia preferencial. Dividir dose se volume alto.",
  },

  // ══ BRONCODILATADORES ════════════════════
  {
    id: "salbutamol_spray", name: "Salbutamol Spray (Aerolin)",
    category: "broncodilatadores", color: "#6366F1", inputType: "weight",
    presentation: "100mcg/jato",
    dilution: "Usar com espaçador", infusion: "Inalatório",
    calc: (w) => [
      { label: "Resgate agudo — Peso/3 jatos", value: `${Math.min(Math.ceil(w/3),10)} jatos/dose`, freq: "20/20min (resgate agudo)", sub: "Min 2 — Max 10 jatos — SEMPRE com espaçador", highlight: true },
      { label: "Manutenção (pós-alta)", value: `${Math.max(2,Math.min(Math.ceil(w/3),10)-2)}-${Math.min(Math.ceil(w/3),10)} jatos/dose`, freq: "4-6h por 5 dias", sub: "Reduzir frequência após melhora clínica", highlight: false },
    ],
    notes: "Regra: Peso/3 jatos/dose (min 2, max 10). SEMPRE com espaçador para < 6-8 anos.",
  },
  {
    id: "ipratropio", name: "Ipratrópio NBZ (Atrovent)",
    category: "broncodilatadores", color: "#6366F1", inputType: "weight",
    presentation: "Sol inalatória 0,25mg/mL",
    dilution: "—", infusion: "Nebulização",
    calc: (w) => {
      const dose = w < 10 ? "10 gotas" : w < 20 ? "20 gotas" : "40 gotas";
      const sub = w < 10 ? "< 10kg" : w < 20 ? "10-20kg" : "> 20kg";
      return [{ label: `Dose por peso (${sub})`, value: dose, freq: "20/20min (emergência)", sub: "Intercalar com salbutamol | Mais indicado em crise grave", highlight: true }];
    },
    notes: "Spray: 4-8 jatos/dose. Indicado em emergência para evitar hospitalização.",
  },
  {
    id: "sulfato_magnesio", name: "Sulfato de Magnésio (Asma)",
    category: "broncodilatadores", color: "#6366F1", inputType: "weight",
    presentation: "MgSO4 50% (500mg/mL) | 10% (100mg/mL)",
    dilution: "Diluir em SF0,9%", infusion: "Sulfatinho 20 min | Sulfatão 4h",
    calc: (w) => [
      { label: "Sulfatinho — 50mg/kg (25-75) em 20 min", value: `${Math.min(w*50,2000).toFixed(0)} mg`, freq: "dose única", sub: `${(Math.min(w*50,2000)/500).toFixed(1)}mL da sol 50% | Max 2g`, highlight: true },
      { label: "Sulfatão — 200mg/kg em 4 horas (50mg/kg/h)", value: `${Math.min(w*200,8000).toFixed(0)} mg`, freq: "dose única em BIC", sub: "Diluir para 60mg/mL em SF0,9% | Max 8g", highlight: false },
      { label: "Antídoto se intoxicação", value: "Gluconato Ca 10% 0,5mL/kg IV lento", freq: "", sub: "Velocidade máx 0,5mL/kg/min", highlight: false },
    ],
    notes: "Crise muito grave após ≥ 2h de β2 sem resposta. Monitorizar: PA, FR, diurese.",
  },
  {
    id: "budesonida_nbz", name: "Budesonida NBZ (Pulmicort)",
    category: "broncodilatadores", color: "#6366F1", inputType: "weight",
    presentation: "0,25mg/mL e 0,5mg/mL",
    dilution: "Diluir em igual volume de SF0,9%", infusion: "Nebulização",
    calc: (_w) => [
      { label: "Crupe leve-moderado (2-4mg/dose)", value: "2-4 mg/dose", freq: "12/12h por 5 dias", sub: "Eficácia semelhante à dexametasona em casos leves-moderados", highlight: true },
    ],
    notes: "Alternativa à dexametasona no crupe. Dilui-se em igual volume de SF0,9%.",
  },

  // ══ ANTICONVULSIVANTES ════════════════════
  {
    id: "midazolam_crise", name: "Midazolam (Crise Convulsiva)",
    category: "anticonvulsivantes", color: "#EC4899", inputType: "weight",
    presentation: "FA 5mg/mL",
    dilution: "EV: diluir 1mL em 4mL AD → 1mg/mL",
    infusion: "EV push",
    calc: (w) => {
      const maxEV = w < 40 ? 5 : 10;
      const ev = Math.min(w*0.2, maxEV);
      const in_total = Math.min(w*0.25,7.5);
      return [
        { label: `EV (0,1-0,3mg/kg — habitual 0,2mg/kg) — Max ${maxEV}mg`, value: `${ev.toFixed(1)} mg`, freq: "Cada 5 min — máx 3 doses", sub: `Diluição 1:4 → ${ev.toFixed(1)}mL EV | Puro: ${(ev/5).toFixed(2)}mL`, highlight: true },
        { label: "Intranasal (0,2-0,3mg/kg) — sem acesso EV", value: `${in_total.toFixed(1)} mg total`, freq: "dose única", sub: `Puro (5mg/mL): ${(in_total/5/2).toFixed(2)}mL em CADA narina | Max 7,5mg`, highlight: false },
        { label: "IM (0,2-0,4mg/kg) — alternativa", value: `${Math.min(w*0.3,10).toFixed(1)} mg`, freq: "dose única", sub: `${(Math.min(w*0.3,10)/5).toFixed(2)}mL puro — preferir IN`, highlight: false },
      ];
    },
    notes: "1ª escolha > 3 meses no HIAS. Max 3 doses EV. A partir da 2ª dose: preparar para IOT.",
  },
  {
    id: "fenobarbital_ataque", name: "Fenobarbital EV (Ataque)",
    category: "anticonvulsivantes", color: "#EC4899", inputType: "weight",
    presentation: "FA 100mg/mL",
    dilution: "1mL em 9mL AD → 10mg/mL",
    infusion: "10 min (100mg/min)",
    calc: (w) => [
      { label: "Ataque EV/IM (15-20mg/kg)", value: `${Math.min(w*20,1000).toFixed(0)} mg`, freq: "dose inicial", sub: `${Math.min(w*2,100).toFixed(0)}mL da sol 10mg/mL | Max 1000mg`, highlight: true },
      { label: "Dose adicional (5-20mg/kg) — se falha após 5min", value: `${Math.min(w*5).toFixed(0)}–${Math.min(w*20,1000).toFixed(0)} mg`, freq: "após 5 min", sub: "Max acumulado: 30mg/kg", highlight: false },
      { label: "Manutenção (3-5mg/kg/dia)", value: `${Math.min(w*4,300).toFixed(0)} mg/dia`, freq: "24/24h", sub: "Iniciar 12h após ataque | Max 300mg/dia", highlight: false },
    ],
    notes: "1ª escolha < 3 meses. Início ação: 15-20min. Leva tempo para agir.",
  },
  {
    id: "fenitoina_ev", name: "Fenitoína EV (Ataque)",
    category: "anticonvulsivantes", color: "#EC4899", inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "1:4 → 10mg/mL — NUNCA em SG",
    infusion: "20-30 min (máx 50mg/min)",
    calc: (w) => [
      { label: "Ataque EV (20mg/kg)", value: `${Math.min(w*20,1000).toFixed(0)} mg`, freq: "dose inicial", sub: `${Math.min(w*2,100).toFixed(0)}mL (10mg/mL) em 20-30min | Max 1000mg`, highlight: true },
      { label: "Adicional (5mg/kg) — se não controlou", value: `${Math.min(w*5,250).toFixed(0)} mg`, freq: "pode repetir × 2", sub: "Max acumulado: 30mg/kg", highlight: false },
      { label: "Manutenção (5-10mg/kg/dia ÷ 3x)", value: `${Math.min((w*7/3),150).toFixed(0)} mg/dose`, freq: "8/8h", sub: "Iniciar 12h após ataque", highlight: false },
    ],
    notes: "Preferir para: convulsão focal, tumor SNC, TCE. NÃO diluir em SG. NÃO misturar com KCl.",
  },
  {
  id: "levetiracetam", name: "Levetiracetam (Keppra)",
  category: "anticonvulsivantes", color: "#EC4899", inputType: "weight",
  presentation: "Sol oral 100mg/mL | CP 250/500/750/1000mg | CP XR 500mg | Sol EV 100mg/mL",
  dilution: "EV: diluir dose em 100mL SF0,9% ou SG5%",
  infusion: "EV em 15 min",
  calc: (w) => {
    if (w <= 50) {
      const ini   = Math.min(w * 10, 500);
      const max_d = Math.min(w * 30, 1500);
      const ini_ml  = (ini  / 100).toFixed(2);
      const max_ml  = (max_d / 100).toFixed(2);
      return [
        { label: "VO — Dose inicial (10mg/kg/dose) — < 50kg",
          value: `${ini.toFixed(0)} mg/dose`,
          freq:  "12/12h",
          sub:   `Sol 100mg/mL: ${ini_ml}mL/dose | Regra: 0,1mL/kg/dose\n⚠ ≤ 25kg: preferir solução oral (não partir comprimido)`,
          highlight: true },
        { label: "VO — Dose máxima (30mg/kg/dose) — < 50kg",
          value: `${max_d.toFixed(0)} mg/dose`,
          freq:  "12/12h",
          sub:   `Sol 100mg/mL: ${max_ml}mL/dose | Aumentar 10mg/kg/dose a cada 2 semanas`,
          highlight: false },
        { label: "EV — Dose inicial (10mg/kg/dose) — < 50kg",
          value: `${ini.toFixed(0)} mg/dose EV`,
          freq:  "12/12h",
          sub:   `Diluir em 100mL SF0,9% — infundir em 15 min | Max 30mg/kg/dose`,
          highlight: false },
        { label: "1-6 meses — dose inicial (7mg/kg/dose)",
          value: `${Math.min(w * 7, 210).toFixed(0)} mg/dose`,
          freq:  "12/12h",
          sub:   `Sol 100mg/mL: ${(Math.min(w*7,210)/100).toFixed(2)}mL/dose (0,07mL/kg) | Max: 21mg/kg/dose`,
          highlight: false },
      ];
    } else {
      return [
        { label: "VO — Dose inicial (> 50kg / adolescente)",
          value: "500 mg/dose",
          freq:  "12/12h",
          sub:   "Progredir para 1.500mg/dose após 2 semanas | Incrementos de 500mg/dose a cada 2-4 sem | Max 1.500mg/dose",
          highlight: true },
        { label: "VO XR (liberação prolongada) — > 50kg",
          value: "1.000 mg/dia",
          freq:  "1× ao dia",
          sub:   "Iniciar 500mg/dia por 2 sem → 1.000mg/dia | Incrementos de 500mg/dia a cada 2 sem | Max 3.000mg/dia",
          highlight: false },
        { label: "EV — Dose adjuvante (> 50kg)",
          value: "500 mg/dose EV",
          freq:  "12/12h",
          sub:   "Diluir em 100mL SF0,9% — infundir em 15 min | Pode progredir até 1.500mg/dose | Incrementos 500mg a cada 2-4 sem",
          highlight: false },
      ];
    }
  },
  notes: "Monoterapia: ≥ 16 anos. Adjuvante: a partir de 1 mês. Ajuste para ClCr (ver Rfofos). Efeitos: irritabilidade, sintomas depressivos — especialmente em pediatria. Não partir comprimido XR. ≤ 25kg: solução oral preferencial.",
},
  {
    id: "diazepam_retal", name: "Diazepam (Retal / EV)",
    category: "anticonvulsivantes", color: "#EC4899", inputType: "weight",
    presentation: "FA 10mg/2mL (5mg/mL)",
    dilution: "EV: puro e lento",
    infusion: "EV lento",
    calc: (w) => [
      { label: "EV (0,2-0,4mg/kg)", value: `${Math.min(w*0.3,10).toFixed(1)} mg`, freq: "repetir em 5 min se necessário", sub: `${(Math.min(w*0.3,10)/5).toFixed(2)}mL puro EV lento | Max 10mg`, highlight: false },
      { label: "VIA RETAL (0,5-1mg/kg)", value: `${Math.min(w*0.75,20).toFixed(1)} mg`, freq: "repetir em 5 min se necessário", sub: "Max 20mg — alternativa sem acesso EV", highlight: true },
    ],
    notes: "NÃO usar IM (absorção errática). Via retal: alternativa sem acesso venoso.",
  },

  // ══ SEDAÇÃO / ANALGESIA ════════════════
  {
    id: "quetamina", name: "Quetamina (Sedação/ISR)",
    category: "sedativos", color: "#F97316", inputType: "weight",
    presentation: "FA 50mg/mL",
    dilution: "1mL + 4mL AD → 10mg/mL",
    infusion: "EV lento",
    calc: (w) => [
      { label: "Sedação procedimento (1-4mg/kg)", value: `${Math.min(w*2,100).toFixed(0)} mg`, freq: "dose única", sub: `${(Math.min(w*2,100)/10).toFixed(1)}mL (10mg/mL) EV lento | Max 100mg`, highlight: true },
      { label: "ISR — indução (1-2mg/kg)", value: `${Math.min(w*1.5,100).toFixed(0)} mg`, freq: "dose única bolus ISR", sub: "Preferir em asma, hipotenso, TCE", highlight: false },
    ],
    notes: "Analgesia + sedação sem depressão cardiorrespiratória. Atenção: laringoespasmo, alucinações, hipersecreção.",
  },
  {
    id: "midazolam_sed", name: "Midazolam (Sedação / ISR)",
    category: "sedativos", color: "#F97316", inputType: "weight",
    presentation: "FA 5mg/mL",
    dilution: "1mL + 4mL AD → 1mg/mL",
    infusion: "EV",
    calc: (w) => [
      { label: "Sedação procedimento (0,1-0,2mg/kg)", value: `${Math.min(w*0.15,5).toFixed(1)} mg`, freq: "dose única", sub: `${(Math.min(w*0.15,5)/1).toFixed(1)}mL (1mg/mL) | Max 5mg`, highlight: true },
      { label: "ISR — indução (0,2mg/kg)", value: `${Math.min(w*0.2,5).toFixed(1)} mg`, freq: "dose única", sub: "Preferir em paciente hemodinamicamente estável", highlight: false },
      { label: "Infusão contínua UTI", value: "0,1-0,6 mg/kg/h", freq: "BIC", sub: `Iniciar: ${(w*0.1).toFixed(1)}mg/h | Titular conforme sedação (RASS/SAS)`, highlight: false },
    ],
    notes: "Depressão respiratória e hipotensão. Sem efeito analgésico. 1ª escolha sedação UTI.",
  },
  {
    id: "fentanil_ev", name: "Fentanil EV",
    category: "sedativos", color: "#F97316", inputType: "weight",
    presentation: "FA 50mcg/mL",
    dilution: "Diluir 1mL + 4mL AD",
    infusion: "EV lento 3-5 min",
    calc: (w) => [
      { label: "Procedimento / ISR (1-5mcg/kg)", value: `${Math.min(w*2,100).toFixed(0)} mcg`, freq: "dose única", sub: `Regra: ${(w/5).toFixed(1)}mL EV lento | Max 100mcg — infundir em 3-5min (rigidez torácica)`, highlight: true },
      { label: "Infusão contínua UTI", value: "1-10 mcg/kg/h", freq: "BIC", sub: `Iniciar: ${(w*1).toFixed(0)}mcg/h`, highlight: false },
    ],
    notes: "Infundir LENTAMENTE (risco rigidez torácica em RN/lactentes). Antagonista: Naloxona.",
  },
];

// ─────────────────────────────────────────────
// EMERGENCY PROTOCOLS
// ─────────────────────────────────────────────
const EMERGENCIES = [
  {
  id: "cad", name: "Cetoacidose Diabética", emoji: "🩸", color: "#F59E0B",
  description: "CAD — Hiperglicemia + Acidose + Cetose",
  notes: "CRITÉRIOS: Glicemia >200 + pH <7,3 e/ou Bic <15 + Cetose. CLASSIFICAÇÃO: Leve pH 7,2-7,3 | Moderada pH 7,1-7,2 | Grave pH <7,1. MONITORAR: Dx 1/1h · SV + diurese + neurológico 1/1h · Gasometria + eletrólitos 2-4h · Cetonemia 2/2h. SUSPENDER BOMBA: pH >7,3 + HCO3 >18 + Glicemia <200 → 1h antes: insulina IM regular 0,05-0,1U/kg → pausar bomba → dieta.",
  drugs: (w) => [
    { order: 1, name: "SF 0,9% — Expansão 1ª fase (1ª hora)",          urgency: "IMEDIATO — antes de tudo",
      dose:  `${Math.min(w*20,500).toFixed(0)}–${Math.min(w*20,1000).toFixed(0)} mL bolus`,
      prep:  "SF 0,9% ou Ringer Lactato — 10-20mL/kg em 20-30 min. Reavaliar; repetir se necessário",
      freq:  "1-2 bolus na 1ª hora", max: "", highlight: true },
    { order: 2, name: "HV 2ª fase — repor perdas em 24-48h",            urgency: "Após expansão",
      dose:  (() => {
        const ch = w <= 10 ? w*100 : w <= 20 ? 1000+(w-10)*50 : 1500+(w-20)*20;
        const perda_mod = Math.round(w*70); // 7% moderada (referência)
        const total = Math.round(ch + perda_mod);
        return `~${total} mL/dia (Holliday + 7% perda)`;
      })(),
      prep:  "CAD leve: +5% peso · Moderada: +7% peso · Grave: +10% peso. Dividir reposição em 24-48h. Se Dx>250: SF0,9% puro. Se Dx<250: SGF 1:1. Se Dx<150: SG10%+NaCl",
      freq:  "BIC contínua — ajustar conforme Dx seriado", max: "", highlight: false },
    { order: 3, name: "Potássio — reposição na HV",                     urgency: "ANTES da insulina",
      dose:  "40 mEq/L na solução",
      prep:  "K ≥3,5 e <5,5: acrescentar 40mEq/L. K <3,5: corrigir primeiro (0,5mEq/kg/h) + ATRASAR insulina 1h. K ≥5,5: não repor — checar diurese",
      freq:  "Reavaliar K + gasometria a cada 2-4h", max: "Usar K corrigido pelo pH: cada 0,1 de pH abaixo de 7,3 reduz K em 0,6mEq/L", highlight: false },
    { order: 4, name: "Insulina Regular — Bomba EV contínua",           urgency: "Iniciar 1-2h após expansão + K corrigido",
      dose:  `0,1 UI/kg/h = ${(w*0.1).toFixed(1)} mL/h`,
      prep:  `Preparar: Insulina Regular 50UI + SF0,9% 500mL → 0,1UI/mL. Fazer ${(w*0.1).toFixed(1)}mL/h (= 0,1UI/kg/h = peso em mL/h)`,
      freq:  `Dx >250 → ${w.toFixed(0)}mL/h | Dx <250 ou queda >100mg/dL/h → ${(w/2).toFixed(1)}mL/h (metade)`, max: "Trocar solução + equipo a cada 6h. NÃO suspender até resolução bioquímica", highlight: true },
    { order: 5, name: "Insulina IM — transição para SC",                urgency: "Ao resolver CAD",
      dose:  `${Math.min(w*0.05,5).toFixed(2)}–${Math.min(w*0.1,10).toFixed(2)} UI Regular SC`,
      prep:  "Fazer 1h ANTES de pausar a bomba. Após: iniciar dieta + NPH+Regular conforme esquema de manutenção",
      freq:  "Dose única de transição", max: "Manutenção: Lactente 0,3-0,5 | Criança 0,5-0,7 | Púbere 0,8-2 UI/kg/dia", highlight: false },
  ],
},
  {
    id: "anafilaxia", name: "Anafilaxia", emoji: "⚡", color: "#EF4444",
    description: "Reação alérgica grave sistêmica",
    notes: "1. Adrenalina IM IMEDIATA — decúbito c/ MMII elevados — 2. O₂ alto fluxo — 3. Acesso venoso — 4. SF 0,9% 20mL/kg se hipotensão — 5. Monitorizar SpO₂, PA, FC — 6. Observação mínima 4-6h (risco de resposta bifásica)",
    drugs: (w) => [
      { order: 1, name: "Adrenalina 1:1000 IM — vasto lateral",    urgency: "PRIMEIRA LINHA — IMEDIATO",
        dose:  `${Math.min(w*0.01,0.5).toFixed(2)} mg (${Math.min(w*0.01,0.5).toFixed(2)} mL)`,
        prep:  "Solução pura 1mg/mL (1:1000) — IM no músculo vasto lateral",
        freq:  "Repetir a cada 5-15 min — máx 3×", max: "Max 0,5mg (0,5mL)", highlight: true },
      { order: 2, name: "Hidrocortisona EV",                       urgency: "2ª linha — após adrenalina",
        dose:  `${Math.min(w*10,200).toFixed(0)} mg`,
        prep:  "FA 100mg/mL — diluir max 5mg/mL — infundir em 1h",
        freq:  "Dose única de ataque", max: "Max 200mg", highlight: false },
      { order: 3, name: "Difenidramina EV",                        urgency: "Adjuvante",
        dose:  `${Math.min(w*1,50).toFixed(0)} mg`,
        prep:  "FA 50mg/mL — diluir em SF0,9% — correr em 10-15min",
        freq:  "6-8h conforme necessidade", max: "Max 50mg/dose", highlight: false },
      { order: 4, name: "Prednisolona VO (alta hospitalar)",       urgency: "Continuação",
        dose:  `${Math.min(w*1,60).toFixed(0)} mg/dia`,
        prep:  `Sol 3mg/mL — ${(Math.min(w,60)/3).toFixed(1)}mL/dia`,
        freq:  "1-2× ao dia por 3-5 dias", max: "Max 60mg/dia", highlight: false },
    ],
  },
  {
    id: "asma", name: "Asma / Broncoespasmo", emoji: "🫁", color: "#6366F1",
    description: "Crise asmática aguda",
    notes: "O₂ se SpO₂ < 95% — Preferir corticoide VO (mesma eficácia que EV) — Sulfato de Magnésio se má resposta após 2h de β2 — Não há indicação de adrenalina nebulizada na asma (apenas no crupe) — Terbutalina SC/IM como resgate adicional em crise grave",
    drugs: (w) => [
      { order: 1, name: "Salbutamol Spray (Aerolin) c/ espaçador",   urgency: "PRIMEIRA LINHA",
        dose:  `${Math.min(Math.ceil(w/3),10)} jatos`,
        prep:  "100mcg/jato — SEMPRE com espaçador — Regra: Peso/3 jatos (min 2, max 10)",
        freq:  "A cada 20min nas 1ª 2h", max: "Max 10 jatos/dose", highlight: true },
      { order: 2, name: "Ipratrópio NBZ — emergência (grave)",       urgency: "Intercalar com salbutamol",
        dose:  w < 10 ? "10 gotas" : w < 20 ? "20 gotas" : "40 gotas",
        prep:  "Atrovent 0,25mg/mL — nebulizar",
        freq:  "20/20min — máx 3 doses", max: "", highlight: false },
      { order: 3, name: "Prednisolona VO (preferencial)",            urgency: "Corticoide",
        dose:  `${Math.min(w*1,40).toFixed(0)} mg/dia`,
        prep:  `Sol 3mg/mL — ${(Math.min(w,40)/3).toFixed(1)}mL/dia`,
        freq:  "1× ao dia × 3-5 dias", max: w<=2 ? "Max 20mg" : w<=5 ? "Max 30mg" : w<=11 ? "Max 40mg" : "Max 50mg (GINA)", highlight: false },
      { order: 4, name: "Sulfato de Magnésio EV — crise grave",      urgency: "Má resposta após 2h de β2",
        dose:  `${Math.min(w*50,2000).toFixed(0)} mg em 20 min`,
        prep:  `MgSO4 50% → ${(Math.min(w*50,2000)/500).toFixed(1)}mL + SF0,9% para 60mg/mL`,
        freq:  "Dose única", max: "Max 2g", highlight: false },
    ],
  },
  {
    id: "convulsao", name: "Crise Convulsiva (> 3m)", emoji: "🧠", color: "#EC4899",
    description: "Estado de mal convulsivo — Protocolo HIAS",
    notes: "Sequência >3m: BZD (até 3× com 5min) → Fenitoína → Fenobarbital → Infusão contínua (Midazolam/Propofol/Quetamina) — Checar: glicemia, eletrólitos, temperatura, acesso venoso — 2ª dose BZD: preparar para IOT",
    drugs: (w) => [
      { order: 1, name: "Midazolam EV (1ª escolha > 3m)",       urgency: "PRIMEIRA LINHA — dose 1",
        dose:  `${Math.min(w*0.2,w<40?5:10).toFixed(1)} mg EV`,
        prep:  `Diluição 1:4 → 1mg/mL. Fazer ${Math.min(w*0.2,w<40?5:10).toFixed(1)}mL EV push`,
        freq:  "Cada 5 min — máx 3 doses", max: "<40kg: 5mg | >40kg: 10mg", highlight: true },
      { order: 2, name: "Midazolam IN — sem acesso EV",         urgency: "Alternativa — sem acesso venoso",
        dose:  `${Math.min(w*0.25,7.5).toFixed(1)} mg total IN`,
        prep:  `FA puro (5mg/mL): ${(Math.min(w*0.25,7.5)/5/2).toFixed(3)}mL em CADA narina`,
        freq:  "Dose única", max: "Max 7,5mg total", highlight: false },
      { order: 3, name: "Fenitoína EV (2ª linha)",              urgency: "Após BZD falhar",
        dose:  `${Math.min(w*20,1000).toFixed(0)} mg EV`,
        prep:  `Diluir 1:4 → 10mg/mL. ${Math.min(w*2,100).toFixed(0)}mL em 20-30min. NÃO em SG`,
        freq:  "Dose única — repetir 5mg/kg se necessário", max: "Max 1000mg / acumulado 30mg/kg", highlight: false },
      { order: 4, name: "Fenobarbital EV (1ª linha < 3m)",      urgency: "< 3 meses OU 3ª linha",
        dose:  `${Math.min(w*20,400).toFixed(0)} mg EV`,
        prep:  `Diluir 1:9 → 10mg/mL. ${Math.min(w*2,40).toFixed(0)}mL em 10min`,
        freq:  "Pode repetir 5-20mg/kg — Max 30mg/kg", max: "Max 30mg/kg total", highlight: false },
    ],
  },
  {
    id: "hipoglicemia", name: "Hipoglicemia Grave", emoji: "🍬", color: "#F59E0B",
    description: "DX < 70 (criança) ou < 60 (RN) com sintomas",
    notes: "Consciente: 15g carboidratos VO (3 sachês mel — NÃO <1 ano, 150mL suco, 3-4 balas). Inconsciente/sem acesso: Glucagon IM. Repetir DX em 15-20 min após correção. Manter VIG de manutenção pós-correção.",
    drugs: (w) => [
      { order: 1, name: "Glicose 10% IV Bolus — criança",        urgency: "PRIMEIRA LINHA — acesso venoso",
        dose:  `${(w*7.5).toFixed(0)} mL de SG10% (0,5-1g/kg)`,
        prep:  "SG 10% — 5-10mL/kg EV bolus. Alternativa: SG25% 2-4mL/kg (= SG50%+AD 1:1)",
        freq:  "Repetir DX em 15-20 min", max: "", highlight: true },
      { order: 2, name: "Glicose 10% IV Bolus — RN",            urgency: "RN — ACESSO venoso",
        dose:  `${(w*2).toFixed(0)} mL de SG10%`,
        prep:  "2mL/kg SG10% | ou 4mL/kg SG5% EV bolus",
        freq:  "Repetir DX em 15-20 min", max: "", highlight: false },
      { order: 3, name: "Glucagon IM — sem acesso venoso",       urgency: "Sem acesso venoso",
        dose:  w < 25 ? "0,5 mg IM" : "1 mg IM",
        prep:  "<25kg: 0,5mg | ≥25kg: 1mg — efeito transitório",
        freq:  "Repetir DX 15 min após (efeito dura 15-20min)", max: "Max 1mg", highlight: false },
      { order: 4, name: "VIG de manutenção após correção",       urgency: "Manutenção pós-crise",
        dose:  "VIG 4-6 mg/kg/min",
        prep:  `GG = VIG × ${w} × 1,44 = ${(4*w*1.44).toFixed(1)}g/dia (VIG 4)`,
        freq:  "BIC contínua — ajustar conforme DX seriado", max: "", highlight: false },
    ],
  },
  {
    id: "crupe", name: "Crupe (Estridor)", emoji: "🗣️", color: "#F97316",
    description: "Laringotraqueobronquite viral — Westley",
    notes: "O₂ umedecido — Manter calma (agitação piora o estridor) — NÃO examinar orofaringe se suspeita de epiglotite — Dexametasona é pilar do tratamento — Adrenalina nebulizada tem efeito transitório (max 2h): observar por 2-4h antes de alta",
    drugs: (w) => [
      { order: 1, name: "Dexametasona VO/IM/EV — dose única",    urgency: "PRIMEIRA LINHA",
        dose:  `${Math.min(w*0.6,10).toFixed(2)} mg`,
        prep:  "0,15-0,6mg/kg — PREFERIR VO (elixir 0,1mg/mL ou cp 4mg) — Max 10mg",
        freq:  "Dose única", max: "Max 10mg", highlight: true },
      { order: 2, name: "Adrenalina Nebulizada 1:1000 — grave",  urgency: "Crupe grave / estridor em repouso",
        dose:  `${Math.min(w/2,5).toFixed(1)} mL de adrenalina 1:1000`,
        prep:  `1:1000 (1mg/mL) puro OU + igual volume SF — nebulizar`,
        freq:  "Observar por 2-4h (efeito rebote possível)", max: "Max 5mL", highlight: false },
      { order: 3, name: "Budesonida NBZ — alternativa leve-mod", urgency: "Alternativa",
        dose:  "2-4 mg/dose",
        prep:  "Pulmicort 0,25 ou 0,5mg/mL + igual vol SF — nebulizar",
        freq:  "12/12h por 5 dias", max: "Eficácia similar à dexametasona leve-mod", highlight: false },
    ],
  },
  {
    id: "pcr", name: "PCR — PALS", emoji: "💓", color: "#EF4444",
    description: "Parada Cardiorrespiratória — Protocolo PALS",
    notes: "Compressões de qualidade (1/3 diâmetro AP) — 100-120/min — Mínima interrupção — Desfibrilação 2-4J/kg (FV/TV) — Acesso IO se sem EV em 90s — 9Hs e Ts: Hipóxia, Hipovolemia, Hipotermia, H⁺ (acidose), Hiper/Hipocalemia, Hipoglicemia — Tensão pneumotórax, Tamponamento, TEP, Tóxicos",
    drugs: (w) => [
      { order: 1, name: "Adrenalina EV/IO (sol 1:10.000)",       urgency: "A cada 3-5 min",
        dose:  `${Math.min(w*0.01,1).toFixed(2)} mg (${Math.min(w*0.1,10).toFixed(1)} mL)`,
        prep:  "1:10.000 = 0,1mg/mL. Fazer 0,1mL/kg EV/IO. Se só 1:1000: diluir 1mL + 9mL SF",
        freq:  "A cada 3-5 minutos", max: "Max 1mg/dose", highlight: true },
      { order: 2, name: "Adrenalina ET — se sem EV/IO",          urgency: "Endotraqueal — menos eficaz",
        dose:  `${Math.min(w*0.1,2.5).toFixed(2)} mg ET`,
        prep:  "Dose 10× maior. Usar sol 1:1000 pura — seguir com 5 ventilações",
        freq:  "A cada 3-5 minutos", max: "Trocar para EV/IO assim que possível", highlight: false },
      { order: 3, name: "Amiodarona (FV/TV refratária — 3ª DC)", urgency: "Choque refratário",
        dose:  `${Math.min(w*5,300).toFixed(0)} mg EV/IO`,
        prep:  "5mg/kg em bolus — pode repetir × 2 (após 5ª desfibrilação)",
        freq:  "", max: "Max 300mg/dose | Max 15mg/kg total", highlight: false },
      { order: 4, name: "Bicarbonato 8,4% — acidose grave",      urgency: "PCR prolongada / acidose documentada",
        dose:  `${Math.min(w,50).toFixed(0)} mEq (${Math.min(w,50).toFixed(0)} mL sol 8,4%)`,
        prep:  "BicNa 8,4% = 1mEq/mL — Não na mesma via que Ca²⁺",
        freq:  "Dose única — reavaliar gasometria", max: "Max 50mEq", highlight: false },
    ],
  },
  {
    id: "hipercalemia", name: "Hipercalemia Grave", emoji: "⚗️", color: "#8B5CF6",
    description: "K ≥ 6,5 mEq/L OU alteração no ECG",
    notes: "ECG OBRIGATÓRIO. Progressão: Onda T em tenda → alargamento QRS → perda onda P → sine waves → FV. Combinar medidas. Se hipercalemia leve/moderada (K<6,5): Salbutamol + resina de troca + furosemida. Diálise se refratário.",
    drugs: (w) => [
      { order: 1, name: "Gluconato de Cálcio 10% EV — se ECG alterado", urgency: "IMEDIATO se alteração ECG",
        dose:  `${Math.min(w*0.5,20).toFixed(1)} mL (${Math.min(w*0.5,20).toFixed(1)} mEq)`,
        prep:  "GluCa 10% (9,8mg Ca/mL) — EV lento. Velocidade máx 0,5mL/kg/min",
        freq:  "Pode repetir se ECG não normalizar", max: "Max 20mL — monitorizar FC durante infusão", highlight: true },
      { order: 2, name: "Bicarbonato 8,4% EV — desloca K intracelular", urgency: "Em 10-15 min",
        dose:  `${Math.min(w,50).toFixed(0)} mL (${Math.min(w,50).toFixed(0)} mEq)`,
        prep:  "BicNa 8,4% (1mEq/mL) — 1mEq/kg em 10-15min. Não usar em SF",
        freq:  "Dose única", max: "Max 50mEq", highlight: false },
      { order: 3, name: "Glicoinsulina EV — desloca K intracelular",    urgency: "Se K persiste > 6",
        dose:  `Insulina Regular ${Math.min(w*0.1,10).toFixed(1)} UI + Glicose ${(w*0.5).toFixed(0)}g`,
        prep:  w < 5 ? `SG10% ${(w*5).toFixed(0)}mL` : `SG25% ${Math.min(w*2,50).toFixed(0)}mL (max 25g)`,
        freq:  "1h após estabilizador membrana", max: "Insulina max 10UI — Monitorizar glicemia 30/30min", highlight: false },
      { order: 4, name: "Salbutamol Spray — adjuvante rápido",          urgency: "Medida adjuvante",
        dose:  "6-10 puffs",
        prep:  "100mcg/jato com espaçador — efeito em 15-30min",
        freq:  "Dose única", max: "", highlight: false },
    ],
  },
  {
    id: "isr", name: "Intubação — ISR", emoji: "😴", color: "#0EA5E9",
    description: "Intubação Orotraqueal em Sequência Rápida — HIAS",
    notes: "9 PASSOS: (1) Prep material — (2) Pré-O₂ 2-5min — (3) Pré-medicação — (4) Analgesia — (5) Sedação — (6) Posicionamento — (7) BNM — (8) Intubação — (9) Checar + Rx. TUBO: (Idade/4)+4 sem cuff | (Idade/4)+3,5 com cuff. Fixação: Idade+4cm ou tubo×3. Coxim escapular (<1a) ou occipital (>1a).",
    drugs: (w) => [
      { order: 1, name: "Atropina (pré-med) — < 1 ano, succinilcolina < 5a",   urgency: "Opcional — 3min antes",
        dose:  `${Math.max(0.1,Math.min(w*0.02,1)).toFixed(2)} mg EV`,
        prep:  "FA 0,25 ou 0,5mg/mL | Min 0,1mg | Max 1mg",
        freq:  "Dose única", max: "Max 1mg", highlight: false },
      { order: 2, name: "Fentanil — analgesia (3min antes)",              urgency: "Analgesia pré-IOT",
        dose:  `${Math.min(w*2,100).toFixed(0)} mcg EV LENTO`,
        prep:  `FA 50mcg/mL. Diluir 1+4mL AD. Regra: Peso/5 = ${(w/5).toFixed(1)}mL. Infundir 3-5min`,
        freq:  "Dose única", max: "Max 100mcg — infundir LENTO (rigidez torácica)", highlight: false },
      { order: 3, name: "Quetamina (sedação) — asma, hipotenso, TCE",    urgency: "Sedação de escolha",
        dose:  `${Math.min(w*2,100).toFixed(0)} mg EV`,
        prep:  `FA 50mg/mL. Diluir 1+4mL → 10mg/mL. Fazer ${(Math.min(w*2,100)/10).toFixed(1)}mL`,
        freq:  "Dose única — bolus rápido", max: "Max 100mg. Alt: Midazolam 0,2mg/kg se estável", highlight: true },
      { order: 4, name: "Succinilcolina — BNM 1ª linha",                 urgency: "BNM despolarizante",
        dose:  `${Math.min(w < 0.5 ? w*2.5*1000 : w*1.5, 150).toFixed(0)} mg EV`,
        prep:  `FA 50mg/mL. Diluir 1+9mL → 5mg/mL. Fazer ${(Math.min(w*1.5,150)/5).toFixed(1)}mL`,
        freq:  "Bolus rápido — intubar após fasciculações", max: "⚠ CONTRAINDICADA: distrofias, queimaduras, politrauma, hipercalemia, HIC relativa", highlight: false },
      { order: 5, name: "Rocurônio — alternativa se succinilcolina CI",   urgency: "BNM não despolarizante",
        dose:  `${Math.min(w*1,100).toFixed(0)} mg EV`,
        prep:  "FA 10mg/mL — pode ser feito puro — 1mg/kg",
        freq:  "Efeito em 60-90s — duração 30-60min", max: "Max 100mg. Necessita VPP se IOT falha", highlight: false },
    ],
  },
  {
    id: "expansao", name: "Choque / Expansão Volêmica", emoji: "💧", color: "#10B981",
    description: "Choque circulatório — Sepse — PALS",
    notes: "Reconhecer: taquicardia + TEC >3s + pulsos finos + hipotensão (sinal tardio). POCUS orienta tipo de choque. Antibiótico APÓS hemoculturas (2 sítios). Adrenalina IV periférico ou IO se choque refratário a fluido. Considerar hidrocortisona 50mg/m² se choque refratário a catecolaminas.",
    drugs: (w) => [
      { order: 1, name: "SF 0,9% ou Ringer Lactato — expansão",   urgency: "PRIMEIRA LINHA",
        dose:  `${(w*20).toFixed(0)} mL bolus em 20-30 min`,
        prep:  "SF 0,9% ou Ringer Lactato — bolus 20mL/kg",
        freq:  "Reavaliar após cada bolus — repetir se necessário", max: "Sem UTI: máx 40mL/kg | Com UTI: máx 60mL/kg", highlight: true },
      { order: 2, name: "Adrenalina IV periférico — choque refratário", urgency: "Se sem resposta à expansão",
        dose:  `Iniciar: ${(w*0.05).toFixed(3)} mcg/kg/min`,
        prep:  "Preparar BIC. Escalar até 0,3mcg/kg/min. Preferir via central >0,3mcg/kg/min",
        freq:  "BIC contínua — titular por resposta", max: "", highlight: false },
      { order: 3, name: "ATB empírico — Sepse",                   urgency: "Choque séptico < 1h | Sepse < 3h",
        dose:  `Amp ${Math.min(w*50,2000).toFixed(0)}mg + Genta ${Math.min(w*5,500).toFixed(0)}mg`,
        prep:  "2 hemoculturas de sítios diferentes ANTES dos ATBs. AMP 100-200mg/kg/dia ÷4x | GENTA 5mg/kg 1× EV",
        freq:  "Iniciar imediatamente após culturas", max: "Ajustar conforme foco e epidemiologia local", highlight: false },
    ],
  },
];

// ─────────────────────────────────────────────
// STYLES HELPERS
// ─────────────────────────────────────────────
const inp = {
  background: "#080d18", border: `1px solid ${BORDER2}`,
  color: "#e2e8f0", padding: "7px 12px", borderRadius: 5,
  fontSize: 14, fontFamily: "monospace", outline: "none",
  boxSizing: "border-box",
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function PedCalc() {
  const navigate = useNavigate();
  const [tab, setTab]         = useState("drugs");
  const [category, setCat]    = useState("todos");
  const [selDrug, setSelDrug] = useState(null);
  const [weight, setWeight]   = useState("");
  const [ageYrs, setAgeYrs]   = useState("");
  const [selEm, setSelEm]     = useState(null);
  const [emW, setEmW]         = useState("");
  const [search, setSearch]   = useState("");

  const visibleDrugs = useMemo(() =>
    DRUGS.filter(d =>
      (category === "todos" || d.category === category) &&
      d.name.toLowerCase().includes(search.toLowerCase())
    ), [category, search]);

  const drugResults = useMemo(() => {
    if (!selDrug) return null;
    const v = parseFloat(selDrug.inputType === "weight" ? weight : ageYrs);
    if (!v || v <= 0) return null;
    return selDrug.calc(v);
  }, [selDrug, weight, ageYrs]);

  const emResults = useMemo(() => {
    if (!selEm) return null;
    const w = parseFloat(emW);
    if (!w || w <= 0) return null;
    return selEm.drugs(w);
  }, [selEm, emW]);

  const catColor = DRUG_CATEGORIES.find(c => c.id === (selDrug?.category || "todos"))?.color || "#64748b";

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Palatino Linotype','Book Antiqua',Palatino,serif", color: "#dde3f0", display: "flex", flexDirection: "column", fontSize: 13 }}>

      {/* ── Voltar ─────────────────────────── */}
      <button onClick={() => navigate("/")} style={{ background:"transparent", border:`1px solid ${BORDER2}`, color:"#64748b", padding:"6px 14px", borderRadius:6, cursor:"pointer", fontFamily:"monospace", fontSize:12, width:"fit-content", margin:"14px 0 0 20px", display:"inline-flex", alignItems:"center", gap:5 }}>
        ← MedPanel
      </button>

      {/* ── Header ─────────────────────────── */}
      <div style={{ background:BG2, borderBottom:`1px solid ${BORDER}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#374151", fontFamily:"monospace", textTransform:"uppercase" }}>Pediatria · HIAS Rfofos 2025</div>
          <div style={{ fontSize:18, fontWeight:400, color:"#f1f5f9", marginTop:2 }}>Calculadora de Doses Pediátricas</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["drugs","💊 Medicações","#0EA5E9"],["emergency","🚨 Emergências","#EF4444"]].map(([t,label,c]) => (
            <button key={t} onClick={() => setTab(t)} style={{ background:tab===t?`${c}18`:"transparent", border:`1px solid ${tab===t?c+"44":BORDER2}`, color:tab===t?c:"#4b5563", padding:"7px 18px", borderRadius:5, cursor:"pointer", fontFamily:"monospace", fontSize:11, letterSpacing:"0.05em" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TAB: MEDICAÇÕES
      ═══════════════════════════════════════════ */}
      {tab === "drugs" && (
        <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

          {/* ─ Sidebar categorias ─ */}
          <div style={{ width:190, background:BG2, borderRight:`1px solid ${BORDER}`, padding:"8px 0", flexShrink:0, overflowY:"auto" }}>
            <div style={{ padding:"8px 14px", fontSize:9, color:"#374151", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase" }}>Categoria</div>
            {DRUG_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { setCat(cat.id); setSelDrug(null); }} style={{ width:"100%", background:category===cat.id?`${cat.color}15`:"transparent", border:"none", borderLeft:`2px solid ${category===cat.id?cat.color:"transparent"}`, color:category===cat.id?"#f1f5f9":"#4b5563", padding:"8px 14px", cursor:"pointer", textAlign:"left", fontSize:11, fontFamily:"monospace", transition:"all 0.12s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:category===cat.id?cat.color:"#1f2937", flexShrink:0 }}/>
                  {cat.name}
                </div>
              </button>
            ))}
          </div>

          {/* ─ Lista de medicamentos ─ */}
          <div style={{ width:210, borderRight:`1px solid ${BORDER}`, background:BG2, overflowY:"auto" }}>
            <div style={{ padding:"10px 12px", borderBottom:`1px solid ${BORDER}` }}>
              <input style={{ ...inp, width:"100%", fontSize:12 }} placeholder="Buscar medicação..." value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            {visibleDrugs.length === 0 && (
              <div style={{ padding:"16px 14px", color:"#374151", fontFamily:"monospace", fontSize:11 }}>Nenhum resultado</div>
            )}
            {visibleDrugs.map(drug => (
              <button key={drug.id} onClick={() => { setSelDrug(drug); setWeight(""); setAgeYrs(""); }} style={{ width:"100%", background:selDrug?.id===drug.id?`${drug.color}12`:"transparent", border:"none", borderLeft:`2px solid ${selDrug?.id===drug.id?drug.color:"transparent"}`, color:selDrug?.id===drug.id?"#e2e8f0":"#6b7280", padding:"10px 14px", cursor:"pointer", textAlign:"left", fontSize:12, fontFamily:"monospace", transition:"all 0.12s", borderBottom:`1px solid ${BORDER}` }}>
                <div style={{ color:selDrug?.id===drug.id?"#e2e8f0":"#9ca3af", marginBottom:2 }}>{drug.name}</div>
                <div style={{ fontSize:10, color:"#374151" }}>{drug.infusion}</div>
              </button>
            ))}
          </div>

          {/* ─ Painel calculadora ─ */}
          <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
            {!selDrug ? (
              <div style={{ color:"#1f2937", fontFamily:"monospace", fontSize:12, paddingTop:50, textAlign:"center" }}>← Selecione uma medicação para calcular a dose</div>
            ) : (
              <>
                {/* cabeçalho */}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, paddingBottom:14, borderBottom:`1px solid ${catColor}22` }}>
                  <div style={{ background:`${catColor}18`, border:`1px solid ${catColor}44`, color:catColor, padding:"3px 12px", borderRadius:4, fontSize:9, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                    {DRUG_CATEGORIES.find(c=>c.id===selDrug.category)?.name}
                  </div>
                  <div style={{ fontSize:16, color:"#e2e8f0" }}>{selDrug.name}</div>
                </div>

                {/* info farmacológica */}
                <div style={{ background:BG3, border:`1px solid ${BORDER2}`, borderRadius:6, padding:"12px 16px", marginBottom:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[["Apresentação", selDrug.presentation], ["Diluição / Via / Tempo", `${selDrug.dilution} ${selDrug.infusion ? "· "+selDrug.infusion : ""}`]].map(([l,v]) => (
                    <div key={l}>
                      <div style={{ fontSize:9, color:"#374151", fontFamily:"monospace", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>{l}</div>
                      <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.6 }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* input peso / idade */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:10, color:"#4b5563", fontFamily:"monospace", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>
                    {selDrug.inputType === "weight" ? "Peso da Criança (kg)" : "Idade da Criança (anos)"}
                  </div>
                  {selDrug.inputType === "weight" ? (
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                      {[3,5,8,10,15,20,25,30,40,50].map(v => (
                        <button key={v} onClick={() => setWeight(String(v))} style={{ background:parseFloat(weight)===v?`${catColor}20`:BG3, border:`1px solid ${parseFloat(weight)===v?catColor+"44":BORDER2}`, color:parseFloat(weight)===v?catColor:"#4b5563", padding:"4px 10px", borderRadius:4, cursor:"pointer", fontSize:11, fontFamily:"monospace" }}>
                          {v}kg
                        </button>
                      ))}
                      <input style={{ ...inp, width:90 }} type="number" placeholder="outro" value={weight} onChange={e => setWeight(e.target.value)} min="0.5" max="100" step="0.1"/>
                      <span style={{ fontSize:12, color:"#4b5563" }}>kg</span>
                    </div>
                  ) : (
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                      {[0.5,1,2,3,4,5,6,8,10,12,15,18].map(v => (
                        <button key={v} onClick={() => setAgeYrs(String(v))} style={{ background:parseFloat(ageYrs)===v?`${catColor}20`:BG3, border:`1px solid ${parseFloat(ageYrs)===v?catColor+"44":BORDER2}`, color:parseFloat(ageYrs)===v?catColor:"#4b5563", padding:"4px 10px", borderRadius:4, cursor:"pointer", fontSize:11, fontFamily:"monospace" }}>
                          {v<1 ? `${v*12}m` : `${v}a`}
                        </button>
                      ))}
                      <input style={{ ...inp, width:90 }} type="number" placeholder="outro" value={ageYrs} onChange={e => setAgeYrs(e.target.value)} min="0" max="18" step="0.25"/>
                    </div>
                  )}
                </div>

                {/* resultados */}
                {drugResults ? (
                  <>
                    <div style={{ fontSize:10, color:"#374151", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>Dose Calculada</div>
                    {drugResults.map((r,i) => (
                      <div key={i} style={{ background:r.highlight?`${catColor}0e`:BG3, border:`1px solid ${r.highlight?catColor+"33":BORDER}`, borderLeft:`3px solid ${r.highlight?catColor:"#1f2937"}`, borderRadius:6, padding:"12px 16px", marginBottom:10 }}>
                        <div style={{ fontSize:10, fontFamily:"monospace", color:r.highlight?catColor:"#4b5563", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{r.label}</div>
                        <div style={{ fontSize:22, fontWeight:500, color:r.highlight?"#f1f5f9":"#e2e8f0", marginBottom:r.freq?4:0 }}>{r.value}</div>
                        {r.freq && <div style={{ fontSize:11, color:catColor, fontFamily:"monospace", marginBottom:r.sub?4:0 }}>⏱ {r.freq}</div>}
                        {r.sub  && <div style={{ fontSize:11, color:"#64748b", lineHeight:1.7, marginTop:4 }}>{r.sub}</div>}
                      </div>
                    ))}
                    {selDrug.notes && (
                      <div style={{ background:"#0a0f1a", border:`1px solid ${BORDER2}`, borderLeft:`3px solid ${catColor}`, borderRadius:6, padding:"10px 14px", marginTop:6 }}>
                        <div style={{ fontSize:9, color:catColor, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>🔬 Observações</div>
                        <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.75 }}>{selDrug.notes}</div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color:"#1f2937", fontSize:12, fontFamily:"monospace", marginTop:8 }}>
                    {selDrug.inputType === "weight" && weight && parseFloat(weight) <= 0
                      ? "⚠ Peso inválido"
                      : `↑ Informe o ${selDrug.inputType === "weight" ? "peso" : "idade"} para calcular a dose`}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB: EMERGÊNCIAS
      ═══════════════════════════════════════════ */}
      {tab === "emergency" && (
        <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

          {/* ─ Lista emergências ─ */}
          <div style={{ width:210, background:BG2, borderRight:`1px solid ${BORDER}`, overflowY:"auto" }}>
            <div style={{ padding:"8px 14px", fontSize:9, color:"#374151", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase" }}>Protocolos</div>
            {EMERGENCIES.map(em => (
              <button key={em.id} onClick={() => { setSelEm(em); setEmW(""); }} style={{ width:"100%", background:selEm?.id===em.id?`${em.color}15`:"transparent", border:"none", borderLeft:`2px solid ${selEm?.id===em.id?em.color:"transparent"}`, color:selEm?.id===em.id?"#f1f5f9":"#6b7280", padding:"10px 14px", cursor:"pointer", textAlign:"left", fontFamily:"monospace", transition:"all 0.12s", borderBottom:`1px solid ${BORDER}` }}>
                <div style={{ fontSize:18, marginBottom:3 }}>{em.emoji}</div>
                <div style={{ fontSize:12, color:selEm?.id===em.id?"#e2e8f0":"#9ca3af" }}>{em.name}</div>
                <div style={{ fontSize:10, color:"#374151", marginTop:2, lineHeight:1.5 }}>{em.description}</div>
              </button>
            ))}
          </div>

          {/* ─ Painel emergência ─ */}
          <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
            {!selEm ? (
              <div style={{ color:"#1f2937", fontFamily:"monospace", fontSize:12, paddingTop:50, textAlign:"center" }}>← Selecione um protocolo de emergência</div>
            ) : (
              <>
                {/* cabeçalho */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, paddingBottom:14, borderBottom:`1px solid ${selEm.color}22` }}>
                  <span style={{ fontSize:28 }}>{selEm.emoji}</span>
                  <div>
                    <div style={{ background:`${selEm.color}18`, border:`1px solid ${selEm.color}44`, color:selEm.color, padding:"2px 10px", borderRadius:4, fontSize:9, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase", display:"inline-block", marginBottom:4 }}>EMERGÊNCIA</div>
                    <div style={{ fontSize:17, color:"#e2e8f0" }}>{selEm.name}</div>
                    <div style={{ fontSize:11, color:"#64748b" }}>{selEm.description}</div>
                  </div>
                </div>

                {/* peso input */}
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:10, color:"#4b5563", fontFamily:"monospace", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>Peso da Criança (kg)</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                    {[3,5,8,10,15,20,25,30,40,50,60].map(v => (
                      <button key={v} onClick={() => setEmW(String(v))} style={{ background:parseFloat(emW)===v?`${selEm.color}20`:BG3, border:`1px solid ${parseFloat(emW)===v?selEm.color+"44":BORDER2}`, color:parseFloat(emW)===v?selEm.color:"#4b5563", padding:"4px 10px", borderRadius:4, cursor:"pointer", fontSize:11, fontFamily:"monospace" }}>
                        {v}kg
                      </button>
                    ))}
                    <input style={{ ...inp, width:90 }} type="number" placeholder="outro" value={emW} onChange={e => setEmW(e.target.value)} min="0.5" max="100" step="0.5"/>
                    <span style={{ fontSize:12, color:"#4b5563" }}>kg</span>
                  </div>
                </div>

                {/* conduta geral */}
                <div style={{ background:`${selEm.color}07`, border:`1px solid ${selEm.color}22`, borderLeft:`3px solid ${selEm.color}`, borderRadius:6, padding:"10px 14px", marginBottom:18 }}>
                  <div style={{ fontSize:9, color:selEm.color, fontFamily:"monospace", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>⚡ Conduta Geral</div>
                  <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.8 }}>{selEm.notes}</div>
                </div>

                {/* prescrições */}
                {emResults ? (
                  <>
                    <div style={{ fontSize:10, color:"#374151", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>
                      Prescrição Completa — {parseFloat(emW)}kg
                    </div>
                    {emResults.map((d,i) => (
                      <div key={i} style={{ background:d.highlight?`${selEm.color}0d`:BG3, border:`1px solid ${d.highlight?selEm.color+"33":BORDER2}`, borderLeft:`3px solid ${d.highlight?selEm.color:"#1e2a3a"}`, borderRadius:6, padding:"14px 16px", marginBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:12 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ background:d.highlight?`${selEm.color}25`:"#0f1623", border:`1px solid ${d.highlight?selEm.color+"44":"#1e2a3a"}`, color:d.highlight?selEm.color:"#374151", padding:"1px 8px", borderRadius:3, fontSize:9, fontFamily:"monospace", letterSpacing:"0.06em", textTransform:"uppercase", flexShrink:0 }}>{d.order}°</span>
                            <span style={{ fontSize:13, color:"#e2e8f0" }}>{d.name}</span>
                          </div>
                          {d.urgency && <span style={{ fontSize:9, color:d.highlight?selEm.color:"#374151", fontFamily:"monospace", letterSpacing:"0.04em", textAlign:"right", flexShrink:0, maxWidth:220, lineHeight:1.5 }}>{d.urgency}</span>}
                        </div>
                        <div style={{ fontSize:21, fontWeight:500, color:d.highlight?"#f1f5f9":"#cbd5e1", marginBottom:6 }}>{d.dose}</div>
                        <div style={{ fontSize:11, color:"#64748b", lineHeight:1.7, marginBottom:d.freq?5:0 }}>{d.prep}</div>
                        {d.freq && <div style={{ fontSize:11, color:d.highlight?selEm.color:"#4b5563", fontFamily:"monospace" }}>⏱ {d.freq}</div>}
                        {d.max  && <div style={{ fontSize:10, color:"#374151", marginTop:5, fontFamily:"monospace", borderTop:`1px solid ${BORDER}`, paddingTop:5 }}>⚠ {d.max}</div>}
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ color:"#1f2937", fontSize:12, fontFamily:"monospace" }}>↑ Informe o peso para gerar a prescrição completa</div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────── */}
      <div style={{ borderTop:`1px solid ${BORDER}`, padding:"8px 20px", background:BG2, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize:9, color:"#1f2937", fontFamily:"monospace" }}>Rfofos 2025 · HIAS Turma 48 · MedPanel — Igor Vieira</div>
        <div style={{ fontSize:9, color:"#374151", fontFamily:"monospace" }}>⚠ Verificar dose antes de prescrever — apenas para uso educacional</div>
      </div>
    </div>
  );
}
