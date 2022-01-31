// import Axios from 'axios';
import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import { toDoListService } from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import {
  ADD_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  RENDER_TASK,
  TOGGLE_TASK_API,
} from '../constants/ToDoListConst';

// const url = 'http://svcy.myclass.vn/api/ToDoList/';

/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

    Ở đây demo saga nên nhết vô chung rootsaga
    thực chất action saga có thể để chung action creator bình thường vẫn được

*/

// Cheatsheet saga blocking - non-blocking
// https://redux-saga.js.org/docs/api#blocking--non-blocking

/*
    31/01/2021 Danh viết chức năng getTask
    Action saga lấy danh sách task từ api 
*/

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
    type: DISPLAY_LOADING,
  });

  try {
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
    yield delay(1000);

    // Thật ra ở đây sẽ catch được TH api đúng url nhưng status # 200
    if (status !== STATUS_CODE.SUCCESS) {
      console.log('STATUS_CODE error');
    }

    console.log('action getTaskApiAction:', action);
    //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
    yield put({
      type: RENDER_TASK,
      taskList: data,
    });

    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    console.log('err');
  }
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

/*
    31/01/2021 Danh viết chức năng getTask
    Action saga lấy danh sách task từ api 
*/

function* addTaskApiAction(action) {
  console.log(' addTaskApiAction(action):', action);
  const { taskName } = action;
  //Gọi api
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });

    console.log('data:', data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    } else {
      console.log('STATUS_CODE error');
    }
  } catch (err) {
    //
    console.log(err);
  }
  //Hiển thị loading
  //thành công thì load lại task = cách gọi lại action saga load tasklist
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

/*
    01/02/2022 Danh viết chức năng deleteTask
    Action saga nghiệp vụ xóa task
*/

function* deleteTaskApi(action) {
  console.log('deleteTaskApi(action):', action);
  const { taskName } = action;
  try {
    //Gọi api deletetask
    const { status } = yield call(() => {
      // console.log('data:', data)
      // log data giống lúc add sẽ ko có
      // vì api delete trả về object ko có data -> error
      return toDoListService.deleteTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      //Nếu thành công thì gọi lại action GET_TASKLIST_API(action saga thực thi)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionDeleteTask() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

/*
    01/02/2022 Danh viết chức năng toggleTask
    Action saga nghiệp vụ toggle status complete <-> toDo
    try - assume no 2xx code except 200
*/

function* toggleTaskApi({ taskName, status }) {
  try {
    yield call(() => toDoListService.toggleTaskApi(taskName, status));
    yield put({ type: GET_TASKLIST_API });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionToggleTask() {
  yield takeLatest(TOGGLE_TASK_API, toggleTaskApi);
}
