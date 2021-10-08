import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../utils/MainPage";
import Favorites from "../utils/Favorites";
import RecentSearches from "../utils/RecentSearches";

const Routing = ({ data }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/Favorites" component={Favorites} />
        <Route path="/Recent_Search" component={RecentSearches} />
      </Switch>
    </div>
  );
};
export default Routing;
