const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const PORT = 3001;
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'test_messages_queue';

app.post('/send-to-queue', async (req, res) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });
    console.log('Waiting for messages to pass in...');

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log(`received message : ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).send('Failed to connect to queue');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
