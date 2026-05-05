import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[4rem] max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:flex-nowrap sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 font-semibold tracking-tight text-fg transition-opacity hover:opacity-80"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-brand-600 text-[11px] font-bold tracking-wide text-white shadow shadow-brand-500/30 ring-1 ring-brand-700/20 transition duration-200 group-hover:ring-brand-500/40">
            IF
          </span>
          <span className="text-[14.5px] font-semibold tracking-tight text-fg">
            IT<span className="text-brand-600">-</span>Fix
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-1 sm:gap-2 sm:justify-end">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="nav-link hidden px-3 py-2 sm:inline-flex"
              >
                Dashboard
              </Link>
              <Link
                href="/technicians"
                className="nav-link hidden px-3 py-2 md:inline-flex"
              >
                Techniciens
              </Link>
              <Link
                href="/tickets"
                className="nav-link px-3 py-2"
              >
                Tickets
              </Link>
              <Link
                href="/tickets/new"
                className="btn btn-primary ml-1.5 shrink-0 gap-1 rounded-[9px] px-3.5 py-2 text-[12.5px]"
              >
                <span className="text-base font-light leading-none">+</span>
                Nouveau ticket
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="nav-link px-3 py-2"
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className="btn btn-primary ml-1 shrink-0 text-[14px]"
              >
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
