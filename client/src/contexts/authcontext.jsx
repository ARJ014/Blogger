import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (inputs) => {
    setcurrentUser(inputs);
  };

  const logout = async () => {
    const root = "http://localhost:8800/api/";
    const res = await axios.post(
      `${root}auth/logout`,
      {},
      { withCredentials: true }
    );
    // console.log(res);
    setcurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
