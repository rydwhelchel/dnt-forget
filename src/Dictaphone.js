import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


const Dictaphone = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p class="text-primary">{transcript}</p>
            {/* <Button onClick={() => navigator.clipboard.writeText('some text to copy')}>
                Click here to copy
            </Button>
            {copySuccess} */}

        </div>
    );
};
export default Dictaphone;