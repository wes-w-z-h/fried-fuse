import React, { useState } from "react";
import { AlertColor, Grid } from "@mui/material";
import PostsList from "../components/Post/PostsList";
import AppState from "../types/AppState";
import AddPostCard from "../components/Post/AddPostCard";
import AddPostButton from "../components/Post/AddPostButton";

type PostViewProps = {
  appState: AppState;
  notice: (message: string, severity: AlertColor) => void;
};

// TODO: handle submit and check sign in before can add almost done with basic functionality
const PostsView: React.FC<PostViewProps> = ({ appState, notice }) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<PostObj[]>([]);
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
      <Grid item xs={10} md={10} lg={10}>
        <PostsList
          appState={appState}
          posts={posts}
          setPosts={setPosts}
          notice={notice}
        />
      </Grid>
      {/* <Grid item xs={2}></Grid> */}
      <Grid item xs={4}>
        <AddPostCard
          cardOpen={cardOpen}
          newPostContent={newPostContent}
          setCardOpen={setCardOpen}
          setNewPostContent={setNewPostContent}
          appState={appState}
          setPosts={setPosts}
          notice={notice}
        />
        <AddPostButton
          cardOpen={cardOpen}
          setCardOpen={setCardOpen}
          appState={appState}
          notice={notice}
        />
      </Grid>
    </Grid>
  );
};

export default PostsView;
