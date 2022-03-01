import { call, put, select, takeLatest } from 'redux-saga/effects';
import { taskService } from '../../../services/TaskService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import {
  GET_TASK_DETAIL_SAGA,
  GET_TASK_DETAIL,
  UPDATE_STATUS_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  CHANGE_TASK_MODAL,
  ADD_ASSIGNESS,
  REMOVE_USER_ASSIGN,
} from '../../constants/Cyberbugs/TaskConstants';

function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: 'CLOSE_DRAWER',
    });
    notifiFunction('success', 'Create task successfully !');
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);
}

function* getTaskDetailSaga(action) {
  const { taskId } = action;

  try {
    const { data } = yield call(() => taskService.getTaskDetail(taskId));

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiGetTaskDetailSaga(action) {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

//update task

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  console.log(action);
  try {
    //Cập nhật api status cho task hiện tại (Task đang mở modal)
    const { status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task
    // console.log(data)
    if (status === STATUS_CODE.SUCCESS) {
      // Ở đâ chỉ mới refresh taskDetail ở phía sau
      // Tuy nhiên sẽ có hiệu ứng loading ngầm của Get project detail ban đầu
      yield put({
        type: 'GET_PROJECT_DETAIL',
        projectId: taskUpdateStatus.projectId,
      });

      // Do Modal-Task detail là binding data nên phải gọi lại để update
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

export function* handelChangePostApi(action) {
  // console.log('abc', action)
  //Gọi action làm thay đổi taskDetail modal
  const { type, actionType, ...action_payload } = action;
  action_payload.type = actionType;

  console.log(
    '🚀 ~ file: TaskSaga.js ~ line 108 ~ action_payload',
    action_payload
  );

  switch (actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;

        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;

    case ADD_ASSIGNESS:
      yield put(action_payload);
      break;

    case REMOVE_USER_ASSIGN:
      yield put(action_payload);
      break;

    default:
      break;
  }

  //Save qua api updateTaskSaga
  //Lây dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log(
    '🚀 ~ file: TaskSaga.js ~ line 142 ~ taskDetailModal',
    taskDetailModal
  );
  // console.log('taskDetailModal sau khi thay đổi', taskDetailModal);

  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

  const taskUpdateApi = {
    ...taskDetailModal,
    listUserAsign: taskDetailModal.assigness?.map((user) => {
      return user.id;
    }),
  };

  // Đẩy dữ liệu lên API cho BE
  try {
    const { status } = yield call(() => taskService.updateTask(taskUpdateApi));

    if (status === STATUS_CODE.SUCCESS) {
      // update project detail tổng
      yield put({
        type: 'GET_PROJECT_DETAIL',
        projectId: taskUpdateApi.projectId,
      });

      // Update task detail trên HOC-Modal
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
  }
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}

// BUG 
// ko đủ quyền truy cập, dispatch BE fail nhưng redux vẫn ăn !!!