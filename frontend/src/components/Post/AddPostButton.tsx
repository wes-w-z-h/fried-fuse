import { Tooltip, Typography, Fab, AlertColor } from "@mui/material";
import { SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AppState from "../../types/AppState";
import { useNavigate } from "react-router-dom";

type AddPostButtonProps = {
  cardOpen: boolean;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
  appState: AppState;
  notice: (message: string, severity: AlertColor) => void;
};

const AddPostButton: React.FC<AddPostButtonProps> = ({
  cardOpen,
  setCardOpen,
  appState,
  notice,
}) => {
  const handleClick = () => {
    if (appState.loggedInStatus === "LOGGED_IN") {
      cardOpen ? setCardOpen(false) : setCardOpen(true);
    } else {
      navigate("/users/sign_in");
      notice("Sign in to add & edit posts!", "info");
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
              : "Add post"
            : "Sign in to add & edit posts!"}
        </Typography>
      }
      placement="left"
      arrow
    >
      <Fab
        aria-label="add"
        onClick={() => handleClick()}
        sx={{
          position: "fixed",
          bottom: 19,
          right: 3,
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

export default AddPostButton;
