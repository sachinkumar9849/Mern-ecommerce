export const ITEMS_PER_PAGE = 5;

export function discountedPrice(item) {
  const discountRate = 0.2; 
  const discountedPrice = item.price - item.price * discountRate;
  return discountedPrice;
}
