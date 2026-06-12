// backend/util/envValidation.js
// Validates required environment variables at startup

const REQUIRED_VARS = {
  SUPABASE_URL: { description: 'Supabase project URL', critical: true },
  SUPABASE_SERVICE_ROLE_KEY: { description: 'Supabase service role key', critical: true },
  JWT_SECRET: { description: 'JWT signing secret', critical: true },
  NODE_ENV: { description: 'Environment (development/production)', critical: false, default: 'development' },
  PORT: { description: 'Server port', critical: false, default: '5000' },
  FRONTEND_URL: { description: 'Frontend URL for CORS', critical: true },
};

const validateEnv = () => {
  const missing = [];
  const warnings = [];

  for (const [key, config] of Object.entries(REQUIRED_VARS)) {
    const value = process.env[key];
    if (!value && config.default) {
      process.env[key] = config.default;
    } else if (!value && config.critical) {
      missing.push(`${key} (${config.description})`);
    } else if (!value) {
      warnings.push(`${key} (${config.description})`);
    }
  }

  if (missing.length > 0) {
    console.error('CRITICAL: Missing required environment variables:');
    missing.forEach(v => console.error(`  - ${v}`));
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  if (warnings.length > 0) {
    console.warn('WARNING: Missing optional environment variables:');
    warnings.forEach(v => console.warn(`  - ${v}`));
  }

  return { missing, warnings };
};

module.exports = { validateEnv, REQUIRED_VARS };
