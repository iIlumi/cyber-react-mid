import Axios from 'axios';
import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
} from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { USER_SIGNIN_API } from '../../constants/Cyberbugs/Cyberbugs';

//Quản lý các action saga

function* signInSaga(action) {
  console.log('action:', action);

  //Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signInCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
