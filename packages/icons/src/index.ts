import { App } from 'vue'
import { JtIcon } from './icon'
import Icons from './icons'

function install(vue: App) {
  vue.component(JtIcon.name!, JtIcon)
  Icons.install(vue)
}

//@ts-ignore
typeof window !== 'undefined' && window.Vue && install(window.Vue)

export default { install }

export { JtIcon }
export * from './icons'
