import { Button, Card, CardContent, TextField } from "@mui/material";
import { Fragment, SetStateAction } from "react";

type AddPostCardProps = {
  cardOpen: boolean;
  postContent: string;
  setPostContent: React.Dispatch<SetStateAction<string>>;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddPostCard: React.FC<AddPostCardProps> = ({
  cardOpen,
  postContent,
  setCardOpen,
  setPostContent,
}) => {
  return (
    <Fragment>
      {cardOpen && (
        <Card
          onClick={() => {}}
          // fixed the position to be just above the Button to add post
          sx={{
            position: "fixed",
            bottom: 81,
            right: 17,
            width: "70vw",
            backgroundColor: "aliceblue",
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
              sx={{ marginBottom: 1.5, backgroundColor: "white" }}
            />
            <Button
              onClick={() => {}}
              variant="contained"
              sx={{
                marginRight: 1,
              }}
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
    </Fragment>
  );
};

export default AddPostCard;
