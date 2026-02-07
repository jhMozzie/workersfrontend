import axios, { type AxiosInstance } from 'axios';
import type {
  WorkerResponse,
  CreateWorkerRequest,
  UpdateWorkerRequest,
} from '@/types/worker';

class WorkerService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7046/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getAll(): Promise<WorkerResponse[]> {
    const response = await this.api.get<WorkerResponse[]>('/workers');
    return response.data;
  }

  async getById(id: number): Promise<WorkerResponse> {
    const response = await this.api.get<WorkerResponse>(`/workers/${id}`);
    return response.data;
  }

  async create(worker: CreateWorkerRequest): Promise<WorkerResponse> {
    const response = await this.api.post<WorkerResponse>('/workers', worker);
    return response.data;
  }

  async update(
    id: number,
    worker: UpdateWorkerRequest
  ): Promise<WorkerResponse> {
    const response = await this.api.put<WorkerResponse>(`/workers/${id}`, worker);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.api.delete(`/workers/${id}`);
  }
}

export default new WorkerService();
