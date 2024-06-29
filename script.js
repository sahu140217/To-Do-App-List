// script.js
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskTitle = document.getElementById('task-title').value;
        const taskCategory = document.getElementById('task-category').value;
        const taskDueDate = document.getElementById('task-due-date').value;
        const taskPriority = document.getElementById('task-priority').value;

        const task = {
            id: Date.now(),
            title: taskTitle,
            category: taskCategory,
            dueDate: taskDueDate,
            priority: taskPriority,
        };

        tasks.push(task);
        displayTasks();
        taskForm.reset();
    });

    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');

            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.innerHTML = `
                <span><strong>${task.title}</strong> (${task.category})</span>
                <span>Due: ${task.dueDate}</span>
                <span>Priority: ${task.priority}</span>
            `;
            li.appendChild(taskDetails);

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            const editButton = document.createElement('button');
            editButton.className = 'edit';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(task.id));
            taskActions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            taskActions.appendChild(deleteButton);

            li.appendChild(taskActions);
            taskList.appendChild(li);
        });
    }

    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-category').value = task.category;
            document.getElementById('task-due-date').value = task.dueDate;
            document.getElementById('task-priority').value = task.priority;

            tasks = tasks.filter(t => t.id !== taskId);
            displayTasks();
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(t => t.id !== taskId);
        displayTasks();
    }
});