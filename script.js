document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let todos = [];

    const renderTodos = (filter = 'all') => {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (filter === 'all') return true;
            if (filter === 'completed') return todo.completed;
            if (filter === 'pending') return !todo.completed;
        });

        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.dataset.id = todo.id;

            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            todoItem.appendChild(todoText);

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'edit';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editTodo(todo.id));
            actionsDiv.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
            actionsDiv.appendChild(deleteBtn);

            todoItem.appendChild(actionsDiv);
            todoItem.addEventListener('click', (e) => {
                if (e.target.tagName.toLowerCase() !== 'button') toggleComplete(todo.id);
            });

            todoList.appendChild(todoItem);
        });
    };

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
    };

    const editTodo = (id) => {
        const newText = prompt('Edit your task:');
        if (newText) {
            todos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
            renderTodos();
        }
    };

    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    };

    const toggleComplete = (id) => {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        renderTodos();
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos(btn.dataset.filter);
        });
    });

    renderTodos();
});
