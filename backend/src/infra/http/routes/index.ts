// Libraries
import { Router } from "express";

// Routes
import { listUsers } from "@/infra/http/controllers/list-users";
import { listJourneys } from "@/infra/http/controllers/list-journeys";
import { associateJourney } from "@/infra/http/controllers/associate-journey";
export const router = Router();

router.get("/users", listUsers);

router.get("/journeys", listJourneys);

router.post("/user-journey", associateJourney);
