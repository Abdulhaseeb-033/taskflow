import { loadTasks, saveTasks } from "./storage.js";

const tasks = [];

export default tasks;

export function initializeTasks() {
    const loadedTasks = loadTasks();
    tasks.push(...loadedTasks);
}

export function createTask(title, description, dueDate, category, priority) {
    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        category,
        priority,
        status: "pending",
        createdAt: Date.now(),
    };
    tasks.push(task);
    saveTasks(tasks);
    return task;
};

export function getTasks() {
    return tasks;
}

export function updateTask(id, updatedTask) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        saveTasks(tasks);
        return tasks[taskIndex];
    }

    return null;
}

export function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        saveTasks(tasks);
        return deletedTask;
    }

    return null;
}