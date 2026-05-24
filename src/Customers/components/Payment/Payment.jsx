import React, { useEffect, useMemo } from "react";

import { Alert, AlertTitle, Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useLocation } from "react-router-dom";

import { OrderTracker } from "../Order/OrderTracker";
import AddressCard from "../AdressCard/AddressCard";

import { getOrderById } from "../../State/order/Action";
import { updatePayment } from "../../State/Payment/Action";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { orderId } = useParams();

  const { order } = useSelector((state) => state);

  // Memoized query params
  const paymentDetails = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    return {
      paymentId: searchParams.get("razorpay_payment_id"),
      paymentStatus: searchParams.get(
        "razorpay_payment_link_status"
      ),
    };
  }, [location.search]);

  const { paymentId, paymentStatus } = paymentDetails;

  // Fetch order details
  useEffect(() => {
    if (!orderId) return;

    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  // Update payment status
  useEffect(() => {
    if (!paymentId || !orderId) return;

    dispatch(
      updatePayment({
        orderId,
        paymentId,
      })
    );
  }, [dispatch, orderId, paymentId]);

  // Memoized order items
  const orderItems = useMemo(
    () => order?.orders?.orderItems || [],
    [order]
  );

  const shippingAddress = order?.orders?.shippingAddress;

  return (
    <div className="px-4 lg:px-36 py-8">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity={
            paymentStatus === "paid"
              ? "success"
              : "warning"
          }
          sx={{
            mb: 6,
            width: "fit-content",
          }}
        >
          <AlertTitle>
            {paymentStatus === "paid"
              ? "Payment Success"
              : "Payment Pending"}
          </AlertTitle>

          {paymentStatus === "paid"
            ? "Congratulations! Your order has been placed."
            : "Your payment is currently being processed."}
        </Alert>

        {/* Order Tracker */}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className="py-4 mb-4 px-4"
        >
          <Grid item xs={12} sm={10} md={8} lg={10}>
            <OrderTracker step={1} />
          </Grid>
        </Grid>

        {/* Order Items */}
        <Grid
          container
          spacing={4}
          className="pt-10 w-full"
        >
          {orderItems.map((item) => (
            <Grid
              item
              xs={12}
              key={item._id}
              className="rounded-lg border p-4 shadow-md bg-white"
            >
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                {/* Product Info */}
                <Grid item xs={12} md={6}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <img
                      className="w-full sm:w-32 sm:h-32 object-cover object-top rounded-md"
                      src={item?.product?.imageUrl}
                      alt={item?.product?.title}
                    />

                    <div className="space-y-1">
                      <p className="font-semibold text-lg">
                        {item?.product?.title}
                      </p>

                      <p className="text-sm text-gray-600">
                        Size: {item?.size}
                      </p>

                      <p className="text-sm text-gray-600">
                        Seller: {item?.product?.brand}
                      </p>

                      <p className="text-blue-600 font-bold text-md">
                        ₹ {item?.price}
                      </p>
                    </div>
                  </div>
                </Grid>

                {/* Shipping Address */}
                <Grid item xs={12} md={6}>
                  <AddressCard address={shippingAddress} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PaymentSuccess;