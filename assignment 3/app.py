from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data for the to-do list
tasks = [
    {"id": 1, "task": "go to the gym", "done": False},
    {"id": 2, "task": "Complete homework", "done": False},
]

def find_task(task_id):
    return next((task for task in tasks if task["id"] == task_id), None)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({"tasks": tasks}), 200

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    if not data or "task" not in data:
        return jsonify({"error": "Task is required"}), 400
    
    new_task = {
        "id": tasks[-1]["id"] + 1 if tasks else 1,
        "task": data["task"],
        "done": False
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = find_task(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.get_json()
    if "task" in data:
        task["task"] = data["task"]
    if "done" in data:
        task["done"] = data["done"]
    
    return jsonify(task), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = find_task(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    tasks.remove(task)
    return jsonify({"message": "Task deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
    