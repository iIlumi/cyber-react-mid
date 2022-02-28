import React from 'react';
const initialState = {
  visible: false,
  title: '',
  ComponentContentDrawer: <p>default</p>,
  // ComponentContentDrawer: (props) => {
  //   console.log('ComponentContentDrawer props: ', props);
  //   return <p>default</p>;
  // },
  callBackSubmit: (propsValue) => {
    // Hàm tên trong có thể để trống
    alert('click demo!');
  },
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return { ...state, visible: true };
    case 'CLOSE_DRAWER':
      return { ...state, visible: false };
    case 'OPEN_FORM_EDIT_PROJECT': {
      // Ghi cách này sẽ mod từng thuộc tính rồi tạo copy sau
      // ko cần tạo 1 obj trung gian
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case 'SET_SUBMIT_EDIT_PROJECT': {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    default:
      return state;
  }
};
