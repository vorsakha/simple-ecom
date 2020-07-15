import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Contact from "./components/contact/Contact";
import SuperDashboard from "./components/users/SuperDashboard";
import Dashboard from "./components/users/Dashboard";
import CreateProduct from "./components/product/CreateProduct";
import ProductsPage from "./components/product/ProductsPage";
import Product from "./components/product/Product";
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
            <Route exact path="/products/:id" component={ProductsPage} />
            <Route exact path="/product/:id" component={Product} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contact" component={Contact} />
            <SuperPrivateRoute
              exact
              path="/super-dashboard"
              component={SuperDashboard}
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
