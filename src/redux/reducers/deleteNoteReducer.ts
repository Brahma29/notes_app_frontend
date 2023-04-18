import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

interface InitialState {
  state: 'idle' | 'loading' | 'succeeded' | 'rejected';
  message: string;
  error: string | null | undefined;
}

const initialState: InitialState = {
  state: 'idle',
  message: '',
  error: null,
};

export const deleteNoteById = createAsyncThunk(
  'notes/deleteNoteById',
  async (noteId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/notes/${noteId}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
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
      state.error = action.error.message;
    });
  },
});

export default deleteNoteSlice.reducer;
