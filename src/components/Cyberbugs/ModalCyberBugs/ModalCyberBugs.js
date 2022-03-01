import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/Cyberbugs/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Cyberbugs/PriorityConstants';
import { CHANGE_TASK_MODAL } from '../../../redux/constants/Cyberbugs/TaskConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs/TaskTypeConstants';
// import { UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/Cyberbugs/TaskConstants';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';

const { Option } = Select;

export default function ModalCyberBugs(props) {
  const {
    TaskReducer: { taskDetailModal },
    StatusReducer: { arrStatus },
    PriorityReducer: { arrPriority },
    TaskTypeReducer: { arrTaskType },
    ProjectReducer: { projectDetail },
  } = useSelector((state) => state);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [content, setContent] = useState(taskDetailModal.description);

  // console.log('taskDetailModal:', taskDetailModal)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
              >
                {arrTaskType.map((tp, index) => {
                  return (
                    <option value={tp.id} key={index}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: 'flex' }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: 'pointer' }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    <div>
                      {visibleEditor ? (
                        <>
                          <Editor
                            name="description"
                            initialValue={taskDetailModal.description}
                            apiKey="hne9imm2uv75ei85awm7wtyi1tmp59rqr6x20g9omuq0fp4i"
                            init={{
                              selector: 'textarea#myTextArea',
                              height: 500,
                              menubar: false,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                              ],
                              toolbar:
                                'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help',
                            }}
                            onEditorChange={(content, editor) => {
                              setContent(content);
                            }}
                          />
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                              dispatch({
                                type: CHANGE_TASK_MODAL,
                                name: 'description',
                                value: content,
                              });
                              setVisibleEditor(false);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                              setVisibleEditor(false);
                            }}
                          >
                            Close
                          </button>
                        </>
                      ) : (
                        <div
                          onClick={() => {
                            setVisibleEditor(!visibleEditor);
                          }}
                        >
                          {parse(taskDetailModal.description)}
                        </div>
                      )}
                    </div>
                    {/* </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        <i className="fa fa-bug" /> BUG
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        <i className="fa fa-book-reader" /> STORY
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        <i className="fa fa-tasks" /> TASK
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div> */}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: 'flex' }}>
                      <div className="avatar">
                        <img
                          src={require('../../../assets/img/download (1).jfif')}
                          alt="xyz"
                        />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: 'gray' }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: 'bold',
                                background: '#ecedf0',
                                color: '#b4bac6',
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: 'flex' }}
                        >
                          <div className="avatar">
                            <img
                              src={require('../../../assets/img/download (1).jfif')}
                              alt="xyz"
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: '#929398' }}>Edit</span>•
                              <span style={{ color: '#929398' }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      name="statusId"
                      // Name đặt giống data API BE trả về
                      onChange={(e) => {
                        // Cách update 1 obj tổng
                        // tự extract ra trong tầng logic của saga-redux
                        // Nhưng phải tuân thủ đúng-đủ theo API
                        handleChange(e);

                        // Cách update theo từng API riêng cho mỗi thông số

                        // const action = {
                        //   type: UPDATE_STATUS_TASK_SAGA,
                        //   taskUpdateStatus: {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value,
                        //     // prj ID dispatch kèm để reload lại trang Proj detail tổng phía sau Modal
                        //     projectId: taskDetailModal.projectId,
                        //   },
                        // };

                        // // console.log('action', action);
                        // console.log('taskupdatestatus', {
                        //   taskId: taskDetailModal.taskId,
                        //   statusId: e.target.value,
                        // });

                        // dispatch(action);
                      }}
                    >
                      {/* <option>SELECTED FOR DEVELOPMENT</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option> */}
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {/* ASSIGNEES đang bị tràn - ko nên set cứng flex-basis và đặt thêm flex-wrap */}
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div className="col-6  mt-2 mb-2" key={index}>
                            <div style={{ display: 'flex' }} className="item">
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: 'pointer' }}
                                  onClick={() => {}}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-6  mt-2 mb-2">
                        <div className="col-12 border border-primary mb-2">
                          <i
                            className="fa fa-plus"
                            style={{ marginRight: 5 }}
                          />
                          <span>Add more</span>
                          <select
                            name="lstUser"
                            className="form-control"
                            onChange={(e) => {}}
                          >
                            {projectDetail.members?.map((mem, index) => {
                              return (
                                <option value={mem.userId} key={index}>
                                  {mem.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <Select
                          mode="multiple"
                          size="default"
                          options={[
                            { value: 'a12', label: 'b12' },
                            { value: 'a13', label: 'b13' },
                            { value: 'a14', label: 'b14' },
                          ]}
                          optionFilterProp="label"
                          style={{ width: '100%' }}
                          onSelect={(value) => {
                            console.log(
                              '🚀 ~ file: ModalCyberBugs.js ~ line 338 ~ value',
                              value
                            );
                          }}
                          placeholder="Please select"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Data API BE ko có reporter */}
                  {/* <div className="reporter">
                    <h6>REPORTER</h6>
                    <div style={{ display: 'flex' }} className="item">
                      <div className="avatar">
                        <img
                          src={require('../../../assets/img/download (1).jfif')}
                          alt="xyz"
                        />
                      </div>
                      <p className="name">
                        Pickle Rick
                        <i className="fa fa-times" style={{ marginLeft: 5 }} />
                      </p>
                    </div>
                  </div> */}
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      className="form-control"
                      name="priorityId"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      name="originalEstimate"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {
                      // IIEF -Immediately Invoked Function Expression
                      (() => {
                        const { timeTrackingSpent, timeTrackingRemaining } =
                          taskDetailModal;

                        const max =
                          Number(timeTrackingSpent) +
                          Number(timeTrackingRemaining);
                        const percent = Math.round(
                          (Number(timeTrackingSpent) / max) * 100
                        );

                        return (
                          <div style={{ display: 'flex' }}>
                            <i className="fa fa-clock" />
                            <div style={{ width: '100%' }}>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${percent}%` }}
                                  aria-valuenow={Number(timeTrackingSpent)}
                                  aria-valuemin={Number(timeTrackingRemaining)}
                                  aria-valuemax={max}
                                />
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <p className="logged">
                                  {Number(timeTrackingRemaining)}h logged
                                </p>
                                <p className="estimate-time">
                                  {Number(timeTrackingRemaining)}h remaining
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    }

                    <div className="row">
                      <div className="col-6">
                        <input
                          className="form-control"
                          name="timeTrackingSpent"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-6">
                        <input
                          className="form-control"
                          name="timeTrackingRemaining"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#929398' }}>Create at a month ago</div>
                  <div style={{ color: '#929398' }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
