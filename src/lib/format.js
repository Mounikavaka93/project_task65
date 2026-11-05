export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountOf(product) {
  if (!product?.compareAt || product.compareAt <= product.price) return 0;
  return Math.round((1 - product.price / product.compareAt) * 100);
}
