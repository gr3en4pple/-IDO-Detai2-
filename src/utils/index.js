import { format } from 'date-fns/format'

export function formatNumber(
  number,
  decimalScale = 0,
  thousandSeparator = true
) {
  if (!number) {
    return ''
  }
  if (thousandSeparator) {
    const parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (parts[1]) {
      parts[1] = parts[1].substring(0, decimalScale)
    }
    if (decimalScale === 0) return parts[0]
    return parts.join('.')
  } else {
    return numberToString(number, decimalScale)
  }
}

export function numberToString(
  number,
  decimalScale = 8,
  cutPaddingDecimalsZero = true
) {
  if (!number) {
    return ''
  }
  let result = Number(number).toFixed(decimalScale)
  if (decimalScale > 0 && cutPaddingDecimalsZero) {
    return result.replace(/\.?0+$/, '')
  } else {
    return result
  }
}

function formatTime(value, f = 'yyyy-MM-dd HH:mm') {
  try {
    if (value) {
      const date = value instanceof Date ? value : new Date(value)
      return format(date, f)
    }
  } catch (error) {
    console.error(error)
    return value
  }
}
const saveFile = (url, name) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

const createBlob = (str) => {
  const string = typeof str === 'object' ? JSON.stringify(str) : str
  if (string === null) return ''
  const blob = new Blob([string], {
    type: 'application/octet-stream'
  })
  return window.URL.createObjectURL(blob)
}

const renderAddress = (addr) => `${addr.slice(0, 4)}...${addr.slice(-4)}`
const renderTxHash = (txHash) => `${txHash.slice(0, 8)}...${txHash.slice(-8)}`
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { saveFile, createBlob, renderAddress, sleep, renderTxHash, formatTime }
