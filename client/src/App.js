import './App.css';
import { useState } from 'react';
import HighLow from './components/HighLow';
import RenderUsers from './components/Users.js';

function App() {
  const [game, setGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleBack = () => {
    setGame(null);
  }

  return (
    <div className="App">
      {selectedPlayer ?
        (
          <div>
            <div className='playerData'>{game && game.toUpperCase()} 🪙{selectedPlayer['coin_balance']} {selectedPlayer.username}</div>
            <div className='playArea'>
              {game === 'highlow' ? (
                <HighLow onBack={handleBack} id={selectedPlayer['_id']}/>
              ) : game === 'blackjack' ? (
                <div>
                  <button onClick={handleBack}>Go Back</button>
                  <h1>Blackjack component comes here</h1>
                </div>
              ) : (
                <div>
                  <button onClick={() => { setGame('blackjack') }}>BlackJack</button>
                  <button onClick={() => { setGame('highlow') }}>High-Low</button>
                </div>
              )}
            </div>
          </div>) :
        (<RenderUsers onSelect={setSelectedPlayer} />)}

    </div>
  );
}

export default App;
