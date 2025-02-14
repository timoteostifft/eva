// Libraries
import j2s from "joi-to-swagger";

// Controllers
import { listUsersSchema } from "@/infra/http/controllers/list-users";
import { listJourneysSchema } from "@/infra/http/controllers/list-journeys";
import { associateJourneySchema } from "@/infra/http/controllers/associate-journey";
import { dispatchJourneySchema } from "@/infra/http/controllers/dispatch-journey";

const { swagger: listUsersQuerySchema } = j2s(listUsersSchema);
const { swagger: listJourneysQuerySchema } = j2s(listJourneysSchema);
const { swagger: associateJourneyBodySchema } = j2s(associateJourneySchema);
const { swagger: dispatchJourneyBodySchema } = j2s(dispatchJourneySchema);

const paths = {
  users: {
    "/users": {
      get: {
        tags: ["Users"],
        summary: "List users",
        parameters: [
          {
            in: "query",
            name: "name",
            schema: listUsersQuerySchema.properties.name,
          },
          {
            in: "query",
            name: "page",
            required: true,
            schema: listUsersQuerySchema.properties.page,
          },
        ],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      first_name: { type: "string" },
                      last_name: { type: "string" },
                      email: { type: "string", format: "email" },
                      phone: { type: "string" },
                      created_at: { type: "string", format: "date-time" },
                      updated_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Fetch user by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "User details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    email: { type: "string", format: "email" },
                    phone: { type: "string" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  journeys: {
    "/journeys": {
      get: {
        tags: ["Journeys"],
        summary: "List journeys",
        parameters: [
          {
            in: "query",
            name: "name",
            schema: listJourneysQuerySchema.properties.name,
          },
          {
            in: "query",
            name: "page",
            required: true,
            schema: listJourneysQuerySchema.properties.page,
          },
        ],
        responses: {
          200: {
            description: "List of journeys",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      name: { type: "string" },
                      description: { type: "string" },
                      interval: { type: "number" },
                      created_at: { type: "string", format: "date-time" },
                      updated_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  userJourneys: {
    "/user-journey": {
      post: {
        tags: ["User Journeys"],
        summary: "Associate journey with user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: associateJourneyBodySchema,
            },
          },
        },
        responses: {
          201: {
            description: "Journey associated successfully",
          },
        },
      },
    },
    "/user-journey/dispatch": {
      post: {
        tags: ["User Journeys"],
        summary: "Dispatch journey",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: dispatchJourneyBodySchema,
            },
          },
        },
        responses: {
          201: {
            description: "Journey dispatched successfully",
          },
        },
      },
    },
  },
};

export const docs = {
  openapi: "3.0.0",
  info: {
    title: "Journey API",
    description: "Journey API documentation",
    version: "1.0.0",
  },
  tags: [
    { name: "Users", description: "User management endpoints" },
    { name: "Journeys", description: "Journey management endpoints" },
    {
      name: "User Journeys",
      description: "User journey association endpoints",
    },
  ],
  paths: {
    ...paths.users,
    ...paths.journeys,
    ...paths.userJourneys,
  },
};
