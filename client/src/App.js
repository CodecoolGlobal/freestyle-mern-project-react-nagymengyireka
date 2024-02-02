import { useState } from 'react';
import HighLow from './components/HighLow';
import RenderUsers from './components/Users.js';
import Header from './components/Header';
import BlackJack from './components/BlackJack'
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [balance, setBalance] = useState(null);


  const handleBack = () => {
    setGame(null);
  }

  const handleLogout = () => {
    setSelectedPlayer(null); // Reset selected player
    setGame(null); // Reset game
  }

  return (
    <div className="App">
      {selectedPlayer ? (
        <div>
          <Header balance={balance} logOut={handleLogout}/>
          <div className='playArea'>
            {game === 'highlow' ? (
              <HighLow onBack={handleBack} id={selectedPlayer['_id']} balance={balance} updateBalance={setBalance} />
            ) : game === 'blackjack' ? (
              <div>
                <button id="back-btn"onClick={handleBack}>Go Back</button>
                <BlackJack onBack={handleBack}/>
              </div>
            ) : (
              <div>
                <button onClick={() => { setGame('blackjack') }}>BlackJack</button>
                <button onClick={() => { setGame('highlow') }}>High-Low</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <RenderUsers onSelect={setSelectedPlayer} setCoins={setBalance}/>
      )}
    </div>
  );
}

export default App;
