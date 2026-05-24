import React, { useMemo, useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";

import { useLocation } from "react-router-dom";

import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = [
  "Login",
  "Delivery Address",
  "Order Summary",
  "Payment",
];

export const Checkout = () => {
  const location = useLocation();

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Memoized search params
  const currentStep = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    return Number(searchParams.get("step")) || 0;
  }, [location.search]);

  const [completed, setCompleted] = useState({});

  // Next Step
  const handleNext = useCallback(() => {
    setCompleted((prev) => ({
      ...prev,
      [currentStep]: true,
    }));
  }, [currentStep]);

  // Back Step
  const handleBack = useCallback(() => {
    if (currentStep <= 0) return;
  }, [currentStep]);

  return (
    <div className="lg:px-16 lg:py-6 px-4 sm:px-8 py-3">
      <Box sx={{ width: "100%", p: 2 }}>
        <Stepper
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          activeStep={currentStep}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={Boolean(completed[index])}
            >
              <StepButton color="inherit">
                <span className="lg:text-lg text-xs sm:text-sm">
                  {label}
                </span>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            disabled={currentStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>

      <div>
        {currentStep === 1 ? (
          <DeliveryAddressForm />
        ) : (
          <OrderSummary />
        )}
      </div>
    </div>
  );
};