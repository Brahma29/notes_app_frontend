import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NoteFormProps } from '../../interfaces/FormValues';
import AxiosInstance from '../../helpers/AxiosInstance';

interface Note {
  title: string;
  description: string;
  user: string;
  id: string;
}

interface UpdateNotePayload {
  id: string;
  updatedNote: NoteFormProps;
}

interface UpdateNoteState {
  note: Note | null;
  state: 'idle' | 'loading' | 'succeeded' | 'rejected';
  error: string | null | undefined;
}

const initialState: UpdateNoteState = {
  note: null,
  state: 'idle',
  error: null,
};

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, updatedNote }: UpdateNotePayload) => {
    try {
      const { data } = await AxiosInstance.put(`/notes/${id}`, updatedNote);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const updateNoteSlice = createSlice({
  name: 'updateNote',
  initialState,
  reducers: {
    updateNoteReset: (state) => {
      state.error = null;
      state.state = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateNote.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.note = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.state = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { updateNoteReset } = updateNoteSlice.actions;

export default updateNoteSlice.reducer;
