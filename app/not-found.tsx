import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-12 max-w-xl">
      <div className="card p-10 text-center">
        <div className="mono-id mb-3 text-5xl font-semibold tracking-tighter text-brand-600">404</div>
        <h1 className="heading mb-2 text-xl font-bold tracking-tight">Page introuvable</h1>
        <p className="mb-8 text-sm text-fg-muted">
          Cette page n&apos;existe pas, ou le ticket demandé n&apos;est pas à vous.
        </p>
        <Link href="/dashboard" className="btn btn-primary inline-flex">
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
