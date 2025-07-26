<template>
  <div class="time-record-list">
    <h3>今日の記録</h3>
    
    <div v-if="records.length === 0" class="empty-message">
      まだ記録がありません。時間を記録してみましょう！
    </div>
    
    <template v-else>
      <div class="total-hours">
        合計: {{ totalHours }}時間
      </div>
      
      <div class="records">
        <div
          v-for="record in records"
          :key="record.id"
          class="record-item"
        >
          <div class="record-header">
            <span class="category">{{ record.category }}</span>
            <span class="hours">{{ record.hours }}時間</span>
            <span class="time">{{ formatTime(record.created_at) }}</span>
          </div>
          
          <div v-if="record.memo" class="memo">
            {{ record.memo }}
          </div>
          
          <button
            @click="handleDelete(record.id)"
            class="delete-button"
            title="削除"
          >
            削除
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { TimeRecord } from '../types/TimeRecord'
import { TimeRecordService } from '../services/timeRecordService'

interface Props {
  records: TimeRecord[]
  onRecordDeleted?: () => void
}

const props = defineProps<Props>()

const handleDelete = async (id: number) => {
  if (!confirm('この記録を削除しますか？')) {
    return
  }

  try {
    await TimeRecordService.deleteTimeRecord(id)
    props.onRecordDeleted?.()
  } catch (error) {
    console.error('Error deleting record:', error)
    alert('記録の削除に失敗しました。')
  }
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const totalHours = computed(() => {
  return props.records.reduce((total, record) => total + parseFloat(record.hours.toString()), 0)
})
</script>