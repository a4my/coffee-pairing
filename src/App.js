import React, { useState, useEffect } from 'react';
import NameList from './components/NameList';
import Pairing from './components/Pairing';
import Loader from './components/Loader';
import RouletteLoader from './components/Roulette';
import { loadNames, saveNames } from './utils';
import { employeeList } from './employeeList';
import everyoneTVLogo from './img/ETV_logo.svg';
import footerImage from './img/ETV_footer.png';
import cupLogo from './img/cup.svg';
import './sass/App.scss';

function App() {
  const [names, setNames] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rouletteLoading, setRouletteLoading] = useState(false); 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const storedNames = loadNames();
    setNames(storedNames);
  }, []);

  const handleAddName = (name) => {
    if (!names.includes(name)) {
      setNames([...names, name]);
      saveNames([...names, name]);
      setErrorMessage('');
    } else {
      setErrorMessage('Name already exists in the list.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleRemoveName = (index) => {
    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);
    saveNames(updatedNames);
  };

  const handleAddEmployees = () => {
    let allEmployeeNames = employeeList.map((employee) => employee.name); 
    // setNames(employeeList.map((employee) => employee.name));
    setNames(allEmployeeNames);
    saveNames(allEmployeeNames);
  };

  const handleRemoveAllNames = () => {
    setNames([]);
    saveNames([]);
  };

  const handlePair = (pairs) => {
    setPairings(pairs);
    setRouletteLoading(true);
    setTimeout(() => {
      setRouletteLoading(false);
    }, 3000);
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={everyoneTVLogo} alt="EveryoneTV Logo" className="logo" />
          <div className="title-container">
            <h1 className="appTitle">ETV Coffee Roulette</h1>
            <img src={cupLogo} alt="cup logo" className="logo-cup" />
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
            <Pairing names={names} onPair={handlePair} setIsLoading={setIsLoading}/>
            <div className="pairing-result-container">
              {rouletteLoading && names.length > 0 ? (
                <RouletteLoader />
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
            </div>
          </div>
          <div className="footer-container">
            <img src={footerImage} alt="Footer" className="footer" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
