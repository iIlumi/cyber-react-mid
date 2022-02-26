import { LOGIN_SUCCESS } from '../constants/Cyberbugs/Cyberbugs';

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
  userSearch: [],
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

    default:
      return state;
  }
};
