import React, {createContext, useEffect, useReducer} from "react";

import request from "../services/api";
import * as auth from "../services/auth";

import authReducer from "../reducers/authReducer";
import {VERIFY_AUTH_SUCCESS, VERIFY_AUTH_FAILURE} from "../reducers/types";

export const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const initialState = {
    token: localStorage.getItem("token"),
    data: null,
    isAuthenticated: null,
  };

  const [user, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token") ?? "";
      request.defaults.headers["Authorization"] = `Bearer ${token}`;

      try {
        const {data} = await auth.user(token);

        dispatch({type: VERIFY_AUTH_SUCCESS, payload: data.user});
      } catch {
        dispatch({type: VERIFY_AUTH_FAILURE});
      }
    };

    verifyAuth();
  }, []);

  return (
    <UserContext.Provider value={{user, dispatch}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
