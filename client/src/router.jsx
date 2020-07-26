import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/auth/Login";

import Article from "./pages/article/Article";
import CreateArticle from "./pages/article/CreateArticle";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/new/' component={CreateArticle} />
        <Route exact path='/article/:slug' component={Article} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
