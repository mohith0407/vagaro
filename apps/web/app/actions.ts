// apps/web/src/app/actions.ts
"use server";

// import { cognitoClient } from "@repo/auth/src/client";
import { SignUpCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

// These env variables will be read from the APP running this code (apps/web)
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});
export async function signUp(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  // Cognito usually requires an email attribute
  const email = username; 

  try {
    await cognitoClient.send(new SignUpCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: name || email }
      ],
    }));
    return { success: true, message: "User created! Please check your email for the code." };
  } catch (error: any) {
    return { success: false, message: error.message || "Signup failed" };
  }
}

export async function confirmSignUp(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const code = formData.get("code") as string;

  try {
    await cognitoClient.send(new ConfirmSignUpCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
    }));
    return { success: true, message: "Account verified! You can now log in." };
  } catch (error: any) {
    return { success: false, message: error.message || "Verification failed" };
  }
}