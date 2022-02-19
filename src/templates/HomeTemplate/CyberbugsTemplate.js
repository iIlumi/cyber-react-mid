import React from 'react';
import { Helmet } from 'react-helmet';
import MenuCyberbugs from '../../components/Cyberbugs/MenuCyberbugs';
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';

export const CyberbugsTemplate = (props) => {
  const { ele: Component, ...propsRoute } = props;

  return (
    <div className="jira">
      <Helmet>
        <link rel="stylesheet" href="/cssHelmet/cybugs.css" />
      </Helmet>
      <SidebarCyberbugs />
      <MenuCyberbugs />
      <Component {...propsRoute} />
    </div>
  );
};
