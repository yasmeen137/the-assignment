// Import necessary modules
import React, { useState } from 'react';
import './App.css'; // Optional: Add custom CSS if needed

// Sample App Component
function App() {
  // **useState Hook**: Used to create and manage the state of the `items` array.
  // `items` holds the list of items, and `setItems` is the function to update it.
  const [items, setItems] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A' },
    { id: 2, name: 'Product B', description: 'Description for Product B' },
  ]);

  // **useState Hook**: Used to manage the state of the input field for a new item.
  // `newItem` holds the value entered by the user, and `setNewItem` updates it.
  const [newItem, setNewItem] = useState('');

  // Function to handle adding a new item to the list.
  // It updates the `items` state with a new item object when the user clicks "Add Item".
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: items.length + 1, name: newItem, description: `Description for ${newItem}` }]);
      setNewItem(''); // Clear the input field after adding the item
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 h-screen w-full  container mx-auto p-4">
      <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className="text-2xl font-bold text-center mb-4">Item List</h1>

      {/* Input field to add a new item */}
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={newItem} // **Props**: Passing the `newItem` state as the value of the input field.
          onChange={(e) => setNewItem(e.target.value)} // **Props**: Event handler to update `newItem` when the input changes.
          className="border rounded-md p-2 w-1/2 mr-2"
          placeholder="Enter a new item"
        />
        <button
          onClick={addItem} // **Props**: Event handler to call the `addItem` function when the button is clicked.
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      </div>

      {/* Pass the `items` state as a prop to the ItemList component */}
      <ItemList items={items} />
    </div>
  );
}

// Child component to display the list of items
// **Props**: The `items` prop is passed from the parent `App` component to render the list of items.
function ItemList({ items }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        // Pass each `item` as a prop to the ItemCard component
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// Child component to display a single item
// **Props**: The `item` prop is used to access the name and description of each item.
function ItemCard({ item }) {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{item.name}</h2> {/* Display the name of the item */}
      <p>{item.description}</p> {/* Display the description of the item */}
    </div>
  );
}

export default App;

