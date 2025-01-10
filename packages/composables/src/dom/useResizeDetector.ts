import { ref, onMounted, onBeforeUnmount } from 'vue'
import { addListener, removeListener, ResizeCallback } from 'resize-detector'

export function useResizeDetector<E extends HTMLElement = HTMLElement>(cb: ResizeCallback<E>) {
  const el = ref<E | null>()

  onMounted(function () {
    el.value && addListener(el.value, cb)
  })

  onBeforeUnmount(function () {
    el.value && removeListener(el.value, cb)
  })

  return { el }
}
