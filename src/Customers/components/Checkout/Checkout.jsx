
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import { useMediaQuery } from '@mui/material';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment',];

export const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});





  // const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const step = searchParams.get('step')
  console.log(step);
  
  const handleNext = () => {
    let newCompleted = completed;
    setActiveStep((prev) => prev + 1);
    setCompleted(newCompleted)
  };



  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };



  const isSmallScreen = useMediaQuery('(max-width:600px)');



  return (
    <div className="lg:px-16 lg:py-6 px-8  py-3">
      <Box sx={{ width: '100%', p: '16px' }}>

        <Stepper orientation={isSmallScreen ? 'vertical' : 'horizontal'} sx={isSmallScreen ? 'p-10' : ''} activeStep={step}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton className='text-sm' color="inherit" >
                <span className="lg:text-lg text-[12px]">
                  {label}
                </span>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        </Box>
      </Box>

      <div className="">
        {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
      </div>
    </div>

  );
}



