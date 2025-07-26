import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateTimeRecordRequest, Category } from '../types/TimeRecord';
import { TimeRecordService } from '../services/timeRecordService';

interface TimeRecordFormProps {
  onRecordCreated: () => void;
}

const categories: Category[] = ['仕事', '勉強', '運動', '副業', 'その他'];

const TimeRecordForm: React.FC<TimeRecordFormProps> = ({ onRecordCreated }) => {
  const [formData, setFormData] = useState<CreateTimeRecordRequest>({
    category: '仕事',
    hours: 0.5,
    memo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await TimeRecordService.createTimeRecord(formData);
      
      if (response.success) {
        // Reset form
        setFormData({
          category: '仕事',
          hours: 0.5,
          memo: ''
        });
        onRecordCreated();
      } else {
        setError(response.message || 'Failed to create time record');
      }
    } catch (err) {
      setError('Failed to create time record. Please try again.');
      console.error('Error creating time record:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateHourOptions = () => {
    const options = [];
    for (let i = 0.5; i <= 12; i += 0.5) {
      options.push(
        <option key={i} value={i}>
          {i}時間
        </option>
      );
    }
    return options;
  };

  return (
    <div className="time-record-form">
      <h2>時間を記録</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">カテゴリ *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hours">時間 *</label>
          <select
            id="hours"
            value={formData.hours}
            onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
            required
          >
            {generateHourOptions()}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="memo">メモ (任意)</label>
          <textarea
            id="memo"
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            placeholder="今日の活動についてメモを残せます..."
            maxLength={500}
            rows={3}
          />
          <small>{formData.memo?.length || 0}/500文字</small>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? '記録中...' : '記録する'}
        </button>
      </form>
    </div>
  );
};

export default TimeRecordForm;