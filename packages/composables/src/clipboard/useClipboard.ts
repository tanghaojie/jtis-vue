import { computed, reactive, ref } from 'vue'

export enum ClipboardPermissionName {
  Read = 'clipboard-read',
  Write = 'clipboard-write',
}

const memoryClipboard = {
  text: '',
}

export function useClipboard(useLegacyFallback: boolean = false) {
  const clipboard = ref('')
  const copied = ref(false)

  const requestClipboardApiPermissionFailed = ref(false)

  const isClipboardApiSupported = computed(function () {
    const clipboardApifullNotSupport = !navigator || !('clipboard' in navigator)
    if (clipboardApifullNotSupport) {
      return false
    }

    return (
      !requestClipboardApiPermissionFailed.value &&
      !!navigator.clipboard.readText &&
      !!navigator.clipboard.writeText
    )

    // return {
    //   readTextSupported: !!navigator.clipboard.readText,
    //   writeTextSupported: !!navigator.clipboard.writeText,
    // }
  })

  const isSupported = computed(function () {
    return isClipboardApiSupported.value || useLegacyFallback
  })

  const rwPermission = reactive({
    read: false,
    write: false,
  })

  async function readFromClipboard() {
    return await navigator.clipboard.readText()
  }

  function readFromLegacyClipboard() {
    const ta = document.createElement('textarea')
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    ta.focus()
    document.execCommand('paste')
    const val = ta.value
    ta.remove()

    return val
  }

  async function writeToClipboard(val: string) {
    try {
      await navigator.clipboard.writeText(val)
    } catch (e) {}
  }

  function writeToLegacyClipboard(val: string) {
    const ta = document.createElement('textarea')
    ta.value = val ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }

  function writeToMemoryClipboard(val: string) {
    memoryClipboard.text = val
  }

  function requestClipboardApiPermission() {
    const readPermissionOpt = {
      name: ClipboardPermissionName.Read as unknown as PermissionName,
      allowWithoutGesture: false,
    }
    const writePermissionOpt = {
      name: ClipboardPermissionName.Write as unknown as PermissionName,
      allowWithoutGesture: false,
    }

    const systemPermissions = navigator.permissions

    systemPermissions
      .query(writePermissionOpt)
      .then((result) => {
        rwPermission.write = result.state === 'granted'
        result.onchange = function () {
          rwPermission.write = result.state === 'granted'
        }
      })
      .catch((e) => {
        requestClipboardApiPermissionFailed.value = true
      })

    systemPermissions
      .query(readPermissionOpt)
      .then((result) => {
        rwPermission.read = result.state === 'granted'
        result.onchange = async function () {
          rwPermission.read = result.state === 'granted'
          if (rwPermission.read) {
            await read()
          }
        }
      })
      .catch((e) => {
        requestClipboardApiPermissionFailed.value = true
      })
  }

  async function read() {
    try {
      if (isClipboardApiSupported.value) {
        clipboard.value = await readFromClipboard()
      } else {
        clipboard.value = readFromLegacyClipboard()
      }

      if (!clipboard.value) {
        clipboard.value = memoryClipboard.text
      }

      return clipboard.value
    } catch {}
  }

  async function copy(val: string): Promise<boolean> {
    copied.value = false

    if (!isSupported.value || !val) {
      return false
    }

    writeToMemoryClipboard(val)

    if (isClipboardApiSupported.value) {
      await writeToClipboard(val)
    } else {
      writeToLegacyClipboard(val)
    }

    clipboard.value = val
    copied.value = true

    return true
  }

  if (isSupported.value) {
    if (isClipboardApiSupported.value) {
      requestClipboardApiPermission()
    }

    read()
  }

  return { isSupported, copy, copied, clipboard, rwPermission, read }
}
