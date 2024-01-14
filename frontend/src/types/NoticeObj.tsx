import { AlertColor } from "@mui/material";
import { SetStateAction } from "react";

type NoticeObj = {
  setNoticeMessage: React.Dispatch<SetStateAction<string>>;
  setNoticeSeverity: React.Dispatch<SetStateAction<AlertColor>>;
  setOpenNotice: React.Dispatch<SetStateAction<boolean>>;
};

export default NoticeObj;
