import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";
import axios from "axios";
import User from "../../types/User";
import TextField from "@mui/material/TextField";
import { Button, FormControl, IconButton, InputAdornment } from "@mui/material";
import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
import NoticeObj from "../../types/NoticeObj";

type AuthenticationProps = {
  handleSuccessfulLogin: (data: User) => void;
  notice: NoticeObj;
};

const Authentication: React.FC<AuthenticationProps> = ({
  handleSuccessfulLogin,
  notice,
}) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    username: "",
    password: "",
    authenticationStatus: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/users",
        {
          user: {
            username: formInfo.username,
            password: formInfo.password,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.logged_in) {
          // pass user data
          const user_data: User = resp.data.user;
          setFormInfo((prev: FormInfo) => ({
            ...prev,
            authenticationStatus: "success",
          }));
          handleSuccessfulLogin(user_data);
        }
      })
      .catch((error) => {
        console.log("errors:", error);
        setFormInfo((prev: FormInfo) => ({
          ...prev,
          authenticationStatus: error.response
            ? error.response.statusText + ": check password"
            : "error",
        }));
        notice.setNoticeMessage("UNAUTHORIZED: Check Password");
        notice.setNoticeSeverity("error");
        notice.setOpenNotice(true);
      });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value }: { name: string; value: string } = event.target;

    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
      authenticationStatus: "",
    }));
  };

  const handleShowPW = () => {
    setShowPassword((show: boolean) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "70%", alignItems: "center" }}
    >
      <FormControl fullWidth margin="normal">
        <TextField
          type="username"
          name="username"
          value={formInfo.username}
          onChange={handleChange}
          required
          label="Username"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={
            formInfo.authenticationStatus !== "success" &&
            !!formInfo.authenticationStatus
          }
          type={showPassword ? "text" : "password"}
          name="password"
          value={formInfo.password}
          onChange={handleChange}
          required={false}
          label="Password (optional)"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPW}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button fullWidth type="submit" variant="outlined" endIcon={<Send />}>
        Submit
      </Button>
    </form>
  );
};

export default Authentication;
