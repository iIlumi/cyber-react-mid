import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { LOGIN_SUCCESS, USER_SIGNIN_API } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

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
