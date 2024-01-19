import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CategoryDataObj } from "../../types/CategoryObj";
import CategoryCard from "./CategoryCard";
import { Grid, Typography } from "@mui/material";

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDataObj[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((resp) => {
        setCategories(resp.data.data);
        // TODO figure out rendering of assosciations
        // console.log("included: ", resp.data.included);
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
      />
    );
  });
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Typography
        variant="h3"
        marginBottom={3}
        fontFamily={"chatter"}
        sx={{ color: "steelblue" }}
      >
        GENERATIONS
      </Typography>
      <Grid
        container
        sx={{
          overflow: "auto",
          // justifyContent: "center",
          marginTop: 3,
          margin: "auto",
        }}
      >
        {list.map((item, index) => (
          <Grid item key={index} margin="auto" marginBottom={2}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CategoriesList;
