import { baseService } from './baseService';

export class ProjectService extends baseService {
  //   Đúng chuẩn ES6 thì phải construct nhưng ì ko có gì đặc biệt
  //   -> useless construct ESlint warning
  //   constructor() {
  //     super();
  //   }

  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };

  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const projectService = new ProjectService();
// Cũng có thể khởi tạo 1 biến trước rồi gọi bằng cách truyền tham số trực tiếp
