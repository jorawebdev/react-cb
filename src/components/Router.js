import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Page from "./Page";

export default class RouterComp extends Component {
  constructor( props ){
    super(props);
    this.state = {filter:props};
    //console.log('in RouterComp: ', props);
  }

  render() {
    //console.log('in RouterComp render:', this.props);
    return(
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page">Page</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" />
          <Route exact path="/page" component={() => (<Page {...this.props} />)} />
        </div>
      </Router>
    );
  }
}
