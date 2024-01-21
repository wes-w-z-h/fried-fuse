import React, {
  SetStateAction,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
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
import NoticeObj from "../../types/NoticeObj";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type PostItemProps = {
  post: PostObj;
  appState: AppState;
  handleUpdate: (update: PostObj) => void;
  setPosts: React.Dispatch<SetStateAction<PostObj[]>>;
  notice: NoticeObj;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  handleUpdate,
  appState,
  setPosts,
  notice,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(post.attributes.content);
  const cardRef = useRef<HTMLDivElement | null>(null);

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
        notice.setNoticeMessage("Post updated successfully!");
        notice.setNoticeSeverity("success");
        notice.setOpenNotice(true);
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
        notice.setNoticeMessage("Post deleted successfully!");
        notice.setNoticeSeverity("warning");
        notice.setOpenNotice(true);
      })
      .catch((error) => console.log(error));
  };
  const speedDialActions = [
    { icon: <EditIcon />, name: "Edit", onClick: handleEdit },
    { icon: <DeleteIcon />, name: "Delete", onClick: handleDelete },
  ];
  // close the editing automatically if user clicks outside of card
  useEffect(() => {
    const handleClickOut: EventListener = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setEditing(false);
      }
    };
    document.addEventListener("click", handleClickOut);

    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      sx={{
        display: "flex",
        marginBottom: 1.5,
        borderRadius: 7,
        textAlign: "left",
      }}
    >
      <Grid container>
        <CardContent sx={{ maxWidth: "75%" }}>
          {/* set the cols to be max size for all screens */}
          <Typography color="text.secondary">
            {post.attributes.user_id}
          </Typography>
          {editing ? (
            // Display the text field when editing
            <Fragment>
              <TextField
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                fullWidth
                multiline
              />
              <Button
                onClick={handleSave}
                variant="outlined"
                sx={{ margin: 1 }}
              >
                Update
              </Button>
              <Button
                onClick={() => setEditing(false)}
                variant="outlined"
                color="warning"
              >
                Cancel
              </Button>
            </Fragment>
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
        </CardContent>
        <CardContent
          sx={{
            marginLeft: "auto",
            minWidth: "20%",
          }}
        >
          {appState.loggedInStatus === "LOGGED_IN" &&
            appState.user.id === parseInt(post.attributes.user_id) && (
              <SpeedDial
                ariaLabel="SpeedDial"
                icon={<MoreVertIcon />}
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
                direction="left"
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
        </CardContent>
      </Grid>
    </Card>
  );
};

export default PostItem;
