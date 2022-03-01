import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { connect } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../redux/constants/Cyberbugs/ProjectCyberBugsConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../redux/constants/Cyberbugs/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../redux/constants/Cyberbugs/PriorityConstants';
import { GET_ALL_STATUS_SAGA } from '../../redux/constants/Cyberbugs/StatusConstant';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../redux/constants/Cyberbugs/UserConstants';

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function FormCreateTask(props) {
  //Lấy dữ liệu từ redux
  // const { arrProject } = useSelector((state) => state.ProjectCyberBugsReducer);
  // const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  // const { arrPriority } = useSelector((state) => state.PriorityReducer);

  // const {
  //   ProjectCyberBugsReducer: { arrProject },
  //   TaskTypeReducer: { arrTaskType },
  //   PriorityReducer: { arrPriority },
  //   UserLoginCyberBugsReducer: { userSearch },
  //   StatusReducer: { arrStatus },
  // } = useSelector((state) => state);

  // allUser có thể dùng là state nội bộ hoặc đẩy lên redux cũng được

  // const dispatchHook = useDispatch();
  const { arrProject, arrTaskType, arrPriority, arrStatus, arrUser, dispatch } =
    props;
  // ===
  // Do connect với formik ta dẵ dùng connect nên ko cần dùng hooks nữa

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  //Do kết nối với withformik => component có các props
  const {
    // values,
    // touched,
    // errors,
    handleChange,
    // handleBlur,
    handleSubmit,
    // setValues,
    setFieldValue,
  } = props;

  //Hàm biến đổi options cho thẻ select
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  // const handleEditorChange = (content, editor) => {};

  // function handleSelectChange(value) {
  //   console.log(`Selected: ${value}`);
  // }

  //hook
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });

    // Dispatch ngay đây để lấy về userOptions ngay từ đầu
    // Keyword rỗng để lấy tất cả user
    // Sẽ tiết kiệm được việc gọi API
    dispatch({ type: 'GET_USER_API', keyWord: '' });
  }, [dispatch]);

  console.log('arrTaskType:', arrTaskType);

  // Chú ý là khi close Modal hook vẫn chạy lại vì component cha bị re-render -> toàn bộ con bị theo, gọi API ko cần thiết khi cancel new task

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            //dispatch giá trị làm thay đổi arrUser
            let { value } = e.target;
            // Có thể dispatch tại thời điểm load Formik kèm reinitialise luôn
            // Tuy nhiên chú ý vấn đề tối ưu call API, ts, ESLint...
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
            //Cập nhật giá trị cho project Id
            // setFieldValue('projectId', e.target.value);
            handleChange(e);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <p>Task name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-6">
            <p>Task type</p>
            <select
              className="form-control"
              name="typeId"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {/* https://ant.design/components/select/#components-select-demo-size */}
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size="default"
              options={
                //   [
                //   { value: 'a12', label: 'b12' },
                //   { value: 'a13', label: 'b13' },
                //   { value: 'a14', label: 'b14' },
                // ]
                userOptions
              }
              // Có thể gọi API trong search vẫn OK
              // Note thêm là search theo value chứ ko dùng label
              // Phải chỉnh lại option
              optionFilterProp="label"
              // onSearch={(value) => {
              //   console.log('andt Select input search:', value);
              //   dispatch({ type: 'GET_USER_API', keyWord: value });
              // }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              // onChange này là của antd, ko phải của React component thường
              onChange={(values) => {
                //set lại giá trị cho lstUserAsign
                setFieldValue('listUserAsign', values);
              }}
              onSelect={(value) => {
                console.log(value);
              }}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
            {/* https://ant.design/components/input-number/#components-input-number-demo-size` */}

            <div className="row mt-3">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  type="number"
                  min="0"
                  name="originalEstimate"
                  defaultValue="0"
                  className="form-control"
                  height="30"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <p>Time tracking</p>
            {/* https://ant.design/components/slider/#components-slider-demo-input-number
            https://ant.design/components/slider/#components-slider-demo-show-tooltip
            */}

            <Slider
              defaultValue={30}
              tooltipVisible
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />

            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6">
                <p>Time spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    // Component thường khác với TH select nên có thể dùng 2 cách
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimetracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    // ở đây sẽ nhận là str, nên cần manual convert lại
                    setFieldValue('timeTrackingRemaining', +e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
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
            setFieldValue('description', content);
          }}
        />
      </div>
      {/* Nút submit đặt tạm để debug */}
      <button type="submit">submit</button>
    </form>
  );
}

const frmCreateTask = withFormik({
  // Phải enable để lấy giá trị default từ redux
  // Nếu ko sẽ bị đè các giá trị ko có trong setup
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // Trùng với name của những input đã tạo rồi
    // Các name của input trongform nên cố đặt giống data BE trả về
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

    // Có thể dispatch tại đây để xử lý trường hợp vừa load form lên
    // Tuy nhiên sẽ bị ESLint warn vì dispatch bên trong lại kèm re-initialize có thể gây loop
    // Hoặc đây get user của 1 project vào saga khi lấy thông tin của 1 project luôn

    // if (arrProject?.length > 0) {
    //   props.dispatch({
    //     type: GET_USER_BY_PROJECT_ID_SAGA,
    //     idProject: arrProject[0]?.id,
    //   });
    // }

    return {
      taskName: '',
      description: '',
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },

  validationSchema: Yup.object().shape({}),
  displayName: 'createTaskForm',

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: 'CREATE_TASK_SAGA', taskObject: values });
    console.log('taskobject', values);
  },
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectCyberBugsReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
    arrUser: state.UserLoginCyberBugsReducer.arrUser,
  };
};

export default connect(mapStateToProps)(frmCreateTask);
