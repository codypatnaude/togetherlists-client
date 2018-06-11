import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ListIoService {

  socketClient!: io.Socket;
  isConnected = new BehaviorSubject(false);
  item = new BehaviorSubject(null);

  constructor(private api: ApiService) { }

  connect() {
    console.log('attempting to connect');
    this.socketClient = io.connect(environment.API_ROOT);

    this.assignSocketSubscriptions(this.socketClient);
  }

  requestList(id) {
    console.log('requesting list');
    this.socketClient.emit('list.request', {id});
  }

  assignSocketSubscriptions(socket: io.socket) {
    socket.on('auth.request', () => {
      console.log('Server Requested credentials');
      console.log(`token ${this.api.authToken}`);
      socket.emit('auth.response', this.api.authToken);
    });

    socket.on('connected', () => {
      console.log('We\'re connected!!');
      this.isConnected.next(true);
    });

    socket.on('list.response', (list) => {
      console.log('we got a list!');
    });

    socket.on('list.detail', (detail) => {
      console.log('OMG I GOT ONE');
      console.log(detail);
      this.item.next(detail);
    });

    socket.on('message', (message) => {
      console.log(`Server sent: ${message}`);
    });

    socket.on('chat', (chat) => {
      console.log('chat recieved');
      console.log(chat);
    });
  }
}
