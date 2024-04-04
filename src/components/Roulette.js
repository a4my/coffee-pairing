import React, { useState } from 'react';

function Roulette({ onPairNames }) {
  const [showPopup, setShowPopup] = useState(false);
  const [pairedNames, setPairedNames] = useState([]);

  const handlePairNames = () => {
    onPairNames();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPairedNames([]);
  };

  return (
    <div>
      <h2 className="rouletteTitle">Roulette</h2>
      <button className="button-action" onClick={handlePairNames}>Pair Names</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Paired Names</h3>
            <p>{pairedNames.join(' and ')}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roulette;