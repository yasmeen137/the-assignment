# the-assignment

First Task: Simple To-Do List API with Flask

This Flask application implements a basic RESTful API for managing a to-do list. It allows users to:
GET all tasks (/tasks)
POST a new task (/tasks)
PUT update an existing task (/tasks/<task_id>)
DELETE a task (/tasks/<task_id>)

Then we Run the script: python app.py
This will start the development server, usually accessible at http://127.0.0.1:5000/ by default.
API Endpoints: GET /tasks:

Retrieves a list of all tasks in JSON format.
Response: <img width="1440" alt="Screenshot 1446-06-22 at 11 42 21 PM" src="https://github.com/user-attachments/assets/42c13fe4-327d-4f21-8745-89e46e7da1c9" />


Second Task: Fetching Comments from JSONPlaceholder API

How it Works:

fetch_comments function:
Takes a post_id as input.
Constructs the API endpoint URL using f-strings.
Sends a GET request using requests.get.
Raises an HTTPError exception for unsuccessful responses (status codes 4xx or 5xx).
Parses the JSON response into a Python list of comments using response.json().
Calls the display_comments function to format and print the comments.

display_comments function:
Takes a list of comments as input.
Prints a header "Comments for Post:".
Iterates through each comment and prints its ID, name, email, and body in a formatted way.

the input: Enter the desired post ID when prompted (e.g., 1).
the output: 
Enter the Post ID (e.g., 1): 1
Comments for Post:
-------------------
ID: 1
Name: Chris
Email: chris@example.com
Comment: laudantium enim lobo odio vitae cupidatat 
elit, at lorem magna bibendum at...
----------------------------------------
ID: 2
Name: Ava
Email: ava@example.com
Comment: sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
doloremque laudantium...
----------------------------------------
... (and so on for other comments)


Third task: Implement error handling for the API requests to manage scenarios

the feature:
Error Handling
Handles HTTP errors (e.g., 404, 500).
Manages connection issues and timeouts.
Detects invalid JSON responses.
Provides user-friendly error messages.

Example Usage:

Input: Enter the Post ID (e.g., 1): 1
Output:
Enter the Post ID (e.g., 1): 1
Comments for Post:
-------------------
ID: 1
Name: id labore ex et quam laborum
Email: Elizebeth.O@ex.org
Comment: Lorem ipsum dolor sit amet...
----------------------------------------
ID: 2
Name: quo vero reiciendis velit similique earum
Email: Jayden.O@ex.org
Comment: Vitae sapiente non autem quaerat...
----------------------------------------
...

Error Scenarios

1. Invalid Post ID:
Input:
Enter the Post ID (e.g., 1): abc
Output:
Invalid input. Please enter a numeric Post ID.

2. No Comments Found:
Input:
Enter the Post ID (e.g., 1): 999
Output:
No comments found for post ID 999.

3. API Unavailable:
Output:
Connection error. Please check your internet connection or try again later.
