
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


// ==============================
// DOM Elements
// ==============================

const taskForm = document.querySelector("#taskForm");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskModal = document.querySelector("#taskModal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const cancelTaskBtn = document.querySelector("#cancelTaskBtn");
const taskList = document.querySelector("#taskList");
const emptyAddTaskBtn = document.querySelector("#emptyStateAddBtn");

const taskSearch = document.querySelector("#taskSearch");
const taskFilter = document.querySelector("#taskFilter");
const taskSort = document.querySelector("#taskSort");

const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const pendingTasks = document.querySelector("#pendingTasks");
const highPriorityTasks = document.querySelector("#highPriorityTasks");

const progressPercentage = document.querySelector("#progressPercentage");
const progressFill = document.querySelector("#progressFill");

const categoryLinks = document.querySelectorAll(".category-link");
const navLinks = document.querySelectorAll(".nav-link");

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const taskCategory = document.querySelector("#taskCategory");
const taskPriority = document.querySelector("#taskPriority");

const deleteModal = document.querySelector("#deleteModal");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");

const sidebarToggleBtn = document.querySelector("#sidebarToggleBtn");
const sidebar = document.querySelector("#sidebar");

updateDashboardStats();


// ==============================
// State
// ==============================

let taskToDeleteId = null;
let taskToEditId = null;
let currentView = "dashboard";
let currentCategory = null;

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

    applyTaskControls();
    updateDashboardStats()
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

        applyTaskControls();
        updateDashboardStats()
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

    applyTaskControls();
    updateDashboardStats();
});

// ==============================
// Search Tasks
// ==============================

taskSearch.addEventListener("input", (event) => {
    applyTaskControls()
});

// ==============================
// Filter Tasks
// ==============================

taskFilter.addEventListener("change", (event) => {
    applyTaskControls()
});

// ==============================
// Sort Tasks
// ==============================

taskSort.addEventListener("change", (event) => {
    applyTaskControls()
});

function applyTaskControls() {
    let filteredTasks = [...getTasks()];

    // ==============================
    // Sidebar View
    // ==============================

    if (currentView === "completed") {
        filteredTasks = filteredTasks.filter(task => {
            return task.status === "completed";
        });
    }

    if (currentView === "pending") {
        filteredTasks = filteredTasks.filter(task => {
            return task.status === "pending";
        });
    }

    // ==============================
    // Category
    // ==============================

    if (currentCategory !== null) {
        filteredTasks = filteredTasks.filter(task => {
            return task.category === currentCategory;
        });
    }

    // ==============================
    // Search
    // ==============================

    const searchTerm = taskSearch.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task => {
        return task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm) ||
            task.category.toLowerCase().includes(searchTerm);
    });

    // ==============================
    // Filter
    // ==============================

    const filterValue = taskFilter.value;

    filteredTasks = filteredTasks.filter(task => {

        if (filterValue === "all") {
            return true;
        }

        if (filterValue === "completed") {
            return task.status === "completed";
        }

        if (filterValue === "pending") {
            return task.status === "pending";
        }

        if (filterValue === "high") {
            return task.priority === "high";
        }

        if (filterValue === "medium") {
            return task.priority === "medium";
        }

        if (filterValue === "low") {
            return task.priority === "low";
        }

        return true;
    });

    // ==============================
    // Sort
    // ==============================

    const sortValue = taskSort.value;

    if (sortValue === "newest") {
        filteredTasks.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
    }

    if (sortValue === "oldest") {
        filteredTasks.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
    }

    if (sortValue === "due_date") {
        filteredTasks.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    if (sortValue === "priority") {
        const priorityOrder = {
            high: 3,
            medium: 2,
            low: 1
        };

        filteredTasks.sort((a, b) => {
            return priorityOrder[b.priority] -
                priorityOrder[a.priority];
        });
    }

    renderTasks(filteredTasks);
}
// ==============================
// Dashboard Stats
// ==============================

function updateDashboardStats() {
    const tasks = getTasks();

    const total = tasks.length;

    const completed = tasks.filter(task => {
        return task.status === "completed";
    }).length;

    const pending = tasks.filter(task => {
        return task.status === "pending";
    }).length;

    const highPriority = tasks.filter(task => {
        return task.priority === "high";
    }).length;

    const progress = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    highPriorityTasks.textContent = highPriority;

    progressPercentage.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;
}

// ==============================
// Sidebar Navigation
// ==============================

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        currentView = link.dataset.view;
        currentCategory = null;

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        categoryLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        applyTaskControls();
    });
});

// ==============================
// Category Navigation
// ==============================

categoryLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        currentCategory = link.dataset.category;
        currentView = "category";

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        categoryLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        applyTaskControls();
    });
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

emptyAddTaskBtn.addEventListener("click", () => {
    taskToEditId = null;
    taskForm.reset();

    taskModal.showModal();
});

// ==============================
// Sidebar Toggle
// ==============================

sidebarToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});