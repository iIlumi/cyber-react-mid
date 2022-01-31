import Axios from 'axios';
import { DOMAIN } from '../util/constants/settingSystem';

export class ToDoListService {
  constructor() {}

  getTaskApi = () => {
    return Axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: 'GET',
    });
  };
}

// Gom export và khởi tạo cùng lúc, viết riêng vẫn ok
export const toDoListService = new ToDoListService();
