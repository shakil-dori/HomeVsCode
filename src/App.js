import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./component/Chat/Chat.js";
import Foter from "./component/foter/Foter";
import Nav from "./component/Nav/Nav";
import Blog from "./component/Blog/Blog";

export default function App() {
  return (
    <div class="parent">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/Blog" component={Blog} exact />
        </Switch>
      </Router>
    </div>
  );
}
