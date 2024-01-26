// src/components/Board.js
import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = ( { playerSymbol, setPlayerSymbol } ) => {
    const [ board, setBoard ] = useState( Array( 9 ).fill( null ) );
    const [ player, setPlayer ] = useState( playerSymbol );
    const [ winner, setWinner ] = useState( null );
    const [ winningSquares, setWinningSquares ] = useState( [] );

    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    useEffect( () => {
        const hasWinner = checkWinner();
        if ( !hasWinner && player === computerSymbol ) {
            makeComputerMove();
        }
    }, [ board, player, winner ] );

    const makeComputerMove = async () => {
        const response = await fetch( 'https://hiring-react-assignment.vercel.app/api/bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( board ),
        } );

        const data = await response.json();

        if ( !winner && board[ data ] === null ) {
            const newBoard = [ ...board ];
            newBoard[ data ] = computerSymbol;
            setBoard( newBoard );
            setPlayer( playerSymbol );
        }
    };

    const handleClick = ( index ) => {
        if ( board[ index ] === null && player === playerSymbol && !winner ) {
            const newBoard = [ ...board ];
            newBoard[ index ] = playerSymbol;
            setBoard( newBoard );
            setPlayer( playerSymbol === 'X' ? 'O' : 'X' );
        }
    };

    const checkWinner = () => {
        const lines = [
            [ 0, 1, 2 ],
            [ 3, 4, 5 ],
            [ 6, 7, 8 ],
            [ 0, 3, 6 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 0, 4, 8 ],
            [ 2, 4, 6 ],
        ];

        for ( let i = 0; i < lines.length; i++ ) {
            const [ a, b, c ] = lines[ i ];
            if ( board[ a ] && board[ a ] === board[ b ] && board[ a ] === board[ c ] ) {
                setWinner( () => board[ a ] );
                setWinningSquares( [ a, b, c ] );
                return board[ a ];
            }
        }
    };

    const resetGame = () => {
        setBoard( Array( 9 ).fill( null ) );
        setPlayer( playerSymbol );
        setWinner( null );
        setWinningSquares( [] );
        setPlayerSymbol( null );
    };

    const renderSquare = ( index ) => (
        <div className={ `square ${ winner && winningSquares.includes( index ) ? 'winner' : '' }` } onClick={ () => handleClick( index ) }>
            { board[ index ] }
        </div>
    );

    return (
        <div>
            <div className="board">
                { board.map( ( square, index ) => (
                    <React.Fragment key={ index }>{ renderSquare( index ) }</React.Fragment>
                ) )
                }

            </div>
            { winner ? <div className="message"><h1>{ winner } won!</h1>
                <button className='reset' onClick={ resetGame }>Reset Game</button>
            </div> : '' }
        </div>
    );
};

export default Board;
