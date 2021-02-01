import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import History from 'core/history';
import './styles.scss';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { view } = this.props;
    return <div>{view}</div>;
  }
}

class main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={History}>
        <Link to={`/`}>Index</Link> <Link to={`/page`}>Page</Link>
        <Switch>
          <Route exact path="/">
            <Layout view={'index'} />
          </Route>
          <Route exact path="/page">
            <Layout view={'page'} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default main;
