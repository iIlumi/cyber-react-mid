import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

const url = 'http://svcy.myclass.vn/api/ToDoList/';

export default function ToDoListRFC() {
  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  const getTaskList = () => {
    let promise = Axios({
      url: url + 'GetAllTask',
      method: 'GET',
    });

    promise
      .then((result) => {
        console.log(result.data);
        setState({
          ...state,
          taskList: result.data,
        });

        console.log('thành công');
      })
      .catch((err) => {
        console.log('thất bại');
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getTaskList();

    return () => {};
  }, []);

  const addTask = (e) => {
    e.preventDefault(); //Chặn sự kiện reload lại trang
  };

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
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.toggleTaskStatus(item.taskName, taskStatus);
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
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
            />
            <button id="addItem">
              <i className="fa fa-plus" />
            </button>
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

/**
 * Ở đây đưa form vào bên trong card luôn 
 * -> khỏi sinh thêm cấp của cây
 * 
 */
