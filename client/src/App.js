import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

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
import Cart from "./components/users/Cart";
import Order from "./components/order/Order";

// Routing
import SuperPrivateRoute from "./routing/SuperPrivateRoute";
import PrivateRoute from "./routing/PrivateRoute";

// Redux
import { connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ContactMessage from "./components/contact/ContactMessage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ modal: { modalIsOpen } }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
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
          <PrivateRoute exact path="/order/:id" component={Order} />
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
          <SuperPrivateRoute
            exact
            path="/message/:id"
            component={ContactMessage}
          />
        </Switch>
        {modalIsOpen && <Cart />}
      </Fragment>
    </Router>
  );
}

App.propTypes = {
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(App);
