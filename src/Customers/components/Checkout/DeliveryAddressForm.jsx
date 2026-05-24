import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import AddressCard from "../AdressCard/AddressCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../State/order/Action";
import { getUser } from "../../State/Auth/Action";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = React.useState(null);
  const [addressError, setAddressError] = React.useState(false);
const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getUser());
  }, [jws]);
  
  const user = useSelector((state) => state);
  const addresses = user?.auth?.user?.address;

  let orderData = {};
  const handleChng = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    orderData = { address: data, navigate };
    dispatch(createOrder(orderData));
  };

  const orderSummary = () => {
    if (!selectedAddressId) {
      setAddressError(true);
      errorRef.current?.scrollIntoView({ behavior: "smooth",top:0 });
      return;
    }
    const selectedAddress = addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    console.log(selectedAddress);
    
    dispatch(createOrder({ address: selectedAddress, navigate }));
  };

  return (
    <div>
      {/* Warning Message at the Top */}
      {addressError && (
        <Box
          ref={errorRef}
          p={2}
          bgcolor={"#f8d7da"}
            color={"#721c24"}
          m={2}
          boxShadow={"0 1px 0px 1px rgba(255, 0, 0, 0.5)"}
          border={1}
          borderRadius={2}
        //   color="error.main"
          fontSize="1rem"
          mb={2}
        >
          Please select an address before proceeding.
        </Box>
      )}

      <Grid container className="lg:space-x-4" alignItems="center">
        <Grid
          xs={12}
          lg={3.5}
          className="rounded-md p-4 border shadow-md h-[30.5rem] overflow-y-scroll"
          item
        >
          <div className="p-0 border-b cursor-pointer">
            {addresses?.slice(0, 3).map((item) => (
              <Box
                key={item._id}
                mb={2}
                p={2}
                border={1}
                borderRadius={2}
                borderColor={
                  selectedAddressId === item._id ? "primary.main" : "grey.300"
                }
                boxShadow={selectedAddressId === item._id ? 3 : 1}
                onClick={() => {
                  setSelectedAddressId(item._id);
                  setAddressError(false); // Clear error if selected
                }}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedAddressId === item._id ? "#f0f4ff" : "white",
                }}
              >
                <AddressCard address={item} />
              </Box>
            ))}
            
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2, bgcolor: "#4f46e5" }}
              onClick={orderSummary}
            >
              Deliver Here
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Box className="shadow-md p-5 lg:mt-0 mt-4 rounded-md border">
            <form onSubmit={handleChng}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    label="First Name"
                    fullWidth
                    inputMode="text"
                    inputProps={{ pattern: "[A-Za-z]+" }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    label="Last Name"
                    inputMode="text"
                    fullWidth
                    inputProps={{ pattern: "[A-Za-z]+" }}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    id="streetAddress"
                    name="streetAddress"
                    autoComplete="street-address"
                    required
                    label="Address"
                    inputMode="text"
                    rows={3}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    label="City"
                    fullWidth
                    inputMode="text"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    required
                    label="State/Province/Region"
                    fullWidth
                    inputMode="text"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="zipcode"
                    name="zipcode"
                    type="number"
                    autoComplete="postal-code"
                    required
                    label="Zip/Postal code"
                    fullWidth
                    inputMode="numeric"
                    inputProps={{ pattern: "[0-9]{5}" }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="mobile"
                    name="mobile"
                    required
                    label="Phone Number"
                    fullWidth
                    inputMode="tel"
                    inputProps={{ pattern: "[0-9]{10}" }}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{ my: 2, bgcolor: "#4f46e5" }}
                  >
                    Deliver here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
