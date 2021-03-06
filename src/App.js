import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SparkDashboard from "./components/sparkflow/Dashboard";
import ProductAdmin from "./components/ProductAdmin";
import LogIn from "./components/auth/LogIn";
import Album from "./components/Album";
import Register from "./components/auth/Register";
import Dashboard from "./components/controlflow/Dashboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import { ThemeProvider } from "@material-ui/styles";
import theme from './theme';
library.add(faEdit);



class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    idToken: null,
    databricksToken: null
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  setIdToken = idToken => {
    this.setState({ idToken: idToken });
  };

  setDatabricksToken = token => {
    this.setState({ databricksToken: token });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      const idToken = session.idToken.jwtToken; // grab the JWT token and store in memory
      this.setIdToken(idToken);
    } catch (error) {
      console.log(error);
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      idToken: this.state.idToken,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    return (
      !this.state.isAuthenticating && (
        <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Album {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/sparkflow"
                  render={props => <SparkDashboard {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/admin"
                  render={props => <ProductAdmin {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/dashboard"
                  render={props => <div><Dashboard {...props} auth={authProps} /></div>}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <LogIn {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  render={props => (
                    <ForgotPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgotpasswordverification"
                  render={props => (
                    <ForgotPasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={props => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepasswordconfirmation"
                  render={props => (
                    <ChangePasswordConfirm {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/welcome"
                  render={props => <Welcome {...props} auth={authProps} />}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
        </ThemeProvider>
      )
    );
  }
}

export default App;
