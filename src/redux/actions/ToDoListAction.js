// export const actionName = (payload) => ({
//   type: type,
//   payload,
// });

import Axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConst';

/**
 * Có thể viết gọn lại thành function = (para) => dispatch => {}
 * Hiểu ngầm vế sau chính là retrun về function dishpatch:
 * => (dispatch => {})
 */
const url = 'http://svcy.myclass.vn/api/ToDoList/';

export const getTaskListApi = () => {
  //Tiền xử lý dữ liệu => xử lý function
  return (dispatch) => {
    let promise = Axios({
      url: url + 'GetAllTask',
      method: 'GET',
    });

    promise
      .then((result) => {
        console.log(result.data);
        dispatch({
          type: GET_TASK_API,
          taskList: result.data,
        });

        console.log('thành công');
      })
      .catch((err) => {
        console.log('thất bại');
        console.log(err.response.data);
      });
  };
};

export const addTaskApi = (taskName) => (dispatch) => {
  Axios({
    url: url + 'AddTask',
    method: 'POST',
    data: { taskName: taskName },
  })
    .then(() => {
      // getTaskListApi()
      // Nếu gọi trực tiếp sẽ ko được
      // Chú ý đây chỉ là function creator,
      // phải lấy dispatch khi gọi trong ToDoListRedux
      //  bản thân ko hiểu dispatch
      dispatch(getTaskListApi());
    })
    .catch((errors) => {
      alert(errors.response.data);
    });
};

export const delTaskApi = (taskName) => (dispatch) => {
  Axios({
    url: `${url}deleteTask?taskName=${taskName}`,
    method: 'DELETE',
  })
    .then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    })
    .catch((errors) => {
      alert(errors.response.data);
    });
};

export const toggleTaskStatusApi = (taskName, status) => (dispatch) => {
  Axios({
    url: `${url}${status ? 'rejectTask' : 'doneTask'}?taskName=${taskName}`,
    method: 'PUT',
  })
    .then((res) => {
      alert(res.data);
      //   getTaskList();
      dispatch(getTaskListApi());
    })
    .catch((err) => {
      alert(err.response.data);
    });
};
