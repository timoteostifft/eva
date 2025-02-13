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
  stage: {
    type: Number,
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

export const Action = new mongo.Schema({
  _id: {
    type: String,
    required: true,
  },
  journey_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
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

export const ActionModel = mongo.model("Action", Action);

export const Template = new mongo.Schema({
  _id: {
    type: String,
    required: true,
  },
  action_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
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

export const TemplateModel = mongo.model("Template", Template);
