export interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  category: 'To Do' | 'In Progress' | 'Review' | 'Completed';
}

export interface FilterState {
  categories: Set<string>;
  timeRange: 'all' | '1week' | '2weeks' | '3weeks';
  searchQuery: string;
}

export interface DragData {
  type: 'task' | 'selection';
  task?: Task;
  startDate?: Date;
  endDate?: Date;
  mode?: 'move' | 'resize-start' | 'resize-end';
}

export type ResizeMode = 'resize-start' | 'resize-end';

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  initialName?: string;
  initialCategory?: string;
}

export interface DraggableTaskProps {
  task: Task;
  date: Date;
  isStart: boolean;
  isEnd: boolean;
  isResizing: boolean;
  onResizeStart: (taskId: string, mode: ResizeMode, event: React.MouseEvent) => void;
}

export interface DroppableDayProps {
  date: Date;
  tasks: Task[];
  isCurrentMonth: boolean;
  isSelected: boolean;
  resizingTaskId: string | null;
  onDaySelect: (date: Date) => void;
  onResizeStart: (taskId: string, mode: ResizeMode, event: React.MouseEvent) => void;
}