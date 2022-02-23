import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
import prjDataDemo from './PrjDataDemo.json';
import parse from 'html-react-parser';
// import ReactHtmlParser from 'react-html-parser';
// not support React 17

// https://ant.design/components/table/#components-table-demo-reset-filter

export default function ProjectManagement(props) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

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

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      // https://ant.design/components/table/#Column
      render: (text, record, index) => {
        let contentJSX = parse(text);
        return <div>{contentJSX}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
          <div>
            <button className="btn mr-2 btn-primary">
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <button className="btn btn-danger">
              <DeleteOutlined style={{ fontSize: 17 }} />
            </button>
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
        dataSource={prjDataDemo}
        onChange={handleChange}
      />
    </div>
  );
}
