import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Form from "./Form";

function SignIn(props) {
  const { setIsSignIn } = props;

  const history = useHistory();
  const { login } = useAuth();

  const [hasError, setHasError] = useState(false);

  const initialValues = {
    mail: "",
    password: "",
  };

  const form = {
    data: [
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

  const handleSubmitSignIn = async (data) => {
    const response = await fetch("/sign-in/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${data.mail}&passwordFromFront=${data.password}`,
    });

    const responseApi = await response.json();
    if (responseApi.result) {
      login(data.mail);
      history.push("/source");
    } else {
      setHasError(true);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      onSubmit={handleSubmitSignIn}
      error={error}
      rules={rules}
      buttonTxt="Sign-in"
      linkTxt="Créer un compte"
      setIsSignIn={() => setIsSignIn(false)}
    />
  );
}

export default SignIn;
