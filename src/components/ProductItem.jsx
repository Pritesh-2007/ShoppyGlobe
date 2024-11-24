import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtocart } from '../utils/CartSlice';
import { useSelector } from 'react-redux';
import { IoIosCart } from "react-icons/io";
import { FaStar } from 'react-icons/fa';

const ProductItem = ({ product }) => {
    const dispatch=useDispatch();
    function handleclick(id)
    {
        console.log("function called",id);
        if (!isAddedToCart) { 
          dispatch(addtocart(product)); 
        }
        console.log("action dispatched..")
    }
    const goods=useSelector((store)=>store.cart.items);
    const isAddedToCart = goods.some((item) => item.id === product.id);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={product.thumbnail} alt="image to dispaly"/>
      <h2 className="text-xl font-bold">{product.title}</h2>
      <div className='flex items-baseline'>
      <h2 className="text-lg font-light">rating:{product.rating}</h2>
      <FaStar className='text-yellow-500 text-lg ml-1'></FaStar>
      </div>
      <p className="text-gray-700">{product.description}</p>
      <div className='flex justify-between'>
      <span className="text-green-700 flex-1">Price: {product.price}</span>
      <span className="text-red-500 flex-1">Discount: {product.discountPercentage}%</span>
      </div>
      <p className={` ${product.shippingInformation.trim().toLowerCase()==='In Stock'.trim().toLowerCase() ? 'text-green-600' : 'text-red-500'}`}>{product.availabilityStatus}</p>
    <div className='flex justify-between'>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => handleclick(product.id)}>Add to Cart</button> */}
      <button className={` flex flex-grow items-center bg-blue-500 text-white px-4 py-2 rounded mt-2 ${isAddedToCart ? 'opacity-20  cursor-not-allowed' : ''}`} 
    disabled={isAddedToCart}  onClick={() => handleclick(product.id)} ><span className="text-3xl ml-2 mr-2"> <IoIosCart /></span>
    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
  </button>    
    <Link to={`/productdetails/${product.id}`} className="flex items-center bg-orange-600 text-white px-4 py-2 rounded mt-2">View Details</Link>
    </div>
    </div>
  );
};

export default ProductItem;
