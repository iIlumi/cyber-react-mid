import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  console.log('Profile:');
  let navigate = useNavigate();
  if (localStorage.getItem('userLogin')) {
    return <div>profile</div>;
  } else {
    alert('Vui lòng đăng nhập để vào trang này !');
    // console.log('Vui lòng đăng nhập để vào trang này !')
    // navigate('/home');
    // return <Redirect to="/login" />;
    // return () => {
    //   navigate('/home', { replace: true });
    // };
    // Các option trên đều ko hoạt động được -> báo lỗi, ko navigate
    // option setTimeout sẽ bị flash vào option -> có dấu hiệu vulnerability
    // v6 vẫn chưa ổn định, quá mới
    // https://github.com/remix-run/react-router/issues/7460#issuecomment-988642684
    return setTimeout(() => {
      navigate('/home');
    },0);
  }
  /**
   * v6 ko còn Redirect mà thay bằng useNavigate
   * https://reactrouter.com/docs/en/v6/api#usenavigate
   */
}
