import { createClient } from "@/lib/supabase/server";
import { TechnicianCard } from "@/components/TechnicianCard";
import type { Technician } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function TechniciansPage() {
  const supabase = createClient();
  const { data } = await supabase.from("technicians").select("*").order("full_name");

  const technicians = (data ?? []) as Technician[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="page-title flex items-center gap-2">
          Nos techniciens
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-700 align-middle">
            {technicians.length}
          </span>
        </h1>
        <p className="mt-1 text-sm text-fg-muted">Choisissez un spécialiste pour ouvrir un ticket.</p>
      </div>

      {technicians.length === 0 ? (
        <div className="card p-10 text-center text-fg-muted">
          Aucun technicien dans le catalogue. Exécutez{" "}
          <code className="mono-id rounded-lg bg-slate-100 px-2 py-1 text-fg ring-1 ring-slate-200/80">
            supabase/seed.sql
          </code>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.map((t) => (
            <TechnicianCard key={t.id} technician={t} />
          ))}
        </div>
      )}
    </div>
  );
}
