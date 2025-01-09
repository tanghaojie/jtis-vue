import { computed, CSSProperties } from 'vue'

export function useDomAttrs(attrs: any, defaultClassname?: string) {
  const classObj = computed<string>(() => {
    return attrs.class ? `${defaultClassname || ''} ` + attrs.class : defaultClassname || ''
  })

  const styleObj = computed<CSSProperties>(() => {
    return attrs.style ? attrs.style : {}
  })

  return {
    classObj,
    styleObj,
  }
}
