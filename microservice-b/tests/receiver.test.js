const amqp = require('amqplib');
const { listenForMessages } = require('../index');

jest.mock('amqplib', () => {
  return {
    connect: jest.fn(() =>
      Promise.resolve({
        createChannel: jest.fn(() =>
          Promise.resolve({
            assertQueue: jest.fn(() => Promise.resolve()),
            ack: jest.fn(), // Add the ack method here
            consume: jest.fn((queue, callback) => {
              // Simulate receiving a message
              callback({ content: Buffer.from('Test Message'), fields: {}, properties: {} });
              return Promise.resolve();
            })
          })
        ),
        close: jest.fn(() => Promise.resolve())
      })
    )
  };
});


describe('Microservice B', () => {
  it('should process incoming message', async () => {
    console.log = jest.fn();
    await listenForMessages();
    expect(console.log).toHaveBeenCalledWith('Received message:', 'Test Message');
  });
});