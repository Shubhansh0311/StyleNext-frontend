import React, { useEffect } from "react";
import Cart from "./Cart";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../State/Cart/Action";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const CartPage = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const user = useSelector((state) => state.auth.user);
// console.log(cart);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("effecting ");

    dispatch(getCartItem());
  }, [user, dispatch]);
  
  // console.log(cart?.cart.cartItems); // Uncommenting this line to log cart items

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  return (
    <div className="lg:grid lg:px-14 pb-8 mt-4 relative lg:grid-cols-3 space-x-1">
      <div className="col-span-2 pb-6">
        <div className="space-y-4">
          {cart?.cartItems.map((items, index) => (
            <Cart key={index} item={items} />
          ))}
        </div>
      </div>
      <div className="col-span-1  sticky top-0 px-5 lg:h-[100vh] lg:mt-0">
        <div className="border shadow-lg rounded-md  p-5">
        <div className="flex justify-between">
        <p className="font-semibold opacity-50 uppercase"> Price Details</p>
          <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
  <ShoppingCartIcon color="action" />
  
</Badge>
        </div>
          <hr className="my-2" />
          <div className="space-y-3 font-semibold pb-5">
            <div className="flex justify-between ">
              <span>Price</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-500">-₹{cart.cart?.discounts}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-500">free</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span>Total </span>
              <span className="text-green-500">₹{cart.cart?.totalDiscountedPrice}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            variant="contained"
            className="w-full"
            sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#4f46e5" }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
