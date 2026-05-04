"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <div className="card p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-700 ring-1 ring-red-200/90">
          !
        </div>
        <h1 className="heading mb-2 text-xl font-bold tracking-tight">Une erreur est survenue</h1>
        <p className="mb-6 text-sm text-fg-muted">{error.message || "Erreur inattendue."}</p>
        <button type="button" onClick={reset} className="btn btn-primary">
          Réessayer
        </button>
      </div>
    </div>
  );
}
