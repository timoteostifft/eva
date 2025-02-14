import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from "axios";

export interface Request {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  data?: Record<string, unknown> | string;
}

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
};

export class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(config);
  }

  async send<T>(request: Request): Promise<T> {
    try {
      const { data } = await this.client.request<T>({
        method: request.method,
        url: request.endpoint,
        data: request.data,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return error.response.data;
      }

      throw error;
    }
  }
}

export const api = new Api();
