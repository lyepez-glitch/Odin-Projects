import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/style.css'
import getPokemon from './pokemonData.js';
import { shuffle } from 'lodash';
import Card from './components/Card.jsx'
function App() {
  const cardAmount = 12;


  const [pokemons,setPokemons] = useState([])

  const[total,setTotal] = useState(0);

  const[clicked,setClick] = useState([])
  const [bestScore,setBestScore] = useState(0)

  // const firstPokemon = await getPokemon()

  // console.log('first pokemon',firstPokemon)






    useEffect(()=>{
      async function fetchData(){

        const initialPokemons = await getPokemon();

        console.log('initialPokemons',initialPokemons,initialPokemons.length)

        if(initialPokemons.length !== 0){
          const shuffledPokemons = shuffle(initialPokemons);
          setPokemons(shuffledPokemons.slice(0,12));
        }

        }
        fetchData();

     },[])





  function handleCardClick(e){
    console.log('clicked',e.target.name)
    const shuffledPokemon = shuffle(pokemons);
    setPokemons(shuffledPokemon.slice(0,12))
    if(clicked.includes(e.target.name)){
      if(total === 4){
        setTotal(0)
      }else{
        setTotal(total + 1);
      }
      if(total > bestScore){
        setBestScore(total)
      }

    }else{
      setClick(...clicked,e.target.name)
    }

  }


  return (
    <>
    <h1 id="title">Pokemon Memory Game</h1>
    <p>Get points by clicking on an image but don't click on any more than once!</p>
    <div id="score">Score:{total}</div>
    <div id="bestScore">Best score:{total > 0? bestScore + 1:bestScore}</div>
    <div className="cardContainer">
     {console.log('count',total,pokemons)}
      { pokemons.map((pokemon,index) =>
      {
        console.log('pokemon 66',pokemon)
        return (<Card  key ={index} img={pokemon.image} desc={pokemon.description} name={pokemon.name} clickFunc={ handleCardClick}/>)
      }


        )
      }



    </div>
    </>
)
  }
// need a flex contianer div for all the cards check
// each card is its own div check
// the top left have title header1 tag check
// the top right have Score in a div and under check
// it another div for Best Score check
// instructions in a p tag under title check
// the cards should come from a state array cards where it initially is mapped with a child card div for each
// the cards div should have a click event with handler function that puts them in a random order and update state by using math.random with some sort algorithm
// for each card in array have the card placed on a random index spot if the spot is empty
// whenever the cards array changes then call the random sort in a use effect
// get the images and text from api and update state of cards





export default App
