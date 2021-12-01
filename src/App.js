import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './details';
import './style.css';
import Mainpage from './MainPage';
import Sidebar from './components/Sidebar';
import Dictaphone from './Dictaphone';
import { Modal, Button } from 'react-bootstrap';

export default function App() {
  const args = JSON.parse(document.getElementById('data').text);

  // const args = {
  //   events: [
  //     {
  //       id: 1,
  //       folder: 2,
  //       title: 'Meeting with Prof',
  //       date: '2021-11-11T12:00',
  //     },
  //     { id: 2, folder: 1, title: 'Anniversary', date: '2021-11-09' },
  //     { id: 3, folder: 1, title: "Mom's Birthday", date: '2021-11-10T12:00' },
  //     { id: 4, folder: 2, title: 'Assignment Due', date: '2021-11-12T23:59' },
  //     { id: 5, folder: 2, title: 'Test!', date: '2021-11-09T12:00' },
  //     { id: 6, title: 'Go out with friends', date: '2021-11-20T18:00' },
  //     { id: 7, folder: 1, title: 'My Birthday!', date: '2021-01-16' },
  //     { id: 8, folder: 1, title: 'My Birthday next year!', date: '2021-11-25' },
  //     { id: 9, title: 'Thanksgiving', date: '2022-01-16' },
  //   ],
  //   folders: [
  //     { id: 1, title: 'Birthdays' },
  //     { id: 2, title: 'Work' },
  //   ],
  // };

  const [events, setEvents] = useState(args.events);
  const [folders, setFolders] = useState(args.folders);
  const [currFolder, setCurrFolder] = useState(0);

  const deleteFolder = (folder) => {
    let updatedEvents = [...events];
    console.log(`Deleting ${folder.title}`);
    console.log(`Pre delete: ${updatedEvents}`);
    for (let j = 0; j < updatedEvents.length; j += 1) {
      if (updatedEvents[j].folder === folder.id) {
        console.log(`Deleting ${events[j].title}`);
        updatedEvents = [
          ...updatedEvents.slice(0, j),
          ...updatedEvents.slice(j + 1),
        ];
        j -= 1;
      }
    }
    console.log(`Post delete: ${updatedEvents}`);
    let requestData = { id: folder.id, event: updatedEvents };
    // fetch('/save', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.events);
    //     setEvents(data.events);
    //   });
    // console.log(events);
    // requestData = { id: folder.id };
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
        <Route path="/details/:eventId" element={<Details />}></Route>
        <Route
          path="/"
          element={
            <Mainpage
              currFolder={currFolder}
              folders={folders}
              changeEvents={changeEvents}
              events={events}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
