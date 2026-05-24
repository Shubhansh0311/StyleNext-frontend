import { Box, Modal } from "@mui/material";

import React from "react";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const AuthModal = ({ openAuthModal, handleClose }) => {
  const location = useLocation();

  const style = {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: window.innerWidth >= 380 ? "350px" : "320px",
    bgcolor: "background.paper",
    borderRadius: "10px",
    // boxShadow: 24,
    p: 2,
  };
  return (
    <div className="">
      {/* <Button onClick={open}>Open modal</Button> */}
      <Modal
        open={openAuthModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? <LoginForm /> :
          location.pathname === "/register"?
          <RegisterForm />:
          "/"}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
