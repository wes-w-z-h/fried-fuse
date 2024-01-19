import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  img_url: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  img_url,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 600,
        width: 600,
        borderRadius: 5,
      }}
    >
      <CardActionArea onClick={() => navigate(`/categories/${title}`)}>
        <CardMedia
          component="img"
          height="290"
          width="100"
          src={`${process.env.PUBLIC_URL}/images/${img_url}`}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            image via nintendo
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          {/* a bit faded text */}
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
