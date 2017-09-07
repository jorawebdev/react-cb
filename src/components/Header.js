import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoImg from 'images/stars_constellation_sky-01-256.png';

class Header extends Component {
  constructor( props ){
    super(props);
    this.state = {};
  }

  render() {
    return(
      <header>
        <img src={LogoImg} alt="Component Browser"/>
        This is {this.props.data.brand} header
        <h1>In header value: {this.props.value}</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    completed: false,
    id: state.count.id,
    value: state.count.val
    //math: state.mathReducer
  }
};

export default connect(mapStateToProps)(Header)
