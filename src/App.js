import EventList from "./components/EventList";

function App() {
  // const args = JSON.parse(document.getElementById("data").text);
  // Comment the above when using a local react app, comment the below args when using Flask to run your server
  // Fake events
  let args = {
    events: [
      {
        title: "Meeting with Prof",
        date: "2021-11-11T12:00",
      },
      {
        title: "Anniversary",
        date: "2021-11-09",
      },
      {
        title: "Mom's Birthday",
        date: "2021-11-10T12:00",
      },
      {
        title: "Assignment Due",
        date: "2021-11-12T23:59",
      },
      {
        title: "Test!",
        date: "2021-11-09T12:00",
      },
      {
        title: "Go out with friends",
        date: "2021-11-20T18:00",
      },
      {
        title: "My Birthday!",
        date: "2021-01-16",
      },
      {
        title: "My Birthday next year!",
        date: "2022-01-16",
      },
      {
        title: "Thanksgiving",
        date: "2021-11-25",
      },
    ],
  };

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

  // Processes events before displaying
  let parsedEvents = organizeEvents(args.events);

  return (
    <>
      <EventList events={parsedEvents} />
    </>
  );
}

export default App;
