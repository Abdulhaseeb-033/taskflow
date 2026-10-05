
import {
    initializeTasks,
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "./tasks.js";

import { renderTasks } from "./ui.js";


// ==============================
// Initialize App
// ==============================

initializeTasks();
renderTasks(getTasks());

console.log(getTasks());


// ==============================
// DOM Elements
// ==============================

const taskForm = document.querySelector("#taskForm");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskModal = document.querySelector("#taskModal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const cancelTaskBtn = document.querySelector("#cancelTaskBtn");
const taskList = document.querySelector("#taskList");

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const taskCategory = document.querySelector("#taskCategory");
const taskPriority = document.querySelector("#taskPriority");

const deleteModal = document.querySelector("#deleteModal");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");


// ==============================
// State
// ==============================

let taskToDeleteId = null;
let taskToEditId = null;

// ==============================
// Add Task
// ==============================

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value;
    const description = taskDescription.value;
    const dueDate = taskDueDate.value;
    const category = taskCategory.value;
    const priority = taskPriority.value;

    if (taskToEditId !== null) {
        updateTask(taskToEditId, {
            title,
            description,
            dueDate,
            category,
            priority
        });

        taskToEditId = null;
    } else {
        createTask(
            title,
            description,
            dueDate,
            category,
            priority
        );
    }

    taskForm.reset();
    taskModal.close();

    renderTasks(getTasks());
});


// ==============================
// Task Actions
// ==============================

taskList.addEventListener("click", (event) => {

    // Complete Task
    if (event.target.classList.contains("complete-task-btn")) {
        const taskId = Number(event.target.dataset.id);

        updateTask(taskId, {
            status: "completed"
        });

        renderTasks(getTasks());
    }

    // Edit Task
    if (event.target.classList.contains("edit-task-btn")) {
        taskToEditId = Number(event.target.dataset.id);

        const task = getTasks().find(task => task.id === taskToEditId);

        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskDueDate.value = task.dueDate;
        taskCategory.value = task.category;
        taskPriority.value = task.priority;

        taskModal.showModal();
    }

    // Delete Task
    if (event.target.classList.contains("delete-task-btn")) {
        taskToDeleteId = Number(event.target.dataset.id);

        deleteModal.showModal();
    }
});


// ==============================
// Delete Confirmation
// ==============================

cancelDeleteBtn.addEventListener("click", () => {
    taskToDeleteId = null;
    deleteModal.close();
});


confirmDeleteBtn.addEventListener("click", () => {
    deleteTask(taskToDeleteId);

    taskToDeleteId = null;

    deleteModal.close();

    renderTasks(getTasks());
});


// ==============================
// Task Modal
// ==============================

addTaskBtn.addEventListener("click", () => {
    taskToEditId = null;
    taskForm.reset();

    taskModal.showModal();
});


closeModalBtn.addEventListener("click", () => {
    taskModal.close();
});


cancelTaskBtn.addEventListener("click", () => {
    taskModal.close();
});
