// Import necessary React components and styles

import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation
import { Button } from "@mui/material";
import React from "react";

// Functional component for the Home page
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
        variant="outlined"
        color="secondary"
      >
        About Us
      </Button>
    </div>
  );
};

export default HomePage;
