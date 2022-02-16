// two hours in millis
const BLOG_TIMEOUT = 7200000

// 30 minutes in millis
const YAML_TIMEOUT = 1800000

function setWithExpiry(key, value, timeout) {
  const now = new Date().getTime()
  const item = {
    value: value,
    expiry: now + timeout,
  }
  localStorage.setItem(key, JSON.stringify(item))
  // console.log(item)
}

function getWithExpiry(key) {
  const itemjson = localStorage.getItem(key)

  if (!itemjson) return null

  const item = JSON.parse(itemjson)

  const now = new Date().getTime()

  if (now >= item.expiry) {
    localStorage.removeItem(key)
    return null
  }

  return item.value
}
