import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import useMediaQuery from "@mui/material/useMediaQuery";

export const OrderTracker = ({ step = 0 }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Memoized steps
  const steps = useMemo(
    () => [
      "Placed",
      "Order Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        activeStep={Number(step)}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={index < step}
          >
            <StepButton color="inherit">
              <span className="lg:text-sm text-xs">
                {label}
              </span>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};