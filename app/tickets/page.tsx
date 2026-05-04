import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TicketCard } from "@/components/TicketCard";
import { TicketFilters } from "@/components/TicketFilters";
import type { TicketPriority, TicketStatus, TicketWithTechnician } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_VALUES: TicketStatus[] = ["open", "in_progress", "resolved", "cancelled"];
const PRIORITY_VALUES: TicketPriority[] = ["low", "medium", "high", "urgent"];

export default async function TicketsPage({
  searchParams
}: {
  searchParams: { status?: string; priority?: string };
}) {
  const supabase = createClient();

  let query = supabase
    .from("tickets")
    .select("*, technicians(id, full_name, speciality)")
    .order("created_at", { ascending: false });

  if (searchParams.status && STATUS_VALUES.includes(searchParams.status as TicketStatus)) {
    query = query.eq("status", searchParams.status);
  }
  if (
    searchParams.priority &&
    PRIORITY_VALUES.includes(searchParams.priority as TicketPriority)
  ) {
    query = query.eq("priority", searchParams.priority);
  }

  const { data } = await query;
  const tickets = (data ?? []) as TicketWithTechnician[];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            Mes tickets
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-700 align-middle">
              {tickets.length}
            </span>
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Tickets visibles : uniquement les vôtres (RLS activé).
          </p>
        </div>
        <Link
          href="/tickets/new"
          className="btn btn-primary gap-1 sm:shrink-0"
        >
          <span className="text-base font-light">+</span>
          Nouveau ticket
        </Link>
      </div>

      <TicketFilters />

      {tickets.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="mb-4 text-4xl">📭</div>
          <p className="mb-4 text-fg-muted">Aucun ticket ne correspond à ces filtres.</p>
          <Link href="/tickets/new" className="btn btn-primary inline-flex transition-all duration-200">
            Ouvrir un ticket
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      )}
    </div>
  );
}
