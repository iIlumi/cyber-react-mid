import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentMain from '../../components/Cyberbugs/Main/ContentMain';
import HeaderMain from '../../components/Cyberbugs/Main/HeaderMain';
import InfoMain from '../../components/Cyberbugs/Main/InfoMain';
import { useSelector, useDispatch } from 'react-redux';

export default function IndexCyberBugs(props) {
  console.log('indexCyberBugs(props):', props);
  const { projectId } = useParams();
  // ko nên bóc tách ngay trên đây vì projectId là primitive ?
  // Nếu component tự gọi lại chính nó thì dặt ở trên đây còn chạy bình thường ko

  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
    // const { projectId } = props.match.params;
    dispatch({
      type: 'GET_PROJECT_DETAIL',
      projectId,
    });
  }, [dispatch, projectId]);

  return (
    <div className="main">
      <HeaderMain />

      <InfoMain />

      <ContentMain />
    </div>
  );
}
