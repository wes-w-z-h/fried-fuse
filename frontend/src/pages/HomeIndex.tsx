import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import React from "react";

// edit this use soem MUI component instead of div tags
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography
        variant="h3"
        paddingTop={3}
        paddingBottom={3}
        fontFamily={"chatter"}
        sx={{ color: "steelblue" }}
      >
        Welcome to the Pokemon Forum!
      </Typography>
      <Typography
        variant="body1"
        fontFamily={"monospace"}
        fontSize={20}
        fontWeight={"bold"}
        paddingBottom={3}
      >
        Discuss your favorite Pokemon, share strategies, and connect with other
        trainers!
      </Typography>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="contained"
        color="primary"
        sx={{ marginRight: 1 }}
      >
        <Typography variant="button">Go to Forum</Typography>
      </Button>
      <Button
        onClick={() => navigate("/about")}
        variant="contained"
        color="secondary"
      >
        <Typography variant="button">About Us</Typography>
      </Button>
    </div>
  );
};

export default HomePage;
