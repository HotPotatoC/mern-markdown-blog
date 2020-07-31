import React, {createContext, useState, useEffect} from "react";

import request from "../services/api";
import * as auth from "../services/auth";

export const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState({
    token: undefined,
    data: undefined,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token") ?? "";
      request.defaults.headers["Authorization"] = `Bearer ${token}`;

      try {
        const {data} = await auth.user(token);

        setUser({
          token,
          data,
        });
      } catch {
        setUser({
          token: undefined,
          data: undefined,
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

export default UserContextProvider;
