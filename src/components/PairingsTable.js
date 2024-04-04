import React from 'react';

function PairingsTable({ pairings }) {
  return (
    <div>
      <h2 className="paringTitle">Pairings</h2>
      <table>
        <thead>
          <tr>
            <th>Name 1</th>
            <th>Name 2</th>
          </tr>
        </thead>
        <tbody>
          {pairings.map((pair, index) => (
            <tr key={index}>
              <td>{pair[0]}</td>
              <td>{pair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PairingsTable;