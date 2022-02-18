import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { USER_SIGNIN_API } from '../../constants/Cyberbugs/Cyberbugs';
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
    // Ở đây ko yeild trưc tiếp vẫn được nhưng sẽ ko tiện xử lý con bên trong
    // Các đưa vào call sẽ cho phép điều đó
    const { data } = yield call(() =>
      cyberbugsService.signInCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    /**
     * https://stackoverflow.com/questions/56184152/can-we-redirect-to-in-reduxsaga/56184219
     * https://www.npmjs.com/package/connected-react-router
     * Chỉ support router v4,v5
     * 
     * https://stackoverflow.com/questions/70881320/redirect-to-route-from-saga-using-react-router-v6
     */
    console.log(data);
    action.userLogin.history('/home');
  } catch (err) {
    console.log('err:', err)
    // err.response.data đôi khi gây lỗi
    console.log(err.response);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
