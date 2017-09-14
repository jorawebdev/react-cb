import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Logo from './images/polarisTextLogo.png';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import App from './MainApp';
import reducer from './reducers';

const store = createStore(reducer);
const root = document.getElementById('root');
store.subscribe(() => {
    //console.log('in store subscribe', store.getState());
});
//<App data={window.__PROPS__}/>

render(
  (<Provider store={store}>
    <Router>
      <div>
        <div className="logo-box">
          <img src={Logo} className="logo" alt="" />
          <i>Component Browser</i>
        </div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </Provider>
), root);
