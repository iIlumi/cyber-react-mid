import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function SlideDown(Component) {
  const propsSpring = useSpring({
    to: {
      marginTop: '0',
    },
    from: {
      marginTop: '-100px',
    },
    config: {
      duration: 500,
    },
  });

  console.log('propsSpring in function:', propsSpring.marginTop.defaultProps);
  // config được sinh ra khi expand trong console, trước đó ko có giá trị
  //   console.log(
  //     'propsSpring in function:',
  //     propsSpring.marginTop.defaultProps.config?.duration
  //   );

  return (
    <div>
      <animated.div style={propsSpring}>
        {console.log(
          'propsSpring in return:',
          propsSpring.marginTop.defaultProps
        )}
        <Component />
      </animated.div>
    </div>
  );
}
