import { Button,IconButton } from '@mui/material'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useDispatch } from 'react-redux';
import { getCartItem, removeCartItem, updateCartItem } from '../../State/Cart/Action';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import { useEffect, useState } from 'react';

const Cart = ({item}) => {

  
    const dispatch=useDispatch()
 
    
    const updateItemQuantity=(value)=>{
   
        console.log(value);
        
        const data={quantity:item?.quantity+value,cartItemId:item?._id}
        console.log('data',data)
        dispatch(updateCartItem(data)).then(()=>{
            dispatch(getCartItem())
        })
        
    }
    const handleRemoveItem=()=>{
        const data={itemId:item?._id}
        console.log('Removing item with ID:', item?._id);
        dispatch(removeCartItem(data)).then(()=>{
            dispatch(getCartItem())
        })
       
    }
    
    return (
        <div className="shadow-lg p-4 border rounded-md ">
            <div className="flex item-center">
                <div className="sm:w-[5rem] sm:h-[5rem]  lg:w-[9rem] lg:h-[9rem] ">
                    <img src={item?.product?.imageUrl} className='w-[140px]  max-h-[150px] object-cover object-top' alt="" />
                </div>
                <div className="ml-5 space-y-1 mt-3">
                    <p className='font-semibold'>{item?.product?.title}</p>
                    <p className='opacity-50 font-semibold'>Size : {item?.size} , {item?.product?.colors}</p>
                    <p className=' opacity-50'>Seller:{item?.product?.brand}</p>
                    <div className="flex space-x-3 mt-2">
                        <p className=' font-semibold '>₹{item?.product?.discountedPrice}</p>
                        <p className='line-through opacity-50'>₹{item?.product?.price}</p>
                        <p className='text-green-500'>{item?.product?.discountedPercent}% off</p>
                    </div>

                </div>
            </div>
            <div className="flex items-center  lg:space-x-10 pt-2">
                <div className="flex items-center">
                    <IconButton 
                    onClick={()=>updateItemQuantity(-1)}
                        sx={{ color: '#7337ab' }}
                        disabled={item?.quantity<=1}>
                    <RemoveCircleIcon/>
                    </IconButton>
                    <span className='px-7 py-1 border rounded-md' >{item?.quantity}</span>
                    <IconButton 
                    onClick={()=>updateItemQuantity(1)} 
                    sx={{ color: '#7337ab' }}>
                        <AddCircleOutlineIcon />
                       
                    </IconButton>
                </div>
                <Button sx={{ color: '#7337ab' }}
                onClick={handleRemoveItem}>
                    Remove
                </Button>
            </div>
        </div>
    )
}

export default Cart