import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const ElevatorShaft = ({ elevator, numFloors }) => {
  const floorHeight = 60;

  const getElevatorColor = () => {
    const utilization = elevator.passengerCount / elevator.capacity;
    if (utilization > 0.8) return '#ff4444';
    if (utilization > 0.5) return '#ffaa00';
    return '#44ff44';
  };

  return (
    <Box sx={{ position: 'relative', width: 120, height: numFloors * floorHeight, border: '1px solid #ccc' }}>
      {Array.from({ length: numFloors }).map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            bottom: index * floorHeight,
            width: '100%',
            height: 1,
            backgroundColor: '#eee',
            borderBottom: '1px solid #ddd'
          }}
        />
      ))}

      <Paper
        sx={{
          position: 'absolute',
          bottom: elevator.currentFloor * floorHeight,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: floorHeight - 10,
          backgroundColor: getElevatorColor(),
          transition: 'bottom 0.5s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: elevator.doorState === 'OPEN' ? '2px solid #0000ff' : '1px solid #333'
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          {elevator.elevatorId}
        </Typography>
        <Typography variant="caption">
          {elevator.passengerCount}/{elevator.capacity}
        </Typography>
        <Typography variant="caption" sx={{ 
          color: elevator.direction === 'UP' ? 'green' : elevator.direction === 'DOWN' ? 'red' : 'gray'
        }}>
          {elevator.direction === 'UP' ? '↑' : elevator.direction === 'DOWN' ? '↓' : '•'}
        </Typography>
      </Paper>

      {Array.from({ length: numFloors }).map((_, index) => (
        <Typography
          key={index}
          variant="caption"
          sx={{
            position: 'absolute',
            right: 4,
            bottom: index * floorHeight + 4,
            fontWeight: elevator.currentFloor === index ? 'bold' : 'normal',
            color: elevator.currentFloor === index ? 'blue' : 'black'
          }}
        >
          {index}
        </Typography>
      ))}
    </Box>
  );
};

export default ElevatorShaft;