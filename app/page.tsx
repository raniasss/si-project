import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <div className="py-16 md:py-32">
      <div className="max-w-3xl mx-auto text-center animate-fade-up motion-reduce:animate-none">
        {/* Eyebrow pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
          Extranet support informatique · IT-Fix
        </div>

        <h1 className="mb-6 text-[2.6rem] font-bold leading-[1.06] tracking-tight md:text-[3.2rem]">
          <span className="text-gradient">Un bug&nbsp;? Un ticket.</span>
          <br />
          <span className="text-fg/90">Un technicien. Réglé.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-[500px] text-lg leading-relaxed text-fg-muted">
          IT-Fix connecte vos équipes au support IT : décrivez la panne,
          joignez une capture, suivez la résolution en temps réel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup" className="btn btn-primary gap-1.5 px-6 py-2.5 text-[13.5px]">
            Créer un compte employé
            <span className="opacity-70">→</span>
          </Link>
          <Link href="/login" className="btn btn-secondary px-6 py-2.5 text-[13.5px]">
            Se connecter
          </Link>
        </div>
      </div>

      <section className="mt-24 grid gap-6 sm:mt-40 md:grid-cols-3">
        {[
          {
            step: "01", icon: "🔍",
            title: "Consultez les techniciens",
            body: "Réseau, matériel, logiciels, sécurité — choisissez le bon profil.",
            accent: "before:bg-brand-500"
          },
          {
            step: "02", icon: "🎫",
            title: "Ouvrez un ticket",
            body: "Description structurée et pièce jointe pour diagnostiquer plus vite.",
            accent: "before:bg-indigo-500"
          },
          {
            step: "03", icon: "📊",
            title: "Suivez la résolution",
            body: "Statuts et priorités visibles en un coup d'œil, sans friction.",
            accent: "before:bg-violet-500"
          },
        ].map((item, i) => (
          <div
            key={item.step}
            className={`card group relative overflow-hidden p-6 sm:p-7 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-l-2xl before:content-[''] animate-fade-up motion-reduce:animate-none ${item.accent}`}
            style={{ animationDelay: `${100 + i * 90}ms` }}
          >
            <div className="mono-id mb-3 font-medium text-brand-500">{item.step}</div>
            <div className="mb-3 text-2xl">{item.icon}</div>
            <h3 className="mb-2 text-[14px] font-semibold tracking-tight text-fg">{item.title}</h3>
            <p className="text-[13px] leading-relaxed text-fg-muted">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
