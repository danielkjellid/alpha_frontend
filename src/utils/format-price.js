export default function formatPrice(value) {
  if (!value) return ''

  value = value.toString()
  return value.replace(/\./g, ',')
}