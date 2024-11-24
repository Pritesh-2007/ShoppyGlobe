import React from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const cartItems = [
  { id: 1, name: 'Product 1', price: 100, quantity: 1 },
  { id: 2, name: 'Product 2', price: 150, quantity: 2 },
];


const Cart = () => {
  const ccount=useSelector((store)=>store.cart.cartcount)
  let isempth=ccount===0
  console.log(isempth)
  const cartgoods=useSelector((store)=>store.cart.items)
  console.log(cartgoods);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
   
      { 
      isempth?<h2 className="text-xl font-bold text-slate-400 mb-4">Your Cart is Empty </h2>
      :
      <div>
      {cartgoods.map((item) => (
        <CartItem key={item.id} gid={item.id} />
      ))} 
      <div className="mt-4">
      <Link to='/checkout' className="bg-green-500 text-white px-4 py-2 rounded">Checkout</Link>
      </div>
      </div>
      }
      
    </div>
  );
};

export default Cart;
