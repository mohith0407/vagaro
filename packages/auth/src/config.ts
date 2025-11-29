
const isServer = typeof window === 'undefined';

export const cognitoConfig = {
  // Use the name you registered in package.json
  name: '@repo/auth', 
  
  // 1. AWS Region
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1', 
  
  // 2. User Pool Configuration
  userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'us-east-1_xxxxxxxxx', 
  
  // 3. App Client Configuration
  userPoolWebClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID || '5aaaaaaaaaaaaa', 
  
  // 4. Identity Pool (Optional, for access to other AWS services)
  // identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
  
  // Type of authentication
  authenticationType: 'AMAZON_COGNITO_USER_POOLS' as const,
};

// packages/auth/src/config.ts (The FIX is in the structure below)

// ... (cognitoConfig definition remains the same)

export const amplifyConfig = {
  // ----------------------------------------------------
  // FIX: Use the new v6 configuration structure (ResourcesConfig)
  // The configuration for categories (Auth, API, etc.) 
  // are defined under a top-level 'resources' key.
  // ----------------------------------------------------
  resources: {
    auth: {
      // The content of the Auth configuration goes here
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolWebClientId, // Note the key name change!
      region: cognitoConfig.region,
    },
  },
  
  // The 'ssr' option is generally passed directly to Amplify.configure options 
  // (as shown in the previous solution's configureAmplify function).
  
};

// You might also need the region in the top-level config for general AWS operations
export const awsConfig = {
  // General AWS region setting
  region: cognitoConfig.region,
};