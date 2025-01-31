import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import ItemsTable from './ItemsTable2';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-6">Welcome to my App</h1>
      </header>
      {/* Render the ItemsTable component */}
      <ItemsTable />
    </div>
  );
}

export default App;
