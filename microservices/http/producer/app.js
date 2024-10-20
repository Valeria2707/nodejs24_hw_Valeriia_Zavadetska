const express = require('express');

const app = express();
app.use(express.json());

app.post('/message-receive', async (req, res) => {
  const { message } = req.body;

  try {
    await fetch('http://localhost:3001/message-receive', {
      body: JSON.stringify({ message }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.send(`Sent message: ${message}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Failed to send message');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`);
});
