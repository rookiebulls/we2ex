export const obj2Uri = (obj) => {
  if (!obj) return ''
  return Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')
}

export const uri2Obj = (uri) => {
  if (!uri.length) return {}
  return uri.split('&').reduce((acc, item) => {
    const [key, value] = item.split('=')
    acc[key] = decodeURIComponent(value)
    return acc
  }, {})
}

export const decodeObj = (obj) => {
  if (!obj) return {}
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = decodeURIComponent(obj[key])
    return acc
  }, {})
}

export const timeTransfer = (timestamp) => {
  if (timestamp === undefined) return ''
  const diff = Date.now() / 1000 - Number(timestamp)
  if (diff < 0) {
    return '刚刚'
  } else if (diff < 60) {
    return `${Math.floor(diff)} 秒前`
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} 分钟前`
  } else if (diff < 24 * 3600) {
    return `${Math.floor(diff / 3600)} 小时前`
  } else {
    return `${Math.floor(diff / (24 * 3600))} 天前`
  }
}
