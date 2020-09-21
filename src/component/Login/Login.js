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

  render() {
    return (
      <div class={style.parent}>
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
          <a href="/signup">
            <h1>signup</h1>
          </a>
        </form>

        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default Login;
