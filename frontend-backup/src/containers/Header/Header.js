import React from "react";

import Cart from "../../components/Cart/Cart";
import Favourites from "../../components/Favourites/Favourites";
import Search from "../../components/Search/Search";
import User from "../../components/User/User";

import Image from "../../img/place_holder.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src={Image} alt="logo" className="header__logo" />
      <Search />
      <div className="header__user-panel">
        <Favourites />
        <Cart />
        <User />
      </div>
    </header>
  );
};
export default Header;
