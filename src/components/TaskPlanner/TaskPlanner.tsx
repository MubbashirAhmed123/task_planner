import React, { useState, useCallback } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { Task, FilterState, DragData, ResizeMode } from '../../types';
import { format, isSameDay, getCalendarDays } from '../../utils/dateUtils';
import { filterTasks } from '../../utils/taskUtils';
import FilterBar from './FilterBar';
import Calendar from './Calendar';
import TaskModal from './TaskModal';

const TaskPlanner: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    categories: new Set(),
    timeRange: 'all',
    searchQuery: ''
  });
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [resizeMode, setResizeMode] = useState<ResizeMode | null>(null);
  const [resizingTaskId, setResizingTaskId] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = getCalendarDays(year, month);

  const filteredTasks = filterTasks(tasks, filters);

  const handleDragStart = (event: DragStartEvent) => {
    if (!isResizing) {
      setActiveId(event.active.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || isResizing) {
      setActiveId(null);
      return;
    }

    const dragData = active.data.current as DragData;
    const dropData = over.data.current as any;

    if (dragData?.type === 'task' && dropData?.type === 'day') {
      const task = dragData.task!;
      const targetDate = dropData.date as Date;
      
      if (resizeMode && resizingTaskId) {
        setTasks(prev => prev.map(t => {
          if (t.id === task.id) {
            if (resizeMode === 'resize-start') {
              if (targetDate <= t.endDate) {
                return { ...t, startDate: new Date(targetDate) };
              }
            } else if (resizeMode === 'resize-end') {
              if (targetDate >= t.startDate) {
                return { ...t, endDate: new Date(targetDate) };
              }
            }
          }
          return t;
        }));
      } else {
        const taskDuration = task.endDate.getTime() - task.startDate.getTime();
        const newEndDate = new Date(targetDate.getTime() + taskDuration);
        
        setTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { ...t, startDate: new Date(targetDate), endDate: newEndDate }
            : t
        ));
      }
    }

    setActiveId(null);
    setResizeMode(null);
    setResizingTaskId(null);
    setIsResizing(false);
  };

  const handleDaySelect = useCallback((date: Date) => {
    if (isResizing) return;
    
    if (!selectionStart) {
      setSelectionStart(date);
      setSelectionEnd(date);
    } else if (!selectionEnd || !isSameDay(selectionEnd, date)) {
      setSelectionEnd(date);
      setIsModalOpen(true);
    } else {
      setSelectionStart(null);
      setSelectionEnd(null);
    }
  }, [selectionStart, selectionEnd, isResizing]);

  const handleTaskSave = useCallback((name: string, category: string) => {
    if (selectionStart && selectionEnd) {
      const startDate = selectionStart <= selectionEnd ? selectionStart : selectionEnd;
      const endDate = selectionStart <= selectionEnd ? selectionEnd : selectionStart;
      
      const newTask: Task = {
        id: Date.now().toString(),
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        category: category as Task['category']
      };
      
      setTasks(prev => [...prev, newTask]);
    }
    
    setSelectionStart(null);
    setSelectionEnd(null);
  }, [selectionStart, selectionEnd]);

  const handleResizeStart = useCallback((taskId: string, mode: ResizeMode, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    setResizeMode(mode);
    setResizingTaskId(taskId);
    setIsResizing(true);

    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const dayElement = element?.closest('[data-date]');
      
      if (dayElement) {
        const dateStr = dayElement.getAttribute('data-date');
        if (dateStr) {
          const targetDate = new Date(dateStr);
          
          setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
              if (mode === 'resize-start' && targetDate <= t.endDate) {
                return { ...t, startDate: new Date(targetDate) };
              } else if (mode === 'resize-end' && targetDate >= t.startDate) {
                return { ...t, endDate: new Date(targetDate) };
              }
            }
            return t;
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setResizeMode(null);
      setResizingTaskId(null);
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <CalendarIcon className="w-8 h-8" />
            Task Planner
          </h1>
          <p className="text-gray-600">
            {format(currentDate, 'MMMM yyyy')}
          </p>
        </div>

        <FilterBar filters={filters} onFiltersChange={setFilters} />

        <Calendar
          calendarDays={calendarDays}
          currentDate={currentDate}
          tasks={filteredTasks}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          activeId={activeId}
          resizingTaskId={resizingTaskId}
          isResizing={isResizing}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDaySelect={handleDaySelect}
          onResizeStart={handleResizeStart}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectionStart(null);
            setSelectionEnd(null);
          }}
          onSave={handleTaskSave}
        />
      </div>
    </div>
  );
};

export default TaskPlanner;