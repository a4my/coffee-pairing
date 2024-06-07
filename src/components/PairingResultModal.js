import React, { useState, useEffect, useRef, useCallback } from 'react';
import RouletteLoader from './Roulette';

const PairingResultModal = ({ isOpen, pairings, onClose, onDownloadResults }) => {
  const modalRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowLoader(true);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={handleClose}>&times;</span>
        <div className="pairing-result-container">
          {showLoader ? (
            <RouletteLoader />
          ) : (
            <>
              {pairings.map((pair, index) => (
                <div key={index} className="pairing-result">
                  {pair.map((name, i) => (
                    <React.Fragment key={i}>
                      {name}
                      {i !== pair.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              ))}
              <button className="pairing-result download-button" onClick={onDownloadResults}>
                Download Results
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PairingResultModal;
