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
}

// Gom export và khởi tạo cùng lúc, viết riêng vẫn ok
export const toDoListService = new ToDoListService();
