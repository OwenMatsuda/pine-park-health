import React from 'react';
import './App.css';
import {default as Pokemons} from './Pokemon.js';

function App() {
  return (
    <div className="App">
        <h1 style={{textAlign: "center", fontSize: "48px"}}>Pokemon</h1>
        <div style={{width: "75%", display: "flex", margin: "0 auto", padding: "20px"}}>
            <Pokemons />
        </div>
    </div>
  );
}

export default App;
