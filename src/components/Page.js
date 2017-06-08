import React, { Component } from 'react';

import FetchAllFeatures from "./FetchAllFeatures";
import FetchFeature from "./FetchFeature";

export default class Page extends Component {
  constructor( props ){
    super(props);
    this.state = {id: null, feature: null};
  }

  updateFeature(id, feature){
    this.setState({id, feature});
  }
  
  render(){
    return(
      <div>
        <h1>Page 2 {this.props.data.brand.toString()}</h1>
        <h1>Fetch Feture {this.state.id}</h1>
        <FetchFeature {...this.props} feature={this.state.feature} />
        <FetchAllFeatures {...this.props} updateFeature={this.updateFeature.bind(this)}/>
      </div>
    );
  }
}
