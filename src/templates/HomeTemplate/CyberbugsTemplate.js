import React from 'react';
import { Helmet } from 'react-helmet';
import MenuCyberbugs from '../../components/Cyberbugs/MenuCyberbugs';
import ModalCyberBugs from '../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs';
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';
import DrawerCyberBugs from '../../HOC/CyberbugsHOC/DrawerCyberBugs';

export const CyberbugsTemplate = (props) => {
  const { ele: Component, ...propsRoute } = props;
  // console.log('CyberbugsTemplate render');
  return (
    <div className="jira">
      <Helmet>
        <link rel="stylesheet" href="/cssHelmet/cybugs.css" />
      </Helmet>
      <SidebarCyberbugs />
      <MenuCyberbugs />
      <Component {...propsRoute} />
      <ModalCyberBugs />
      <DrawerCyberBugs />
    </div>
  );
};
