import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

export default function BaiTapToDoListSaga(props) {
  const dispatch = useDispatch();

  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  const getTaskList = () => {};

  useEffect(() => {
    return () => {};
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;

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

  const addTask = (e) => {};

  //Hàm xử lý xóa task
  const delTask = (taskName) => {};

  const toggleTaskStatus = (taskName, status) => {};

  const renderTaskList = (taskStatus) => {
    return state.taskList
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

      <button
        className="btn btn-success"
        onClick={() => {
          dispatch({
            type: 'getTaskApiAction',
          });
        }}
      >
        Dispatch action saga getTaskAPI
      </button>
      <div className="card__header">
        <img src={require('./bg.png')} />
      </div>
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks Saga</h2>
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
