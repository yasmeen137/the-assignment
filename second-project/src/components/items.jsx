import React, { useEffect, useState } from "react";
import ItemList from "./itemList";
import ItemForm from "./itemForm";
import SearchBar from "./searchbar";

function Items() {
    const dummyItems = [
        {
            id: 1,
            title: "Black coffe",
            description: "Black coffee"
        },
        {
            id: 2,
            title: "Amercano",
            description: "anything"
        },
    ]

    const [items, setItems] = useState(dummyItems)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredItems, setFilteredItems] = useState (items)

    const handleSearchchanges = (query) => {
        setSearchQuery(query)
    } 

    const handleAddItem = (item) => {
        setItems([...items, item])
        setFilteredItems([...items, item])
    }

    useEffect(() => {
        const searchItem = (query) => {
            const res =  items.filter((i) => {
                return i.title.includes(query) && i
            })
            return res
        }

        setFilteredItems(searchItem(searchQuery))
    }, [searchQuery, items])

    return (
        <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center">
            <SearchBar onSearchChange={handleSearchchanges} />
            <ItemForm onAddItem={handleAddItem} />
            <ItemList items={filteredItems} />
        </div>
    )

}

export default Items