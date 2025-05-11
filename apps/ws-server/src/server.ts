/**
 * WebSocket Server for Enzer ChatApp
 * 
 * This file implements a basic WebSocket server using the 'ws' library.
 * It handles client connections, messages, and disconnections.
 */

// Note: To use this server, you need to install the ws package:
// npm install ws
// npm install -D @types/ws

import { WebSocketServer, WebSocket, MessageEvent } from 'ws';
import { IncomingMessage } from 'http';

// Define types for connected clients and messages
interface Client {
  id: string;
  ws: WebSocket;
  username?: string;
}

interface ChatMessage {
  type: 'message' | 'join' | 'leave';
  sender: string;
  content?: string;
  timestamp: number;
}

// Port to listen on
const PORT = 8080;

// Create a new WebSocket server
const wss = new WebSocketServer({ port: PORT });

// Store connected clients
const clients: Map<string, Client> = new Map();

// Generate a unique ID for each client
function generateClientId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Broadcast message to all connected clients
function broadcast(message: ChatMessage): void {
  const messageStr = JSON.stringify(message);
  
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(messageStr);
    }
  });
}

// Server initialization
console.log(`WebSocket Server is starting on port ${PORT}...`);

// Connection event handler
wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  // Create a new client and add to our clients map
  const clientId = generateClientId();
  const client: Client = { id: clientId, ws };
  clients.set(clientId, client);
  
  const ip = req.socket.remoteAddress;
  console.log(`New client connected: ${clientId} from ${ip}`);
  
  // Handle incoming messages
  ws.on('message', (data: Buffer) => {
    try {
      // Parse the incoming message
      const rawMessage = data.toString();
      console.log(`Received message from ${clientId}: ${rawMessage}`);

      const parsedMessage = JSON.parse(rawMessage);
      
      // If it's a join message, save the username
      if (parsedMessage.type === 'join' && parsedMessage.username) {
        client.username = parsedMessage.username;
        console.log(`Client ${clientId} identified as ${client.username}`);
        
        // Broadcast join notification
        broadcast({
          type: 'join',
          sender: client.username,
          timestamp: Date.now()
        });
      } 
      // If it's a regular message, broadcast it to all clients
      else if (parsedMessage.type === 'message' && client.username) {
        broadcast({
          type: 'message',
          sender: client.username,
          content: parsedMessage.content,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error(`Error processing message from ${clientId}:`, error);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    
    // If user had a username, notify others about the departure
    if (client.username) {
      broadcast({
        type: 'leave',
        sender: client.username,
        timestamp: Date.now()
      });
    }
    
    // Remove client from the map
    clients.delete(clientId);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error(`Error with client ${clientId}:`, error);
  });
  
  // Send a welcome message to the client
  ws.send(JSON.stringify({
    type: 'message',
    sender: 'Server',
    content: 'Welcome to the Enzer Chat Server! Please send a join message with your username.',
    timestamp: Date.now()
  }));
});

// Handle server errors
wss.on('error', (error) => {
  console.error('WebSocket Server error:', error);
});

console.log(`WebSocket Server is running on ws://localhost:${PORT}`);

