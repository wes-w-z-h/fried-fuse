import React from "react";
import { Box } from "@mui/material";
import PostsList from "../components/Post/PostsList";

const PostsView: React.FC = () => {
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
      <PostsList />
    </Box>
  );
};

export default PostsView;
