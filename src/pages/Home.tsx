import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import NewsFeed from '../components/NewsFeed';

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container min-w-full mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="md:w-3/4 lg:w-full">
            <NewsFeed query={query} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
