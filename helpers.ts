export const shortenAddress = (str: any) => {
  return str.substring(0, 4) + '...' + str.substring(str.length - 4)
}

export const shortenDescription = (str: any) => {
  if (str.length < 180) {
    return str
  } else {
    return str.substring(0, 150) + '.....'
  }
}

export const validateAddress = (input: string) => {
  const prefix = input.slice(0, 2)
  if (input.length === 42 && prefix === '0x') {
    return true
  }
  return false
}
