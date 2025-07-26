import express from 'express';
import {
  createTimeRecord,
  getTodaysTimeRecords,
  getAllTimeRecords,
  deleteTimeRecord
} from '../controllers/timeRecordController';

const router = express.Router();

// GET /api/time-records/today - Get today's time records
router.get('/today', getTodaysTimeRecords);

// GET /api/time-records - Get all time records
router.get('/', getAllTimeRecords);

// POST /api/time-records - Create a new time record
router.post('/', createTimeRecord);

// DELETE /api/time-records/:id - Delete a time record
router.delete('/:id', deleteTimeRecord);

export default router;