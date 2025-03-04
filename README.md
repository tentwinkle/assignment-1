# Microservices Messaging Assignment

## Overview

This repository contains two Node.js microservices that communicate asynchronously via RabbitMQ.

- **Microservice A (Sender):** Exposes an API endpoint (`/send`) to accept messages and publish them to a RabbitMQ queue.
- **Microservice B (Receiver):** Listens to the RabbitMQ queue and processes incoming messages.

## Architecture & Design

- **Asynchronous Messaging:**  
  RabbitMQ is used to decouple the sender and receiver, which enhances scalability and fault tolerance.
- **Decoupling:**  
  The services run independently and communicate solely via the message broker, making the system more modular.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/) (for RabbitMQ)

### Setting Up RabbitMQ

Run the following command in the repository root:
```bash
docker-compose up -d
```
This starts RabbitMQ with the AMQP port on `5672` and the management UI on `15672`.

### Microservice A (Sender)

1. Navigate to the `microservice-a` directory:
   ```bash
   cd microservice-a
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional) with:
   ```
   RABBIT_URL=amqp://localhost
   PORT=3000
   QUEUE=messageQueue
   ```
4. Start the service:
   ```bash
   npm start
   ```

### Microservice B (Receiver)

1. Navigate to the `microservice-b` directory:
   ```bash
   cd microservice-b
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional) with:
   ```
   RABBIT_URL=amqp://localhost
   QUEUE=messageQueue
   ```
4. Start the service:
   ```bash
   npm start
   ```

## Testing

### Microservice A Tests

From the `microservice-a` directory, run:
```bash
npm test
```
This executes unit tests for the `/send` endpoint.

### Microservice B Tests

From the `microservice-b` directory, run:
```bash
npm test
```
This runs tests to verify that incoming messages are correctly processed.

## Challenges and Resolutions

- **Reliable Asynchronous Messaging:**  
  By ensuring persistent messaging and proper acknowledgment in RabbitMQ, the system can reliably process messages even under load.
  
- **Decoupling Services:**  
  Using RabbitMQ allows each service to operate independently, easing scalability and maintenance.

- **Testing Asynchronous Code:**  
  We mock the RabbitMQ connection and channels in tests to simulate message delivery without a live broker.

## Conclusion

This assignment demonstrates a robust microservices architecture built with Node.js, RabbitMQ, and best practices in testing and documentation. The decoupled design ensures scalability and maintainability, making it a strong foundation for real-world backend systems.

Happy coding!