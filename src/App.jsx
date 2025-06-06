import './App.css';
import Pack from './components/Pack';
import Pool from './components/Pool';
// import text from './assets/MTGOVintageCube.txt?raw';
import Card from './components/Card';
import data from '/src/cube.json';
import { useCallback, useState } from 'react';

function App() {
  const [cardPool, setCardPool] = useState(Object.values(data));
  const [numPack, setNumPack] = useState(0);
  const [pick, setPick] = useState([]);
  const [playerPool, setPlayerPool] = useState([]);
  const [confirmPicks, setConfirmPicks] = useState(false);

  const shuffler = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStart = () => {
    setCardPool(shuffler(cardPool));
    setNumPack(0);
    setPick([]);
    setPlayerPool([]);
  };

  const handleNext = () => {
    setPlayerPool((prev) => {
      return [...prev, pick];
    });
    setConfirmPicks(true);
    setPick([]);
    setNumPack((numPack) => numPack + 1);
  };

  const handleCallback = useCallback((cmd, val) => {
    switch (cmd) {
      case 'unselect':
        setConfirmPicks(false);
        break;
      case 'pickCard':
        setPlayerPool((prev) => {
          return [...prev, pick].flat();
        });
        break;
    }
  }, []);

  const currentPack = () => {
    return cardPool.slice(1 + numPack * 15, 16 + numPack * 15);
  };

  const handleBack = () => {
    setNumPack((numPack) => numPack - 1);
  };

  const handleCardPick = (data) => {
    setPick((prev) => {
      const isSelected = prev.includes(data);

      if (isSelected) {
        return prev.filter((i) => i !== data);
      } else if (prev.length < 2) {
        return [...prev, data];
      }
      return prev;
    });
  };

  const isButtonDisabled = pick.length < 2;

  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleStart}>Restart</button>
        <button onClick={handleNext} disabled={isButtonDisabled}>
          Confirm Picks
        </button>
        <button onClick={handleBack}>Back</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {pick.map((card, index) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index}>
              <p>{card.name}</p>
            </div>
          );
        })}
      </div>

      <Pack pack={currentPack()} onPick={handleCardPick} confirmPicks={confirmPicks} doCallback={handleCallback} />
      <h1>Pool</h1>
      <Pool pool={playerPool} onPick={handleCardPick} confirmPicks={confirmPicks} doCallback={handleCallback} />
    </>
  );
}

export default App;
