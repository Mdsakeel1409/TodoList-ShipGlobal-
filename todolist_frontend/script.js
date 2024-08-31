document.addEventListener('DOMContentLoaded', () => {
    // Sort tasks in all columns when the page loads
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => sortTasks(column));
});

function moveTask(button, targetColumn) {
    const task = button.parentElement;
    const taskName = task.textContent.trim().replace('←', '').replace('→', '').trim(); // Remove arrow text
    const target = document.getElementById(targetColumn);

    // Clear the current task content
    task.innerHTML = taskName;

    // Rebuild the task with the correct buttons and task name
    if (targetColumn === 'backlog') {
        task.innerHTML = `${taskName} <button class="button-right" onclick="moveTask(this, 'toDo')">→</button>`;
    } else if (targetColumn === 'toDo') {
        task.innerHTML = `<button class="button-left" onclick="moveTask(this, 'backlog')">←</button> ${taskName} <button class="button-right" onclick="moveTask(this, 'ongoing')">→</button>`;
    } else if (targetColumn === 'ongoing') {
        task.innerHTML = `<button class="button-left" onclick="moveTask(this, 'toDo')">←</button> ${taskName} <button class="button-right" onclick="moveTask(this, 'done')">→</button>`;
    } else if (targetColumn === 'done') {
        task.innerHTML = `<button class="button-left" onclick="moveTask(this, 'ongoing')">←</button> ${taskName}`;
    }

    // Append the task to the target column
    target.appendChild(task);

    // Sort tasks in the target column
    sortTasks(target);
}

// Function to sort tasks within a column
function sortTasks(column) {
    const tasks = Array.from(column.getElementsByClassName('task'));
    tasks.sort((a, b) => {
        const nameA = a.textContent.trim().replace('←', '').replace('→', '').trim();
        const nameB = b.textContent.trim().replace('←', '').replace('→', '').trim();
        return nameA.localeCompare(nameB);
    });
    tasks.forEach(task => column.appendChild(task));
}
