import { Request, Response } from 'express';
import { AppDataSource } from '../utils/data-source';
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

    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    
    const newRecord = timeRecordRepository.create({
      category,
      hours,
      memo,
      date: new Date().toISOString().split('T')[0]
    });

    const savedRecord = await timeRecordRepository.save(newRecord);

    res.status(201).json({
      success: true,
      message: 'Time record created successfully',
      data: savedRecord
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
    
    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    
    const records = await timeRecordRepository.find({
      where: { date: today },
      order: { created_at: 'DESC' }
    });

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
    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    
    const records = await timeRecordRepository.find({
      order: { 
        date: 'DESC',
        created_at: 'DESC'
      }
    });

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

    const timeRecordRepository = AppDataSource.getRepository(TimeRecord);
    
    const recordToDelete = await timeRecordRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!recordToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Time record not found'
      });
    }

    await timeRecordRepository.remove(recordToDelete);

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