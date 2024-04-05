import React, { useState, useEffect } from 'react'
import NameList from './components/NameList'
import Roulette from './components/Roulette'
import { loadNames, saveNames } from './utils'
import { employeeList } from './employeeList'
import everyoneTVLogo from './img/ETV_logo.svg'
import footerImage from './img/ETV_footer.png'
import './App.css'

function App() {
  const [names, setNames] = useState([])
  const [pairings, setPairings] = useState([])
  const [displayEmployeeList, setDisplayEmployeeList] = useState([])


  useEffect(() => {
    const storedNames = loadNames()
    setNames(storedNames)
  }, [])

  const handleAddName = name => {
    setNames([...names, name])
    saveNames([...names, name])
  }

  const handleRemoveName = index => {
    const updatedNames = [...names]
    updatedNames.splice(index, 1)
    setNames(updatedNames)
    saveNames(updatedNames)
  }

  const handleAddEmployees = () => {
    setDisplayEmployeeList(employeeList.map(employee => employee.name))
    setNames(displayEmployeeList)
  }

  const handlePairNames = () => {
    if (names.length < 2) return

    const available = names.filter(
      (_, i) => !pairings.some(pair => pair.includes(i))
    )
    const indices = []

    while (indices.length < 2) {
      const randomIndex = Math.floor(Math.random() * available.length)
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex)
      }
    }

    const pair = indices.map(i => available[i])
    setPairings([...pairings, pair])
  }

  const handleResetPairings = () => {
    setPairings([])
  }

  const handleRemoveAllNames = () => {
    setNames([])
    saveNames([])
  }

  return (
    <div className="App">
      <img src={everyoneTVLogo} alt="EveryoneTV Logo" className="logo" />
      <h1 className="appTitle">ETV Coffee Roulette</h1>
      <div className="appContent">
        <NameList
          names={names}
          onAddName={handleAddName}
          onRemoveName={handleRemoveName}
          onAddAllNames={handleAddEmployees}
        />
        <div className="buttons-container">
          <button className="button-action" onClick={handleRemoveAllNames}>
            Remove All Names
          </button>
          <Roulette onPairNames={handlePairNames} />
          {/* <PairingsTable pairings={pairings} /> */}
          <button className="button-action" onClick={handleResetPairings}>
            Reset Pairings
          </button>
        </div>
      </div>
      <div className="footer-container">
        <img src={footerImage} alt="Footer" className="footer" />
      </div>
    </div>
  )
}

export default App
