import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';
import { NoteFormProps } from '../../interfaces/FormValues';

interface Note {
  title: string;
  description: string;
  user: string;
  id: string;
}

interface InitialState {
  note: Note | null;
  state: 'idle' | 'loading' | 'succeeded' | 'rejected';
  error: string | null | {};
}

const initialState: InitialState = {
  note: null,
  state: 'idle',
  error: null,
};

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (noteForm: NoteFormProps) => {
    const response = await AxiosInstance.post('/notes', noteForm);
    return response.data as Note;
  }
);

const createNoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNoteReset: (state) => {
      state.error = null;
      state.note = null;
      state.state = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.state = 'loading';
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.note = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.state = 'rejected';
        state.error = action.payload ? action.payload : 'An error occurred';
      });
  },
});

export const { createNoteReset } = createNoteSlice.actions;

export default createNoteSlice.reducer;
