import Axios from 'axios';
import { DOMAIN } from '../util/constants/settingSystem';

// http://svcy.myclass.vn/swagger/ui/index

export class ToDoListService {
  // constructor() {}

  getTaskApi = () => {
    return Axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: 'GET',
    });
  };

  addTaskApi = (taskName) => {
    return Axios({
      url: `${DOMAIN}/ToDoList/addTask`,
      method: 'POST',
      data: {
        taskName: taskName,
      },
    });
  };

  deleteTaskApi = (taskName) =>
    Axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    });

  toggleTaskApi = (taskName, status) =>
    status
      ? Axios({
          url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
          method: 'PUT',
        })
      : Axios({
          url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
          method: 'PUT',
        });
}

// Gom export và khởi tạo cùng lúc, viết riêng vẫn ok
export const toDoListService = new ToDoListService();
