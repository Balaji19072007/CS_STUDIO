import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// ─── Template definitions ─────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Project',
    category: 'Basic',
    emoji: '📄',
    description: 'Start from scratch with a clean slate.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>My Project</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <h1>Hello World</h1>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: system-ui, sans-serif; padding: 2rem; }`,
      'script.js': `console.log('Hello from CS Studio!');`,
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    category: 'Personal',
    emoji: '🎨',
    description: 'Clean, professional portfolio site.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Portfolio</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <nav><a href="#">Home</a><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></nav>\n  <header id="hero">\n    <h1>Hi, I'm <span class="accent">Alex</span></h1>\n    <p>Frontend Developer & Designer</p>\n    <a href="#work" class="btn">View My Work</a>\n  </header>\n  <section id="about">\n    <h2>About Me</h2>\n    <p>I build fast, beautiful, accessible web experiences.</p>\n  </section>\n  <section id="work">\n    <h2>Projects</h2>\n    <div class="grid">\n      <div class="card"><h3>Project One</h3><p>Description here</p></div>\n      <div class="card"><h3>Project Two</h3><p>Description here</p></div>\n      <div class="card"><h3>Project Three</h3><p>Description here</p></div>\n    </div>\n  </section>\n  <section id="contact">\n    <h2>Get in Touch</h2>\n    <a href="mailto:hello@example.com" class="btn">Say Hello</a>\n  </section>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;line-height:1.6}nav{display:flex;gap:2rem;padding:1.5rem 4rem;position:fixed;top:0;width:100%;background:rgba(15,23,42,0.85);backdrop-filter:blur(10px);z-index:99}nav a{color:#94a3b8;text-decoration:none;font-size:0.9rem;transition:color 0.2s}nav a:hover{color:#60a5fa}#hero{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem;background:radial-gradient(ellipse at center,#1e3a5f 0%,#0f172a 70%)}#hero h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:800;margin-bottom:1rem}.accent{background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}#hero p{font-size:1.25rem;color:#94a3b8;margin-bottom:2rem}.btn{display:inline-block;padding:.875rem 2rem;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;transition:transform 0.2s,box-shadow 0.2s}.btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(59,130,246,.4)}section{padding:6rem 4rem;max-width:1100px;margin:0 auto}h2{font-size:2rem;font-weight:700;margin-bottom:2rem;background:linear-gradient(135deg,#fff,#94a3b8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem}.card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;transition:transform 0.2s}.card:hover{transform:translateY(-4px)}.card h3{color:#e2e8f0;margin-bottom:.5rem}#contact{text-align:center}`,
      'script.js': `// Smooth scroll for anchor links\ndocument.querySelectorAll('a[href^="#"]').forEach(a => {\n  a.addEventListener('click', e => {\n    e.preventDefault();\n    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });\n  });\n});\nconsole.log('Portfolio loaded!');`,
    },
  },
  {
    id: 'landing',
    name: 'Landing Page',
    category: 'Business',
    emoji: '🚀',
    description: 'Modern SaaS-style landing page with CTA.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Product Landing</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <nav><div class="logo">⚡ Brand</div><a href="#" class="btn-nav">Get Started Free</a></nav>\n  <section class="hero">\n    <span class="badge">✨ Now in Beta</span>\n    <h1>Build Something <span class="grad">Amazing</span></h1>\n    <p>The all-in-one platform for modern developers. Ship faster, scale smarter.</p>\n    <div class="cta-group">\n      <a href="#" class="btn-primary">Start for Free</a>\n      <a href="#" class="btn-secondary">Watch Demo →</a>\n    </div>\n  </section>\n  <section class="features">\n    <h2>Everything you need</h2>\n    <div class="features-grid">\n      <div class="feat"><div class="feat-icon">🔒</div><h3>Secure by Default</h3><p>Enterprise-grade security out of the box.</p></div>\n      <div class="feat"><div class="feat-icon">⚡</div><h3>Blazing Fast</h3><p>Optimized for performance at every level.</p></div>\n      <div class="feat"><div class="feat-icon">🌍</div><h3>Global CDN</h3><p>Delivered from 200+ locations worldwide.</p></div>\n    </div>\n  </section>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',system-ui,sans-serif;background:#050a14;color:#e2e8f0;line-height:1.6}nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 4rem;border-bottom:1px solid rgba(255,255,255,0.06)}.logo{font-size:1.1rem;font-weight:700;color:#fff}.btn-nav{padding:.6rem 1.25rem;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border-radius:8px;text-decoration:none;font-size:.875rem;font-weight:600}.hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:7rem 2rem 5rem;background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.15) 0%,transparent 60%)}.badge{display:inline-block;padding:.35rem 1rem;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);border-radius:999px;font-size:.8rem;color:#93c5fd;margin-bottom:1.5rem}.hero h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:800;line-height:1.1;margin-bottom:1.25rem}.grad{background:linear-gradient(135deg,#3b82f6,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero p{font-size:1.15rem;color:#94a3b8;max-width:500px;margin-bottom:2.5rem}.cta-group{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}.btn-primary{padding:.875rem 2rem;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border-radius:10px;text-decoration:none;font-weight:600;transition:transform 0.2s}.btn-primary:hover{transform:translateY(-2px)}.btn-secondary{padding:.875rem 2rem;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;border-radius:10px;text-decoration:none;font-weight:600}.features{padding:6rem 4rem;text-align:center}h2{font-size:2rem;font-weight:700;margin-bottom:3rem}.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;max-width:900px;margin:0 auto}.feat{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:2rem;text-align:left}.feat-icon{font-size:2rem;margin-bottom:1rem}.feat h3{font-size:1.1rem;font-weight:600;margin-bottom:.5rem}.feat p{color:#94a3b8;font-size:.9rem}`,
      'script.js': `console.log('Landing page ready!');`,
    },
  },
  {
    id: 'calculator',
    name: 'Calculator',
    category: 'Apps',
    emoji: '🔢',
    description: 'Fully working iOS-style calculator.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Calculator</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <div class="calc">\n    <div class="display">\n      <div class="expr" id="expr"></div>\n      <div class="result" id="result">0</div>\n    </div>\n    <div class="buttons">\n      <button class="op wide" onclick="ca()">AC</button>\n      <button class="op" onclick="sign()">+/-</button>\n      <button class="op" onclick="pct()">%</button>\n      <button class="acc" onclick="op('÷')">÷</button>\n      <button onclick="num('7')">7</button><button onclick="num('8')">8</button><button onclick="num('9')">9</button>\n      <button class="acc" onclick="op('×')">×</button>\n      <button onclick="num('4')">4</button><button onclick="num('5')">5</button><button onclick="num('6')">6</button>\n      <button class="acc" onclick="op('−')">−</button>\n      <button onclick="num('1')">1</button><button onclick="num('2')">2</button><button onclick="num('3')">3</button>\n      <button class="acc" onclick="op('+')">+</button>\n      <button class="wide" onclick="num('0')">0</button>\n      <button onclick="dot()">.</button>\n      <button class="eq" onclick="calc()">=</button>\n    </div>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1c1c1e;font-family:-apple-system,BlinkMacSystemFont,sans-serif}.calc{width:320px;background:#1c1c1e;border-radius:40px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6)}.display{padding:20px 24px 12px;text-align:right}.expr{font-size:16px;color:#888;min-height:22px;word-break:break-all}.result{font-size:72px;color:#fff;font-weight:200;line-height:1.1;word-break:break-all;transition:font-size 0.2s}.buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:12px 16px 28px}button{height:76px;border:none;border-radius:50%;font-size:28px;font-weight:400;cursor:pointer;transition:filter 0.1s;color:#fff;background:#333333}button:hover{filter:brightness(1.2)}.op{background:#a5a5a5;color:#000}.acc{background:#ff9f0a}.eq{background:#ff9f0a}.wide{grid-column:span 2;border-radius:38px;text-align:left;padding-left:28px;font-size:30px}`,
      'script.js': `let cur='0',prev='',operator='',justCalc=false;\nconst D=()=>document.getElementById('result');\nconst E=()=>document.getElementById('expr');\nfunction num(v){if(justCalc){cur=v;justCalc=false;}else if(cur==='0')cur=v;else cur+=v;D().textContent=cur;resize();}\nfunction dot(){if(!cur.includes('.')){cur+='.';D().textContent=cur;}}\nfunction op(o){if(prev&&!justCalc)calc();prev=cur;operator=o;E().textContent=cur+' '+o;cur='0';justCalc=false;}\nfunction ca(){cur='0';prev='';operator='';E().textContent='';D().textContent='0';}\nfunction sign(){cur=String(-parseFloat(cur));D().textContent=cur;}\nfunction pct(){cur=String(parseFloat(cur)/100);D().textContent=cur;}\nfunction calc(){\n  if(!prev||!operator)return;\n  const a=parseFloat(prev),b=parseFloat(cur);\n  let r;\n  if(operator==='÷')r=a/b;\n  else if(operator==='×')r=a*b;\n  else if(operator==='−')r=a-b;\n  else r=a+b;\n  E().textContent=prev+' '+operator+' '+cur+' =';\n  cur=String(parseFloat(r.toFixed(10)));prev='';operator='';justCalc=true;\n  D().textContent=cur;resize();\n}\nfunction resize(){const n=cur.length;D().style.fontSize=n>10?'36px':n>7?'52px':'72px';}`,
    },
  },
  {
    id: 'todo',
    name: 'Todo App',
    category: 'Apps',
    emoji: '✅',
    description: 'Functional todo app with localStorage.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Todo App</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <div class="app">\n    <h1>📝 My Tasks</h1>\n    <div class="input-row">\n      <input type="text" id="input" placeholder="Add a new task..." />\n      <button onclick="addTodo()">+</button>\n    </div>\n    <div class="filters">\n      <button class="active" onclick="filter('all',this)">All</button>\n      <button onclick="filter('active',this)">Active</button>\n      <button onclick="filter('done',this)">Done</button>\n    </div>\n    <ul id="list"></ul>\n    <p class="count" id="count"></p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{display:flex;justify-content:center;align-items:flex-start;min-height:100vh;background:linear-gradient(135deg,#1e293b,#0f172a);font-family:'Segoe UI',system-ui,sans-serif;padding:4rem 1rem}.app{width:100%;max-width:480px;background:#1e293b;border-radius:20px;padding:2rem;box-shadow:0 20px 60px rgba(0,0,0,0.5)}h1{font-size:1.75rem;color:#f1f5f9;margin-bottom:1.5rem}.input-row{display:flex;gap:.75rem;margin-bottom:1rem}.input-row input{flex:1;padding:.875rem 1rem;background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f1f5f9;font-size:.95rem;outline:none;transition:border-color 0.2s}.input-row input:focus{border-color:#3b82f6}.input-row button{width:48px;height:48px;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border:none;border-radius:12px;font-size:1.5rem;cursor:pointer;transition:transform 0.2s}.input-row button:hover{transform:scale(1.05)}.filters{display:flex;gap:.5rem;margin-bottom:1.25rem}.filters button{padding:.4rem .875rem;border-radius:999px;border:1px solid rgba(255,255,255,0.12);background:transparent;color:#94a3b8;font-size:.8rem;cursor:pointer;transition:all 0.2s}.filters button.active{background:#3b82f6;color:#fff;border-color:#3b82f6}ul{list-style:none;space-y:.5rem}li{display:flex;align-items:center;gap:.75rem;padding:.875rem 1rem;background:#0f172a;border:1px solid rgba(255,255,255,0.06);border-radius:12px;margin-bottom:.5rem;transition:opacity 0.2s}li.done{opacity:.5}li.done span{text-decoration:line-through;color:#64748b}li span{flex:1;color:#e2e8f0;font-size:.9rem}input[type=checkbox]{width:18px;height:18px;accent-color:#3b82f6;cursor:pointer}.del{background:none;border:none;color:#475569;cursor:pointer;font-size:1rem;padding:.25rem;border-radius:4px;transition:color 0.2s}.del:hover{color:#f87171}.count{margin-top:1rem;font-size:.8rem;color:#64748b;text-align:center}`,
      'script.js': `let todos=JSON.parse(localStorage.getItem('todos')||'[]'),cur='all';\nfunction save(){localStorage.setItem('todos',JSON.stringify(todos));}\nfunction render(){const l=document.getElementById('list');const items=todos.filter(t=>cur==='all'?true:cur==='done'?t.done:!t.done);l.innerHTML=items.map((t,i)=>{const ri=todos.indexOf(t);return\`<li class="\${t.done?'done':''}"><input type="checkbox" \${t.done?'checked':''} onchange="toggle(\${ri})"><span>\${t.text}</span><button class="del" onclick="del(\${ri})">✕</button></li>\`;}).join('');const left=todos.filter(t=>!t.done).length;document.getElementById('count').textContent=left+' task'+(left!==1?'s':'')+' remaining';}\nfunction addTodo(){const inp=document.getElementById('input');const v=inp.value.trim();if(!v)return;todos.unshift({text:v,done:false});inp.value='';save();render();}\nfunction toggle(i){todos[i].done=!todos[i].done;save();render();}\nfunction del(i){todos.splice(i,1);save();render();}\nfunction filter(f,btn){cur=f;document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render();}\ndocument.getElementById('input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});\nrender();`,
    },
  },
  {
    id: 'login',
    name: 'Login Form',
    category: 'UI Components',
    emoji: '🔐',
    description: 'Beautiful animated login & signup form.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Login</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <div class="card">\n    <div class="tabs">\n      <button class="tab active" onclick="show('login',this)">Sign In</button>\n      <button class="tab" onclick="show('signup',this)">Sign Up</button>\n    </div>\n    <form id="login" onsubmit="event.preventDefault()">\n      <h2>Welcome back</h2>\n      <label>Email<input type="email" placeholder="you@example.com" /></label>\n      <label>Password<input type="password" placeholder="••••••••" /></label>\n      <a class="forgot" href="#">Forgot password?</a>\n      <button type="submit" class="submit">Sign In</button>\n      <div class="divider"><span>or</span></div>\n      <button type="button" class="social">🔵 Continue with Google</button>\n    </form>\n    <form id="signup" class="hidden" onsubmit="event.preventDefault()">\n      <h2>Create account</h2>\n      <label>Name<input type="text" placeholder="Your full name" /></label>\n      <label>Email<input type="email" placeholder="you@example.com" /></label>\n      <label>Password<input type="password" placeholder="Create a password" /></label>\n      <button type="submit" class="submit">Create Account</button>\n    </form>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);font-family:'Segoe UI',system-ui,sans-serif}.card{background:#1e293b;border-radius:24px;padding:2.5rem;width:100%;max-width:400px;box-shadow:0 25px 80px rgba(0,0,0,0.5)}.tabs{display:flex;gap:.5rem;margin-bottom:2rem;background:#0f172a;border-radius:12px;padding:4px}.tab{flex:1;padding:.6rem;border:none;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#94a3b8;background:transparent;transition:all 0.2s}.tab.active{background:#3b82f6;color:#fff}h2{font-size:1.5rem;font-weight:700;color:#f1f5f9;margin-bottom:1.5rem}label{display:flex;flex-direction:column;gap:.4rem;font-size:.8rem;font-weight:500;color:#94a3b8;margin-bottom:1rem}input{padding:.875rem 1rem;background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:.95rem;outline:none;transition:border-color 0.2s}input:focus{border-color:#3b82f6}.forgot{display:block;text-align:right;font-size:.8rem;color:#3b82f6;text-decoration:none;margin-top:-.5rem;margin-bottom:1.25rem}.submit{width:100%;padding:.875rem;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;border:none;border-radius:10px;font-size:.95rem;font-weight:600;cursor:pointer;margin-bottom:1rem;transition:transform 0.2s}.submit:hover{transform:translateY(-1px)}.divider{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;color:#475569;font-size:.8rem}.divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.08)}.social{width:100%;padding:.875rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e2e8f0;font-size:.9rem;cursor:pointer;transition:background 0.2s}.social:hover{background:rgba(255,255,255,0.1)}.hidden{display:none}`,
      'script.js': `function show(id,btn){document.querySelectorAll('form').forEach(f=>f.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}`,
    },
  },
  {
    id: 'admin',
    name: 'Admin Dashboard',
    category: 'Business',
    emoji: '📊',
    description: 'Analytics dashboard with stat cards.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Dashboard</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <aside><div class="logo">⚡ Admin</div>\n    <nav><a href="#" class="a">📊 Dashboard</a><a href="#">👥 Users</a><a href="#">📦 Products</a><a href="#">💰 Revenue</a><a href="#">⚙️ Settings</a></nav>\n  </aside>\n  <main>\n    <header><h1>Dashboard</h1><span class="date" id="dt"></span></header>\n    <div class="stats">\n      <div class="stat"><span class="label">Total Revenue</span><span class="val">$84,254</span><span class="chg up">↑ 12.5%</span></div>\n      <div class="stat"><span class="label">Active Users</span><span class="val">14,823</span><span class="chg up">↑ 8.2%</span></div>\n      <div class="stat"><span class="label">Orders</span><span class="val">3,042</span><span class="chg up">↑ 4.1%</span></div>\n      <div class="stat"><span class="label">Churn Rate</span><span class="val">2.3%</span><span class="chg dn">↓ 0.4%</span></div>\n    </div>\n    <div class="chart-placeholder"><p>📈 Revenue Chart — integrate Chart.js from Packages</p></div>\n  </main>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{display:flex;font-family:'Segoe UI',system-ui,sans-serif;background:#0d1117;color:#e2e8f0;min-height:100vh}aside{width:220px;flex-shrink:0;background:#111827;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;padding:1.5rem 1rem}.logo{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:2rem;padding:0 .5rem}nav{display:flex;flex-direction:column;gap:.25rem}nav a{display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:.875rem;transition:all 0.2s}nav a:hover,nav a.a{background:rgba(59,130,246,0.15);color:#60a5fa}main{flex:1;padding:2rem;overflow-y:auto}header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem}h1{font-size:1.5rem;font-weight:700;color:#fff}.date{font-size:.85rem;color:#64748b}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem}.stat{background:#111827;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:1.5rem;display:flex;flex-direction:column;gap:.4rem}.label{font-size:.8rem;color:#94a3b8}.val{font-size:1.75rem;font-weight:700;color:#fff}.chg{font-size:.8rem;font-weight:600}.up{color:#4ade80}.dn{color:#f87171}.chart-placeholder{background:#111827;border:1px solid rgba(255,255,255,0.06);border-radius:16px;height:280px;display:flex;align-items:center;justify-content:center;color:#475569;font-size:.95rem}`,
      'script.js': `document.getElementById('dt').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});`,
    },
  },
  {
    id: 'restaurant',
    name: 'Restaurant Website',
    category: 'Business',
    emoji: '🍽️',
    description: 'Elegant restaurant site with menu.',
    files: {
      'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>La Maison</title>\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <nav><div class="logo">🍽 La Maison</div><div class="links"><a href="#">Menu</a><a href="#">About</a><a href="#">Reserve</a></div></nav>\n  <header><h1>A Taste of Excellence</h1><p>Fine dining crafted with passion and seasonal ingredients.</p><a href="#" class="btn">Reserve a Table</a></header>\n  <section class="menu">\n    <h2>Our Menu</h2>\n    <div class="grid">\n      <div class="dish"><div class="emoji">🥩</div><h3>Wagyu Steak</h3><p>A5 wagyu with truffle butter</p><span>$68</span></div>\n      <div class="dish"><div class="emoji">🦞</div><h3>Lobster Bisque</h3><p>Classic cream bisque, fresh herbs</p><span>$38</span></div>\n      <div class="dish"><div class="emoji">🥗</div><h3>Caesar Salad</h3><p>Housemade dressing, anchovy crouton</p><span>$22</span></div>\n      <div class="dish"><div class="emoji">🍮</div><h3>Crème Brûlée</h3><p>Classic French dessert, vanilla pod</p><span>$16</span></div>\n    </div>\n  </section>\n  <script src="script.js"></script>\n</body>\n</html>`,
      'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Georgia',serif;background:#0a0705;color:#e8dcc8}nav{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 4rem;border-bottom:1px solid rgba(255,220,150,0.15)}.logo{font-size:1.25rem;color:#d4a853;letter-spacing:.05em}.links{display:flex;gap:2rem}.links a{color:#a89070;text-decoration:none;font-size:.9rem;letter-spacing:.05em;transition:color 0.2s}.links a:hover{color:#d4a853}header{text-align:center;padding:6rem 2rem;background:radial-gradient(ellipse at center,rgba(212,168,83,0.12) 0%,transparent 70%)}h1{font-size:clamp(2rem,5vw,4rem);color:#f0e6d0;font-weight:400;letter-spacing:.02em;margin-bottom:1rem}header p{font-size:1.1rem;color:#a89070;margin-bottom:2.5rem}.btn{display:inline-block;padding:.875rem 2.5rem;border:1px solid #d4a853;color:#d4a853;text-decoration:none;border-radius:0;letter-spacing:.08em;font-size:.875rem;transition:all 0.3s}.btn:hover{background:#d4a853;color:#0a0705}.menu{padding:5rem 4rem;text-align:center}h2{font-size:2rem;color:#d4a853;font-weight:400;margin-bottom:3rem;letter-spacing:.05em}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;max-width:900px;margin:0 auto}.dish{padding:2rem;border:1px solid rgba(212,168,83,0.2);background:rgba(255,255,255,0.02);transition:border-color 0.3s}.dish:hover{border-color:rgba(212,168,83,0.5)}.emoji{font-size:2.5rem;margin-bottom:1rem}.dish h3{font-size:1.1rem;color:#f0e6d0;margin-bottom:.5rem;font-weight:400}.dish p{color:#a89070;font-size:.85rem;margin-bottom:.75rem}span{color:#d4a853;font-size:1.1rem;font-weight:600}`,
      'script.js': `console.log('La Maison — Bon Appétit!');`,
    },
  },
];

const CATEGORIES = ['All', ...new Set(TEMPLATES.map(t => t.category))];

// ─── Component ────────────────────────────────────────────────────────────────
const TemplatesPanel = ({ onUseTemplate }) => {
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState('All');
  const [preview, setPreview] = useState(null);

  const filtered = useMemo(() =>
    TEMPLATES.filter(t =>
      (cat === 'All' || t.category === cat) &&
      t.name.toLowerCase().includes(search.toLowerCase())
    ), [search, cat]);

  const use = (tmpl) => {
    onUseTemplate(tmpl.files, tmpl.name);
    setPreview(null);
  };

  const cardStyle = (active) => ({
    background: active ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${active ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '10px', padding: '10px 12px',
    cursor: 'pointer', width: '100%', textAlign: 'left',
    transition: 'all 0.15s',
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pt-2 pb-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates…"
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#e2e8f0' }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {CATEGORIES.map(c => (
          <button key={c}
            onClick={() => setCat(c)}
            className="text-[10px] font-semibold whitespace-nowrap px-2 py-1 rounded-full border transition-all"
            style={cat === c
              ? { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }
              : { background: 'transparent', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }
            }
          >{c}</button>
        ))}
      </div>

      {/* Template list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filtered.length === 0 && (
          <p className="text-center text-xs p-4" style={{ color: 'rgba(255,255,255,0.3)' }}>No templates found</p>
        )}
        {filtered.map(t => (
          <div key={t.id}>
            <button
              onClick={() => setPreview(preview?.id === t.id ? null : t)}
              style={cardStyle(preview?.id === t.id)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{t.name}</p>
                  <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.description}</p>
                </div>
              </div>
              {preview?.id === t.id && (
                <button
                  onClick={(e) => { e.stopPropagation(); use(t); }}
                  className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}
                >
                  Use Template →
                </button>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPanel;
