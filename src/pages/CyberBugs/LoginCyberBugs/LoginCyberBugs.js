import {
  LockOutlined,
  //   FacebookOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { withFormik } from 'formik';

function LoginCyberBugs(props) {
  // console.log('props LoginCyberBugs:', props);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={(ev) => {
        console.log('submit form');
        handleSubmit();
        ev.preventDefault()
      }}
      // Nếu viết kiểu trên sẽ sub và reload
      // onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          Login CyberBugs
        </h3>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            autoComplete="current-email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="d-flex mt-3">
          <Input
            onChange={(e) => handleChange(e)}
            style={{ width: '100%', minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            autoComplete="current-password"
            prefix={<LockOutlined />}
          />
        </div>

        <Button
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: 'rgb(102,117,223)',
            color: '#fff',
          }}
          className="mt-5"
          htmlType="submit"
        >
          Login
        </Button>

        <div className="social mt-3 d-flex">
          <Button
            style={{ backgroundColor: 'rgb(59,89,152)' }}
            shape="circle"
            size={'large'}
          >
            <span className="font-weight-bold" style={{ color: '#fff' }}>
              F
            </span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size={'large'}
          ></Button>
        </div>
      </div>
    </form>
  );
}

// https://formik.org/docs/api/withFormik#example
// Formik là HOC
//  Tương tự mapStatToProps
const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  // Custom sync validation
  // validate: (values) => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = 'Required';
  //   }

  //   return errors;
  // },
  // Sử dụng yup để validate

  // =====================================================
  // HOC withFormik ko hỗ trợ handleChange
  // handChange trong propsToValue chỉ có tác dụng setValue Formik

  // handleChange: (values) => {
  //   console.log('formik hand change:');
  //   console.log(values);
  // },
  // =====================================================

  handleSubmit: (values, { setSubmitting }) => {
    console.log('formik handlesubmit', values);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  },

  displayName: 'LoginCyberBugs',
})(LoginCyberBugs);

export default LoginCyberBugsWithFormik;
