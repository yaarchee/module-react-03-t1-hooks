import React from 'react';
import ReactDOM from 'react-dom';
import App from  './components/App/App'
import AppHooks from './components/AppHooks/App/App'
import './styles.css'



ReactDOM.render(
  <React.StrictMode>
      <>
          <App />
          <AppHooks/>
      </>


  </React.StrictMode>,
  document.getElementById('root')
);


