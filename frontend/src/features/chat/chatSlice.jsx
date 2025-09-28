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
      const response = await api.get('/api.v1/messages');
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
// .....


