import React from "react";
import style from "./Login.module.css";
import { auth } from "../Fire";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }
  componentDidMount() {
    this.setState({ error: "" });
  }

  login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        console.log("error login func", error);
        this.setState({ error: error.message });
      });
    console.log("login func called");
  };
  signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        console.log("error signup func", error);
        this.setState({ error: error.message });
      });
    console.log("signup func call");
  };

  render() {
    return (
      <div class={style.parent}>
        <h1>this is home </h1>
        <form onSubmit={this.login}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <button onClick={this.login}>login</button>
          <button onClick={this.signup}>signup</button>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }
}
export default Login;
