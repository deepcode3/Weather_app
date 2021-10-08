import React from "react";
import { Switch, Route } from "react-router-dom";
import Favourite from "../Containers/Favourite";
import Homepage from "../Containers/Homepage";
import RecentSearch from "../Containers/RecentSearch";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/recent-search" component={RecentSearch} />
    </Switch>
  );
};

export default Routes;
