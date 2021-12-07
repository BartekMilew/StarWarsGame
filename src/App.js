import './App.css';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Card, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PlayerCard from './Components/PlayerCard/PlayerCard';
import Cards from './Components/Cards/Cards';

function App() {
  const [maxRandomElement, setMaxRandomElement] = useState(0);
  const [resourceName, setResourceName] = useState('people');
  const [playersInformation, setPlayersInformation] = useState({
    playerOne: {
      information: {},
      wins: 0,
    },
    playerTwo: {
      information: {},
      wins: 0,
    },
  });

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * maxRandomElement) + 1;
  }, [maxRandomElement]);

  const getInformationDetailsFromApi = useCallback(
    (randomNumber) => {
      console.log(randomNumber);
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
    },
    [resourceName, getRandomNumber]
  );

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
      let newPlayersInformation = { ...playersInformation };
      newPlayersInformation.playerOne.information = data[0];
      newPlayersInformation.playerTwo.information = data[1];
      setPlayersInformation(newPlayersInformation);
    });
  };

  console.log(playersInformation);
  return (
    <div className="App">
      <header className="App-header">
        <Container fixed>
          <Typography
            gutterBottom
            color="secondary"
            variant="H3"
            component="div"
          >
            LET'S PLAY A GAME
          </Typography>
          <Cards
            playersInformation={playersInformation}
            attribute={resourceName === 'people' ? 'mass' : 'ss'}
          />

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
