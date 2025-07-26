import { Request, Response } from 'express';
import pool from '../utils/database';
import { TimeRecord, CreateTimeRecordRequest } from '../models/TimeRecord';
import { createTimeRecordSchema } from '../utils/validation';

export const createTimeRecord = async (req: Request, res: Response) => {
  try {
    const { error, value } = createTimeRecordSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { category, hours, memo }: CreateTimeRecordRequest = value;

    const [result] = await pool.execute(
      'INSERT INTO time_records (category, hours, memo) VALUES (?, ?, ?)',
      [category, hours, memo || null]
    );

    const insertResult = result as any;
    const insertId = insertResult.insertId;

    const [selectResult] = await pool.execute(
      'SELECT * FROM time_records WHERE id = ?',
      [insertId]
    );

    const newRecord: TimeRecord = (selectResult as any[])[0];

    res.status(201).json({
      success: true,
      message: 'Time record created successfully',
      data: newRecord
    });
  } catch (error) {
    console.error('Error creating time record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getTodaysTimeRecords = async (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [result] = await pool.execute(
      'SELECT * FROM time_records WHERE date = ? ORDER BY created_at DESC',
      [today]
    );

    const records: TimeRecord[] = result as TimeRecord[];

    res.json({
      success: true,
      message: 'Today\'s records retrieved successfully',
      data: records
    });
  } catch (error) {
    console.error('Error fetching today\'s records:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAllTimeRecords = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.execute(
      'SELECT * FROM time_records ORDER BY date DESC, created_at DESC'
    );

    const records: TimeRecord[] = result as TimeRecord[];

    res.json({
      success: true,
      message: 'All records retrieved successfully',
      data: records
    });
  } catch (error) {
    console.error('Error fetching all records:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteTimeRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [selectResult] = await pool.execute(
      'SELECT * FROM time_records WHERE id = ?',
      [id]
    );

    if ((selectResult as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Time record not found'
      });
    }

    const recordToDelete = (selectResult as any[])[0];

    await pool.execute(
      'DELETE FROM time_records WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Time record deleted successfully',
      data: recordToDelete
    });
  } catch (error) {
    console.error('Error deleting time record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};