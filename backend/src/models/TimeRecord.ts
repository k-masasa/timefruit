export interface TimeRecord {
  id?: number;
  category: string;
  hours: number;
  memo?: string;
  date?: string;
  created_at?: string;
}

export interface CreateTimeRecordRequest {
  category: string;
  hours: number;
  memo?: string;
}