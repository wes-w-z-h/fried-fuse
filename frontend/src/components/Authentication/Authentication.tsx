import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";
import axios, { AxiosResponse } from "axios";
import User from "../../types/User";
import AppState from "../../types/AppState";

type AuthenticationProps = {
  handleSuccessfulLogin: (data: User) => void;
  handleSuccessfulLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const Authentication: React.FC<AuthenticationProps> = ({
  handleSuccessfulLogin,
  handleSuccessfulLogout,
  setAppState,
}) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    username: "",
    password: "",
    authenticationErrors: "",
  });

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
          console.log(user_data);
          handleSuccessfulLogin(user_data);
        }
      })
      .catch((resp) => console.log(resp));
  };

  // for testing
  let username: string = formInfo.username;
  var URL: string;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value }: { name: string; value: string } = event.target;

    // remove this after testing
    username = name === "username" ? value : username;
    console.log(username);
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Username"
          value={formInfo.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (optional)"
          value={formInfo.password}
          onChange={handleChange}
          required={false}
        />

        <button type="submit">submit</button>
      </form>

      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          handleSuccessfulLogout(setAppState);
        }}
      >
        logout
      </button>

      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          axios
            .get("http://localhost:3001/users/logged_in", {
              withCredentials: true,
            })
            .then((resp: AxiosResponse) => {
              console.log(resp);
            });
        }}
      >
        STATUS
      </button>

      {/* TEMP BTN TO REMOVE TEST USER REGISTRATIONS */}
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          URL = "http://localhost:3001/users/" + username;
          axios
            .delete(URL)
            .then((resp) => console.log(resp))
            .catch((resp) => console.log(resp));
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Authentication;
