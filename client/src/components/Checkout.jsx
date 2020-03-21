import React from "react";
import Icon from "./common/iconButton";
import { Link } from "react-router-dom";

export default function Checkout(props) {
  return (
    <div>
      <header>
        <div className="feed_header_block">
          <Link
            to={{
              pathname: "/user/profile"
            }}
          >
            <Icon secondary icon=""></Icon>
          </Link>
          <Link
            to={{
              pathname: "/cart"
            }}
          >
            <Icon secondary label="<"></Icon>
          </Link>
        </div>
      </header>
      <h1>This is Checkout</h1>
      <footer>
        <button></button>
      </footer>
    </div>
  );
}
