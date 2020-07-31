import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";

import {UserContext} from "../contexts/UserContextProvider";

export function AuthenticatedRoute({component: Component, ...rest}) {
  const {user} = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.data ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        )
      }
    />
  );
}

export default AuthenticatedRoute;
