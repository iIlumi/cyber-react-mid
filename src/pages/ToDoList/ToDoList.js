import React, { Component } from 'react';
// import style from './Todolist.css';
// Cách dùng style vẫn ăn hết ?!
// import './Todolist.css';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

const url = 'http://svcy.myclass.vn/api/ToDoList/';
// http://svcy.myclass.vn/swagger

export default class ToDoList extends Component {
  state = {
    taskList: [],
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  };

  getTaskList = () => {
    let promise = Axios({
      url: url + 'GetAllTask',
      method: 'GET',
    });

    promise.then((result) => {
      console.log(result.data);
      //Nếu gọi api lấy về kết quả thành công
      //=> set lại state của component
      this.setState({
        taskList: result.data,
      });

      console.log('thành công');
    });

    promise.catch((err) => {
      console.log('thất bại');

      console.log(err.response.data);
    });
  };
  
  componentDidMount = () => {
    this.getTaskList();
  };

  // Pattern validate get error chung
  handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(value, name);

    const newValues = { ...this.state.values, [name]: value };

    const newErrors = { ...this.state.errors };

    const regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === '') {
      newErrors[name] = name + ' invalid !';
    } else {
      newErrors[name] = '';
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  //   Bug addTask ảnh hưởng vào tất cả button đang có trong form
  addTask = (e) => {
    e.preventDefault(); //Dừng sự kiện submit form
    console.log(this.state.values.taskName);
    console.log('e.target:', e.target);
    let promise = Axios({
      url: url + 'AddTask',
      method: 'POST',
      // Cấu trúc data trong POST phải xem API
      data: { taskName: this.state.values.taskName },
    });

    //Xử lý thành công
    promise.then((result) => {
      // alert(result.data);
      this.getTaskList();
    });

    //Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  //Hàm xử lý xóa task
  delTask = (taskName) => {
    let promise = Axios({
      url: `${url}deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    });

    console.log('promise:', promise);
    promise
      .then((result) => {
        alert(result.data);
        this.getTaskList();
      })
      .catch((errors) => {
        alert(errors.response.data);
      });
  };

  //Hàm toggle task status
  toggleTaskStatus = (taskName, status) => {
    // const urlApi = `${
    //   url + status ? 'rejectTask' : 'doneTask'
    // }?taskName=${taskName}`;
    // url như trên lại ko dùng được -> ko nhận url khai báo

    let promise = Axios({
      url: `${url}${status ? 'rejectTask' : 'doneTask'}?taskName=${taskName}`,
      method: 'PUT',
    });

    promise.then((res) => {
      alert(res.data);
      this.getTaskList();
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  renderTaskList = (taskStatus) => {
    return this.state.taskList
      .filter((item) => item.status === taskStatus)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  //   taskStatus
                  //     ? this.rejectTask(item.taskName)
                  //     : this.checkTask(item.taskName);
                  this.toggleTaskStatus(item.taskName, taskStatus);
                }}
              >
                  {/* Có thể dùng điều kiện để chọn render icon khác nhau mỗi status
                  Ở đây thì tận dụng css và render ẩn icon với status ko đúng
                  */}
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        <div className="card">
          <Helmet>
            <link rel="stylesheet" href="/cssHelmet/Todolist.css" />
          </Helmet>
          <div className="card__header">
            <img src={require('./bg.png')} />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="form-group">
                <div className="card__add">
                  <input
                    id="newTask"
                    type="text"
                    placeholder="Enter an activity..."
                    name="taskName"
                    onChange={this.handleChange}
                  />
                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <span className="text text-danger">
                  {this.state.errors.taskName}
                </span>
              </div>
              <div className="card__todo form-group">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskList(false)}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskList(true)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
