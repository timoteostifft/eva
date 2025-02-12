import "dotenv/config";

// Libraries
import express from "express";
import cors from "cors";

// Routes
import { router } from "@/infra/http/routes";

// Errors
import { handler } from "@/infra/http/errors/handler";

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);
server.use(handler);
server.listen(3333, () => console.log("🚀 Servidor HTTP rodando!"));
