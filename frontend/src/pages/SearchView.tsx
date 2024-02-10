import axios from "axios";
import { useEffect, useState } from "react";
import TopicObj from "../types/TopicObj";
import TopicCard from "../components/Topic/TopicCard";
import { AlertColor, Container, Grid, Typography } from "@mui/material";
import AppState from "../types/AppState";

type SearchViewProps = {
  notice: (message: string, severity: AlertColor) => void;
  appState: AppState;
};

// adapted from topics list
const SearchView: React.FC<SearchViewProps> = ({ notice, appState }) => {
  const [allTopics, setAllTopics] = useState<TopicObj[]>([]);

  useEffect(() => {
    axios
      .get(`https://poke-app-backend-xe80.onrender.com/categories`)
      .then((resp) => {
        setAllTopics(resp.data.included);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, [allTopics.length]);

  const list = allTopics.map((item) => {
    return (
      <TopicCard
        key={item.attributes.slug}
        title={item.attributes.title}
        content={item.attributes.content}
        id={item.attributes.user_id}
        appState={appState}
        slug={item.attributes.slug}
        setTopics={setAllTopics}
        notice={notice}
      />
    );
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Typography
        variant="h3"
        marginBottom={3}
        fontFamily={"chatter"}
        sx={{ color: "steelblue" }}
      >
        All Threads
      </Typography>
      <Grid sx={{ width: "90vw" }}>{list}</Grid>
    </Container>
  );
};
export default SearchView;
