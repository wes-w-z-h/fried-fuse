import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";
import axios, { AxiosError, AxiosResponse } from "axios";
import User from "../../types/User";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Send, Visibility, VisibilityOff } from "@mui/icons-material";

type AuthenticationProps = {
  handleSuccessfulLogin: (data: User) => void;
};

const Authentication: React.FC<AuthenticationProps> = ({
  handleSuccessfulLogin,
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
      .then((resp: AxiosResponse) => {
        if (resp.data.logged_in) {
          // pass user data
          const user_data: User = resp.data.user;
          console.log(user_data);
          setFormInfo((prev: FormInfo) => ({
            ...prev,
            authenticationStatus: "success",
          }));
          handleSuccessfulLogin(user_data);
        }
      })
      .catch((error: AxiosError) => {
        console.log("errors:", error);
        setFormInfo((prev: FormInfo) => ({
          ...prev,
          authenticationStatus: error.response
            ? error.response.statusText + ": check password"
            : "",
        }));
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
    <Grid container justifyContent="center" alignItems="center">
      <form
        onSubmit={handleSubmit}
        style={{ width: "60%", alignItems: "center" }}
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
              !!formInfo.authenticationStatus &&
              formInfo.authenticationStatus !== "success"
            }
            helperText={formInfo.authenticationStatus}
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
        <Button type="submit" variant="outlined" endIcon={<Send />}>
          submit
        </Button>
      </form>
    </Grid>
  );
};

export default Authentication;
