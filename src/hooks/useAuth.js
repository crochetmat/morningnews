const TOKEN_KEY = "user_token";

export function useAuth() {
  const login = (usermMail) => {
    localStorage.setItem(TOKEN_KEY, usermMail);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const isAuthenticated = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
      return true;
    }

    return false;
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
}
