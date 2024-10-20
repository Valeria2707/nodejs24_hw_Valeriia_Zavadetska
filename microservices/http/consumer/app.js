const express = require('express');

const app = express();
app.use(express.json());

app.post('/message-receive', (req, res) => {
  const { message } = req.body;

  console.log(message);
  res.status(200).send('Message received');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`);
});
