import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import timeRecordsRouter from './routes/timeRecords';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Timefruit Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/time-records', timeRecordsRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Timefruit Backend API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});