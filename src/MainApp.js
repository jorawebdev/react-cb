import React, { Component } from 'react';
import { connect } from 'react-redux';

import RouterComp from "./components/Router";
import Lazy from "./components/Lazy";
import Body from "./components/Body";
import CSS from "../scss/main.scss";

class App extends Component {
  constructor( props ){
    super(props);
  }

  render() {
    return(
      <div>
        <RouterComp {...this.props} />
        <Lazy load={"./Header"} {...this.props} />
        <Body {...this.props} />
        <Lazy load={"./Footer"} {...this.props} />
        <Lazy load={"./AddItem"} {...this.props} />

        {/* which props and actions needed in this component? */}
        <Lazy load={"./Count"} {...this.props}/>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log('state', state, state.count.val);
//   return {
//     completed: false,
//     id: state.count.id,
//     val: state.count.val
//     //math: state.mathReducer
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   console.log('dispatch', dispatch);
//   return {
//     setName: (val) => {
//       dispatch(countVal(val))
//     }
//
//     //math: state.mathReducer
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
