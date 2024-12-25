// Select DOM elements
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-button');
const todoList = document.getElementById('todo-list');

// Add a new task to the list
addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const listItem = document.createElement('li');

    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        
        todoList.removeChild(listItem);
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(removeButton);
    todoList.appendChild(listItem);

    // Clear input field
    newTaskInput.value = '';
});

