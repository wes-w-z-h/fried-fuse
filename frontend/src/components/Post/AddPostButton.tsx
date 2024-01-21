import { Tooltip, Typography, Fab } from "@mui/material";
import { SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

type AddPostButtonProps = {
  cardOpen: boolean;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddPostButton: React.FC<AddPostButtonProps> = ({
  cardOpen,
  setCardOpen,
}) => {
  return (
    <Tooltip
      title={
        <Typography fontFamily={"monospace"} fontSize={13}>
          {cardOpen ? "Cancel" : "Add post"}
        </Typography>
      }
      placement="left"
    >
      <Fab
        aria-label="add"
        onClick={() => {
          cardOpen ? setCardOpen(false) : setCardOpen(true);
        }}
        sx={{
          position: "fixed",
          bottom: 19,
          right: 0,
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
