import cors from "cors";
import express from "express";
import env from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import requestLogger from "./middleware/requestLogger.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed: ${origin}`));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", aiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Habitos server running on port ${env.port}`);
});