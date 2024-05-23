import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
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
  const lastResultRef = useRef(null);

  console.log(lastResultRef)

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
    const lastItem = lastResultRef.current;
    console.log(lastItem)
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(lastItem)
  };

  // Function to handle download button click
  const handleDownload = () => {
    // Convert the pairings to a worksheet format
    const worksheetData = pairings.map(pair => pair);
  
    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
    // Calculate the maximum length for each column
    const colWidths = [];
    pairings.forEach(pair => {
      pair.forEach((name, colIndex) => {
        const nameLength = name.length;
        if (!colWidths[colIndex] || colWidths[colIndex] < nameLength) {
          colWidths[colIndex] = nameLength;
        }
      });
    });
  
    // Set column widths, adding some extra space for margin
    worksheet['!cols'] = colWidths.map(width => ({ wch: width + 2 }));
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pairings');
  
    // Generate a binary string representation of the workbook
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the binary string to a Blob
    const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    };
  
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
    // Create a temporary anchor element to trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pairings.xlsx';
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
            <div className="pairing-result-container">
              {rouletteLoading && names.length > 0 ? (
                <RouletteLoader />
              ) : (
                pairings.map((pair, index) => (
                  <div key={index} className="pairing-result" ref={pairings.length - 1 === index ? lastResultRef : null}>
                    {pair.map((name, i) => (
                      <React.Fragment key={i}>
                        {name}
                        {i !== pair.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                ))
              )}
              {!rouletteLoading && pairings.length > 0 && <button className="pairing-result download-button" onClick={handleDownload}>Download Groups</button>}
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
