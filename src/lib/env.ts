export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    apiVersion: import.meta.env.VITE_API_VERSION,
    nodeEnv: import.meta.env.VITE_NODE_ENV,
} as const;

// Type guard for required environment variables
const requiredEnvVars = ['apiBaseUrl'] as const;
requiredEnvVars.forEach(key => {
    if (!env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});