import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/newsSlice';
import { AppDispatch, RootState } from '../redux/store';
import moment from 'moment';
import Filters from './Filters';
import styled from 'styled-components';
import CategoryModal from './CategoryModal';
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SecTag, SecTitle } from './StyledTexts';

const NewsFeed: React.FC<{ query: string }> = ({ query }) => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.news.filteredArticles);
  const articlesNotFiltered = useSelector((state: RootState) => state.news.articles);
  const status = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);
  const [categories, setCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const favoriteCategories: string | any = Cookies.get('favoriteCategories');
    const favoriteCategoriesString = JSON.parse(favoriteCategories).join(',');
    
    if (query) {
      dispatch(fetchNews(query));
    } else {
      dispatch(fetchNews(favoriteCategoriesString));
    }
    
  }, [query]);

  useEffect(() => {
    if (articles.length > 0) {
      const uniqueCategories = [...new Set(articlesNotFiltered.map(article => article.sectionName))];
      setCategories(uniqueCategories);
    }
  }, [articles]);

  const handleSaveCategories = useCallback(
    (categories: string[]) => {
      const categoriesString = categories.join(',');
      dispatch(fetchNews({ query: categoriesString }));
    },
    [dispatch]
  );

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (status === 'loading') {
    return (
      <div className="bg-white py-24 sm:py-32">
        <h1><Skeleton /></h1>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Skeleton height={180} className="mb-4" />
          <Skeleton height={180} className="mb-4" />
          <Skeleton height={180} className="mb-4" />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row max-w-4xl m-auto justify-evenly items-center">
        <button className="mb-4 md:mb-0" onClick={handleOpenModal}>Select Favorite Categories</button>
        <Filters categories={categories} />
      </div>
      <div className="mt-20 mx-auto max-w-7xl px-6 lg:px-8">
        <SecTitle>News</SecTitle>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.length > 0 ? (
            articles.map((article) => (
              <article key={article.id} className="flex max-w-xl flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={article.webPublicationDate} className="text-gray-500">
                    {moment(article.webPublicationDate).format('ll')}
                  </time>
                  <SecTag className="relative">
                    {article.sectionName}
                  </SecTag>
                </div>
                <div className="group relative">
                  <div className="relative">
                    <Img src={article.fields.thumbnail} alt={article.webTitle} className="mt-4 max-h-40 overflow-y-hidden" />
                    <SourceTag>{article.source}</SourceTag>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={article.webUrl || '#'}>
                      <span className="absolute inset-0" />
                      {article.webTitle}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6">{article.fields.trailText}</p>
                </div>
              </article>
            ))
          ) : (
            <p>No results were found.</p>
          )}
        </div>
      </div>
      {showModal && <CategoryModal onClose={handleCloseModal} onSave={handleSaveCategories} />}
    </div>
  );
};

const Img = styled.img`
  aspect-ratio: 4 / 3;
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
`;

const SourceTag = styled.h5`
  background: rgba(0,0,0,.8);
  color: white;
  font-size: .8rem;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 8px;
  text-align: left;
`;

export default NewsFeed;