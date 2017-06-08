import React, { Component } from 'react';

export default class Body extends Component {
  constructor( props ){
    super(props);
    this.state = {filter:''};
  }

  setFilter(filter) {
    console.log(filter, this.props);
    this.setState({filter});
    document.body.classList = [];
    document.body.classList.add(filter);
  }

  isActive(value){
    return 'btn '+((value===this.state.selected) ?'active':'default');
  }

  render() {
    let buttons = [];
    const colors = ['Crimson','DarkOrange','DarkGreen','Tan','CornSilk'];
    colors.forEach((color,i) => {
      buttons.push(<button className={this.isActive.bind(this, color)} onClick={this.setFilter.bind(this, color)} key={i}>Click</button>);
    });
    return(
      <div>
        <h1>Common Body {this.props.data.brand}</h1>
        <div>{buttons}</div>
      </div>
    );
  }
}
