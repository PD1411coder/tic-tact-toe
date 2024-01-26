// src/App.js
import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const App = () => {
  const [ playerSymbol, setPlayerSymbol ] = useState( null );

  const handleSymbolSelect = ( symbol ) => {
    setPlayerSymbol( symbol );
  };

  return (
    <div className="app">

      <div className='container'>
        <h1>1-Player TicTacToe</h1>
        <div className="symbol-selector">
          <p>Select your symbol:</p>
          <button onClick={ () => handleSymbolSelect( 'X' ) } disabled={ playerSymbol }>
            X
          </button>
          <button onClick={ () => handleSymbolSelect( 'O' ) } disabled={ playerSymbol }>
            O
          </button>
        </div>{
          playerSymbol ? <Board playerSymbol={ playerSymbol } setPlayerSymbol={ setPlayerSymbol } /> : ''
        }
      </div>
    </div>
  );
};

export default App;
