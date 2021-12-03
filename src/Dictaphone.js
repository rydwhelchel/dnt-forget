import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import React from 'react';

const Dictaphone = function Dictaphone() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&#39;t support speech recognition.</span>;
  }

  return (
    <div>
      <p>
        Microphone:
        {listening ? 'on' : 'off'}
      </p>
      <button type="button" onClick={SpeechRecognition.startListening}>
        Start
      </button>
      <button type="button" onClick={SpeechRecognition.stopListening}>
        Stop
      </button>
      <button type="button" onClick={resetTranscript}>
        Reset
      </button>
      <p className="text-primary">{transcript}</p>
    </div>
  );
};
export default Dictaphone;
