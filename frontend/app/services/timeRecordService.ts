import type { TimeRecord, CreateTimeRecordRequest, ApiResponse } from './types/TimeRecord';

export class TimeRecordService {
  private static getBackendUrl() {
    const config = useRuntimeConfig();
    return config.public.backendUrl;
  }

  static async createTimeRecord(data: CreateTimeRecordRequest): Promise<ApiResponse<TimeRecord>> {
    const response = await $fetch(`${this.getBackendUrl()}/api/time-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    return response as ApiResponse<TimeRecord>;
  }

  static async getTodaysTimeRecords(): Promise<ApiResponse<TimeRecord[]>> {
    const response = await $fetch(`${this.getBackendUrl()}/api/time-records/today`);
    return response as ApiResponse<TimeRecord[]>;
  }

  static async getAllTimeRecords(): Promise<ApiResponse<TimeRecord[]>> {
    const response = await $fetch(`${this.getBackendUrl()}/api/time-records`);
    return response as ApiResponse<TimeRecord[]>;
  }

  static async deleteTimeRecord(id: number): Promise<ApiResponse<TimeRecord>> {
    const response = await $fetch(`${this.getBackendUrl()}/api/time-records/${id}`, {
      method: 'DELETE',
    });
    return response as ApiResponse<TimeRecord>;
  }
}