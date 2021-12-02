import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
// import Button from 'react-bootstrap/Button';
import React from 'react';

// const Dictaphone = function() => {
const Dictaphone = function () {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&lsquot support speech recognition.</span>;
  }

  return (
    <div>
      <p>
        Microphone:
        {listening ? 'on' : 'off'}
      </p>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={SpeechRecognition.startListening}
      >
        Start
      </button>
      <span> </span>
      <button
        type="button"
        className="btn btn-outline-warning btn-sm"
        onClick={SpeechRecognition.stopListening}
      >
        Stop
      </button>
      <span> </span>
      <button
        type="button"
        className="btn btn-outline-light btn-sm"
        onClick={resetTranscript}
      >
        Reset
      </button>
      <p className="text-primary">{transcript}</p>
      {/* <Button onClick={() => navigator.clipboard.writeText('some text to copy')}>
                Click here to copy
            </Button>
            {copySuccess} */}
    </div>
  );
};
export default Dictaphone;
