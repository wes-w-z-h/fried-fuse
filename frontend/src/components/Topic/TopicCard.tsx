import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  // CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
  title: string;
  content: string;
  slug: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, content, slug }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        margin: "auto",
        marginBottom: 1.5,
        borderRadius: 7,
      }}
    >
      {/* add onClick action to direct to the posts related same as how topics rendered */}
      <CardActionArea onClick={() => navigate(`/topics/${slug}`)}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography color="text.secondary">{content}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TopicCard;
