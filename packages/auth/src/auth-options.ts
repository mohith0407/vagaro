// packages/aws-auth/src/auth-options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "./client";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const params: InitiateAuthCommandInput = {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: process.env.AWS_COGNITO_CLIENT_ID,
          AuthParameters: {
            USERNAME: credentials.username,
            PASSWORD: credentials.password,
          },
        };

        try {
          const command = new InitiateAuthCommand(params);
          const response = await cognitoClient.send(command);

          if (response.AuthenticationResult) {
            const { IdToken, AccessToken } = response.AuthenticationResult;

            // -----------------------------------------------------------
            // FIX: Decode the IdToken to get the real 'sub' (UUID)
            // -----------------------------------------------------------
            if (IdToken) {
              const payload = JSON.parse(
                Buffer.from(IdToken.split(".")[1], "base64").toString()
              );

              return {
                id: payload.sub, // ✅ This is now the UUID (e.g. "550e8400-e29b...")
                name: payload.name || credentials.username,
                email: payload.email || credentials.username,
                accessToken: AccessToken,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Cognito Auth Error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Saves the UUID to the token
        // @ts-ignore
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id; // Exposes UUID to the client
        // @ts-ignore
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};