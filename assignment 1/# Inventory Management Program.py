# inventory management program

# This is a dictionary will store items and their quantities
inventory = {}

# The add funciton 
def add_item():
    item_name = input("Enter the name of the item: ")
    quantity = int(input("Enter the quantity of the item: "))  # Get quantity as a number
    if item_name in inventory:
        inventory[item_name] += quantity  # Add quantity if the item is already in the inventory
        print(f"Updated {item_name} to {inventory[item_name]} items.")
    else:
        inventory[item_name] = quantity  # Add the new item with its quantity
        print(f"Added {item_name} with {quantity} items.")

# The remove function  
def remove_item():
    item_name = input("Enter the name of the item to remove: ")
    if item_name in inventory:
        del inventory[item_name]  # Remove the item from the inventory
        print(f"Removed {item_name} from inventory.")
    else:
        print("This item is not in the inventory.")

# The update function 
def update_quantity():
    item_name = input("Enter the name of the item: ")
    if item_name in inventory:
        quantity = int(input("Enter the new quantity: "))  # Get the new quantity as a number
        inventory[item_name] = quantity  # Update the quantity
        print(f"Updated {item_name} to {quantity} items.")
    else:
        print("This item is not in the inventory.")

# This function display the items in the inventory
def display_inventory():
    if len(inventory) == 0:
        print("The inventory is empty.")
    else:
        print("Inventory:")
        for item, quantity in inventory.items():
            print(f"{item}: {quantity} items")

# the program loop
def main():
    while True:
        print("\nChoose an option:")
        print("1. Add item")
        print("2. Remove item")
        print("3. Update item quantity")
        print("4. Show inventory")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == "1":
            add_item()
        elif choice == "2":
            remove_item()
        elif choice == "3":
            update_quantity()
        elif choice == "4":
            display_inventory()
        elif choice == "5":
            print("Exiting program. Goodbye!")
            break  # This will stop the program
        else:
            print("Invalid option. Please try again.")

# Run the program
if __name__ == "__main__":
    main()

    
