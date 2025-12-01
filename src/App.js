import React, { useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SocketService from './services/socketService';
import ControlPanel from './components/ControlPanel';
import ElevatorShaft from './components/ElevatorShaft';
import FloorPanel from './components/FloorPanel';
import { useAppDispatch, useAppSelector } from './hooks/redux';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { elevators, numFloors, isRunning } = useAppSelector(state => state.simulation);

  useEffect(() => {
    SocketService.connect();
    
    return () => {
      SocketService.disconnect();
    };
  }, [dispatch]);

  const handleFloorRequest = async (floor, direction) => {
    const destinationFloor = direction === 'UP' ? 
      Math.min(numFloors - 1, floor + 1 + Math.floor(Math.random() * 3)) :
      Math.max(0, floor - 1 - Math.floor(Math.random() * 3));

    try {
      await fetch('https://elevator-sim-be.onrender.com/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          originFloor: floor, 
          destinationFloor 
        })
      });
    } catch (error) {
      console.error('Failed to add request:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Elevator System Simulation
      </Typography>
      
      <ControlPanel />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {elevators.map(elevator => (
              <ElevatorShaft 
                key={elevator.elevatorId} 
                elevator={elevator} 
                numFloors={numFloors} 
              />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, maxHeight: '70vh', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Floor Controls
            </Typography>
            {Array.from({ length: numFloors }).map((_, index) => (
              <FloorPanel
                key={numFloors - 1 - index}
                floorNumber={numFloors - 1 - index}
                elevators={elevators}
                onRequest={handleFloorRequest}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;