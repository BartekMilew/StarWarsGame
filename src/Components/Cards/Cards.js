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
        wins={
          playersInformation.playerOne.information.mass !== 'unknown' &&
          playersInformation.playerOne.information.mass >
            playersInformation.playerTwo.information.mass
        }
      />
      <PlayerCard
        key={1}
        playerInformation={playersInformation.playerTwo}
        name={'player 2'}
        wins={
          playersInformation.playerTwo.information.mass !== 'unknown' &&
          playersInformation.playerTwo.information.mass >
            playersInformation.playerOne.information.mass
        }
      />
    </Grid>
  );
}

export default Cards;
