// apps/web/src/amplify-setup.ts

import { Amplify } from 'aws-amplify';
// Import the shared config
import { amplifyConfig, awsConfig } from '@repo/auth';

// Only run configuration once
let isAmplifyConfigured = false;

export function configureAmplify() {
  if (isAmplifyConfigured) {
    return;
  }
  
  Amplify.configure({ 
    ...awsConfig,
    ...amplifyConfig 
  }, { ssr: true });
  
  isAmplifyConfigured = true;
}