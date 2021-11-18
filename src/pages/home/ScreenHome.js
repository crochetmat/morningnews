import React, { useState } from "react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function ScreenHome() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="Login-page">
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignUp setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
}

export default ScreenHome;
