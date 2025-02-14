import "dotenv/config";

// Libraries
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

// Routes
import { router } from "@/infra/http/routes";

// Errors
import { handler } from "@/infra/http/errors/handler";

// Docs
import { docs } from "@/infra/docs";

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);
server.use(handler);
server.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));
server.listen(3333, () => console.log("🚀 Servidor HTTP rodando!"));
