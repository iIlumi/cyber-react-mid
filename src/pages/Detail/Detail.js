import React from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';

/**
 * https://reactrouter.com/docs/en/v6/api
 * useMatch -> phải xử lý được với pattern regex
 * useResolvedPath
 * useRoutes
 *
 * useParam -> định nghĩa các tham số truyền trên url
 * useSearchParam
 * useLocation -> obj,
 * useNavigation -> điều hướng chứ ko trả obj
 *
 * match.path v5 là Route của router
 * match.url hay location.pathname là url tĩnh
 */

export default function Detail(props) {
  /**
   * props trong v6 ko còn được export kèm history, location và match như v5
   * path trong v6 cũng ko còn kết hợp với regex được
   * match.path -> v5 sẽ trả về pattern url nhưng v6 hiện ko có tương đương
   *
   * https://stackoverflow.com/questions/69967745/react-router-v6-access-a-url-parameter
   * -> HOC for class in v6
   */

  console.log('props:', props);
  const params = useParams();
  console.log('params:', params);
  let location = useLocation();
  console.log('location:', location);

  return (
    <div>
      Giá trị tham số: {params.id}
      <hr />
      {/* 
        Path name hiện tại: {match.path} 
        Giá trị tham số: {props.match.params.id}
      */}
    </div>
  );
}
