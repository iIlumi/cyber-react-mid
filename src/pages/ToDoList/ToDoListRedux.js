import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListApi } from '../../redux/actions/ToDoListAction';


const url = 'http://svcy.myclass.vn/api/ToDoList/';

export default function ToDoListRFC() {
  //Lấy tasklist từ redux về
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();

  let [state, setState] = useState({
    // taskList sẽ lấy từ store redux
    // taskList: [],
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  useEffect(() => {
    getTaskList();

    return () => {};
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(value, name);

    const newValues = { ...state.values, [name]: value };
    const newErrors = { ...state.errors };

    const regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === '') {
      newErrors[name] = name + ' invalid !';
    } else {
      newErrors[name] = '';
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const addTask = (e) => {
    e.preventDefault(); //Chặn sự kiện reload lại trang
    console.log(state.values.taskName);

    let promise = Axios({
      url: url + 'AddTask',
      method: 'POST',
      data: { taskName: state.values.taskName },
    });

    promise
      .then((result) => {
        // alert(result.data);
        getTaskList();
      })
      .catch((errors) => {
        alert(errors.response.data);
      });
  };

  const delTask = (taskName) => {
    let promise = Axios({
      url: `${url}deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    });

    console.log('promise:', promise);
    promise
      .then((result) => {
        alert(result.data);
        getTaskList();
      })
      .catch((errors) => {
        alert(errors.response.data);
      });
  };

  const toggleTaskStatus = (taskName, status) => {
    let promise = Axios({
      url: `${url}${status ? 'rejectTask' : 'doneTask'}?taskName=${taskName}`,
      method: 'PUT',
    });

    promise.then((res) => {
      alert(res.data);
      getTaskList();
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  const renderTaskList = (taskStatus) => {
    return taskList
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
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  toggleTaskStatus(item.taskName, taskStatus);
                }}
              >
                {taskStatus ? (
                  // Ở đây phải đè lại css - hoặc có thể làm như rcc
                  <i className="fas fa-undo d-block" />
                ) : (
                  <i className="far fa-check-circle" />
                )}
              </button>
            </div>
          </li>
        );
      });
  };

  return (
    <div className="card">
      <Helmet>
        <link rel="stylesheet" href="/cssHelmet/Todolist.css" />
      </Helmet>
      <div className="card__header">
        <img src={require('./bg.png')} />
      </div>
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks RFC</h2>
            <p>September 9,2020</p>
          </div>
          <div className="form-group">
            <div className="card__add">
              <input
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
                name="taskName"
                onChange={handleChange}
              />
              <button id="addItem" type="submit" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <span className="text text-danger">{state.errors.taskName}</span>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskList(false)}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskList(true)}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
