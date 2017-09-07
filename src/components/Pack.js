import React, { Component } from 'react';

class Pack extends Component {
  constructor( props ){
    super(props);
  }

  render() {
    //console.log(this.props);
    if(this.props.pack){
      return(
        <div className="large-16 columns panel">
          <div className="large-5 columns">
            <h5>Dependencies</h5>
            <ul className="no-bullet">
              {Object.keys(this.props.pack.dependencies).map(item =>
                <li key={item}>{item}: <span className="success label">{this.props.pack.dependencies[item]}</span></li>
              )}
            </ul>
          </div>
          <div className="large-6 columns">
            <h5>Description</h5>
            {this.props.pack.description}
          </div>
          <div className="large-1 columns">
            <h5>Version</h5>
            {this.props.pack.version}
          </div>
          <div className="large-4 columns">
            <h5>Email</h5>
            {this.props.pack.author.email}
          </div>
        </div>
      );
    } else {
      return (
        <div>No Package.json</div>
      )
    }
  }
}

export default Pack
