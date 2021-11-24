import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFolder,
  faSignOutAlt,
  faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <ProSidebar>
      <SidebarHeader className="listHeader">
        <FontAwesomeIcon style={{ marginTop: '7px' }} icon={faCalendarWeek} />
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            paddingRight: '40px',
          }}
        >
          <h1 className="sidebarHeader">Dnt Forget</h1>
          <div></div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
            <Link to="/">Home</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="round">
          <SubMenu title="Folders" icon={<FontAwesomeIcon icon={faFolder} />}>
            <MenuItem>Birthdays</MenuItem>
            <MenuItem>Assignments</MenuItem>
            <MenuItem>Something Else</MenuItem>
            <MenuItem>Something Else</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="round">
          <MenuItem icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
            Logout
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
