// Import necessary components and styles from Material-UI
import React from "react";
import { Box, Typography } from "@mui/material";
import CategoriesList from "../components/Category/CategoriesList";

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
      <CategoriesList />
    </Box>
  );
};

export default CategoryPage;
