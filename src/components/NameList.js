import React, { useState, useRef, useEffect } from 'react';
import userIcon from '../img/user-icon.svg';
import userIconWhite from '../img/user-icon-white.svg';
import userIconHover from '../img/user-icon-hover.svg';
import plusSymbolWhite from '../img/plus-symbol.svg';
import plusSymbolHover from '../img/plus-symbol-hover.svg';
import warningIcon from '../img/warning.svg';

function NameList({ names, onAddName, onRemoveName, onAddAllNames, errorMessage, clearErrorMessage, removeAllNames }) {
  const [newName, setNewName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const listContainerRef = useRef(null);

  const handleInputChange = e => {
    setNewName(e.target.value);
    if (errorMessage) {
      clearErrorMessage(); 
    }
  };

  const handleAddName = () => {
    if (newName.trim()) {
      const nameParts = newName.trim().split(' ');
      const capitalizedParts = nameParts.map(part => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      });
      const capitalizedNewName = capitalizedParts.join(' ');
      onAddName(capitalizedNewName);
      setNewName('');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddName();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true); 
  };

  const handleMouseLeave = () => {
    setIsHovered(false); 
  };

  const handlePlusMouseEnter = () => {
    setIsPlusHovered(true); 
  };

  const handlePlusMouseLeave = () => {
    setIsPlusHovered(false); 
  };

  // Scroll to the bottom of the list when it updates
  useEffect(() => {
    const lastItem = listContainerRef.current.lastElementChild;
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [names]);

  return (
    <div>
      <div className="input-container">
        <button
          className="button-action button-input"
          onClick={onAddAllNames}
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        >
          <img
            src={isHovered ? userIconHover : userIconWhite}
            alt="add all employees"
          />
        </button>
        <input
          type="text"
          placeholder="Add a colleague..."
          value={newName}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="button-action button-input" onClick={handleAddName} onMouseEnter={handlePlusMouseEnter} 
          onMouseLeave={handlePlusMouseLeave} >
        <img
            src={isPlusHovered ? plusSymbolHover : plusSymbolWhite}
            alt="add all employees"
          />
        </button>
        {errorMessage && <div className="error-message"><img src={warningIcon} className='warning-icon' alt='warning icon'/>{errorMessage}</div>}
      </div>
      <div className="name-list-container">
        <div className='list-item-container'>
            <div className='list-item'>
            {names.length > 0 && <h2 className="list-title">Participants</h2>}
              <ul ref={listContainerRef} className="name-list">
                {names.map((name, index) => (
                  <li key={index} className="name-item">
                    <img src={userIcon} alt="user icon" className="user-icon" />
                    {name}
                    <button
                      className="button-x-remove"
                      onClick={() => onRemoveName(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {names.length > 0 && <button className="button-action button-remove-all-name" onClick={removeAllNames}>
                Remove All
          </button>}
      </div>
    </div>
  );
}

export default NameList;