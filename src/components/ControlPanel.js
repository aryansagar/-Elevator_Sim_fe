import React, { useState } from 'react';
import {
  Paper,
  Box,
  Button,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { PlayArrow, Stop, RestartAlt, Speed } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setRunning, setSimulationSpeed } from '../store/simulationSlice';

const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const { isRunning, simulationSpeed, metrics } = useAppSelector(state => state.simulation);
  const [numElevators, setNumElevators] = useState(3);
  const [numFloors, setNumFloors] = useState(10);

  const handleInitialize = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/simulation/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numElevators, numFloors })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Simulation initialized');
      }
    } catch (error) {
      console.error('Failed to initialize simulation:', error);
    }
  };

  const handleStart = async () => {
    try {
      await fetch('http://localhost:4000/api/simulation/start', { method: 'POST' });
      dispatch(setRunning(true));
    } catch (error) {
      console.error('Failed to start simulation:', error);
    }
  };

  const handleStop = async () => {
    try {
      await fetch('http://localhost:4000/api/simulation/stop', { method: 'POST' });
      dispatch(setRunning(false));
    } catch (error) {
      console.error('Failed to stop simulation:', error);
    }
  };

  const handleSpeedChange = async (event, newValue) => {
    const speed = newValue;
    dispatch(setSimulationSpeed(speed));
    try {
      await fetch('http://localhost:4000/api/simulation/speed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speed })
      });
    } catch (error) {
      console.error('Failed to set speed:', error);
    }
  };

  const handleAddRequest = async () => {
    const originFloor = Math.floor(Math.random() * numFloors);
    let destinationFloor;
    do {
      destinationFloor = Math.floor(Math.random() * numFloors);
    } while (destinationFloor === originFloor);

    try {
      await fetch('http://localhost:4000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originFloor, destinationFloor })
      });
    } catch (error) {
      console.error('Failed to add request:', error);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Simulation Controls
      </Typography>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Elevators</InputLabel>
            <Select
              value={numElevators}
              label="Elevators"
              onChange={(e) => setNumElevators(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Floors</InputLabel>
            <Select
              value={numFloors}
              label="Floors"
              onChange={(e) => setNumFloors(e.target.value)}
            >
              {[5, 10, 15, 20].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="outlined"
            onClick={handleInitialize}
            fullWidth
            startIcon={<RestartAlt />}
          >
            Initialize
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="contained"
            color={isRunning ? "secondary" : "primary"}
            onClick={isRunning ? handleStop : handleStart}
            fullWidth
            startIcon={isRunning ? <Stop /> : <PlayArrow />}
          >
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="outlined"
            onClick={handleAddRequest}
            fullWidth
            disabled={!isRunning}
          >
            Add Request
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>
          <Speed sx={{ verticalAlign: 'middle', mr: 1 }} />
          Simulation Speed: {simulationSpeed}x
        </Typography>
        <Slider
          value={simulationSpeed}
          onChange={handleSpeedChange}
          min={1}
          max={5}
          step={1}
          marks={[
            { value: 1, label: '1x' },
            { value: 2, label: '2x' },
            { value: 3, label: '3x' },
            { value: 4, label: '4x' },
            { value: 5, label: '5x' }
          ]}
          disabled={!isRunning}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Performance Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg Wait Time
                </Typography>
                <Typography variant="h5">
                  {metrics.averageWaitTime.toFixed(1)}s
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg Travel Time
                </Typography>
                <Typography variant="h5">
                  {metrics.averageTravelTime.toFixed(1)}s
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed Requests
                </Typography>
                <Typography variant="h5">
                  {metrics.completedRequests}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Requests
                </Typography>
                <Typography variant="h5">
                  {metrics.totalRequests || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ControlPanel;