import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
      authorization: {
        params: { scope: "openid profile email offline_access" },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; 
        token.idToken = account.id_token; 
      }

      const anyProfile: any = profile;
      token.roles = anyProfile?.realm_access?.roles ?? [];
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).refreshToken = (token as any).refreshToken;
      (session as any).idToken = (token as any).idToken;
      (session as any).roles = (token as any).roles ?? [];
      return session;
    },
  },
});
