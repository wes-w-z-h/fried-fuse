import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";
import axios from "axios";
import User from "../../types/User";

type RegistrationProps = {
  handleSuccessfulAuth: (data: User) => void;
};

const Registration: React.FC<RegistrationProps> = ({
  handleSuccessfulAuth,
}) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    username: "",
    password: "",
    registrationErrors: "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/users/create_user",
        {
          user: {
            username: formInfo.username,
            password: formInfo.password,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.status === "created") {
          // pass user data
          const user_data: User = resp.data.user;
          console.log(user_data);
          handleSuccessfulAuth(user_data);
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
        {/* KIV if want to add password_confirmation quite weird logic */}
        {/* <input
          type="password"
          name="password_confirmation"
          placeholder="Password_Confirmation"
          value={formInfo.password_confirmation}
          onChange={handleChange}
          required={false}
        /> */}
        <button type="submit">submit</button>
      </form>

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

export default Registration;
