import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListIoService {

  socketServer!: io.Socket;

  constructor() { }

  connect() {
    this.socketServer = io.connect(environment.API_ROOT);

    this.socketServer.on('message', (message) => {
      console.log(message);
    });

    this.socketServer.on('list.response', (list) => {
      console.log('got a list!');
      console.log(list);
    });

    console.log('sending message');
    this.socketServer.emit('message', 'This is a test!');
  }

  requestList() {
    console.log('requesting list');
    this.socketServer.emit('list.request', {id: 1});
  }
}
