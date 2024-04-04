import React, { useState } from 'react';

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
    <div>
      <h2 className='name-title'>Names</h2>
      <input type="text" value={newName} onChange={handleInputChange} />
      <button  onClick={handleAddName}>Add</button>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => onRemoveName(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NameList;