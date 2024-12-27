// Import necessary modules
import React, { useState, useEffect } from 'react';
import './App.css'; // Optional: Add custom CSS if needed

// Sample App Component
function App() {
  // State to hold the list of items
  const [items, setItems] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A' },
    { id: 2, name: 'Product B', description: 'Description for Product B' },
    { id: 3, name: 'Product C', description: 'Description for Product C' },
  ]);

  // State for new item input
  const [newItem, setNewItem] = useState('');

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for filtered items to display
  const [filteredItems, setFilteredItems] = useState(items);

  // Function to handle adding a new item
  const addItem = () => {
    if (newItem.trim()) {
      const newItems = [
        ...items,
        { id: items.length + 1, name: newItem, description: `Description for ${newItem}` },
      ];
      setItems(newItems);
      setNewItem('');
      setFilteredItems(newItems); // Update the filtered list
    }
  };

  // useEffect to update the displayed list when the search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, items]);

  return (
    <div className="flex flex-col items-center justify-center border-2 h-screen w-full container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Item List</h1>

      {/* Search bar */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 w-full max-w-md mb-2"
          placeholder="Search items..."
        />
      </div>

      {/* Input field to add a new item */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border rounded-md p-2 w-full max-w-md mb-2"
          placeholder="Enter a new item"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Display the filtered list of items */}
      <ItemList items={filteredItems} />
    </div>
  );
}

// Child component to display the list of items
function ItemList({ items }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// Child component to display a single item
function ItemCard({ item }) {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition flex flex-col">
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
}

export default App;
  


