import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './MainApp';
import reducer from './reducers';

const store = createStore(reducer);
const root = document.getElementById('root');
store.subscribe(() => {
    console.log('in store subscribe', store.getState());
});
render(
  (<Provider store={store}><App data={window.__PROPS__}/></Provider>
), root);
