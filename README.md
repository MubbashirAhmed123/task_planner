# Task Planner

A modern, interactive task planning application built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality, task scheduling, and advanced filtering capabilities.


## ✨ Features

### 📅 Interactive Calendar
- **Monthly Calendar View**: Clean, intuitive calendar interface
- **Task Visualization**: Tasks displayed as colored bars spanning multiple days
- **Today Highlighting**: Current date prominently highlighted
- **Month Navigation**: Easy navigation between months

### 🎯 Task Management
- **Drag & Drop**: Move tasks between dates with smooth animations
- **Task Resizing**: Adjust task duration by dragging start/end handles
- **Date Range Selection**: Create tasks by selecting date ranges
- **Task Categories**: Organize tasks with color-coded categories
  - 🔵 To Do (Blue)
  - 🟡 In Progress (Yellow)
  - 🟣 Review (Purple)
  - 🟢 Completed (Green)

### 🔍 Advanced Filtering
- **Search Functionality**: Find tasks by name with real-time search
- **Category Filtering**: Filter tasks by one or multiple categories
- **Time Range Filtering**: View tasks within specific time periods
  - All tasks
  - Within 1 week
  - Within 2 weeks
  - Within 3 weeks



## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn


## 🛠️ Technologies Used

### Core Technologies
- **React** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

### Drag & Drop
- **@dnd-kit/core** - Modern drag and drop toolkit
- **@dnd-kit/sortable** - Sortable functionality for drag and drop

### Date Management
- **Moment.js** - Comprehensive date manipulation library


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

