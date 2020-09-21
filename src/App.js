import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Chat from "./component/Chat/Chat.js";
import Foter from "./component/foter/Foter";
import Nav from "./component/Nav/Nav";
import Blog from "./component/Blog/Blog";
import Todo from "./component/Todo/Todo";
import Login from "./component/Login/Login";
import { auth, database } from "./component/Fire";
import Signup from "./component/Signup/Signup";
import P2pchat from "./component/P2pchat/P2pchat";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    auth.onAuthStateChanged((user) => {
      //  if sign in

      if (user) {
        console.log("login", user);
        console.log("login name ", user.uid);

        this.setState({ user: user.uid });
      } else {
        console.log("not login ", user);
        this.setState({ user: false });
      }
    });
  }
  render() {
    //both works fine
    // switch (this.state.user) {
    //   case false:
    //     return <Login />;
    //     break;
    //   case true:
    //     return (
    //       <div class="parent">
    //         <Router>
    //           <Nav />
    //           <Switch>
    //             <Route exact path="/Blog" component={Blog} exact />
    //             <Route exact path="/Chat" component={Chat} exact />
    //             <Route exact path="/Todo" component={Todo} exact />
    //           </Switch>
    //         </Router>
    //       </div>
    //     );
    //     break;

    //   default:
    //     return <Login />;
    //     break;
    // }
    return (
      <div>
        {this.state.user ? (
          <div class="parent">
            {" "}
            <Router>
              <Nav />
              <Switch>
                <Route exact path="/P2pchat" component={P2pchat} exact />
                <Route exact path="/Blog" component={Blog} exact />
                <Route exact path="/Chat" component={Chat} exact />
                <Route exact path="/Todo" component={Todo} exact />{" "}
              </Switch>
              {/* <Redirect to="/Chat" /> */}
            </Router>{" "}
          </div>
        ) : (
          <div>
            <a href="/login">
              <h1>login</h1>
            </a>
            <a href="/signup">
              <h1>signup</h1>
            </a>
            <Router>
              <switch>
                <Route exact path="/login" component={Login} exact />
                <Route exact path="/signup" component={Signup} exact />
              </switch>
            </Router>
          </div>
        )}
      </div>
    );
  }
}
export default App;
