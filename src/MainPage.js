import React, { useState } from 'react';
import EventList from './components/EventList';
import PendingList from './components/PendingList';
import './static/List.css';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function Mainpage({ currFolder, changeEvents, folders, events }) {
  // Store folders state here
  // Add new folder function here
  // Filter args.events with currFolder
  // Pass down all folders state to Sidebar
  // Pass down onFolderClick to EventList

  const [pendingChanges, setPendingChanges] = useState([]);
  const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
  console.log(apiKey);
  // Get weather data from OpenWeather
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: apiKey,
    lat: '33.753746',
    lon: '-84.386330',
    lang: 'en',
    unit: 'imperial', // values are (metric, standard, imperial)
  });

  const changePendingChanges = (pending) => {
    setPendingChanges(pending);
  };

  const addPendingChange = (pending) => {
    setPendingChanges([...pendingChanges, pending]);
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
        changeEvents={changeEvents}
        addPendingChange={addPendingChange}
        changePendingChanges={changePendingChanges}
        events={events}
      />
      <div className="rightColumn">
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Atlanta"
          unitsLabels={{ temperature: 'F', windSpeed: 'm/h' }}
          showForecast
        />
        <PendingList pendingChanges={pendingChanges}></PendingList>
      </div>
    </div>
  );
}

export default Mainpage;
