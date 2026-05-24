import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const OrderTracker = ({ step }) => {
    const steps = ['Placed', 'Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const [completed, setCompleted] = React.useState({});
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box>
            <Stepper orientation={isSmallScreen ? 'vertical' : 'horizontal'} activeStep={step}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton className='text-sm' color="inherit">
                            <span className="lg:text-sm text-[12px]">
                                {label}
                            </span>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
