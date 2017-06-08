import React, { Component } from 'react';
import axios from 'axios';

export default class FetchAllFeatures extends Component {

  constructor( props ){
    super(props);
    this.state = {features:[], init:true};
  }

  loadAllFeatures(){
    axios.get('http://11.126.101.61:3000/api/component')
    //axios.get('https://code.devops.fds.com/api/v3/projects?private_token=')
    .then(res => {
      const features = res.data.features.map(obj => obj);
      this.setState({features, init:false});
    })
  }

  getFeature(e){
    e.preventDefault();
    const id = e.target.id;
    axios.get('http://11.126.101.61:3000/api/component/' + id)
      .then(res => {
        let feature = res.data;
        this.props.updateFeature(id, feature);
      });
  }

  componentDidMount(){
    this.loadAllFeatures();
  }

  shouldComponentUpdate(){
    return this.state.init;
  }

  render() {
    console.log('in render');
    return(
      <div>
        <h1>Fetch All Features {this.props.data.brand}</h1>
        <ul>
          {this.state.features.map(feature =>
            <li key={feature._id}>
              <a id={feature._id} href="" onClick={this.getFeature.bind(this)}>{feature.name}</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
