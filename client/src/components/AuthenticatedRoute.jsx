import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";

import {UserContext} from "../providers/UserProvider";

export function AuthenticatedRoute({component: Component, ...rest}) {
  const {user} = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.data && user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        )
      }
    />
  );
}

export default AuthenticatedRoute;
