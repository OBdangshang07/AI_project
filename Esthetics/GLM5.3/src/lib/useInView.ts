import { onMounted, ref, type Ref } from 'vue'

/** 进入视口一次后置 true（用于逐字采样出场的触发） */
export function useInView(el: Ref<HTMLElement | null | undefined>, threshold = 0.25) {
  const active = ref(false)
  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') {
      active.value = true
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          active.value = true
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el.value)
  })
  return active
}
