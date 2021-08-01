import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { authLogin, IUserAuthRequest } from "../../api/authApi";
import Button from "../../components/button/Button";
import "./Login.scss";

const Login = () => {
  const [user, setUser] = useState<IUserAuthRequest>({
    email: "",
    password: "",
  });
  const [errorValidate, setErrorValidate] = useState(false);
  const mutation = useMutation(authLogin);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setErrorValidate(true);
    } else {
      setErrorValidate(false);
      // untuk trigger mutationnya
      mutation.mutate(user);
    }
  };

  if (mutation.isSuccess) {
    const { data } = mutation;
    if (data) {
      const bearer = `Bearer ${data.access_token}`;
      localStorage.setItem("bearer", bearer);
    }

    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <h1 className="login-h1"> LOGIN </h1>

      {errorValidate ? (
        <h3 className="error-form">Password & Username Harus diisi</h3>
      ) : (
        <></>
      )}
      <form id="login-form">
        <label className="login-label">Email :</label>
        <input
          className="login-input"
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => handleOnChange(e)}
        />
        <label className="login-label">Password :</label>
        <input
          className="login-input"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleOnChange(e)}
        />
      </form>
      <Button
        title="LOGIN"
        form="login-form"
        type="login"
        onClick={(e) => handleSubmit(e)}
      />
      <Link to="/">
        <Button title="HOME" />
      </Link>
    </div>
  );
};

export default Login;
