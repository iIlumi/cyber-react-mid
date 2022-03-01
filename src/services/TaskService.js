import { baseService } from './baseService';

export class TaskService extends baseService {
  //   constructor() {
  //     super();
  //   }
  createTask = (taskObject) => {
    return this.post('Project/createTask', taskObject);
  };

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
}

export const taskService = new TaskService();
