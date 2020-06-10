export const verifyQtySeats = function(selected, products) {
  let message = '';
  for (let i = 0; i < products.length; i++) {
    if (products[i].qty <= 0) {
      message = `колчество <= 0: ${products[i].name}`;
    } else if (products[i].qty > selected[i].qty) {
      message = `колчество превышено: ${products[i].name}`;
    } else if (products[i].seats <= 0) {
      message = `мест <= 0: ${products[i].name}`;
    } else if (products[i].seats > selected[i].seats) {
      message = `мест превышено: ${products[i].name}`;
    } else if (
      products[i].qty === selected[i].qty &&
      products[i].seats !== selected[i].seats
    ) {
      message = `колчество изменено, мест нет: ${products[i].name}`;
    } else if (
      products[i].seats === selected[i].seats &&
      products[i].qty !== selected[i].qty
    ) {
      message = `мест изменено, колчество нет: ${products[i].name}`;
    }
  }
  return message;
};
