import React, { useState, useContext } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import editorContext from "../editorContext";
import remarkGfm from 'remark-gfm'

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 13px;
  font-family: "Lato", sans-serif;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

const ResultArea = styled.div`
  // width: 100%;
  // height: 100%;
  // border: none;
  // font-size: 17px;
  width: 100%;
  height: 80%;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
  color: black;
  background: papayawhip;
`;

export function Result(props) {
  const { markdownText } = useContext(editorContext);
  const [message, setMessage] = useState("");

  const onClickSavetext = () => {
    const requestData = { text: markdownText, cur: window.location.href };
    fetch('/savetext', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  };


  return (
    <Container>
      <button type="button" class="btn btn-outline-light" onClick={onClickSavetext}>
        Save Text
      </button>
      <Title>Converted Text</Title>
      <p>{message}</p>
      <ResultArea>
        <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
      </ResultArea>
    </Container>
  );
}