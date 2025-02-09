// Libraries
import { Router } from "express";

// Routes
import { associateJourney } from "@/infra/http/controllers/associate-journey";

export const router = Router();

router.post("/user-journey", associateJourney);
