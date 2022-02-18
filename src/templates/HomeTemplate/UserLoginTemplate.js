// import { Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Layout } from 'antd';
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

  // làm tròn để tiện đưa vào url picsum chứ ko cần thiết cho resize
  const [{ width, height }, setSize] = useState({
    width: Math.round(window.innerWidth / 2),
    height: Math.round(window.innerHeight),
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth / 2),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);

  return (
    <>
      <Layout>
        <Sider
          width={width}
          style={{
            height: window.innerHeight,
            // backgroundImage: 'url(https://picsum.photos/2000)',
            backgroundImage: `url(https://picsum.photos/${width}/${height})`,
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

  //   Router v-5 - render props
  //   Việc truyền {...propsRoute}  vào Component sẽ giúp nhận được history, location và match của router
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
  //                 <Component  {...propsRoute} />
  //               </Content>
  //             </Layout>
  //           </>
  //         );
  //       }}
  //     />
  //   );
};
