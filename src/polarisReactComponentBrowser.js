import React from 'react';
import { render } from 'react-dom';
import App from './MainApp';

const root = document.getElementById('root');

render((<App data={window.__PROPS__}/>), root);
