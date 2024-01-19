import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicObj from "../../types/TopicObj";
import TopicCard from "./TopicCard";
import { Container, Grid, Typography } from "@mui/material";

// render relavant topics -> GET request to the categories end point
const TopicsList: React.FC = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState<TopicObj[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((resp) => {
        // console.log(resp.data.included);
        setTopics(resp.data.included);
      })
      .catch((error) => console.log(error));
  }, [topics.length, id]);

  const list = topics.map((item) => {
    return (
      <TopicCard
        title={item.attributes.title}
        content={item.attributes.content}
        slug={item.attributes.slug}
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
      <Grid style={{ width: "90vw" }}>{list}</Grid>
    </Container>
  );
};
export default TopicsList;
