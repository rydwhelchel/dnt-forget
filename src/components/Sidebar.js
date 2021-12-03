import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
  Modal,
} from 'react-bootstrap';

const Sidebar = function Sidebar({
  folders,
  changeFolders,
  changeCurrFolder,
  deleteFolder,
}) {
  const folderInput = useRef(null);
  const [show, setShow] = useState(false);
  const [folderToDelete, setFolder] = useState(null);

  const newFolderClick = () => {
    const requestData = { title: folderInput.current.value };
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

    // closes popover
    document.body.click();
  };

  const onClickLogout = () => {
    fetch('/logout', {
      method: 'GET',
    }).then(() => {
      window.location.replace('/login');
    });
  };

  const handleShow = (folder) => {
    setFolder(folder);
    setShow(true);
  };
  const handleDelete = () => {
    deleteFolder(folderToDelete);
    setShow(false);
  };
  const handleClose = () => setShow(false);

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
      {folderToDelete === null ? (
        <></>
      ) : (
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Folder?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Are you sure you want to delete
              {' '}
              {folderToDelete.title}
              ? Deleting
              this folder will also delete all events held within.
              {' '}
              <p style={{ color: 'red' }}>This change is irreversible!</p>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => handleClose()} variant="secondary">
              Close
            </Button>
            <Button onClick={() => handleDelete()} variant="danger">
              Delete Folder
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
          <div />
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
              <MenuItem
                style={{ justifyContent: 'space-between' }}
                onClick={() => changeCurrFolder(folder.id)}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {folder.title}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleShow(folder)}
                  >
                    X
                  </Button>
                </div>
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
          <MenuItem
            onClick={() => onClickLogout()}
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            Logout
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  changeFolders: PropTypes.func.isRequired,
  changeCurrFolder: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
};

export default Sidebar;
