import React from "react";
import Icon from "./common/iconButton";
import Button from "./common/textButton";
import { Link } from "react-router-dom";

export default function Checkout(props) {
  return (
    <div>
      <header>
        <Link
          to={{
            pathname: "/user/profile"
          }}
        >
          <Icon secondary large icon="profile"></Icon>
        </Link>
        <Link
          to={{
            pathname: "/cart"
          }}
        >
          <Icon secondary label="<"></Icon>
        </Link>
      </header>
      <h1>This is Checkout</h1>
    </div>
  );
}
