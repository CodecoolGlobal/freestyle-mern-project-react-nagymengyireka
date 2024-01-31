import './App.css';
import './components/Header'
import Header from './components/Header';

function App() {
  const user1IconUrl = 'https://i.ibb.co/SX5bGSy/def-User-Pic.png'
  const balanceIconUrl= "https://i.ibb.co/GMSCpzf/coinPic.png"
  const casinoLogoUrl = 'https://i.ibb.co/b5S8JY8/cardDeck.png'
  return (
    <div className="App">
      <Header casinoLogo={casinoLogoUrl} balance={'18500'} iconURL={user1IconUrl} balanceIcon={balanceIconUrl} />
    </div>
  );
}

export default App;
