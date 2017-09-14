import React, { Component } from 'react';

class Changes extends Component {
  constructor( props ){
    super(props);
  }

  render(){
    console.log(this.props)
    if(Object.keys(this.props).length === 0) {
      return (<div>no changes</div>)
    } else {
      var sum = []
      for(var i in this.props){
        if(this.props[i].updated){
          console.log('updated: ', this.props[i].updated);
          sum.push(<li key={i} className="alert-box"><i className="icon-gen-refresh-red-small"></i>{this.props[i].updated.module} from {this.props[i].updated.from} to {this.props[i].updated.to}</li>)
        } else if(this.props[i].added){
            var added = []
            var o = this.props[i].added
            Object.keys(o).map(function(key){
              console.log('added ', key, o[key]);
               added.push(key + ': ' + o[key])
  		      })
            sum.push(<li key={i} className="alert-box"><i className="icon-ui-plus-f-red-small"></i>{added}</li>)
        } else if(this.props[i].removed){
            var removed = []
            var o = this.props[i].removed
            Object.keys(o).map(function(key){
              console.log('removed ', key, o[key]);
               removed.push(key + ': ' + o[key])
            })
            sum.push(<li key={i} className="alert-box"><i className="icon-ui-minus-f-red-small"></i>{removed}</li>)
        }
      }
      return(
        <div><ul className="no-bullet changelog-box">{sum}</ul></div>
      )
    }
  }
}

export default Changes
