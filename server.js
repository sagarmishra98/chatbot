const express = require('express');
const bodyParser = require('body-parser');
const say = require('say');  // Text-to-Speech library

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());  // To parse incoming JSON requests
app.use(express.static('public'));  // Serve static files (for your frontend)

// Route to handle text processing
app.post('/process_audio', (req, res) => {
    const { text } = req.body;  // Get the text from the request body
    console.log(`Received text: "${text}"`);

    // Convert text to speech using the say library
    say.export(text, 'Alex', 1.0, 'output.wav', (err) => {
        if (err) {
            console.error('Error generating audio:', err);
            return res.status(500).send({ error: 'Text to speech conversion failed' });
        }

        // Respond with the audio file path
        res.json({ audioUrl: '/output.wav' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
