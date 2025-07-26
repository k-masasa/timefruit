<template>
  <div class="time-record-form">
    <h2>時間を記録</h2>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="category">カテゴリ *</label>
        <select
          id="category"
          v-model="formData.category"
          required
        >
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="hours">時間 *</label>
        <select
          id="hours"
          v-model="formData.hours"
          required
        >
          <option
            v-for="hours in hourOptions"
            :key="hours"
            :value="hours"
          >
            {{ hours }}時間
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="memo">メモ (任意)</label>
        <textarea
          id="memo"
          v-model="formData.memo"
          placeholder="今日の活動についてメモを残せます..."
          maxlength="500"
          rows="3"
        />
        <small>{{ memoLength }}/500文字</small>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="submit-button"
      >
        {{ isSubmitting ? '記録中...' : '記録する' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CreateTimeRecordRequest, Category } from '../types/TimeRecord'
import { TimeRecordService } from '../services/timeRecordService'

interface Props {
  onRecordCreated?: () => void
}

const props = defineProps<Props>()

const categories: Category[] = ['仕事', '勉強', '運動', '副業', 'その他']

const formData = ref<CreateTimeRecordRequest>({
  category: '仕事',
  hours: 0.5,
  memo: ''
})

const isSubmitting = ref(false)
const error = ref<string | null>(null)

const hourOptions = computed(() => {
  const options = []
  for (let i = 0.5; i <= 12; i += 0.5) {
    options.push(i)
  }
  return options
})

const memoLength = computed(() => {
  return formData.value.memo?.length || 0
})

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = null

  try {
    const response = await TimeRecordService.createTimeRecord(formData.value)
    
    if (response.success) {
      // Reset form
      formData.value = {
        category: '仕事',
        hours: 0.5,
        memo: ''
      }
      props.onRecordCreated?.()
    } else {
      error.value = response.message || 'Failed to create time record'
    }
  } catch (err) {
    error.value = 'Failed to create time record. Please try again.'
    console.error('Error creating time record:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>