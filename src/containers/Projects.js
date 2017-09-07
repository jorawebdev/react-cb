import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadProjects } from '../actions'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loading from '../components/Loading'
import ProjList from './ProjectList'
import _ from 'underscore'

class Projects extends Component {
  constructor( props ){
    super(props);
    this.selectProject = this.selectProject.bind(this);
  }

  selectProject(e){
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
  }

  componentDidMount(){
    //axios.get('http://11.126.101.61:3000/api/component')
    axios.get('https://code.devops.fds.com/api/v4/groups/polaris?private_token=Ti3KJWDxG2rqsSmNsYAm')
    .then(res => {
      let arr = res.data.projects;
      const nArr = _.sortBy(arr, function(o) {
        return (o.name).toLowerCase()
      });
      const projects = nArr.map(obj => obj);
      this.props.loadProjects(projects);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    //console.log('in Projects render ', this.props);
    if(!this.props.projects || this.props.projects.length == 0){
      return(<Loading />);
    } else {
      //console.log('in else', this, this.props);
      return(<ProjList {...this.props} updateList={this.selectProject} />)
    }
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    projects: state.loadProjects
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjects: (features) => dispatch(loadProjects(features)),
    }
}

Projects = connect(mapStateToProps, mapDispatchToProps)(Projects);

export default withRouter(Projects);
