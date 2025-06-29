import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import './App.css';

function App() {
  const [machines, setMachines] = useState([]);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineNotes, setNewMachineNotes] = useState('');
  const [newMachineDate, setNewMachineDate] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'machines'), orderBy('nextMaintenanceDate', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const machinesData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMachines(machinesData);
    });
    return unsubscribe;
  }, []);

  const handleAddMachine = async () => {
    if (!newMachineName.trim()) return;
    await addDoc(collection(db, 'machines'), {
      name: newMachineName,
      notes: newMachineNotes,
      nextMaintenanceDate: newMachineDate || '',
    });
    setNewMachineName('');
    setNewMachineNotes('');
    setNewMachineDate('');
  };

  const handleUpdateMachine = async (id, field, value) => {
    const machineRef = doc(db, 'machines', id);
    await updateDoc(machineRef, { [field]: value });
  };

  const handleDeleteMachine = async (id) => {
    const machineRef = doc(db, 'machines', id);
    await deleteDoc(machineRef);
  };

  return (
    <div className="App">
      <h1>Golf Course Equipment Tracker</h1>
      <input
        type="text"
        placeholder="Add new machine"
        value={newMachineName}
        onChange={(e) => setNewMachineName(e.target.value)}
      />
      <textarea
        placeholder="Add notes (optional)"
        value={newMachineNotes}
        onChange={(e) => setNewMachineNotes(e.target.value)}
      />
      <input
        type="date"
        value={newMachineDate}
        onChange={(e) => setNewMachineDate(e.target.value)}
      />
      <button onClick={handleAddMachine}>Add Machine</button>

      {machines.map((machine) => (
        <div key={machine.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <input
            type="text"
            value={machine.name}
            onChange={(e) => handleUpdateMachine(machine.id, 'name', e.target.value)}
          />
          <textarea
            placeholder="Add or edit notes"
            value={machine.notes}
            onChange={(e) => handleUpdateMachine(machine.id, 'notes', e.target.value)}
          />
          <div>
            Next Maintenance:{' '}
            <input
              type="date"
              value={machine.nextMaintenanceDate || ''}
              onChange={(e) => handleUpdateMachine(machine.id, 'nextMaintenanceDate', e.target.value)}
            />
          </div>
          <button onClick={() => handleDeleteMachine(machine.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
