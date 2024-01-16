// Import necessary components and styles from Material-UI
import React from "react";
import { Paper } from "@mui/material";
import Categories from "../components/Category/Categories";

const CategoryPage: React.FC = () => {
  return (
    <Paper
      elevation={24}
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 1.5,
        flexDirection: "row",
        width: "97vw",
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        overflow: "auto",
        borderRadius: 20,
      }}
    >
      <Categories />
    </Paper>
  );
};

export default CategoryPage;
