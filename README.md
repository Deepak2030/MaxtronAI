# Message Storage API

This project is a decentralized application backend (dApp) that allows users to store and retrieve a secret message on Ethereum/Polygon/Arbitrum Testnets.

## Features

- Store a message on the blockchain with a password.
- Retrieve the stored message using the password.
- Only the admin can update the message.

## Prerequisites

- Node.js and npm installed on your machine.
- An Ethereum wallet with private key and testnet Ether.
- Environment variables set up in a `.env` file.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/message-storage-api.git
cd message-storage-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following variables:

```env
RPC_URL=<your_rpc_url>
PRIVATE_KEY=<your_private_key>
CONTRACT_ADDRESS=<your_contract_address>
WALLET_ADDRESS=<your_wallet_address>
```

### 4. Run the server

```bash
node server.js
```

The server should now be running on the port specified in your `.env` file (default is 3000).

## API Endpoints

### GET /

**Description:** Welcome message

**Response:**
```json
"Welcome to the Message Storage API"
```

### POST /api/message

**Description:** Store a new message on the blockchain

**Request Body:**
```json
{
  "message": "Your new message",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "transactionHash": "0x123abc..."
}
```

### GET /api/message

**Description:** Retrieve the stored message using the password

**Query Parameters:**
```json
{
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your stored message"
}
```

## Example Usage

### Setting a message

```bash
curl -X POST http://localhost:3000/api/message -H "Content-Type: application/json" -d '{"message": "Your new message", "password": "your_password"}'
```

### Getting a message

```bash
curl -X GET "http://localhost:3000/api/message?password=your_password"
```

## Error Handling

- If required fields are missing in the request body, a `400 Bad Request` status will be returned.
- If there is an error interacting with the blockchain, a `500 Internal Server Error` status will be returned with the error message.



![image](https://github.com/user-attachments/assets/1f07d06c-61f8-4a79-9a06-87d428606e3d)
