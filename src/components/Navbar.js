import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";

export default class Navbar extends Component {
  handleLogOut = async event => {
    try {
      Auth.signOut();

      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      console.log("Redirecting user");
      return <Redirect to="/" />;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src="operatorflow-logo.png"
              width="65"
              height="95"
              alt="operatorflow logo"
            />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/sparkflow" className="navbar-item">
              SparkFlow
            </a>
            <a href="https://kube.operatorflow.io" className="navbar-item">
              KubeFlow
            </a>
            <a href="/dashboard" className="navbar-item">
              ControlFlow
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <p>
                    Hello, {this.props.auth.user.username} (
                    <b>{this.props.auth.user.attributes.email}</b>)
                  </p>
                )}

                {!this.props.auth.isAuthenticated && !this.props.auth.user && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}

                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <a
                    href="/"
                    onClick={this.handleLogOut}
                    className="button is-light"
                  >
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
