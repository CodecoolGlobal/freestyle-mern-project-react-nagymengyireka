
import { useState } from 'react';
import HighLow from './components/HighLow';
import RenderUsers from './components/Users.js';
import Header from './components/Header';
import './App.css';

function App() {
    const user1IconUrl = 'https://i.ibb.co/SX5bGSy/def-User-Pic.png'
  const balanceIconUrl= "https://i.ibb.co/GMSCpzf/coinPic.png"
  const casinoLogoUrl = 'https://i.ibb.co/b5S8JY8/cardDeck.png'
  const [game, setGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [balance, setBalance] = useState(1000); 


  const handleBack = () => {
    setGame(null);
  }

  return (
    <div className="App">
      {selectedPlayer ?
        (
          <div>
            <Header casinoLogo={casinoLogoUrl} balance={balance} iconURL={user1IconUrl} balanceIcon={balanceIconUrl} />
            <div className='playArea'>
              {game === 'highlow' ? (
               <HighLow onBack={handleBack} id={selectedPlayer['_id']} balance={balance} updateBalance={setBalance} />
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
