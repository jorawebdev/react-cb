import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSS from "../scss/main.scss";
import Projects from "./containers/Projects";

class App extends Component {
  constructor( props ){
    super(props);
    this.state = {data: window.__PROPS__};
  }

  render() {
    return(
      <Projects {...this.props} />
    );
  }
}
export default App;
