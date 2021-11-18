import React, { useState } from "react";
import { Input, Button, Alert } from "antd";

function Form(props) {
  const {
    initialValues,
    form,
    onSubmit,
    error,
    rules,
    buttonTxt,
    linkTxt,
    setIsSignIn,
  } = props;

  const [data, setData] = useState(initialValues);
  const [fieldsError, setFieldsError] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name) {
      setData({ ...data, [e.target.name]: e.target.value });
      validInput(e.target.name, e.target.value);
    }
  };

  const validInput = (inputName, inputValue) => {
    if (rules[inputName]) {
      if (rules[inputName].required && !inputValue) {
        setFieldsError({
          ...fieldsError,
          [inputName]: "Ce champ est obligatoire !",
        });
      } else {
        let fieldsErrorTmp = { ...fieldsError };
        delete fieldsErrorTmp[inputName];
        setFieldsError(fieldsErrorTmp);
      }
    }
  };

  const handleSubmit = async () => {
    onSubmit(data);
  };

  const isFormValid = () => {
    if (Object.keys(fieldsError).length > 0) {
      return false;
    }

    return true;
  };

  return (
    <div style={{ flexDirection: "column" }}>
      {error.hasError && (
        <Alert
          message={error.message}
          description={error.description}
          type="error"
          showIcon
          closable
          style={{ width: 280, justifyContent: "center", margin: 40 }}
          onClose={(e) => {
            error.setHasError(false);
          }}
        />
      )}
      <div className="Sign">
        {form.data.map((input) => {
          if (input.type === "password") {
            return (
              <div key={input.name}>
                <Input.Password
                  onChange={handleInputChange}
                  onBlur={() => validInput(input.name, data[input.name])}
                  name={input.name}
                  value={data[input.name]}
                  className={input.className}
                  placeholder={input.placeholder}
                  style={fieldsError[input.name] ? { borderColor: "red" } : {}}
                />
                {fieldsError[input.name] && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {fieldsError[input.name]}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={input.name}>
              <Input
                onChange={handleInputChange}
                onBlur={() => validInput(input.name, data[input.name])}
                name={input.name}
                value={data[input.name]}
                className={input.className}
                placeholder={input.placeholder}
                style={fieldsError[input.name] ? { borderColor: "red" } : {}}
              />
              {fieldsError[input.name] && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {fieldsError[input.name]}
                </div>
              )}
            </div>
          );
        })}

        <Button
          onClick={() => handleSubmit()}
          style={{ width: "80px", marginTop: 15 }}
          type="primary"
          disabled={!isFormValid()}
        >
          {buttonTxt}
        </Button>
        <span onClick={() => setIsSignIn()}>{linkTxt}</span>
      </div>
    </div>
  );
}

export default Form;
