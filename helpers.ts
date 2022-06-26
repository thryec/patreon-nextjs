export const shortenAddress = (str: any) => {
  return str.substring(0, 5) + "..." + str.substring(str.length - 4);
};
