import {
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

function PlayerCard({ playerInformation, name, wins }) {
  console.log(playerInformation)

  return (
    <Grid item xs={6}>
      <Typography gutterBottom color="primary" variant="body1">
        {name}
      </Typography>
 


      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {playerInformation.information.name}{' '}
            {wins && <span style={{ color: 'red' }}>WINNER</span>}
          </Typography>
          <Typography gutterBottom variant="body2">
            WINS:  {playerInformation.wins}
           
          </Typography>

          <Table size="small">
            <TableBody>
              {Object.keys(playerInformation.information).map((key) => (
                <TableRow selected={key === 'mass'} key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{playerInformation.information[key]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PlayerCard;
