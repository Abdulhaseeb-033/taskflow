
const taskList = document.querySelector("#taskList");

export function renderTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");

        taskCard.className = "task-card";

        let actions = `
            <button type="button" class="delete-task-btn" data-id="${task.id}">
                Delete
            </button>
        `;

        if (task.status === "pending") {
            actions = `
                <button type="button" class="complete-task-btn" data-id="${task.id}">
                    Complete
                </button>

                <button type="button" class="edit-task-btn" data-id="${task.id}">
                    Edit
                </button>

                <button type="button" class="delete-task-btn" data-id="${task.id}">
                    Delete
                </button>
            `;
        }

        taskCard.innerHTML = `
            <div class="task-card-header">
                <h3>${task.title}</h3>
            </div>

            <p class="task-description">${task.description}</p>

            <div class="task-meta">
                <span>${task.category}</span>

                <span class="priority-${task.priority}">
                    ${task.priority}
                </span>

                <span class="status-badge status-${task.status}">
                    ${task.status}
                </span>

                <span>Due: ${task.dueDate}</span>
            </div>

            <div class="task-actions">
                ${actions}
            </div>
        `;

        taskList.appendChild(taskCard);
    });
}
