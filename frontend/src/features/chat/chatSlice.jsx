import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.jsx'

// загрузка каналов
export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/channels');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);

    }
  }
);

//  загрузка сообщений
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/messages');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// начальное состояние чата
const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  status: 'idle',
  error: null,
};


// создание слайса
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    // очистка ошибка
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    },

    // сброс состояние при logout
    resetChat: (state) => {
      state.channels = [],
        state.messages = [],
        state.currentChannelId = null,
        state.status = 'init',
        state.error = null;
    }
  },

  // обработка асинхронных действий
  extraReducers: (builder) => {
    // обработка загрузки каналлоd
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;

        // выбираем 1 актвиный канал по умолчанию
        state.currentChannelId = action.payload[0]?.id || null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки каналов';
      })

      // обработка загрузки сообщения каналов
      .addCase(fetchMessages.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки сообщений';
      });
  },
});

// экспортируем действий
export const { setCurrentChannel, clearError, resetChat } = chatSlice.actions;

// экспортируем reducer
export default chatSlice.reducer;
