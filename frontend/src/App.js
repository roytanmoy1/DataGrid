import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState('locations'); // Default view
  const endPoint = `https://scaling-spoon-vqjxvv6q46qhr54-5000.app.github.dev/`;

  useEffect(() => {
    fetch(`${endPoint}/${view}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error:', error));
  }, [view]);

  const deleteRow = (location) => {
    fetch(`${endPoint}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: view, location }),
    })
      .then((response) => response.json())
      .then(() => {
        // After successfully deleting, update the state by removing the location
        setData((prevData) => prevData.filter((item) => item.location !== location));
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Data Grid</h1>
      <select onChange={(e) => setView(e.target.value)} value={view}>
        <option value="locations">Locations</option>
        <option value="branches">Branches</option>
      </select>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.location}>
              {Object.values(item).map((val, index) => (
                <td key={index}>{val}</td>
              ))}
              <td>
                <button onClick={() => deleteRow(item.location)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
