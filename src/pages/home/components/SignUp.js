import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";

function SignUp(props) {
  const { setIsSignIn } = props;

  let history = useHistory();

  const [hasError, setHasError] = useState(false);

  const initialValues = {
    username: "",
    mail: "",
    password: "",
  };

  const form = {
    data: [
      {
        type: "input",
        name: "username",
        className: "Login-input",
        placeholder: "Username",
      },
      {
        type: "input",
        name: "mail",
        className: "Login-input",
        placeholder: "Email",
      },
      {
        type: "password",
        name: "password",
        className: "Login-input",
        placeholder: "Password",
      },
    ],
  };

  const rules = {
    username: {
      required: true,
    },
    mail: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  const error = {
    hasError: hasError,
    setHasError: setHasError,
    message: "Signin Failed",
    description: "Incorrect mail or password",
  };

  const handleSubmitSignUp = async (data) => {
    const response = await fetch("/sign-up/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${data.username}&emailFromFront=${data.mail}&passwordFromFront=${data.password}`,
    });
    const responseApi = await response.json();
    if (responseApi.result) {
      history.push("/source");
    } else {
      setHasError(true);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      onSubmit={handleSubmitSignUp}
      error={error}
      rules={rules}
      buttonTxt="Sign-up"
      linkTxt="J'ai un compte"
      setIsSignIn={() => setIsSignIn(true)}
    />
  );
}

export default SignUp;
