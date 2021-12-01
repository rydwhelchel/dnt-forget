import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import EventList from './components/EventList';
import PendingList from './components/PendingList';
import './static/List.css';

function Mainpage({ currFolder, changeEvents, folders, events }) {
  // Store folders state here
  // Add new folder function here
  // Filter args.events with currFolder
  // Pass down all folders state to Sidebar
  // Pass down onFolderClick to EventList

  const [pendingChanges, setPendingChanges] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const changePendingChanges = (pending) => {
    setPendingChanges(pending);
  };

  const addPendingChange = (pending) => {
    setPendingChanges([...pendingChanges, pending]);
  };

  const changeUpdateStatus = (prop) => {
    setUpdateList(prop);
  };

  return (
    <div
      style={{
        backgroundColor: '#3d3d3d',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1.7fr 1fr',
      }}
    >
      <EventList
        className="listContainer"
        currFolder={currFolder}
        folders={folders}
        updateList={updateList}
        changeEvents={changeEvents}
        changeUpdateStatus={changeUpdateStatus}
        addPendingChange={addPendingChange}
        changePendingChanges={changePendingChanges}
        events={events}
      />
      <div className="rightColumn">
        <div className="spaceEater"></div>
        <PendingList pendingChanges={pendingChanges}></PendingList>
      </div>
    </div>
  );
}

export default Mainpage;
