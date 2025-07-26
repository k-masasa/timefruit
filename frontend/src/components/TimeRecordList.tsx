import React from 'react';
import type { TimeRecord } from '../types/TimeRecord';
import { TimeRecordService } from '../services/timeRecordService';

interface TimeRecordListProps {
  records: TimeRecord[];
  onRecordDeleted: () => void;
}

const TimeRecordList: React.FC<TimeRecordListProps> = ({ records, onRecordDeleted }) => {
  const handleDelete = async (id: number) => {
    if (!window.confirm('この記録を削除しますか？')) {
      return;
    }

    try {
      await TimeRecordService.deleteTimeRecord(id);
      onRecordDeleted();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('記録の削除に失敗しました。');
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalHours = () => {
    return records.reduce((total, record) => total + parseFloat(record.hours.toString()), 0);
  };

  if (records.length === 0) {
    return (
      <div className="time-record-list">
        <h3>今日の記録</h3>
        <p className="empty-message">まだ記録がありません。時間を記録してみましょう！</p>
      </div>
    );
  }

  return (
    <div className="time-record-list">
      <h3>今日の記録</h3>
      <div className="total-hours">
        合計: {getTotalHours()}時間
      </div>
      
      <div className="records">
        {records.map((record) => (
          <div key={record.id} className="record-item">
            <div className="record-header">
              <span className="category">{record.category}</span>
              <span className="hours">{record.hours}時間</span>
              <span className="time">{formatTime(record.created_at)}</span>
            </div>
            
            {record.memo && (
              <div className="memo">
                {record.memo}
              </div>
            )}
            
            <button
              onClick={() => handleDelete(record.id)}
              className="delete-button"
              title="削除"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeRecordList;