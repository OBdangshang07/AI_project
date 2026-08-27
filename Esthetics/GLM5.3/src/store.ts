import { reactive } from 'vue'

/** 全站共享状态：章节、实时温度、坍缩计数、静止检测、无障碍偏好 */
export const store = reactive({
  section: 'hero' as 'hero' | 'context' | 'temp' | 'collapse' | 'outro',
  liveTemp: 0, // 字云的实时温度（引擎回传）
  tempSlider: 0.5, // §02 的 τ 滑杆
  collapses: 0, // 坍缩次数
  still: false, // 用户静止 3.5s+
  reduced: false, // prefers-reduced-motion
  coarse: false, // 触屏指针
})
