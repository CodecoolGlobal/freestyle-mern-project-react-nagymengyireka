import './App.css';
import { useState, useEffect } from 'react';
import HighLow from './components/HighLow';

function App() {
  const [game, setGame] = useState(null);

  const handleBack = () => {
    setGame(null);
  }

  return (
    <div className="App">
      <header>coin balance, player icon and later history key</header>
      <div className='playArea'>
        {game === 'highlow' ? (
          <HighLow onBack={handleBack}/>
        ) : game === 'blackjack' ? (
          <div>
            <button onClick={handleBack}>Go Back</button>
            <h1>Blackjack component comes here</h1>
          </div>
        ) : (
          <div>
            <button onClick={() => {setGame('blackjack')}}>BlackJack</button>
            <button onClick={() => {setGame('highlow')}}>High-Low</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
