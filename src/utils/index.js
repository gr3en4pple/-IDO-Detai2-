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

export { saveFile, createBlob, renderAddress, sleep, renderTxHash }
