import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { Provider } from './components'
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Provider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>,
  document.getElementById('root')
);
