import dotenv from "dotenv";

dotenv.config();

function normalizePort(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildAllowedOrigins(clientUrl) {
  const defaults = ["http://localhost:5173", "http://127.0.0.1:5173"];
  return [...new Set([clientUrl, ...defaults].filter(Boolean))];
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: normalizePort(process.env.PORT, 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  allowedOrigins: buildAllowedOrigins(process.env.CLIENT_URL || "http://localhost:5173"),
  anthropicKey: process.env.ANTHROPIC_KEY || "",
};

export default env;