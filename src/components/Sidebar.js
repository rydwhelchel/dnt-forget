import React, { useRef } from 'react';
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
import {
  FormControl,
  InputGroup,
  Button,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';

const Sidebar = ({ folders, changeFolders, changeCurrFolder }) => {
  const folderInput = useRef(null);

  const newFolderClick = () => {
    let requestData = { title: folderInput.current.value };
    fetch('/save_folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        changeFolders(data.folders);
      });

    //closes popover
    document.body.click();
  };

  const folderPopover = (
    <Popover id="newFolderPopover">
      <InputGroup style={{ width: 400 }}>
        <FormControl placeholder="Enter new folder title" ref={folderInput} />
        <Button onClick={newFolderClick}>Create Folder</Button>
      </InputGroup>
    </Popover>
  );

  return (
    <ProSidebar>
      <SidebarHeader className="sidebarHeader">
        <FontAwesomeIcon style={{ marginTop: '7px' }} icon={faCalendarWeek} />
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            paddingRight: '40px',
          }}
        >
          <h1 className="sidebarHeadText">Dnt Forget</h1>
          <div></div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem
            onClick={() => changeCurrFolder(0)}
            icon={<FontAwesomeIcon icon={faHome} />}
          >
            <Link to="/">Home</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="round">
          <SubMenu title="Folders" icon={<FontAwesomeIcon icon={faFolder} />}>
            {folders.map((folder) => (
              <MenuItem onClick={() => changeCurrFolder(folder.id)}>
                {folder.title}
              </MenuItem>
            ))}
            <MenuItem>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={folderPopover}
                rootClose="true"
              >
                <Button
                  style={{ color: '#adadad' }}
                  variant="outline-secondary"
                >
                  Create new folder
                </Button>
              </OverlayTrigger>
            </MenuItem>
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
