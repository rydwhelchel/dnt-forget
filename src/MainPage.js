import React, { useState } from 'react';
import EventList from './components/EventList';
import PendingList from './components/PendingList';
import './static/List.css';
import ReactWeather, { useOpenWeather } from 'react-open-weather';


function Mainpage({ currFolder, changeEvents, folders, events }) {
  const [pendingChanges, setPendingChanges] = useState([]);
  const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: apiKey,
    lat: '33.753746',
    lon: '-84.386330',
    lang: 'en',
    unit: 'imperial',
  });

  const customStyles = {
    fontFamily: 'Helvetica, sans-serif',
    gradientStart: '#0181C2',
    gradientMid: '#04A7F9',
    gradientEnd: '#4BC4F7',
    locationFontColor: '#FFF',
    todayTempFontColor: '#FFF',
    todayDateFontColor: '#B5DEF4',
    todayRangeFontColor: '#B5DEF4',
    todayDescFontColor: '#B5DEF4',
    todayInfoFontColor: '#B5DEF4',
    todayIconColor: '#FFF',
    forecastBackgroundColor: '#1d1d1d',
    forecastSeparatorColor: '#DDD',
    forecastDateColor: '#adadad',
    forecastDescColor: '#adadad',
    forecastRangeColor: '#adadad',
    forecastIconColor: '#4BC4F7',
  };

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
        <div
          style={{
            paddingTop: '55px',
            paddingRight: '10px',
            paddingLeft: '30px',
            paddingBottom: '50px',
          }}
        >
          <ReactWeather
            theme={customStyles}
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel="Atlanta"
            unitsLabels={{ temperature: 'F', windSpeed: 'm/h' }}
            showForecast
          />
        </div>
        <PendingList pendingChanges={pendingChanges} />
      </div>
    </div>
  );
};

export default Mainpage;
