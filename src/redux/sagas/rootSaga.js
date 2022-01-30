import { fork, take } from 'redux-saga/effects';
/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

    Ở đây demo saga nên nhết vô chung rootsaga
    thực chất action saga có thể để chung action creator bình thường vẫn được

*/

function* getTaskApi() {
  while (true) {
    yield take('getTaskApiAction');
    // theo dõi action -> xem action nào dispatch mới làm các công việc bên dưới
    // https://redux-saga.js.org/docs/api#takepattern
    console.log('getTaskApi');
    // call api dispatch lên reducer ....

    // Code vậy sẽ chạy xen kẽ
    // yield take('getTaskApiAction');
    // console.log('getTaskApi2');
  }
}

// các action bình thường vẫn chia để riêng ra,
// Saga chỉ qản lý riêng các action saga (dispatch function)
// Khác với thunk vẫn để chung với các action bình thường
export function* rootSaga() {
  console.log('rootSaga');

  yield fork(getTaskApi); //non blocking chạy k cần chờ
  console.log('done getTaskApi');
}
