export const shortenAddress = (str: any) => {
  return str.substring(0, 4) + '...' + str.substring(str.length - 3)
}

export const validateAddress = (input: string) => {
  const prefix = input.slice(0, 2)
  if (input.length === 42 && prefix === '0x') {
    return true
  }
  return false
}
