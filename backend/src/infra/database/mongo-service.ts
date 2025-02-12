// Environment
import { env } from "@/infra/env";

// Libraries
import mongoose from "mongoose";

export const mongo = new mongoose.Mongoose();

mongo.connect(env.DATABASE_URL);
