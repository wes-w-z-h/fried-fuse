import React from "react";
import { Box, Typography } from "@mui/material";
import TopicsList from "../components/Topic/TopicsList";

const TopicsView: React.FC = () => {
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
      <TopicsList />
    </Box>
  );
};

export default TopicsView;
