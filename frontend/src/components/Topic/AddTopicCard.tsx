import {
  AlertColor,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Fragment, SetStateAction } from "react";
import AppState from "../../types/AppState";
import { useParams } from "react-router-dom";
import TopicObj from "../../types/TopicObj";

type AddTopicCardProps = {
  cardOpen: boolean;
  newTitle: string;
  newContent: string;
  setNewTitle: React.Dispatch<SetStateAction<string>>;
  setNewContent: React.Dispatch<SetStateAction<string>>;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
  appState: AppState;
  setTopics: React.Dispatch<SetStateAction<TopicObj[]>>;
  notice: (message: string, severity: AlertColor) => void;
};

const AddTopicCard: React.FC<AddTopicCardProps> = ({
  cardOpen,
  newTitle,
  newContent,
  setCardOpen,
  setNewTitle,
  setNewContent,
  appState,
  setTopics,
  notice,
}) => {
  const { id } = useParams();

  const handleAddPost = () => {
    axios
      .post("http://localhost:3001/topics", {
        topic: {
          title: newTitle,
          content: newContent,
          category_id: id,
          user_id: appState.user.id,
        },
      })
      .then((resp) => {
        const newTopic: TopicObj = resp.data.data;
        setTopics((prevTopics) => [newTopic, ...prevTopics]);
        notice("Topic posted!", "success");
      })
      .catch((error) => {
        notice(`Error: ${error}`, "error");
      });
    setNewContent("");
    setNewTitle("");
    setCardOpen(false);
  };

  return (
    <Fragment>
      {cardOpen && (
        <Card
          onClick={() => {}}
          // fixed the position to be just above the Button to add topic
          sx={{
            // position: "relative",
            // bottom: 81,
            // right: 17,
            width: "90vw",
            borderRadius: 7,
            backgroundColor: "aliceblue",
            zIndex: 1050, // sweet spot
          }}
        >
          <CardContent>
            <TextField
              type="text"
              label="Topic title"
              variant="outlined"
              multiline
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ marginBottom: 1.5, backgroundColor: "white" }}
            />
            <TextField
              type="text"
              label="Topic content"
              variant="outlined"
              multiline
              fullWidth
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              sx={{ marginBottom: 1.5, backgroundColor: "white" }}
            />
            <Button
              onClick={() => handleAddPost()} // implement submit handler
              variant="contained"
              sx={{ marginRight: 1 }}
            >
              Post Topic
            </Button>
            <Button
              onClick={() => {
                setCardOpen(false);
                setNewContent("");
                setNewTitle("");
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default AddTopicCard;
