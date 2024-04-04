import React, { useState } from 'react';
import userIcon from '../img/user-icon.svg';

function NameList({ names, onAddName, onRemoveName }) {
  const [newName, setNewName] = useState('');

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAddName = () => {
    if (newName.trim()) {
      onAddName(newName.trim());
      setNewName('');
    }
  };

  return (
    <div className="name-list-container"> 
      <div className="input-container"> 
        <input type="text" placeholder="Add a name" value={newName} onChange={handleInputChange} />
        <button className="button-action" onClick={handleAddName}>Add</button>
      </div>
      <ul className="name-list"> 
        {names.map((name, index) => (
          <li key={index} className="name-item">
            <img src={userIcon} alt="user icon" className="user-icon" />
            {name}
            <button className="button-remove" onClick={() => onRemoveName(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NameList;