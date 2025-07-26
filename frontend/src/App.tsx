import React, { useState, useEffect } from 'react';
import TimeRecordForm from './components/TimeRecordForm';
import TimeRecordList from './components/TimeRecordList';
import type { TimeRecord } from './types/TimeRecord';
import { TimeRecordService } from './services/timeRecordService';
import './App.css';

const App: React.FC = () => {
  const [todaysRecords, setTodaysRecords] = useState<TimeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodaysRecords = async () => {
    try {
      setLoading(true);
      const response = await TimeRecordService.getTodaysTimeRecords();
      
      if (response.success && response.data) {
        setTodaysRecords(response.data);
      } else {
        setError('Failed to fetch today\'s records');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysRecords();
  }, []);

  const handleRecordCreated = () => {
    fetchTodaysRecords();
  };

  const handleRecordDeleted = () => {
    fetchTodaysRecords();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍎 Timefruit</h1>
        <p>時間投資記録アプリ</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <TimeRecordForm onRecordCreated={handleRecordCreated} />
          </div>

          <div className="list-section">
            {loading ? (
              <div className="loading">記録を読み込み中...</div>
            ) : error ? (
              <div className="error">
                <p>{error}</p>
                <button onClick={fetchTodaysRecords}>再試行</button>
              </div>
            ) : (
              <TimeRecordList 
                records={todaysRecords} 
                onRecordDeleted={handleRecordDeleted} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
