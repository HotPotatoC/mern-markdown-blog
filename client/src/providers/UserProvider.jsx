import React, {createContext, useState, useEffect} from "react";

import request from "../services/api";
import * as auth from "../services/auth";

export const UserContext = createContext(null);

export function UserProvider({children}) {
  const [user, setUser] = useState({
    loggedIn: false,
    token: undefined,
    data: undefined,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token") ?? "";
      request.defaults.headers["Authorization"] = `Bearer ${token}`;

      const {data, status} = await auth.user(token);

      if (data && status === 200) {
        setUser({
          loggedIn: true,
          token,
          data,
        });
      }
    };

    verifyAuth();
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
