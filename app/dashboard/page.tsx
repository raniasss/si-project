import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TicketCard } from "@/components/TicketCard";
import type { TicketWithTechnician } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: employee } = await supabase
    .from("employees")
    .select("full_name, department")
    .eq("id", user!.id)
    .single();

  const { data: ticketsData } = await supabase
    .from("tickets")
    .select("*, technicians(id, full_name, speciality)")
    .order("created_at", { ascending: false })
    .limit(5);

  const tickets = (ticketsData ?? []) as TicketWithTechnician[];

  const { count: openCount } = await supabase
    .from("tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", "open");
  const { count: progressCount } = await supabase
    .from("tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress");
  const { count: resolvedCount } = await supabase
    .from("tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", "resolved");

  return (
    <div>
      <div className="mb-10">
        <h1 className="page-title">
          Bonjour {employee?.full_name || "collègue"}
        </h1>
        <p className="mt-1 text-sm text-fg-muted">
          {employee?.department
            ? `Département ${employee.department}`
            : "Bienvenue sur votre espace IT-Fix."}
        </p>
      </div>

      <section className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Stat label="Tickets ouverts" value={openCount ?? 0} tone="open" />
        <Stat label="En cours" value={progressCount ?? 0} tone="in_progress" />
        <Stat label="Résolus" value={resolvedCount ?? 0} tone="resolved" />
        <Link
          href="/tickets/new"
          className="card group grid min-h-[5.5rem] cursor-pointer place-items-center border-2 border-dashed border-brand-200/70 bg-gradient-to-br from-brand-50/30 to-white p-5 text-center hover:border-brand-400/60 hover:from-brand-50/60"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-2xl font-light text-brand-400 transition-colors group-hover:text-brand-500">+</span>
            <span className="text-xs font-semibold text-brand-600 group-hover:text-brand-700">Nouveau ticket</span>
          </div>
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="section-title">Tickets récents</h2>
          <Link
            href="/tickets"
            className="text-xs font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Voir tout →
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="mb-4 text-fg-muted">Aucun ticket pour l&apos;instant.</p>
            <Link href="/tickets/new" className="btn btn-primary inline-flex transition-all duration-200">
              Ouvrir votre premier ticket
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tickets.map((t) => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "open" | "in_progress" | "resolved" }) {
  const map = {
    open:        { bar: "bg-brand-500",   glow: "shadow-brand-100",   bg: "from-brand-50/50" },
    in_progress: { bar: "bg-amber-500",   glow: "shadow-amber-100",   bg: "from-amber-50/50" },
    resolved:    { bar: "bg-emerald-500", glow: "shadow-emerald-100", bg: "from-emerald-50/50" },
  }[tone];
  return (
    <div className={`card relative overflow-hidden bg-gradient-to-br ${map.bg} to-white p-5 sm:p-6`}>
      <div className={`absolute left-0 top-0 h-full w-[3px] ${map.bar} rounded-l-2xl`} />
      <div className={`mb-3 pl-2 text-[2.2rem] font-bold tabular-nums tracking-tight text-fg`}>
        {value}
      </div>
      <div className="pl-2">
        <span className={`badge badge-${tone}`}>{label}</span>
      </div>
    </div>
  );
}
