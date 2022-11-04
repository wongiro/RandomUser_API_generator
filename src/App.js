import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";

import "./styles.css";

class ErrorBoundary extends React.Component {
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
      return (
        <div className="home">
          <h1>404 page</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorScreen = () => {
  throw new Error("OPPS! Wahala  during render");
};

export default function App() {
  return (
    <Router>
      <header className="headers">
        <Link to="/" activeClassName="active">
          Home
        </Link>
        <Link
          to="/about"
          activeClassName="active"
          style={{ marginLeft: "10px" }}
        >
          Users
        </Link>
        <Link
          to="/shop"
          activeClassName="active"
          style={{ marginLeft: "10px" }}
        >
          Error Boundary
        </Link>
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ErrorBoundary {...props}>
                <Home {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/about"
            render={(props) => (
              <ErrorBoundary {...props}>
                <About {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/shop"
            render={(props) => (
              <ErrorBoundary {...props}>
                <ErrorScreen {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </main>
    </Router>
  );
}
