import { RENDER_TASK } from '../constants/ToDoListConst';

const initialState = {
  taskList: [],
};

const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case RENDER_TASK:
      state.taskList = action.taskList;
      return { ...state };

    default:
      return state;
  }
};

export default ToDoListReducer;
