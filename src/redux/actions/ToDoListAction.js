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
