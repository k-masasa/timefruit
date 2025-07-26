export interface TimeRecord {
  id: number;
  category: string;
  hours: number;
  memo?: string;
  date: string;
  created_at: string;
}

export interface CreateTimeRecordRequest {
  category: string;
  hours: number;
  memo?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export type Category = '仕事' | '勉強' | '運動' | '副業' | 'その他';