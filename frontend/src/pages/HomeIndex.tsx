import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";

// edit this use soem MUI component instead of div tags
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Pokemon Forum!</h1>
      <p>
        Discuss your favorite Pokemon, share strategies, and connect with other
        trainers.
      </p>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="contained"
        color="primary"
        sx={{ marginRight: 1 }}
      >
        Go to Forum
      </Button>
      <Button
        onClick={() => navigate("/about")}
        variant="contained"
        color="secondary"
      >
        About Us
      </Button>
    </div>
  );
};

export default HomePage;