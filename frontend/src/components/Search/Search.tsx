import {
  styled,
  alpha,
  InputBase,
  IconButton,
  AlertColor,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopicObj from "../../types/TopicObj";

// take from MUI website
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 7,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type SearchComponentProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  notice: (message: string, severity: AlertColor) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchValue,
  setSearchValue,
  notice,
}) => {
  const navigate = useNavigate();
  // limited to exact match no time to implement a string matching algo
  const handleSubmit = () => {
    axios
      .get("http://localhost:3001/categories")
      .then((resp) => {
        // console.log(resp.data.included);
        // console.log(searchValue);
        let success: boolean = false;
        const topicsArr: TopicObj[] = resp.data.included;

        for (let i = 0; i < topicsArr.length; i++) {
          if (topicsArr[i].attributes.title.toLowerCase() === searchValue) {
            success = true;
            navigate(`/topics/${topicsArr[i].attributes.slug}`);
            notice("Redirected to thread!", "success");
          }
        }
        if (!success) {
          notice("Not found!: no matches", "warning");
          navigate("/topics/all");
        }
      })
      .catch((error) => notice(`Error: ${error}`, "error"));
  };

  return (
    <Search>
      <StyledInputBase
        placeholder="Search threads..."
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        onSubmit={() => handleSubmit()}
      />
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        <SearchIcon sx={{ color: "violet" }} />
      </IconButton>
    </Search>
  );
};

export default SearchComponent;
