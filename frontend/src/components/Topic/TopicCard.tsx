import React, { SetStateAction } from "react";
import {
  AlertColor,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import TopicObj from "../../types/TopicObj";
import AppState from "../../types/AppState";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

type TopicCardProps = {
  title: string;
  content: string;
  slug: string;
  id: number;
  setTopics: React.Dispatch<SetStateAction<TopicObj[]>>;
  notice: (message: string, severity: AlertColor) => void;
  appState: AppState;
};

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  content,
  slug,
  setTopics,
  notice,
  appState,
  id,
}) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/topics/${slug}`)
      .then((resp) => {
        // console.log(resp);
        setTopics((prevTopics) =>
          prevTopics.filter((item) => item.attributes.slug !== slug)
        );
        notice("Topic deleted!", "warning");
      })
      .catch((errors) => {
        notice(`Error deleting topic: ${errors.data}`, "error");
      });
  };
  const show: boolean =
    appState.loggedInStatus === "LOGGED_IN" && appState.user.id === id;

  return (
    // this will render inline
    <Grid container justifyContent={"center"}>
      <Card
        sx={{
          display: "flex",
          borderRadius: 7,
          marginBottom: 3,
          width: "100%",
        }}
      >
        <Tooltip
          title={
            <Typography fontFamily={"monospace"} fontSize={13}>
              Go!
            </Typography>
          }
          arrow
          placement="top"
        >
          <CardActionArea
            onClick={() => navigate(`/topics/${slug}`)}
            sx={{ borderRadius: 0 }}
          >
            <CardContent>
              <Typography variant="h5">{title}</Typography>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <Tooltip
          title={
            <Typography fontFamily={"monospace"} fontSize={13}>
              {show ? "Delete" : "Go!"}
            </Typography>
          }
          arrow
          placement="left"
        >
          <CardActionArea
            onClick={() => {
              show ? handleDelete() : navigate(`/topics/${slug}`);
            }}
            sx={{
              minWidth: "8%",
              maxWidth: "8%",
              backgroundColor: show ? "lightsalmon" : "aquamarine",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {show ? <DeleteOutlineIcon /> : <KeyboardDoubleArrowRightIcon />}
            </CardContent>
          </CardActionArea>
        </Tooltip>
      </Card>
    </Grid>
  );
};

export default TopicCard;
