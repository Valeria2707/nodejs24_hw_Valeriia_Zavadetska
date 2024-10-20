const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const PORT = 3000;
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'test_messages_queue';

app.post('/send-to-queue', async (req, res) => {
  const { message } = req.body;

  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    console.log(message);

    await channel.close();
    await connection.close();

    res.send(`Sent message: ${message}`);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Error to sent to queue');
  }
});

app.listen(PORT, () => {
  console.log(`Producer is running on port ${PORT}`);
});
