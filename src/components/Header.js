import React, { Component } from 'react';

export default class Header extends Component {
  constructor( props ){
    super(props);
    this.state = {};
  }

  render() {
    return(
      <header>
        This is {this.props.data.brand} header
      </header>
    );
  }
}