import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { T, S } from "./medpanel-tokens"; // Ajuste o path se necessário

// ─────────────────────────────────────────────
// Lógica e Dados W-IPR
// ─────────────────────────────────────────────
const W_E = 5, W_U = 4, W_F = 2, W_T = 11, maxWf = 3.182;
const trendV = { c: 1.0, e: 0.75, d: 0.40 };

const rawTopics = [
  {spec:'PREV',name:'Epidemiologia — delineamento e bioestatística',code:'PREV2',nE:4.0,nU:2.5,nF:2.5,cE:1,cU:1,cF:1,trend:'e',simp:.90,oldIPR:89},
  {spec:'OBS', name:'DHG e DMG — pré-eclâmpsia, HELLP, diabetes gestacional',code:'OBS4',nE:3.5,nU:2.5,nF:2.5,cE:1,cU:1,cF:1,trend:'c',simp:.70,oldIPR:88},
  {spec:'CM',  name:'Hipertensão arterial sistêmica',code:'CM1-CARDIO',nE:3.5,nU:2.5,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:91},
  {spec:'CM',  name:'Grandes síndromes bacterianas, ITU e antibioticoterapia',code:'CM6-INFECTO',nE:2.5,nU:2.0,nF:2.0,cE:1,cU:1,cF:1,trend:'c',simp:.70,oldIPR:84},
  {spec:'CM',  name:'Insuficiência cardíaca e cardiomiopatias',code:'CM1-CARDIO',nE:2.5,nU:2.5,nF:1.5,cE:1,cU:1,cF:1,trend:'c',simp:.60,oldIPR:90},
  {spec:'CG',  name:'Pancreatite aguda, crônica e neoplasias pancreáticas',code:'CM3/CG',nE:1.5,nU:3.5,nF:1.0,cE:1,cU:1,cF:1,trend:'c',simp:.70,oldIPR:79},
  {spec:'CG',  name:'Doenças das vias biliares — colecistite, coledocolitíase, CA biliar',code:'CG1+4',nE:1.0,nU:3.5,nF:1.0,cE:1,cU:1,cF:1,trend:'c',simp:.70,oldIPR:77},
  {spec:'CM',  name:'Arritmias cardíacas e PCR',code:'CM1-CARDIO',nE:2.5,nU:2.0,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:75},
  {spec:'OBS', name:'Assistência ao pré-natal',code:'OBS1+2',nE:2.5,nU:2.0,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:71},
  {spec:'OBS', name:'Sangramentos gestacionais — DPP, placenta prévia, atonia',code:'OBS3',nE:2.5,nU:2.0,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:76},
  {spec:'CM',  name:'DAC — síndromes coronarianas agudas e crônicas',code:'CM4-CARDIO',nE:1.5,nU:2.5,nF:1.5,cE:1,cU:1,cF:1,trend:'c',simp:.60,oldIPR:81},
  {spec:'PREV',name:'Vigilância epidemiológica — sistemas, notificação, indicadores',code:'PREV4',nE:2.5,nU:1.5,nF:1.5,cE:1,cU:1,cF:1,trend:'e',simp:.85,oldIPR:65},
  {spec:'GIN', name:'Amenorreia e síndrome dos ovários policísticos',code:'GIN3+4',nE:1.5,nU:1.0,nF:1.5,cE:1,cU:1,cF:1,trend:'c',simp:.85,oldIPR:62},
  {spec:'PED', name:'Neonato II — infecções congênitas (TORCH) e distúrbios metabólicos',code:'PED1',nE:2.0,nU:1.5,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:65},
  {spec:'CM',  name:'Síndromes febris — meningite, dengue, chikungunya',code:'CM6-INFECTO',nE:2.0,nU:1.5,nF:1.5,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:64},
  {spec:'CM',  name:'Valvopatias e semiologia cardíaca',code:'CM1-CARDIO',nE:1.5,nU:1.5,nF:2.0,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:72},
  {spec:'CM',  name:'Síndrome metabólica e dislipidemia',code:'CM4-CARDIO',nE:1.0,nU:1.5,nF:1.0,cE:1,cU:1,cF:1,trend:'c',simp:.80,oldIPR:55},
  {spec:'CG',  name:'Abdome agudo — obstrutivo, vascular e perfurativo',code:'CG4',nE:1.5,nU:2.0,nF:1.5,cE:1,cU:1,cF:1,trend:'e',simp:.60,oldIPR:67},
  {spec:'CM',  name:'HIV/AIDS — TARV, profilaxias, infecções oportunistas',code:'CM6-INFECTO',nE:1.0,nU:1.0,nF:1.5,cE:1,cU:1,cF:1,trend:'c',simp:.70,oldIPR:45},
  {spec:'CG',  name:'Doenças do esôfago — DRGE, Barrett, CA de esôfago',code:'CG2',nE:1.0,nU:2.0,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:61},
  {spec:'GIN', name:'Vulvovaginites, cervicites e DSTs',code:'GIN6',nE:1.5,nU:1.0,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.90,oldIPR:50},
  {spec:'CG',  name:'Abdome agudo inflamatório — apendicite, diverticulite',code:'CG4',nE:1.0,nU:1.5,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.70,oldIPR:52},
  {spec:'CG',  name:'Diarreias, parasitoses intestinais e DII',code:'CM3-GASTRO',nE:1.5,nU:1.0,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.70,oldIPR:50},
  {spec:'OBS', name:'Doenças na gestação — isoimunização, TORCH, infecções',code:'OBS4-extra',nE:1.5,nU:1.0,nF:1.5,cE:1,cU:1,cF:1,trend:'e',simp:.65,oldIPR:49},
  {spec:'CM',  name:'Suprarrenal, hipófise e hipotálamo — Cushing, Addison',code:'CM2-ENDOCRINO',nE:1.0,nU:1.5,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.60,oldIPR:58},
  {spec:'PED', name:'Distúrbios nutricionais pediátricos',code:'PED4',nE:1.0,nU:1.0,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:45},
  {spec:'CM',  name:'Tumores hepáticos — CHC, metástases, abscesso',code:'CM4-HEPATO',nE:1.0,nU:1.5,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.65,oldIPR:55},
  {spec:'GIN', name:'SUA e dismenorreia',code:'GIN5',nE:0.5,nU:0.5,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.90,oldIPR:35},
  {spec:'CM',  name:'Urgência e emergência hipertensiva',code:'CM1-CARDIO',nE:0.5,nU:0.5,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.85,oldIPR:35},
  {spec:'CG',  name:'Hérnias — inguinal, femoral, umbilical, hiatal',code:'CG3',nE:1.0,nU:1.0,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.90,oldIPR:50},
  {spec:'GIN', name:'Violência sexual e abordagem na APS',code:'GIN4',nE:1.0,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'c',simp:.90,oldIPR:40},
  {spec:'CM',  name:'Toxicologia clínica — intoxicações e antídotos',code:'CM6',nE:0.5,nU:1.0,nF:0.5,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:42},
  {spec:'CG',  name:'Anestesiologia — bloqueios, fármacos e complicações',code:'CG11',nE:0.5,nU:1.0,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.75,oldIPR:44},
  {spec:'CG',  name:'Doenças do estômago — úlcera péptica e câncer gástrico',code:'CG2',nE:1.0,nU:2.0,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.75,oldIPR:69},
  {spec:'PED', name:'Neonato III — miscelânea neonatal',code:'PED1-misc',nE:1.0,nU:0.5,nF:1.0,cE:1,cU:1,cF:1,trend:'e',simp:.80,oldIPR:38},
  {spec:'PED', name:'Síndromes puberais — puberdade precoce e atraso',code:'PED3',nE:0.5,nU:1.0,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.85,oldIPR:43},
  {spec:'CG',  name:'Cirurgia cabeça e pescoço — tireoide e paratireoide',code:'CG',nE:0.5,nU:1.0,nF:0.5,cE:1,cU:1,cF:1,trend:'e',simp:.70,oldIPR:42},
  {spec:'PED', name:'Alimentação infantil — aleitamento e introdução alimentar',code:'PED2',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.90,oldIPR:30},
  {spec:'CG',  name:'DGE, SII e constipação',code:'CM3-GASTRO',nE:0.5,nU:1.0,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.80,oldIPR:38},
  {spec:'CG',  name:'Hemorragia digestiva — alta e baixa',code:'CG1',nE:0.5,nU:1.0,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.60,oldIPR:38},
  {spec:'CG',  name:'Técnica cirúrgica e pós-operatório',code:'CG6',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'e',simp:.80,oldIPR:32},
  {spec:'CG',  name:'Ortopedia geral e fraturas',code:'CG9',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:1,trend:'d',simp:.70,oldIPR:35},
  {spec:'CG',  name:'Pré-operatório e nutrição do paciente cirúrgico',code:'CG5',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'d',simp:.80,oldIPR:28},
  {spec:'CG',  name:'Oftalmologia — retinopatia, glaucoma, catarata',code:'CG13',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'d',simp:.70,oldIPR:33},
  {spec:'CG',  name:'Ortopedia pediátrica e tumores ósseos',code:'CG9-ped',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:1,cF:0,trend:'d',simp:.70,oldIPR:30},
  {spec:'CG',  name:'Queimaduras e trauma de extremidades',code:'CG1-trauma',nE:1.0,nU:0.5,nF:0.5,cE:1,cU:0,cF:0,trend:'d',simp:.80,oldIPR:36},
  {spec:'PED', name:'Síndromes pondero-estaturais — nanismo, baixa estatura',code:'PED3-pond',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:0,cF:0,trend:'d',simp:.80,oldIPR:25},
  {spec:'PREV',name:'Saúde do trabalhador — NR, doenças ocupacionais',code:'PREV1',nE:0.5,nU:0.5,nF:0.5,cE:1,cU:0,cF:1,trend:'d',simp:.70,oldIPR:22},
];

const rawWeeks = [
  {n:1,focus:'Epidemiologia + DHG/DMG — duplo W-IPR 94',col:T.accents[5],h:22,topics:[
    {name:'Epidemiologia — delineamento e bioestatística',wipr:94,mode:'Estudo completo',inst:'ENARE domina (4q/prova)',h:11},
    {name:'DHG e DMG — pré-eclâmpsia, HELLP, diabetes gestacional',wipr:94,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:11},
  ]},
  {n:2,focus:'HAS + Bacterianas/ITU — ENARE-dominant',col:T.accents[5],h:21,topics:[
    {name:'Hipertensão arterial sistêmica',wipr:89,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:10},
    {name:'Grandes síndromes bacterianas, ITU e antibioticoterapia',wipr:85,mode:'Estudo completo',inst:'ENARE crescente',h:11},
  ]},
  {n:3,focus:'IC + Pancreatite — crescente em todas as bancas',col:T.accents[5],h:20,topics:[
    {name:'Insuficiência cardíaca e cardiomiopatias',wipr:85,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:11},
    {name:'Pancreatite aguda, crônica e neoplasias pancreáticas',wipr:84,mode:'Estudo completo',inst:'USP líder (3.5q) + ENARE crescente',h:9},
  ]},
  {n:4,focus:'Vias biliares + Arritmias + Pré-natal',col:T.accents[5],h:20,topics:[
    {name:'Doenças das vias biliares — colecistite, coledocolitíase, CA biliar',wipr:81,mode:'Estudo completo',inst:'USP líder + ENARE crescente',h:8},
    {name:'Arritmias cardíacas e PCR',wipr:81,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:7},
    {name:'Assistência ao pré-natal',wipr:81,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:5},
  ]},
  {n:5,focus:'Sangramentos gest + DAC + Vigilância epi',col:T.accents[5],h:21,topics:[
    {name:'Sangramentos gestacionais — DPP, placenta prévia, atonia',wipr:81,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:7},
    {name:'DAC — síndromes coronarianas agudas e crônicas',wipr:79,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:8},
    {name:'Vigilância epidemiológica — sistemas, notificação, indicadores',wipr:78,mode:'Estudo completo',inst:'ENARE forte (2.5q/prova)',h:6},
  ]},
  {n:6,focus:'SOP + Neonato II + Síndromes febris',col:T.accents[6],h:18,topics:[
    {name:'Amenorreia e síndrome dos ovários policísticos',wipr:75,mode:'Estudo completo',inst:'ENARE crescente',h:6},
    {name:'Neonato II — infecções congênitas (TORCH) e distúrbios metabólicos',wipr:75,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:7},
    {name:'Síndromes febris — meningite, dengue, chikungunya',wipr:74,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:5},
  ]},
  {n:7,focus:'Valvopatias + Dislipidemia + Abdome agudo obstrutivo',col:T.accents[6],h:17,topics:[
    {name:'Valvopatias e semiologia cardíaca',wipr:73,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:6},
    {name:'Síndrome metabólica e dislipidemia',wipr:73,mode:'Estudo completo',inst:'ENARE+USP crescente',h:5},
    {name:'Abdome agudo — obstrutivo, vascular e perfurativo',wipr:72,mode:'Estudo completo',inst:'ENARE+USP+UNIFESP',h:6},
  ]},
  {n:8,focus:'HIV/AIDS + Esôfago + Vulvovaginites + Abdome inflam',col:T.accents[6],h:17,topics:[
    {name:'HIV/AIDS — TARV, profilaxias, infecções oportunistas',wipr:71,mode:'Estudo completo',inst:'crescente todas as bancas',h:5},
    {name:'Doenças do esôfago — DRGE, Barrett, CA de esôfago',wipr:70,mode:'Estudo completo',inst:'USP+ENARE+UNIFESP',h:5},
    {name:'Vulvovaginites, cervicites e DSTs',wipr:69,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:4},
    {name:'Abdome agudo inflamatório — apendicite, diverticulite',wipr:67,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:3},
  ]},
  {n:9,focus:'Doenças gest extra + Suprarrenal + Diarreias',col:T.accents[6],h:16,topics:[
    {name:'Doenças na gestação — isoimunização, TORCH, infecções',wipr:68,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:5},
    {name:'Diarreias, parasitoses intestinais e DII',wipr:67,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:5},
    {name:'Suprarrenal, hipófise e hipotálamo — Cushing, Addison',wipr:66,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:6},
  ]},
  {n:10,focus:'Dist nutricionais ped + Hérnias + Estômago',col:T.accents[6],h:14,topics:[
    {name:'Distúrbios nutricionais pediátricos',wipr:66,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:5},
    {name:'Doenças do estômago — úlcera péptica e câncer gástrico',wipr:63,mode:'Visão geral',inst:'USP forte',h:4},
    {name:'Hérnias — inguinal, femoral, umbilical, hiatal',wipr:60,mode:'Visão geral',inst:'ENARE+USP',h:3},
    {name:'Tumores hepáticos — CHC, metástases, abscesso',wipr:60,mode:'Visão geral',inst:'ENARE+USP',h:2},
  ]},
  {n:11,focus:'Neonato III + Violência sexual + SUA + Urgência HAS',col:T.accents[8],h:13,topics:[
    {name:'Neonato III — miscelânea neonatal',wipr:63,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:3},
    {name:'Violência sexual e abordagem na APS',wipr:63,mode:'Visão geral',inst:'ENARE crescente',h:3},
    {name:'SUA e dismenorreia',wipr:61,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:3},
    {name:'Urgência e emergência hipertensiva',wipr:61,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:2},
    {name:'CCP — cirurgia de tireoide e paratireoide',wipr:61,mode:'Visão geral',inst:'ENARE+USP+UNIFESP',h:2},
  ]},
  {n:12,focus:'Anestesia + Toxicologia + Síndromes puberais + Alimentação',col:T.accents[8],h:12,topics:[
    {name:'Anestesiologia — bloqueios, fármacos e complicações',wipr:62,mode:'Visão geral',inst:'USP+UNIFESP+ENARE',h:3},
    {name:'Toxicologia clínica — intoxicações e antídotos',wipr:61,mode:'Visão geral',inst:'USP+ENARE+UNIFESP',h:3},
    {name:'Síndromes puberais — puberdade precoce e atraso',wipr:57,mode:'Visão geral',inst:'ENARE+USP',h:3},
    {name:'Alimentação infantil — aleitamento e introdução alimentar',wipr:55,mode:'Visão geral',inst:'ENARE+USP',h:3},
  ]},
  {n:13,focus:'DGE + HDA/HDB + Técnica cirúrgica + Ortopedia',col:T.accents[8],h:11,topics:[
    {name:'DGE, SII e constipação',wipr:56,mode:'Visão rápida',inst:'ENARE+USP',h:3},
    {name:'Hemorragia digestiva — alta e baixa',wipr:54,mode:'Visão rápida',inst:'ENARE+USP',h:3},
    {name:'Técnica cirúrgica e pós-operatório',wipr:54,mode:'Visão rápida',inst:'ENARE+USP',h:2},
    {name:'Ortopedia geral e fraturas',wipr:51,mode:'Visão rápida',inst:'ENARE+USP+UNIFESP',h:3},
  ]},
  {n:14,focus:'Temas baixa prioridade — cirurgia e pediatria',col:T.accents[1],h:9,topics:[
    {name:'Pré-operatório e nutrição do paciente cirúrgico',wipr:47,mode:'Visão rápida',inst:'ENARE+USP',h:2},
    {name:'Oftalmologia — retinopatia, glaucoma, catarata',wipr:46,mode:'Visão rápida',inst:'ENARE+USP',h:2},
    {name:'Ortopedia pediátrica e tumores ósseos',wipr:46,mode:'Visão rápida',inst:'ENARE+USP',h:2},
    {name:'Queimaduras e trauma de extremidades',wipr:39,mode:'Visão rápida',inst:'ENARE',h:2},
    {name:'Síndromes pondero-estaturais',wipr:36,mode:'Visão rápida',inst:'ENARE',h:1},
  ]},
  {n:15,focus:'Saúde do trabalhador — limítrofe pós-pesos',col:T.accents[1],h:3,topics:[
    {name:'Saúde do trabalhador — NR, doenças ocupacionais',wipr:40,mode:'Visão rápida',inst:'ENARE+UNIFESP',h:3},
  ]},
  {n:16,focus:'Revisão ativa — banco de questões críticos',col:T.accents[5],h:18,topics:[
    {name:'Revisão: Epidemiologia + Vigilância — banco ENARE/USP',wipr:0,mode:'Revisão',inst:'ENARE prioridade máxima',h:5},
    {name:'Revisão: HAS + IC + Arritmias + DAC',wipr:0,mode:'Revisão',inst:'ENARE+USP+UNIFESP',h:5},
    {name:'Revisão: DHG/DMG + Pré-natal + Sangramentos + SOP',wipr:0,mode:'Revisão',inst:'ENARE+USP+UNIFESP',h:4},
    {name:'Revisão: Bacterianas/ITU + Síndromes febris + HIV',wipr:0,mode:'Revisão',inst:'ENARE crescente',h:4},
  ]},
];

function calcWIPR(t) {
  const Wf = (t.nE * W_E + t.nU * W_U + t.nF * W_F) / W_T;
  const Wcov = (t.cE * W_E + t.cU * W_U + t.cF * W_F) / W_T;
  return Math.round((Wf / maxWf * 0.40 + Wcov * 0.30 + trendV[t.trend] * 0.20 + t.simp * 0.10) * 100);
}

function getTierColor(v) {
  if (v >= 80) return T.accents[5]; // Red/Pink
  if (v >= 60) return T.accents[4]; // Amber
  if (v >= 40) return T.accents[3]; // Emerald
  return T.accents[1]; // Sky
}

// ─────────────────────────────────────────────
// Estrutura Base - CSS Injetado (Herdado do MedPanel)
// ─────────────────────────────────────────────
const mobileCSS = `
*, *::before, *::after { box-sizing: border-box; }
@media (max-width: 768px) {
  .mp-nav-sidebar { display: none !important; }
  .mp-nav-mobile { display: flex !important; overflow-x: auto; gap: 8px; padding: 10px 12px; background: #0F172A; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; position: sticky; top: 0; z-index: 10; }
  .mp-nav-mobile::-webkit-scrollbar { height: 3px; }
  .mp-nav-mobile::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
  .mp-nav-mobile-btn { flex-shrink: 0; white-space: nowrap; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
  .mp-body { flex-direction: column !important; overflow-y: auto !important; }
  .mp-content { width: 100% !important; min-width: 0 !important; padding: 16px 12px !important; }
  .mp-header { padding: 16px 12px 12px !important; }
  .mp-header-title { font-size: 20px !important; line-height: 1.2 !important; }
  .mp-header-sections { display: none !important; }
  .mp-header-eyebrow { font-size: 10px !important; }
  .mp-footer { padding: 8px 12px !important; flex-wrap: wrap; gap: 6px; }
  .mp-section-header { margin: 0 -12px 16px !important; padding: 16px 12px !important; border-radius: 0 !important; }
  .mp-btn-back { padding: 10px 12px !important; font-size: 12px !important; }
}
@media (min-width: 769px) { .mp-nav-mobile { display: none !important; } }
`;

export default function WiprResidexPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("formula");
  const [rankFilter, setRankFilter] = useState("all");
  const [expandedWeeks, setExpandedWeeks] = useState(new Set(rawWeeks.map((_, i) => i)));

  // Cálculos dinâmicos
  const topics = useMemo(() => rawTopics.map(t => ({ ...t, wipr: calcWIPR(t) })).sort((a, b) => b.wipr - a.wipr), []);
  const cntC = topics.filter(t => t.wipr >= 80).length;
  const cntUp = topics.filter(t => t.wipr > t.oldIPR + 2).length;
  const cntDn = topics.filter(t => t.wipr < t.oldIPR - 2).length;

  const filteredTopics = useMemo(() => {
    switch (rankFilter) {
      case "c": return topics.filter(t => t.wipr >= 80);
      case "h": return topics.filter(t => t.wipr >= 60 && t.wipr < 80);
      case "m": return topics.filter(t => t.wipr >= 40 && t.wipr < 60);
      case "l": return topics.filter(t => t.wipr < 40);
      case "up": return topics.filter(t => t.wipr > t.oldIPR + 2);
      case "dn": return topics.filter(t => t.wipr < t.oldIPR - 2);
      default: return topics;
    }
  }, [topics, rankFilter]);

  const toggleWeek = (index) => {
    const next = new Set(expandedWeeks);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setExpandedWeeks(next);
  };

  const sections = [
    { id: "formula", name: "Fórmula W-IPR", color: T.accents[0] },
    { id: "rankings", name: "Rankings Recalculados", color: T.accents[1] },
    { id: "plano", name: "Plano Semanal", color: T.accents[3] },
  ];

  const activeSec = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <div style={S.page}>
      <style>{mobileCSS}</style>

      {/* Header */}
      <button onClick={() => navigate("/")} style={S.btnBack} className="mp-btn-back">
        ← MedPanel
      </button>

      <div style={S.header} className="mp-header">
        <div style={S.headerEyebrow} className="mp-header-eyebrow">
          Métricas Preditivas · Estratégia
        </div>
        <h1 style={S.headerTitle} className="mp-header-title">
          RESIDEX — W-IPR Ponderado
        </h1>
        <div style={S.headerSections} className="mp-header-sections">
          Fórmula de Score · Temas Prioritários · Planejamento Tático 2026
        </div>
      </div>

      {/* Nav Mobile */}
      <div className="mp-nav-mobile">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className="mp-nav-mobile-btn"
            style={{
              background: activeTab === s.id ? s.color : "rgba(255,255,255,0.06)",
              color: activeTab === s.id ? "#fff" : "rgba(255,255,255,0.6)",
              boxShadow: activeTab === s.id ? `0 0 12px ${s.color}44` : "none",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }} className="mp-body">
        {/* Nav Sidebar (Desktop) */}
        <div style={S.nav} className="mp-nav-sidebar">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              style={S.navBtn(activeTab === s.id, s.color)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={S.navDot(activeTab === s.id, s.color)} />
                {s.name}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={S.content} className="mp-content">
          <div style={S.sectionHeader(activeSec.color)} className="mp-section-header">
            <div style={S.sectionBadge(activeSec.color)}>{activeSec.name}</div>
            <div style={S.sectionTitle}>
              {activeTab === "formula" && "Composição Matemática da Prioridade"}
              {activeTab === "rankings" && "Base de Dados de Relevância"}
              {activeTab === "plano" && "Cronograma de Aceleração 16 Semanas"}
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 1: Fórmula W-IPR */}
          {activeTab === "formula" && (
            <div>
              <div style={S.gridTitle}>Pesos Institucionais</div>
              <div style={S.gridWrap}>
                <div style={S.gridCard(true, T.accents[5])}>
                  <div style={S.gridLabel(true, T.accents[5])}>ENARE / ENAMED</div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>Peso 5</div>
                </div>
                <div style={S.gridCard(true, T.accents[6])}>
                  <div style={S.gridLabel(true, T.accents[6])}>USP</div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>Peso 4</div>
                </div>
                <div style={S.gridCard(true, T.accents[1])}>
                  <div style={S.gridLabel(true, T.accents[1])}>UNIFESP</div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>Peso 2</div>
                </div>
              </div>

              <div style={S.obs}>
                <div style={S.obsTitle}>Frequência ponderada — componente principal (peso 40%)</div>
                <div style={S.obsText}>
                  <code>Wf = (n_ENARE × 5 + n_USP × 4 + n_UNIFESP × 2) ÷ 11</code><br />
                  <code>Wf_norm = Wf ÷ 3.18   ← máximo observado (Epidemiologia)</code><br />
                  <span style={{ fontSize: 11, color: T.textMuted }}>n = média de questões por prova sobre o tema nos últimos 5 anos</span>
                </div>
              </div>

              <div style={S.obs}>
                <div style={S.obsTitle}>Cobertura institucional ponderada (peso 30%)</div>
                <div style={S.obsText}>
                  <code>Wcov = (pE×5 + pU×4 + pF×2) ÷ 11</code><br />
                  <span style={{ fontSize: 11, color: T.textMuted }}>Todas 3 = 1.00 · ENARE+USP = 0.82 · Só ENARE = 0.45</span>
                </div>
              </div>

              <div style={S.alert(T.accents[0])}>
                <div style={S.alertTitle(T.accents[0])}>W-IPR — Fórmula Completa</div>
                <div style={{ ...S.alertText, fontWeight: 600 }}>
                  <code>W-IPR = round( (Wf_norm×0.40 + Wcov×0.30 + Wtrend×0.20 + Wsimp×0.10) × 100 )</code>
                </div>
              </div>

              <div style={S.gridWrap}>
                <div style={{ ...S.gridCard(false, T.accents[8]), background: T.bgCard }}>
                  <div style={S.gridLabel(false, T.accents[8])}>Wtrend (20%)</div>
                  <div style={S.gridValue(false)}>
                    Crescente = 1.0 · Estável = 0.75 · Decrescente = 0.40. Reflete ciclos de cobrança 2024–2026.
                  </div>
                </div>
                <div style={{ ...S.gridCard(false, T.accents[8]), background: T.bgCard }}>
                  <div style={S.gridLabel(false, T.accents[8])}>Wsimp (10%)</div>
                  <div style={S.gridValue(false)}>
                    Custo-benefício de complexidade (0–1). Temas simples e diretos = score maior.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 2: Rankings Recalculados */}
          {activeTab === "rankings" && (
            <div>
              <div style={S.gridWrap}>
                <div style={S.gridCard(true, T.accents[7])}>
                  <div style={S.gridLabel(true, T.accents[7])}>Total Temas</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>48</div>
                </div>
                <div style={S.gridCard(true, T.accents[5])}>
                  <div style={S.gridLabel(true, T.accents[5])}>Crítico 80+</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>{cntC}</div>
                </div>
                <div style={S.gridCard(true, T.accents[3])}>
                  <div style={S.gridLabel(true, T.accents[3])}>Subiram ↑</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>{cntUp}</div>
                </div>
                <div style={S.gridCard(true, T.accents[5])}>
                  <div style={S.gridLabel(true, T.accents[5])}>Caíram ↓</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>{cntDn}</div>
                </div>
              </div>

              {/* Botões de Filtro */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {[
                  { id: "all", label: "Todos", color: T.textMuted },
                  { id: "c", label: "Crítico 80+", color: T.accents[5] },
                  { id: "h", label: "Alta 60-79", color: T.accents[4] },
                  { id: "m", label: "Média 40-59", color: T.accents[3] },
                  { id: "l", label: "Baixa <40", color: T.accents[1] },
                  { id: "up", label: "Subiram", color: T.textMuted },
                  { id: "dn", label: "Caíram", color: T.textMuted },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setRankFilter(f.id)}
                    style={{
                      padding: "4px 12px",
                      fontSize: 11,
                      fontFamily: "monospace",
                      borderRadius: 16,
                      border: `1px solid ${rankFilter === f.id ? f.color : T.borderCard}`,
                      background: rankFilter === f.id ? `${f.color}15` : T.bgSurface,
                      color: rankFilter === f.id ? f.color : T.textBody,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Lista */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {filteredTopics.map((t, idx) => {
                  const tc = getTierColor(t.wipr);
                  const delta = t.wipr - t.oldIPR;
                  return (
                    <div key={t.code + idx} style={{ ...S.gradeWrap(tc), alignItems: "center", padding: "8px 12px", marginBottom: 0 }}>
                      <div style={{ fontSize: 11, color: T.textDisabled, minWidth: 20, textAlign: "right" }}>
                        {topics.findIndex(x => x.name === t.name) + 1}
                      </div>
                      <div style={{ ...S.gradeBadge(tc), padding: "4px 8px", fontSize: 12, fontWeight: 600 }}>
                        {t.wipr}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, padding: "0 8px" }}>
                        <div style={{ fontSize: 13, color: T.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>
                          {t.spec} · {t.code} · ant. {t.oldIPR}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: delta > 2 ? T.accents[3] : delta < -2 ? T.accents[5] : T.textDisabled, minWidth: 30, textAlign: "right" }}>
                        {delta > 2 ? `↑${delta}` : delta < -2 ? `↓${Math.abs(delta)}` : `→`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 3: Plano Semanal */}
          {activeTab === "plano" && (
            <div>
              <div style={S.gridWrap}>
                <div style={S.gridCard(false, T.accents[3])}>
                  <div style={S.gridLabel(false, T.accents[3])}>Semanas</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>16</div>
                </div>
                <div style={S.gridCard(false, T.accents[3])}>
                  <div style={S.gridLabel(false, T.accents[3])}>Total Horas</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>~235h</div>
                </div>
                <div style={S.gridCard(false, T.accents[3])}>
                  <div style={S.gridLabel(false, T.accents[3])}>Média/Sem</div>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>~15h</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button
                  onClick={() => setExpandedWeeks(new Set(rawWeeks.map((_, i) => i)))}
                  style={{ padding: "4px 12px", fontSize: 11, fontFamily: "monospace", borderRadius: 16, border: `1px solid ${T.borderCard}`, background: T.bgSurface, cursor: "pointer" }}
                >
                  Expandir Tudo
                </button>
                <button
                  onClick={() => setExpandedWeeks(new Set())}
                  style={{ padding: "4px 12px", fontSize: 11, fontFamily: "monospace", borderRadius: 16, border: `1px solid ${T.borderCard}`, background: T.bgSurface, cursor: "pointer" }}
                >
                  Recolher Tudo
                </button>
              </div>

              {rawWeeks.map((w, i) => {
                const isOpen = expandedWeeks.has(i);
                return (
                  <div key={w.n} style={{ ...S.decisionWrap(w.col), padding: 0, overflow: "hidden" }}>
                    {/* Header Acordeão */}
                    <div 
                      onClick={() => toggleWeek(i)}
                      style={{ padding: "12px 16px", cursor: "pointer", background: isOpen ? `${w.col}05` : T.bgSurface, display: "flex", alignItems: "center", gap: 12, transition: "background 0.2s" }}
                    >
                      <div style={{ ...S.decisionCondition(w.col), margin: 0, minWidth: 65 }}>
                        SEM {w.n}
                      </div>
                      <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.textPrimary }}>
                        {w.focus}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: w.col }}>
                        {w.h}h
                      </div>
                      <div style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", color: T.textMuted }}>
                        ›
                      </div>
                    </div>

                    {/* Corpo Acordeão */}
                    {isOpen && (
                      <div style={{ borderTop: `1px solid ${w.col}22`, padding: "8px 16px" }}>
                        {w.topics.map((t, idx) => {
                          const tc = t.wipr > 0 ? getTierColor(t.wipr) : T.accents[7];
                          return (
                            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0", borderBottom: idx < w.topics.length - 1 ? `1px solid ${T.borderCard}` : "none" }}>
                              <div style={{ ...S.gradeBadge(tc), minWidth: 32, textAlign: "center", marginTop: 0 }}>
                                {t.wipr > 0 ? t.wipr : "REV"}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, color: T.textBody, lineHeight: 1.4 }}>{t.name}</div>
                                <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>{t.inst}</div>
                              </div>
                              <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: T.bgCard, border: `1px solid ${T.borderCard}`, color: T.textMuted, flexShrink: 0 }}>
                                {t.mode}
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
          )}

        </div>
      </div>

      {/* Footer (Dots) */}
      <div style={S.footer} className="mp-footer">
        <div style={S.footerLabel}>
          {sections.findIndex(s => s.id === activeTab) + 1}/{sections.length} · {activeSec.name}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {sections.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              style={S.footerDot(activeTab === s.id, s.color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
