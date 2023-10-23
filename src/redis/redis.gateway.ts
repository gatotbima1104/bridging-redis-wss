import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as redis from 'redis';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class RedisGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.subscribeData()
    console.log("module trigger")
    // REDIS SUBSCRIBER
    // const subscriber = redis.createClient();

    // subscriber.on('message', (channel: string, message: string) => {
    //   // Assuming 'products' is the channel name you want to subscribe to
    //   if (channel === 'products') {
    //     const data = JSON.parse(message);
    //     console.log('Received data from Redis:', data);
    //     this.server.emit('newData', data);
    //   }
    // });

    // // Subscribe to the 'products' channel
    // subscriber.subscribe('products', (message)=>{

    //   console.log('Received data from Redis:', message);
    //   this.server.emit('newData', message);
    // });

    // Emit random data to clients every 5 seconds
    // setInterval(() => {
    //   const data = {
    //     id: this.randomNumber(1, 100),
    //     text: this.randomText(5),
    //   };

    //   console.log('Emitting random data:', data);
    //   this.server.emit('newData', data);
    // }, 5000);
  }

  async subscribeData(){
    // const redisUrl = "redis://127.0.0.1:6379"
    const subscriber = redis.createClient()

    console.log("triggered by Onmodule")
    await subscriber.connect()

    subscriber.subscribe('article_user', (message: any) => {
      console.log(message) 

      setInterval(()=>{
        try {
          this.server.emit('article-user-fe', { message})
        } catch (error) {
          console.log(error)
        }
      }, 5000)
    })
  }

  randomNumber(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }

  randomText(length: number) {
    return Math.random().toString(36).substring(2, 2 + length);
  }
}
