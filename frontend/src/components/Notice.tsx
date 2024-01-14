import { Snackbar, Alert, AlertColor } from "@mui/material";

import React from "react";

// const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
//   function SnackbarAlert(props, ref) {
//     return <Alert elevation={6} ref={ref} {...props} />;
//   }
// );

type NoticeProps = {
  message: string;
  severity: AlertColor;
  noticeState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const Notice: React.FC<NoticeProps> = ({ message, severity, noticeState }) => {
  // const [open, setOpen] = useState(false);
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
