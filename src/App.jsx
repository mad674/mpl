import React, { useState, useEffect } from 'react';

function generateUniqueRandomNumbers(min, max, count) {
  if (max - min + 1 < count) {
      throw new Error("Range is too small to generate the required number of unique numbers.");
  }

  let numbers = [];
  for (let i = min; i <= max; i++) {
      numbers.push(i);
  }

  // Fisher-Yates Shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap
  }
  return numbers.slice(0, count); // Get the first 'count' elements
}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const imageSets = [
  "/images1.jpeg", "/images2.jpeg", "/images3.jpeg", "/images4.jpeg", 
  "/images5.jpeg", "/images6.jpeg", "/images7.jpeg", "/images8.jpeg", 
  "/images9.jpeg", "/images10.jpeg", "/images11.jpeg", "/images12.jpeg",
  "/images13.jpeg","/images14.jpeg","/images15.jpeg","/images16.jpeg",
  "/images17.jpeg","/images18.jpeg","/images19.jpeg","/images20.jpeg",
];

function App() {
  const [board, setBoard] = useState(Array(12).fill(null));
  const [currentSet, setCurrentSet] = useState([]);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');

  // Initialize the game
  useEffect(() => {
    let li = generateUniqueRandomNumbers(1, 20, 6);
    let lo = li.concat(li);
    let l = shuffleArray(lo);
    let f = [];
    for (let i = 0; i < l.length; i++) {
      f.push(imageSets[l[i] - 1]);
    }
    setCurrentSet(f);
  }, []);

  // Handle pick logic
  useEffect(() => {
    if (firstPick !== null && secondPick !== null) {
      setMoves(moves + 1);
      if (currentSet[firstPick] === currentSet[secondPick]) {
        setMessage('CORRECT MATCH');
        setMatches(matches + 1);
      } else {
        setMessage('INCORRECT MATCH');
        setTimeout(() => {
          setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[firstPick] = null;
            newBoard[secondPick] = null;
            return newBoard;
          });
        }, 500);
      }
      setFirstPick(null);
      setSecondPick(null);
    }
  }, [secondPick, currentSet, firstPick, matches, moves]);

  // Check if the game is over
  useEffect(() => {
    if (matches === 6) {
      setMessage1('Game Over!');
    }
  }, [matches]);

  const handleBoxClick = (index) => {
    if (board[index] !== null || firstPick === index || secondPick === index) return;
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = currentSet[index];
      return newBoard;
    });

    if (firstPick === null) {
      setFirstPick(index);
    } else {
      setSecondPick(index);
    }
  };

  const resetGame = () => {
    setBoard(Array(12).fill(null));
    setFirstPick(null);
    setSecondPick(null);
    setMoves(0);
    setMatches(0);
    setMessage('');
    setMessage1('');
    let li = generateUniqueRandomNumbers(1, 20, 6);
    let lo = li.concat(li);
    let l = shuffleArray(lo);
    let f = [];
    for (let i = 0; i < l.length; i++) {
      f.push(imageSets[l[i] - 1]);
    }
    setCurrentSet(f);
  };

  return (
    <div className="screen">
      <h1>
        Match The Movie-Pair's
      </h1>
      <div className="stats">
        <h2>Moves Taken: {moves}</h2>
        <h2>Pairs Matched: {matches}/6</h2>
      </div>
      <div id="i">
        <h3 style={{ color: 'blue', font: '1em' }}>{message}</h3>
      </div>
      <div className="container">
        {board.map((box, index) => (
          <button key={index} className="box screen" onClick={() => handleBoxClick(index)}>
            {box && <img className="pho"src={box} alt="img" style={{ backgroundColor: 'white' }} />}
          </button>
        ))}
      </div>
      <div id="r">
        <h3>{message1}</h3>
      </div>
      <button id="re" onClick={resetGame}>RESTART</button>
    </div>
  );
}

export default App;
