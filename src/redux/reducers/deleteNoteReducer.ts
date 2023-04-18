import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

interface InitialState {
  state: 'idle' | 'loading' | 'succeeded' | 'rejected';
  message: string;
  error: string | null;
}

const initialState: InitialState = {
  state: 'idle',
  message: '',
  error: null,
};

export const deleteNoteById = createAsyncThunk(
  'notes/deleteNoteById',
  async (noteId: string) => {
    const { data } = await AxiosInstance.delete(`/notes/${noteId}`);
    return data;
  }
);

export const deleteNoteSlice = createSlice({
  name: 'deleteNote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteNoteById.pending, (state) => {
      state.state = 'loading';
      state.error = null;
    });
    builder.addCase(deleteNoteById.fulfilled, (state, action) => {
      state.state = 'succeeded';
      state.message = action.payload;
    });
    builder.addCase(deleteNoteById.rejected, (state, action) => {
      state.state = 'rejected';
      state.error = action.payload as string;
    });
  },
});

export default deleteNoteSlice.reducer;
