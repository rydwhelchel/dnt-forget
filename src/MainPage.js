import React from 'react';
import EventList from './components/EventList';
import Sidebar from './components/Sidebar';
import './static/List.css';

function Mainpage({ args }) {
  // Store folders state here
  // Add new folder function here
  // Pass down current folder state to EventList
  // Pass down all folders state to Sidebar
  // Pass down onFolderClick to EventList
  return (
    <div className="pageContainer">
      <Sidebar className="sidebar" />
      <div className="listContainer">
        <EventList events={args.events} />
      </div>
    </div>
  );
}

export default Mainpage;
