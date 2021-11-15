import React, { useState, useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import EventItem from "./EventItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../static/List.css";

const EventList = ({ events }) => {
  const [eventsList, setEventsList] = useState(events);
  const [untilEvents, setUntilEvents] = useState([]);
  const [sinceEvents, setSinceEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const form_title = useRef(null);

  const onClickAdd = () => {
    const val_title = form_title.current.value;
    const date_hours = startDate.getHours();
    const date_minutes = startDate.getMinutes();
    const date_years = startDate.getFullYear();
    const date_month = startDate.getMonth() + 1;
    const date_day = startDate.getDate();
    const date_string =
      "" +
      date_years +
      "-" +
      (date_month < 10 ? "0" + date_month : date_month) +
      "-" +
      (date_day < 10 ? "0" + date_day : date_day) +
      "T" +
      (date_hours < 10 ? "0" + date_hours : date_hours) +
      ":" +
      (date_minutes < 10 ? "0" + date_minutes : date_minutes);

    setEventsList([...eventsList, { title: val_title, date: date_string }]);
    form_title.current.value = "";
  };

  const onClickDelete = (event) => {
    let updatedEvents = [];
    for (let j = 0; j < eventsList.length; j++) {
      if (eventsList[j] === event) {
        updatedEvents = [...eventsList.slice(0, j), ...eventsList.slice(j + 1)];
      }
    }
    setEventsList(updatedEvents);
  };

  const onClickSave = () => {
    const requestData = { event: eventsList };
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEventsList(data.events);
      });
  };

  useEffect(() => {
    const organizeEvents = (event_list) => {
      if (event_list.length === 0) {
        return;
      }
      let since_events = [];
      let until_events = [];
      event_list.forEach((event) => {
        let ms_until_or_since = Date.parse(event.date) - Date.now();

        if (ms_until_or_since < 0) {
          since_events.push(event);
        } else {
          until_events.push(event);
        }
      });
      // Sorting events
      until_events.sort((a, b) =>
        parseFloat(Date.parse(a.date) - Date.parse(b.date))
      );
      since_events.sort((a, b) =>
        parseFloat(Date.parse(b.date) - Date.parse(a.date))
      );

      setUntilEvents(until_events);
      console.log(untilEvents);
      setSinceEvents(since_events);
      console.log(sinceEvents);
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
          <input type="text" ref={form_title} placeholder="Enter title" />
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

export default EventList;
