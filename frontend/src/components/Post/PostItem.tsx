import React, { SetStateAction, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import AppState from "../../types/AppState";

type PostItemProps = {
  post: PostObj;
  appState: AppState;
  handleUpdate: (update: PostObj) => void;
  setPosts: React.Dispatch<SetStateAction<PostObj[]>>;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  handleUpdate,
  appState,
  setPosts,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(post.attributes.content);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    axios
      .patch(`http://localhost:3001/posts/${post.id}`, {
        post: { content: update },
      })
      .then((resp) => {
        console.log(resp.data);
        handleUpdate({
          ...post,
          attributes: { ...post.attributes, content: update },
        });
        setEditing(false);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/posts/${post.id}`)
      .then((resp) => {
        console.log(resp);
        setPosts((prevPosts) =>
          prevPosts.filter((prevPost) => prevPost.id !== post.id)
        );
      })
      .catch((error) => console.log(error));
  };

  const speedDialActions = [
    { icon: <EditIcon />, name: "Edit", onClick: handleEdit },
    { icon: <DeleteIcon />, name: "Delete", onClick: handleDelete },
  ];

  return (
    <Card
      sx={{
        marginBottom: 1.5,
        borderRadius: 7,
      }}
    >
      <CardContent>
        <Grid container>
          {/* set the cols to be max size for all screens */}
          <Grid item xs={10} md={10} lg={10} textAlign="left">
            <Typography color="text.secondary">
              {post.attributes.user_id}
            </Typography>
            {editing ? (
              // Display the text field when editing
              <>
                <TextField
                  value={update}
                  onChange={(e) => setUpdate(e.target.value)}
                  fullWidth
                  multiline
                />
                <Button onClick={handleSave} variant="outlined">
                  Update
                </Button>
              </>
            ) : (
              // Display the text when not editing
              <Typography
                variant="body1"
                fontSize={20}
                sx={{ wordWrap: "break-word" }}
              >
                {post.attributes.content}
              </Typography>
            )}
          </Grid>
          <Grid item xs={1} md={1} lg={1}></Grid>
          <Grid item xs={1} md={1} lg={1}>
            {appState.loggedInStatus === "LOGGED_IN" &&
              appState.user.id === parseInt(post.attributes.user_id) && (
                <SpeedDial
                  ariaLabel="SpeedDial"
                  icon={<SpeedDialIcon />}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  open={open}
                  FabProps={{
                    sx: {
                      backgroundColor: "aliceblue",
                      color: "blueviolet",
                      ":hover": {
                        backgroundColor: "blueviolet",
                        color: "aliceblue",
                      },
                    },
                  }}
                >
                  {speedDialActions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={action.onClick}
                    />
                  ))}
                </SpeedDial>
              )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostItem;
