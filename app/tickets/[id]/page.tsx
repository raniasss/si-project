import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PriorityBadge, StatusBadge } from "@/components/StatusBadge";
import type { TicketWithTechnician } from "@/lib/types";
import { DeleteTicketButton } from "./DeleteTicketButton";
import { MarkResolvedButton } from "./MarkResolvedButton";

export const dynamic = "force-dynamic";

export default async function TicketDetailPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*, technicians(id, full_name, speciality, email, phone)")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();
  const ticket = data as TicketWithTechnician & {
    technicians: {
      id: string;
      full_name: string;
      speciality: string;
      email: string | null;
      phone: string | null;
    } | null;
  };

  let screenshotUrl: string | null = null;
  if (ticket.screenshot_path) {
    const { data: signed } = await supabase.storage
      .from("bug-screenshots")
      .createSignedUrl(ticket.screenshot_path, 60 * 60);
    screenshotUrl = signed?.signedUrl ?? null;
  }

  const created = new Date(ticket.created_at).toLocaleString("fr-FR");

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/tickets" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700">
          ← Retour aux tickets
        </Link>
      </div>

      <div className="card mb-4 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
              ID ticket
            </p>
            <p className="mono-id mb-3 break-all text-[13px] text-fg-muted/90">{ticket.id}</p>
            <h1 className="mb-2 text-[1.6rem] font-bold tracking-tight text-fg md:text-[1.9rem]">{ticket.title}</h1>
            <div className="text-sm text-fg-muted">Créé le {created}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>

        <div className="mb-8 whitespace-pre-wrap text-sm leading-relaxed text-fg/90">{ticket.description}</div>

        {ticket.technicians && (
          <div className="border-t border-slate-200/60 pt-6">
            <div className="label mb-3">Technicien assigné</div>
            <div className="font-semibold">{ticket.technicians.full_name}</div>
            <div className="text-sm text-fg-muted">{ticket.technicians.speciality}</div>
            {ticket.technicians.email && (
              <div className="mt-1 text-sm text-fg-muted">{ticket.technicians.email}</div>
            )}
          </div>
        )}
      </div>

      {screenshotUrl && (
        <div className="card mb-4 p-6 md:p-8">
          <div className="label mb-4">Capture d&apos;écran du bug</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotUrl}
            alt="Capture du bug"
            className="max-h-[480px] w-auto rounded-xl border border-slate-200/80 shadow-sm"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-3">
        <MarkResolvedButton ticketId={ticket.id} currentStatus={ticket.status} />
        <DeleteTicketButton ticketId={ticket.id} />
      </div>
    </div>
  );
}
