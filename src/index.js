// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux';
import App from './LARAVEL01/App'
import store from './LARAVEL01/Store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    // <>
    //    <Rooter /> 
        
    // </> 
    <Provider store={store}>
      <App/>
  </Provider>
);
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import App from './LARAVEL01/App';
// import store from './LARAVEL01/Store';
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Tu peux le décommenter si Bootstrap est installé

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );