import React, { Component } from 'react';
// import style from './Todolist.css';
// Cách dùng style vẫn ăn hết ?!
// import './Todolist.css';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

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

  // http://svcy.myclass.vn/swagger

  getTaskList = () => {
    let promise = Axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
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
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
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

  renderTaskList = (taskStatus) => {
    return this.state.taskList
      .filter((item) => item.status === taskStatus)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete">
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
