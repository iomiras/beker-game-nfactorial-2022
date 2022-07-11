import { useState } from 'react';
import './App.css';
import { data } from './data';
let elements = data

function App() {
  const [index, setIndex] = useState(0)
  const [userValue, setUserValue] = useState('')
  const [priceInputState, setPriceInputState] = useState('')
  const [realPriceState, setRealPriceState] = useState('none')
  const [gameState, setGameState] = useState('none')
  const [score, setScore] = useState(0)
  const [points, setPoints] = useState(0)
  const [gamePassState, setGamePassState] = useState(false)

  const element = elements[index]
  const startGame = () => {
    setPoints(0)
    setScore(0)
    setGameState('')
    const questionsNumber = 3
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    elements = shuffled.slice(0, questionsNumber)
  }

  const showResults = () => {
    setPriceInputState('none')
    setRealPriceState('')
    let userPrice = parseInt(userValue)
    let realPrice = parseInt(element.intPrice)
    let deltaPrice = Math.abs(userPrice - realPrice)
    if (deltaPrice > 0.85 * realPrice || !userPrice) { setPoints(0); setScore(score + 0) }
    else {
      let point = Math.floor(1000 - deltaPrice / realPrice * 1000)
      setPoints(point);
      setScore(score + point)
    }
    // if (index < 2) setIndex(index + 1)
    // else setIndex(0)
  }

  const changeRound = () => {
    setPriceInputState('')
    setRealPriceState('none')
    setUserValue('')
    if (index < 2) setIndex(index + 1)
    else finishGame()
  }

  const handleChange = (event) => {
    setUserValue(event.target.value)
  }

  const finishGame = () => {
    setIndex(0)
    setGameState('none')
    setGamePassState(true)
  }

  return (
    <div className="App">
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&family=Rubik:wght@300&display=swap" rel="stylesheet" />
      </>

      <div className='main-menu-wrapper' style={{ display: gameState ? '' : 'none' }}>
        <div className='game-title'>Шығын.kz</div>
        <div className='prev-result' style={{ display: gamePassState ? 'none' : '' }}>Попробуй угадать сколько было потрачено денег на гос. заказы</div>
        <div className='prev-result' style={{ display: gamePassState ? '' : 'none' }}>You scored <b>{score}/3000</b>.</div>
        <div className='prev-result' style={{ display: gamePassState ? '' : 'none' }}>{score >= 1500 ? 'Congratulations!' : ''} You are {score >= 1500 ? 'a responsible' : 'an irresponsible'} citizen!</div>
        <button onClick={startGame} className='start-button' type='submit'>Play {gamePassState ? 'again' : ''}</button>
      </div>

      <div className='game-wrapper' style={{ display: gameState ? gameState : '' }}>
        <div className='round-order'>
          Round {index + 1}/3
        </div>

        <div className='item-name'>
          {element.name}
        </div>

        <div className='image-wrapper'>
          <div className='price-wrapper' style={{ display: realPriceState ? realPriceState : '' }}>
            <div className='real-price'>
              <div className='item-price' >{element.price} ₸</div>
              <div className='item-price'>{element.usdPrice} $</div>
            </div>
          </div>
          <img src={element.photo} alt="auction item" />
        </div>

        <div className='item-desc'>
          {element.desc}
        </div>

        <div className='guess-row' style={{ display: priceInputState ? priceInputState : '' }}>
          <input className='price-input' placeholder='₸0' type="number" onChange={handleChange} value={userValue} />
          <button className='submit' onClick={showResults}></button>
        </div>

        <div className='next-row' style={{ display: realPriceState ? realPriceState : '' }}>
          <div className='points'>{points} points</div>
          <button className='next-button' onClick={changeRound}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
