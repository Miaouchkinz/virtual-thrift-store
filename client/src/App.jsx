import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Feed from "./components/Feed";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Registration from "./components/auth/Registration";
import Checkout from "./components/Checkout";
import Closet from "./components/Closet";
import useApplicationData from "./hooks/useApplicationData";
import OrderConfirmation from "./components/OrderConfirmation";

export default function App(props) {
  const {
    state,
    handleSuccessfulAuth,
    handleLogout,
    setCart
  } = useApplicationData();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Landing
                {...props}
                handleSuccessfulAuth={handleSuccessfulAuth}
                handleLogout={handleLogout}
              />
            )}
          ></Route>
          <Route
            exact
            path={"/login"}
            render={props => (
              <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth} />
            )}
          ></Route>
          <Route
            exact
            path={"/register"}
            render={props => (
              <Registration
                {...props}
                handleSuccessfulAuth={handleSuccessfulAuth}
              />
            )}
          ></Route>
          <Route exact path="/feed">
            <Feed
              clothing={state.clothing}
              clothingCategories={state.clothingCategories}
              cart={state.cart}
              setCart={setCart}
            />
          </Route>
          <Route
            exact
            path="/user/profile"
            render={props => (
              <Profile
                {...props}
                userName={state.currentUser.name}
                avatar={state.currentUser.avatar_url}
                handleLogout={handleLogout}
                userId={state.currentUser.id}
                allClothing={state.allClothing}
              />
            )}
          ></Route>
          {/* <Route>
            <Closet
              userId={state.currentUser.id}
              allClothing={state.allClothing}
            />
            >
          </Route> */}
          <Route
            exact
            path={"/dashboard"}
            render={props => (
              <Dashboard
                {...props}
                loggedInStatus={state.loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          ></Route>
          <Route exact path={"/cart"}>
            <Cart clothing={state.clothing} cart={state.cart} />
          </Route>
          <Route exact path={"/checkout"}>
            <Checkout cart={state.cart} users={state.users} />
          </Route>
          <Route exact path={"/confirmation"}>
            <OrderConfirmation cart={state.cart} users={state.users} />
          </Route>
        </Switch>
      </Router>
      <footer></footer>
    </div>
  );
}
