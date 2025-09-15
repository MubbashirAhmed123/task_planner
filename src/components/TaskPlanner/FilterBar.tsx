import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterState } from '../../types';
import { getCategoryColor } from '../../utils/taskUtils';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['To Do', 'In Progress', 'Review', 'Completed'].map(category => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.has(category)}
                onChange={(e) => {
                  const newCategories = new Set(filters.categories);
                  if (e.target.checked) {
                    newCategories.add(category);
                  } else {
                    newCategories.delete(category);
                  }
                  updateFilters({ categories: newCategories });
                }}
                className="rounded"
              />
              <span className={`px-2 py-1 rounded text-white text-xs ${getCategoryColor(category)}`}>
                {category}
              </span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filters.timeRange}
            onChange={(e) => updateFilters({ timeRange: e.target.value as FilterState['timeRange'] })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All tasks</option>
            <option value="1week">Within 1 week</option>
            <option value="2weeks">Within 2 weeks</option>
            <option value="3weeks">Within 3 weeks</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;