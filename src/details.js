import React, { useState } from 'react';
import './style.css';
import styled from 'styled-components';
<<<<<<< HEAD
import { MarkedInput } from './components/MarkedInput';
import { Result } from './components/Result';
import EditorContext from './editorContext';
=======
import { MarkedInput } from './components/markedInput';
import { Result } from './components/result';
import EditorContext from './editorContext';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
>>>>>>> 3dace90fe2f24e97ef6d847a167577b1b035b9ad

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  margin-bottom: 1em;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

<<<<<<< HEAD
const Details = function Details() {
=======
function Details() {
>>>>>>> 3dace90fe2f24e97ef6d847a167577b1b035b9ad
  const [markdownText, setMarkdownText] = useState('');

  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <AppContainer>
        <Title>Markdown Editor</Title>
        <EditorContainer>
          <MarkedInput />
          <Result />
        </EditorContainer>
      </AppContainer>
    </EditorContext.Provider>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> 3dace90fe2f24e97ef6d847a167577b1b035b9ad

export default Details;
