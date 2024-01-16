import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { CategoryDataObj, CategoryIncludeObj } from "../../types/CategoryObj";
import CategoryCard from "./CategoryCard";
import { Grid } from "@mui/material";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDataObj[]>([]);
  const [assosciations, setAssosciations] = useState<CategoryIncludeObj[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((resp) => {
        setCategories(resp.data.data);
        // TODO figure out rendering of assosciations
        setAssosciations(resp.data.included);
        // console.log("level up: ", resp.data.included[0]);
        // console.log("included: ", resp.data.included);
      })
      .catch((errors) => {
        console.log("errors: ", errors);
      });
  }, [categories.length, assosciations.length]);

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
  // console.log("data: ", categories[0]);
  return (
    <Grid container sx={{ overflow: "auto", margin: "auto", marginTop: 1 }}>
      {list.map((item, index) => (
        <Grid item key={index} margin={"auto"} marginBottom={2}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
