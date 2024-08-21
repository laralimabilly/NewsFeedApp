import axios from 'axios';
import config from '../config';
import { Article } from '../types/article';

const NEWS_API_KEY = config.newsApiKey;
const PAGE_SIZE = 12;

export const fetchNewsAPI = async (query: string): Promise<Article[]> => {

  try {

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: { q: query, apiKey: NEWS_API_KEY, domains: config.newsApiDomains, pageSize: PAGE_SIZE },
    });
  
    if(response.data.articles.length == 0) {
      return [];
    }
    
    return response.data.articles.map((article: any, index: number) => ({
      id: `${article.source.id}-${index}`, 
      webTitle: article.title,
      webUrl: article.url,
      webPublicationDate: article.publishedAt,
      type: 'article',
      pillarName: 'World',
      sectionName: 'News',
      sectionId: 'news',
      source: 'BBC News',
      fields: {
        headline: article.title,
        trailText: article.description,
        thumbnail: article.urlToImage
      }
    }));

  } catch {
    console.error(`Couldn't fecth data from BBC News.`);
    return [];
  }
  

};