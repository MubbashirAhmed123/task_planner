import { Task } from '../types';

export const getCategoryColor = (category: string): string => {
  const colors = {
    'To Do': 'bg-blue-500',
    'In Progress': 'bg-yellow-500',
    'Review': 'bg-purple-500',
    'Completed': 'bg-green-500'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
};

export const getTasksForDate = (tasks: Task[], date: Date): Task[] => {
  return tasks.filter(task => {
    return date >= task.startDate && date <= task.endDate;
  });
};

export const filterTasks = (
  tasks: Task[], 
  filters: { 
    categories: Set<string>;
    timeRange: 'all' | '1week' | '2weeks' | '3weeks';
    searchQuery: string;
  }
): Task[] => {
  return tasks.filter(task => {
    if (filters.categories.size > 0 && !filters.categories.has(task.category)) {
      return false;
    }

    if (filters.searchQuery && !task.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.timeRange !== 'all') {
      const now = new Date();
      const daysMap = { '1week': 7, '2weeks': 14, '3weeks': 21 };
      const maxDays = daysMap[filters.timeRange as keyof typeof daysMap];
      const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
      
      if (task.startDate > maxDate) {
        return false;
      }
    }

    return true;
  });
};