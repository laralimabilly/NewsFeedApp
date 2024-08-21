import { fetchGuardianNews } from './guardianAPI';
import { fetchNYTNews } from './nytAPI';
import { fetchNewsAPI } from './newsAPI';
import { Article } from '../types/article';

export const fetchAllNews = async (query: string): Promise<Article[]> => {
  const [guardianNews, nytNews, newsAPI] = await Promise.all([
    fetchGuardianNews(query),
    fetchNYTNews(query),
    fetchNewsAPI(query),
  ]);

  function sortByDate(a: { webPublicationDate: string; }, b: { webPublicationDate: string; }){  
      var dateA = new Date(a.webPublicationDate).getTime();
      var dateB = new Date(b.webPublicationDate).getTime();
      return dateA < dateB ? 1 : -1;  
  }; 

  const combinedResults = [...guardianNews, ...nytNews, ...newsAPI];

  return combinedResults.sort(sortByDate);
};