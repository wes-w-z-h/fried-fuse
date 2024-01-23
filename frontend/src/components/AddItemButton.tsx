import { Tooltip, Typography, Fab, AlertColor } from "@mui/material";
import { SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AppState from "../types/AppState";
import { useNavigate } from "react-router-dom";

type AddItemButtonProps = {
  cardOpen: boolean;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
  appState: AppState;
  notice: (message: string, severity: AlertColor) => void;
  message: string;
};

const AddItemButton: React.FC<AddItemButtonProps> = ({
  cardOpen,
  setCardOpen,
  appState,
  notice,
  message,
}) => {
  const handleClick = () => {
    if (appState.loggedInStatus === "LOGGED_IN") {
      cardOpen ? setCardOpen(false) : setCardOpen(true);
    } else {
      navigate("/users/sign_in");
      notice(message, "info");
    }
  };
  const navigate = useNavigate();
  return (
    <Tooltip
      title={
        <Typography fontFamily={"monospace"} fontSize={13}>
          {appState.loggedInStatus === "LOGGED_IN"
            ? cardOpen
              ? "Cancel"
              : `Add ${message.slice(15)}`
            : message}
        </Typography>
      }
      placement="left"
      arrow
    >
      <Fab
        aria-label="add"
        onClick={() => handleClick()}
        sx={{
          position: "relative",
          margin: 1.5,
          backgroundColor: "blueviolet",
          transition: "background-color 0.2s ease-in-out",
          ":hover": {
            backgroundColor: "aliceblue",
          },
          "&:hover .MuiSvgIcon-root": {
            color: "blueviolet",
          },
        }}
      >
        {cardOpen ? (
          <ClearIcon
            sx={{
              color: "aliceblue",
              transition: "color 0.2s ease-in-out",
            }}
          />
        ) : (
          <AddIcon
            sx={{
              color: "aliceblue",
              transition: "color 0.2s ease-in-out",
            }}
          />
        )}
      </Fab>
    </Tooltip>
  );
};

export default AddItemButton;
