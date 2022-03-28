import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import {faIdBadge, faRulerVertical, faWeightHanging} from '@fortawesome/free-solid-svg-icons';



function App() {
  //Estados
  const[pokemon, setPokemon] = React.useState("bola.png")
  const[pokeNameID, setPokeNameID] = React.useState('nombre')
  const[pokeID, setPokeID] = React.useState('ID')
  const[pokeType, setPokeType] = React.useState([])
  const[pokeMoves, setPokeMoves] = React.useState([])
  const[pokeHeight, setPokeHeight] = React.useState("")
  const[pokeWeight, setPokeWeight] = React.useState("")
  const[pokeName, setPokeName] = React.useState('');
    
  //obtener los valores de entrada
  const onChange = (event) => {
      setPokeName(event.target.value)
  };

  //guardar el nombre en una variable 
  const onSubmit = (event) => {
      event.preventDefault();
      let pokeNameAPI = pokeName.toLowerCase();
      console.log(pokeNameAPI)
      obtenerPokedatos(pokeNameAPI)
  };
  
  //consumir pokeAPI
  const obtenerPokedatos = async (pokeNameAPI) => {
    const data = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNameAPI}`)
    if(data.status != "200"){
      setPokemon("error.png")
      setPokeNameID("Not found")
      setPokeID("404")
      setPokeType([])
      setPokeMoves([])
      setPokeHeight([])
      setPokeWeight([])
    }
    else{
      const pokeData = await data.json()
      const pokeImg = pokeData.sprites.other.home.front_default
      const pokeDataName = pokeData.name
      const pokeID = pokeData.id
      //const pokeType = pokeData.types[0].type.name <- consumir un solo item del valor
      const pokeType = pokeData.types.map((item) => <li key={item.slot}><button className="bg-red-600 px-4 py-2 rounded-full mr-4 ml-4 text-center"> {item.type.name}</button></li>)
      const pokeMoves = pokeData.moves.map((item,index) => <li key={item.index}><button className="bg-amber-500 px-4 py-1 rounded-full mt-1 text-center font-bold"> {item.move.name}</button></li>)
      const pokeHeight = pokeData.height
      const pokeWeight = pokeData.weight
      setPokemon(pokeImg)
      setPokeNameID(pokeDataName)
      setPokeID(pokeID)
      setPokeType(pokeType)
      setPokeMoves(pokeMoves)
      setPokeHeight(pokeHeight)
      setPokeWeight(pokeWeight)
    }
  }

  return (
    <form onSubmit = {onSubmit} className="bg-red-800">  
      
      <div className="grid grid-cols-1 place-items-center">
        <img className="w-auto h-20  "src="pokedeex.png"></img>
      </div>

      <div className="grid grid-cols-4 gap-2 px-5 py-2 md:ml-6 md:px-24 lg:px-40 xl:px-60"> 
        <div className="col-span-3 ">
          <input className="w-full text-center p-2 rounded-md border shadow-sm focus:outline-none focus:border-blue-800 focus:ring-1"
                value={pokeName}
                onChange={onChange}
                placeholder="Ingresa el nombre o ID de un pokemon"
            />
        </div>
        <div className= "">
            <button type="submmit"
                    className="w-28 lg:w-32 text-center rounded-md bg-blue-800 hover:bg-white ">
              <p className="w-full h-full p-2 text-white hover:text-blue-900">Buscar</p> 
            </button>
        </div>
      </div>

      {/* Pokedex */}
      <div className="w-full h-full py-5 px-5 md:px-28 xl:px-60">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full bg-amber-500 rounded-lg p-4">
          
          {/* Pokeimagen */}
          <div className="w-full h-60 z-10">
            <button className="font-sans text-base  box-decoration-clone bg-blue-800 text-white px-8 py-2 rounded-full ">
              <FontAwesomeIcon icon={faIdBadge}/> {' '+pokeID + ' : '+pokeNameID}
            </button>
            <img className="w-auto h-64 md:h-72 2xl:h-96 2xl:mt-12 md:mt-6 ml-auto mr-auto" src={pokemon}></img>
          </div>

          {/* Pokedatos */}
          <div className="w-full h-full bg-white rounded-lg px-4 ">
            
            <div className="w-full h-12">
              <ul className="flex place-content-center mt-16 md:mt-2 text-white font-mono">{pokeType}</ul>
            </div>

            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
              <div>
                <p className="datoswh  text-blue-800"><FontAwesomeIcon icon={faRulerVertical} className="text-3xl text-blue-800" />{' '+pokeHeight/10+' m'}</p>
              </div>
              <div>
                <p className="datoswh text-blue-800"><FontAwesomeIcon icon={faWeightHanging} className="text-3xl text-blue-800" />{' '+pokeWeight/10 +' Kg'}</p>
              </div>
            </div>

            <div className="w-full h-auto text-center">
              <p className="text-xl font-extrabold font-sans text-amber-500">Movimientos</p>
            </div>

            <div className="w-full h-80 2xl:h-96 text-center ">
              
              <ul className="max-h-full overflow-auto scrollbaredit">{pokeMoves}</ul>
            </div>
          </div>
        </div>
      </div>
    </form>

    

  );
}

export default App;
