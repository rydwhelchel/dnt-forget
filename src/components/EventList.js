import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import EventItem from './EventItem';

import 'react-datepicker/dist/react-datepicker.css';
import '../static/List.css';

const EventList = function EventList({ events }) {
  const [eventsList, setEventsList] = useState(events);
  const [untilEvents, setUntilEvents] = useState([]);
  const [sinceEvents, setSinceEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const formTitleRef = useRef(null);

  const onClickAdd = () => {
    const titleVal = formTitleRef.current.value;
    const dateHours = startDate.getHours();
    const dateMinutes = startDate.getMinutes();
    const dateYears = startDate.getFullYear();
    const dateMonth = startDate.getMonth() + 1;
    const dateDay = startDate.getDate();
    const dateString = `${dateYears}-${
      dateMonth < 10 ? `0${dateMonth}` : dateMonth
    }-${dateDay < 10 ? `0${dateDay}` : dateDay}T${
      dateHours < 10 ? `0${dateHours}` : dateHours
    }:${dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes}`;

    setEventsList([...eventsList, { title: titleVal, date: dateString }]);
    formTitleRef.current.value = '';
  };

  const onClickDelete = (event) => {
    let updatedEvents = [];
    for (let j = 0; j < eventsList.length; j += 1) {
      if (eventsList[j] === event) {
        updatedEvents = [...eventsList.slice(0, j), ...eventsList.slice(j + 1)];
      }
    }
    setEventsList(updatedEvents);
  };

  const onClickSave = () => {
    const requestData = { event: eventsList };
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEventsList(data.events);
      });
  };

  useEffect(() => {
    const organizeEvents = (listOfEvents) => {
      if (listOfEvents.length === 0) {
        return;
      }
      const listOfSinceEvents = [];
      const listOfUntilEvents = [];
      listOfEvents.forEach((event) => {
        const msUntilOrSince = Date.parse(event.date) - Date.now();

        if (msUntilOrSince < 0) {
          listOfSinceEvents.push(event);
        } else {
          listOfUntilEvents.push(event);
        }
      });
      // Sorting events
      listOfUntilEvents.sort((a, b) => parseFloat(Date.parse(a.date) - Date.parse(b.date)));
      listOfSinceEvents.sort((a, b) => parseFloat(Date.parse(b.date) - Date.parse(a.date)));

      setUntilEvents(listOfUntilEvents);
      setSinceEvents(listOfSinceEvents);
    };
    if (sinceEvents.length + untilEvents.length !== eventsList.length) {
      organizeEvents(eventsList);
    }
  }, [eventsList, sinceEvents, untilEvents]);

  return (
    <div className="listContainer">
      <ListGroup className="untilList">
        <ListGroup.Item variant="secondary">
          <h1>Save an event for later:</h1>
          <input type="text" ref={formTitleRef} placeholder="Enter title" />
          <DatePicker
            selected={startDate}
            showTimeSelect
            dateFormat="Pp"
            onChange={(date) => setStartDate(date)}
          />
          <button type="button" onClick={onClickAdd}>
            Add Event
          </button>
          <button type="button" onClick={onClickSave}>
            Save
          </button>
        </ListGroup.Item>
        {untilEvents.map((event) => (
          <EventItem
            typeItem="until"
            event={event}
            onRemoveClick={() => onClickDelete(event)}
          />
        ))}
      </ListGroup>
      <ListGroup className="sinceList">
        {sinceEvents.map((event) => (
          <EventItem
            typeItem="since"
            event={event}
            onRemoveClick={() => onClickDelete(event)}
          />
        ))}
      </ListGroup>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventList;
