import React from "react";
import ItemCard from "./itemCard"

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

  export default ItemList