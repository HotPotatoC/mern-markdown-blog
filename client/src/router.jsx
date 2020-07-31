import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import UserContextProvider from "./contexts/UserContextProvider";

import {Home} from "./pages/home";
import {Login, Register} from "./pages/auth";
import {Article, CreateArticle} from "./pages/article";

import AuthenticatedRoute from "./components/AuthenticatedRoute";

export function Router() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <AuthenticatedRoute exact path='/new/' component={CreateArticle} />
          <Route exact path='/:username/article/:slug' component={Article} />
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default Router;
