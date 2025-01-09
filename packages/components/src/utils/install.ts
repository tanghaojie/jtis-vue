import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends Component>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = (app: App): void => {
    app.component((comp as any).name, comp)
  }

  return comp as SFCWithInstall<T>
}
