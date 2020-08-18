import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./component/Chat/Chat.js";
import Foter from "./component/foter/Foter";
import Nav from "./component/Nav/Nav";
import Blog from "./component/Blog/Blog";
import Todo from "./component/Todo/Todo";
import Login from "./component/Login/Login";
import { auth, database } from "./component/Fire";

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
        console.log("login name ", user.email);

        this.setState({ user: user });
      } else {
        console.log("not login ", user);
        this.setState({ user: false });
      }
    });
  }
  userupdate = () => {
    database.collection("chat").update({ useremail: this.state.user.email });
    console.log("userupdate cal");
  };
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
              <Nav />{" "}
              <Switch>
                <Route exact path="/Blog" component={Blog} exact />
                <Route exact path="/Chat" component={Chat} exact />
                <Route exact path="/Todo" component={Todo} exact />{" "}
              </Switch>{" "}
            </Router>{" "}
          </div>
        ) : (
          <div>
            {this.userupdate}
            <Login />
          </div>
        )}
      </div>
    );
  }
}
export default App;
