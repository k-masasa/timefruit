import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from './utils/data-source';
import timeRecordsRouter from './routes/timeRecords';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // 開発環境ではCSPを無効化
  crossOriginResourcePolicy: false // CORSとの競合を避ける
}));
app.use(cors({
  origin: function (origin, callback) {
    // 開発環境では全オリジンを許可
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // 本番環境では特定のオリジンのみ許可
      const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// Initialize TypeORM and start server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ TypeORM Data Source has been initialized!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Timefruit Backend API server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ Error during Data Source initialization:', error);
    process.exit(1);
  });