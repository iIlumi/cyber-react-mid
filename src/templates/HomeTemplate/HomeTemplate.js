import React from 'react';
import Header from '../../components/Home/Header/Header';
// import { Route } from 'react-router-dom';
// import Home from '../../pages/Home/Home';

// v5 Router code

// export const HomeTemplate = (props) => {
//   const { Component, ...restParam } = props;
//   return (
//     <Route
//       {...restParam}
//       render={(propsRoute) => {
//         return (
//           <>
//             <Header />
//             <Component {...propsRoute} />
//           </>
//         );
//       }}
//     />
//   );
// };

// Ở đây dạt Component viết hoa để tiện theo quy ước React component khác ele

// https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f#route-composition-in-react-router-v6
// https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f#get-started-upgrading-today

// -> Phải nhét HOC vào trong element
export const HomeTemplate = (props) => {
  const { ele: Component, ...restParam } = props;
//   const { ele, ...restParam } = props;

  //   return <Route {...restParam} element={<Component />} />;
  return (
    <>
      <Header />
      <Component {...restParam}/>
    </>
  );
};
