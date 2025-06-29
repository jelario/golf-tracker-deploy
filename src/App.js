import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';
import './App.css';

function App() {
  const [machineName, setMachineName] = useState('');
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const machinesRef = ref(db, 'machines');
    onValue(machinesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMachines = [];
      for (let id in data) {
        loadedMachines.push({ id, name: data[id].name });
      }
      setMachines(loadedMachines);
    });
  }, []);

  const handleAddMachine = () => {
    if (machineName.trim() === '') return;
    const machinesRef = ref(db, 'machines');
    push(machinesRef, { name: machineName });
    setMachineName('');
  };

  return (
    <div className="App">
      <h1>Golf Course Equipment Tracker</h1>
      <input
        type="text"
        value={machineName}
        onChange={(e) => setMachineName(e.target.value)}
        placeholder="Add new machine"
      />
      <button onClick={handleAddMachine}>Add</button>
      <ul>
        {machines.map((machine) => (
          <li key={machine.id}>{machine.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
