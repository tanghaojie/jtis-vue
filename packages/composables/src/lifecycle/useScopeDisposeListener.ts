import { getCurrentScope, onScopeDispose } from 'vue'

export function useScopeDisposeListener(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
