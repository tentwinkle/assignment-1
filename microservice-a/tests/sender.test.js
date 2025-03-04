const request = require('supertest');
const app = require('../index');

jest.mock('amqplib', () => {
  return {
    connect: jest.fn(() =>
      Promise.resolve({
        createChannel: jest.fn(() =>
          Promise.resolve({
            assertQueue: jest.fn(() => Promise.resolve()),
            sendToQueue: jest.fn(),
            close: jest.fn(() => Promise.resolve())
          })
        ),
        close: jest.fn(() => Promise.resolve())
      })
    )
  };
});

describe('POST /send', () => {
  it('should return 200 when a valid message is sent', async () => {
    const response = await request(app)
      .post('/send')
      .send({ message: 'Hello World' });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Message sent!');
  });

  it('should return 400 when message is missing', async () => {
    const response = await request(app).post('/send').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Missing 'message' in request body");
  });
});