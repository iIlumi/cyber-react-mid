import Axios from 'axios';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { GET_TASK_API } from '../constants/ToDoListConst';

const url = 'http://svcy.myclass.vn/api/ToDoList/';

/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

    Ở đây demo saga nên nhết vô chung rootsaga
    thực chất action saga có thể để chung action creator bình thường vẫn được

*/

// Cheatsheet saga blocking - non-blocking
// https://redux-saga.js.org/docs/api#blocking--non-blocking

function* getTaskApiWithTake() {
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

function* getTaskApi(action) {
  const { data, status } = yield call(() => {
    return Axios({
      url: url + 'GetAllTask',
      method: 'GET',
    });
  });
  //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

// các action bình thường vẫn chia để riêng ra,
// Saga chỉ qản lý riêng các action saga (dispatch function)
// Khác với thunk vẫn để chung với các action bình thường
export function* rootSaga() {
  //   console.log('rootSaga');

  yield fork(getTaskApiWithTake);
  // non blocking chạy k cần chờ
  // https://redux-saga.js.org/docs/api#forkfn-args

  console.log('done yield fork getTaskApiWithTake');

  yield takeLatest('getTaskApiAction', getTaskApi);

  console.log('final root saga');
}

/**
 * 
 * Blocking / Non-blocking​
 * 
    Name	Blocking
    
    call            Yes
    delay           Yes
    take            Yes
    
    fork            No
    takeEvery	    No
    takeLatest	    No
    put             No

    takeLeading     No
    throttle        No
    debounce        No
    retry           Yes
    takeMaybe       Yes
    putResolve      Yes
    apply           Yes
    cps             Yes
    spawn           No
    join            Yes
    cancel          No
    select          No
    actionChannel   No
    flush           Yes
    cancelled       Yes
    race            Yes

 */
