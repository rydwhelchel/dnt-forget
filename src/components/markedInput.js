import React, { useContext } from "react";
import styled from "styled-components";
import editorContext from "../editorContext";
import Dictaphone from "../Dictaphone";
import Button from 'react-bootstrap/Button';

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 13px;
  border-right: 1.5px solid rgba(15, 15, 15, 0.4);
  font-family: "Lato", sans-serif;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
`;

export function MarkedInput(props) {
  const { markdownText, setMarkdownText } = useContext(editorContext);

  // const markdownText = "hello its me"

  const onInputChange = e => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };



  const onClickIt = e => {
    const requestData = { text: "" };
    // fetch('/details/:eventid', {
    fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMarkdownText(data.text);
      });
  };
  // const onClickButton = () => {
  //   const requestData = { text: "" };
  //   fetch('/details', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMarkdownText(data.text);
  //     });
  // };

  return (
    <Container>
      <button type="button" onClick={onClickIt}>prev_text</button>
      <Title>Markdown Text</Title>
      <Dictaphone />
      <TextArea value={markdownText} onChange={onInputChange}>
      </TextArea>
    </Container>
  );
}