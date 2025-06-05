import './App.css';
import Pack from './components/Pack';
import Pool from './components/Pool';
import text from './assets/MTGOVintageCube.txt?raw';
//import data from '/src/cube.json';
import { useState } from 'react';

function App() {
  const [cardPool, setCardPool] = useState([]);
  const [numPack, setNumPack] = useState(0);

  const createCardPool = () => {
    var cardPool = [];
    const fileLines = text.trim().split('\r\n');
    fileLines.forEach((line) => {
      cardPool = [...cardPool, line];
    });

    return cardPool;
  };

  const shuffler = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStart = () => {
    setCardPool(shuffler(createCardPool()));
    setNumPack(0);
  };

  const handleNext = () => {
    setNumPack(numPack + 1);
  };

  const currentPack = () => {
    return cardPool.slice(1 + numPack * 15, 16 + numPack * 15);
  };

  const handleBack = () => {
    setNumPack(numPack - 1);
  };

  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleStart}>Restart</button>
        <button onClick={handleNext}>Next Pack</button>
        <button onClick={handleBack}>Back</button>
      </div>

      <Pack pack={currentPack()} />
    </>
  );
}

export default App;
