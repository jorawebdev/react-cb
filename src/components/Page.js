import React, { Component } from 'react';
import FetchAllFeatures from "./FetchAllFeatures";
import FetchFeature from "./FetchFeature";

export default class Page extends Component {
  constructor( props ){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Page</h1>
        <FetchFeature {...this.props} />
        <FetchAllFeatures {...this.props} />
      </div>
    );
  }
}
