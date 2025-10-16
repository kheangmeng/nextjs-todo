import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const externalApi = process.env.NEXT_EXTERNAL_API

function handleLogin(credentials: { email: string; password: string }) {
  return fetch(`${externalApi}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
}
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${externalApi}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
      accessTokenExpires: Date.now() + (refreshedTokens.expiresIn * 1000),
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: AuthOptions = {
  // 1. Authentication Providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log('login credentials: ', credentials)
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Call your external backend API for authentication
        const res = await handleLogin(credentials);

        // The API should return user data and a token
        // Example response: { user: { id: 1, name: 'J Smith', email: 'jsmith@example.com' }, token: 'xyz...' }
        const responseData = await res.json();

        if (res.ok && responseData) {
          // 3. Return a custom user object that includes the token
          // This object will be passed to the `jwt` callback
          return {
            id: responseData.data.profile.id,
            username: responseData.data.profile.username,
            email: responseData.data.profile.email,
            role: responseData.data.profile.role,
            accessToken: responseData.data.token,
            refreshToken: responseData.data.refreshToken,
            // accessTokenExpires: Date.now() + (user.expiresIn * 1000),
          };
        }

        // If you return null then an error will be displayed advising the user to check their details.
        // You can also throw an Error or a URL to redirect to.
        return null;
      },
    }),
  ],

  // 4. Custom Callbacks
  callbacks: {
    // This callback is called whenever a JWT is created (i.e. at sign in)
    // or updated (i.e. whenever a session is accessed in the client).
    async jwt({ token, user }) {
      // The `user` object is only available on the first sign-in.
      // Persist the access token to the `token` object.
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          // accessTokenExpires: user.accessTokenExpires,
        };
      }
      return token;

      // Token hasn't expired yet
      // if (Date.now() < token.accessTokenExpires) {
      //   return token
      // }

      // Token expired, refresh it
      // return await refreshAccessToken(token)
    },

    // This callback is called whenever a session is checked.
    // We want to pass the access token to the client-side session.
    async session({ session, token }) {
      // Add the accessToken to the session.user object
      session.user.username = token.username as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;

      return session;
    },
  },

  // 5. Using JWT for sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,

  // 6. Optional: Custom pages
  pages: {
    signIn: '/login', // A custom login page
    // error: '/auth/error', // Error code passed in query string as ?error=
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
