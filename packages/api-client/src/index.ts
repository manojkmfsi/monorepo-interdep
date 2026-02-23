import { logger } from '@monorepo/logger';
import { delay } from '@monorepo/utils';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  timestamp: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    logger.info(`ApiClient initialized with base URL: ${this.baseUrl}`);
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    logger.info(`Making request to ${endpoint}`);
    
    // Simulate API call with delay
    await delay(50);

    const response: ApiResponse<T> = {
      status: 200,
      data: { message: `Response from ${endpoint}` } as unknown as T,
      timestamp: new Date().toISOString()
    };

    logger.info(`Response received from ${endpoint}`);
    return response;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }
}
