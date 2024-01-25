import { Snackbar, Alert, AlertColor } from "@mui/material";
import React from "react";

type NoticeProps = {
  message: string;
  severity: AlertColor;
  noticeState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const Notice: React.FC<NoticeProps> = ({ message, severity, noticeState }) => {
  const [open, setOpen] = noticeState;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} elevation={24}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notice;
