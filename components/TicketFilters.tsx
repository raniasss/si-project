"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { TicketStatus, TicketPriority } from "@/lib/types";

const STATUSES: { value: TicketStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "open", label: "Ouverts" },
  { value: "in_progress", label: "En cours" },
  { value: "resolved", label: "Résolus" },
  { value: "cancelled", label: "Annulés" }
];

const PRIORITIES: { value: TicketPriority | "all"; label: string }[] = [
  { value: "all", label: "Toutes priorités" },
  { value: "low", label: "Basse" },
  { value: "medium", label: "Moyenne" },
  { value: "high", label: "Haute" },
  { value: "urgent", label: "Urgente" }
];

function TicketFiltersContent() {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentStatus = params.get("status") || "all";
  const currentPriority = params.get("priority") || "all";

  function hrefFor(key: "status" | "priority", value: string) {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Link
            key={s.value}
            href={hrefFor("status", s.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 motion-reduce:transition-none ${
              currentStatus === s.value
                ? "border-brand-300 bg-brand-50 text-brand-800 shadow-sm ring-1 ring-brand-200/80"
                : "border-slate-200 bg-white text-fg-muted shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-fg"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>
      <span className="hidden h-4 w-px shrink-0 bg-slate-200 sm:block" aria-hidden />
      <select
        aria-label="Filtrer par priorité"
        className="input w-full cursor-pointer py-2 text-xs transition-all duration-200 sm:max-w-[200px] sm:py-1.5"
        value={currentPriority}
        onChange={(e) => {
          window.location.href = hrefFor("priority", e.target.value);
        }}
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TicketFilters() {
  return (
    <Suspense fallback={<div className="mb-8 flex h-10 w-full animate-pulse rounded-lg bg-slate-100" />}>
      <TicketFiltersContent />
    </Suspense>
  );
}
