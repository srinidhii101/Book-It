import ls, { get } from "local-storage";

export function addToCart(id) {
  if(!ls.get('bookit-cart')) {
    ls('bookit-cart', []);
  }

  let cart = ls.get('bookit-cart');
  cart.push({id});
  ls('bookit-cart', cart);
}


export function getCartList() {
  if(!ls.get('bookit-cart')) {
    ls('bookit-cart', []);
  }
  return ls.get('bookit-cart');
}

export function removeFromCart(index) {
  if(!ls.get('bookit-cart')) {
    ls('bookit-cart', []);
  }
  let cart = ls.get('bookit-cart');
  cart.splice(index, 1);
  ls('bookit-cart', cart);
  return ls.get(cart);
}

export function emptyCart() {
  ls('bookit-cart', []);
}
