import React, { useState } from 'react'
import userIcon from '../img/user-icon.svg'
import userIconWhite from '../img/user-icon-white.svg'
import { employeeList } from '../employeeList'

function NameList({ names, allEmployeesList, onAddName, onRemoveName }) {
  const [newName, setNewName] = useState('')
  const [displayEmployeeList, setDisplayEmployeeList] = useState([])

  const handleInputChange = e => {
    setNewName(e.target.value)
  }

  const handleAddName = () => {
    if (newName.trim()) {
      onAddName(newName.trim())
      setNewName('')
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddName()
    }
  }

  const handleAddEmployees = () => {
    setDisplayEmployeeList(employeeList.map(employee => employee.name))
  }

  // Decide which list to display based on displayEmployeeList
  const displayList =
    displayEmployeeList.length > 0 ? displayEmployeeList : names

  return (
    <div className="name-list-container">
      <div className="input-container">
        <button
          className="button-action button-add-employee"
          onClick={handleAddEmployees}
        >
          <img src={userIconWhite} alt="add all employees" />
        </button>
        <input
          type="text"
          placeholder="Add a name"
          value={newName}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="button-action" onClick={handleAddName}>
          Add
        </button>
      </div>
      <ul className="name-list">
        {displayList.map((name, index) => (
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
  )
}

export default NameList
