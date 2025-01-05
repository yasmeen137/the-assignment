import React from "react";
// Child component to display a single item
// **Props**: The `item` prop is used to access the name and description of each item.
function ItemCard({ item }) {
    
    return (
      <div className="border rounded-md p-4 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{item.title}</h2> {/* Display the name of the item */}
        <p>{item.description}</p> {/* Display the description of the item */}
      </div>
    );
}

export default ItemCard
