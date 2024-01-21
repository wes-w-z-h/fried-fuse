import React, { useState } from "react";
import { Fab, Grid, Tooltip, Typography } from "@mui/material";
import PostsList from "../components/Post/PostsList";
import AppState from "../types/AppState";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AddPostCard from "../components/Post/AddPostCard";
import AddPostButton from "../components/Post/AddPostButton";

type PostViewProps = {
  appState: AppState;
};

// TODO: handle submit and check sign in before can add almost done with basic functionality
const PostsView: React.FC<PostViewProps> = ({ appState }) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const handleAdd = () => {};
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
      <Grid item xs={8} md={8} lg={8} sx={{ zIndex: -1 }}>
        <PostsList appState={appState} />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={1}>
        <AddPostCard
          cardOpen={cardOpen}
          postContent={postContent}
          setCardOpen={setCardOpen}
          setPostContent={setPostContent}
        />
        <AddPostButton cardOpen={cardOpen} setCardOpen={setCardOpen} />
      </Grid>
    </Grid>
  );
};

export default PostsView;
