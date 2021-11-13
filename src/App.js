import EventList from "./components/EventList";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const args = JSON.parse(document.getElementById("data").text);
  // Comment the above when using a local react app, comment the below args when using Flask to run your server
  // Fake events
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const form_title = useRef(null);

  // let args = {
  //   events: [
  //     {
  //       title: "Meeting with Prof",
  //       date: "2021-11-11T12:00",
  //     },
  //     {
  //       title: "Anniversary",
  //       date: "2021-11-09",
  //     },
  //     {
  //       title: "Mom's Birthday",
  //       date: "2021-11-10T12:00",
  //     },
  //     {
  //       title: "Assignment Due",
  //       date: "2021-11-12T23:59",
  //     },
  //     {
  //       title: "Test!",
  //       date: "2021-11-09T12:00",
  //     },
  //     {
  //       title: "Go out with friends",
  //       date: "2021-11-20T18:00",
  //     },
  //     {
  //       title: "My Birthday!",
  //       date: "2021-01-16",
  //     },
  //     {
  //       title: "My Birthday next year!",
  //       date: "2022-01-16",
  //     },
  //     {
  //       title: "Thanksgiving",
  //       date: "2021-11-25",
  //     },
  //   ],
  // };

  let organizeEvents = (events) => {
    var since_events = [];
    var until_events = [];
    events.forEach((event) => {
      let ms_until_or_since = Date.parse(event.date) - Date.now();

      if (ms_until_or_since < 0) {
        // might be worth to construct the string representation when state updates ?
        // instead of storing in variable, maybe store in state variable, use setState to change it once calculated
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
    return [until_events, since_events];
  };

  //TODO: Fix with state, need to display stated variable as list
  //TODO: Fix date format on save, needs to be 'YYYYMMDDTHH:mm:ss.ss'
  function onClickAdd() {
    const val_title = form_title.current.value;
    const val_date = startDate.toString();
    const updatedEvents = [...events, { title: val_title, date: val_date }];
    setEvents(updatedEvents);
    form_title.current.value = "";
  }

  function onClickSave() {
    const requestData = { event: events };
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.artist_ids);
      });
  }

  // Processes events before displaying
  for (let i = 0; i < args.event_titles.length; i++) {
    setEvents([
      ...events,
      { title: args.event_titles[i], date: args.event_dates[i] },
    ]);
  }
  let parsedEvents = organizeEvents(events);
  setEvents(parsedEvents);
  return (
    <>
      <div>
        <h1>Save an event for later:</h1>
        <input type="text" ref={form_title} placeholder="Enter title" />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <button type="button" onClick={onClickAdd}>
          Add Event
        </button>
        <button type="button" onClick={onClickSave}>
          Save
        </button>
      </div>

      <EventList events={events} />
    </>
  );
}

export default App;
