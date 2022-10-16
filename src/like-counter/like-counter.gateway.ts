import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { LikeCounterService } from './like-counter.service';
import { Server } from 'socket.io';
import { Request } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class LikeCounterGateway {
  constructor(private readonly likeCounterService: LikeCounterService) { }

 @WebSocketServer()
  server: Server;


  @SubscribeMessage('likeSong')
  async likeSong(@MessageBody() data) {
    console.log(data)
    this.server.emit('likeSong', {data: data});
  }

  @SubscribeMessage('dislikeSong')
  async dislikeSong(@MessageBody() data) {
    console.log(data)
    this.server.emit('dislikeSong', {data: data});
  }

}
