import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')

export const pathSrc = resolve(pathRoot, 'src')
export const pathComponents = resolve(pathSrc, 'components')
export const pathSvgs = resolve(pathSrc, 'svgs')

export const pathEntry = resolve(pathRoot, 'index.ts')
