import axios from 'axios';
import config from '../config';
import { Article } from '../types/article';

const NYT_API_KEY = config.nytKey;

export const fetchNYTNews = async (query: string): Promise<Article[]> => {

  try {
    
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: { q: query, 'api-key': NYT_API_KEY },
    });
    
    if(response.data.response.docs.length == 0) {
      return [];
    }
  
    return response.data.response.docs.map((doc: any) => ({
      id: doc._id,
      webTitle: doc.headline.main,
      webUrl: doc.web_url,
      webPublicationDate: doc.pub_date,
      type: doc.document_type,
      pillarName: doc.section_name,
      sectionName: doc.subsection_name ? doc.subsection_name : doc.section_name,
      sectionId: doc.subsection_name ? doc.subsection_name : doc.section_name,
      source: 'The New York Times',
      fields: {
        headline: doc.headline.main,
        trailText: doc.snippet,
        thumbnail: doc.multimedia[0]?.url ? `https://www.nytimes.com/` + doc.multimedia[0].url : 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg'
      }
    }));
    
  } catch {
    console.error(`Couldn't fecth data from the New York Times.`);
    return [];
  }


};
