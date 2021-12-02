import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputGroup, ListGroup, Button } from 'react-bootstrap';
import EventItem from './EventItem';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/List.css';

import { useAlert } from 'react-alert';

const EventList = function EventList({
  events,
  changeEvents,
  folders,
  currFolder,
  addPendingChange,
  changePendingChanges,
}) {
  const [eventsList, setEventsList] = useState(events);
  const [untilEvents, setUntilEvents] = useState([]);
  const [sinceEvents, setSinceEvents] = useState([]);
  const [updateList, setUpdateList] = useState(true);
  const alert = useAlert();
  const formTitleRef = useRef(null);
  const formDateRef = useRef(null);

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const onClickAdd = () => {
    if (formTitleRef.current.value === '') {
      alert.show('Please enter an event title!');
      return;
    }
    if (formDateRef.current.value === '') {
      alert.show('Please select a date!');
      return;
    }
    const titleVal = formTitleRef.current.value;
    const startDate = new Date(formDateRef.current.value);
    startDate.addHours(5);
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
    let event = {
      folder: currFolder,
      title: titleVal,
      date: dateString,
    };
    setEventsList([...eventsList, event]);
    addPendingChange({
      method: 'add',
      event: event,
      folder: currFolderName,
    });
    formTitleRef.current.value = '';
    alert.show('Event has been added.');
  };

  const onClickDelete = (event) => {
    let updatedEvents = [];
    console.log(`Event list is ${eventsList}`);
    if (eventsList.length !== 1) {
      for (let j = 0; j < eventsList.length; j += 1) {
        if (eventsList[j] === event) {
          updatedEvents = [
            ...eventsList.slice(0, j),
            ...eventsList.slice(j + 1),
          ];
        }
      }
    }
    setEventsList(updatedEvents);
    addPendingChange({ method: 'remove', event: event });
    setUpdateList(true);
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
        setUpdateList(true);
        changePendingChanges([]);
      });
    alert.show('Successfully changed events!');
  };

  const onCompletion = (thisEvent) => {
    const thisEventObject = thisEvent;
    const originalDate = thisEvent.date;
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
    addPendingChange({
      method: 'complete',
      event: thisEvent,
      originalDate: originalDate,
    });
    setUpdateList(true);
  };

  useEffect(() => {
    const organizeEvents = (listOfEvents) => {
      if (listOfEvents.length === 0) {
        setUntilEvents([]);
        setSinceEvents([]);
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
      updateList ||
      sinceEvents.length + untilEvents.length !== eventsList.length
    ) {
      organizeEvents(eventsList);
      setUpdateList(false);
    }
    changeEvents(eventsList);
  }, [updateList, eventsList, sinceEvents, untilEvents]);

  let currFolderName = '';
  folders.map((folder) => {
    if (folder.id === currFolder) {
      currFolderName = folder.title;
    } else if (currFolder === 0) {
      currFolderName = 'Home';
    }
  });

  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        justifyContent: 'center',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '54px 1fr',
        alignContent: 'top',
      }}
    >
      <div className="titleBox">
        <h1 className="folderTitle">{currFolderName}</h1>
      </div>
      <ListGroup className="list">
        <ListGroup.Item
          style={{ width: '100%', backgroundColor: '#1d1d1d' }}
          variant="secondary"
        >
          <h1 style={{ color: '#adadad' }}>Save an event for later:</h1>
          <InputGroup>
            <FormControl
              type="text"
              ref={formTitleRef}
              placeholder="Enter title"
            />
            <FormControl type="date" ref={formDateRef} />
            <Button onClick={onClickAdd}>Add Event</Button>
            <Button variant="success" onClick={onClickSave}>
              Save
            </Button>
          </InputGroup>
        </ListGroup.Item>
        {currFolder === 0
          ? untilEvents.map((event) => (
              <EventItem
                key={event.id}
                typeItem="until"
                testID={`event-${event.id}`}
                event={event}
                style={{ width: '100%' }}
                onRemoveClick={() => onClickDelete(event)}
                onCompletedClick={() => onCompletion(event)}
              />
            ))
          : untilEvents.map((event) =>
              event.folder === currFolder ? (
                <EventItem
                  key={event.id}
                  typeItem="until"
                  testID={`event-${event.id}`}
                  event={event}
                  onRemoveClick={() => onClickDelete(event)}
                  onCompletedClick={() => onCompletion(event)}
                />
              ) : (
                <></>
              )
            )}
        {currFolder === 0
          ? sinceEvents.map((event) => (
              <EventItem
                key={event.id}
                typeItem="since"
                testID={`event-${event.id}`}
                event={event}
                onRemoveClick={() => onClickDelete(event)}
                onCompletedClick={() => onCompletion(event)}
              />
            ))
          : sinceEvents.map((event) =>
              event.folder === currFolder ? (
                <EventItem
                  key={event.id}
                  typeItem="since"
                  testID={`event-${event.id}`}
                  event={event}
                  onRemoveClick={() => onClickDelete(event)}
                  onCompletedClick={() => onCompletion(event)}
                />
              ) : (
                <></>
              )
            )}
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
