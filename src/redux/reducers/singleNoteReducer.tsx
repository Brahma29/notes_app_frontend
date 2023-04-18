import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

interface Note {
  title: string;
  description: string;
  user: string;
  id: string;
}

interface InitialState {
  note: Note | null;
  state: 'idle' | 'loading' | 'rejected';
  error: string | null | undefined;
}

const initialState: InitialState = {
  note: null,
  state: 'idle',
  error: null,
};

export const getNoteById = createAsyncThunk(
  'notes/getNoteById',
  async (noteId: string) => {
    try {
      const { data } = await AxiosInstance.get(`/notes/${noteId}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const getNoteByIdSlice = createSlice({
  name: 'notes/getNoteById',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNoteById.pending, (state) => {
      state.state = 'loading';
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      state.state = 'idle';
      state.note = action.payload;
    });
    builder.addCase(getNoteById.rejected, (state, action) => {
      state.state = 'rejected';
      state.error = action.error.message;
    });
  },
});

export default getNoteByIdSlice.reducer;
