import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

/**
 * https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6
 * https://stackoverflow.com/questions/70881320/redirect-to-route-from-saga-using-react-router-v6
 * 
 * https://github.com/supasate/connected-react-router/issues/543
 * router v5 -> dùng bản history 4.10.0
 * npm i history
 * 
 * Chú ý redux-history là 1 package khác
 * 
 * router v6 dùng 
 * https://github.com/salvoravida/redux-first-history
 * 
 * Tham khảo thêm chứ sẽ ko áp dụng trong prj này
 * lúc này trong index.js sẽ là 
 *   <Router history={history}>
 * 
 * trong sage sẽ import history từ lib, và xài history.push
 */