import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prompt } from './RouterPrompt';

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: '',
    passWord: '',
    isDirty: false,
  });
  let navigate = useNavigate();
  console.log(userLogin);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    /** 
     * Cách 1 - tường minh, chia nhỏ
    let valid = true;
    // Nếu có bất cứ field nào còn chuỗi trắng -> ko valid
    for (let key in newUserLogin) {
      if (key !== 'isDirty') {
        if (newUserLogin[key].trim() === '') {
          valid = false;
        }
      }
    }
    // Quét hết các field ko còn chuỗi trắng -> valid vẫn giữ true

    // Nếu valid là true -> tức 2 field đã dirty - touch có value 
    // -> isDirty là false, prompt sẽ ko bật
    // Nếu 1 trong 2 field chưa dirty - valid false - isDirty true - prompt bật

    if (!valid) {
      console.log('valid - isDirty true:', valid);
      newUserLogin.isDirty = true;
    } else {
      newUserLogin.isDirty = false;
    }

    setUserLogin(newUserLogin);
    */

    // Cách 2 viết ngắn gọn, dùng every
    newUserLogin.isDirty = Object.entries(newUserLogin).every(
      ([key, value]) => key === 'isDirty' || value.trim() !== ''
    );
    // Cách 2 viết ngắn gọn

    setUserLogin(newUserLogin);
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
      localStorage.setItem('userLogin', JSON.stringify(userLogin));

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
        <Prompt
          when={!userLogin.isDirty}
          message={'Bạn có chắc muốn rời khỏi trang này !'}
        />
      </form>
      <div className="container">
        <button onClick={() => navigate(-2)}>Go 2 pages back</button>
        <button onClick={() => navigate(-1)}>Go back</button>
        <button onClick={() => navigate(1)}>Go forward</button>
        <button onClick={() => navigate(2)}>Go 2 pages forward</button>
      </div>
    </>
    // https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory
    // Chú ý nếu gõ trực tiếp đường dẫn thì sẽ ko lưu lại history -> 1 stack mới
  );
  /**
   * // https://codesandbox.io/s/react-router-preventing-transitions-custom-modal-with-hooks-l215t?file=/example.js:1246-1269
   * -> manual fix, dài
   * https://codesandbox.io/s/react-router-6-use-prompt-use-blocker-kce6k?file=/example.js
   * https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect-hook?rq=1
   *
   * ===========================================================
   *
   * -> fix thuần nhưng khó hiểu
   * https://stackoverflow.com/questions/62792342/in-react-router-v6-how-to-check-form-is-dirty-before-leaving-page-route
   * -> hackfix, lấy code beta tự manual thêm lại
   *
   * ===========================================================
   * https://github.com/remix-run/react-router/issues/8139
   * https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
   */
}
