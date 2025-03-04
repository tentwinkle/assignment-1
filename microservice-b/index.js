const amqp = require('amqplib');
require('dotenv').config();

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost';
const QUEUE = process.env.QUEUE || 'messageQueue';

async function listenForMessages() {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`Microservice B waiting for messages in queue: ${QUEUE}`);
    channel.consume(QUEUE, (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log('Received message:', message);
        // Process the message as needed
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
}

if (require.main === module) {
  listenForMessages();
}

module.exports = { listenForMessages };