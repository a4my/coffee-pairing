import React, { useState, useEffect } from 'react';
import NameList from './components/NameList';
import Pairing from './components/Pairing';
import Loader from './components/Loader';
import PairingResultContainer from './components/PairingResultContainer';
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

  // Function to generate CSV content from pairing results
  const generateCSV = () => {
    const csvContent = pairings.map(pair => pair.join(',')).join('\n');
    return csvContent;
  };

  // Function to handle download button click
  const handleDownload = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pairings.csv';
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
            <PairingResultContainer
              rouletteLoading={rouletteLoading}
              names={names}
              pairings={pairings}
              handleDownload={handleDownload}
            />
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
