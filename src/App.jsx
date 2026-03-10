import { useState, useEffect } from "react";

// ─── BUSINESS INFO ────────────────────────────────────────────────────────────
const WA_LINK    = "https://wa.me/5519999898759?text=Olá!%20Vi%20o%20site%20e%20gostaria%20de%20um%20orçamento%20de%20decoração!";
const PHONE      = "(19) 99989-8759";
const ADDRESS    = "Av. Dr. Jesuíno Marcondes Machado, 2432 — Nova Campinas, Campinas/SP";
const MAPS_LINK  = "https://maps.google.com/?q=Av.+Dr.+Jesuíno+Marcondes+Machado,+2432,+Nova+Campinas,+Campinas,+SP";
const INSTA_LINK = "https://instagram.com/balonistapresentes";
const RATING     = "4,8";
const REVIEWS    = "366";
const HOURS      = [
  { day:"Segunda",  h:"Fechado"       },
  { day:"Terça",    h:"09:00 – 18:00" },
  { day:"Quarta",   h:"09:00 – 18:00" },
  { day:"Quinta",   h:"09:00 – 18:00" },
  { day:"Sexta",    h:"09:00 – 18:00" },
  { day:"Sábado",   h:"09:00 – 14:00" },
  { day:"Domingo",  h:"Fechado"       },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose: #f2a7b8; --rose-dk: #d96b88; --blush: #fde8ef;
    --gold: #c8963c; --gold-lt: #f5e0a8; --cream: #fdf7f2;
    --plum: #7b3f6e; --plum-lt: #c68bb5; --plum-dk: #5a2952;
    --white: #fff; --dark: #221520; --mid: #6b4d5e; --light: #e8d5e0;
    --ff-h: 'Playfair Display', serif;
    --ff-b: 'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--ff-b); background: var(--cream); color: var(--dark); overflow-x: hidden; }
  img { display: block; max-width: 100%; }

  /* ── scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--plum-lt); border-radius: 10px; }

  /* ── reveal ── */
  .reveal { opacity: 0; transform: translateY(36px); transition: opacity .75s ease, transform .75s ease; }
  .reveal.in { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity .75s ease, transform .75s ease; }
  .reveal-left.in { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity .75s ease, transform .75s ease; }
  .reveal-right.in { opacity: 1; transform: translateX(0); }

  /* ── INFO BAR ── */
  .info-bar {
    position: relative; z-index: 400;
    background: var(--plum-dk);
    margin-top: 64px; /* nav height */
  }
  .info-bar-inner {
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
    max-width: 1200px; margin: 0 auto; padding: 0 6%;
  }
  .ib-item {
    display: flex; align-items: center; gap: 7px;
    padding: 10px 20px; font-size: .8rem; font-weight: 500;
    color: rgba(255,255,255,.8); text-decoration: none;
    border-right: 1px solid rgba(255,255,255,.12);
    transition: background .2s, color .2s;
    white-space: nowrap; cursor: pointer; background: none; border-top: none; border-bottom: none; border-left: none; font-family: var(--ff-b);
  }
  .ib-item:last-child { border-right: none; }
  .ib-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .ib-rating { gap: 8px; }
  .ib-stars { color: #fbbf24; font-weight: 700; font-size: .88rem; }
  .ib-sub { color: rgba(255,255,255,.55); font-size: .75rem; }
  .ib-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .ib-dot.open   { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
  .ib-dot.closed { background: #f87171; }
  .ib-caret { font-size: .65rem; opacity: .6; margin-left: 4px; }
  .ib-hours-btn { border-right: none; }
  .ib-hours-drop {
    position: absolute; top: 100%; right: 0;
    background: var(--dark); border: 1px solid rgba(255,255,255,.1);
    border-radius: 0 0 16px 16px;
    padding: 16px 20px; min-width: 240px; z-index: 50;
    box-shadow: 0 12px 32px rgba(0,0,0,.3);
  }
  .ib-hr-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; font-size: .83rem; color: rgba(255,255,255,.65);
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
  .ib-hr-row.today { color: #4ade80; font-weight: 700; }
  .ib-hr-row:last-of-type { border-bottom: none; }
  .ib-note { font-size: .73rem; color: rgba(255,255,255,.35); margin-top: 10px; }
  @media(max-width:700px) {
    .info-bar-inner { flex-direction: column; align-items: flex-start; }
    .ib-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,.08); width: 100%; }
    .ib-addr { display: none; }
  }

  /* ── FOOTER EXTRAS ── */
  .footer-rating {
    display: flex; align-items: center; gap: 12px; margin: 16px 0 6px;
  }
  .fr-stars { color: #fbbf24; font-size: 1.1rem; }
  .footer-rating strong { display: block; font-size: .9rem; color: rgba(255,255,255,.85); font-weight: 700; }
  .footer-rating span { font-size: .75rem; color: rgba(255,255,255,.45); }
  .footer-hours {
    margin-top: 18px; display: flex; flex-direction: column; gap: 4px;
    padding: 14px 16px; background: rgba(255,255,255,.05); border-radius: 12px;
  }
  .footer-hours strong { font-size: .82rem; color: rgba(255,255,255,.8); margin-bottom: 4px; }
  .footer-hours span { font-size: .78rem; color: rgba(255,255,255,.5); }
  .footer-badges {
    display: flex; flex-wrap: wrap; gap: 10px;
    max-width: 1100px; margin: 0 auto 28px; padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,.06);
  }
  .fbadge {
    font-size: .75rem; font-weight: 600;
    padding: 6px 14px; border-radius: 50px;
    background: rgba(255,255,255,.07); color: rgba(255,255,255,.6);
    border: 1px solid rgba(255,255,255,.1);
  }


  .wa-float {
    position: fixed; bottom: 22px; right: 22px; z-index: 1000;
    display: flex; align-items: center; gap: 10px;
    background: #22c55e; color: #fff;
    font-family: var(--ff-b); font-weight: 600; font-size: .88rem;
    padding: 13px 22px; border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 6px 28px rgba(34,197,94,.45);
    animation: waPulse 2.8s ease-in-out infinite;
    transition: transform .2s;
  }
  .wa-float:hover { transform: scale(1.06); }
  .wa-float .wa-label { white-space: nowrap; }
  @keyframes waPulse {
    0%,100% { box-shadow: 0 6px 28px rgba(34,197,94,.45); }
    50% { box-shadow: 0 6px 44px rgba(34,197,94,.75); }
  }
  @media(max-width:520px) { .wa-float .wa-label { display:none; } .wa-float { padding: 13px; } }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    display: flex; align-items: center; justify-content: space-between;
    padding: 15px 6%;
    background: rgba(253,247,242,.88); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,150,60,.15);
    transition: box-shadow .3s;
  }
  .nav.shadow { box-shadow: 0 4px 24px rgba(90,41,82,.1); }
  .nav-logo { font-family: var(--ff-h); font-size: 1.45rem; font-weight: 700; color: var(--plum); text-decoration: none; display:flex; align-items:center; gap:6px; }
  .nav-logo .dot { color: var(--gold); }
  .nav-links { display: flex; align-items: center; gap: 26px; list-style: none; }
  .nav-links a { text-decoration: none; font-size: .85rem; font-weight: 500; color: var(--mid); transition: color .2s; }
  .nav-links a:hover { color: var(--plum); }
  .nav-cta-btn {
    background: var(--plum); color: #fff !important;
    padding: 9px 20px; border-radius: 50px; font-weight: 600 !important;
    transition: background .2s, transform .2s !important;
  }
  .nav-cta-btn:hover { background: var(--rose-dk) !important; transform: scale(1.04) !important; }
  .burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
  .burger span { display: block; width: 22px; height: 2px; background: var(--plum); border-radius: 4px; transition: .3s; }
  .mobile-menu {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 499;
    background: var(--cream); border-bottom: 1px solid var(--light);
    padding: 20px 6%; display: flex; flex-direction: column; gap: 18px;
    transform: translateY(-110%); transition: transform .3s ease;
    box-shadow: 0 8px 24px rgba(90,41,82,.1);
  }
  .mobile-menu.open { transform: translateY(0); }
  .mobile-menu a { text-decoration: none; font-size: 1rem; font-weight: 600; color: var(--mid); padding: 4px 0; border-bottom: 1px solid var(--light); }
  .mobile-menu a:last-child { color: var(--plum); border: none; }
  @media(max-width:780px) { .nav-links { display:none; } .burger { display: flex; } }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; padding: 130px 6% 60px;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 90% 80% at 85% 40%, rgba(242,167,184,.3) 0%, transparent 65%),
      radial-gradient(ellipse 60% 50% at 5% 90%, rgba(123,63,110,.15) 0%, transparent 60%),
      linear-gradient(155deg, #fdf2f8 0%, #fdf7f2 45%, #f7edf7 100%);
  }
  .hero-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,150,60,.12); border: 1px solid rgba(200,150,60,.35);
    color: var(--gold); font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    padding: 6px 16px; border-radius: 50px; margin-bottom: 24px;
  }
  .hero-tag::before { content: "✦"; font-size: .65rem; }
  .hero h1 { font-family: var(--ff-h); font-size: clamp(2.4rem,5vw,3.8rem); font-weight: 700; line-height: 1.1; color: var(--dark); margin-bottom: 18px; }
  .hero h1 em { color: var(--plum); font-style: italic; }
  .hero-sub { font-size: 1.05rem; color: var(--mid); line-height: 1.75; margin-bottom: 36px; max-width: 500px; }
  .hero-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 44px; }
  .btn-main {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--plum), #a0567e);
    color: #fff; font-family: var(--ff-b); font-weight: 700; font-size: .95rem;
    padding: 15px 30px; border-radius: 50px; text-decoration: none;
    box-shadow: 0 8px 28px rgba(123,63,110,.32);
    transition: transform .25s, box-shadow .25s;
  }
  .btn-main:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(123,63,110,.48); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    border: 2px solid var(--plum); color: var(--plum);
    font-family: var(--ff-b); font-weight: 700; font-size: .95rem;
    padding: 13px 26px; border-radius: 50px; text-decoration: none;
    transition: all .25s;
  }
  .btn-ghost:hover { background: var(--plum); color: #fff; transform: translateY(-3px); }
  .hero-stats { display: flex; gap: 28px; flex-wrap: wrap; }
  .stat { display: flex; flex-direction: column; }
  .stat-n { font-family: var(--ff-h); font-size: 2rem; font-weight: 700; color: var(--plum); line-height: 1; }
  .stat-l { font-size: .75rem; font-weight: 600; color: var(--mid); letter-spacing: .04em; margin-top: 3px; }
  .stat-div { width: 1px; background: var(--light); align-self: stretch; }

  /* Hero visual */
  .hero-visual { display: flex; align-items: center; justify-content: center; position: relative; }
  .hero-card {
    width: 380px; height: 480px;
    background: linear-gradient(145deg, #f9d0e2 0%, #e8b0d4 50%, #d4a0c4 100%);
    border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem;
    box-shadow: 0 30px 80px rgba(123,63,110,.22);
    animation: morphHero 9s ease-in-out infinite alternate;
    position: relative; overflow: hidden;
  }
  .hero-card::before {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.4) 0%, transparent 60%);
  }
  @keyframes morphHero {
    from { border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%; }
    to   { border-radius: 60% 40% 45% 55% / 45% 55% 45% 55%; }
  }
  .hero-float-card {
    position: absolute; bottom: 30px; left: -20px;
    background: var(--white); border-radius: 18px; padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,.1);
    display: flex; align-items: center; gap: 12px;
    animation: floatCard 4s ease-in-out infinite alternate;
  }
  .hero-float-card2 {
    position: absolute; top: 40px; right: -20px;
    background: var(--plum); border-radius: 18px; padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(90,41,82,.3);
    display: flex; align-items: center; gap: 12px;
    animation: floatCard2 5s ease-in-out infinite alternate;
  }
  @keyframes floatCard  { from { transform: translateY(0)   rotate(-1deg); } to { transform: translateY(-14px) rotate(1deg); } }
  @keyframes floatCard2 { from { transform: translateY(0)   rotate(1deg);  } to { transform: translateY(-10px) rotate(-1deg); } }
  .fc-ico { font-size: 1.6rem; }
  .fc-txt strong { display: block; font-size: .9rem; color: var(--dark); font-weight: 700; }
  .fc-txt span { font-size: .75rem; color: var(--mid); }
  .fc-txt2 strong { display: block; font-size: .9rem; color: #fff; font-weight: 700; }
  .fc-txt2 span { font-size: .75rem; color: rgba(255,255,255,.65); }
  .floating-b {
    position: absolute; border-radius: 50%;
    animation: floatB linear infinite;
    pointer-events: none;
  }
  @keyframes floatB { from { transform: translateY(0) rotate(-5deg); } to { transform: translateY(-30px) rotate(5deg); } }
  @media(max-width:860px) { .hero-wrap { grid-template-columns: 1fr; } .hero-visual { display: none; } }

  /* ── SOBRE ── */
  .sobre {
    padding: 100px 6%;
    background: linear-gradient(160deg, #fff 0%, #fde8ef 55%, #f5e4f7 100%);
  }
  .sobre-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1100px; margin: 0 auto; }
  .sobre-art { position: relative; display: flex; justify-content: center; }
  .sobre-blob {
    width: 320px; height: 360px;
    background: linear-gradient(145deg, #f2c0d4 0%, #c890b8 100%);
    border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem;
    box-shadow: 0 24px 64px rgba(123,63,110,.2);
    animation: blobAnim 8s ease-in-out infinite alternate;
  }
  @keyframes blobAnim {
    from { border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%; }
    to   { border-radius: 40% 60% 45% 55% / 55% 45% 55% 45%; }
  }
  .sobre-badge {
    position: absolute; bottom: 10px; right: 0;
    background: #fff; border-radius: 16px; padding: 14px 18px;
    box-shadow: 0 8px 28px rgba(0,0,0,.1);
    display: flex; align-items: center; gap: 12px;
  }
  .sobre-badge .b-ico { font-size: 1.8rem; }
  .sobre-badge strong { display: block; font-size: .9rem; color: var(--dark); }
  .sobre-badge span { font-size: .75rem; color: var(--mid); }
  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    color: var(--gold); font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .section-eyebrow::before, .section-eyebrow::after { content: "—"; opacity: .5; }
  h2.sec { font-family: var(--ff-h); font-size: clamp(1.9rem,3.5vw,2.8rem); font-weight: 700; color: var(--dark); margin-bottom: 16px; line-height: 1.2; }
  h2.sec em { color: var(--plum); font-style: italic; }
  .sec-lead { font-size: 1rem; color: var(--mid); line-height: 1.8; margin-bottom: 28px; }
  .checks { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .checks li { display: flex; align-items: center; gap: 12px; font-size: .92rem; color: var(--mid); font-weight: 500; }
  .checks li::before { content: "✦"; color: var(--gold); font-size: .75rem; flex-shrink: 0; }
  .quote-block {
    padding: 18px 22px;
    background: rgba(123,63,110,.06); border-left: 3px solid var(--plum);
    border-radius: 0 12px 12px 0;
  }
  .quote-block p { font-family: var(--ff-h); font-size: 1.2rem; font-style: italic; color: var(--plum); line-height: 1.5; }
  @media(max-width:768px) { .sobre-inner { grid-template-columns: 1fr; gap: 48px; } }

  /* ── SERVIÇOS ── */
  .servicos { padding: 100px 6%; background: var(--cream); }
  .sec-header { text-align: center; max-width: 600px; margin: 0 auto 56px; }
  .sec-header .sec-lead { margin: 0 auto; }
  .serv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 22px; max-width: 1100px; margin: 0 auto;
  }
  .serv-card {
    background: #fff; border-radius: 24px; overflow: hidden;
    box-shadow: 0 4px 18px rgba(123,63,110,.07);
    transition: transform .3s, box-shadow .3s; cursor: default;
  }
  .serv-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(123,63,110,.15); }
  .serv-img {
    height: 170px; display: flex; align-items: center; justify-content: center;
    font-size: 3.8rem; position: relative;
  }
  .si1 { background: linear-gradient(135deg,#fde0ec,#f2a7b8); }
  .si2 { background: linear-gradient(135deg,#f5e4b8,#d4a74a); }
  .si3 { background: linear-gradient(135deg,#e8c5f5,#9b5ab8); }
  .si4 { background: linear-gradient(135deg,#fde8ef,#c68bb5); }
  .si5 { background: linear-gradient(135deg,#c8f0de,#4f9b72); }
  .serv-body { padding: 22px 22px 26px; }
  .serv-body h3 { font-family: var(--ff-h); font-size: 1.25rem; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
  .serv-body p { font-size: .86rem; color: var(--mid); line-height: 1.65; }
  .serv-pill {
    display: inline-block; margin-top: 12px;
    font-size: .73rem; font-weight: 700; color: var(--plum);
    background: rgba(123,63,110,.08); padding: 4px 12px; border-radius: 50px;
  }

  /* ── GALERIA ── */
  .galeria {
    padding: 100px 6%;
    background: linear-gradient(160deg, var(--dark) 0%, #3c1e42 100%);
    position: relative; overflow: hidden;
  }
  .galeria::before {
    content: ""; position: absolute; inset: -30%;
    background: radial-gradient(ellipse 50% 40% at 60% 40%, rgba(242,167,184,.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .galeria .sec-header h2.sec { color: #fff; }
  .galeria .sec-header h2.sec em { color: var(--rose); }
  .galeria .sec-header .sec-lead { color: rgba(255,255,255,.55); }
  .gal-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 220px 180px;
    gap: 14px; max-width: 1100px; margin: 0 auto 40px;
  }
  .gal-item {
    border-radius: 20px; overflow: hidden; position: relative; cursor: pointer;
    transition: transform .3s;
  }
  .gal-item:hover { transform: scale(1.025); }
  .gal-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  .gal-item:nth-child(5) { grid-column: span 2; }
  .g-face {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center; font-size: 3rem;
  }
  .gf1 { background: linear-gradient(145deg,#e07a95,#7b3f6e); }
  .gf2 { background: linear-gradient(145deg,#d4a74a,#f5e4b8); }
  .gf3 { background: linear-gradient(145deg,#c68bb5,#f2a7b8); }
  .gf4 { background: linear-gradient(145deg,#9b5ab8,#7b3f6e); }
  .gf5 { background: linear-gradient(145deg,#f2a7b8,#fde8ef); }
  .g-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 55%);
    display: flex; align-items: flex-end; padding: 14px;
    opacity: 0; transition: opacity .3s;
  }
  .gal-item:hover .g-overlay { opacity: 1; }
  .g-overlay span { color: #fff; font-size: .82rem; font-weight: 600; }
  .gal-cta { text-align: center; }
  .btn-outline-w {
    display: inline-flex; align-items: center; gap: 10px;
    border: 2px solid rgba(255,255,255,.35); color: #fff;
    font-family: var(--ff-b); font-weight: 700; font-size: .92rem;
    padding: 13px 28px; border-radius: 50px; text-decoration: none;
    transition: all .25s;
  }
  .btn-outline-w:hover { background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.7); transform: translateY(-3px); }
  @media(max-width:720px) {
    .gal-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .gal-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
    .gal-item:nth-child(5) { grid-column: span 1; }
  }
  @media(max-width:480px) {
    .gal-grid { grid-template-columns: 1fr; }
    .gal-item:nth-child(1), .gal-item:nth-child(5) { grid-column: span 1; }
  }

  /* ── DEPOIMENTOS ── */
  .depo { padding: 100px 6%; background: var(--blush); }
  .depo-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 22px; max-width: 1100px; margin: 0 auto;
  }
  .depo-card {
    background: #fff; border-radius: 24px; padding: 30px 26px;
    box-shadow: 0 4px 18px rgba(123,63,110,.07);
    position: relative; transition: transform .3s, box-shadow .3s;
  }
  .depo-card:hover { transform: translateY(-6px); box-shadow: 0 18px 42px rgba(123,63,110,.13); }
  .depo-card::before {
    content: """; position: absolute; top: 12px; right: 22px;
    font-family: var(--ff-h); font-size: 5.5rem; color: var(--rose); opacity: .28; line-height: 1;
  }
  .stars-row { color: var(--gold); font-size: .95rem; letter-spacing: 2px; margin-bottom: 14px; }
  .depo-text { font-size: .92rem; color: var(--mid); line-height: 1.75; font-style: italic; margin-bottom: 20px; }
  .depo-author { display: flex; align-items: center; gap: 12px; }
  .av {
    width: 42px; height: 42px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1rem; color: #fff; flex-shrink: 0;
  }
  .av1 { background: linear-gradient(135deg,var(--rose),var(--plum)); }
  .av2 { background: linear-gradient(135deg,var(--gold),var(--rose-dk)); }
  .av3 { background: linear-gradient(135deg,var(--plum),#a04ec4); }
  .depo-name strong { display: block; font-size: .9rem; color: var(--dark); font-weight: 600; }
  .depo-name span { font-size: .75rem; color: var(--mid); }

  /* ── DIFERENCIAIS ── */
  .dif { padding: 100px 6%; background: #fff; }
  .dif-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; max-width: 1100px; margin: 0 auto; }
  .dif-list { display: flex; flex-direction: column; gap: 14px; }
  .dif-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 18px 20px; background: var(--cream); border-radius: 16px;
    transition: transform .25s, box-shadow .25s;
  }
  .dif-item:hover { transform: translateX(8px); box-shadow: 0 6px 20px rgba(123,63,110,.1); }
  .dif-icon {
    width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--blush), var(--rose));
    display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
  }
  .dif-txt strong { display: block; font-size: .93rem; color: var(--dark); font-weight: 600; margin-bottom: 2px; }
  .dif-txt span { font-size: .82rem; color: var(--mid); }
  .dif-mosaic { display: flex; flex-direction: column; gap: 14px; }
  .dif-row-m { display: flex; gap: 14px; }
  .dif-tile {
    flex: 1; border-radius: 20px; padding: 22px 20px;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 4px 16px rgba(123,63,110,.08);
  }
  .dt1 { background: linear-gradient(145deg, var(--plum), #9b4080); color: #fff; }
  .dt2 { background: linear-gradient(145deg, var(--gold-lt), #f0d080); }
  .dt3 { background: linear-gradient(145deg, var(--blush), #f8c4d8); }
  .dt4 { background: linear-gradient(145deg, var(--dark), #4a2050); color: #fff; }
  .dif-tile .tile-ico { font-size: 1.8rem; }
  .dif-tile .tile-lbl { font-size: .85rem; font-weight: 600; line-height: 1.3; }
  @media(max-width:768px) { .dif-inner { grid-template-columns: 1fr; } }

  /* ── CTA FINAL ── */
  .cta-final {
    padding: 110px 6%;
    background: linear-gradient(135deg, var(--plum-dk) 0%, var(--plum) 45%, var(--rose-dk) 100%);
    text-align: center; color: #fff; position: relative; overflow: hidden;
  }
  .cta-final::before {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
  .cta-inner h2.sec { color: #fff; font-size: clamp(2rem,4vw,3rem); }
  .cta-inner h2.sec em { color: var(--gold-lt); }
  .cta-sub { font-size: 1.05rem; color: rgba(255,255,255,.75); line-height: 1.75; margin: 14px auto 38px; }
  .btn-wa-xl {
    display: inline-flex; align-items: center; gap: 14px;
    background: #22c55e; color: #fff;
    font-family: var(--ff-b); font-weight: 800; font-size: 1.1rem;
    padding: 20px 44px; border-radius: 50px; text-decoration: none;
    box-shadow: 0 12px 40px rgba(0,0,0,.25);
    transition: transform .25s, box-shadow .25s;
  }
  .btn-wa-xl:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 20px 54px rgba(0,0,0,.35); }
  .cta-note { margin-top: 18px; font-size: .82rem; color: rgba(255,255,255,.5); }
  .cta-balloons { display: flex; justify-content: center; gap: 20px; margin-top: 50px; }
  .cta-b { font-size: 2.8rem; animation: cBalloon ease-in-out infinite alternate; }
  .cta-b:nth-child(2) { animation-delay: .4s; animation-duration: 4.5s; }
  .cta-b:nth-child(3) { animation-delay: .8s; animation-duration: 3.5s; }
  @keyframes cBalloon { from { transform: translateY(0) rotate(-3deg); } to { transform: translateY(-20px) rotate(3deg); } }

  /* ── FOOTER ── */
  footer {
    background: var(--dark); color: rgba(255,255,255,.65);
    padding: 64px 6% 28px;
  }
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
    max-width: 1100px; margin: 0 auto 44px;
  }
  .footer-logo { font-family: var(--ff-h); font-size: 1.4rem; font-weight: 700; color: var(--rose); display: block; margin-bottom: 12px; text-decoration: none; }
  .footer-desc { font-size: .88rem; line-height: 1.7; max-width: 280px; }
  .footer-social { display: flex; gap: 10px; margin-top: 18px; }
  .soc { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; text-decoration: none; transition: transform .25s; }
  .soc:hover { transform: scale(1.15); }
  .soc-ig { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366); }
  .soc-wa { background: #22c55e; }
  .footer-col h4 { font-family: var(--ff-h); font-size: 1rem; color: #fff; margin-bottom: 16px; font-weight: 600; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-col ul li { font-size: .86rem; display: flex; align-items: center; gap: 8px; }
  .footer-col ul li a { color: rgba(255,255,255,.6); text-decoration: none; transition: color .2s; }
  .footer-col ul li a:hover { color: var(--rose); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,.07); padding-top: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: .78rem; max-width: 1100px; margin: 0 auto; }
  @media(max-width:720px) { .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-bottom { justify-content: center; text-align: center; } }
`;

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const WaIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#sobre",       label: "Sobre" },
    { href: "#servicos",    label: "Serviços" },
    { href: "#galeria",     label: "Galeria" },
    { href: "#depoimentos", label: "Avaliações" },
  ];
  return (
    <>
      <nav className={`nav${scrolled ? " shadow" : ""}`}>
        <a href="#hero" className="nav-logo">Balonista <span className="dot">✦</span></a>
        <ul className="nav-links">
          {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          <li><a href={WA_LINK} className="nav-cta-btn" target="_blank" rel="noopener">💬 Orçamento</a></li>
        </ul>
        <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => setOpen(false)}>💬 Pedir Orçamento</a>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-wrap">
        {/* TEXT */}
        <div className="reveal">
          <div className="hero-tag">Decorações exclusivas com amor</div>
          <h1>
            Transformamos momentos especiais em{" "}
            <em>memórias inesquecíveis</em>
          </h1>
          <p className="hero-sub">
            Decorações com balões e presentes personalizados feitos com carinho
            em cada detalhe. Sua festa merece o melhor.
          </p>
          <div className="hero-btns">
            <a href={WA_LINK} className="btn-main" target="_blank" rel="noopener">
              <WaIcon size={18} /> Solicitar orçamento no WhatsApp
            </a>
            <a href="#galeria" className="btn-ghost">Ver nosso trabalho ↓</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-n">500+</span><span className="stat-l">Festas realizadas</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-n">{RATING}★</span><span className="stat-l">{REVIEWS} avaliações Google</span></div>
            <div className="stat-div" />
            <div className="stat"><span className="stat-n">Campinas</span><span className="stat-l">Nova Campinas · SP</span></div>
          </div>
        </div>
        {/* VISUAL */}
        <div className="hero-visual reveal-right">
          <div className="hero-card">🎈</div>
          <div className="hero-float-card">
            <div className="fc-ico">💝</div>
            <div className="fc-txt"><strong>Feito com amor</strong><span>em cada detalhe</span></div>
          </div>
          <div className="hero-float-card2">
            <div className="fc-ico">✨</div>
            <div className="fc-txt2"><strong>Exclusivo</strong><span>para você</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SOBRE ────────────────────────────────────────────────────────────────────
function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <div className="sobre-inner">
        <div className="sobre-art reveal-left">
          <div className="sobre-blob">🎀</div>
          <div className="sobre-badge">
            <span className="b-ico">⭐</span>
            <div><strong>Mais de 500 famílias</strong><span>atendidas com carinho</span></div>
          </div>
        </div>
        <div className="reveal-right">
          <div className="section-eyebrow">Quem somos</div>
          <h2 className="sec">Uma equipe apaixonada por <em>criar alegria</em></h2>
          <p className="sec-lead">
            Somos especialistas em transformar ambientes com decorações únicas e cheias de
            personalidade. Cada projeto é tratado com o cuidado que só quem ama o que faz
            consegue oferecer.
          </p>
          <ul className="checks">
            <li>Atendimento próximo, atencioso e totalmente personalizado</li>
            <li>Projetos exclusivos pensados para cada cliente</li>
            <li>Experiência em festas infantis, eventos e datas especiais</li>
            <li>Materiais de alta qualidade com acabamento impecável</li>
            <li>Pontualidade e comprometimento em todas as entregas</li>
          </ul>
          <div className="quote-block">
            <p>"Cada festa é única e merece um toque especial."</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVIÇOS ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"🎈", cls:"si1", title:"Decoração com Balões",      desc:"Arcos, colunas, painéis e instalações personalizadas para transformar completamente qualquer ambiente.",            tag:"✦ Mais pedido" },
  { icon:"🎊", cls:"si2", title:"Balões Personalizados",     desc:"Com nomes, temas e estampas exclusivas, cada balão se torna uma obra de arte e lembrança especial.",            tag:"✦ Exclusivo" },
  { icon:"🎁", cls:"si3", title:"Presentes Criativos",       desc:"Cestas e kits personalizados para surpreender quem você ama com muito charme, carinho e criatividade.",          tag:"✦ Surpreenda" },
  { icon:"🎀", cls:"si4", title:"Surpresas Decoradas",       desc:"Caixas surpresa, buquês de balões e entregas especiais para tornar cada momento verdadeiramente inesquecível.", tag:"✦ Emocionante" },
  { icon:"🥳", cls:"si5", title:"Festas Infantis Completas", desc:"Decorações temáticas para a festa do seu filho ser a mais linda, divertida e memorável que já viram.",         tag:"✦ Para os pequenos" },
];

function Servicos() {
  return (
    <section className="servicos" id="servicos">
      <div className="sec-header reveal">
        <div className="section-eyebrow">O que oferecemos</div>
        <h2 className="sec">Serviços feitos com <em>capricho e cuidado</em></h2>
        <p className="sec-lead">Cada serviço é planejado para superar suas expectativas e criar experiências únicas que ficarão na memória.</p>
      </div>
      <div className="serv-grid">
        {SERVICES.map((s, i) => (
          <div className="serv-card reveal" key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className={`serv-img ${s.cls}`}>{s.icon}</div>
            <div className="serv-body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="serv-pill">{s.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── GALERIA ──────────────────────────────────────────────────────────────────
const GALLERY = [
  { icon:"🎈", cls:"gf1", label:"Arco Rose Gold" },
  { icon:"🌟", cls:"gf2", label:"Decoração Dourada Luxo" },
  { icon:"🎊", cls:"gf3", label:"Mesa dos Doces Temática" },
  { icon:"💜", cls:"gf4", label:"Painel Personalizado" },
  { icon:"🎀", cls:"gf5", label:"Surpresa Especial" },
];

function Galeria() {
  return (
    <section className="galeria" id="galeria">
      <div className="sec-header reveal">
        <div className="section-eyebrow" style={{ color:"#f2a7b8", justifyContent:"center" }}>Nosso trabalho</div>
        <h2 className="sec">Uma galeria de <em>momentos lindos</em></h2>
        <p className="sec-lead">Cada foto conta uma história de carinho, dedicação e muito amor pelo que fazemos.</p>
      </div>
      <div className="gal-grid reveal">
        {GALLERY.map((g) => (
          <div className="gal-item" key={g.label}>
            <div className={`g-face ${g.cls}`}>{g.icon}</div>
            <div className="g-overlay"><span>{g.label}</span></div>
          </div>
        ))}
      </div>
      <div className="gal-cta reveal">
        <a href={WA_LINK} className="btn-outline-w" target="_blank" rel="noopener">
          <WaIcon size={18} /> Quero uma decoração assim!
        </a>
      </div>
    </section>
  );
}

// ─── DEPOIMENTOS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    av: "M", cls: "av1", name: "Mariana", role: "Festa de aniversário infantil",
    text: "Tudo impecável! Que capricho em cada detalhe! Fiz a festa de uma das minhas filhas e fiquei mais que satisfeita com o resultado! O atendimento das meninas é show de bola! Ainda apaixonada nesses balões.",
  },
  {
    av: "P", cls: "av2", name: "Patricia Schober", role: "Decoração de evento corporativo",
    text: "Super recomendo o trabalho da Daniela! Desde a elaboração do projeto até a entrega. Tudo dentro do prazo e com um resultado muito além do esperado! Profissionalismo e carinho em cada detalhe.",
  },
  {
    av: "L", cls: "av3", name: "Letícia Cristina Cavalheiro", role: "Festa de 15 anos",
    text: "Experiência melhor impossível! Atendimento rápido, delicado e com preço justo. Estamos apaixonados com a qualidade! Com certeza voltaremos para todos os nossos próximos eventos.",
  },
];

function Depoimentos() {
  return (
    <section className="depo" id="depoimentos">
      <div className="sec-header reveal" style={{ maxWidth:"600px", margin:"0 auto 52px" }}>
        <div className="section-eyebrow">Avaliações reais</div>
        <h2 className="sec">O que nossos clientes <em>dizem sobre nós</em></h2>
        <p className="sec-lead">Nada nos deixa mais felizes do que ver o sorriso de quem confia no nosso trabalho.</p>
      </div>
      <div className="depo-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className="depo-card reveal" key={t.name} style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="stars-row">★★★★★</div>
            <p className="depo-text">"{t.text}"</p>
            <div className="depo-author">
              <div className={`av ${t.cls}`}>{t.av}</div>
              <div className="depo-name">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DIFERENCIAIS ────────────────────────────────────────────────────────────
const DIFS = [
  { ico:"⚡", title:"Atendimento rápido e atencioso",    sub:"Respondemos em minutos e tiramos todas as suas dúvidas com carinho" },
  { ico:"💎", title:"Produtos de alta qualidade",        sub:"Utilizamos apenas materiais premium para garantir o melhor resultado" },
  { ico:"🎯", title:"Entrega no prazo garantida",        sub:"Pontualidade é um dos nossos maiores compromissos com você" },
  { ico:"✨", title:"Projetos 100% personalizados",      sub:"Cada decoração é única, criada especialmente para o seu evento" },
  { ico:"🏆", title:"500+ festas realizadas",            sub:"Experiência e credibilidade comprovadas pelos nossos clientes" },
];

function Diferenciais() {
  return (
    <section className="dif" id="diferenciais">
      <div className="dif-inner">
        <div className="reveal-left">
          <div className="section-eyebrow">Por que nos escolher</div>
          <h2 className="sec">O que nos torna <em>especiais</em></h2>
          <p className="sec-lead" style={{ marginBottom:"28px" }}>
            Cada entrega é uma promessa cumprida. Comprometimento, qualidade e amor em tudo o que fazemos.
          </p>
          <div className="dif-list">
            {DIFS.map((d, i) => (
              <div className="dif-item" key={d.title} style={{ transitionDelay:`${i*0.07}s` }}>
                <div className="dif-icon">{d.ico}</div>
                <div className="dif-txt"><strong>{d.title}</strong><span>{d.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="dif-mosaic reveal-right">
          <div className="dif-row-m">
            <div className="dif-tile dt1"><div className="tile-ico">🎈</div><div className="tile-lbl" style={{color:"#fff"}}>Balões de Alta Qualidade</div></div>
            <div className="dif-tile dt2"><div className="tile-ico">⭐</div><div className="tile-lbl">Avaliação 5 Estrelas em Tudo</div></div>
          </div>
          <div className="dif-row-m">
            <div className="dif-tile dt3"><div className="tile-ico">💝</div><div className="tile-lbl">Presentes Feitos com Amor</div></div>
            <div className="dif-tile dt4"><div className="tile-ico">🎊</div><div className="tile-lbl" style={{color:"#fff"}}>Festas que Marcam para Sempre</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ───────────────────────────────────────────────────────────────
function CtaFinal() {
  return (
    <section className="cta-final">
      <div className="cta-inner reveal">
        <div className="section-eyebrow" style={{ color:"#f5e0a8", justifyContent:"center" }}>Vamos começar?</div>
        <h2 className="sec">Vamos criar algo <em>lindo</em> para sua festa?</h2>
        <p className="cta-sub">
          Peça seu orçamento agora e surpreenda quem você ama. Nossa equipe está pronta para
          transformar sua ideia em uma celebração verdadeiramente inesquecível.
        </p>
        <a href={WA_LINK} className="btn-wa-xl" target="_blank" rel="noopener">
          <WaIcon size={26} /> Falar no WhatsApp agora
        </a>
        <p className="cta-note">🔒 Sem compromisso · Orçamento gratuito · Resposta rápida</p>
        <div className="cta-balloons">
          {["🎈","🎊","🎈"].map((b, i) => (
            <span key={i} className="cta-b" style={{ animationDuration:`${3.5 + i * 0.5}s` }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INFO BAR ─────────────────────────────────────────────────────────────────
// Quick-access strip: rating · phone · address · hours badge
function InfoBar() {
  const [hoursOpen, setHoursOpen] = useState(false);
  const today = new Date().getDay(); // 0=Sun … 6=Sat
  // Map JS day index → our HOURS array index (Mon=0 … Sun=6)
  const dayMap = [6,0,1,2,3,4,5];
  const todayInfo = HOURS[dayMap[today]];
  const isOpen = todayInfo && todayInfo.h !== "Fechado";

  return (
    <div className="info-bar">
      <div className="info-bar-inner">
        {/* Rating */}
        <a href="https://g.co/kgs/balonista" target="_blank" rel="noopener" className="ib-item ib-rating">
          <span className="ib-stars">★ {RATING}</span>
          <span className="ib-sub">({REVIEWS} avaliações Google)</span>
        </a>
        {/* Phone */}
        <a href={`tel:${PHONE.replace(/\D/g,"")}`} className="ib-item">
          <span>📞</span><span>{PHONE}</span>
        </a>
        {/* Address */}
        <a href={MAPS_LINK} target="_blank" rel="noopener" className="ib-item ib-addr">
          <span>📍</span><span>Nova Campinas, Campinas/SP</span>
        </a>
        {/* Hours toggle */}
        <button className="ib-item ib-hours-btn" onClick={() => setHoursOpen(o=>!o)}>
          <span className={`ib-dot ${isOpen ? "open" : "closed"}`} />
          <span>{isOpen ? "Aberto agora" : "Fechado"} — {todayInfo?.h}</span>
          <span className="ib-caret">{hoursOpen ? "▲" : "▼"}</span>
        </button>
      </div>
      {/* Dropdown hours */}
      {hoursOpen && (
        <div className="ib-hours-drop">
          {HOURS.map((h, i) => (
            <div key={h.day} className={`ib-hr-row ${dayMap[today] === i ? "today" : ""}`}>
              <span>{h.day}</span><span>{h.h}</span>
            </div>
          ))}
          <p className="ib-note">⚠️ Horários sujeitos a alteração em feriados</p>
        </div>
      )}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <a href="#hero" className="footer-logo">Balonista ✦</a>
          <p className="footer-desc">
            Decorações com balões e presentes personalizados feitos com carinho.
            Transformamos seus sonhos em decorações inesquecíveis em Campinas/SP.
          </p>
          {/* Google rating badge */}
          <div className="footer-rating">
            <span className="fr-stars">★★★★★</span>
            <div>
              <strong>{RATING} no Google</strong>
              <span>{REVIEWS} avaliações de clientes</span>
            </div>
          </div>
          <div className="footer-social">
            <a href={INSTA_LINK} className="soc soc-ig" target="_blank" rel="noopener" aria-label="Instagram">📸</a>
            <a href={WA_LINK}    className="soc soc-wa" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Serviços</h4>
          <ul>
            {["🎈 Decoração com Balões","🎊 Balões Personalizados","🎁 Presentes Criativos","🎀 Surpresas Especiais","🥳 Festas Infantis"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contato & Localização</h4>
          <ul>
            <li><a href={WA_LINK} target="_blank" rel="noopener">💬 {PHONE}</a></li>
            <li><a href={INSTA_LINK} target="_blank" rel="noopener">📸 @balonistapresentes</a></li>
            <li><a href={MAPS_LINK} target="_blank" rel="noopener">📍 Av. Dr. Jesuíno M. Machado, 2432</a></li>
            <li style={{color:"rgba(255,255,255,.4)", fontSize:".78rem"}}>Nova Campinas — Campinas/SP, 13092-108</li>
          </ul>
          <div className="footer-hours">
            <strong>🕐 Horário de Atendimento</strong>
            {HOURS.filter(h => h.h !== "Fechado").slice(0,2).map(h => (
              <span key={h.day}>{h.day}: {h.h}</span>
            ))}
            <span style={{opacity:.55, fontSize:".75rem"}}>Seg. e Dom.: Fechado</span>
          </div>
        </div>
      </div>

      <div className="footer-badges">
        <span className="fbadge">🏳️‍🌈 Empresa LGBTQ+ Friendly</span>
        <span className="fbadge">👩‍💼 Empresa de Empreendedoras</span>
        <span className="fbadge">📦 Entrega · Retirada · Loja</span>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Balonista Presentes e Balões · Campinas/SP</span>
        <span style={{ color:"rgba(255,255,255,.3)" }}>Feito com 💝 para alegrar sua festa</span>
      </div>
    </footer>
  );
}

// ─── WA FLOAT ────────────────────────────────────────────────────────────────
function WaFloat() {
  return (
    <a href={WA_LINK} className="wa-float" target="_blank" rel="noopener">
      <WaIcon size={20} />
      <span className="wa-label">Solicitar Orçamento</span>
    </a>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();
  return (
    <>
      <style>{style}</style>
      <WaFloat />
      <Navbar />
      <InfoBar />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Galeria />
        <Depoimentos />
        <Diferenciais />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
