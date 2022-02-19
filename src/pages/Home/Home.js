import React from 'react';
import { withFormik } from 'formik';
import { useSelector } from 'react-redux';

export default function Home(props) {
  // Thực ra có thể check trực tiếp ở localStorage chứ ko qua store
  const userLoginInfo = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLoginInfo
  );

  console.log('Home(props):', props);

  return (
    <div>
      Trang chủ
      <MyEnhancedForm />
      {userLoginInfo?.name}
      <img src={userLoginInfo?.avatar} />
    </div>
  );
}

function MyForm(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  console.log('values:', values);
  console.log('touched:', touched);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        name="name"
      />
      {touched.name && <div id="feedback">{errors.name}</div>}
      <button type="submit">Submit</button>
      <h3></h3>
    </form>
  );
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ name: '' }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
})(MyForm);
