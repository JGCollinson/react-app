import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/articles" component={Main} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
