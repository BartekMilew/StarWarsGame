import './App.css';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Card, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PlayerCard from './Components/PlayerCard/PlayerCard';
import Cards from './Components/Cards/Cards';
import { makeStyles } from '@mui/styles';

const checkWhichPlayerWins=(playerOneMass,playerTwoMass)=>{
   if(playerOneMass==="unknown"||playerTwoMass==="unknown"){
     return false
   }else{
    return playerOneMass>playerTwoMass?"playerOne":"playerTwo"
   }
}
const useStyles = makeStyles((theme) => ({
  selectColor: {
  color: "white"
  }
}));
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
    const classes = useStyles();

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
      let whoWins=checkWhichPlayerWins(data[0].mass,data[1].mass)
       whoWins&&(newPlayersInformation[whoWins]["wins"]=newPlayersInformation[whoWins]["wins"]+1);
      setPlayersInformation(newPlayersInformation);
    });
  };
  const handleChangeResource = (event) => {
    setResourceName(event.target.value);
  };
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
          <Grid item xs={12}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button variant={"outlined"} onClick={handleClickPlay}>Play</Button>
     
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={resourceName}
className={classes.selectColor}          
          onChange={handleChangeResource}
          classess={{
            classes: {
                root: classes.selectColor,
            },
        }}
        >
          <MenuItem value={"people"}>People</MenuItem>
          <MenuItem value={"ships"}>Ships</MenuItem>
        </Select>
      
            </ButtonGroup>
          </Grid>
          <Cards
            playersInformation={playersInformation}
          />
  
        </Container>
      </header>
    </div>

  );
}

export default App;
