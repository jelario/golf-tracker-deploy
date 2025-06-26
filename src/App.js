import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState("");

  useEffect(() => {
    const fetchMachines = async () => {
      const snapshot = await getDocs(collection(db, "machines"));
      setMachines(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMachines();
  }, []);

  const addMachine = async () => {
    if (newMachine.trim()) {
      const docRef = await addDoc(collection(db, "machines"), { name: newMachine });
      setMachines([...machines, { id: docRef.id, name: newMachine }]);
      setNewMachine("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Golf Course Equipment Tracker</h1>
      <input
        value={newMachine}
        onChange={(e) => setNewMachine(e.target.value)}
        placeholder="Add new machine"
      />
      <button onClick={addMachine}>Add</button>
      <ul>
        {machines.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
