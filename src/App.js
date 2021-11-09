// import Button from "react-bootstrap/Button";
// import ListGroup from "react-bootstrap/ListGroup";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import CloseButton from "react-bootstrap/CloseButton";
// import Header from "./components/Header";
import EventList from "./components/EventList";

function App() {
  //const args = JSON.parse(document.getElementById("data").text);
  // Comment the above when using a local react app, comment the below args when using Flask to run your server
  let args = {
    events: [
      {
        title: "An assignment is due!",
        date: "2021-11-11T12:00",
      },
      {
        title: "Anniversary",
        date: "2021-11-09",
      },
    ],
  };

  // const onSaveClick = () => {
  //   console.log("hello");
  // };

  return (
    <>
      <EventList events={args.events} />
      {/* BELOW IS FOR REFERENCE */}
      {/* <Header />
      <ListGroup as="ol" numbered>
        <ListGroup.Item as="li">
          Here's where I'd put my tasks
          <Button onClick={onSaveClick} variant="primary">
            I do something!
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          If I had any...
          <Button variant="dark">I don't do anything..</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          Additional List items with many buttons{" "}
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </ListGroup.Item>
        <ListGroup.Item>
          Here's an X button <CloseButton />
        </ListGroup.Item>
      </ListGroup> */}
    </>
  );
}

export default App;
