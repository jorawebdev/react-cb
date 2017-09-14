import React, { Component } from 'react';
import Changes from './Changes'

class Pack extends Component {
  constructor( props ){
    super(props);
  }

  render() {
    //console.log(this.props);
    if(this.props.pack){
      return(
        <div className="panel cb-grid">
          <div className="large-4 cb-col">
            <h5>Dependencies</h5>
            <ul className="no-bullet">
              {Object.keys(this.props.pack.dependencies).map(item =>
                <li key={item}>{item}: <span className="success label">{this.props.pack.dependencies[item]}</span></li>
              )}
            </ul>
          </div>
          <div className="large-5 cb-col">
            <h5>Description</h5>
            {this.props.pack.description}
          </div>
          <div className="large-3 cb-col">
            <h5>Changes</h5>
            <Changes {...this.props.changelog}/>
          </div>
          <div className="large-1 cb-col">
            <h5>Version</h5>
            {this.props.pack.version}
          </div>
          <div className="large-3 cb-col cb-col-last">
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
