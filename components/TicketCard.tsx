import Link from "next/link";
import type { TicketStatus, TicketWithTechnician } from "@/lib/types";
import { PriorityBadge, StatusBadge } from "./StatusBadge";

export function TicketCard({ ticket }: { ticket: TicketWithTechnician }) {
  const date = new Date(ticket.created_at).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const shortId = ticket.id.slice(0, 8);

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="card group relative overflow-hidden block"
    >
      {/* Status accent bar */}
      <div className={[
        "absolute left-0 top-0 h-full w-[3px] rounded-l-2xl transition-opacity",
        ticket.status === "open"        ? "bg-brand-500" :
        ticket.status === "in_progress" ? "bg-amber-500" :
        ticket.status === "resolved"    ? "bg-emerald-500" : "bg-slate-300"
      ].join(" ")} />
      <div className="relative pl-4 p-5 transition-all duration-200">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="mb-1.5">
              <span className="mono-id inline-block rounded-md bg-slate-100/80 px-1.5 py-0.5 text-fg-faint">
                #{shortId}
              </span>
            </p>
            <h3 className="mt-0.5 line-clamp-1 text-[13.5px] font-semibold tracking-tight text-fg">
              {ticket.title}
            </h3>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
        <p className="mb-3 line-clamp-2 text-[12.5px] leading-relaxed text-fg-muted">
          {ticket.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
          <PriorityBadge priority={ticket.priority} />
          {ticket.technicians ? (
            <span>
              👨‍🔧 {ticket.technicians.full_name} · {ticket.technicians.speciality}
            </span>
          ) : (
            <span className="text-[11.5px] italic text-fg-faint">Non assigné</span>
          )}
          <span className="ml-auto font-mono text-[11px] tabular-nums text-fg-faint">{date}</span>
        </div>
      </div>
    </Link>
  );
}
