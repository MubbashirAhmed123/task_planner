import React from 'react';
import { DndContext, DragOverlay, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { Task, ResizeMode } from '../../types';
import { format, isSameMonth } from '../../utils/dateUtils';
import { getTasksForDate, getCategoryColor } from '../../utils/taskUtils';
import DroppableDay from './DroppableDay';

interface CalendarProps {
  calendarDays: Date[];
  currentDate: Date;
  tasks: Task[];
  selectionStart: Date | null;
  selectionEnd: Date | null;
  activeId: string | null;
  resizingTaskId: string | null;
  isResizing: boolean;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDaySelect: (date: Date) => void;
  onResizeStart: (taskId: string, mode: ResizeMode, event: React.MouseEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  calendarDays,
  currentDate,
  tasks,
  selectionStart,
  selectionEnd,
  activeId,
  resizingTaskId,
  isResizing,
  onDragStart,
  onDragEnd,
  onDaySelect,
  onResizeStart
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const isInSelectionRange = (date: Date): boolean => {
    if (!selectionStart) return false;
    if (!selectionEnd) return format(date, 'yyyy-MM-dd') === format(selectionStart, 'yyyy-MM-dd');
    
    const start = selectionStart <= selectionEnd ? selectionStart : selectionEnd;
    const end = selectionStart <= selectionEnd ? selectionEnd : selectionStart;
    return date >= start && date <= end;
  };

  const activeTask = activeId ? tasks.find(task => 
    activeId.includes(task.id)
  ) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-medium text-gray-700 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((date) => {
            const tasksForDate = getTasksForDate(tasks, date);
            const isSelected = isInSelectionRange(date);
            const isCurrentMonthDay = isSameMonth(date, currentDate);

            return (
              <div
                key={format(date, 'yyyy-MM-dd')}
                data-date={format(date, 'yyyy-MM-dd')}
              >
                <DroppableDay
                  date={date}
                  tasks={tasksForDate}
                  isCurrentMonth={isCurrentMonthDay}
                  isSelected={isSelected}
                  resizingTaskId={resizingTaskId}
                  onDaySelect={onDaySelect}
                  onResizeStart={onResizeStart}
                />
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeTask && !isResizing ? (
          <div className={`
            ${getCategoryColor(activeTask.category)} text-white text-xs p-1 rounded opacity-75
          `}>
            {activeTask.name}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Calendar;