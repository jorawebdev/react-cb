import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { selectProject, selectProjPackage, setArtifactDate } from '../actions'
import CSS from "../../scss/main.scss";
import Pack from '../components/Pack'
//import shrk from '../npm-shrinkwrap0_19_0.json'
//import shrk from '../npm-shrinkwrap_hdr2.json'

class ProjectList extends Component {
  constructor( props ){
    super(props);
    this.updateParent = this.updateParent.bind(this);
    this.state = {
      changelog: []
    }
  }

  componentWillMount(){
    //console.log('before ', this);
    this.updateParent();
  }

  getProjDate(){
    //console.log(this.props);
    let urlDate = 'https://code.devops.fds.com/api/v4/projects/' + this.props.project.id + '/repository/tags/' + this.props.pack.version + '?ref=master&private_token=Ti3KJWDxG2rqsSmNsYAm';
    axios.get(urlDate)
    .then(res => {
      var t = new Date(res.data.commit.authored_date);
      let offset = t.getTimezoneOffset() / 60;
      let newStr = t.getTime() + offset;
      newStr = new Date(newStr).toUTCString().replace( / GMT$/, "" );
      //console.log(newStr);
      this.props.setArtifactDate(newStr);
    })
    .catch( err => {
      //console.log('error', err)
      this.props.setArtifactDate('');
    })
  }

  updateParent(e){
    //console.log('in updateParent');
    let id, name;
    let token = 'private_token=Ti3KJWDxG2rqsSmNsYAm';
    let that = this;
    if(e){
      e.preventDefault();
      id = e.target.value;
      name = e.currentTarget.options[e.currentTarget.selectedIndex].text;
    } else { //not clicked
      id = this.props.projects[0].id; //e.target.id;
      name = this.props.projects[0].name;
    }
    this.props.selectProject({id,name});
    //https://code.devops.fds.com/api/v4/projects/[proj-id]/repository/tags/[version]?ref=master&private_token=Ti3KJWDxG2rqsSmNsYAm
    const urlPackage = 'https://code.devops.fds.com/api/v4/projects/' + id + '/repository/files/package.json?ref=master&' + token;
    //const urlArtifact = 'http://ci-artifacts.devops.fds.com/artifactory/npm-global/@page/' + name + '/-/@page/';
    axios.get(urlPackage)
    .then(res => {
      //console.log(res.data);
      let content = window.atob(res.data.content);//base-64 decoding
      let pack = JSON.parse(content);
      this.props.selectProjPackage(pack);
      this.getProjDate();
    })
    .catch( err => {
      //console.log('error', err);
      this.props.selectProjPackage('');
      this.props.setArtifactDate('');
    })

    axios.get('/changelog?id=' + id)
    .then(res => {
      console.log(res.data)
      that.setState({ changelog: res.data})
    })
    .catch( err => {
      console.log('error', err)
    })
  }
/*
  addShrink(){
    axios({method:'post',url:'/publish',data:shrk}).then(res =>{
      console.log(res);
    }).
    catch(err=>{
      console.log(err);
    });
  }
*/
  render() {
    //console.log('in ProjectList render', this.props);
    let createdDate = (this.props.date != '') ? 'Build Updated On: ' + this.props.date: '';
    return (
      <div className="container">
        <select className="large-2 columns" onChange={this.updateParent}>
          {this.props.projects.map(project =>
            <option key={project.id} value={project.id}>{project.name}</option>
          )}
        </select>
        <div className="large-2 columns">Project ID: {this.props.project.id}</div>
        <div className="large-6 columns">{createdDate}</div>
        {/*<div className="large-1 columns"><button className="button" onClick={this.addShrink} >Save</button></div>*/}
        <Pack {...this.props} {...this.state}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.selectProject,
    pack: state.selectProjPackage.package,
    date: state.setArtifactDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectProject: (project) => dispatch(selectProject(project)),
    selectProjPackage: (project) => dispatch(selectProjPackage(project)),
    setArtifactDate: (val) => dispatch(setArtifactDate(val))
  }
}

ProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectList);

export default ProjectList;
