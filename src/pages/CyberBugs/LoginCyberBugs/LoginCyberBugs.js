import {
    LockOutlined,
    //   FacebookOutlined,
    TwitterOutlined, UserOutlined
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

export default function LoginCyberBugs(props) {
  return (
    <form className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          Login CyberBugs
        </h3>

        <div className="d-flex mt-3">
          <Input
            style={{ width: '100%', minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            autoComplete="current-email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="d-flex mt-3">
          <Input
            style={{ width: '100%', minWidth: 300 }}
            type="password"
            name="email"
            size="large"
            placeholder="password"
            autoComplete="current-password"
            prefix={<LockOutlined />}
          />
        </div>

        <Button
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: 'rgb(102,117,223)',
            color: '#fff',
          }}
          className="mt-5"
        >
          Login
        </Button>

        <div className="social mt-3 d-flex">
          <Button
            style={{ backgroundColor: 'rgb(59,89,152)' }}
            shape="circle"
            size={'large'}
          >
            <span className="font-weight-bold" style={{ color: '#fff' }}>
              F
            </span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size={'large'}
          ></Button>
        </div>
      </div>
    </form>
  );
}
