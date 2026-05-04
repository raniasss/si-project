import { createClient } from "@/lib/supabase/server";
import { TicketForm } from "@/components/TicketForm";

export const dynamic = "force-dynamic";

export default async function NewTicketPage({
  searchParams
}: {
  searchParams: { technician?: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from("technicians")
    .select("id, full_name, speciality, available")
    .order("available", { ascending: false })
    .order("full_name");

  const technicians = data ?? [];

  if (technicians.length === 0) {
    return (
      <div className="max-w-2xl">
        <div className="card p-8 text-center text-fg-muted">
          <p className="mb-2 font-semibold text-fg">Aucun technicien disponible.</p>
          <p className="text-sm leading-relaxed">
            Demandez à un administrateur d&apos;exécuter{" "}
            <code className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-mono text-fg ring-1 ring-slate-200/80">
              supabase/seed.sql
            </code>{" "}
            pour ajouter les techniciens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="heading text-2xl font-bold tracking-tight md:text-3xl">Ouvrir un ticket</h1>
        <p className="mt-1 text-sm text-fg-muted">
          Décrivez la panne, choisissez un technicien, joignez la capture d&apos;écran.
        </p>
      </div>

      <div className="card p-6 md:p-8">
        <TicketForm technicians={technicians} defaultTechnicianId={searchParams.technician} />
      </div>
    </div>
  );
}
