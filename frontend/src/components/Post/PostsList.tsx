import axios from "axios";
import { SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import PostItem from "./PostItem";
import AppState from "../../types/AppState";
import NoticeObj from "../../types/NoticeObj";

type PostsListProps = {
  appState: AppState;
  posts: PostObj[];
  setPosts: React.Dispatch<SetStateAction<PostObj[]>>;
  notice: NoticeObj;
};

// render relavant topics -> GET request to the categories end point
const PostsList: React.FC<PostsListProps> = ({
  appState,
  posts,
  setPosts,
  notice,
}) => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/topics/${id}`)
      .then((resp) => {
        // console.log(resp.data.included);
        setPosts(resp.data.included);
      })
      .catch((error) => console.log(error));
  }, [posts.length, setPosts, id]);

  const handleUpdatePost = (update: PostObj) => {
    setPosts((prevPosts: PostObj[]) =>
      prevPosts.map((item) => (item.id === update.id ? update : item))
    );
  };

  const list = posts.map((item) => {
    return (
      <PostItem
        key={item.id}
        post={item}
        handleUpdate={handleUpdatePost}
        appState={appState}
        setPosts={setPosts}
        notice={notice}
      />
    );
  });
  const ordered = list.slice().reverse(); // see how
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
      <Grid style={{ width: "90vw" }}>{ordered}</Grid>
    </Container>
  );
};
export default PostsList;
