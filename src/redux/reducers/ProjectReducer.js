const initialState = {
  projectEdit: {
    id: 0,
    projectName: 'string prjName',
    creator: 0,
    description: '<h1>string description</h1>',
    categoryId: '2',
  },
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
