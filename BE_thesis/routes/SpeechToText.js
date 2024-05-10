const express = require('express');
const  fs = require('fs');
const OpenAI = require('openai');
const base64 = require('nodejs-base64-converter');
const wav = require('node-wav');
const speech = require('@google-cloud/speech');
// Creates a client
const client = new speech.SpeechClient();
const openai = new OpenAI({
  apiKey: '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', // Replace with your actual key
});

const { RealtimeSession } = require('speechmatics');

const router = express.Router();


//const base64 = require('base64-js'); // Assuming you're using base64-js

router.post('/api/speechtotext', async (req, res) => {
  try {
    const formData = req.body.formData;
    // Handle potential missing or invalid formData structure
    if (!formData ) {
      return res.status(400).json({ message: 'Invalid request format' });
    }
     // Giải mã chuỗi base64 thành dữ liệu nhị phân
  const decodedBuffer = Buffer.from(formData, 'base64');

  // Lưu dữ liệu nhị phân ra file WAV mới
  fs.writeFileSync('record.wav', decodedBuffer, 'binary');
    
  const API_KEY = 'wLOyL0TKZbhNffPHjlpbGxygcJf3klEX';
  
  const session = new RealtimeSession({ apiKey: API_KEY });
  const PATH_TO_FILE = 'record.wav';
  
  session.addListener('Error', (error) => {
    console.log('session error', error);
  });
  
  let transcript = ''; // Initialize an empty variable to store the transcript
  
  session.addListener('AddTranscript', (message) => {
    transcript += message.metadata.transcript; // Append transcript segments
  });
  
  session.addListener('EndOfTranscript', () => {
    // Send the JSON response with the complete transcript after the session ends
    res.json({ transcript }); // Return the transcript in JSON format
  
    session.stop(); // Stop the session after sending the response
  });
  
  session
    .start({
      transcription_config: {
        language: 'vi',
        operating_point: 'enhanced',
        enable_partials: true,
        max_delay: 2,
      },
      audio_format: { type: 'file' },
    })
    .then(() => {
      // Prepare file stream
      const fileStream = fs.createReadStream(PATH_TO_FILE);
  
      // Send audio data
      fileStream.on('data', (sample) => {
        session.sendAudio(sample);
      });
  
      // End the session after sending the data
      fileStream.on('end', () => {
        session.stop();
      });
    })
    .catch((error) => {
      console.log('error', error.message);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;