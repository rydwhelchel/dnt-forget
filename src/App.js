import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './Details';
import './style.css';
import Mainpage from './MainPage';
import Sidebar from './components/Sidebar';

const App = function App() {
  const args = JSON.parse(document.getElementById('data').text);
  const [events, setEvents] = useState(args.events);
  const [folders, setFolders] = useState(args.folders);
  const [currFolder, setCurrFolder] = useState(0);

  const deleteFolder = (folder) => {
    let updatedEvents = [...events];
    for (let j = 0; j < updatedEvents.length; j += 1) {
      if (updatedEvents[j].folder === folder.id) {
        updatedEvents = [
          ...updatedEvents.slice(0, j),
          ...updatedEvents.slice(j + 1),
        ];
        j -= 1;
      }
    }
    const requestData = { id: folder.id, event: updatedEvents };
    fetch('/delete_folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setFolders(data.folders);
      });
  };

  const changeEvents = (listedEvents) => {
    setEvents(listedEvents);
  };

  const changeFolders = (listedFolders) => {
    setFolders(listedFolders);
  };

  const changeCurrFolder = (currFolderInput) => {
    setCurrFolder(currFolderInput);
  };

  return (
    <div className="pageContainer">
      <Sidebar
        folders={folders}
        changeFolders={changeFolders}
        changeCurrFolder={changeCurrFolder}
        deleteFolder={deleteFolder}
        className="sidebar"
      />
      <Routes>
        <Route path="/details/:eventId" element={<Details />} />
        <Route
          path="/"
          element={(
            <Mainpage
              currFolder={currFolder}
              folders={folders}
              changeEvents={changeEvents}
              events={events}
            />
          )}
        />
      </Routes>
    </div>
  );
};
export default App;
