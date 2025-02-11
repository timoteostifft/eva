// Libraries
import { Router } from "express";

// Routes
import { listUsers } from "@/infra/http/controllers/list-users";
import { associateJourney } from "@/infra/http/controllers/associate-journey";

export const router = Router();

router.get("/users", listUsers);

router.post("/user-journey", associateJourney);
