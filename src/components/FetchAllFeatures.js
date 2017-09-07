import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFeatureList, selectFeature, featureError } from '../actions'
//import { selectFeature } from '../actions'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import FetchFeature from "./FetchFeature";

class FetchAllFeatures extends Component {
  constructor( props ){
    super(props);
  }

  loadAllFeatures(){
    //var dispatch = this.props.dispatch;
    axios.get('http://11.126.101.61:3000/api/component')
    //axios.get('https://code.devops.fds.com/api/v4/projects?private_token=Ti3KJWDxG2rqsSmNsYAm')
    .then(res => {
      const features = res.data.features.map(obj => obj);
      //const features = res.data.map(obj => obj);
      this.props.addFeatureList(features);
      this.getFeature();
    })
  }

  getFeature(e){
    let id, name;
    let token = 'private_token=Ti3KJWDxG2rqsSmNsYAm';
    if(e){
      e.preventDefault();
      id = e.target.value;
      name = e.currentTarget.options[e.currentTarget.selectedIndex].text;
    } else {
      id = this.props.features[0].id; //e.target.id;
      name = this.props.features[0].name;
    }
    const urlPackage = 'https://code.devops.fds.com/api/v4/projects/' + id + '/repository/files/package.json?ref=master&' + token;
    const urlArtifact = 'http://ci-artifacts.devops.fds.com/artifactory/npm-global/@page/' + name + '/-/@page/';
    //var dispatch = this.props.dispatch;
    //axios.get('http://11.126.101.61:3000/api/component/' + id)
    //https://code.devops.fds.com/api/v4/projects/1997/repository/files/package.json?ref=master&private_token=Ti3KJWDxG2rqsSmNsYAm
    //axios.get('https://code.devops.fds.com/api/v4/projects/' + id + '?private_token=Ti3KJWDxG2rqsSmNsYAm')
    //http://ci-artifacts.devops.fds.com/artifactory/npm-global/@page/discovery-pages/-/@page/


    fetch('/projectDetails?id=' + id + '&name=' + name)
      .then((response) => {
        console.log(response);
        //response.json()
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

    /*
    let urlArray = [urlPackage,urlArtifact];
    let promiseArray = urlArray.map(url => axios.get(url)); // or whatever
    axios.all(promiseArray)
      .then(res => {
        console.log(res);
        let content = window.atob(res[0].data.content);//base-64 decoding
        let feature = JSON.parse(content);
        console.log(feature);
        this.props.selectFeature(feature);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          this.props.featureError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        //console.log(error.config);
      });
      */
  }

  componentDidMount(){
    this.loadAllFeatures();
  }

  render() {
    if(this.props.features == 0){
      return(
        <div>loading...</div>
      );
    } else {
      return(
        <div>
          <select className="large-2 columns" onChange={this.getFeature.bind(this)}>
            {this.props.features.map(feature =>
              <option key={feature.id} value={feature.id}>{feature.name}</option>
            )}
          </select>
          <div className="large-13 columns">
            <FetchFeature {...this.props} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    features: state.features
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFeatureList: (features) => dispatch(addFeatureList(features)),
        selectFeature: (feature) => dispatch(selectFeature(feature)),
        featureError: (error) => dispatch(featureError(error))
    }
}

FetchAllFeatures = connect(mapStateToProps, mapDispatchToProps)(FetchAllFeatures);

export default withRouter(FetchAllFeatures);
