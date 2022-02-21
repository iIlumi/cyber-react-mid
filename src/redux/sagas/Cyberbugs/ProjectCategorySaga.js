import { call, put, takeLatest } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PRJ_CATEGORY_SAGA, GET_ALL_PRJ_CATEGORY_SUCCESS } from '../../constants/Cyberbugs/Cyberbugs';

function* getAllProjectCategorySaga(action) {
  console.log('getAllProjectCategorySaga', action);

  try {
    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );

    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRJ_CATEGORY_SUCCESS,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoigetAllProjectCategory() {
  yield takeLatest(GET_ALL_PRJ_CATEGORY_SAGA, getAllProjectCategorySaga);
}
