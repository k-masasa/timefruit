-- Create time_records table
CREATE TABLE time_records (
  id SERIAL PRIMARY KEY,
  category VARCHAR(20) NOT NULL,
  hours DECIMAL(3,1) NOT NULL,
  memo TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_time_records_date ON time_records(date);
CREATE INDEX idx_time_records_category ON time_records(category);