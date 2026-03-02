import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER_INTERNAL!,
      authorization: {
        url: `${process.env.KEYCLOAK_ISSUER_PUBLIC!}/protocol/openid-connect/auth`,
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

      const anyProfile = profile as any;
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