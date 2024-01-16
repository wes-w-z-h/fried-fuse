import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CategoryObj from "../../types/CategoryObj";
import CategoryCard from "./Category";
import { Grid, Paper } from "@mui/material";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryObj[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((resp) => {
        setCategories(resp.data.data);
        // console.log("level up: ", resp.data.included[0]);
        console.log("included: ", resp.data.included);
      })
      .catch((errors) => {
        console.log("errors: ", errors);
      });
  }, [categories.length]);

  const list = categories.map((item) => {
    // map the category component
    return (
      <CategoryCard
        title={item.attributes.name}
        description={item.attributes.description}
        img_url={item.attributes.img_url}
        key={item.attributes.name}
      />
    );
  });
  // console.log("data: ", categories[0]);
  return (
    <Paper
      elevation={24}
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 3,
        flexDirection: "row",
        width: "100vw",
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        overflow: "auto",
      }}
    >
      <Grid container sx={{ overflow: "auto", margin: "auto" }}>
        {list.map((item, index) => (
          <Grid item key={index} margin={"auto"} marginBottom={2}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Categories;
