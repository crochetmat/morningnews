import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/navigation/Nav";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ScreenHome from "./pages/home/ScreenHome";
import ScreenMyArticles from "./pages/ScreenMyArticles";
import ScreenMyArticlesBySource from "./pages/ScreenArticlesBySource";
import ScreenSource from "./pages/ScreenSource";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ScreenHome} />
        <Route>
          <Nav />
          <div className="Banner" />
          <Switch>
            <PrivateRoute path="/source" component={ScreenSource} />
            <PrivateRoute path="/articles" component={ScreenMyArticles} />
            <PrivateRoute
              path="/articles-by-source/:id"
              component={ScreenMyArticlesBySource}
            />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
