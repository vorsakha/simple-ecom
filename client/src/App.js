import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Contact from "./components/contact/Contact";
import superDashboard from "./components/users/superDashboard";
import Dashboard from "./components/users/Dashboard";
import CreateProduct from "./components/product/CreateProduct";
import Alert from "./components/layout/Alert";

// Routing
import SuperPrivateRoute from "./routing/SuperPrivateRoute";
import PrivateRoute from "./routing/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="alert-container">
            <Alert />
          </div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contact" component={Contact} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <SuperPrivateRoute
              exact
              path="/super-dashboard"
              component={superDashboard}
            />
            <SuperPrivateRoute
              exact
              path="/create-product"
              component={CreateProduct}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
