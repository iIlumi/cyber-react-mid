import { applyMiddleware, combineReducers, createStore } from 'redux';
import ToDoListReducer from './reducers/ToDoListReducer';
import LoadingReducer from './reducers/LoadingReducer';

import reduxThunk from 'redux-thunk';

// middleware saga
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './sagas/rootSaga';

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  ToDoListReducer,
  LoadingReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

// Gắn middle ware trước mới gọi saga sau

middleWareSaga.run(rootSaga);

export default store;
// Export default có thể đổi tên được
