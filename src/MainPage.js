import React, { useState } from 'react';
import EventList from './components/EventList';
import Sidebar from './components/Sidebar';
import './static/List.css';

function Mainpage({ currFolder, changeEvents, events }) {
  // Store folders state here
  // Add new folder function here
  // Filter args.events with currFolder
  // Pass down all folders state to Sidebar
  // Pass down onFolderClick to EventList

  return (
    <div style={{ width: '100%' }}>
      {/* <Sidebar className="sidebar" /> */}
      <div className="listContainer">
        <EventList
          currFolder={currFolder}
          changeEvents={changeEvents}
          events={events}
        />
      </div>
    </div>
  );
}

export default Mainpage;
