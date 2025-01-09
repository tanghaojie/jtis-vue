import path from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import camelcase from 'camelcase'
import { pathComponents, pathSvgs, pathEntry } from './paths'
import clean from './clean'

const PREFIX = 'JtIcon'

function getSvgFiles() {
  return readdirSync(pathSvgs)
}

function vueFilename(filename: string) {
  return `${PREFIX}${filename}.vue`
}

function filenameWithoutExtension(file: string) {
  const filename = path.basename(file, path.extname(file))
  const componentName = `${PREFIX}${camelcase(filename, { pascalCase: true })}`

  return { filename, componentName }
}

function transformToVueComponent(file: string) {
  const full = path.resolve(pathSvgs, file)

  const { filename, componentName } = filenameWithoutExtension(file)

  const content = readFileSync(full, 'utf-8')
  const vueContent = `<template>
${content}
</template>

<script lang="ts">
import type { DefineComponent } from 'vue'
export default {
  name: '${componentName}',
} as DefineComponent
</script>`

  writeFileSync(path.resolve(pathComponents, vueFilename(filename)), vueContent, 'utf-8')
}

function generateInstall(files: string[]) {
  const importList = files
    .map((file) => {
      const { filename, componentName } = filenameWithoutExtension(file)
      return `import ${componentName} from './${vueFilename(filename)}'`
    })
    .join('\n')

  const importContent = [`import type { App } from 'vue'`, importList].join('\n')

  const componentInstall = files
    .map((file) => {
      const { componentName } = filenameWithoutExtension(file)
      return `  app.component(${componentName}.name!, ${componentName})`
    })
    .join('\n')
  const componentInstallContent = [`function install(app: App) {`, componentInstall, `}`].join('\n')

  const exportList = files
    .map((file, index) => {
      const { componentName } = filenameWithoutExtension(file)
      return `  ${componentName},`
    })
    .join('\n')
  const exportContent = [`export default { install }`, `export {`, exportList, `}`].join('\n')

  const full = [importContent, componentInstallContent, exportContent].join('\n\n')

  writeFileSync(path.resolve(pathComponents, 'index.ts'), full, 'utf-8')
}

function generateEntry() {
  const code = `import icons from './src/components'

export default icons
export * from './src/components'
`
  writeFileSync(pathEntry, code, 'utf-8')
}

clean()

const files = getSvgFiles()
files.forEach((file) => {
  transformToVueComponent(file)
})

generateInstall(files)

generateEntry()
