import React, { useState } from 'react';

function AddItemForm() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!itemName || !itemDescription) {
      setErrorMessage('All fields are required!');
      return;
    }

    // Add the new item to the list
    const newItem = { name: itemName, description: itemDescription };
    setItems([...items, newItem]);

    // Reset the form
    setItemName('');
    setItemDescription('');
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 h-screen w-full container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Item</h2>

        {/* Item Name */}
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter item name"
          />
        </div>

        {/* Item Description */}
        <div className="mb-4">
          <label
            htmlFor="itemDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Item Description
          </label>
          <input
            type="text"
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter item description"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Item
        </button>
      </form>

      {/* List of Items */}
      <ul className="mt-6 w-full max-w-md">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-md shadow-sm mb-2 text-center"
          >
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddItemForm;
