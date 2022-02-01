import React from 'react';
import { useDispatch } from 'react-redux';
import SlideDown from '../../HOC/Modal/SlideDown';
import Login from '../Login/Login';
import Register from '../Register/Register';

// const LoginWithSlideDown = () => new SlideDown(Register);
// như nhau,
// const LoginWithSlideDown = function () {
//   return new SlideDown(Register);
// };

export default function DemoHOCModal() {
  const dispatch = useDispatch();

  // tuy nhiên nếu viết dạng nêu obj, 
  //  bắt buộc phải đưa vào trong
  // Để sử dụng được hooks của React từ DemoHOCModal -> scope
  const LoginWithSlideDown = new SlideDown(Register);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {
          dispatch({
            type: 'OPEN_FORM',
            Component: <Login />,
          });
        }}
      >
        Đăng nhập
      </button>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {
          dispatch({
            type: 'OPEN_FORM',
            Component: <Register />,
          });
        }}
      >
        Đăng ký
      </button>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {
          console.log('empty onClick');
        }}
      >
        WARNING
      </button>
      <div className="w-50 mx-auto">
        {/* <LoginWithSlideDown /> */}
        {LoginWithSlideDown}
      </div>
    </div>

    /**
     *
     * Cẫn thận modal BS vs React
     *
     * Ở đây chỉ có 1 modal nên khi redux đã bind Component lần đầu xong
     * Các button rỗng tiếp theo ko dispatch modal mới thì sẽ nhấn theo modal hiện tại #modelId"
     * -> ko phải bug
     *
     * Dispatch chỉ có tác dụng update modal mới
     * Việc chỉ dùng 1 loại form duy nhất phải cẩn thận
     * mỗi lần click đều phải bind lại modal
     *
     */
  );
}
