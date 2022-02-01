import React from 'react';

const stateDefault = {
  Component: <p>Nội dung mặc định</p>,
};

export const ModalReducer = (state = stateDefault, action) => {
  switch (action.type) {
    //   state.Component = action.Component;
    case 'OPEN_FORM':
      return { ...state, Component: action.Component };

    default:
      return state;
  }
};
