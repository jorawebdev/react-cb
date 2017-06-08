import React, { Component } from 'react';

export default class Footer extends Component {
  constructor( props ){
    super(props);
    this.state = {};
  }

  render() {
    return(
      <footer>
        This is {this.props.data.brand} footer
      </footer>
    );
  }
}
