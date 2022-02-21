import { GET_ALL_PRJ_CATEGORY_SUCCESS } from '../constants/Cyberbugs/Cyberbugs';

const stateDefault = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PRJ_CATEGORY_SUCCESS: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }

    default:
      return state;
  }
};
