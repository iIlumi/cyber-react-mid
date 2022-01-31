// import Axios from 'axios';
import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import { toDoListService } from '../../services/ToDoListService';
import { GET_TASK_API } from '../constants/ToDoListConst';

// const url = 'http://svcy.myclass.vn/api/ToDoList/';

/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

    Ở đây demo saga nên nhết vô chung rootsaga
    thực chất action saga có thể để chung action creator bình thường vẫn được

*/

// Cheatsheet saga blocking - non-blocking
// https://redux-saga.js.org/docs/api#blocking--non-blocking

export function* getTaskApiWithTake() {
  while (true) {
    yield take('getTaskApiActionWithTake');
    // theo dõi action -> xem action nào dispatch mới làm các công việc bên dưới
    // https://redux-saga.js.org/docs/api#takepattern
    console.log('getTaskApi');
    // call api dispatch lên reducer ....

    // Code vậy sẽ chạy xen kẽ
    yield take('getTaskApiActionWithTake');
    console.log('getTaskApi2');
  }
}

// =========================================================================
/**
 *
 * https://redux-saga.js.org/docs/api/#callfn-args
 * https://redux-saga.js.org/docs/api/#putaction
 * https://redux-saga.js.org/docs/api#takelatestpattern-saga-args
 *
 * TakeEvery, takeLatest phải truyền para thứ 2 là saga func gen
 *
 */

function* getTaskApiAction(action) {
  //put giống dispatch action
  yield put({
    type: 'DISPLAY_LOADING',
  });

  yield delay(1000);

  console.log('action getTaskApiAction:', action);

  // Tại sao phải yield call mà ko gọi bình thường
  const { data, status } = yield call(
    // nên tách các axios ra mục service chung
    // () => {
    // return Axios({
    //   url: url + 'GetAllTask',
    //   method: 'GET',
    // });
    // }
    // Chú ý là gọi instance từ class chứ ko phải là ToDoService
    // (toDo viết thường)
    // Call nhận callback nên ko có ()
    toDoListService.getTaskApi
  );
  //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });

  yield put({
    type: 'HIDE_LOADING',
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest('getTaskApiAction', getTaskApiAction);
}