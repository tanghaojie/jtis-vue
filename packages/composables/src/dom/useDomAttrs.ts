import { computed } from 'vue'

export function useDomAttrs(attrs: any, defaultClassname?: string) {
  const classObj = computed(() => {
    return attrs.class ? `${defaultClassname || ''} ` + attrs.class : defaultClassname || ''
  })

  const styleObj = computed(() => {
    return attrs.style ? attrs.style : {}
  })

  return {
    classObj,
    styleObj,
  }
}
