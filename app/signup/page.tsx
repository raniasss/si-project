"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    const supabase = createClient();
    const trimmedEmail = email.trim();
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { full_name: fullName, department }
      }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setInfo(
        "Compte créé. Si la confirmation par email est activée dans Supabase, " +
          "vérifiez votre boîte mail, sinon vous pouvez vous connecter."
      );
    }
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
          Créer un compte
        </h1>
        <p className="mb-7 text-center text-[13px] text-fg-muted">
          Ouvrez votre accès au support IT-Fix
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="fullName">
              Nom complet
            </label>
            <input
              id="fullName"
              name="fullName"
              className="input"
              placeholder="Jean Dupont"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onInput={(e) => setFullName(e.currentTarget.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="department">
              Département
            </label>
            <input
              id="department"
              name="department"
              className="input"
              placeholder="ex: Comptabilité, RH..."
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              onInput={(e) => setDepartment(e.currentTarget.value)}
            />
          </div>
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
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          {error && <div className="alert-error mt-4">{error}</div>}
          {info && <div className="alert-success mt-4">{info}</div>}

          <button
            type="submit"
            className="btn btn-primary w-full py-2.5 text-[13.5px]"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-fg-muted">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-600 underline-offset-2 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
