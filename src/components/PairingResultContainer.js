import React from 'react';
import Loader from './Loader';

const PairingResultContainer = ({ rouletteLoading, names, pairings, handleDownload }) => {
  return (
    <div className="pairing-result-container">
      {rouletteLoading && names.length > 0 ? (
        <Loader />
      ) : (
        pairings.map((pair, index) => (
          <div key={index} className="pairing-result">
            {pair.map((name, i) => (
              <React.Fragment key={i}>
                {name}
                {i !== pair.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        ))
      )}
      {!rouletteLoading && pairings.length > 0 && <button className="pairing-result download-button" onClick={handleDownload}>Download Groups</button>}
    </div>
  );
};

export default PairingResultContainer;
