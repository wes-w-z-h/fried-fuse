// Import necessary components and styles from Material-UI
import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface Category {
  id: number;
  title: string;
  description: string;
}

const categories: Category[] = [
  { id: 1, title: "Category 1", description: "Description for Category 1" },
  { id: 2, title: "Category 2", description: "Description for Category 2" },
  { id: 3, title: "Category 3", description: "Description for Category 3" },
];

const CategoryPage: React.FC = () => {
  return (
    <Grid container spacing={3} sx={{ marginTop: 3 }}>
      {categories.map((category) => (
        <Card key={category.title}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {category.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {category.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default CategoryPage;
