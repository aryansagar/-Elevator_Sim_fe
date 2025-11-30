import { io } from 'socket.io-client';
import { store } from '../store/store';
import { setElevators, updateElevator, addRequest, setMetrics, initializeSimulation } from '../store/simulationSlice';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io('http://localhost:4000');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('simulation_initialized', (data) => {
      store.dispatch(initializeSimulation(data));
    });

    this.socket.on('simulation_update', (data) => {
      store.dispatch(setElevators(data.elevators));
      store.dispatch(setMetrics(data.metrics));
    });

    this.socket.on('elevator_update', (elevator) => {
      store.dispatch(updateElevator(elevator));
    });

    this.socket.on('new_request', (request) => {
      store.dispatch(addRequest(request));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();