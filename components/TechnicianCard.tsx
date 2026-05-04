import type { Technician } from "@/lib/types";
import Link from "next/link";

export function TechnicianCard({ technician }: { technician: Technician }) {
  const initials = technician.full_name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const AVATAR_GRADIENTS = [
    "from-blue-400 to-indigo-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-amber-500",
    "from-rose-400 to-pink-500",
    "from-cyan-400 to-sky-500",
  ];
  const avatarGrad = AVATAR_GRADIENTS[technician.full_name.charCodeAt(0) % AVATAR_GRADIENTS.length];

  return (
    <div className="card flex flex-col gap-4 p-5 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br ${avatarGrad} text-xs font-bold text-white shadow-sm`}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold tracking-tight text-fg">
            {technician.full_name}
          </div>
          <div className="text-[12px] font-medium text-fg-muted">{technician.speciality}</div>
        </div>
      </div>

      <div className="space-y-1">
        {technician.email && (
          <div className="flex items-center gap-1.5 break-all text-[12.5px] text-fg-muted">
            <span className="text-[11px]">✉</span>
            {technician.email}
          </div>
        )}
        {technician.phone && (
          <div className="flex items-center gap-1.5 tabular-nums text-[12.5px] text-fg-muted">
            <span className="text-[11px]">☏</span>
            {technician.phone}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100/80 pt-4">
        <span className={`badge gap-1.5 ${technician.available ? "badge-resolved" : "badge-cancelled"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${technician.available ? "bg-emerald-500" : "bg-slate-400"}`} />
          {technician.available ? "Disponible" : "Occupé"}
        </span>
        <Link
          href={`/tickets/new?technician=${technician.id}`}
          className="text-[12.5px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Ouvrir un ticket →
        </Link>
      </div>
    </div>
  );
}
