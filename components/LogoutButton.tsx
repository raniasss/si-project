"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn btn-secondary ml-0.5 shrink-0 rounded-xl px-3 py-2 text-[13px] transition-all duration-200 sm:ml-1"
    >
      Déconnexion
    </button>
  );
}
