"use client";

export function LiquidGlassSection() {
  const demoHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root{
      --bg:#0b0e1a;--text:#fff;--muted:rgba(255,255,255,.65);
      --aqua:#5ee7df;--violet:#b490f5;--rose:#f7a8c4;
    }
    *{box-sizing:border-box}
    body{
      margin:0; font-family:Inter,system-ui,sans-serif; color:var(--text);
      background:radial-gradient(circle at 10% 10%, #1f2a5a 0%, #0b0e1a 45%),
                 radial-gradient(circle at 90% 90%, #3e1f5f 0%, transparent 45%),
                 var(--bg);
      min-height:100vh;
    }
    .page{max-width:1000px;margin:0 auto;padding:40px 20px 56px}
    .hero{padding:48px 0;text-align:center}
    .hero h1{
      margin:0 0 14px;
      font-size:clamp(2rem,6vw,3.7rem);
      line-height:1.02;
      background:linear-gradient(135deg,#fff 20%,var(--aqua) 68%,var(--violet) 100%);
      -webkit-background-clip:text;background-clip:text;color:transparent;
    }
    .hero p{max-width:700px;margin:0 auto;color:var(--muted);line-height:1.6}
    .actions{display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap}
    .btn{
      border:1px solid rgba(255,255,255,.24); border-radius:999px; color:#fff;
      padding:10px 16px; text-decoration:none; display:inline-block;
      background:rgba(255,255,255,.08); backdrop-filter:blur(12px)
    }
    .btn.primary{background:linear-gradient(135deg,rgba(94,231,223,.45),rgba(59,130,246,.45))}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:28px}
    .glass{
      border:1px solid rgba(255,255,255,.2); border-radius:18px; padding:16px;
      background:rgba(255,255,255,.12); backdrop-filter:blur(14px);
      box-shadow:0 10px 30px rgba(0,0,0,.28);
    }
    .label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.66}
    .title{font-size:1.2rem;margin:10px 0 6px}
    .copy{font-size:.92rem;color:var(--muted);line-height:1.55}
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <h1>Liquid Glass UI Kit</h1>
      <p>Pure CSS glassmorphism surfaces with accessible interaction patterns, light/dark readiness, and expressive gradients.</p>
      <div class="actions">
        <a href="#" class="btn primary">Explore Components</a>
        <a href="#" class="btn">View Animations</a>
      </div>
    </section>
    <section class="grid">
      <article class="glass">
        <div class="label">Component · 01</div>
        <h3 class="title">Frosted Surface</h3>
        <p class="copy">Backdrop blur creates layered depth while preserving readability and contrast.</p>
      </article>
      <article class="glass">
        <div class="label">Component · 02</div>
        <h3 class="title">Accent Buttons</h3>
        <p class="copy">Rounded action controls with soft gradients, hover lift, and consistent focus states.</p>
      </article>
      <article class="glass">
        <div class="label">Component · 03</div>
        <h3 class="title">Status UI</h3>
        <p class="copy">Badges, chips, and table-friendly tags tailored for dense enterprise interfaces.</p>
      </article>
    </section>
  </main>
</body>
</html>`;

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 className="section-title">Liquid Glass UI</h2>
        <span className="mono-id">embedded component demo</span>
      </div>

      <div className="card overflow-hidden p-3 sm:p-4">
        <iframe
          title="Liquid Glass UI Kit preview"
          srcDoc={demoHtml}
          className="h-[760px] w-full rounded-xl border border-slate-200/70 bg-white"
        />
      </div>
    </section>
  );
}
