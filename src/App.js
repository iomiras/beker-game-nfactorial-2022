import { useState } from 'react';
import './App.css';
import { elements } from './data';

function App() {
  const [index, setIndex] = useState(0)
  const [userValue, setUserValue] = useState('')
  const [priceInputState, setPriceInputState] = useState('')
  const [realPriceState, setRealPriceState] = useState('none')
  const [score, setScore] = useState(0)
  const [points, setPoints] = useState(0)
  const element = elements[index]

  const showResults = () => {
    setPriceInputState('none')
    setRealPriceState('')
    let userPrice = parseInt(userValue)
    let realPrice = parseInt(element.intPrice)
    let deltaPrice = Math.abs(userPrice - realPrice)
    if (deltaPrice > 0.85 * realPrice) { setPoints(0); setScore(score + 0) }
    else {
      setPoints(Math.floor(1000 - deltaPrice / realPrice * 1000));
      setScore(score + points)
    }
    // if (index < 2) setIndex(index + 1)
    // else setIndex(0)
  }

  const handleChange = (event) => {
    setUserValue(event.target.value)
  }

  //  style={{ display: "none" }}

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&family=Rubik:wght@300&display=swap" rel="stylesheet" />

      <div className='game-wrapper'>
        <div className='round-points'>
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
          <button className='next-button'>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
