import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import NameList from './components/NameList';
import Pairing from './components/Pairing';
import Loader from './components/Loader';
import PastResults from './components/PastResults';
import PairingResultModal from './components/PairingResultModal';
import { loadNames, saveNames, loadPastResults, savePastResults } from './utils';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pastResults, setPastResults] = useState([]);
  const lastResultRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const storedNames = loadNames();
    setNames(storedNames);
  }, []);

  useEffect(() => {
    const storedResults = loadPastResults();
    setPastResults(storedResults);
  }, []);

  const handleAddName = (name) => {
    if (!names.includes(name)) {
      setNames([...names, name]);
      saveNames([...names, name]);
      setErrorMessage('');
    } else {
      setErrorMessage('Name already exists in the list!');
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
    setNames(allEmployeeNames);
    saveNames(allEmployeeNames);
  };

  const handleRemoveAllNames = () => {
    setNames([]);
    saveNames([]);
  };

  const handlePair = (pairs) => {
    setPairings(pairs);
    setIsModalOpen(true); // Open the modal after pairing is done
    const lastItem = lastResultRef.current;
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (date) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options).replace(',', ' at');
  };

  const handleResultDownload = () => {
    const worksheetData = pairings.map(pair => pair);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const colWidths = [];
    pairings.forEach(pair => {
      pair.forEach((name, colIndex) => {
        const nameLength = name.length;
        if (!colWidths[colIndex] || colWidths[colIndex] < nameLength) {
          colWidths[colIndex] = nameLength;
        }
      });
    });

    worksheet['!cols'] = colWidths.map(width => ({ wch: width + 2 }));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pairings');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pairings.xlsx';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    const buffer = s2ab(wbout);
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    const readableDate = formatDate(new Date());

    const newResult = {
      UIName: `${readableDate}`,
      filename: `pairings_${formatDate(new Date())}.xlsx`,
      data: base64String
    };
    const updatedResults = [...pastResults, newResult];
    localStorage.setItem('pastResults', JSON.stringify(updatedResults));

    setPastResults(updatedResults);
  };

  const handleRemoveResult = (index) => {
    const updatedPastResults = [...pastResults];
    updatedPastResults.splice(index, 1);
    setPastResults(updatedPastResults);
    savePastResults(updatedPastResults);
  };

  const handleRemoveAllResults = () => {
    setPastResults([]);
    savePastResults([]);
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
            <PastResults 
              pastResults={pastResults} 
              onDeleteResultFromLocalStorage={handleRemoveResult} 
              removeAllResults={handleRemoveAllResults}
            />
            <Pairing names={names} onPair={handlePair} setIsLoading={setIsLoading} />
          </div>
          <div className="footer-container">
            <img src={footerImage} alt="Footer" className="footer" />
          </div>
        </>
      )}
      <PairingResultModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDownloadResults={handleResultDownload}
        pairings={pairings} 
      />
    </div>
  );
}

export default App;
