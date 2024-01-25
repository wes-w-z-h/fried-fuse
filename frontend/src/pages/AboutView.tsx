import React from "react";
import { Paper, Typography } from "@mui/material";

const AboutView: React.FC = () => {
  return (
    <Paper
      elevation={24}
      sx={{ width: "60vw", margin: "auto", marginTop: 10, padding: 3 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontFamily={"chatter"}
        sx={{ color: "steelblue" }}
      >
        ABOUT US
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Pokemon Forum, where trainers come together to discuss
        everything related to Pokemon! Whether you're a seasoned Pokemon Master
        or just starting your journey, our community is here for you.
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to create a space where trainers from all walks of life
        can share their experiences, strategies, and love for Pokemon. Join us
        in the adventure to become the very best, like no one ever was!
      </Typography>
      <Typography variant="body1">
        Feel free to explore the forum, connect with other trainers, and have a
        great time sharing your passion for Pokemon.
      </Typography>
    </Paper>
  );
};

export default AboutView;
