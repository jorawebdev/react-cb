import React, { Component } from 'react';

export default class FetchFeature extends Component {
  render(){
    if(this.props.feature){
      return (
          <div>{this.props.feature.description}</div>
      );
    } else {
      return (
          <div>No Data</div>
      );
    }
  }
}
