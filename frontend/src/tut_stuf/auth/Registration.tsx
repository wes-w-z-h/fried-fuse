import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";
import axios from "axios";
import { StringifyOptions } from "querystring";

const Registration: React.FC = () => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    username: "",
    password: "",
    registrationErrors: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            username: formInfo.username,
            password: formInfo.password,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((resp) => console.log(resp));
  };

  // for testing
  var username: string;
  var URL: string;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value }: { name: string; value: string } =
      event.currentTarget;

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
          URL = "http://localhost:3001/registrations/" + username;
          axios
            .delete(URL)
            .then((resp) => console.log(resp))
            .catch((resp) => console.log(resp));
          return;
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Registration;
