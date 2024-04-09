// NameList.js
import React, { useState } from 'react';
import userIcon from '../img/user-icon.svg';
import userIconWhite from '../img/user-icon-white.svg';
import userIconHover from '../img/user-icon-hover.svg';
import plusSymbolWhite from '../img/plus-symbol.svg';
import plusSymbolHover from '../img/plus-symbol-hover.svg';
import warningIcon from '../img/warning.svg';

function NameList({ names, onAddName, onRemoveName, onAddAllNames, errorMessage, clearErrorMessage }) {
  const [newName, setNewName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

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

  return (
    <div className="name-list-container">
      <div className="input-container">
        <button
          className="button-action button-add-employee"
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
          placeholder="Add a name"
          value={newName}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="button-action" onClick={handleAddName} onMouseEnter={handlePlusMouseEnter} 
          onMouseLeave={handlePlusMouseLeave} >
        <img
            src={isPlusHovered ? plusSymbolHover : plusSymbolWhite}
            alt="add all employees"
          />
        </button>
      {errorMessage && <div className="error-message"><img src={warningIcon} className='warning-icon' alt='warning icon'/>{errorMessage}</div>}
      </div>
      <ul className="name-list">
        {names.map((name, index) => (
          <li key={index} className="name-item">
            <img src={userIcon} alt="user icon" className="user-icon" />
            {name}
            <button
              className="button-remove"
              onClick={() => onRemoveName(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NameList;
