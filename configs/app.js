"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions } from "./cors-configuration.js";
import { helmetConfiguration } from "./helmet-configuration.js";


import publicationRoutes from "../src/publication/publication.routes.js";
import commentRoutes from "../src/comments/comment.routes.js";

const app = express();

// Seguridad
app.use(helmet(helmetConfiguration));
app.use(cors(corsOptions));
app.use(morgan("dev"));

// Body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Health
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// Rutas
app.use("/api/v1/publications", publicationRoutes);
app.use("/api/v1/comments", commentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

export default app;
