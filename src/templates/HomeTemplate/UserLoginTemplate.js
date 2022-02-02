// import { Route } from 'react-router-dom';
import { Button, Layout } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

/**
 *
 * https://ant.design/components/button/
 * https://ant.design/components/layout/
 *
 */

export const UserLoginTemplate = (props) => {
  let { Component, ...restRoute } = props;
  let navigate = useNavigate();

  return (
    <>
      <Layout>
        <Sider
          width={window.innerWidth / 2}
          style={{
            height: window.innerHeight,
            backgroundImage: 'url(https://picsum.photos/2000)',
            backgroundSize: '100%',
          }}
        >
          <Button type="primary" size="large" onClick={() => navigate('/home')}>
            Go back Home
          </Button>
        </Sider>
        <Content>
          <Component {...restRoute} />
        </Content>
      </Layout>
    </>
  );

  //   Router v-5
  //   return (
  //     <Route
  //       {...restRoute}
  //       render={(propsRoute) => {
  //         return (
  //           <>
  //             <Layout>
  //               <Sider
  //                 width={window.innerWidth / 2}
  //                 style={{
  //                   height: window.innerHeight,
  //                   backgroundImage: 'url(https://picsum.photos/500)',
  //                 }}
  //               ></Sider>
  //               <Content>
  //                 <Component />
  //               </Content>
  //             </Layout>
  //           </>
  //         );
  //       }}
  //     />
  //   );
};
