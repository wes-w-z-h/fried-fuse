import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PostsList from "../components/Post/PostsList";
import AppState from "../types/AppState";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

type PostViewProps = {
  appState: AppState;
};

// TODO: handle submit and check sign in before can add almost done with basic functionality
const PostsView: React.FC<PostViewProps> = ({ appState }) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const handleAdd = () => {};
  return (
    <Grid
      container
      sx={{
        display: "flex",
        margin: "auto",
        marginTop: 1.5,
        flexDirection: "column",
        overflow: "auto",
        placeItems: "center",
      }}
    >
      <Grid item xs={8} md={8} lg={8}>
        <PostsList appState={appState} />
        {cardOpen && (
          <Card
            onClick={() => {}}
            // fixed the position to be just above the Button to add post
            sx={{
              position: "fixed",
              bottom: 81,
              right: 17,
              width: "100vw",
              maxWidth: 779,
            }}
          >
            <CardContent>
              <TextField
                type="text"
                label="Add Post"
                variant="outlined"
                multiline
                fullWidth
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                sx={{ marginBottom: 1.5 }}
              />
              <Button
                onClick={() => {}}
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1 }}
              >
                Add Post
              </Button>
              <Button
                onClick={() => {
                  setCardOpen(false);
                  setPostContent("");
                }}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={1}>
        <Tooltip
          title={
            <Typography fontFamily={"monospace"} fontSize={13}>
              {cardOpen ? "Cancel" : "Add post"}
            </Typography>
          }
          placement="left"
        >
          <Fab
            aria-label="add"
            onClick={() => {
              cardOpen ? setCardOpen(false) : setCardOpen(true);
            }}
            sx={{
              position: "fixed",
              bottom: 19,
              right: 0,
              backgroundColor: "blueviolet",
              transition: "background-color 0.2s ease-in-out",
              ":hover": {
                backgroundColor: "aliceblue",
              },
              "&:hover .MuiSvgIcon-root": {
                color: "blueviolet",
              },
            }}
          >
            {cardOpen ? (
              <ClearIcon
                sx={{
                  color: "aliceblue",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            ) : (
              <AddIcon
                sx={{
                  color: "aliceblue",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            )}
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default PostsView;
