import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/Theme";
import Navbar from "./components/navbar/Navbar";
import SignAll from "./pages/SignAll";
import AllProducts from "./pages/AllProducts";
import Shop from "./pages/Shop";
import "./App.css";
import { LoginProvider } from "./contexts/LoginContext";
import { ProtectedRoute } from "./components/protectedRoute";
import NewProduct from "./pages/NewProduct";
import SingleProducts from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
// import { StripeProvider } from "react-stripe-elements";
import HomePage from "./pages/HomePage";
import SingleStore from "./pages/SingleStore";

import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import {Auth0Provider} from "@auth0/auth0-react";
import Profile from "./pages/ProfilePage";
import Footer from "./components/footer/footer";
const stripePromise = loadStripe("pk_test_0r8FCK7bb2AZQtx3doB5XySZ");

function App() {
  return (
      <Auth0Provider
          domain="project-local.us.auth0.com"
          clientId="J05DyCJTXj8mrx8ySkxZ8QXCHgL8EgZX"
          redirectUri={window.location.origin+'/profile'}
      >
    <LoginProvider>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/signup" component={SignAll} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/store" component={HomePage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/store/:storeid" component={SingleStore} />
            <Route
              exact
              path="/products/:productid"
              component={SingleProducts}
            />
            <ProtectedRoute exact path="/shop" component={Shop} />
            <ProtectedRoute
              exact
              path="/shop/new-product"
              component={NewProduct}
            />
            <Elements stripe={stripePromise}>
              <Route exact path="/checkout" component={Checkout} />
            </Elements>
          </Switch>
        </BrowserRouter>
        <Footer />
      </MuiThemeProvider>
    </LoginProvider>
      </Auth0Provider>
  );
}

export default App;
