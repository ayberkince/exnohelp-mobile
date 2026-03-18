export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`❌ Missing critical environment variables: ${missing.join(', ')}`);
  }

  console.log("✅ Infrastructure: Environment validated.");
}
