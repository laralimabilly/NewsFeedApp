import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterArticles } from '../redux/newsSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { SecCategory, SecTitle } from './StyledTexts';

interface FiltersProps {
  categories: string[];
}

const Filters: React.FC<FiltersProps> = ({ categories }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [source, setSource] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const sources = ['The Guardian', 'The New York Times', 'BBC News'];

  const handleFilter = () => {
    dispatch(filterArticles({
      categories: selectedCategories,
      source,
      dateRange: { startDate: startDate ? moment(startDate) : null, endDate: endDate ? moment(endDate) : null },
    }));
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSource('');
    setStartDate(null);
    setEndDate(null);
    dispatch(filterArticles({}));
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategories, source, startDate, endDate]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} >
        {isOpen ? 'Close Filters' : 'Open Filters'}
      </button>

      <div className={`sidenav-overlay ${isOpen ? 'open' : ''}`}></div>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="close-btn text-white px-4 py-2"
        >
          Close
        </button>

        <div className="flex flex-col items-center space-y-4 mb-4">
          <SecTitle>Filters</SecTitle>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <SecCategory className="mb-2 text-sm font-medium">Categories</SecCategory>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="mr-2"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4">      
            <div className="flex flex-col">
              <SecCategory className="mb-2 text-sm font-medium">Source</SecCategory>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                <option value="">All</option>
                {sources.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col">
              <SecCategory className="mb-2 text-sm font-medium text-gray-700">Start Date</SecCategory>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col">
              <SecCategory className="mb-2 text-sm font-medium text-gray-700">End Date</SecCategory>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="self-end px-4 py-2 bg-gray-600 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;