import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DroppableDayProps } from '../../types';
import { format, isToday, isSameDay } from '../../utils/dateUtils';
import DraggableTask from './DraggableTask';

const DroppableDay: React.FC<DroppableDayProps> = ({ 
  date, 
  tasks, 
  isCurrentMonth, 
  isSelected,
  resizingTaskId,
  onDaySelect,
  onResizeStart 
}) => {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: format(date, 'yyyy-MM-dd'),
    data: {
      date,
      type: 'day'
    }
  });

  const isTodayDate = isToday(date);

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-24 border-r border-b last:border-r-0 p-1 cursor-pointer relative transition-colors
        ${isSelected ? 'bg-blue-100' : ''}
        ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50'}
        ${isTodayDate ? 'bg-blue-50' : ''}
        ${isOver ? 'bg-green-100' : ''}
      `}
      onClick={() => onDaySelect(date)}
    >
      <div className={`
        text-sm font-medium mb-1
        ${isTodayDate ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
      `}>
        {format(date, 'd')}
      </div>

      <div className="space-y-1">
        {tasks.map(task => {
          const isTaskStart = isSameDay(task.startDate, date);
          const isTaskEnd = isSameDay(task.endDate, date);
          const isResizing = resizingTaskId === task.id;
          
          return (
            <DraggableTask
              key={`${task.id}-${format(date, 'yyyy-MM-dd')}`}
              task={task}
              date={date}
              isStart={isTaskStart}
              isEnd={isTaskEnd}
              isResizing={isResizing}
              onResizeStart={onResizeStart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DroppableDay;