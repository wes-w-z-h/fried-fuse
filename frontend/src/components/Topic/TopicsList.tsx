import axios from "axios";
import { SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicObj from "../../types/TopicObj";
import TopicCard from "./TopicCard";
import { AlertColor, Container, Grid, Typography } from "@mui/material";
import AppState from "../../types/AppState";

type TopicsListProps = {
  topics: TopicObj[];
  setTopics: React.Dispatch<SetStateAction<TopicObj[]>>;
  notice: (message: string, severity: AlertColor) => void;
  appState: AppState;
};

// render relavant topics -> GET request to the categories end point
const TopicsList: React.FC<TopicsListProps> = ({
  topics,
  setTopics,
  notice,
  appState,
}) => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((resp) => {
        setTopics(resp.data.included);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, [topics.length, id]);

  const list = topics.map((item) => {
    return (
      <TopicCard
        key={item.attributes.slug}
        title={item.attributes.title}
        content={item.attributes.content}
        id={item.attributes.user_id}
        appState={appState}
        slug={item.attributes.slug}
        setTopics={setTopics}
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
        {id} threads
      </Typography>
      <Grid sx={{ width: "90vw" }}>{list}</Grid>
    </Container>
  );
};
export default TopicsList;
