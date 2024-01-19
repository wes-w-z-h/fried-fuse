// Import necessary components and styles from Material-UI
import React from "react";
import { Box } from "@mui/material";
import CategoriesList from "../components/Category/CategoriesList";

const CategoriesView: React.FC = () => {
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
      }}
    >
      <CategoriesList />
    </Box>
  );
};

export default CategoriesView;
