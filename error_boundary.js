import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./styles.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error) {
    this.setState({ hasError: error });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error has occured.</h1>;
    }

    return this.props.children;
  }
}

const HomeScreen = () => <h3>Home</h3>;

const ProfileScreen = () => <h3>Profile Screen</h3>;

const ShopScreen = () => {
  throw new Error("Error during render");
};

const App = () => (
  <BrowserRouter>
    <div className="container">
      <nav className="nav nav-pills">
        <NavLink exact className="nav-link" activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/profile">
          Profile
        </NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/shop">
          Shop (error)
        </NavLink>
      </nav>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <ErrorBoundary {...props}>
              <HomeScreen {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path="/profile"
          render={(props) => (
            <ErrorBoundary {...props}>
              <ProfileScreen {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path="/shop"
          render={(props) => (
            <ErrorBoundary {...props}>
              <ShopScreen {...props} />
            </ErrorBoundary>
          )}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
