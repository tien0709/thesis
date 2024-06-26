const express = require('express');
const fs = require('fs');
const { RealtimeSession } = require('speechmatics');

const router = express.Router();

router.post('/speechtotext', async (req, res) => {
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
    
  const API_KEY = 'wLOyL0TKZbhNffPHjlpbGxygcJf3klEX';//have to hidden when push github
  
  const session = new RealtimeSession({ apiKey: API_KEY });
  const PATH_TO_FILE = 'record.wav';
  session.addListener('Error', (error) => {
    console.log('session error', error);
  });

  let transcript = '';

  session.addListener('AddTranscript', (message) => {
    process.stdout.write(message.metadata.transcript);
    transcript += message.metadata.transcript;
  });
  
  session.addListener('EndOfTranscript', () => {
    process.stdout.write('\n');
    res.json({ transcript });
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
      //prepare file stream
      const fileStream = fs.createReadStream(PATH_TO_FILE);
  
      //send it
      fileStream.on('data', (sample) => {
        session.sendAudio(sample);
      });
  
      //end the session
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