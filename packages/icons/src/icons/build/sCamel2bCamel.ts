import path from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'fs-extra'
import camelcase from 'camelcase'
import { fileURLToPath } from 'url'

const dir = path.dirname(fileURLToPath(import.meta.url))

const pathRoot = path.resolve(dir, '..')

const inFolder = path.resolve(pathRoot, 'src/tmp')
const outFolder = path.resolve(pathRoot, 'src/out')

function getSvgFiles() {
  return readdirSync(inFolder)
}

function transformToBigCamelcase(file: string) {
  const full = path.resolve(inFolder, file)

  const filename = path.basename(file, path.extname(file))
  const bigCamelFilename = camelcase(filename, { pascalCase: true })

  const content = readFileSync(full, 'utf-8')

  const outFull = path.resolve(outFolder, bigCamelFilename + path.extname(file))

  writeFileSync(outFull, content, 'utf-8')
}

const files = getSvgFiles()

files.map((file) => transformToBigCamelcase(file))
