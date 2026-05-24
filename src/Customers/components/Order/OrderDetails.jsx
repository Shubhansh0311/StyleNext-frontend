import React from 'react'
import AddressCard from '../AdressCard/AddressCard'
import { OrderTracker } from './OrderTracker'
import { Button,  Grid } from '@mui/material'
import {  StarOutline } from '@mui/icons-material'

const OrderDetails = () => {
  return (
    <div className='lg:px-16 px-8 mb-4 mt-4 space-y-4 '>
      <div className="space-y-6 border-sm shadow-lg rounded-md p-4">
        <h1 className='text-xl font-bold'>Delivery Address</h1>
        <AddressCard />
      </div>
      <Grid container alignItems='center' justifyContent='center' className='  py-4 px-4'>
        <Grid item xs={12} lg={10} sm={6} >
          <OrderTracker step={3} />


        </Grid>
        <Grid item >

          <div className="">
            <Button sx={{ px: "2.5rem", py: '.7rem', color: '#4f46e5' }} className='font-extrabold' >Cancel Order</Button>
          </div>
        </Grid>
      </Grid>
      {[1, 1, 1, 1].map(() => <Grid container className='rounded-md shadow-lg border  p-4 px-8'>
        <Grid container xs={12} item sx={{ alignItems: 'center', justifyContent: 'space-between' }}>

          <Grid item xs={12} sm={6}>
            <div className="space-x-4 flex">
              <div className="">
                <img className='object-cover object-top h-[5rem] w-[5rem]' src="https://i.ibb.co/jPy4X8B5/cart3.jpg" alt="" />
              </div>
              <div className="space-y-0">
                <p className='text-sm '>A comfortable shirt for casual wear</p>
                <p className='space-x-2 text-sm opacity-50'><span>Size: M</span><span>Color: White</span></p>
                <p className='text-sm'>Seller: Raymond</p>
                <p className='text-sm '>₹1999</p>
              </div>
            </div>

          </Grid>
          <Grid item>
            <div className="flex space-x-2 mt-2">
              <StarOutline sx={{ color: '#a855f7' }} />
              <h1 className='text-purple-500'>Rate & Review Product</h1>
            </div>
          </Grid>
        </Grid>

      </Grid>)}
    </div>
  )
}

export default OrderDetails