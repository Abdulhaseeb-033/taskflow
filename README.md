# TaskFlow

A responsive task management web application built with **HTML, CSS, and JavaScript**.

TaskFlow helps users create, manage, organize, search, filter, and sort their tasks through a clean and responsive interface. Tasks are stored in the browser using **LocalStorage**, so they remain available even after refreshing the page.

## ✨ Features

- Create new tasks
- Edit existing tasks
- Mark tasks as completed
- Delete tasks with confirmation
- Task descriptions and due dates
- Task categories:
  - Work
  - Study
  - Personal
  - Other
- Priority levels:
  - High
  - Medium
  - Low
- Search tasks by:
  - Title
  - Description
  - Category
- Filter tasks by:
  - All
  - Completed
  - Pending
  - High Priority
  - Medium Priority
  - Low Priority
- Sort tasks by:
  - Newest
  - Oldest
  - Due Date
  - Priority
- Sidebar navigation
- Category-based navigation
- Dashboard statistics
- Task completion progress
- Empty state with quick task creation
- Responsive design
- Mobile sidebar navigation
- LocalStorage persistence
- Lucide icons

## 🛠️ Technologies

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **LocalStorage**
- **Lucide Icons**

## 📁 Project Structure

```text
taskflow/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── tasks.js
│   ├── storage.js
│   └── ui.js
│
└── README.md
```

## 🧩 Architecture

TaskFlow follows a simple modular structure to keep responsibilities separated.

```text
                User Actions
                     │
                     ▼
                  app.js
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      tasks.js               ui.js
          │                     │
          ▼                     ▼
      Task Data              Rendering
          │
          ▼
      storage.js
          │
          ▼
      LocalStorage
```

### File Responsibilities

**`app.js`**
- Connects the application together
- Handles DOM events
- Manages search, filters, sorting, and navigation
- Coordinates task operations

**`tasks.js`**
- Stores task data
- Handles task creation
- Handles task updates
- Handles task deletion
- Provides access to tasks

**`storage.js`**
- Saves tasks to LocalStorage
- Loads saved tasks when the application starts

**`ui.js`**
- Renders task cards
- Displays the empty state
- Updates the visible task list

## 📊 Dashboard

The dashboard provides an overview of the current tasks:

- Total Tasks
- Completed Tasks
- Pending Tasks
- High Priority Tasks
- Overall Completion Progress

The completion percentage is calculated dynamically based on completed tasks.

## 🔎 Search, Filter & Sort

TaskFlow allows users to combine multiple controls to quickly find the tasks they need.

For example:

```text
Sidebar View
     +
Category
     +
Search
     +
Status / Priority Filter
     +
Sort
     ↓
Filtered Task List
```

This makes the task list easier to manage as the number of tasks increases.

## 💾 Data Persistence

TaskFlow uses the browser's **LocalStorage API** to persist task data.

```text
Create / Update / Delete Task
            ↓
        Tasks Array
            ↓
       LocalStorage
            ↓
       Page Refresh
            ↓
      Tasks Restored
```

No backend or database is required for the current version.

## 📱 Responsive Design

The interface is designed to work across:

- Desktop
- Tablet
- Mobile

On smaller screens, the sidebar transforms into a toggleable navigation menu and the task controls adapt to the available screen width.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abdulhaseeb-033/taskflow.git
```

### 2. Open the project

Navigate into the project directory:

```bash
cd taskflow
```

### 3. Run the application

Open `index.html` in a modern web browser.

No installation, backend server, or database configuration is required.

## 🎯 Learning Goals

This project was built to strengthen **JavaScript fundamentals through a real-world application** rather than a basic Todo List.

Key concepts practiced:

- DOM manipulation
- Event handling
- Event delegation
- Arrays and array methods
- Objects
- Functions
- ES Modules
- Import / Export
- CRUD operations
- LocalStorage
- Search functionality
- Filtering
- Sorting
- State management
- Dynamic rendering
- Responsive UI development

## 🔮 Future Improvements

Possible improvements for future versions include:

- User authentication
- Backend API
- Database integration
- Cloud synchronization
- Task reminders
- Notifications
- Drag-and-drop task management
- Dark mode
- User accounts
- Team collaboration

## 👨‍💻 Author

**Abdulhaseeb Ansari**

Aspiring Web Developer & Future Software Engineer