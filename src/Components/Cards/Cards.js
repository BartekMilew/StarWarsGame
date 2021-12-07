import { Grid } from '@mui/material';
import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';

function Cards({ playersInformation }) {
  return (
    <Grid container spacing={4}>
      <PlayerCard
        key={2}
        playerInformation={playersInformation.playerOne}
        name={'player 1'}
        
      />
      <PlayerCard
        key={1}
        playerInformation={playersInformation.playerTwo}
        name={'player 2'}
      
      />
    </Grid>
  );
}

export default Cards;
