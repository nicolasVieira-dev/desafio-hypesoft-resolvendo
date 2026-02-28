import { LoginButton } from "@/components/auth/login-button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Hypesoft</h1>
        <p className="text-sm text-muted-foreground">Faça login para acessar o sistema.</p>
        <LoginButton />
      </div>
    </main>
  );
}