import React from 'react';
import { useSelector } from 'react-redux';
const Checkout = () => {
    const { items,grandtotal,nettotal,totoaldiscount } = useSelector((state) => (
        { items: state.cart.items, 
        grandtotal:state.cart.grandtotal,
        nettotal:state.cart.nettotal,
        totoaldiscount:state.cart.totoaldiscount,
        }));
console.log("checkout:",grandtotal,nettotal,totoaldiscount)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Billing Information</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <div className="flex-1">
              <p className="text-lg font-bold">{item.title}</p>
              <p className="text-gray-500">Price: ${item.price}</p>
              <p className="text-gray-500">Discount: {item.discountPercentage}%</p>
              <p className="text-gray-500">Quantity: {1}</p>
            </div>
            <p className="text-lg font-bold">
              Net Price: ${(item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="flex justify-ceter mt-4">
          <h2 className="text-xl font-bold">Net Total:</h2>
          <p className="text-xl font-bold">{nettotal}$</p>
          <h2 className="text-xl font-normal ml-10">Grand Total:</h2>
          <p className="text-xl font-normal">{grandtotal}$</p>
          <h2 className="text-xl font-light ml-10">Total Discount:</h2>
          <p className="text-xl font-light text-red-500 ">{totoaldiscount}%</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
