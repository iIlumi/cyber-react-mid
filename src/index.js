import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/configStore';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Material cũng hỗ trợ component-based nhưng control ít hơn
 * https://material.io/components
 * https://m3.material.io/components/navigation-bar/overview
 * Khó customize, css vào hơn
 *
 * https://ant.design/docs/react/introduce
 *
 *
 */
