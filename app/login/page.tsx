"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-[410px] p-8 md:p-10">
        <div className="mb-7 flex justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-xl text-white shadow-lg shadow-brand-500/25 ring-1 ring-brand-700/20">
            🔐
          </div>
        </div>
        <h1 className="mb-1 text-center text-[1.55rem] font-bold tracking-tight text-fg">
          Bon retour
        </h1>
        <p className="mb-7 text-center text-[13px] text-fg-muted">
          Connectez-vous à votre espace IT-Fix
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              autoComplete="email"
              placeholder="vous@entreprise.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          {error && <div className="alert-error">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-full py-2.5 text-[13.5px]"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-fg-muted">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand-600 underline-offset-2 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center">Chargement...</div>}>
      <LoginForm />
    </Suspense>
  );
}
