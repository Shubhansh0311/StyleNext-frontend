import React, { useEffect } from 'react'
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom'
const ProductCard = ({product}) => {
  
//     
   
 useEffect(()=>{
 },[])
    const navigate=useNavigate()
    return (
        <div onClick={()=>{
            navigate(`/product/${product._id}`)
        }} className="product w-[13em]  cursor-pointer bg-white transition-all m-3">
            <div className="product-card ">
                <img src={product.imageUrl} alt="" className='w-full h-[16em] object-cover object-left-top' />
                <div className="product-card-details py-4 px-1 space-y-1">



                    <div className="product-card-text">
                        <p className=' text-gray-600 opacity-50 font-bold'>{product.brand}</p>
                        <p className='font-semibold text-gray-800'>{product.description}</p>
                    </div>
                    <div className="product-card-price flex items-center space-x-2">
                        <p className='font-semibold'>₹{product.discountedPrice}</p>
                        <p className='line-through font-semibold'>₹{product.price}</p>
                        <p className='text-green-500'>{product.discountedPercent}% Off </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard