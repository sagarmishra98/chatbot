document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('micButton');
    const status = document.getElementById('status');
    const outputDiv = document.getElementById('transcription-output');

    // Check if the browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        status.textContent = 'Sorry, your browser does not support speech recognition.';
        console.error('Speech recognition not supported in this browser.');
        return;
    }

    // Initialize speech recognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    micButton.addEventListener('click', () => {
        status.textContent = 'Listening...';
        recognition.start();
        console.log('Microphone button clicked. Listening...');
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(`Transcription: ${transcript}`);
        outputDiv.textContent = `You said: ${transcript}`;
        status.textContent = 'Finished listening.';
    };

    recognition.onerror = (event) => {
        console.error(`Speech recognition error detected: ${event.error}`);
        status.textContent = `Error occurred: ${event.error}`;
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        status.textContent = 'Click the button to speak again.';
    };

    recognition.onspeechend = () => {
        console.log('Speech has ended, stopping recognition...');
        recognition.stop(); // Stop recognition if speech has ended
        status.textContent = 'Processing speech...';
    };

    recognition.onnomatch = () => {
        console.error('No speech was detected. Try again.');
        status.textContent = 'No speech detected. Try again.';
    };
});
