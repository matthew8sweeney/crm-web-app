import React, { useEffect, useState } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";

import { authActions } from "./store/auth-slice";
import { dataActions } from "./store/data-slice";
import NewItemDialog from "./components/relations-management/new-item/NewItemDialog";
import EditItemDialog from "./components/relations-management/edit-item/EditItemDialog";
import LoginSignup from "./pages/LoginSignup";
import MainNavigation from "./components/ui/main-navigation/MainNavigation";
import PageNotFound from "./pages/PageNotFound";
import Timeline from "./pages/Timeline";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // check if user already authenticated when app mounts
    if (!authChecked) {
      dispatch(authActions.checkInitialAuth());
    }
    setAuthChecked(true);
  }, [dispatch, authChecked]);

  useEffect(() => {
    // load data when user is authenticated
    if (loggedIn) {
      dispatch(dataActions.loadData());
    }
  }, [dispatch, loggedIn]);

  return (
    <div className="app">
      {loggedIn && <MainNavigation />}
      <NewItemDialog />
      <EditItemDialog />
      <Container
        className="app-container"
        style={loggedIn ? { marginLeft: "56px" } : {}}
      >
        <Switch>
          <Route exact path="/">
            {loggedIn && <Redirect to="/timeline" />}
            <p>This shall be a resplendant CRM system someday</p>
            <NavLink to="/login">Login or Sign Up</NavLink>
          </Route>
          <Route path="/login">
            {loggedIn && <Redirect to="/timeline" />}
            <LoginSignup login linkTo="/signup" />
          </Route>
          <Route path="/signup">
            {loggedIn && <Redirect to="/timeline" />}
            <LoginSignup signup linkTo="/login" />
          </Route>
          {!loggedIn && authChecked && <Redirect to="/" />}

          <Route exact path="/dashboard">
            {/* Dashboard */}
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
          <Route exact path="/account">
            {/* Account */}
          </Route>
          <Route exact path="account/settings">
            {/* Settings */}
          </Route>

          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
