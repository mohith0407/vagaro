// packages/aws-auth/src/cognito-client.ts
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

// These env variables will be read from the APP running this code (apps/web)
export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});