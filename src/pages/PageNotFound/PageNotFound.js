import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function PageNotFound(props) {
  // https://reactrouter.com/docs/en/v6/upgrading/v5#replace-useroutematch-with-usematch
  // https://reactrouter.com/docs/en/v6/api#usematch
  // https://stackoverflow.com/questions/69967745/react-router-v6-access-a-url-parameter

  //   https://css-tricks.com/react-router-4/#aa-match-path-vs-match-url
  const location = useLocation();
  console.log('location:', location);
  // pathname hay url là url tĩnh
  return (
    <div>
      {/* 
      https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-to-react-router-v51 
      */}
      {/* Không tìm thấy trang {props.match.url} */}
      Không tìm thấy trang {location.pathname}
    </div>
  );
}
