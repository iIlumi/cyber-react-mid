import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import {
  LOGIN_SUCCESS,
  USER_SIGNIN_API,
} from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { userService } from '../../../services/UserService';

//Quản lý các action saga

function* signInSaga(action) {
  console.log('action:', action);

  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //Gọi api
  try {
    const { data } = yield call(() =>
      cyberbugsService.signInCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: LOGIN_SUCCESS,
      userLoginInfo: data.content,
    });

    // router v6 thực chất là navigate() trực tiếp chứ ko history.push() như v5
    // https://redux-saga.js.org/docs/api/#selectselector-args
    // https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6
    // https://github.com/salvoravida/redux-first-history
    let history = yield select((state) => state.HistoryReducer.history);
    // history.push('/home');
    history('/home');

    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}

//Quản lý các action saga
function* getUserSaga(action) {
  //action.keyWord

  //Gọi api
  try {
    const { data } = yield call(() => userService.getUser(action.keyWord));

    yield put({
      type: 'GET_USER_SEARCH',
      lstUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest('GET_USER_API', getUserSaga);
}

//Quản lý các action saga
function* addUserProjectSaga(action) {
  try {
    yield call(() => userService.assignUserProject(action.userProject));

    // Lúc này ta chỉ mới thay đổi trên back-end
    // Phải gọi saga để FE sync cùng
    // Re-render - load lại prj trên redux
    yield put({
      type: 'GET_LIST_PROJECT_SAGA',
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);
}

//Quản lý các action saga
function* removeUserProjectSaga(action) {
  try {
    yield call(() => userService.deleteUserFromProject(action.userProject));

    yield put({
      type: 'GET_LIST_PROJECT_SAGA',
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest('REMOVE_USER_PROJECT_API', removeUserProjectSaga);
}
