// App.js
import React, { useState, useEffect } from 'react'
import NameList from './components/NameList'
import Roulette from './components/Roulette'
import Loader from './components/Loader';
import { loadNames, saveNames } from './utils'
import { employeeList } from './employeeList'
import everyoneTVLogo from './img/ETV_logo.svg'
import footerImage from './img/ETV_footer.png'
import cupLogo from './img/cup.svg'
import './sass/App.scss'

function App() {
  const [names, setNames] = useState([])
  const [pairings, setPairings] = useState([])
  const [displayEmployeeList, setDisplayEmployeeList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const storedNames = loadNames()
    setNames(storedNames)
  }, [])

  const handleAddName = name => {
    if (!names.includes(name)) {
      setNames([...names, name])
      saveNames([...names, name])
      setErrorMessage('')
    } else {
      setErrorMessage('Name already exists in the list.')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
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
      {isLoading ? <Loader /> : <><img src={everyoneTVLogo} alt="EveryoneTV Logo" className="logo" />
      <div className='title-container'>
      <h1 className="appTitle">ETV Coffee Roulette</h1>
      <img src={cupLogo} alt="cup logo" className="logo-cup"/>
      </div>
      <div className="appContent">
        <NameList
          names={names}
          onAddName={handleAddName}
          onRemoveName={handleRemoveName}
          onAddAllNames={handleAddEmployees}
          errorMessage={errorMessage}
          clearErrorMessage={() => setErrorMessage('')}
          removeAllNames={handleRemoveAllNames}
        />
        
      </div>
      <div className="footer-container">
        <img src={footerImage} alt="Footer" className="footer" />
      </div>
      </>}
    </div>
  )
}

export default App
