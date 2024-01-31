import './App.css';
import RenderUsers from './components/Users.js';
import { useState } from 'react';

function App() {

const [selectedPlayer, setSelectedPlayer] = useState(null)

  return (
    <div className="App">
      <RenderUsers onSelect={setSelectedPlayer} />
    </div>
  );
}

export default App;
