import React from "react";
import Button from "react-bootstrap/Button";

const Header = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Button variant="primary">Here's a button!</Button>
      <Button variant="seconary">Secondary button!</Button>
      <Button variant="success">Here's a success button!</Button>
      <Button variant="warning">Warning button!</Button>
      <Button variant="light">Light</Button>{" "}
      <Button variant="dark">Dark</Button>{" "}
    </div>
  );
};

export default Header;
