import {
  DeleteOutlined,
  FormOutlined,
  // CloseSquareOutlined,
} from '@ant-design/icons';
import {
  Button,
  Tag,
  Space,
  Table,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
// import prjDataDemo from './PrjDataDemo.json';
// import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FormEditProject from '../../../components/Forms/FormEditProject';

// import ReactHtmlParser from 'react-html-parser';
// not support React 17

// https://ant.design/components/table/#components-table-demo-reset-filter

export default function ProjectManagement(props) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  const searchRef = useRef(null);

  //Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  //Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PROJECT_SAGA' });
  }, [dispatch]);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  // let { sortedInfo, filteredInfo } = state;
  // sortedInfo = sortedInfo || {};
  // filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}> {text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   // https://ant.design/components/table/#Column
    //   render: (text, record, index) => {
    //     let contentJSX = parse(text);
    //     return <div>{contentJSX}</div>;
    //   },
    // },
    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'creator',
      // dataIndex: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        // console.log('index:', index)
        // console.log('record:', record)
        // console.log('text:', text)
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => {
        // https://ant.design/components/avatar/#components-avatar-demo-type
        // https://ant.design/components/popover/#components-popover-demo-placement
        // https://ant.design/components/auto-complete/#components-auto-complete-demo-basic
        // https://ant.design/components/auto-complete/#API
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: '15px' }}
                                    alt={item.name + 'img'}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: 'REMOVE_USER_PROJECT_API',
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                    style={{ borderRadius: '50%' }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

            <Popover
              placement="rightTop"
              title={'Add user'}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: '100%' }}
                    onSearch={(value) => {
                      // console.log('onSearch value:', value)
                      // code hiện tại sẽ gọi API liên tục mỗi khi gõ vào
                      // FiX bằng debounce search
                      // https://viblo.asia/p/su-dung-debounce-trong-reactjs-voi-hooks-3Q75wQmGZWb
                      // https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
                      // Dùng useRef hoặc useCallback
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: 'GET_USER_API',
                          keyWord: value,
                        });
                      }, 300);
                    }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    // Tên của user chỉ là hiển thị,
                    // thực chất là ta phải dispatch value lên
                    onSelect={(valueSelect, option) => {
                      setAutoCompleteValue(option.label);
                      console.log('option', option);
                      console.log('valueSelect:', valueSelect);
                      console.log('record:', record);
                      // Chưa ỏn lắm
                      // Nếu select như vậy thì sẽ dispatch trực tiếp lên API luôn khi click chọn
                      // Hơi liên quan về UX
                      dispatch({
                        type: 'ADD_USER_PROJECT_API',
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    // Text hiển thị vào vẫn là label nhưng data ngầm bên dưới là value
                    // các API này do antd cung cấp
                    value={autoCompleteValue}
                    // Khi này phải bind override onChange thêm 1 lần nữa
                    onChange={(text) => {
                      setAutoCompleteValue(text);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: '50%' }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                //dispatch lên reducer nội dung drawer
                const action = {
                  type: 'OPEN_FORM_EDIT_PROJECT',
                  title:'Edit Project',
                  Component: <FormEditProject />,
                };
                dispatch(action);

                //dispatch dữ liệu dòng hiện tai lên reducer
                const actionEditProject = {
                  type: 'EDIT_PROJECT',
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            {/* https://ant.design/components/popconfirm/#components-popconfirm-demo-basic */}
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({ type: 'DELETE_PROJECT_SAGA', idProject: record.id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
            ,
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Project management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
