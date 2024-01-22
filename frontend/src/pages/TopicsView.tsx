import React, { useState } from "react";
import { AlertColor, Grid } from "@mui/material";
import TopicsList from "../components/Topic/TopicsList";
import AppState from "../types/AppState";
import AddTopicButton from "../components/AddItemButton";
import TopicObj from "../types/TopicObj";
import AddTopicCard from "../components/Topic/AddTopicCard";

type TopicsViewProps = {
  appState: AppState;
  notice: (message: string, severity: AlertColor) => void;
};

const TopicsView: React.FC<TopicsViewProps> = ({ appState, notice }) => {
  const [cardOpen, setCardOpen] = useState(false);
  // only access the attributes when posting
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [topics, setTopics] = useState<TopicObj[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  return (
    <Grid
      container
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 1.5,
        flexDirection: "column",
        overflow: "auto",
        placeItems: "center",
      }}
    >
      <Grid item>
        <TopicsList
          topics={topics}
          setTopics={setTopics}
          notice={notice}
          appState={appState}
        />
      </Grid>
      <Grid item>
        <AddTopicCard
          cardOpen={cardOpen}
          setCardOpen={setCardOpen}
          newTitle={newTitle}
          newContent={newContent}
          setNewTitle={setNewTitle}
          setNewContent={setNewContent}
          appState={appState}
          notice={notice}
          setTopics={setTopics}
        />
        <AddTopicButton
          cardOpen={cardOpen}
          setCardOpen={setCardOpen}
          appState={appState}
          notice={notice}
          message="Sign in to add topics!"
        />
      </Grid>
    </Grid>
  );
};

export default TopicsView;
