export const convertData = data => {
  if (!data) return ''
  if (typeof data !== 'string') data = String(data)
  return data.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
}