<template>
  <div class="app">
    <header class="app-header">
      <h1>🍎 Timefruit</h1>
      <p>時間投資記録アプリ</p>
    </header>

    <main class="app-main">
      <div class="container">
        <div class="form-section">
          <TimeRecordForm :on-record-created="fetchTodaysRecords" />
        </div>

        <div class="list-section">
          <div v-if="loading" class="loading">
            記録を読み込み中...
          </div>
          
          <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <button @click="fetchTodaysRecords">再試行</button>
          </div>
          
          <TimeRecordList
            v-else
            :records="todaysRecords"
            :on-record-deleted="fetchTodaysRecords"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { TimeRecord } from './types/TimeRecord'
import { TimeRecordService } from './services/timeRecordService'

const todaysRecords = ref<TimeRecord[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchTodaysRecords = async () => {
  try {
    loading.value = true
    const response = await TimeRecordService.getTodaysTimeRecords()
    
    if (response.success && response.data) {
      todaysRecords.value = response.data
    } else {
      error.value = 'Failed to fetch today\'s records'
    }
  } catch (err) {
    error.value = 'Failed to connect to server'
    console.error('Error fetching records:', err)
  } finally {
    loading.value = false
  }
}

// Fetch records on mount
onMounted(() => {
  fetchTodaysRecords()
})
</script>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.app-header p {
  margin: 0.5rem 0 0 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* Form Styles */
.time-record-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: #333;
}

.time-record-form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.875rem;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #fcc;
}

/* List Styles */
.time-record-list {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: #333;
}

.time-record-list h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
}

.total-hours {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.empty-message {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

.records {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.record-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.record-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 600;
}

.hours {
  font-weight: 600;
  color: #333;
}

.time {
  color: #666;
  font-size: 0.875rem;
}

.memo {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  margin: 0.5rem 0;
  border-left: 3px solid #667eea;
  font-style: italic;
  color: #555;
}

.delete-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.delete-button:hover {
  opacity: 1;
}

/* Loading and Error States */
.loading, .error {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.error {
  color: #c33;
}

.error button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  .app-header {
    padding: 1.5rem 1rem;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .time-record-form,
  .time-record-list {
    padding: 1.5rem;
  }
  
  .record-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .delete-button {
    position: static;
    align-self: flex-end;
    margin-top: 0.5rem;
  }
}
</style>
