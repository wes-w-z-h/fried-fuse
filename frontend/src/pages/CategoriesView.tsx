// Import necessary components and styles from Material-UI
import React from "react";
import { Box, Paper } from "@mui/material";
import Categories from "../components/Category/Categories";

const CategoryPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 1.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        borderRadius: 20,
      }}
    >
      <Categories />
    </Box>
  );
};

export default CategoryPage;
