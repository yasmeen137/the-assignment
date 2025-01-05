// Import necessary modules
import React from 'react';
import './App.css'; // Optional: Add custom CSS if needed
import Items from './components/items';

// Sample App Component
function App() { 
  return (
    <div className="flex flex-col items-center justify-center border-2 h-screen w-full container mx-auto p-4">
      <Items />
    </div>
  );
}

export default App;

