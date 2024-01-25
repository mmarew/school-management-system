import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function ImageViewer({ data }) {
  let { ImgViews, setImgViews } = data;

  const handleClose = () => {
    setImgViews({ Open: false });
  };

  return (
    <>
      <Dialog open={ImgViews.Open} onClose={handleClose} maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={ImgViews.IMG}
            alt="Image"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImageViewer;
