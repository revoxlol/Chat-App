// src/chat/chat.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    // Handle user connection, room assignment, etc.
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    // Handle user disconnection, room cleanup, etc.
  }

  // Additional methods for handling messages, user events, etc.
}
