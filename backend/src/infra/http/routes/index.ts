// Libraries
import { Router } from "express";

// Routes
import { listUsers } from "@/infra/http/controllers/list-users";
import { fetchUser } from "@/infra/http/controllers/fetch-user";
import { listJourneys } from "@/infra/http/controllers/list-journeys";
import { associateJourney } from "@/infra/http/controllers/associate-journey";
import { dispatchJourney } from "@/infra/http/controllers/dispatch-journey";

export const router = Router();

router.get("/users", listUsers);
router.get("/users/:id", fetchUser);

router.get("/journeys", listJourneys);

router.post("/user-journey", associateJourney);
router.post("/user-journey/dispatch", dispatchJourney);
