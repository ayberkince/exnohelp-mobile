import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@exnohelp.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Test Account 1: The Client
        if (credentials?.email === "client@exnohelp.com" && credentials?.password === "password") {
          return { id: "1", name: "Sarah Client", email: "client@exnohelp.com", role: "CLIENT" };
        }
        
        // Test Account 2: The Helper
        if (credentials?.email === "helper@exnohelp.com" && credentials?.password === "password") {
          return { id: "2", name: "Marcus Helper", email: "helper@exnohelp.com", role: "HELPER" };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };