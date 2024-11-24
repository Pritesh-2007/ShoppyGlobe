import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { FaTag } from 'react-icons/fa';
import { IoIosCart } from "react-icons/io";
import { FaStar, FaRegStar, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addtocart } from '../utils/CartSlice';
const ProductDetail = () => {
  const { id } = useParams();
  const [products,setproducts] = useState(null)
  let data="";
    useEffect(()=>{
        async function productbyid()
        {
         data = await fetch(`https://dummyjson.com/products/${id}`).then((data)=>data.json());
         console.log(data)
         setproducts(data);
         return data;
        }
        productbyid();
    },[id]);
    const cartItems = useSelector((state) => state.cart.items);
    if (!products) 
        { 
            return <Loader />; 
         
        }
        const isAddedToCart = cartItems.some((item) => item.id === products.id);
        const dispatch=useDispatch();
        function handleclick(id)
        {
            console.log("function called",id);
            if (!isAddedToCart) { 
              dispatch(addtocart(products)); 
            }
            console.log("action dispatched..")
        }
        const renderStars = () => {
            const stars = [];
            for (let i = 0; i < 5; i++) {
              stars.push(i < products.rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-yellow-500" />);
            }
            return stars;
          };
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row mt-10">
      <div className='flex flex-1 flex-col' >
      <div className='md:flex-col flex'>
      {
            products.images.map((url)=>{
            return(<img src={url} alt={url}></img>)
        })
      }
      </div>
     
      <button className={` flex  items-center bg-blue-500 text-white px-4 py-2 rounded mt-2 ${isAddedToCart ? 'opacity-20  cursor-not-allowed' : ''}`} 
    disabled={isAddedToCart}  onClick={() => handleclick(products.id)} ><span className="text-3xl ml-2 mr-2"> <IoIosCart /></span>
    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
  </button>     
      <Link to='/checkout' className="bg-green-500 text-white px-4 py-2 mt-10 rounded ">Checkout</Link>
         
      </div>
      <div className='flex-1'>
      <h1 className="text-3xl font-bold md:text-orange-500">{products.title}</h1>
      <h2 className="text-xl mt-4 font-light text-gray-500">{products.description}</h2>
      <p className="flex items-center">
     <span className="text-yellow-400 ml-2 mr-2"><FaStar/>
     </span> {products.rating}</p>
      <div className='flex mt-5'>
        {
            products.tags.map((tag)=>{
                return(
                    <p className="flex items-center">
                         <span className="text-red-500 ml-2 mr-2"><FaTag /></span> {tag}
                     </p>
                )
            })
        }
      </div>
      <img className="md:mx-40"  src={products.thumbnail} alt='product images'/>
      <div className='md:flex  '>
      <p className='flex-1 text-center text-pink-700 font-semibold'>Brand: {products.brand}</p>
      <p className='flex-1  text-violet-500 font-semibold'>category: {products.category}</p>
      </div>
      <p className='mt-14'>Estimated Delivery Time:<span className='text-blue-500'>  {products.shippingInformation}</span> </p>
      <p className='mt-4'> Return Policy: <span className='text-blue-500'>{products.returnPolicy}</span></p>
      <div className='flex justify-evenly items-baseline'>
      <p className='font-bold text-2xl'>{(products.price-(products.price*products.discountPercentage)/100).toFixed(2)}$</p>
      <p className='font-extralight line-through text-2xl'>{products.price}$</p>
      <p className='font-semibold text-lg'>{products.discountPercentage}% discount</p>
                      
      <button className={` flex flex-grow items-center bg-blue-500 text-white px-4 py-2 rounded mt-2 ${isAddedToCart ? 'opacity-20  cursor-not-allowed' : ''}`} 
    disabled={isAddedToCart}  onClick={() => handleclick(products.id)} ><span className="text-3xl ml-2 mr-2"> <IoIosCart /></span>
    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
  </button>
      </div>

      <table className="table-auto w-full border-collapse border mt-9 min-w-max items-center border-gray-300 max-w-full">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Dimension</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Depth</td>
            <td className="border border-gray-300 px-4 py-2">{products.dimensions.depth}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Height</td>
            <td className="border border-gray-300 px-4 py-2">{products.dimensions.height}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Width</td>
            <td className="border border-gray-300 px-4 py-2">{products.dimensions.width}</td>
          </tr>
        </tbody>
      </table>
      <div className='md:flex items-center justify-evenly mt-10 mb-9'>
        <p>CreatedAt{products.meta.createdAt}</p>
        <img src={products.meta.qrCode} alt ="scan Qr code"/>
        <p>UpdatedAt{products.meta.updatedAt}</p>
      </div>
      {
        products.reviews.map((review)=>{
            return(
                <div className="bg-white p-6 rounded-lg shadow-md mb-5">
      <div className="flex items-center mb-2">
        <FaUserCircle className="text-gray-500 text-2xl mr-2" />
        <span className="font-bold">{review.reviewerName}</span>
      </div>
      <div className="flex items-center mb-2">
        {renderStars()}
      </div>
      <p className="text-gray-600 mb-2">{review.reviewerEmail}</p>

      <p className="text-gray-600 mb-2">{review.comment}</p>
      <div className="flex items-center text-gray-500 text-sm">
        <FaCalendarAlt className="mr-1" />
        <span>{review.date}</span>
        </div>
        </div>
            )
        })
      }
      
      </div>
    </div>
  );
};

export default ProductDetail;
