// Source: https://gist.github.com/jcxplorer/823878
export function uuid() {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

export function asc(a, b) {
  if (a < b) return -1
  if (b < a) return 1
  return 0
}

export function desc(a, b) {
  return - asc(a, b)
}

export function readFromLocalStorage(key, defaultValue) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

  function reviver(key, value) {
    if (typeof value === 'string' && dateFormat.test(value)) {
      return new Date(value)
    }

    return value
  }
  
  const value = localStorage.getItem(key)

  if (!value) return defaultValue

  try {
    return JSON.parse(value, reviver)
  } catch (e) {
    localStorage.removeItem(key)
  }

  return defaultValue
}