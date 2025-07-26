import type { TimeRecord, CreateTimeRecordRequest, ApiResponse } from '../types/TimeRecord';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export class TimeRecordService {
  static async createTimeRecord(data: CreateTimeRecordRequest): Promise<ApiResponse<TimeRecord>> {
    const response = await fetch(`${API_BASE_URL}/api/time-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getTodaysTimeRecords(): Promise<ApiResponse<TimeRecord[]>> {
    const response = await fetch(`${API_BASE_URL}/api/time-records/today`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getAllTimeRecords(): Promise<ApiResponse<TimeRecord[]>> {
    const response = await fetch(`${API_BASE_URL}/api/time-records`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async deleteTimeRecord(id: number): Promise<ApiResponse<TimeRecord>> {
    const response = await fetch(`${API_BASE_URL}/api/time-records/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}