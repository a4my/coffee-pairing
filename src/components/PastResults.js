import React, { useState, useEffect } from 'react';

const PastResults = ({ pastResults, onDeleteResultFromLocalStorage }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('pastResults')) || [];
    setResults(storedResults);
  }, [ results ]);

  const handleDownload = (base64Data, filename) => {
    // Decode base64 to binary string
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes.buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleUIRemoveResult = (index) => {
    const updatedResults = [...results];
    updatedResults.splice(index, 1);
    setResults(updatedResults);
  };

  return (
    <div className="pastResults-container">
      {results.length > 0 && <h2 className='pastResults-title'>Past Results</h2>}
      <ul>
        {results.map((result, index) => (
          <li className='result-item' key={index}>
            <button onClick={() => handleDownload(result.data, result.filename)}>
              <span>{result.UIName}</span>
            </button>
            <button
              className="button-x-remove"
              onClick={() => { 
                onDeleteResultFromLocalStorage(index);
                handleUIRemoveResult(index);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastResults;
