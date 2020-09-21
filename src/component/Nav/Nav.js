import React from "react";
import style from "./nav.module.css";
import { auth, database } from "../Fire";
export default function Nav() {
  const signout = () => {
    database.collection("profilemid").doc("one").delete();
    console.log("sinout");
    auth.signOut();
  };
  return (
    <div class={style.nav_parent}>
      <div class={style.nav}>
        {/* <img src="https://miro.medium.com/max/260/1*r323AdQdzU5JTWhZsSyxCA.png" /> */}
        <a href="/P2pchat">
          {" "}
          <h5>p2pchat</h5>{" "}
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
            signout();
          }}
        >
          signout
        </button>
        <h5></h5>
      </div>
    </div>
  );
}
