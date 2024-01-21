import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import PostItem from "./PostItem";
import AppState from "../../types/AppState";

type PostsListProps = {
  appState: AppState;
};

// render relavant topics -> GET request to the categories end point
const PostsList: React.FC<PostsListProps> = ({ appState }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState<PostObj[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/topics/${id}`)
      .then((resp) => {
        // console.log(resp.data.included);
        setPosts(resp.data.included);
      })
      .catch((error) => console.log(error));
  }, [posts.length]);

  const handlePostItemUpdate = (update: PostObj) => {
    setPosts((prevPosts: PostObj[]) =>
      prevPosts.map((item) => (item.id === update.id ? update : item))
    );
  };

  const list = posts.map((item) => {
    return (
      <PostItem
        key={item.id}
        post={item}
        handleUpdate={handlePostItemUpdate}
        appState={appState}
        setPosts={setPosts}
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
        {id}
      </Typography>
      <Grid style={{ width: "90vw" }}>{list}</Grid>
    </Container>
  );
};
export default PostsList;
