import { LOGIN_SUCCESS } from '../constants/Cyberbugs/Cyberbugs';
import { GET_USER_BY_PROJECT_ID } from '../constants/Cyberbugs/UserConstants';

const { USER_LOGIN } = require('../../util/constants/settingSystem');

// Cách viết bên ngoài vậy vẫn chạy được
let userLoginInfo = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLoginInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
}

// let userLoginInfo = localStorage.getItem(USER_LOGIN)
//   ? JSON.parse(localStorage.getItem(USER_LOGIN))
//   : {};

const stateDefault = {
  userLoginInfo: userLoginInfo,
  userSearch: [], //Array user để add vào project tổng
  arrUser: [], //Array user cho thẻ select create task trong 1 prj
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      state.userLoginInfo = action.userLoginInfo;
      return { ...state };
    }

    case 'GET_USER_SEARCH': {
      state.userSearch = action.lstUserSearch;
      console.log('stateUser', state);
      return { ...state };
    }

    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }

    default:
      return state;
  }
};
