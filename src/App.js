import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CloseButton from "react-bootstrap/CloseButton";
import Header from "./components/Header";

function App() {
  const args = JSON.parse(document.getElementById("data").text);

  const onSaveClick = () => {
    console.log("hello");
  };

  return (
    <>
      {/* Component */}
      <Header />
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
      </ListGroup>
    </>
  );
}

export default App;
