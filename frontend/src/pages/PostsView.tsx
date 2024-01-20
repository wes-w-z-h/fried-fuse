import React from "react";
import { Box } from "@mui/material";
import PostsList from "../components/Post/PostsList";
import AppState from "../types/AppState";

type PostViewProps = {
  appState: AppState;
};

const PostsView: React.FC<PostViewProps> = ({ appState }) => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 1.5,
        flexDirection: "row",
        overflow: "auto",
      }}
    >
      <PostsList appState={appState} />
    </Box>
  );
};

export default PostsView;
