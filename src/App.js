import './App.css';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const [maxRandomElement, setMaxRandomElement] = useState(0);
  const [resourceName, setResourceName] = useState('people');
  const [playersInformation, setPlayersInformation] = useState({});

  const getInformationDetailsFromApi = (randomNumber) => {
    return fetch(`https://swapi.dev/api/${resourceName}/${randomNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('error');
        } else {
          return response.json();
        }
      })
      .then((data) => data)
      .catch((error) => {
        return getInformationDetailsFromApi(getRandomNumber());
      });
  };
  const getRandomNumber = () => {
    return Math.floor(Math.random() * maxRandomElement);
  };

  useEffect(() => {
    //Get max element in poeple Api
    getInformationDetailsFromApi('').then((response) =>
      setMaxRandomElement(response.count)
    );
  }, []);

  const handleClickPlay = () => {
    Promise.all([
      getInformationDetailsFromApi(getRandomNumber()),
      getInformationDetailsFromApi(getRandomNumber()),
    ]).then((data) => {
      setPlayersInformation({
        playerOne: data[0],
        playerTwo: data[1],
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container fixed>
          <Typography
            gutterBottom
            color="secondary"
            variant="H3"
            style={{ display: 'block' }}
          >
            LET'S PLAY A GAME
          </Typography>
          {maxRandomElement && (
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="body1"
                  style={{ display: 'block' }}
                >
                  Player 1
                </Typography>
                <Card sx={{ minWidth: 275 }}>Player 1</Card>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="body1"
                  style={{ display: 'block' }}
                >
                  Player 2
                </Typography>
                <Card sx={{ minWidth: 275 }}>Player 2</Card>
              </Grid>
            </Grid>
          )}
          <Grid>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleClickPlay}>Play</Button>
              <Button>Settings</Button>
            </ButtonGroup>
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;
