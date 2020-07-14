import React from "react";
import style from "./nav.module.css";

export default function Nav() {
  return (
    <div class={style.nav_parent}>
      <div class={style.nav}>
        <img src="https://miro.medium.com/max/260/1*r323AdQdzU5JTWhZsSyxCA.png" />
        <a href="/xy">
          {" "}
          <h5>TECH</h5>{" "}
        </a>
        <h5>Home</h5>
        <h5>shakil</h5>
        <a href="/Blog">
          {} <h5>Blog</h5>
        </a>
        <h5>CHAT</h5>
        <h5>STORY</h5>
        <h5>ALL</h5>
        <h5>WE'RE HIRRING</h5>
        <h5></h5>
      </div>
    </div>
  );
}
