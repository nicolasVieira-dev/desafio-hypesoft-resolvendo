import { auth } from "@/auth";

export async function POST() {
  const session = await auth();
  const refreshToken = (session as any)?.refreshToken as string | undefined;

  if (!refreshToken) {
    return new Response(JSON.stringify({ ok: false, error: "Missing refresh_token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const clientSecret = process.env.AUTH_KEYCLOAK_SECRET!;

  const url = `${issuer}/protocol/openid-connect/logout`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return new Response(JSON.stringify({ ok: false, status: res.status, text }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}