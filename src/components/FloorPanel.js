import React from 'react';
import { Paper, Box, Button, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const FloorPanel = ({ floorNumber, elevators, onRequest }) => {
  const hasElevator = elevators.some(elevator => elevator.currentFloor === floorNumber);
  
  return (
    <Paper sx={{ p: 1, mb: 1, backgroundColor: hasElevator ? '#e3f2fd' : 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ minWidth: 60 }}>
          Floor {floorNumber}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ArrowUpward />}
            onClick={() => onRequest(floorNumber, 'UP')}
            disabled={floorNumber === 9}
          >
            Up
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ArrowDownward />}
            onClick={() => onRequest(floorNumber, 'DOWN')}
            disabled={floorNumber === 0}
          >
            Down
          </Button>
        </Box>

        <Box sx={{ minWidth: 100 }}>
          {elevators
            .filter(elevator => elevator.currentFloor === floorNumber)
            .map(elevator => (
              <Typography key={elevator.elevatorId} variant="caption" display="block">
                Elevator {elevator.elevatorId} - {elevator.doorState === 'OPEN' ? 'OPEN' : 'CLOSED'}
              </Typography>
            ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default FloorPanel;