import {
  LockOutlined,
  //   FacebookOutlined,
  TwitterOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { signInCyberbugAction } from '../../../redux/actions/CyberBugsActions';

function LoginCyberBugs(props) {
  // console.log('props LoginCyberBugs:', props);
  const {  touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  // touched phải sử dụng chung vói handleBlur,
  // Tuy nhiên gây ra re-render quá nhiều
  // console.log('touched:', touched);
  // console.log('values:', values);
  return (
    <form
      onSubmit={(ev) => {
        console.log('submit form');
        handleSubmit();
        ev.preventDefault();
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
        <h4 className="text-center font-weight-normal">cyberlearn@gmail.com</h4>
        <h4 className="text-center font-weight-normal">123456</h4>

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
            onBlur={handleBlur}
          />
        </div>
        {touched.email && <div className="text-danger">{errors.email}</div>}
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
        <div className="text-danger">{errors.password}</div>
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

  // https://formik.org/docs/api/withFormik#the-formikbag
  // Việc truyền props của redux vào có thể đọc trong docs
  // setSubmitting() đọc trong link docs trên
  // Tuy nhiên trong saga ta đã chặn submit manual lại nên cũng ko cần
  handleSubmit: (values, { props, setSubmitting }) => {
    // Có thể destruct email, password ở trên
    // setSubmitting(true);

    props.dispatch(signInCyberbugAction(values.email, values.password));

    console.log('props:', props);
    // console.log('setSubmitting:', setSubmitting)
    console.log('formik handlesubmit', values);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  },

  displayName: 'LoginCyberBugs',

  // =====================================================

  // https://formik.org/docs/guides/validation#displaying-error-messages
  // https://www.npmjs.com/package/yup

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Email is required!')
      .email('email is invalid!'),
    password: Yup.string()
      .required('Password is required!')
      .min(6, 'password must have min 6 characters')
      .max(32, 'password  have max 32 characters'),
  }),
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
