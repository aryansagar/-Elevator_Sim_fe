import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elevators: [],
  requests: [],
  metrics: {
    totalWaitTime: 0,
    totalTravelTime: 0,
    completedRequests: 0,
    averageWaitTime: 0,
    averageTravelTime: 0
  },
  isRunning: false,
  simulationSpeed: 1,
  numFloors: 10,
  numElevators: 3
};

const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setElevators: (state, action) => {
      state.elevators = action.payload;
    },
    updateElevator: (state, action) => {
      const index = state.elevators.findIndex(e => e.elevatorId === action.payload.elevatorId);
      if (index !== -1) {
        state.elevators[index] = action.payload;
      }
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      const index = state.requests.findIndex(r => r.requestId === action.payload.requestId);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    setRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setSimulationSpeed: (state, action) => {
      state.simulationSpeed = action.payload;
    },
    initializeSimulation: (state, action) => {
      state.elevators = action.payload.elevators;
      state.numFloors = action.payload.numFloors;
      state.requests = [];
      state.metrics = {
        totalWaitTime: 0,
        totalTravelTime: 0,
        completedRequests: 0,
        averageWaitTime: 0,
        averageTravelTime: 0
      };
    }
  }
});

export const {
  setElevators,
  updateElevator,
  addRequest,
  updateRequest,
  setMetrics,
  setRunning,
  setSimulationSpeed,
  initializeSimulation
} = simulationSlice.actions;

export default simulationSlice.reducer;