import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// https://ant.design/components/drawer/#components-drawer-demo-form-in-drawer

export default function DrawerCyberBugs(props) {
  const { visible, ComponentContentDrawer, callBackSubmit } = useSelector(
    (state) => state.DrawerReducer
  );

  const dispatch = useDispatch();

  console.log('visible', visible);

//   const showDrawer = () => {
//     dispatch({ type: 'OPEN_DRAWER' });
//   };

  const onClose = () => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };
  return (
    <>
      {/* <button onClick={showDrawer}>showdrawer</button> */}
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* Nội dung thay đổi của drawer */}
        {ComponentContentDrawer}
        {/* <ComponentContentDrawer /> */}
        {/* Nếu muốn xài dạng thẻ thì trong reducer phải viết dạng function */}
      </Drawer>
    </>
  );
}
