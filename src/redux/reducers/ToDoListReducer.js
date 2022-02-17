// import { USER_SIGNIN_API } from '../constants/Cyberbugs/Cyberbugs';
import { RENDER_TASK } from '../constants/ToDoListConst';

const initialState = {
  taskList: [],
};

const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case RENDER_TASK:
      state.taskList = action.taskList;
      return { ...state };

    // Chú ý : ko được để trùng case trong reducer thường và saga
    // Vì khi dispatch lên sẽ vô cùng lúc cả 2

    
    // Các type có dính tới API sẽ đua vào Saga hết
    // TH render task ở trên là ngoại lệ, 
    // vẫn gọi API nhưng vì demo prj trước chưa dùng tới saga
    // 
    // case USER_SIGNIN_API:
    //   console.log('USER_SIGNIN in reducer!')
    //   return { ...state };

    default:
      return state;
  }
};

export default ToDoListReducer;
