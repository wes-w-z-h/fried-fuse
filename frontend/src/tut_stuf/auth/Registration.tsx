import React from "react";
import { useState } from "react";
import FormInfo from "../../types/FormInfo";

const Registration: React.FC = () => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    username: "",
    password: "",
    registrationErrors: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    console.log(formInfo as FormInfo); // dont need to do this ts will infer based on above
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value }: { name: string; value: string } =
      event.currentTarget;
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
    </div>
  );
};

export default Registration;
