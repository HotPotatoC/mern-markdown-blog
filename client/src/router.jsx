import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import UserProvider from "./providers/UserProvider";

import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Article from "./pages/article/Article";
import CreateArticle from "./pages/article/CreateArticle";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export function Router() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <AuthenticatedRoute exact path='/new/' component={CreateArticle} />
          <Route exact path='/article/:slug' component={Article} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default Router;
