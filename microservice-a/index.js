const express = require('express');
const amqp = require('amqplib');
require('dotenv').config();

const app = express();
app.use(express.json());

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost';
const PORT = process.env.PORT || 3000;
const QUEUE = process.env.QUEUE || 'messageQueue';

async function sendMessage(message) {
  // Connect to RabbitMQ and publish the message to the queue
  const connection = await amqp.connect(RABBIT_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  channel.sendToQueue(QUEUE, Buffer.from(message), { persistent: true });
  await channel.close();
  await connection.close();
}

app.post('/send', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: "Missing 'message' in request body" });
  }
  try {
    await sendMessage(message);
    return res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, error: error.toString() });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Microservice A listening on port ${PORT}`);
  });
}

module.exports = app;