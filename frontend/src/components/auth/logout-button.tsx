"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  async function handleLogout() {
    
    await fetch("/api/keycloak/logout", { method: "POST" }).catch(() => null);

    
    await signOut({ callbackUrl: "/" });
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  );
}