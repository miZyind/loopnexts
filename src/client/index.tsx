// Node module
import React from 'react';
import ReactDOM from 'react-dom';
// Style
import 'semantic-ui-css/semantic.min.css';
// Container
import App from './containers/app';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<App name='RKSTWB' />, MOUNT_NODE);

if (module.hot) { module.hot.accept(); }
