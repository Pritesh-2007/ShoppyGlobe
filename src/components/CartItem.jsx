import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removefromcart } from '../utils/CartSlice';
const CartItem = ({gid}) => {
  console.log("proid",gid);
  const goods=useSelector((store)=>store.cart.items);
  const productarray=goods.filter((x)=>(x.id===gid));
  const product=productarray[0];
  console.log(product)
  const dispatch=useDispatch();
  function removeitem(id)
  {
    dispatch(removefromcart(id));
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4">
    <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded mr-4" />
    <div className="flex-1">
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
      {product.discountPercentage && (
        <p className="text-red-500">Discount: {product.discountPercentage}%</p>
      )}
      <p className=" text-yellow-500">{product.shippingInformation}</p>
        <div className='flex items-center flex-1 '>
          <p>Brand:<span className='ml-1 text-orange-500'>{product.category}</span></p>
          <p className='ml-5'> Category:<span className='ml-2 text-orange-500'>{product.brand}</span></p>
        </div>
    </div>
    
    <div className="flex flex-col items-center">
      <Link to={`/productdetails/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">View Details</Link>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-2" onClick={()=>{
        removeitem(product.id)
      }}>Remove</button>

    </div>
  </div>
  );
};

export default CartItem;
