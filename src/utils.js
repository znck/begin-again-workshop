export function asc(a, b) {
  if (a < b) return -1
  if (b < a) return 1
  return 0
}

export function desc(a, b) {
  return - asc(a, b)
}