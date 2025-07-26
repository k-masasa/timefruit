import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('time_records')
export class TimeRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 20 })
  category: string;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  hours: number;

  @Column({ type: 'text', nullable: true })
  memo?: string;

  @Column({ type: 'date' })
  date?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;
}

export interface CreateTimeRecordRequest {
  category: string;
  hours: number;
  memo?: string;
}