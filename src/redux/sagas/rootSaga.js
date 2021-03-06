import { all, fork } from 'redux-saga/effects';
import * as ToDoListSaga from './ToDoListSaga';
// Hoặc có thể viết kiểu destructering bình thường như dòng import trên
import * as CybugsUser from './Cyberbugs/UserCyberbugsSaga';
import * as CybugsPrjCategories from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';

// các action bình thường vẫn chia để riêng ra,
// Saga chỉ qản lý riêng các action saga (dispatch function)
// Khác với thunk vẫn để chung với các action bình thường
export function* rootSaga() {
  //   console.log('rootSaga');

  yield fork(ToDoListSaga.getTaskApiWithTake);
  // non blocking chạy k cần chờ
  // https://redux-saga.js.org/docs/api#forkfn-args

  console.log('done yield fork getTaskApiWithTake');

  // https://redux-saga.js.org/docs/api/#alleffects---parallel-effects
  yield all([
    //Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTask(),
    ToDoListSaga.theoDoiActionToggleTask(),

    //Nghiệp vụ cyberbugs .... ,
    CybugsUser.theoDoiSignIn(),
    CybugsUser.theoDoiGetUser(),
    CybugsUser.theoDoiAddUserProject(),
    CybugsUser.theoDoiRemoveUserProject(),
    CybugsUser.theoDoiGetUserByProjectIdSaga(),

    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),
    PrioritySaga.theoDoiGetAllPriority(),

    CybugsPrjCategories.theoDoigetAllProjectCategory(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
  ]);

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
    all	            Blocks if there is a blocking effect 
                    in the array or object
                    
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
