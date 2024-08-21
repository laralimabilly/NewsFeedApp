import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SecCategory } from './StyledTexts';

const CategoryModal: React.FC<{ onClose: () => void; onSave: (categories: string[]) => void }> = ({ onClose, onSave }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = ['Business', 'Technology', 'Sports', 'Health', 'Food', 'Entertainment', 'Games', 'Music', 'Art', 'Cinema'];

  useEffect(() => {
    const savedCategories = Cookies.get('favoriteCategories');
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories));
    }
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const saveCategories = () => {
    Cookies.set('favoriteCategories', JSON.stringify(selectedCategories), { expires: 30 }); // Store in cookie for 30 days
    onSave(selectedCategories);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 shadow-lg">
        <SecCategory className="mb-8">Select Your Favorite Categories</SecCategory>
        <div className="mt-6 grid grid-cols-2 gap-4">
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
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300">Cancel</button>
          <button onClick={saveCategories} className="px-4 py-2 bg-black text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;