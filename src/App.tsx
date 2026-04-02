import { useState, useEffect, useRef } from "react";

const CONFIG = {
  bootcampStart: new Date("2025-07-14T09:00:00"),
  seatsTotal: 30, seatsTaken: 7,
  email: "eshanramji@gmail.com", phone: "778-227-1710",
  prices: { deposit: 50, family: 599, couple: 629, individual: 459 },
  membershipPrice: 39, addOnPrice: 97,
};

const G = "#34c759";
const GD = "rgba(52,199,89,.12)";
const GB = "rgba(52,199,89,.22)";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:#000;color:#f5f5f7;font-family:'Inter',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:2px}
  a{color:inherit;text-decoration:none}
  button{cursor:pointer;font-family:'Inter',sans-serif}
  input,textarea,select{outline:none;font-family:'Inter',sans-serif}

  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes shimmer{0%{background-position:-400% 0}100%{background-position:400% 0}}
  @keyframes heroIn{0%{opacity:0;transform:translateY(32px)}100%{opacity:1;transform:translateY(0)}}
  @keyframes gridFade{0%,100%{opacity:.016}50%{opacity:.032}}
  @keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shine{0%{left:-120%}60%,100%{left:120%}}
  @keyframes dotPop{0%{transform:scale(0)}80%{transform:scale(1.35)}100%{transform:scale(1)}}
  @keyframes logoStroke{0%{stroke-dashoffset:600}100%{stroke-dashoffset:0}}
  @keyframes logoPulse{0%,100%{filter:drop-shadow(0 0 6px rgba(255,255,255,.08))}50%{filter:drop-shadow(0 0 24px rgba(255,255,255,.22))}}
  @keyframes miniDraw{from{stroke-dashoffset:500}to{stroke-dashoffset:0}}
  @keyframes chartDraw{from{stroke-dashoffset:2400}to{stroke-dashoffset:0}}
  @keyframes greenGlow{0%,100%{box-shadow:0 0 0 0 rgba(52,199,89,0)}50%{box-shadow:0 0 48px 4px rgba(52,199,89,.1)}}
  @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:.28;transform:scale(1)}50%{opacity:.9;transform:scale(1.14)}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes lineExtend{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes numberIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  @keyframes borderPulse{0%,100%{border-color:rgba(52,199,89,.18)}50%{border-color:rgba(52,199,89,.45)}}
  @keyframes ringOut{0%{transform:scale(.7);opacity:.5}100%{transform:scale(2.2);opacity:0}}
  @keyframes glowDot{0%,100%{box-shadow:0 0 0 0 rgba(52,199,89,.4)}50%{box-shadow:0 0 0 8px rgba(52,199,89,0)}}
  @keyframes scanLine{0%{top:-2px}100%{top:calc(100% + 2px)}}
  @keyframes reveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}

  .rv{opacity:0;transform:translateY(38px);transition:opacity .95s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1)}
  .rvl{opacity:0;transform:translateX(-48px);transition:opacity .95s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1)}
  .rvr{opacity:0;transform:translateX(48px);transition:opacity .95s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1)}
  .vis{opacity:1!important;transform:none!important}
  .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}.d5{transition-delay:.35s}.d6{transition-delay:.42s}
  .page-wrap{animation:pageIn .6s cubic-bezier(.16,1,.3,1) both}

  .loader{position:fixed;inset:0;background:#000;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;transition:opacity 1s ease,visibility 1s ease}
  .loader.out{opacity:0;visibility:hidden;pointer-events:none}

  .bw{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#000;font-weight:600;font-size:14px;letter-spacing:-.3px;padding:13px 30px;border-radius:980px;border:none;transition:all .35s cubic-bezier(.16,1,.3,1)}
  .bw::after{content:'';position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,0,0,.08),transparent);transform:skewX(-20deg);animation:shine 3s ease-in-out infinite}
  .bw:hover{background:#e8e8ed;transform:scale(1.045) translateY(-2px);box-shadow:0 16px 44px rgba(255,255,255,.18)}
  .bg{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,.055);color:#fff;font-weight:500;font-size:14px;letter-spacing:-.3px;padding:12px 28px;border-radius:980px;border:1px solid rgba(255,255,255,.12);transition:all .35s cubic-bezier(.16,1,.3,1)}
  .bg::after{content:'';position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);transform:skewX(-20deg);animation:shine 3.4s 1s ease-in-out infinite}
  .bg:hover{background:rgba(255,255,255,.11);border-color:rgba(255,255,255,.28);transform:scale(1.045) translateY(-2px)}
  .bgn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${GD};color:${G};font-weight:600;font-size:14px;letter-spacing:-.3px;padding:12px 28px;border-radius:980px;border:1px solid ${GB};transition:all .35s cubic-bezier(.16,1,.3,1)}
  .bgn::after{content:'';position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(52,199,89,.1),transparent);transform:skewX(-20deg);animation:shine 3.2s .5s ease-in-out infinite}
  .bgn:hover{background:rgba(52,199,89,.2);transform:scale(1.045) translateY(-2px);box-shadow:0 14px 38px rgba(52,199,89,.18)}

  .gc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;transition:all .5s cubic-bezier(.16,1,.3,1)}
  .gc:hover{background:rgba(255,255,255,.055);border-color:rgba(255,255,255,.13);transform:translateY(-7px);box-shadow:0 28px 72px rgba(0,0,0,.65)}
  .dc{background:#070707;border:1px solid #151515;border-radius:20px;transition:all .5s cubic-bezier(.16,1,.3,1)}
  .dc:hover{border-color:#222;transform:translateY(-6px);box-shadow:0 22px 58px rgba(0,0,0,.55)}
  .gcard{background:#070707;border:1px solid #151515;border-radius:20px;transition:all .5s cubic-bezier(.16,1,.3,1)}
  .gcard:hover{border-color:${GB};transform:translateY(-7px);box-shadow:0 28px 72px rgba(0,0,0,.55),0 0 48px rgba(52,199,89,.05)}

  .w{max-width:1060px;margin:0 auto;padding:0 28px}
  .ws{max-width:700px;margin:0 auto;padding:0 28px}
  .sec{padding:104px 0;position:relative;z-index:1}
  .g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}

  h1{font-size:clamp(40px,7vw,88px);font-weight:700;line-height:1.03;letter-spacing:-3.5px;color:#fff}
  h2{font-size:clamp(26px,4.5vw,56px);font-weight:700;line-height:1.06;letter-spacing:-2px;color:#fff}
  h3{font-size:clamp(17px,2.2vw,28px);font-weight:600;letter-spacing:-.8px;color:#fff}
  h4{font-size:16px;font-weight:600;letter-spacing:-.3px;color:#fff}
  p{line-height:1.76;color:#aeaeb2}
  em{font-style:normal;color:#e8e8ed}
  .lbl{font-size:10px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:#555}
  .tag{display:inline-block;background:rgba(255,255,255,.04);color:#c8c8cc;font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:5px 14px;border-radius:980px;border:1px solid rgba(255,255,255,.09)}
  .gtag{display:inline-block;background:${GD};color:${G};font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:5px 14px;border-radius:980px;border:1px solid ${GB}}
  .sh{background:linear-gradient(90deg,#fff 0%,#555 38%,#fff 55%,#555 100%);background-size:400%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 8s ease-in-out infinite}

  .fg{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
  .fg label{font-size:10px;font-weight:600;letter-spacing:1.2px;color:#555;text-transform:uppercase}
  .fg input,.fg textarea,.fg select{background:#070707;border:1px solid #181818;color:#fff;padding:13px 16px;border-radius:12px;font-size:14px;transition:border .25s,background .2s}
  .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:rgba(255,255,255,.28);background:#0d0d0d}
  .fg select option{background:#070707}

  .ai{border-bottom:1px solid #0d0d0d}
  .ah{display:flex;align-items:center;justify-content:space-between;padding:22px 0;cursor:pointer}
  .at{font-size:15px;font-weight:500;color:#666;transition:color .25s;letter-spacing:-.3px}
  .ah:hover .at{color:#fff}
  .ab{max-height:0;overflow:hidden;transition:max-height .65s cubic-bezier(.16,1,.3,1)}
  .ab.open{max-height:600px}

  nav{position:fixed;top:0;left:0;right:0;z-index:999;backdrop-filter:saturate(200%) blur(32px);-webkit-backdrop-filter:saturate(200%) blur(32px);background:rgba(0,0,0,.78);border-bottom:1px solid rgba(255,255,255,.045)}

  .tick{overflow:hidden;border-top:1px solid #0a0a0a;border-bottom:1px solid #0a0a0a;padding:14px 0}
  .ti{display:flex;width:max-content;animation:ticker 44s linear infinite}
  .titem{white-space:nowrap;padding:0 36px;font-size:10px;font-weight:500;color:#252525;letter-spacing:1.2px;border-right:1px solid #0a0a0a}

  .bg-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);background-size:88px 88px}

  .chart-line{stroke-dasharray:2400;stroke-dashoffset:2400;animation:chartDraw 2.6s .2s cubic-bezier(.16,1,.3,1) forwards}
  .mini-line{stroke-dasharray:500;stroke-dashoffset:500;animation:miniDraw 1.9s .1s cubic-bezier(.16,1,.3,1) forwards}

  footer{background:#040404;border-top:1px solid #0d0d0d;padding:68px 0 42px}
  @media(max-width:760px){h1{letter-spacing:-2px}.sec{padding:76px 0}}
`;

/* ── LOGO ── */
function Pyr({ size = 28, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      style={animated ? { animation: "logoPulse 3s ease-in-out infinite" } : {}}>
      <polygon points="32,4 60,58 4,58" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="1.4" strokeLinejoin="round"
        style={animated ? { strokeDasharray: 300, strokeDashoffset: 0, animation: "logoStroke 1.2s ease forwards" } : {}} />
      <polygon points="32,18 52,58 12,58" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="32,32 44,58 20,58" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.12)" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="32,44 38,58 26,58" fill="rgba(52,199,89,.15)" stroke="rgba(52,199,89,.28)" strokeWidth=".8" strokeLinejoin="round" />
      <line x1="32" y1="4" x2="32" y2="58" stroke="rgba(255,255,255,.06)" strokeWidth=".8" strokeDasharray="3 4" />
      <circle cx="32" cy="4" r="2.2" fill="rgba(255,255,255,.82)" />
      <circle cx="32" cy="18" r="1.4" fill="rgba(255,255,255,.35)" />
      <circle cx="32" cy="32" r="1.1" fill={G} opacity=".55" />
      <line x1="4" y1="58" x2="60" y2="58" stroke={G} strokeWidth="1.1" strokeLinecap="round" opacity=".45" />
      <circle cx="4" cy="58" r="1.4" fill="rgba(255,255,255,.28)" />
      <circle cx="60" cy="58" r="1.4" fill="rgba(255,255,255,.28)" />
    </svg>
  );
}

function PyramidSVG({ size = 280 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 320 300" fill="none" style={{ animation: "float 7s ease-in-out infinite" }}>
      <defs>
        <linearGradient id="pg1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,.1)" /><stop offset="100%" stopColor="rgba(255,255,255,.02)" />
        </linearGradient>
        <radialGradient id="gGrad" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="rgba(52,199,89,.15)" /><stop offset="100%" stopColor="rgba(52,199,89,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="274" rx="150" ry="16" fill="url(#gGrad)" />
      <polygon points="160,20 305,270 15,270" fill="url(#pg1)" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
      <polygon points="160,72 265,270 55,270" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
      <polygon points="160,124 225,270 95,270" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
      <polygon points="160,170 195,270 125,270" fill="rgba(255,255,255,.07)" stroke="rgba(52,199,89,.14)" strokeWidth="1" />
      <polygon points="160,210 178,270 142,270" fill="rgba(52,199,89,.1)" stroke="rgba(52,199,89,.22)" strokeWidth=".8" />
      <line x1="160" y1="20" x2="160" y2="270" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="5 5" />
      <line x1="15" y1="270" x2="305" y2="270" stroke={G} strokeWidth="1" opacity=".35" />
      <circle cx="160" cy="20" r="3.5" fill="rgba(255,255,255,.75)" />
      {[[72,"Foundation"],[124,"Strategy"],[170,"Systems"],[210,"Execution"]].map(([y,l])=>(
        <g key={l}>
          <circle cx="160" cy={y} r="2" fill="rgba(255,255,255,.35)" />
          <text x="168" y={y+4} fill="rgba(255,255,255,.14)" fontSize="7.5" fontFamily="Inter" letterSpacing="1.6">{l.toUpperCase()}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── CHARTS ── */
function FullChart({ data, color = G, h = 130 }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDrawn(true); }, { threshold: .2 });
    if (ref.current) io.observe(ref.current); return () => io.disconnect();
  }, []);
  const w = 700, min = Math.min(...data), max = Math.max(...data);
  const sx = i => (i / (data.length - 1)) * w;
  const sy = v => h - ((v - min) / (max - min)) * (h - 14) - 7;
  const pts = data.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
  const fill = `0,${h} ` + data.map((v, i) => `${sx(i)},${sy(v)}`).join(" ") + ` ${w},${h}`;
  const gid = useRef(`fc${Math.random().toString(36).slice(2, 7)}`).current;
  return (
    <div ref={ref}>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".22" /><stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={gid + "l"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity=".35" /><stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        {[.25, .5, .75].map(y => <line key={y} x1="0" y1={sy(min + (max - min) * (1 - y))} x2={w} y2={sy(min + (max - min) * (1 - y))} stroke="rgba(255,255,255,.025)" strokeWidth="1" />)}
        <polygon points={fill} fill={`url(#${gid})`} />
        <polyline points={pts} fill="none" stroke={`url(#${gid + "l"})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 2400, strokeDashoffset: drawn ? 0 : 2400, transition: "stroke-dashoffset 2.6s cubic-bezier(.16,1,.3,1)" }} />
        {drawn && [0, Math.floor(data.length / 2), data.length - 1].map(i => (
          <circle key={i} cx={sx(i)} cy={sy(data[i])} r={i === data.length - 1 ? 4.5 : 2.5}
            fill={i === data.length - 1 ? color : "rgba(255,255,255,.25)"}
            style={{ animation: `dotPop .4s ${.3 + i * .01}s both` }} />
        ))}
      </svg>
    </div>
  );
}

function HeroChart() {
  const pts = [[0,.72],[.12,.58],[.24,.64],[.36,.42],[.48,.46],[.6,.28],[.74,.23],[.87,.16],[1,.1]];
  const w = 900, h = 140;
  const sx = t => t * w, sy = t => t * h;
  const line = pts.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");
  const fill = pts.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ") + ` ${sx(1)},${h} 0,${h}`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="hcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G} stopOpacity=".2" /><stop offset="100%" stopColor={G} stopOpacity="0" /></linearGradient>
        <linearGradient id="hcl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={G} stopOpacity=".3" /><stop offset="100%" stopColor={G} /></linearGradient>
      </defs>
      {[.25,.5,.75].map(y=><line key={y} x1="0" y1={sy(y)} x2={w} y2={sy(y)} stroke="rgba(255,255,255,.022)" strokeWidth="1"/>)}
      <polygon points={fill} fill="url(#hcg)"/>
      <polyline points={line} fill="none" stroke="url(#hcl)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="chart-line"/>
      {pts.map(([x,y],i)=><circle key={i} cx={sx(x)} cy={sy(y)} r={i===pts.length-1?5:2.5} fill={i===pts.length-1?G:"rgba(255,255,255,.25)"} style={{animation:`dotPop .4s ${.3+i*.09}s both`}}/>)}
    </svg>
  );
}

/* ── COUNTER ── */
function Counter({ end, prefix = "", suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0); const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { let v = 0; const step = end / 80; const t = setInterval(() => { v += step; if (v >= end) { setVal(end); clearInterval(t); } else setVal(parseFloat(v.toFixed(decimals))); }, 16); }
    }, { threshold: .5 });
    if (ref.current) io.observe(ref.current); return () => io.disconnect();
  }, [end]);
  const fmt = n => decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString();
  return <span ref={ref} style={{ animation: "numberIn .5s ease both" }}>{prefix}{fmt(val)}{suffix}</span>;
}

/* ── COUNTDOWN ── */
function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => { const d = CONFIG.bootcampStart - Date.now(); if (d <= 0) return; setT({ d: Math.floor(d / 86400000), h: Math.floor((d % 86400000) / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) }); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "inline-flex", gap: 18, alignItems: "center", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: "18px 30px" }}>
      {[["d","Days"],["h","Hrs"],["m","Min"],["s","Sec"]].reduce((acc,[k,l],i)=>[...acc,...(i>0?[<span key={`s${i}`} style={{color:"#181818",fontSize:22}}>:</span>]:[]),<div key={k} style={{textAlign:"center",minWidth:46}}><div style={{fontSize:"clamp(22px,4vw,38px)",fontWeight:700,color:"#fff",lineHeight:1,fontVariantNumeric:"tabular-nums",transition:"all .3s"}}>{String(t[k]).padStart(2,"0")}</div><div style={{fontSize:9,letterSpacing:1.8,color:"#383838",textTransform:"uppercase",marginTop:5}}>{l}</div></div>],[])}
    </div>
  );
}

/* ── LOADER ── */
function Loader({ onDone }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); c.width = window.innerWidth; c.height = window.innerHeight;
    const cx = c.width / 2, cy = c.height / 2;
    const particles = Array.from({ length: 160 }, () => {
      const angle = Math.random() * Math.PI * 2, speed = Math.random() * 3.8 + .8;
      return { x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, maxLife: Math.random() * 50 + 28, size: Math.random() * 1.4 + .2, green: Math.random() > .72 };
    });
    let af, frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life < p.maxLife) { alive = true; p.life++; p.x += p.vx * (1 - p.life / p.maxLife); p.y += p.vy * (1 - p.life / p.maxLife); p.vx *= .968; p.vy *= .968; }
        const a = Math.max(0, 1 - p.life / p.maxLife);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.green ? `rgba(52,199,89,${a * .8})` : `rgba(210,210,210,${a})`; ctx.fill();
      });
      frame++;
      if (alive || frame < 55) af = requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, c.width, c.height); setPhase(1); }
    };
    draw(); return () => cancelAnimationFrame(af);
  }, []);
  useEffect(() => {
    if (phase === 1) { const t = setTimeout(() => setPhase(2), 500); return () => clearTimeout(t); }
    if (phase === 2) { let p = 0; const id = setInterval(() => { p += 2; setProgress(Math.min(100, p)); if (p >= 100) { clearInterval(id); setTimeout(() => { setPhase(3); setTimeout(onDone, 800); }, 300); } }, 24); return () => clearInterval(id); }
  }, [phase]);
  return (
    <div className={`loader${phase === 3 ? " out" : ""}`}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: phase >= 1 ? 1 : 0, transition: "opacity .7s ease" }}>
        <div style={{ position: "relative" }}>
          <Pyr size={60} animated />
          {phase >= 2 && [1, 2].map(i => (
            <div key={i} style={{ position: "absolute", inset: -i * 12, borderRadius: "50%", border: `1px solid rgba(52,199,89,${.2 / i})`, animation: `ringOut ${1.2 + i * .4}s ${i * .3}s ease-out infinite` }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 12, letterSpacing: 4, color: "#666", textTransform: "uppercase", fontWeight: 500 }}>Apex Holdings</span>
          <span style={{ fontSize: 9, letterSpacing: 3, color: "#1e1e1e", textTransform: "uppercase" }}>Est. 2025</span>
        </div>
        {phase >= 2 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 140, height: 1, background: "#0e0e0e", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg,#2a2a2a,${G})`, width: `${progress}%`, transition: "width .03s linear" }} />
            </div>
            <span style={{ fontSize: 9, letterSpacing: 2, color: G, opacity: .55, fontVariantNumeric: "tabular-nums" }}>{Math.floor(progress)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

function BgGrid() { return <div className="bg-grid" />; }

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14, r: Math.random() * .55 + .18, green: i < 7 }));
    let af;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.green ? "rgba(52,199,89,.3)" : "rgba(255,255,255,.12)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 95) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(255,255,255,${.022 * (1 - d / 95)})`; ctx.lineWidth = .45; ctx.stroke(); }
      }
      af = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none", opacity: .38 }} />;
}

function Ticker() {
  const items = ["$400/mo · S&P 500 · 15 yrs", "TFSA · RRSP · FHSA · RESP", "Roth IRA · 529 · HSA · 401k", "Nasdaq-100 · 13.2% avg/yr", "Canada + United States", "No Stock Tips. Ever.", "Generational Wealth", "Dedicated Q&A Every Session", "Up to 30 People · Exclusive Cohort", "Private 1-on-1 Follow-Up Available", "Long-Term Only. Always."];
  return (
    <div className="tick">
      <div className="ti">{[...items, ...items].map((it, i) => <div key={i} className="titem">{it}</div>)}</div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const run = () => document.querySelectorAll(".rv,.rvl,.rvr").forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 36) el.classList.add("vis"); });
    run(); window.addEventListener("scroll", run, { passive: true }); return () => window.removeEventListener("scroll", run);
  });
}

/* ── NAV ── */
function Header({ page, nav }) {
  const [mob, setMob] = useState(false);
  const links = [["Examples","examples"],["Program","program"],["Mission","mission"],["About","about"],["Pricing","pricing"],["FAQ","faq"]];
  const go = p => { nav(p); setMob(false); };
  return (
    <nav>
      <div className="w" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
        <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
          <Pyr size={25} /><span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-.5px", color: "#fff" }}>Apex Holdings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }} id="dn">
          {links.map(([l, p]) => (
            <button key={p} onClick={() => go(p)} style={{ background: "none", border: "none", color: page === p ? "#fff" : "#3a3a3a", fontWeight: 500, fontSize: 13, padding: "7px 12px", borderRadius: 8, transition: "color .2s" }}>{l}</button>
          ))}
          <button className="bgn" onClick={() => go("intake")} style={{ padding: "8px 20px", fontSize: 13, marginLeft: 8 }}>Reserve Spot</button>
        </div>
        <button onClick={() => setMob(!mob)} id="hb" style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 20 }}>&#9776;</button>
        <style>{`@media(max-width:760px){#dn{display:none!important}#hb{display:block!important}}`}</style>
      </div>
      {mob && (<div style={{ background: "rgba(0,0,0,.97)", borderTop: "1px solid #0a0a0a", padding: "14px 28px 22px" }}>
        {links.map(([l, p]) => <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: page === p ? "#fff" : "#444", fontSize: 16, fontWeight: 500, padding: "11px 0" }}>{l}</button>)}
        <button className="bgn" onClick={() => go("intake")} style={{ width: "100%", padding: "12px", marginTop: 10 }}>Reserve Spot</button>
      </div>)}
    </nav>
  );
}

function Footer({ nav }) {
  return (
    <footer>
      <div className="w">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 36, marginBottom: 52 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}><Pyr size={22} /><span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Apex Holdings</span></div>
            <p style={{ fontSize: 13, maxWidth: 180, lineHeight: 1.75, color: "#2e2e2e" }}>Building generational wealth — one system at a time.</p>
          </div>
          {[["Navigate",[["Home","home"],["Examples","examples"],["Program","program"],["Mission","mission"],["About","about"],["Pricing","pricing"],["FAQ","faq"],["Contact","contact"]]],
          ["Contact",[[CONFIG.email],[CONFIG.phone],["Instagram (Soon)"],["LinkedIn (Soon)"]]],
          ["Legal",[["Education only"],["Not financial advice"],["No guarantees"],["Not SEC/IIROC registered"]]]].map(([title,items])=>(
            <div key={title}>
              <div className="lbl" style={{ marginBottom: 14, color: "#2a2a2a" }}>{title}</div>
              {items.map(([l, p], i) => (
                <div key={i} onClick={p ? () => nav(p) : undefined} style={{ color: "#252525", fontSize: 13, marginBottom: 9, cursor: p ? "pointer" : "default", transition: "color .2s" }}
                  onMouseEnter={e => { if (p) e.target.style.color = "#888"; }} onMouseLeave={e => { e.target.style.color = "#252525"; }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #0a0a0a", paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
          <p style={{ fontSize: 12, color: "#252525" }}>© 2025 Apex Holdings. All rights reserved.</p>
          <p style={{ fontSize: 11, color: "#1a1a1a" }}>Educational program. Not registered investment advice. Canada & United States.</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const SCENARIOS = [{ label: "$200/mo", monthly: 200 }, { label: "$400/mo", monthly: 400 }, { label: "$600/mo", monthly: 600 }];

const INDEX_DATA = [
  { name:"S&P 500", ticker:"SPY / VOO", country:"United States", cagr:10.4,
    returns:[{invested:36000,end:138500},{invested:72000,end:277000},{invested:108000,end:415500}],
    charts:[[100,109,118,111,130,142,138,155,168,162,179,194,210,228,248],[100,109,118,111,130,142,138,155,168,162,179,194,210,228,248].map(v=>v*2),[100,109,118,111,130,142,138,155,168,162,179,194,210,228,248].map(v=>v*3)],
    desc:"500 largest US companies. The broadest measure of the American economy and the most widely tracked index in the world." },
  { name:"Nasdaq-100", ticker:"QQQ / QQQM", country:"United States", cagr:13.2,
    returns:[{invested:36000,end:198000},{invested:72000,end:396000},{invested:108000,end:594000}],
    charts:[[100,114,130,120,148,168,155,182,200,190,218,242,268,298,332],[100,114,130,120,148,168,155,182,200,190,218,242,268,298,332].map(v=>v*2),[100,114,130,120,148,168,155,182,200,190,218,242,268,298,332].map(v=>v*3)],
    desc:"The top 100 non-financial companies on Nasdaq. Technology-heavy. Higher long-term returns with higher short-term swings." },
  { name:"S&P/TSX Composite", ticker:"XIC.TO / VCN.TO", country:"Canada", cagr:7.8,
    returns:[{invested:36000,end:104000},{invested:72000,end:208000},{invested:108000,end:312000}],
    charts:[[100,106,112,108,118,126,122,132,140,136,146,154,163,172,182],[100,106,112,108,118,126,122,132,140,136,146,154,163,172,182].map(v=>v*2),[100,106,112,108,118,126,122,132,140,136,146,154,163,172,182].map(v=>v*3)],
    desc:"Canada's primary equity index. Core to any TFSA or RRSP strategy. Heavily weighted toward financials and energy." },
  { name:"MSCI World", ticker:"XWD.TO / VT", country:"Global", cagr:9.1,
    returns:[{invested:36000,end:124000},{invested:72000,end:248000},{invested:108000,end:372000}],
    charts:[[100,108,116,110,124,134,130,143,154,148,162,174,188,203,220],[100,108,116,110,124,134,130,143,154,148,162,174,188,203,220].map(v=>v*2),[100,108,116,110,124,134,130,143,154,148,162,174,188,203,220].map(v=>v*3)],
    desc:"Approximately 1,500 companies across 23 developed markets. The most globally diversified single-fund option available." },
];

const STOCK_DATA = [
  { name:"Apple", ticker:"AAPL", cagr:29.2, returns:[{invested:36000,end:682000},{invested:72000,end:1364000},{invested:108000,end:2046000}], charts:[[100,140,175,165,210,255,240,310,390,355,460,560,650,760,880]], note:"Illustrative. Based on approximate historical price data. Not a prediction." },
  { name:"Microsoft", ticker:"MSFT", cagr:23.1, returns:[{invested:36000,end:312000},{invested:72000,end:624000},{invested:108000,end:936000}], charts:[[100,118,140,155,178,200,240,290,350,310,400,480,540,590,640]], note:"Illustrative. Based on approximate historical price data. Not a prediction." },
  { name:"Amazon", ticker:"AMZN", cagr:22.4, returns:[{invested:36000,end:285000},{invested:72000,end:570000},{invested:108000,end:855000}], charts:[[100,160,240,320,380,440,520,600,800,640,900,1100,900,960,1040]], note:"Illustrative. Based on approximate historical price data. Not a prediction." },
  { name:"Alphabet", ticker:"GOOGL", cagr:18.8, returns:[{invested:36000,end:198000},{invested:72000,end:396000},{invested:108000,end:594000}], charts:[[100,130,170,200,230,280,320,380,440,380,430,480,440,460,510]], note:"Illustrative. Based on approximate historical price data. Not a prediction." },
  { name:"Nvidia", ticker:"NVDA", cagr:55.4, returns:[{invested:36000,end:3200000},{invested:72000,end:6400000},{invested:108000,end:9600000}], charts:[[100,110,130,140,200,240,200,260,380,280,420,600,1000,1800,2400]], note:"Extreme historical outlier. Not representative of typical outcomes. Provided for context only.", outlier:true },
];

function fmtVal(v) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(2)}M`;
  return `$${v.toLocaleString()}`;
}

/* ── INDEX CARD ── */
function IndexCard({ idx }) {
  const [sel, setSel] = useState(1);
  const sc = idx.returns[sel];
  const gain = Math.round(((sc.end - sc.invested) / sc.invested) * 100);
  return (
    <div className="gcard" style={{ padding: "28px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <div className="lbl" style={{ marginBottom: 6 }}>{idx.country} · {idx.ticker}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-.5px" }}>{idx.name}</div>
        </div>
        <div style={{ background: GD, border: `1px solid ${GB}`, borderRadius: 100, padding: "3px 11px", fontSize: 11, color: G, fontWeight: 600, whiteSpace: "nowrap" }}>~{idx.cagr}%/yr</div>
      </div>
      <p style={{ fontSize: 12, color: "#383838", marginBottom: 18, lineHeight: 1.7 }}>{idx.desc}</p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {SCENARIOS.map((s, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ flex: 1, fontSize: 11, padding: "8px 0", borderRadius: 9, border: `1px solid ${sel === i ? GB : "#141414"}`, background: sel === i ? GD : "transparent", color: sel === i ? G : "#333", cursor: "pointer", fontWeight: sel === i ? 600 : 400, transition: "all .25s", letterSpacing: .3 }}>{s.label}</button>
        ))}
      </div>

      <div style={{ background: "#040404", border: "1px solid #0e0e0e", borderRadius: 12, padding: "14px 14px 10px", marginBottom: 16, overflow: "hidden" }}>
        <div className="lbl" style={{ marginBottom: 10, color: "#282828" }}>15-Year Growth · Illustrative</div>
        <FullChart data={idx.charts[sel]} />
      </div>

      <div>
        <div className="lbl" style={{ marginBottom: 6, color: "#282828" }}>{SCENARIOS[sel].label} over 15 years</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: -1.5, marginBottom: 5 }}>{fmtVal(sc.end)}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color: G, fontWeight: 600 }}>+{gain}% total</span>
          <span style={{ fontSize: 11, color: "#282828" }}>${sc.invested.toLocaleString()} contributed</span>
        </div>
      </div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #0a0a0a", fontSize: 10, color: "#1e1e1e", lineHeight: 1.6, letterSpacing: .3 }}>Illustrative only. Past returns do not guarantee future results.</div>
    </div>
  );
}

/* ── STOCK CARD ── */
function StockCard({ s }) {
  const [sel, setSel] = useState(1);
  const sc = s.returns[sel];
  const chartData = [s.charts[0], s.charts[0].map(v => v * 2), s.charts[0].map(v => v * 3)];
  const gain = Math.round(((sc.end - sc.invested) / sc.invested) * 100);
  const color = s.outlier ? "#f4a229" : G;
  return (
    <div className="gcard" style={{ padding: "28px 24px", display: "flex", flexDirection: "column", border: `1px solid ${s.outlier ? "rgba(244,162,41,.1)" : "#151515"}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <div className="lbl" style={{ marginBottom: 6 }}>Stock · {s.ticker}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-.5px" }}>{s.name}</div>
        </div>
        <div style={{ background: s.outlier ? "rgba(244,162,41,.08)" : GD, border: `1px solid ${s.outlier ? "rgba(244,162,41,.2)" : GB}`, borderRadius: 100, padding: "3px 11px", fontSize: 11, color, fontWeight: 600 }}>~{s.cagr}%/yr</div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {SCENARIOS.map((sc2, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ flex: 1, fontSize: 11, padding: "8px 0", borderRadius: 9, border: `1px solid ${sel === i ? GB : "#141414"}`, background: sel === i ? GD : "transparent", color: sel === i ? G : "#333", cursor: "pointer", fontWeight: sel === i ? 600 : 400, transition: "all .25s" }}>{sc2.label}</button>
        ))}
      </div>

      <div style={{ background: "#040404", border: "1px solid #0e0e0e", borderRadius: 12, padding: "14px 14px 10px", marginBottom: 16, overflow: "hidden" }}>
        <div className="lbl" style={{ marginBottom: 10, color: "#282828" }}>15-Year Growth · Illustrative</div>
        <FullChart data={chartData[sel]} color={color} />
      </div>

      <div>
        <div className="lbl" style={{ marginBottom: 6, color: "#282828" }}>{SCENARIOS[sel].label} over 15 years</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: -1.5, marginBottom: 5 }}>{fmtVal(sc.end)}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color, fontWeight: 600 }}>+{gain}% total</span>
          <span style={{ fontSize: 11, color: "#282828" }}>${sc.invested.toLocaleString()} contributed</span>
        </div>
      </div>

      {s.outlier && <div style={{ marginTop: 12, padding: "9px 12px", background: "rgba(244,162,41,.04)", border: "1px solid rgba(244,162,41,.1)", borderRadius: 9, fontSize: 10, color: "#5a4220", lineHeight: 1.65, letterSpacing: .2 }}>Extreme historical outlier. Not representative of typical outcomes.</div>}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #0a0a0a", fontSize: 10, color: "#1e1e1e", lineHeight: 1.6, letterSpacing: .3 }}>Illustrative only. Past returns do not guarantee future results.</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   EXAMPLES PAGE
══════════════════════════════════════════════════════════ */
function Examples({ nav }) {
  useReveal();
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec" style={{ paddingBottom: 68 }}>
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div className="rv" style={{ marginBottom: 18 }}><span className="gtag">Real Numbers · Illustrative</span></div>
            <h1 className="rv">What consistent investing<br /><span className="sh">actually becomes.</span></h1>
            <p className="rv" style={{ maxWidth: 520, margin: "20px auto 0", fontSize: 15, lineHeight: 1.85, color: "#666" }}>These are not promises. They are what the data shows happened — in real indexes, across real markets — over 15 years. Select your monthly amount on any card to see the growth curve update.</p>
          </div>

          {/* Index section */}
          <div className="rv" style={{ marginBottom: 32 }}>
            <div className="lbl" style={{ marginBottom: 10, color: "#2e2e2e" }}>Major Index Funds</div>
            <div style={{ height: 1, background: "linear-gradient(90deg,#1a1a1a,transparent)", marginBottom: 28, animation: "lineExtend 1s ease both" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 80 }}>
            {INDEX_DATA.map((idx, i) => <div key={i} className={`rv d${i + 1}`}><IndexCard idx={idx} /></div>)}
          </div>

          {/* Insight block */}
          <div className="gc rv" style={{ padding: "44px 36px", marginBottom: 88, border: `1px solid rgba(255,255,255,.06)` }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40, alignItems: "center" }}>
              <div>
                <div className="lbl" style={{ marginBottom: 12, color: "#2e2e2e" }}>Why this matters</div>
                <h3 style={{ marginBottom: 14 }}>The index always recovers.<br />Most individual investors don't.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 18 }}>Research consistently shows that over 90% of active fund managers underperform the index over 15 years. The families who build real wealth are not the ones who pick the right companies — they are the ones who bought the entire market and left it alone.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[["S&P 500","~10.4%/yr"],["Nasdaq-100","~13.2%/yr"],["TSX","~7.8%/yr"],["MSCI World","~9.1%/yr"]].map(([n,r])=>(
                    <div key={n} style={{ background: "#080808", border: "1px solid #141414", borderRadius: 10, padding: "10px 14px", minWidth: 110 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{n}</div>
                      <div style={{ fontSize: 11, color: G }}>{r} avg</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}><PyramidSVG size={230} /></div>
            </div>
          </div>

          {/* Stocks section */}
          <div className="rv" style={{ marginBottom: 32 }}>
            <div className="lbl" style={{ marginBottom: 10, color: "#2e2e2e" }}>Top Historical Stocks</div>
            <div style={{ height: 1, background: "linear-gradient(90deg,#1a1a1a,transparent)", marginBottom: 20, animation: "lineExtend 1s ease both" }} />
            <h2 style={{ marginBottom: 12 }}>Now see what the top stocks<br />looked like over the same period.</h2>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, maxWidth: 640, marginBottom: 0 }}>The indexes above show what consistent, diversified investing delivers over the long term. The companies below show what was possible inside those indexes — not as a strategy to replicate, but as context for why getting in early and staying in is the only approach that reliably works. These are long-term, real-world outcomes. Not short-term speculation.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 52 }}>
            {STOCK_DATA.map((s, i) => <div key={i} className={`rv d${(i % 5) + 1}`}><StockCard s={s} /></div>)}
          </div>

          <div className="dc rv" style={{ padding: "34px 30px", textAlign: "center", borderColor: "#141414" }}>
            <div style={{ marginBottom: 12 }}><span className="tag">Important Disclaimer</span></div>
            <p style={{ maxWidth: 600, margin: "0 auto 20px", fontSize: 13, lineHeight: 1.85, color: "#383838" }}>All figures on this page are illustrative and use historical average annual returns as reference only. Individual stock examples reflect exceptional historical cases — not typical or expected outcomes. Past performance never guarantees future results. Apex Holdings is an educational programme, not investment advice.</p>
            <button className="bgn" onClick={() => nav("intake")}>Reserve Your Spot</button>
          </div>
        </div>
      </section>

      <section style={{ padding: "84px 0", background: "#030303", textAlign: "center", zIndex: 1, position: "relative" }}>
        <div className="ws">
          <div className="rv" style={{ marginBottom: 14 }}><span className="gtag">{CONFIG.seatsTotal - CONFIG.seatsTaken} spots remaining</span></div>
          <h2 className="rv" style={{ marginBottom: 14 }}>Your financial future<br />starts with one decision.</h2>
          <p className="rv" style={{ fontSize: 15, maxWidth: 380, margin: "0 auto 32px", color: "#555" }}>Everything you just saw is what is possible. The programme shows exactly how to get in — simply, safely, and for the long term.</p>
          <div className="rv" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="bw" onClick={() => nav("intake")} style={{ fontSize: 15, padding: "14px 32px" }}>Reserve a Spot</button>
            <button className="bg" onClick={() => nav("pricing")} style={{ fontSize: 15, padding: "14px 32px" }}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════ */
function Home({ nav }) {
  useReveal();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = e => setMouse({ x: e.clientX / window.innerWidth - .5, y: e.clientY / window.innerHeight - .5 });
    window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 120, paddingBottom: 88, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle,${GD},transparent 68%)`, top: "42%", left: "50%", transform: `translate(calc(-50% + ${mouse.x * 26}px), calc(-50% + ${mouse.y * 26}px))`, transition: "transform 1.4s cubic-bezier(.16,1,.3,1)", pointerEvents: "none" }} />
        <div className="w" style={{ textAlign: "center" }}>
          <div style={{ animation: "heroIn .7s ease both", marginBottom: 20 }}><span className="gtag">Exclusive · Up to 30 People · Canada + United States</span></div>
          <h1 style={{ animation: "heroIn 1s .1s ease both", marginBottom: 22 }}>The wealth your<br /><span className="sh">family inherits.</span></h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", maxWidth: 500, margin: "0 auto 10px", color: "#666", animation: "heroIn 1s .22s ease both", lineHeight: 1.8 }}>A 7-day programme that gives families and individuals a complete long-term investing system — built together, understood by everyone, designed to last generations.</p>
          <p style={{ fontSize: 10, color: "#1e1e1e", letterSpacing: 1.4, animation: "heroIn 1s .3s ease both", marginBottom: 40 }}>Education only · No stock tips · No hype · Built for Canada + the US</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 54, animation: "heroIn 1s .38s ease both" }}>
            <button className="bw" onClick={() => nav("examples")} style={{ fontSize: 15, padding: "14px 34px" }}>See the Numbers</button>
            <button className="bg" onClick={() => nav("intake")} style={{ fontSize: 15, padding: "14px 34px" }}>Reserve a Spot</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, animation: "heroIn 1s .46s ease both" }}>
            <div className="lbl" style={{ marginBottom: 4, color: "#2a2a2a" }}>Programme begins in</div>
            <Countdown />
          </div>
        </div>

        <div className="w rv" style={{ marginTop: 68 }}>
          <div style={{ background: "#050505", border: "1px solid #111", borderRadius: 26, overflow: "hidden", boxShadow: "0 64px 120px rgba(0,0,0,.85)" }}>
            <div style={{ display: "flex", gap: 6, padding: "14px 22px", borderBottom: "1px solid #090909", alignItems: "center" }}>
              {["#444","#333","#2a2a2a"].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
              <div style={{ flex: 1, height: 18, background: "#090909", borderRadius: 5, marginLeft: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 9, color: "#181818", letterSpacing: .8 }}>apex-family-dashboard.app</span></div>
            </div>
            <div style={{ padding: "24px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                {[["Portfolio Value","$62,840","+14.2%","YTD"],["TFSA / Roth","$31,000","Maxed","On track"],["Monthly Auto","$400","Active","Set & forget"],["Family Goal","$300K","Age 40","56% complete"]].map(([t,v,s,l])=>(
                  <div key={t} style={{ background: "#090909", border: "1px solid #111", borderRadius: 14, padding: "16px 18px", flex: "1 1 120px" }}>
                    <div className="lbl" style={{ marginBottom: 7, color: "#252525" }}>{t}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{v}</div>
                    <div style={{ fontSize: 11, color: G }}>{s}</div>
                    <div style={{ fontSize: 10, color: "#252525" }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#030303", borderRadius: 14, border: "1px solid #090909", padding: "16px 16px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Portfolio Growth — Illustrative</span>
                  <span style={{ fontSize: 10, color: G, background: GD, border: `1px solid ${GB}`, padding: "3px 10px", borderRadius: 100 }}>+74% since start</span>
                </div>
                <HeroChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* Numbers teaser */}
      <section className="sec" style={{ background: "#030303" }}>
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="rv" style={{ marginBottom: 14 }}><span className="lbl" style={{ color: "#252525" }}>The Numbers</span></div>
            <h2 className="rv">$400 a month. 15 years.</h2>
            <p className="rv" style={{ maxWidth: 420, margin: "14px auto 30px", fontSize: 14, color: "#444" }}>Across four major indexes. Interactive charts, switchable monthly amounts, and 15 years of real historical data.</p>
            <div className="rv"><button className="bgn" onClick={() => nav("examples")} style={{ fontSize: 14, padding: "13px 30px" }}>Explore the Numbers</button></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            {[["S&P 500","$277K","15 yrs · ~10.4%/yr"],["Nasdaq-100","$396K","15 yrs · ~13.2%/yr"],["TSX Composite","$208K","15 yrs · ~7.8%/yr"],["MSCI World","$248K","15 yrs · ~9.1%/yr"]].map(([n,v,s],i)=>(
              <div key={i} className={`gcard rv d${i+1}`} style={{ padding: "24px 20px", cursor: "pointer" }} onClick={() => nav("examples")}>
                <div className="lbl" style={{ marginBottom: 8, color: "#252525" }}>{n}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: -1, marginBottom: 5 }}>{v}</div>
                <div style={{ fontSize: 11, color: G }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="sec">
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center" }}>
            <div>
              <div className="rv lbl" style={{ marginBottom: 14, color: "#252525" }}>Why It Matters</div>
              <h2 className="rv" style={{ marginBottom: 18 }}>Money that works<br />for generations.</h2>
              <p className="rv" style={{ fontSize: 15, marginBottom: 16, lineHeight: 1.85 }}>The people who start early — even imperfectly — build wealth that outlasts them. Getting into the right accounts and the right funds at the right time is not complicated. But nobody teaches it clearly.</p>
              <p className="rv" style={{ fontSize: 14, marginBottom: 28, lineHeight: 1.85 }}>Apex Holdings is the beginning of a wealth system — built together, understood by everyone in the room, and designed to be passed down.</p>
              <div className="rv" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="bw" onClick={() => nav("mission")}>Our Mission</button>
                <button className="bg" onClick={() => nav("program")}>See Curriculum</button>
              </div>
            </div>
            <div className="rvr" style={{ display: "flex", justifyContent: "center" }}><PyramidSVG /></div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="sec" style={{ background: "#030303" }}>
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="rv" style={{ marginBottom: 14 }}><span className="tag">What Is Included</span></div>
            <h2 className="rv">Everything. Nothing hidden.</h2>
          </div>
          <div className="g3">
            {[["1-Page Money Plan","Built during the programme. Refined to your goals. A document you use for decades."],["Vocabulary Guide","Every investing term explained plainly — ETF, MER, CAGR, diversification — kept forever."],["What Not To Do","The 10 most expensive mistakes. Skip years of trial and error."],["Monthly Tracker","Contribution and goal tracker. Set up once, use indefinitely."],["Canada + US Coverage","Every relevant account in both countries. One programme, complete coverage."],["Dedicated Q&A","Time built into every session to answer questions. Nothing left unresolved."]].map(([t,d],i)=>(
              <div key={i} className={`dc rv d${i+1}`} style={{ padding: "28px 24px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: GD, border: `1px solid ${GB}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, color: G, fontWeight: 700 }}>{i+1}</span>
                </div>
                <h4 style={{ marginBottom: 8, fontSize: 15 }}>{t}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.75 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on */}
      <section className="sec">
        <div className="w">
          <div className="gc rv" style={{ padding: "46px 38px", display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "space-between", border: `1px solid ${GB}`, animation: "greenGlow 5s ease-in-out infinite" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ marginBottom: 12 }}><span className="gtag">Premium Add-On</span></div>
              <h3 style={{ marginBottom: 12 }}>Personalized Summary<br />+ 2-Week Follow-Up</h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, maxWidth: 420, marginBottom: 18 }}>After Day 7, receive a custom-written summary of your plan — built around your goals, country, accounts, and risk profile. Not a template. Written specifically for you. Followed by a 2-week email series to maintain momentum.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Custom-written for your situation","Account roadmap for your country","2-week accountability series","Priority Q&A slot","Delivered within 48 hours"].map(f=>(
                  <span key={f} style={{ fontSize: 11, color: "#333", background: "rgba(255,255,255,.025)", border: "1px solid #141414", padding: "3px 11px", borderRadius: 100 }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="lbl" style={{ marginBottom: 4, color: "#333" }}>Add-On</div>
              <div style={{ fontSize: 58, fontWeight: 700, color: "#fff", letterSpacing: -3 }}>${CONFIG.addOnPrice}</div>
              <div style={{ fontSize: 11, color: "#333", marginBottom: 18 }}>one-time</div>
              <button className="bgn" onClick={() => nav("pricing")}>Add This</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sec" style={{ background: "#030303" }}>
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="rv" style={{ marginBottom: 14 }}><span className="tag">Early Cohort Feedback</span></div>
            <h2 className="rv">What people are saying.</h2>
          </div>
          <div className="g3">
            {[["S. M.","Vancouver, BC","We left Day 7 with a real plan — not just inspiration. Finally something designed for an entire household."],["J. T.","Toronto, ON","The TFSA and RRSP session alone changed how we think about our savings. Worth every dollar."],["P. K.","Calgary, AB","The numbers shown during the programme made starting non-negotiable. We opened accounts the next day."],["D. R.","Seattle, WA","Thorough and practical. The Roth IRA session answered every question I had been sitting on for years."],["M. L.","San Francisco, CA","Our financial future looks completely different because of this. That is all I can say."],["M. O.","Chicago, IL","No hype. No gimmicks. A clean system. Exactly what we needed to get started."]].map(([n,r,q],i)=>(
              <div key={i} className={`dc rv d${(i%6)+1}`} style={{ padding: "28px 24px" }}>
                <div style={{ height: 2, width: 32, background: G, borderRadius: 2, marginBottom: 18, opacity: .6 }} />
                <p style={{ fontSize: 13, color: "#c8c8cc", lineHeight: 1.8, marginBottom: 18, fontStyle: "italic" }}>"{q}"</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#2a2a2a", marginTop: 3 }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "104px 0", textAlign: "center", zIndex: 1, position: "relative" }}>
        <div className="ws">
          <div className="rv" style={{ marginBottom: 16 }}><span className="gtag">{CONFIG.seatsTotal - CONFIG.seatsTaken} spots remaining</span></div>
          <h2 className="rv" style={{ marginBottom: 16 }}>Start building your<br />financial future.</h2>
          <p className="rv" style={{ fontSize: 15, maxWidth: 360, margin: "0 auto 34px", color: "#444" }}>From ${CONFIG.prices.deposit} deposit. Four plan options. Canada and the United States.</p>
          <div className="rv" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="bw" onClick={() => nav("intake")} style={{ fontSize: 15, padding: "14px 34px" }}>Reserve Now</button>
            <button className="bg" onClick={() => nav("pricing")} style={{ fontSize: 15, padding: "14px 34px" }}>See Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROGRAM
══════════════════════════════════════════════════════════ */
function Program({ nav }) {
  useReveal();
  const [open, setOpen] = useState(null);
  const days = [
    ["Day 1","The Money System","Foundation: saving vs. investing, why most people lose money, and the 3 core rules for long-term wealth. We reset how you think about money before touching any accounts.","Choose one long-term goal. Write it down."],
    ["Day 2","Canada + US Accounts","Canada: TFSA, RRSP, FHSA, RESP. USA: Roth IRA, 529, HSA, 401(k). What each does, who it is for, contribution limits, and the most common mistakes.","Map your personal account opening order."],
    ["Day 3","Investing Vocabulary","ETF, index fund, MER, expense ratio, diversification, CAGR — all in plain English. Which buzzwords to ignore. Cheat sheet provided and kept forever. Dedicated Q&A.","Complete your 1-page vocabulary guide."],
    ["Day 4","Simple Strategy","Why the broad index approach works for most people. Conservative, balanced, and growth profiles explained. How diversification actually works. Dedicated Q&A.","Choose your risk profile: low, medium, or high."],
    ["Day 5","Automation + Systems","The set-and-forget monthly investing system. Dollar-cost averaging made simple. How to automate so discipline is not required. Brokerage automation covered for both countries.","Set your monthly amount and start date."],
    ["Day 6","Legacy Planning + Next Generation","Building a plan that outlasts you. Setting up accounts for children or future dependents. Wealth conversations within a household. What to open, when, and how to make it last across generations. Dedicated Q&A.","Draft your long-term wealth timeline."],
    ["Day 7","Execution + Brokers + Full Q&A","How to start this week. Choosing a broker in Canada or the US. Account setup walkthrough. 30-day action plan. Extended live Q&A — open until every question is fully answered. Option to book a private 20-minute follow-up call.","Leave ready to act today."],
  ];
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center", marginBottom: 68 }}>
            <div>
              <div className="rv" style={{ marginBottom: 16 }}><span className="tag">The Curriculum</span></div>
              <h1 className="rv" style={{ marginBottom: 18 }}>7 days.<br />One clear plan.</h1>
              <p className="rv" style={{ fontSize: 15, marginBottom: 20, lineHeight: 1.85 }}>Each day builds on the last. By Day 7 your household has a complete, personalised investing system and the knowledge to run it for decades — in Canada or the US.</p>
              <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {["1 hr/day","7 days","Canada + US","Dedicated Q&A daily","Private follow-up available"].map(f=>(
                  <span key={f} style={{ fontSize: 11, color: "#383838", background: "rgba(255,255,255,.025)", border: "1px solid #141414", padding: "4px 12px", borderRadius: 100 }}>{f}</span>
                ))}
              </div>
            </div>
            <div className="rvr">
              <div style={{ background: "#050505", border: "1px solid #0e0e0e", borderRadius: 16, padding: "18px", marginBottom: 14 }}>
                <div className="lbl" style={{ marginBottom: 10, color: "#1e1e1e" }}>Portfolio Growth · Illustrative</div>
                <HeroChart />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["CA","TFSA · RRSP · FHSA · RESP"],["US","Roth · 529 · HSA · 401k"]].map(([fl,d])=>(
                  <div key={d} className="dc" style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 3 }}>{fl}</div>
                    <div style={{ fontSize: 11, color: "#2e2e2e" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #0a0a0a", marginBottom: 48 }}>
            {days.map(([d, t, content, hw], i) => (
              <div key={i} className="ai rv">
                <div className="ah" onClick={() => setOpen(open === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, color: "#1e1e1e", minWidth: 38 }}>{d}</span>
                    <span className="at" style={{ color: open === i ? "#fff" : "#555" }}>{t}</span>
                  </div>
                  <span style={{ color: open === i ? G : "#252525", fontSize: 18, transition: "transform .45s cubic-bezier(.16,1,.3,1)", transform: open === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
                </div>
                <div className={`ab${open === i ? " open" : ""}`}>
                  <div style={{ paddingBottom: 24 }}>
                    <p style={{ fontSize: 14, marginBottom: 14, lineHeight: 1.85, color: "#888" }}>{content}</p>
                    <div style={{ display: "inline-flex", gap: 8, background: GD, border: `1px solid ${GB}`, borderRadius: 9, padding: "8px 14px" }}>
                      <span style={{ fontSize: 11, color: G }}>Homework — {hw}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="bw" onClick={() => nav("intake")}>Reserve a Spot</button>
            <button className="bg" onClick={() => nav("pricing")}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MISSION
══════════════════════════════════════════════════════════ */
function Mission({ nav }) {
  useReveal();
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center", marginBottom: 84 }}>
            <div>
              <div className="rv" style={{ marginBottom: 16 }}><span className="tag">Mission</span></div>
              <h1 className="rv" style={{ marginBottom: 22 }}>Wealth is not<br /><span className="sh">inherited. It is built.</span></h1>
              <p className="rv" style={{ fontSize: 15, color: "#c8c8cc", lineHeight: 1.9, marginBottom: 16 }}>Most people never get the conversation. Nobody sat them down and explained how money actually works — how a few hundred dollars a month, left alone for long enough, becomes something their children will feel for the rest of their lives.</p>
              <p className="rv" style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 26, color: "#555" }}>Apex Holdings exists to change that. Not with hype. Not with predictions. With clarity — the kind that makes someone look at their finances and say: <em>"We should have done this sooner."</em></p>
              <div className="rv"><button className="bgn" onClick={() => nav("about")}>Meet the Founder</button></div>
            </div>
            <div className="rvr" style={{ display: "flex", justifyContent: "center" }}><PyramidSVG /></div>
          </div>

          <div className="rv" style={{ borderTop: `1px solid ${GB}`, borderBottom: `1px solid ${GB}`, padding: "56px 0", marginBottom: 76, textAlign: "center", background: GD }}>
            <p style={{ fontSize: "clamp(17px,2.6vw,28px)", color: "#fff", lineHeight: 1.72, fontWeight: 400, letterSpacing: "-.5px", maxWidth: 660, margin: "0 auto" }}>
              "The people who build real wealth are not the ones who knew the most. They are the ones who started — and kept going."
            </p>
            <div style={{ fontSize: 10, color: G, letterSpacing: 2, marginTop: 22 }}>— Apex Holdings</div>
          </div>

          <div style={{ marginBottom: 68 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="rv" style={{ marginBottom: 14 }}><span className="lbl" style={{ color: "#252525" }}>What Drives Us</span></div>
              <h2 className="rv">Five beliefs we build on.</h2>
            </div>
            {[["Clarity is a right, not a privilege.","Financial education has been kept complicated by design. We cut through it — not by dumbing it down, but by making it honest."],["Starting matters more than starting perfectly.","The person who opens an account today with $200 and no experience will outperform the one still researching five years from now."],["The next generation deserves a head start.","Every family that builds a system today is giving future generations options they would not otherwise have. That compounds too."],["Exclusivity exists for a reason.","We keep each cohort small — up to 30 people, though we aim for around 20. Every question gets answered. No one is left behind."],["This works anywhere on the continent.","Canada or the United States — we cover both, in depth, in the same week. Because the principles of wealth do not stop at the border."]].map(([t,d],i)=>(
              <div key={i} className="rv" style={{ transitionDelay: `${i*.08}s`, display: "flex", gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: i<4?"1px solid #090909":"none" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: GD, border: `1px solid ${GB}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: G, flexShrink: 0, marginTop: 2 }}>{i+1}</div>
                <div><div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{t}</div><p style={{ fontSize: 13, lineHeight: 1.8 }}>{d}</p></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="bw" onClick={() => nav("intake")} style={{ fontSize: 15, padding: "14px 34px" }}>Join the Programme</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════ */
function About({ nav }) {
  useReveal();
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center", marginBottom: 76 }}>
            <div>
              <div className="rv" style={{ marginBottom: 16 }}><span className="tag">The Founder</span></div>
              <h1 className="rv" style={{ marginBottom: 18 }}>Built by someone<br />who started early.</h1>
              <p className="rv" style={{ fontSize: 15, color: "#c8c8cc", lineHeight: 1.9, marginBottom: 16 }}>Apex Holdings was built by Eshan Ramji — a young Canadian investor who went deep into financial education and could not find anything designed for families or individuals to learn together, practically.</p>
              <p className="rv" style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 16, color: "#555" }}>After hundreds of hours researching Canadian and US account systems, index investing, and long-term wealth building, the curriculum was built and tested on real households — refined until every concept landed without confusion.</p>
              <p className="rv" style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 26, color: "#555" }}>The result is a programme that people trust because it is clear, that adults engage with because it is practical, and that sticks because you build the plan yourself during the week.</p>
              <div className="rv" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="bw" onClick={() => nav("mission")}>Read Our Mission</button>
                <button className="bg" onClick={() => nav("intake")}>Reserve a Spot</button>
              </div>
            </div>
            <div className="rvr" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 190, height: 190, borderRadius: "50%", background: "linear-gradient(135deg,#090909,#131313)", border: `1px solid ${GB}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 36px 88px rgba(0,0,0,.7), 0 0 64px ${GD}`, animation: "float 6s ease-in-out infinite" }}>
                  <div style={{ textAlign: "center" }}>
                    <Pyr size={46} />
                    <div style={{ fontSize: 12, color: "#fff", marginTop: 14, fontWeight: 600, letterSpacing: "-.2px" }}>Eshan Ramji</div>
                    <div style={{ fontSize: 9, color: "#202020", marginTop: 4, letterSpacing: 1.2 }}>Founder · Apex Holdings</div>
                  </div>
                </div>
                <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: `1px solid ${GB}`, opacity: .4, animation: "ringOut 2.4s ease-out infinite" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 280 }}>
                {[["Based","Canada"],["Focus","Family wealth education"],["Research","100+ hours"],["Approach","Clarity above all"]].map(([k,v])=>(
                  <div key={k} className="dc" style={{ padding: "15px 16px" }}>
                    <div className="lbl" style={{ marginBottom: 5, color: "#222" }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="gc rv" style={{ padding: "34px 30px", textAlign: "center", border: `1px solid ${GB}` }}>
            <p style={{ maxWidth: 520, margin: "0 auto 24px", fontSize: 14, lineHeight: 1.9, color: "#444" }}>Every person who comes through Apex Holdings leaves with a real plan, real knowledge, and the confidence to follow through — for the next generation.</p>
            <button className="bgn" onClick={() => nav("intake")} style={{ fontSize: 15, padding: "14px 34px" }}>Join the Programme</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRICING
══════════════════════════════════════════════════════════ */
function Pricing({ nav }) {
  useReveal();
  const pct = (CONFIG.seatsTaken / CONFIG.seatsTotal) * 100;
  const qa = "Dedicated Q&A block every session";
  const priv = "Option to book private 20-min follow-up call";
  const plans = [
    { id:"deposit", label:"Reserve · Deposit", badge:null, price:`$${CONFIG.prices.deposit}`, sub:`Refundable deposit · counts toward $${CONFIG.prices.family}`, features:["Holds your spot immediately",`Counts toward $${CONFIG.prices.family} plan`,"Pay balance before start","Parent + one person (12+) included","All 7 days and materials", qa], cta:`Pay $${CONFIG.prices.deposit} Deposit`, style:"bg" },
    { id:"family", label:"Family Plan", badge:"MOST POPULAR", price:`$${CONFIG.prices.family}`, sub:"Parent + one person (12+) · CA or US", features:["Spot confirmed immediately","Parent + child or young adult (12+)","Full 7-day programme","1-page Money Plan","All templates and guides","Canada + US content", qa, priv], cta:`Pay $${CONFIG.prices.family}`, style:"bw" },
    { id:"couple", label:"Couple Plan", badge:"NEW", price:`$${CONFIG.prices.couple}`, sub:"Two adults — partners or spouses · CA or US", features:["Both partners attend all 7 days","Joint money plan built together","Full 7-day programme","1-page Money Plan","All templates and guides","Canada + US content", qa, priv], cta:`Pay $${CONFIG.prices.couple}`, style:"bg" },
    { id:"individual", label:"Individual Plan", badge:"SOLO", price:`$${CONFIG.prices.individual}`, sub:"Solo adult · CA or US", features:["Spot confirmed immediately","Solo adult — no partner required","Full 7-day programme","1-page Money Plan","All templates and guides","Canada + US content", qa, priv], cta:`Pay $${CONFIG.prices.individual}`, style:"bg" },
  ];
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="rv" style={{ marginBottom: 16 }}><span className="tag">Pricing</span></div>
            <h1 className="rv">Simple, transparent<br />pricing.</h1>
            <p className="rv" style={{ maxWidth: 380, margin: "18px auto 0", fontSize: 14, color: "#555" }}>Four plans. One clear system. No hidden costs.</p>
          </div>

          <div style={{ maxWidth: 480, margin: "0 auto 56px" }}>
            <div className="dc rv" style={{ padding: "28px 28px", textAlign: "center", border: `1px solid ${GB}` }}>
              <div className="lbl" style={{ marginBottom: 8, color: "#2a2a2a" }}>Exclusive Cohort</div>
              <p style={{ fontSize: 13, marginBottom: 6, color: "#333" }}>{CONFIG.seatsTaken} of {CONFIG.seatsTotal} spots reserved</p>
              <p style={{ fontSize: 12, color: "#282828", marginBottom: 18, lineHeight: 1.75 }}>We keep this programme small — up to 30 people, though we aim to stay around 20. Every question is answered. No one gets lost in the group.</p>
              <div style={{ background: "#0e0e0e", borderRadius: 100, height: 2, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg,#1e1e1e,${G})`, width: `${pct}%`, transition: "width 1.8s cubic-bezier(.16,1,.3,1)" }} />
              </div>
              <p style={{ fontSize: 13, color: G, fontWeight: 600 }}>{CONFIG.seatsTotal - CONFIG.seatsTaken} spots remaining</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 48 }}>
            {plans.map((pl, i) => (
              <div key={pl.id} className={`rv d${i+1}`} style={{ position: "relative" }}>
                {pl.badge && <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, background: pl.style==="bw"?"#fff":"rgba(255,255,255,.07)", color: pl.style==="bw"?"#000":"#888", fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: "3px 9px", borderRadius: 100, border: pl.style==="bw"?"none":"1px solid rgba(255,255,255,.1)" }}>{pl.badge}</div>}
                <div className={pl.style === "bw" ? "gc" : "dc"} style={{ padding: "28px 24px", height: "100%", display: "flex", flexDirection: "column", border: pl.style==="bw" ? `1px solid ${GB}` : "1px solid #151515" }}>
                  <div style={{ marginBottom: 12 }}><span className="tag">{pl.label}</span></div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: -2, marginBottom: 4 }}>{pl.price}</div>
                  <p style={{ fontSize: 12, color: "#333", marginBottom: 20 }}>{pl.sub}</p>
                  {pl.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 9, marginBottom: 9, fontSize: 13, color: "#555" }}>
                      <span style={{ color: G, flexShrink: 0, fontSize: 10, marginTop: 2 }}>—</span>{f}
                    </div>
                  ))}
                  <button className={pl.style} style={{ width: "100%", marginTop: "auto", paddingTop: 12, paddingBottom: 12 }} onClick={() => nav("intake")}>{pl.cta}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add-on: Personalized Summary */}
          <div className="gc rv" style={{ padding: "38px 32px", marginBottom: 16, border: `1px solid ${GB}` }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 30, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ marginBottom: 12 }}><span className="gtag">Premium Add-On</span></div>
                <h3 style={{ marginBottom: 10 }}>Personalized Summary<br />+ 2-Week Follow-Up</h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>A custom-written summary of your plan after the programme ends — built around your goals, risk profile, country, and accounts. Followed by a structured 2-week email series. Not a template. Written specifically for your situation.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Custom-written for your situation","Account roadmap for your country","2-week accountability series","Priority Q&A slot","Delivered within 48 hours of Day 7"].map(f=>(
                    <span key={f} style={{ fontSize: 11, color: "#333", background: "rgba(255,255,255,.025)", border: "1px solid #141414", padding: "3px 11px", borderRadius: 100 }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: 130 }}>
                <div className="lbl" style={{ marginBottom: 4, color: "#2e2e2e" }}>Add-On</div>
                <div style={{ fontSize: 48, fontWeight: 700, color: "#fff", letterSpacing: -2 }}>${CONFIG.addOnPrice}</div>
                <div style={{ fontSize: 11, color: "#333", marginBottom: 18 }}>one-time</div>
                <button className="bgn" onClick={() => nav("intake")}>Add This</button>
              </div>
            </div>
          </div>

          {/* Private follow-up */}
          <div className="dc rv" style={{ padding: "34px 32px", marginBottom: 28, border: "1px solid #1a1a1a" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 30, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ marginBottom: 12 }}><span className="tag">Private Session</span></div>
                <h3 style={{ marginBottom: 10 }}>20-Minute Private<br />Follow-Up Call</h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>After the programme, book a dedicated one-on-one session to go deeper on your specific situation. Your accounts, your goals, your questions. No group setting. Fully private, fully focused on you. Scheduled directly via email after Day 7.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["20 minutes one-on-one","Your situation only","Scheduled after Day 7","Fully private","Booked via email"].map(f=>(
                    <span key={f} style={{ fontSize: 11, color: "#333", background: "rgba(255,255,255,.025)", border: "1px solid #141414", padding: "3px 11px", borderRadius: 100 }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: 130 }}>
                <div className="lbl" style={{ marginBottom: 4, color: "#2e2e2e" }}>Add-On</div>
                <div style={{ fontSize: 48, fontWeight: 700, color: "#fff", letterSpacing: -2 }}>TBD</div>
                <div style={{ fontSize: 11, color: "#333", marginBottom: 18 }}>contact us to book</div>
                <a href={`mailto:${CONFIG.email}?subject=Private Follow-Up Session`}><button className="bg">Request Session</button></a>
              </div>
            </div>
          </div>

          <p className="rv" style={{ textAlign: "center", fontSize: 10, color: "#181818", letterSpacing: .4 }}>Educational programme only. Not registered financial advice. No returns guaranteed. Consult a licensed adviser.</p>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   INTAKE
══════════════════════════════════════════════════════════ */
function Intake() {
  useReveal();
  const [f, setF] = useState({ pname:"", email:"", phone:"", cname:"", cage:"", country:"", plan:"family", goal:"", monthly:"", risk:"", addOn:false, priv:false, mem:false });
  const [done, setDone] = useState(false);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const isCouple = f.plan === "couple", isIndy = f.plan === "individual";

  if (done) return (
    <div className="page-wrap" style={{ paddingTop: 90, minHeight: "80vh", display: "flex", alignItems: "center", zIndex: 1, position: "relative" }}>
      <div className="w" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: GD, border: `1px solid ${GB}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 22, color: G, animation: "glowDot 2s ease-in-out infinite" }}>+</div>
        <h2 style={{ marginBottom: 14 }}>You are in, {f.pname.split(" ")[0]}.</h2>
        <p style={{ fontSize: 15, marginBottom: 26, color: "#555" }}>We will follow up at <strong style={{ color: "#fff" }}>{f.email}</strong> within 24 hours.</p>
        <div className="dc" style={{ textAlign: "left", marginBottom: 22, padding: "26px 24px" }}>
          <h4 style={{ marginBottom: 16 }}>What happens next</h4>
          {["Application reviewed and spot confirmed","Payment link sent within 24 hours","Confirmation and programme details sent", f.addOn?"Personalized summary initiated after Day 7":"Prep guide sent 48 hours before Day 1", f.priv?"Private follow-up session details sent separately":""].filter(Boolean).map((s,i)=>(
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 11 }}>
              <span style={{ color: G, flexShrink: 0, fontSize: 10, marginTop: 3 }}>—</span>
              <p style={{ fontSize: 13, color: "#c8c8cc" }}>{s}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#222" }}>{CONFIG.email} · {CONFIG.phone}</p>
      </div>
    </div>
  );

  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div className="rv" style={{ marginBottom: 14 }}><span className="gtag">Reserve Your Spot</span></div>
            <h1 className="rv" style={{ fontSize: "clamp(28px,5vw,48px)" }}>Secure your place.</h1>
            <p className="rv" style={{ fontSize: 14, marginTop: 10, color: "#383838" }}>Submit this form and we will send your payment link within 24 hours. No charge now.</p>
          </div>

          <div className="rv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
            {[["family","Family Plan",`$${CONFIG.prices.family} · Parent + Person (12+)`],["couple","Couple Plan",`$${CONFIG.prices.couple} · Two Partners`],["individual","Individual",`$${CONFIG.prices.individual} · Solo Adult`],["deposit","Deposit Only",`$${CONFIG.prices.deposit} · Holds your spot`]].map(([v,l,d])=>(
              <div key={v} onClick={() => set("plan", v)} style={{ padding: "15px 17px", borderRadius: 14, border: `1px solid ${f.plan===v ? GB : "#141414"}`, background: f.plan===v ? GD : "#060606", cursor: "pointer", transition: "all .25s" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 11, color: "#383838" }}>{d}</div>
              </div>
            ))}
          </div>

          <div className="dc rv" style={{ padding: "26px 24px", marginBottom: 14 }}>
            <h4 style={{ marginBottom: 18, color: "#2a2a2a", fontWeight: 500, fontSize: 13 }}>{isIndy?"Your Information":isCouple?"Your Information":"Primary Contact"}</h4>
            <div className="fg"><label>Full Name</label><input value={f.pname} onChange={e=>set("pname",e.target.value)} placeholder={isCouple?"Partner 1 name":"Your full name"}/></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="fg"><label>Email</label><input type="email" value={f.email} onChange={e=>set("email",e.target.value)} placeholder="you@email.com"/></div>
              <div className="fg"><label>Phone</label><input value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="+1 604-555-0100"/></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="fg"><label>Country</label>
                <select value={f.country} onChange={e=>set("country",e.target.value)}><option value="">Select...</option><option value="ca">Canada</option><option value="us">United States</option></select>
              </div>
              <div className="fg"><label>Risk Profile</label>
                <select value={f.risk} onChange={e=>set("risk",e.target.value)}><option value="">Select...</option><option value="low">Low — prefer stability</option><option value="med">Medium — balanced</option><option value="high">High — long-term growth</option></select>
              </div>
            </div>
            <div className="fg"><label>Primary Goal</label>
              <textarea value={f.goal} onChange={e=>set("goal",e.target.value)} rows={3} placeholder={isCouple?"e.g. Build a joint investing system we will both follow.":isIndy?"e.g. Build a system I will actually maintain.":"e.g. Set up the right accounts and build a long-term plan."}/>
            </div>
          </div>

          {!isIndy && (
            <div className="dc rv" style={{ padding: "26px 24px", marginBottom: 14 }}>
              <h4 style={{ marginBottom: 18, color: "#2a2a2a", fontWeight: 500, fontSize: 13 }}>{isCouple?"Partner 2":"Additional Attendee (12+)"}</h4>
              <div style={{ display: "grid", gridTemplateColumns: isCouple?"1fr":"1fr 1fr", gap: 12 }}>
                <div className="fg"><label>{isCouple?"Partner 2 Name":"Name"}</label><input value={f.cname} onChange={e=>set("cname",e.target.value)} placeholder={isCouple?"Partner 2 name":"e.g. Alex"}/></div>
                {!isCouple && <div className="fg"><label>Age</label><input type="number" value={f.cage} onChange={e=>set("cage",e.target.value)} placeholder="e.g. 14" min={12} max={25}/></div>}
              </div>
            </div>
          )}

          <div className="dc rv" style={{ padding: "26px 24px", marginBottom: 14 }}>
            <h4 style={{ marginBottom: 16, color: "#2a2a2a", fontWeight: 500, fontSize: 13 }}>Optional Details</h4>
            <div className="fg"><label>Monthly Target (USD or CAD)</label><input value={f.monthly} onChange={e=>set("monthly",e.target.value)} placeholder="e.g. $400"/></div>
          </div>

          <div className="gc rv" style={{ padding: "24px 22px", marginBottom: 20, border: `1px solid ${GB}` }}>
            <div className="lbl" style={{ marginBottom: 16, color: "#2a2a2a" }}>Optional Add-Ons</div>
            {[[f.addOn,"addOn","Personalized Summary + 2-Week Follow-Up",`+$${CONFIG.addOnPrice} · Custom-written plan and 2-week email series`],[f.priv,"priv","Private 20-Minute Follow-Up Call","Price TBD · One-on-one session after Day 7"]].map(([checked,key,label,desc])=>(
              <div key={key} onClick={()=>set(key,!checked)} style={{ display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",marginBottom:12,padding:"14px 16px",borderRadius:12,border:`1px solid ${checked?GB:"#141414"}`,background:checked?GD:"transparent",transition:"all .25s" }}>
                <div style={{ width:18,height:18,borderRadius:4,background:checked?G:"transparent",border:`1px solid ${checked?G:"#252525"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2,transition:"all .25s" }}>
                  {checked&&<span style={{color:"#000",fontSize:10,fontWeight:700,lineHeight:1}}>+</span>}
                </div>
                <div>
                  <div style={{ fontSize:13,fontWeight:600,color:"#fff",marginBottom:3 }}>{label}</div>
                  <p style={{ fontSize:11,color:"#383838",lineHeight:1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
            <div style={{ display:"flex",alignItems:"center",gap:10,marginTop:6 }}>
              <input type="checkbox" id="mem" checked={f.mem} onChange={e=>set("mem",e.target.checked)} style={{width:15,height:15,accentColor:G}}/>
              <label htmlFor="mem" style={{fontSize:12,color:"#333",cursor:"pointer"}}>Interested in Apex Family Club (${CONFIG.membershipPrice}/month) after the programme</label>
            </div>
          </div>

          <div className="rv">
            <button className="bw" onClick={()=>{if(f.pname&&f.email)setDone(true);}} style={{width:"100%",padding:"15px",fontSize:15}}>Submit Application</button>
            <p style={{textAlign:"center",fontSize:10,color:"#1e1e1e",marginTop:12,letterSpacing:.3}}>No charge on submission. Payment link sent within 24 hours.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════ */
function Faq({ nav }) {
  useReveal();
  const [open, setOpen] = useState(null);
  const faqs = [
    ["Is this financial advice?","No. Apex Holdings provides financial education only. Nothing constitutes personal financial advice. We are not registered financial advisers in Canada or the US. Consult a licensed professional for personal advice."],
    ["Do you give stock picks?","Never. We do not recommend specific securities or timing decisions. All investment decisions are yours."],
    ["Is this for both Canada and the US?","Yes — completely. We cover Canadian accounts (TFSA, RRSP, FHSA, RESP) and US accounts (Roth IRA, 529, HSA, 401k) in depth, in the same week."],
    ["Why is the cohort capped?","We keep each cohort at up to 30 people — though we aim for around 20. Every question is answered in full. That requires a small group. It is a deliberate choice, not a marketing tactic."],
    ["What is the Couple Plan?","The Couple Plan ($629) lets two partners attend all 7 days together. Both build a joint investing plan during the week. Designed for spouses or partners aligning their finances."],
    ["What is the private follow-up call?","After the programme, you can book a dedicated 20-minute one-on-one session focused entirely on your situation. Price is confirmed via email. Scheduled directly after Day 7."],
    ["What is the Personalized Summary add-on?","A custom-written summary of your plan delivered within 48 hours of Day 7 — built around your goals, country, and accounts. Followed by a 2-week structured email series. $97 one-time."],
    ["What is the refund policy?","Deposits are refundable up to 48 hours before the start date. Full payments are refundable up to 72 hours before start. After those windows, credit applies toward a future cohort."],
  ];
  const legal = ["Apex Holdings provides financial education only. All content is informational and does not constitute personal financial advice.","We make no guarantees of investment returns or outcomes. All examples are illustrative and are not predictions.","We do not provide specific buy or sell recommendations for any security, fund, or financial product.","Participants should consult a registered financial adviser in their country.","Apex Holdings is not affiliated with any financial institution, brokerage, or investment platform.","Content may not reflect current regulations in your jurisdiction. Verify with a local professional.","By enrolling, you acknowledge you are receiving financial education, not personalised advice.","Apex Holdings is not registered with IIROC, MFDA, OSC, SEC, FINRA, or any financial regulator.","Testimonials reflect individual experiences and are not indicative of typical outcomes.","Intended for residents of Canada and the United States."];
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="ws">
          <div style={{ marginBottom: 16 }}><span className="tag rv">FAQ + Legal</span></div>
          <h1 className="rv" style={{ marginBottom: 52 }}>Common questions.</h1>
          <div style={{ borderTop: "1px solid #090909" }}>
            {faqs.map(([q, a], i) => (
              <div key={i} className="ai rv">
                <div className="ah" onClick={() => setOpen(open===i?null:i)}>
                  <span className="at" style={{ color: open===i?"#fff":"#555" }}>{q}</span>
                  <span style={{ color: open===i?G:"#222", fontSize: 18, transition: "transform .45s cubic-bezier(.16,1,.3,1)", transform: open===i?"rotate(45deg)":"rotate(0)", flexShrink: 0, marginLeft: 16 }}>+</span>
                </div>
                <div className={`ab${open===i?" open":""}`}>
                  <div style={{ paddingBottom: 22 }}><p style={{ fontSize: 14, lineHeight: 1.85, color: "#444" }}>{a}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64 }}>
            <div className="rv" style={{ marginBottom: 24 }}>
              <span className="tag">Legal</span>
              <h2 style={{ marginTop: 16, marginBottom: 6 }}>Terms and Conditions</h2>
            </div>
            <div className="dc rv" style={{ padding: "30px 26px" }}>
              {legal.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 15, paddingBottom: 15, borderBottom: i<legal.length-1?"1px solid #090909":"none" }}>
                  <span style={{ color: "#181818", fontWeight: 700, flexShrink: 0, fontSize: 10, marginTop: 3 }}>§{i+1}</span>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "#383838" }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rv" style={{ textAlign: "center", marginTop: 52 }}>
            <button className="bw" onClick={() => nav("contact")}>Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════ */
function Contact() {
  useReveal();
  const [f, setF] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <div className="page-wrap" style={{ paddingTop: 90, zIndex: 1, position: "relative" }}>
      <section className="sec">
        <div className="w">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="rv" style={{ marginBottom: 16 }}><span className="tag">Contact</span></div>
            <h1 className="rv">Get in touch.</h1>
            <p className="rv" style={{ maxWidth: 320, margin: "14px auto 0", fontSize: 14, color: "#444" }}>Questions before enrolling? We reply within 24 hours.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 16, maxWidth: 780, margin: "0 auto" }}>
            <div>
              {[[CONFIG.email, `mailto:${CONFIG.email}`, "Email"],[CONFIG.phone, `tel:${CONFIG.phone}`, "Phone"]].map(([v,h,l])=>(
                <div key={l} className="dc rv" style={{ marginBottom: 12, padding: "22px 22px" }}>
                  <div className="lbl" style={{ marginBottom: 7, color: "#222" }}>{l}</div>
                  <a href={h} style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>{v}</a>
                </div>
              ))}
              <div className="dc rv" style={{ padding: "22px 22px" }}>
                <div className="lbl" style={{ marginBottom: 14, color: "#222" }}>Social</div>
                {[["Instagram","@apexholdings — Coming soon"],["LinkedIn","Apex Holdings — Coming soon"]].map(([l,h])=>(
                  <div key={l} style={{ fontSize: 13, color: "#252525", marginBottom: 9 }}>{l}: {h}</div>
                ))}
              </div>
            </div>
            <div className="dc rv" style={{ padding: "28px 24px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: GD, border: `1px solid ${GB}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: G, fontSize: 18 }}>+</div>
                  <h4 style={{ marginBottom: 9 }}>Message received.</h4>
                  <p style={{ fontSize: 14, color: "#555" }}>We will reply to {f.email} within 24 hours.</p>
                </div>
              ) : (
                <div>
                  <h4 style={{ marginBottom: 18, color: "#2a2a2a", fontWeight: 500, fontSize: 13 }}>Send a message</h4>
                  <div className="fg"><label>Name</label><input value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Your name"/></div>
                  <div className="fg"><label>Email</label><input type="email" value={f.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com"/></div>
                  <div className="fg"><label>Message</label><textarea value={f.msg} onChange={e=>set("msg",e.target.value)} rows={5} placeholder="What would you like to know?"/></div>
                  <button className="bw" onClick={()=>{if(f.name&&f.email&&f.msg)setSent(true);}} style={{width:"100%",padding:"13px"}}>Send</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const nav = p => { setPage(p); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 20); };
  const pages = { home:<Home nav={nav}/>, examples:<Examples nav={nav}/>, program:<Program nav={nav}/>, mission:<Mission nav={nav}/>, about:<About nav={nav}/>, pricing:<Pricing nav={nav}/>, intake:<Intake/>, faq:<Faq nav={nav}/>, contact:<Contact/> };
  return (
    <>
      <style>{css}</style>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <BgGrid /><Particles />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", opacity: loaded ? 1 : 0, transition: "opacity .9s ease" }}>
        <Header page={page} nav={nav} />
        <main key={page}>{pages[page] || pages.home}</main>
        <Footer nav={nav} />
      </div>
    </>
  );
}
