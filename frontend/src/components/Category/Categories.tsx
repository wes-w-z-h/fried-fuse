import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CategoryObj from "../../types/CategoryObj";
import CategoryCard from "./Category";
import { Box, Grid, Paper } from "@mui/material";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryObj[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((resp: AxiosResponse) => {
        setCategories(resp.data.data);
        // console.log("level up: ", resp.data.included[0]);
      })
      .catch((errors: AxiosError) => {
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
  const first_half = list.slice(0, 4);
  const second_half = list.slice(4, 8);
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
