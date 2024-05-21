document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('click', toggleTaskCompletion);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', removeTask);

        li.appendChild(taskSpan);
        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = '';
    }

    function toggleTaskCompletion() {
        this.parentElement.classList.toggle('completed');
    }

    function removeTask() {
        const li = this.parentElement;
        taskList.removeChild(li);
    }
});
