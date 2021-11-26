import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './details';
import './style.css';
import Mainpage from './MainPage';
import Dictaphone from './Dictaphone';

export default function App() {
  const args = JSON.parse(document.getElementById('data').text);
  // const args = {
  //   events: [
  //     { id: 1, title: 'Meeting with Prof', date: '2021-11-11T12:00' },
  //     { id: 2, title: 'Anniversary', date: '2021-11-09' },
  //     { id: 3, title: "Mom's Birthday", date: '2021-11-10T12:00' },
  //     { id: 4, title: 'Assignment Due', date: '2021-11-12T23:59' },
  //     { id: 5, title: 'Test!', date: '2021-11-09T12:00' },
  //     { id: 6, title: 'Go out with friends', date: '2021-11-20T18:00' },
  //     { id: 7, title: 'My Birthday!', date: '2021-01-16' },
  //     { id: 8, title: 'My Birthday next year!', date: '2021-11-25' },
  //     { id: 9, title: 'Thanksgiving', date: '2022-01-16' },
  //   ],
  //};
  return (
    <div>
      <Routes>
        <Route path="/details/:eventId" element={<Details />}></Route>
        <Route path="/" element={<Mainpage args={args} />}></Route>
      </Routes>
    </div>
  );
}
