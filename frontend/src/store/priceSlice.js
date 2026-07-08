import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import priceService from '../services/priceService';

const initialState = {
  prices: [],
  priceDetail: null,
  filters: {
    country: '',
    year: '',
    month: '',
    indicator: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },
  sort: '-value',
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchPrices = createAsyncThunk(
  'prices/fetchPrices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await priceService.getAllPrices(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPriceById = createAsyncThunk(
  'prices/fetchPriceById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await priceService.getPriceById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createPrice = createAsyncThunk(
  'prices/createPrice',
  async (priceData, { rejectWithValue }) => {
    try {
      const data = await priceService.createPrice(priceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePrice = createAsyncThunk(
  'prices/updatePrice',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await priceService.updatePrice(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePrice = createAsyncThunk(
  'prices/deletePrice',
  async (id, { rejectWithValue }) => {
    try {
      const data = await priceService.deletePrice(id);
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearPriceError: (state) => {
      state.error = null;
    },
    resetPrices: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Prices
      .addCase(fetchPrices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Price By ID
      .addCase(fetchPriceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPriceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.priceDetail = action.payload.data;
      })
      .addCase(fetchPriceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Price
      .addCase(createPrice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPrice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Price
      .addCase(deletePrice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices = state.prices.filter(p => p._id !== action.payload.id);
      })
      .addCase(deletePrice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setSort, setPagination, clearPriceError, resetPrices } = priceSlice.actions;
export default priceSlice.reducer;
