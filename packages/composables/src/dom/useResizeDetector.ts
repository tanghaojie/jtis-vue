import { ref, onMounted, onBeforeUnmount } from 'vue'
import { addListener, removeListener, ResizeCallback } from 'resize-detector'

export function useResizeDetector(cb: ResizeCallback<HTMLElement>) {
  const el = ref<HTMLElement | null>()

  onMounted(function () {
    el.value && addListener(el.value, cb)
  })

  onBeforeUnmount(function () {
    el.value && removeListener(el.value, cb)
  })

  return { el }
}
