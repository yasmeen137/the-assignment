// src/components/AddItem.js
import React, { useState } from 'react';
import ErrorMessage from './error';

const ItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, SetErrors] = useState([])

  // Handle the Add Item button click
  const handleAddClick = () => {
    if (itemName.trim() && description.trim()) {
      const item = {
        id: Math.floor(Math.random() * 1000),
        title: itemName,
        description: description
      }
      onAddItem(item);
      setItemName('');  // Clear the input after adding
    }else{
      SetErrors([...errors, "All form fields are required"])
    }
  };
  return (
    <div className='flex flex-col items-center'>
      <div className='my-2'>
        <ErrorMessage errors={errors} />
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a new item..."
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="desc."
      />
      <button
        onClick={handleAddClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Item
      </button>
    
       {/* Render ErrorMessage if there are errors */}
       
    </div>
    </div>
  
    
  );
};

export default ItemForm;
