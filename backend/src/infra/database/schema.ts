// Database
import { mongo } from "@/infra/database/mongo-service";

export const User = new mongo.Schema({
  _id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export const UserModel = mongo.model("User", User);

export const Journey = new mongo.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export const JourneyModel = mongo.model("Journey", Journey);

export const UserJourney = new mongo.Schema({
  _id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  journey_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  start_at: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export const UserJourneyModel = mongo.model("UserJourney", UserJourney);
