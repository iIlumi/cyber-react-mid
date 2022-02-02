import React from 'react';
import { withFormik } from 'formik';

export default function Home(props) {
  console.log('Home(props):', props);

  return (
    <div>
      {/*  */}
      trang chủ
      
    <MyEnhancedForm />
    </div>
  );
}

function MyForm(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
  props;
  console.log('touched:', touched)
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
