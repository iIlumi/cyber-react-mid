// export const actionName = (payload) => ({
//   type: type,
//   payload,
// });

import Axios from 'axios';
import { GET_TASK_API } from '../constants/ToDoListConst';
import Profile from '../../pages/Profile/Profile';

/**
 *
 * Có thể viết gọn lại thành function = (para) => dispatch => {}
 * Hiểu ngầm vế sau chính là retrun về function dishpatch:
 * => (dispatch => {})
 *
 *
 * Action có 2 loại
 * Action thực thi ngay làm thay đổi reducer (action 1)
 * Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)
 *
 */
const url = 'http://svcy.myclass.vn/api/ToDoList/';

export const getTaskListApi = () => {
  //Tiền xử lý dữ liệu => xử lý function
  // thực tế quá trình tiền xử lý viết bên trong hàm dispatch return vẫn ok
  // Quan trọng là lần dispatch cuối
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: url + 'GetAllTask',
        method: 'GET',
      });

      dispatch({
        type: GET_TASK_API,
        taskList: data,
      });
    } catch (err) {
      console.log('thất bại');
      console.log(err.response.data);
    }
  };
};

export const addTaskApi = (taskName) => async (dispatch) => {
  try {
    const res = await Axios({
      url: url + 'AddTask1sda',
      method: 'POST',
      data: { taskName: taskName },
    });
    console.log('res:', res);
    // Khi async await thì đã trả về trực tiếp res hoặc err
    // ko còn là promise nữa
    // Đối với axios thì sẽ là trả về res, phải catch err

    // getTaskListApi()
    // Nếu gọi trực tiếp sẽ ko được
    // Chú ý đây chỉ là function creator,
    // phải lấy dispatch khi gọi trong ToDoListRedux
    //  bản thân ko hiểu dispatch

    // Thực ra cũng ko cần check Status 200
    res.status === 200 && dispatch(getTaskListApi());
  } catch (errors) {
    console.log('thất bại');
    console.log('errors:', [errors]);
    console.log(errors.response.data);
    alert(errors.response.data);
  }
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
