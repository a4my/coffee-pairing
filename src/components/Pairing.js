import React, { useState, useEffect } from 'react';
import Pair2 from '../img/2-persons.svg';
import Pair3 from '../img/3-persons.svg';
import Pair4 from '../img/4-persons.svg';

function Pairing({ names, onPair }) {
  const [pairingSize, setPairingSize] = useState(2);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      handlePair();
    } else {
      setFirstRender(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairingSize]);

  const handlePair = () => {
    const availableNames = [...names];
    const pairs = [];

    while (availableNames.length >= pairingSize) {
      const pair = [];
      for (let i = 0; i < pairingSize; i++) {
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        pair.push(availableNames[randomIndex]);
        availableNames.splice(randomIndex, 1);
      }
      pairs.push(pair);
    }

    if (availableNames.length > 0) {
      pairs.push(availableNames);
    }

    onPair(pairs);
  };

  const handlePairingSize = (size) => {
    if(size !== pairingSize) {
      setPairingSize(size);
    } else {
      handlePair();
    }
  };

  return (
    <div className="pairing-container">
      <h1 className='pairing-title'>Let's get people together!</h1>
      <div className="pairing-size-buttons">
        <button
          className='button-pairing'
          onClick={() => handlePairingSize(2)}
        >
          <img src={Pair2} alt="Pair 2" />
        </button>
        <button
          className='button-pairing'
          onClick={() => handlePairingSize(3)}
        >
          <img src={Pair3} alt="Pair 3" />
        </button>
        <button
          className='button-pairing'
          onClick={() => handlePairingSize(4)}
        >
          <img src={Pair4} alt="Pair 4" />
        </button>
      </div>
    </div>
  );
}

export default Pairing;
