import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableTaskProps, DragData } from '../../types';
import { getCategoryColor } from '../../utils/taskUtils';
import { format } from '../../utils/dateUtils';

const DraggableTask: React.FC<DraggableTaskProps> = ({ 
  task, 
  date, 
  isStart, 
  isEnd,
  isResizing,
  onResizeStart 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `task-${task.id}-${format(date, 'yyyy-MM-dd')}`,
    data: {
      type: 'task',
      task,
      mode: 'move'
    } as DragData,
    disabled: isResizing,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const dragProps = isResizing ? {} : { ...listeners, ...attributes };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        ${getCategoryColor(task.category)} text-white text-xs p-1 h-6 rounded relative group flex items-center
        ${isStart ? 'rounded-l' : 'rounded-l-none'}
        ${isEnd ? 'rounded-r' : 'rounded-r-none'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isResizing ? 'cursor-default' : 'cursor-move'}
        transition-opacity duration-200
      `}
      {...dragProps}
      title={task.name}
    >
      {isStart && (
        <div 
          className="absolute left-0 top-0 w-3 h-full cursor-ew-resize bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 z-10 flex items-center justify-center transition-opacity"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onResizeStart(task.id, 'resize-start', e);
          }}
        >
          <div className="w-1 h-3 bg-white bg-opacity-60 rounded-full"></div>
        </div>
      )}
      
      {isEnd && (
        <div 
          className="absolute right-0 top-0 w-3 h-full cursor-ew-resize bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 z-10 flex items-center justify-center transition-opacity"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onResizeStart(task.id, 'resize-end', e);
          }}
        >
          <div className="w-1 h-3 bg-white bg-opacity-60 rounded-full"></div>
        </div>
      )}
      
      <div className="truncate flex-1 px-1">
        {isStart ? task.name : ''}
      </div>
    </div>
  );
};

export default DraggableTask;