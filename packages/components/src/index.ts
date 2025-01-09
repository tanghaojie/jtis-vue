export * from './utils'
import { App } from 'vue'
import { JtAutoHeightWrapper } from './auto-height-wrapper'
import { JtWordCloudTunnel } from './word-cloud-tunnel'

const components = [JtAutoHeightWrapper, JtWordCloudTunnel]

const install = function (vue: App) {
  components.forEach((component) => {
    if (component.name) {
      vue.component(component.name, component)
    }
  })
}

//@ts-ignore
typeof window !== 'undefined' && window.Vue && install(window.Vue)

export default { install }

export { JtAutoHeightWrapper, JtWordCloudTunnel }
