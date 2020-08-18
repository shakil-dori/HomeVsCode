import React from "react";
import style from "./nav.module.css";
import { auth } from "../Fire";
export default function Nav() {
  // signout = () => {
  //   console.log("sinout");
  //   // auth.signOut();
  // };
  return (
    <div class={style.nav_parent}>
      <div class={style.nav}>
        {/* <img src="https://miro.medium.com/max/260/1*r323AdQdzU5JTWhZsSyxCA.png" /> */}
        <a href="/xy">
          {" "}
          <h5>TECH</h5>{" "}
        </a>
        <h5>Home</h5>

        <a href="/Blog">
          {} <h5>Blog</h5>
        </a>
        <a href="/Chat">
          <h5>CHAT</h5>
        </a>
        <a href="/Todo">
          <h5>TODO</h5>
        </a>
        <h5>ALL</h5>
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          signout
        </button>
        <h5></h5>
      </div>
    </div>
  );
}
