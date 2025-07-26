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

    const result = await pool.query(
      'INSERT INTO time_records (category, hours, memo) VALUES ($1, $2, $3) RETURNING *',
      [category, hours, memo || null]
    );

    const newRecord: TimeRecord = result.rows[0];

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
    
    const result = await pool.query(
      'SELECT * FROM time_records WHERE date = $1 ORDER BY created_at DESC',
      [today]
    );

    const records: TimeRecord[] = result.rows;

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
    const result = await pool.query(
      'SELECT * FROM time_records ORDER BY date DESC, created_at DESC'
    );

    const records: TimeRecord[] = result.rows;

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

    const result = await pool.query(
      'DELETE FROM time_records WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Time record not found'
      });
    }

    res.json({
      success: true,
      message: 'Time record deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting time record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};