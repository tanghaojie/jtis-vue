import { off, on } from '@jtis/browser'

export function useGlobalEventOnce(
  event: string,
  cb?: (e?: Event) => void,
  globalEl: HTMLElement | Document | Window = document,
  option?: {
    stop?: boolean
    prevent?: boolean
  }
) {
  function registerOnce() {
    on(globalEl, event, onGlobalOnce)
  }

  function onGlobalOnce(e: Event) {
    const { stop = false, prevent = false } = option || {}
    prevent && e.preventDefault()
    stop && e.stopPropagation()

    cb && cb(e)

    off(globalEl, event, onGlobalOnce)
  }

  return {
    registerOnce,
  }
}
