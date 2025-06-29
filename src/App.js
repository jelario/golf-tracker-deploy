import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, onValue, update } from 'firebase/database';

function App() {
  const [machines, setMachines] = useState([]);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineNotes, setNewMachineNotes] = useState('');
  const [newMachineReminder, setNewMachineReminder] = useState('');

  useEffect(() => {
    const machinesRef = ref(db, 'machines');
    onValue(machinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const machinesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMachines(machinesArray);
      } else {
        setMachines([]);
      }
    });
  }, []);

  const handleAddMachine = () => {
    if (newMachineName.trim() === '') return;
    push(ref(db, 'machines'), {
      name: newMachineName,
      notes: newMachineNotes,
      reminderDate: newMachineReminder,
    });
    setNewMachineName('');
    setNewMachineNotes('');
    setNewMachineReminder('');
  };

  const handleNotesChange = (id, notes) => {
    update(ref(db, `machines/${id}`), { notes });
  };

  const handleReminderChange = (id, reminderDate) => {
    update(ref(db, `machines/${id}`), { reminderDate });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Golf Course Equipment Tracker</h2>
      <input
        type="text"
        placeholder="Add new machine"
        value={newMachineName}
        onChange={(e) => setNewMachineName(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
      />
      <textarea
        placeholder="Add notes (optional)"
        value={newMachineNotes}
        onChange={(e) => setNewMachineNotes(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
      />
      <input
        type="date"
        value={newMachineReminder}
        onChange={(e) => setNewMachineReminder(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
      />
      <button onClick={handleAddMachine} style={{ padding: '10px', width: '100%' }}>
        Add Machine
      </button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {machines.map((machine) => (
          <li
            key={machine.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <strong>{machine.name}</strong>
            <div>
              <textarea
                value={machine.notes || ''}
                placeholder="Add or edit notes"
                onChange={(e) => handleNotesChange(machine.id, e.target.value)}
                style={{ width: '100%', marginTop: '8px', padding: '8px' }}
              />
            </div>
            <div style={{ marginTop: '8px' }}>
              <label>Next Maintenance: </label>
              <input
                type="date"
                value={machine.reminderDate || ''}
                onChange={(e) => handleReminderChange(machine.id, e.target.value)}
                style={{ padding: '6px', width: '50%' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
