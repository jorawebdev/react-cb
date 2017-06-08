import React, { Component } from 'react';

import RouterComp from "./components/Router";
import Lazy from "./components/Lazy";
import Body from "./components/Body";
import CSS from "../scss/main.scss";

export default class App extends Component {
  constructor( props ){
    super(props);
  }

  render() {
    return(
      <div>
        <RouterComp {...this.props} />
        <Lazy load={"./Header"} {...this.props} />
        <Body {...this.props} />
        <Lazy load={"./Footer"} {...this.props} />
      </div>
    );
  }
}
