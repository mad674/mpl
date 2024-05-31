import React, { useState, useEffect } from 'react';
// import './App.css';

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
  // console.log(numbers)
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
const imageSets=["/images1.jpeg","/images2.jpeg", "/images3.jpeg", "/images4.jpeg", "/images5.jpeg", "/images6.jpeg", "/images7.jpeg", "/images8.jpeg", "/images9.jpeg", "/images10.jpeg", "/images11.jpeg", "/images12.jpeg"];
function App() {
  const [board, setBoard] = useState(Array(12).fill(null));
  const [currentSet, setCurrentSet] = useState([]);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [matches, setMatches] = useState(0);
  const [message, setMessage] = useState('');
  const [matches1, setMatches1] = useState(0);
  const [message1,setMessage1]=useState('');
  
  useEffect(() => {
    let li=generateUniqueRandomNumbers(1,12,6);
    let lo=li.concat(li);
    let l=shuffleArray(lo);
    console.log(lo);
    let f=[];
    for(let i=0;i<l.length;i++){
      f.push(imageSets[l[i]-1]);
    }
    console.log(f);
    setCurrentSet(f);
  }, []);

  useEffect(() =>{
    // let f=0;
    if (firstPick !== null && secondPick !== null) {
      if (currentSet[firstPick] === currentSet[secondPick]) {
        setMessage('CORRECT MATCH');
        setMatches(matches + 2);
        setMatches1(matches1+2);
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
  }, [secondPick, currentSet, firstPick, matches,matches1]);

  useEffect(() => {
    if (matches1 === 12) {
      setMessage1('Game Over!');
    }
  }, [matches1]);

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
    setMatches(0);
    setMatches1(0);
    setMessage('');
    setMessage1('');
    let li=generateUniqueRandomNumbers(1,12,6);
    let lo=li.concat(li);
    let l=shuffleArray(lo);
    console.log(l);
    let f=[];
    for(let i=0;i<l.length;i++){
      f.push(imageSets[l[i]-1]);
    }
    console.log(f);
    setCurrentSet(f);
  };

  return(
    <div class="screen">
      <h1><u><b style={{color: '#FF5733 ', font: '1em sans-serif'}}>Match The Movie-Pair's</b></u></h1>
      <h2 id="i" style={{color: 'blue', font: '1em'}}>{message}</h2>
      <div className="container">
        {board.map((box, index) => (
          <button key={index} className="box screen" onClick={() => handleBoxClick(index)}>
            {box && <img src={box} alt="" height="87px" width="87px" style={{ backgroundColor: 'white' }} />}
          </button>
        ))}
      </div>
      <h2 id="r"><b style={{color: 'rgb(224, 12, 210)', font: '1em sans-serif'}} />{message1}</h2>
      <button id="re" onClick={resetGame}>RESTART</button>
    </div>
  );
}
export default App;







