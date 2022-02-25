import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

function* createProjectSaga(action) {
  console.log('actionCreateProject', action);
  //HIỂN THỊ LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      let history = yield select((state) => state.HistoryReducer.history);
      history('/projectmanagement');
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}

//Saga dùng để get all project từ api
//Danh - Code ngày 24/02/2022

function* getListProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );

    //Sau khi lấy dữ liệu từ api về thành công
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_LIST_PROJECT_SUCCESS',
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

//UpdateProject
function* updateProjectSaga(action) {
  // console.log('action123',action);
  // return;
  //HIỂN THỊ LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.prjUpdate)
    );
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);

      // history.push('/projectmanagement');
    }
    // yield put({
    //     type:'GET_LIST_PROJECT_SAGA'
    // })

    // yield put tương tự như dispatch
    // yield call chỉ gọi lại saga
    // thông thường dùng yield put hơn, yield call ko thực hiện dispatch
    yield call(getListProjectSaga);
    yield put({
      type: 'CLOSE_DRAWER',
    });
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}
