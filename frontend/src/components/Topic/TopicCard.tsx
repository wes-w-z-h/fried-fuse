import React, { SetStateAction } from "react";
import {
  AlertColor,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Tooltip,
  // CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import TopicObj from "../../types/TopicObj";
import AppState from "../../types/AppState";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface TopicCardProps {
  title: string;
  content: string;
  slug: string;
  id: number;
  setTopics: React.Dispatch<SetStateAction<TopicObj[]>>;
  notice: (message: string, severity: AlertColor) => void;
  appState: AppState;
}

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
          prevTopics.filter((item) => item.attributes.slug != slug)
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
    <Grid container justifyContent={"center"}>
      <Card
        sx={{
          display: "flex",
          margin: "auto",
          borderRadius: 7,
          marginBottom: 1.5,
          width: "100%",
        }}
      >
        <Grid item width={"95%"}>
          <CardActionArea onClick={() => navigate(`/topics/${slug}`)}>
            <CardContent>
              <Typography variant="h5">{title}</Typography>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item>
          <CardActionArea>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "left",
                backgroundColor: "lightsalmon",
              }}
            >
              <Tooltip
                title={
                  <Typography fontFamily={"monospace"} fontSize={13}>
                    {show ? "Delete" : "Go!"}
                  </Typography>
                }
                arrow
                placement="left"
              >
                {show ? (
                  <DeleteOutlineIcon
                    onClick={() => handleDelete()}
                    sx={{ padding: 2 }}
                  />
                ) : (
                  <KeyboardDoubleArrowRightIcon
                    onClick={() => navigate(`/topics/${slug}`)}
                    sx={{ padding: 2 }}
                  />
                )}
              </Tooltip>
            </CardContent>
          </CardActionArea>
        </Grid>
      </Card>
    </Grid>
  );
};

export default TopicCard;
