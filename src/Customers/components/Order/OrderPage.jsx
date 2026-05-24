import { Grid} from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../../State/order/Action'

const OrderPage = () => {
    const dispatch=useDispatch()
    const {auth}=useSelector((state)=>state.auth)
    const userId=(auth?.user?._id);
const orders=useSelector((state)=>state.order)

console.log("orders",orders?.orders?.flat());
const orderData=orders?.orders?.flat()

    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(getOrderHistory(userId))
    },[userId,dispatch])
        const handleOrderDetails=()=>{
            navigate(`/account/order/${5}`)
        }
    

    const orderStatus = [
        { label: 'On The Way ', value: 'on_the_way' },
        { label: 'Delivered ', value: 'delivered' },
        { label: 'Cancelled', value: 'Cancelled' },
        { label: 'Returned ', value: 'returned' },


    ]
    return (
        <div className="px-4 lg:px-10 mb-6">
            <Grid container sx={{ justifyContent: 'space-between' }} mt={3}>
                <Grid item xs={12} lg={2.5} sm={12} >
                    <div className='space-y-5 sticky top-5 shadow-xl p-6 rounded-md   '>
                        <h1 className=' font-bold '>Filter</h1>
                        <div className=" space-y-2">
                            <h1 className='opacity-90 font-bold'>ORDER STATUS</h1>
                            <div className="">
                                {orderStatus.map((item) =>
                                    <div className="space-x-3 space-y-1 flex items-center">
                                        <input type='checkbox' className='h-4 w-4 focus:ring-indigo-500 text-indigo-500 border-gray-300' defaultValue={item.value} />
                                        <label htmlFor={item.label} className='opacity-60'>{item.label}</label>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </Grid>
                <Grid item lg={9}>
                    <div onClick={handleOrderDetails} className='space-y-5 mt-3 lg:m-0'>
                        {orderData?.map(item => <OrderCard />)}
                    </div>
                </Grid>
            </Grid>


        </div>
    )
}

export default OrderPage