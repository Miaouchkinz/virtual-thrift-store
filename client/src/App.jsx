import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Feed from "./components/Feed";
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';

import Profile from './components/profile/Index';

import Cart from "./components/cart-checkout/Cart";
import Checkout from "./components/cart-checkout/Checkout";
import OrderConfirmation from "./components/cart-checkout/OrderConfirmation";

import ChatWindow from "./components/chat/ChatWindow";

import useApplicationData from './hooks/useApplicationData';


export default function App(props) {
  const {
    state,
    handleSuccessfulAuth,
    handleLogout,
    addToCart,
    emptyCart,
    removeFromCart,
    addNewConversation,
    addNewMessageToConversation,
    handleReceivedMessage,
    handleReceivedConversation
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
          {state.availableClothing && <Route exact path="/feed">
            <Feed
              availableClothing={state.availableClothing}
              clothingCategories={state.clothingCategories}
              cart={state.cart}
              addToCart={addToCart}
            />
          </Route>}
          {state.currentUser && 
            <Route
              exact
              path="/user/profile"
              render={props => (
                <Profile
                  {...props}
                  userName={state.currentUser.name}
                  avatar={state.currentUser.avatar_url}
                  currentUserId={state.currentUser.id}
                  handleLogout={handleLogout}
                  allClothing={state.allClothing}
                  conversations={state.conversations}
                  handleReceivedConversation = {handleReceivedConversation}
                />
                )}>
            </Route>}
          {state.conversations && 
            <Route
              exact
              path={"/chat"}>
              <ChatWindow 
                currentUser={state.currentUser}
                conversations={state.conversations}
                addNewMessageToConversation={addNewMessageToConversation}
                handleReceivedMessage={handleReceivedMessage}
              />
            </Route>}
          <Route exact path={"/cart"}>
            <Cart
              availableClothing={state.availableClothing}
              cart={state.cart}
              removeFromCart={removeFromCart}
            />
          </Route>
          <Route exact path={"/checkout"}>
            <Checkout cart={state.cart} users={state.users} currentUser={state.currentUser} addNewConversation={addNewConversation} />
          </Route>
          <Route exact path={"/confirmation"}>
            <OrderConfirmation
              cart={state.cart}
              users={state.users}
              emptyCart={emptyCart}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
