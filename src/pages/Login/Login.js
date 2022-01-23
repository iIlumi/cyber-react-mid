import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({ userName: '', passWord: '' });
  let navigate = useNavigate();
  console.log(userLogin);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      userLogin.userName === 'reactrouter' &&
      userLogin.passWord === 'reactrouter'
    ) {
      //Thành công thì chuyển về trang trước đó
      // props.history.goBack();
      //Chuyển đến trang chỉ định sau khi xử lý
      // Chuyển hướng đến path tương ứng
      //  props.history.push('/home');

      //replace thay đổi nội dung path tương ứng
      // rops.history.replace('/home');
      navigate('/home');

      // =========================
      //   old react v5
      //==========================
      /**
       * https://v5.reactrouter.com/web/api/history
       * https://stackoverflow.com/questions/63597215/how-to-use-history-instance-while-using-react-routers-v6
       *
       */
    } else {
      alert('Login fail !');
      return;
    }
  };

  return (
    <>
      <form className="container" onSubmit={handleLogin}>
        <h3 className="display-4">Login reactrouter</h3>
        <div className="form-group">
          <p>User Name</p>
          <input
            name="userName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            name="passWord"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Đăng nhập</button>
        </div>
      </form>
      <div className="container">
        <button onClick={() => navigate(-2)}>Go 2 pages back</button>
        <button onClick={() => navigate(-1)}>Go back</button>
        <button onClick={() => navigate(1)}>Go forward</button>
        <button onClick={() => navigate(2)}>Go 2 pages forward</button>
      </div>
    </>
    // https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory
  );
}
