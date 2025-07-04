import { Toaster, toast } from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { CheckCircle, CircleX, Info, LoaderCircle } from 'lucide-react'

export function Copy({content, toCopy, onCopy: onCopyCallback }) {
  function onCopy() {
    notify(`Copied to clipboard`, 'success', { duration: 1000 })
    onCopyCallback?.()
  }

  return (
    <CopyToClipboard text={toCopy || content} onCopy={onCopy}>
      <div className="cursor-pointer">{content}</div>
    </CopyToClipboard>
  )
}

export function parseError(error) {
  const templates = [
    /(The total cost (.+?) exceeds the balance of the account)/,
    /(Execution reverted for an unknown reason)/,
    /(The contract function (.+?) reverted)/,
    /(User rejected the request)/,
    /following reason:\n(.*?)\n/s,
    /(RPC Error)/,
    /(RPC error)/,
    /(Invalid parameters were provided to the RPC method)/,
  ]

  let msg
  if (error) {
    console.log(error)
    msg = error.message
    
    console.log(msg)

    templates.some((template) => {
      const matches = msg.match(template)

      if (matches && matches[1]) {
        msg = matches[1].trim()
        return true
      }
    })
  }

  return msg
}

export function notify(content, typ, params = {}) {
  const defaultParams = {
      error: {
          duration: 5000,
          icon: <CircleX className="text-red-500" />,
      },
      success: {
          duration: 2000,
          icon: <CheckCircle className="text-green-500" />,
      },
      info: {
          duration: 4000,
          icon: <Info className="text-blue-500" />,
      },
      loading: {
          icon: <LoaderCircle className="animate-spin" />,
      },
  }[typ] || {}

  if (content) {
    let contentEl = content
    if (typ === 'info' || typ === 'error') {
      const id = Math.random().toString(36)
      params.id = id

      contentEl = (
        <Copy
          content={content}
          onCopy={() => {
            hide(id)
          }}
          toCopy={content}
        />
      )
    }

    return (toast[typ] || toast)(contentEl, { ...defaultParams, ...params })
  }
}

export function hide(id) {
  toast.dismiss(id)
}

export default function Notification({}) {
  const options = {
    position: 'top-center',
    gutter: 8,
  }

  return <Toaster containerStyle={{}} toastOptions={options} />
}