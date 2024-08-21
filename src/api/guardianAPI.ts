import axios from 'axios';
import config from '../config';
import { Article } from '../types/article';

const API_KEY = config.guardianKey;
const PAGE_SIZE = 12;

export const fetchGuardianNews = async (query: string): Promise<Article[]> => {

  try {

    const response = await axios.get('https://content.guardianapis.com/search', {
      params: { q: query, 'api-key': API_KEY, 'page-size':  PAGE_SIZE, 'show-fields': 'headline,thumbnail,trailText'},
    });
  
    if(response.data.response.results.length == 0) {
      return [];
    }
  
    return response.data.response.results.map((article: any) => ({
      id: article.id, 
      webTitle: article.webTitle,
      webUrl: article.webUrl,
      webPublicationDate: article.webPublicationDate,
      type: article.type,
      pillarName: article.pillarName,
      sectionName: article.sectionName,
      sectionId: article.sectionId,
      source: 'The Guardian',
      fields: {
        headline: article.fields.headline,
        trailText: article.fields.trailText,
        thumbnail: article.fields.thumbnail
      }
    }));
    
  } catch {
    console.error(`Couldn't fecth data from the Guardian.`);
    return [];
  }

};
