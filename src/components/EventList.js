import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import EventItem from './EventItem';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/List.css';

let updateEvents = true;

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
    updateEvents = true;
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
    updateEvents = true;
  };

  const onCompletion = (thisEvent) => {
    const thisEventObject = thisEvent;
    const newStartDate = new Date();
    const dateHours = newStartDate.getHours();
    const dateMinutes = newStartDate.getMinutes();
    const dateYears = newStartDate.getFullYear();
    const dateMonth = newStartDate.getMonth() + 1;
    const dateDay = newStartDate.getDate();
    const newDateString = `${dateYears}-${
      dateMonth < 10 ? `0${dateMonth}` : dateMonth
    }-${dateDay < 10 ? `0${dateDay}` : dateDay}T${
      dateHours < 10 ? `0${dateHours}` : dateHours
    }:${dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes}`;
    thisEventObject.date = newDateString;
    thisEventObject.completed = true;
    setEventsList([...eventsList]);
    updateEvents = true;
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
      listOfUntilEvents.sort((a, b) =>
        parseFloat(Date.parse(a.date) - Date.parse(b.date))
      );
      listOfSinceEvents.sort((a, b) =>
        parseFloat(Date.parse(b.date) - Date.parse(a.date))
      );

      setUntilEvents(listOfUntilEvents);
      setSinceEvents(listOfSinceEvents);
    };
    if (
      updateEvents ||
      sinceEvents.length + untilEvents.length !== eventsList.length
    ) {
      organizeEvents(eventsList);
      updateEvents = false;
    }
  }, [eventsList, sinceEvents, untilEvents]);

  return (
    <div>
      <ListGroup className="untilList">
        <ListGroup.Item
          style={{ backgroundColor: '#909090' }}
          variant="secondary"
        >
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
            key={event.id}
            typeItem="until"
            testID={`event-${event.id}`}
            event={event}
            onRemoveClick={() => onClickDelete(event)}
            onCompletedClick={() => onCompletion(event)}
          />
        ))}
      </ListGroup>
      <ListGroup className="sinceList">
        {sinceEvents.map((event) => (
          <EventItem
            key={event.id}
            typeItem="since"
            testID={`event-${event.id}`}
            event={event}
            onRemoveClick={() => onClickDelete(event)}
            onCompletedClick={() => onCompletion(event)}
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
    })
  ).isRequired,
};

export default EventList;
