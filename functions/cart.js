import ls, { get } from "local-storage";

export function addToCart(id) {
  if(!ls.get('bookit-cart')) {
    ls('bookit-cart', []);
  }

  let cart = ls.get('bookit-cart');
  cart.push({id});
  ls('bookit-cart', cart);
}
