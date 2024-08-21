import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../types/article';
import { fetchAllNews } from '../api/aggregator';
import moment from 'moment';

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  filteredArticles: [],
  status: 'idle',
  error: null,
};

interface FilterCriteria {
  categories?: string[];
  source?: string;
  dateRange?: { startDate: moment.Moment | null, endDate: moment.Moment | null };
}

export const fetchNews = createAsyncThunk('news/fetchNews', async (query: string | any | null) => {
  const response = await fetchAllNews(query || '');
  return response;
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    filterArticles(state, action) {
      const { categories, source, dateRange }: FilterCriteria = action.payload;

      state.filteredArticles = state.articles.filter((article) => {
        const matchesCategory = !categories || categories.length === 0 || categories.includes(article.sectionName);
        const matchesSource = !source || article.source === source;
        const matchesDateRange =
          !dateRange ||
          (!dateRange.startDate && !dateRange.endDate) ||
          (moment(article.webPublicationDate).isSameOrAfter(dateRange.startDate) &&
            moment(article.webPublicationDate).isSameOrBefore(dateRange.endDate));

        return matchesCategory && matchesSource && matchesDateRange;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
        state.filteredArticles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export const { filterArticles } = newsSlice.actions;

export default newsSlice.reducer;
