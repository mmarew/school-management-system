import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

function SuccessErrorToast({
  successMessage,
  errorMessage,
  randVal,
  setActionMessages,
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // 'error' or 'success'

  const handleOpen = (msg, toastType) => {
    setMessage(msg);
    setType(toastType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Call handleOpen with the success or error message received from props
  useEffect(() => {
    if (successMessage) {
      handleOpen(successMessage, "success");
    } else if (errorMessage) {
      handleOpen(errorMessage, "error");
    }
    setTimeout(() => {
      setActionMessages((prev) => ({ ...prev, Error: null, Success: null }));
    }, 2000);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      // You can customize the appearance based on the type
      // e.g., background color, text color, etc.
      // Here, we use 'type' to add a CSS class to style the Snackbar
      className={type === "error" ? "error-toast" : "success-toast"}
    />
  );
}

export default SuccessErrorToast;
