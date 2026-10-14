export function getDisplayPrice(basePrice: number, region: string, exchangeRate: number) {
  const isIndia = region === 'IN';
  const symbol = isIndia ? '₹' : '$';
  const amount = isIndia ? basePrice : Math.ceil(basePrice / exchangeRate);

  return {
    symbol,
    amount,
    formatted: `${symbol}${amount}`
  };
}