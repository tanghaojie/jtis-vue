import { unlinkSync } from 'fs'
import { ensureDirSync, emptyDirSync } from 'fs-extra'
import { pathComponents, pathEntry } from './paths'

function clean() {
  ensureDirSync(pathComponents)
  emptyDirSync(pathComponents)
  try {
    unlinkSync(pathEntry)
  } catch {}
}

clean()

export default clean
