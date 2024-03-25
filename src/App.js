import React, { useState, useEffect } from 'react';
import './App.css';
import AutoFilterDropdown from './components/AutoFilterDropdown';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUserChange = (user) => {
    console.log("Selected user:", user);
  };

  return (
    <div>
      <h2>Auto-Filter Dropdown Test</h2>
      <AutoFilterDropdown
        data={users}
        property="name"
        valueChange={handleUserChange}
      />

      <AutoFilterDropdown
        data={users}
        property="username"
        valueChange={handleUserChange}
      />
    </div>
  );
}

export default App;
